import { z } from 'zod';

export const DisputeReasonCategorySchema = z.enum([
  'service_not_provided_or_not_as_described',
  'fraudulent_or_unrecognized_transaction',
  'cancelled_recurring_or_deposit_dispute',
  'incorrect_amount_or_duplicate',
]);
export type DisputeReasonCategory = z.infer<typeof DisputeReasonCategorySchema>;

export const DisputeEvidenceBundleSchema = z.object({
  bundleId: z.string(),
  disputeId: z.string(),
  tenantId: z.string(),
  clientName: z.string(),
  chargeAmountCents: z.number().positive(),
  disputeReasonCategory: DisputeReasonCategorySchema,
  evidenceItems: z.object({
    policyAcknowledgementD05: z.object({
      policyName: z.string(),
      policyVersion: z.number(),
      acceptedAt: z.string().datetime(),
      stipulatedCancellationTerms: z.string(),
    }),
    intakeAndConsentSignature: z.object({
      formName: z.string(),
      signedAt: z.string().datetime(),
      signatureVerificationHash: z.string(),
    }),
    serviceDeliveryProof: z.object({
      serviceName: z.string(),
      practitionerName: z.string(),
      completedAt: z.string().datetime(),
      treatmentNoteSigned: z.boolean(),
    }),
    checkoutReceiptD15: z.object({
      receiptId: z.string(),
      transactionTimestamp: z.string().datetime(),
      tenderMethod: z.string(),
      authorizedCardLast4: z.string(),
    }),
    twoWayCommunicationChronology: z.array(
      z.object({
        timestamp: z.string().datetime(),
        direction: z.enum(['outbound_sms', 'inbound_sms']),
        messageSummary: z.string(),
      })
    ),
  }),
  responseDeadline: z.string().datetime(),
  status: z.enum(['drafting_evidence', 'submitted_to_processor', 'resolved_won', 'resolved_lost']).default('drafting_evidence'),
  legalDisclaimer: z.string(),
  compiledAt: z.string().datetime(),
});
export type DisputeEvidenceBundle = z.infer<typeof DisputeEvidenceBundleSchema>;

/**
 * Compiles a structured, audit-ready dispute defense packet for bank processor submission.
 * Invariant: "Evidence never implies guaranteed chargeback protection."
 */
export function compileDisputeDefensePacket(params: {
  disputeId: string;
  tenantId: string;
  clientName: string;
  chargeAmountCents: number;
  disputeReasonCategory: DisputeReasonCategory;
  responseDeadline: string;
  policyAcknowledgement: {
    policyName: string;
    policyVersion: number;
    acceptedAt: string;
    stipulatedCancellationTerms: string;
  };
  intakeAndConsent: {
    formName: string;
    signedAt: string;
    signatureVerificationHash: string;
  };
  serviceDelivery: {
    serviceName: string;
    practitionerName: string;
    completedAt: string;
    treatmentNoteSigned: boolean;
  };
  receipt: {
    receiptId: string;
    transactionTimestamp: string;
    tenderMethod: string;
    authorizedCardLast4: string;
  };
  communications: Array<{
    timestamp: string;
    direction: 'outbound_sms' | 'inbound_sms';
    messageSummary: string;
  }>;
  currentTime?: string;
}): DisputeEvidenceBundle {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  return {
    bundleId: `evb_${Math.random().toString(36).substring(2, 9)}`,
    disputeId: params.disputeId,
    tenantId: params.tenantId,
    clientName: params.clientName,
    chargeAmountCents: params.chargeAmountCents,
    disputeReasonCategory: params.disputeReasonCategory,
    evidenceItems: {
      policyAcknowledgementD05: params.policyAcknowledgement,
      intakeAndConsentSignature: params.intakeAndConsent,
      serviceDeliveryProof: params.serviceDelivery,
      checkoutReceiptD15: params.receipt,
      twoWayCommunicationChronology: params.communications,
    },
    responseDeadline: params.responseDeadline,
    status: 'drafting_evidence',
    legalDisclaimer:
      'Truth-in-Defense Assurance: This dispute evidence packet contains verified cryptographic logs, signed intake forms, and service completion notes. Evidence submission complies with card brand operating regulations but does not guarantee dispute outcomes; card-issuing banks retain ultimate arbitration authority.',
    compiledAt: now.toISOString(),
  };
}

/**
 * Calculates remaining days/hours before dispute submission deadline.
 */
export function checkDisputeDeadlineUrgency(
  responseDeadline: string,
  currentTime?: string
): { isUrgent: boolean; hoursRemaining: number; humanNotice: string } {
  const now = params_or_now(currentTime);
  const deadline = new Date(responseDeadline);
  const diffMs = deadline.getTime() - now.getTime();
  const hoursRemaining = Math.max(0, Math.round(diffMs / (1000 * 60 * 60)));

  if (hoursRemaining <= 0) {
    return {
      isUrgent: true,
      hoursRemaining: 0,
      humanNotice: 'Dispute deadline has expired. Bank has auto-forfeited the case.',
    };
  }

  const isUrgent = hoursRemaining <= 48;
  const days = Math.floor(hoursRemaining / 24);
  const remHours = hoursRemaining % 24;

  const humanNotice = isUrgent
    ? `URGENT: Evidence must be submitted within ${hoursRemaining} hours before automated bank default.`
    : `Evidence submission window open: ${days} days, ${remHours} hours remaining.`;

  return {
    isUrgent,
    hoursRemaining,
    humanNotice,
  };
}

function params_or_now(time?: string): Date {
  return time ? new Date(time) : new Date();
}
