import { z } from 'zod';

export const NoShowPolicyEvidenceSchema = z.object({
  policyVersion: z.number().int().positive(),
  policyAcknowledgementId: z.string(),
  cancellationCutoffHours: z.number().positive(),
  stipulatedFeeCents: z.number().positive(),
  acknowledgedTimestamp: z.string().datetime(),
});
export type NoShowPolicyEvidence = z.infer<typeof NoShowPolicyEvidenceSchema>;

export const NoShowCollectionStatusSchema = z.enum([
  'eligible_for_collection',
  'fee_collected_successfully',
  'card_declined_recovery_link_dispatched',
  'fee_waived_by_manager',
  'debt_settled_by_client',
]);
export type NoShowCollectionStatus = z.infer<typeof NoShowCollectionStatusSchema>;

export const NoShowCaseRecordSchema = z.object({
  caseId: z.string(),
  tenantId: z.string(),
  appointmentId: z.string(),
  clientId: z.string(),
  clientName: z.string(),
  clientPhone: z.string(),
  serviceName: z.string(),
  scheduledStartTime: z.string().datetime(),
  feeAttemptedCents: z.number().positive(),
  policyEvidence: NoShowPolicyEvidenceSchema,
  status: NoShowCollectionStatusSchema,
  processorChargeId: z.string().optional(),
  declineReason: z.string().optional(),
  recoveryToken: z.string().optional(),
  recoveryLinkUrl: z.string().optional(),
  isClientProfileRestricted: z.boolean().default(false),
  waiveReason: z.string().optional(),
  waivedByStaffName: z.string().optional(),
  createdAt: z.string().datetime(),
  resolvedAt: z.string().datetime().optional(),
});
export type NoShowCaseRecord = z.infer<typeof NoShowCaseRecordSchema>;

/**
 * Initiates the no-show fee collection workflow against a vaulted card.
 * Invariant: "A saved card is never represented as guaranteed collectible funds."
 * If the card declines, an honest recovery path is initiated rather than leaving owners in the dark.
 */
export function executeNoShowFeeCollection(params: {
  tenantId: string;
  appointmentId: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  serviceName: string;
  scheduledStartTime: string;
  feeAmountCents: number;
  policyEvidence: NoShowPolicyEvidence;
  cardSimulatedResult: {
    success: boolean;
    processorChargeId?: string;
    declineCode?: string;
  };
  currentTime?: string;
}): NoShowCaseRecord {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const caseId = `ns_${Math.random().toString(36).substring(2, 9)}`;

  if (params.cardSimulatedResult.success) {
    return {
      caseId,
      tenantId: params.tenantId,
      appointmentId: params.appointmentId,
      clientId: params.clientId,
      clientName: params.clientName,
      clientPhone: params.clientPhone,
      serviceName: params.serviceName,
      scheduledStartTime: params.scheduledStartTime,
      feeAttemptedCents: params.feeAmountCents,
      policyEvidence: params.policyEvidence,
      status: 'fee_collected_successfully',
      processorChargeId: params.cardSimulatedResult.processorChargeId ?? `ch_ns_${Math.random().toString(36).substring(2, 8)}`,
      isClientProfileRestricted: false,
      createdAt: now.toISOString(),
      resolvedAt: now.toISOString(),
    };
  } else {
    // Card declined (insufficient funds, expired card, blocked merchant)
    const recoveryToken = `rec_${Math.random().toString(36).substring(2, 12)}`;
    return {
      caseId,
      tenantId: params.tenantId,
      appointmentId: params.appointmentId,
      clientId: params.clientId,
      clientName: params.clientName,
      clientPhone: params.clientPhone,
      serviceName: params.serviceName,
      scheduledStartTime: params.scheduledStartTime,
      feeAttemptedCents: params.feeAmountCents,
      policyEvidence: params.policyEvidence,
      status: 'card_declined_recovery_link_dispatched',
      declineReason: params.cardSimulatedResult.declineCode ?? 'card_declined_insufficient_funds',
      recoveryToken,
      recoveryLinkUrl: `posie.com/settle/${recoveryToken}`,
      isClientProfileRestricted: true, // Requires settlement before new online bookings
      createdAt: now.toISOString(),
    };
  }
}

/**
 * Manager courtesy override / fee waiver.
 */
export function waiveNoShowFee(params: {
  caseRecord: NoShowCaseRecord;
  waiveReason: string;
  managerName: string;
  currentTime?: string;
}): NoShowCaseRecord {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  return {
    ...params.caseRecord,
    status: 'fee_waived_by_manager',
    waiveReason: params.waiveReason,
    waivedByStaffName: params.managerName,
    isClientProfileRestricted: false, // Restrictions lifted upon waiver
    resolvedAt: now.toISOString(),
  };
}

/**
 * Client resolves outstanding fee via self-service recovery link.
 */
export function settleNoShowRecoveryLink(params: {
  caseRecord: NoShowCaseRecord;
  paymentReferenceId: string;
  currentTime?: string;
}): NoShowCaseRecord {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  return {
    ...params.caseRecord,
    status: 'debt_settled_by_client',
    processorChargeId: params.paymentReferenceId,
    isClientProfileRestricted: false,
    resolvedAt: now.toISOString(),
  };
}
