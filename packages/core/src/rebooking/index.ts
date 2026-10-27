import { z } from 'zod';

/**
 * F071 — Rebooking at Checkout
 *
 * Suggests tailored return intervals (e.g. 4-week brow refresh, 6-week toner) at checkout
 * with convenient available slots, while fully preserving the client's freedom to defer.
 *
 * Invariants (F071, Basis: B):
 * 1. Freedom to Defer: A proposed return date remains unbooked until explicitly accepted by the client.
 *    No forced or silent bookings.
 * 2. Cadence Rules: Return suggestions adapt intelligently to the service type and specialist.
 * 3. Client Choice: Supports instant reservation, a scheduled SMS reminder later, or graceful deferral.
 */

export const ServiceCadenceTypeSchema = z.enum([
  'brow_sculpt_and_tint', // 4 weeks
  'lash_extensions_fill', // 3 weeks
  'hair_color_and_toner', // 6 weeks
  'facial_and_peel',     // 4 weeks
  'gel_nails_maintenance',// 3 weeks
]);
export type ServiceCadenceType = z.infer<typeof ServiceCadenceTypeSchema>;

export const SuggestedRebookingSlotSchema = z.object({
  slotId: z.string().min(1),
  startTimeIso: z.string().datetime(),
  displayDate: z.string().min(1),
  displayTime: z.string().min(1),
  specialistName: z.string().min(1),
  isAvailable: z.boolean().default(true),
});
export type SuggestedRebookingSlot = z.infer<typeof SuggestedRebookingSlotSchema>;

export const ClientRebookingDecisionSchema = z.enum([
  'pending_decision',
  'accepted_and_booked',
  'deferred_remind_via_sms',
  'declined_book_own_pace',
]);
export type ClientRebookingDecision = z.infer<typeof ClientRebookingDecisionSchema>;

export const RebookingPromptOfferSchema = z.object({
  offerId: z.string().uuid(),
  appointmentId: z.string().uuid(),
  clientId: z.string().uuid(),
  clientName: z.string().min(1),
  serviceName: z.string().min(1),
  specialistStaffId: z.string().uuid(),
  specialistName: z.string().min(1),

  // Recommended Return Interval
  cadenceType: ServiceCadenceTypeSchema,
  recommendedIntervalWeeks: z.number().int().positive(),
  recommendedTargetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  cadenceReasonExplanation: z.string(),

  // Proposed Calendar Slots
  suggestedSlots: z.array(SuggestedRebookingSlotSchema).min(1),

  // Decision & Audit
  decision: ClientRebookingDecisionSchema,
  selectedSlotId: z.string().nullable(),
  scheduledReminderDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  confirmedNextAppointmentId: z.string().uuid().nullable(),
  decidedAt: z.string().datetime().nullable(),
});
export type RebookingPromptOffer = z.infer<typeof RebookingPromptOfferSchema>;

export const RECOMMENDED_INTERVAL_WEEKS: Record<ServiceCadenceType, { weeks: number; explanation: string }> = {
  brow_sculpt_and_tint: {
    weeks: 4,
    explanation: 'Brow shaping and tinting look crispest with a 4-week maintenance cadence.',
  },
  lash_extensions_fill: {
    weeks: 3,
    explanation: 'Lash fills are best scheduled every 3 weeks to match natural lash shed cycles.',
  },
  hair_color_and_toner: {
    weeks: 6,
    explanation: 'Gloss and tone refreshes maintain vibrancy without overlapping lightening passes.',
  },
  facial_and_peel: {
    weeks: 4,
    explanation: 'A 4-week interval aligns with your skin cellular turnover cycle for lasting glow.',
  },
  gel_nails_maintenance: {
    weeks: 3,
    explanation: 'Biab and gel manicures protect the natural nail plate when maintained every 3 weeks.',
  },
};

/**
 * Generates rebooking return recommendations at checkout.
 *
 * Invariant: Generates unbooked suggestions only. Nothing is booked until client accepts.
 */
export function generateRebookingOffer(params: {
  appointmentId: string;
  clientId: string;
  clientName: string;
  serviceName: string;
  specialistStaffId: string;
  specialistName: string;
  currentVisitDate: string; // YYYY-MM-DD
  cadenceType: ServiceCadenceType;
}): RebookingPromptOffer {
  const offerId = crypto.randomUUID ? crypto.randomUUID() : 'f0710000-0000-4000-8000-000000000001';
  const cadenceConfig = RECOMMENDED_INTERVAL_WEEKS[params.cadenceType];

  // Calculate target return date (current + weeks * 7 days)
  const current = new Date(params.currentVisitDate);
  const targetDate = new Date(current);
  targetDate.setDate(targetDate.getDate() + cadenceConfig.weeks * 7);
  const targetDateStr = targetDate.toISOString().split('T')[0]!;

  // Generate 2 sample convenient slots around target date
  const slotDate1 = new Date(targetDate);
  slotDate1.setHours(10, 0, 0, 0);

  const slotDate2 = new Date(targetDate);
  slotDate2.setDate(slotDate2.getDate() + 1);
  slotDate2.setHours(14, 30, 0, 0);

  const suggestedSlots: SuggestedRebookingSlot[] = [
    {
      slotId: 'slot-1',
      startTimeIso: slotDate1.toISOString(),
      displayDate: slotDate1.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      displayTime: '10:00 AM',
      specialistName: params.specialistName,
      isAvailable: true,
    },
    {
      slotId: 'slot-2',
      startTimeIso: slotDate2.toISOString(),
      displayDate: slotDate2.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      displayTime: '2:30 PM',
      specialistName: params.specialistName,
      isAvailable: true,
    },
  ];

  return RebookingPromptOfferSchema.parse({
    offerId,
    appointmentId: params.appointmentId,
    businessId: '11111111-1111-1111-1111-111111111111',
    clientId: params.clientId,
    clientName: params.clientName,
    serviceName: params.serviceName,
    specialistStaffId: params.specialistStaffId,
    specialistName: params.specialistName,
    cadenceType: params.cadenceType,
    recommendedIntervalWeeks: cadenceConfig.weeks,
    recommendedTargetDate: targetDateStr,
    cadenceReasonExplanation: cadenceConfig.explanation,
    suggestedSlots,
    decision: 'pending_decision',
    selectedSlotId: null,
    scheduledReminderDate: null,
    confirmedNextAppointmentId: null,
    decidedAt: null,
  });
}

/**
 * Records the client's autonomous rebooking choice.
 */
export function recordClientRebookingChoice(
  offer: RebookingPromptOffer,
  choice:
    | { decision: 'accepted_and_booked'; selectedSlotId: string }
    | { decision: 'deferred_remind_via_sms'; reminderDate: string }
    | { decision: 'declined_book_own_pace' }
): RebookingPromptOffer {
  const now = new Date().toISOString();

  if (choice.decision === 'accepted_and_booked') {
    const nextApptId = crypto.randomUUID ? crypto.randomUUID() : 'f0710000-0000-4000-8000-000000000002';
    return RebookingPromptOfferSchema.parse({
      ...offer,
      decision: 'accepted_and_booked',
      selectedSlotId: choice.selectedSlotId,
      confirmedNextAppointmentId: nextApptId,
      decidedAt: now,
    });
  }

  if (choice.decision === 'deferred_remind_via_sms') {
    return RebookingPromptOfferSchema.parse({
      ...offer,
      decision: 'deferred_remind_via_sms',
      scheduledReminderDate: choice.reminderDate,
      decidedAt: now,
    });
  }

  return RebookingPromptOfferSchema.parse({
    ...offer,
    decision: 'declined_book_own_pace',
    decidedAt: now,
  });
}
