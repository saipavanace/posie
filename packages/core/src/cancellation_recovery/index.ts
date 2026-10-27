import { z } from 'zod';

export const CandidateSourceSchema = z.enum([
  'earlier_move_request', // Client already booked later, wants earlier slot
  'standard_waitlist',    // Client has no existing booking, on waitlist
  'standby_vip_client',   // On-call standby guest willing to arrive on short notice
]);
export type CandidateSource = z.infer<typeof CandidateSourceSchema>;

export const RecoveryCandidateSchema = z.object({
  candidateId: z.string(),
  source: CandidateSourceSchema,
  clientId: z.string(),
  clientName: z.string(),
  clientPhone: z.string(),
  serviceId: z.string(),
  serviceName: z.string(),
  servicePriceCents: z.number().nonnegative(),
  isVip: z.boolean().default(false),
  existingFutureAppointmentId: z.string().optional(), // For earlier_move_request
  requestTimestamp: z.string().datetime(),
  priorityScore: z.number().default(0),
});
export type RecoveryCandidate = z.infer<typeof RecoveryCandidateSchema>;

export const CancellationOpeningSchema = z.object({
  openingId: z.string(),
  tenantId: z.string(),
  practitionerId: z.string(),
  practitionerName: z.string(),
  serviceId: z.string(),
  serviceName: z.string(),
  cancelledAppointmentPriceCents: z.number().nonnegative(),
  slotStartTime: z.string().datetime(),
  slotEndTime: z.string().datetime(),
  durationMinutes: z.number().positive(),
  status: z.enum(['open', 'filled', 'expired_unfilled']).default('open'),
  filledByCandidateId: z.string().optional(),
  revenueClassification: z.enum(['incremental_recovery', 'simple_reschedule', 'none']).default('none'),
  createdAt: z.string().datetime(),
});
export type CancellationOpening = z.infer<typeof CancellationOpeningSchema>;

export const RecoveryRevenueAuditSchema = z.object({
  auditPeriod: z.string(),
  totalCancelledSlotsCount: z.number().int().nonnegative(),
  totalCancelledPotentialLostCents: z.number().nonnegative(),
  totalSlotsRecoveredCount: z.number().int().nonnegative(),
  trulyRecoveredIncrementalRevenueCents: z.number().nonnegative(),
  shiftedRescheduleVolumeCents: z.number().nonnegative(),
  netFillRatePercentage: z.number(),
  explanation: z.string(),
});
export type RecoveryRevenueAudit = z.infer<typeof RecoveryRevenueAuditSchema>;

/**
 * Calculates priority score and ranks recovery candidates according to studio rules.
 * Default ranking priorities:
 * 1. Matching service compatibility.
 * 2. Earlier-move clients (reduces future churn risk) vs. Standby / Standard waitlist.
 * 3. VIP loyalty status boost (+20 points).
 * 4. Request seniority.
 */
export function rankCancellationRecoveryCandidates(params: {
  opening: CancellationOpening;
  candidates: RecoveryCandidate[];
  prioritizeVips?: boolean;
}): RecoveryCandidate[] {
  const isVipPriorityEnabled = params.prioritizeVips ?? true;

  return params.candidates
    .filter((c) => c.serviceId === params.opening.serviceId)
    .map((candidate) => {
      let score = 50;

      // VIP Boost
      if (isVipPriorityEnabled && candidate.isVip) {
        score += 25;
      }

      // Standby guests get bonus for readiness
      if (candidate.source === 'standby_vip_client') {
        score += 15;
      } else if (candidate.source === 'earlier_move_request') {
        score += 10;
      }

      // Seniority bonus: earlier requests get up to +15 pts
      const ageHours = (Date.now() - new Date(candidate.requestTimestamp).getTime()) / (1000 * 60 * 60);
      score += Math.min(15, Math.floor(ageHours));

      return {
        ...candidate,
        priorityScore: score,
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

/**
 * Fills a cancellation opening with a selected candidate and categorizes revenue.
 * Invariant: "Recovery revenue counts completed replacement visits, excluding simple reschedules."
 */
export function fillCancellationOpening(params: {
  opening: CancellationOpening;
  chosenCandidate: RecoveryCandidate;
  currentTime?: string;
}): {
  updatedOpening: CancellationOpening;
  isIncrementalRecovery: boolean;
  revenueNotice: string;
} {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  // If candidate had a future appointment moved up, it is a simple reschedule
  const isReschedule = params.chosenCandidate.source === 'earlier_move_request';
  const revenueClassification = isReschedule ? 'simple_reschedule' : 'incremental_recovery';

  const updatedOpening: CancellationOpening = {
    ...params.opening,
    status: 'filled',
    filledByCandidateId: params.chosenCandidate.candidateId,
    revenueClassification,
  };

  const revenueNotice = isReschedule
    ? `Slot filled via Earlier-Move Reschedule (${params.chosenCandidate.clientName}). Revenue ($${(params.chosenCandidate.servicePriceCents / 100).toFixed(2)}) is shifted from future appointment "${params.chosenCandidate.existingFutureAppointmentId}", not counted as new incremental recovery.`
    : `Slot filled via New Client Booking (${params.chosenCandidate.clientName}). Genuine incremental recovery of $${(params.chosenCandidate.servicePriceCents / 100).toFixed(2)}.`;

  return {
    updatedOpening,
    isIncrementalRecovery: !isReschedule,
    revenueNotice,
  };
}

/**
 * Generates an auditable Recovery Revenue report strictly isolating new incremental recovery from shifted reschedules.
 */
export function auditCancellationRecoveryRevenue(params: {
  period: string;
  openings: CancellationOpening[];
}): RecoveryRevenueAudit {
  const totalCancelledSlotsCount = params.openings.length;
  const totalCancelledPotentialLostCents = params.openings.reduce(
    (sum, o) => sum + o.cancelledAppointmentPriceCents,
    0
  );

  const filledOpenings = params.openings.filter((o) => o.status === 'filled');
  const totalSlotsRecoveredCount = filledOpenings.length;

  let trulyRecoveredIncrementalRevenueCents = 0;
  let shiftedRescheduleVolumeCents = 0;

  for (const o of filledOpenings) {
    if (o.revenueClassification === 'incremental_recovery') {
      trulyRecoveredIncrementalRevenueCents += o.cancelledAppointmentPriceCents;
    } else if (o.revenueClassification === 'simple_reschedule') {
      shiftedRescheduleVolumeCents += o.cancelledAppointmentPriceCents;
    }
  }

  const netFillRatePercentage = totalCancelledSlotsCount > 0
    ? Math.round((totalSlotsRecoveredCount / totalCancelledSlotsCount) * 100)
    : 100;

  const explanation =
    `Strict Recovery Accounting: $${(trulyRecoveredIncrementalRevenueCents / 100).toFixed(2)} represents genuine new revenue from waitlist/standby fills. $${(shiftedRescheduleVolumeCents / 100).toFixed(2)} represents existing client visits moved earlier without net sales creation.`;

  return {
    auditPeriod: params.period,
    totalCancelledSlotsCount,
    totalCancelledPotentialLostCents,
    totalSlotsRecoveredCount,
    trulyRecoveredIncrementalRevenueCents,
    shiftedRescheduleVolumeCents,
    netFillRatePercentage,
    explanation,
  };
}
