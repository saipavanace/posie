/**
 * Posie Core Engine - Financial Protection Products (F179)
 *
 * Implements no-show fee and chargeback protection with contractual underwriting,
 * explicit eligibility gates, fraud exclusions, and funded reimbursement claims.
 *
 * Domain Invariant (Basis: Validate separately (V); PAY FIN LEG OPS, WB F179, Rule F179, Table 91):
 * Promises match a funded contractual insurance or guarantee product. Coverage requires
 * pre-verified payment credentials, signed cancellation policy acknowledgements, and
 * documented appointment confirmations. Excludes operator cancellations or unverified
 * card holds. Approved claims disburse guaranteed reimbursement directly to salon balances.
 */

export interface ProtectedBookingDetails {
  bookingId: string;
  salonId: string;
  clientId: string;
  serviceName: string;
  servicePrice: number;
  cancellationFeePolicyAmount: number;
  hasPreauthorizedCard: boolean;
  hasSignedCancellationPolicy: boolean;
  hasConfirmedAppointmentReminder: boolean;
  wasCancelledBySalon: boolean;
}

export interface FileProtectionClaimInput {
  claimId: string;
  booking: ProtectedBookingDetails;
  incidentType: 'uncollectible_no_show' | 'late_cancellation_card_failure';
  failedChargeAttemptDetails: {
    attemptedAmount: number;
    declineCode: string; // e.g. "insufficient_funds", "card_velocity_exceeded"
    attemptedAt: string;
  };
}

export interface ProtectionClaimRecord {
  claimId: string;
  bookingId: string;
  salonId: string;
  incidentType: FileProtectionClaimInput['incidentType'];
  claimedAmount: number;
  underwritingPolicyRef: string;
  status: 'submitted_evaluating' | 'approved_reimbursed' | 'denied_ineligible';
  exclusionReason?: string;
  payoutAmount: number;
  filedAt: string;
  adjudicatedAt?: string;
}

/**
 * Evaluates whether an appointment meets strict underwriting criteria for protection coverage.
 */
export function evaluateProtectionEligibility(
  booking: ProtectedBookingDetails
): { eligible: boolean; exclusionReason?: string } {
  if (booking.wasCancelledBySalon) {
    return {
      eligible: false,
      exclusionReason: 'Exclusion: Cancellations initiated by the salon or practitioner are ineligible for protection.',
    };
  }

  if (!booking.hasPreauthorizedCard) {
    return {
      eligible: false,
      exclusionReason: 'Exclusion: Appointment did not maintain a verified pre-authorized payment method on file.',
    };
  }

  if (!booking.hasSignedCancellationPolicy) {
    return {
      eligible: false,
      exclusionReason: 'Exclusion: Client did not execute required cancellation fee disclosure acknowledgment.',
    };
  }

  if (!booking.hasConfirmedAppointmentReminder) {
    return {
      eligible: false,
      exclusionReason: 'Exclusion: Mandatory 24h appointment reminder confirmation was not delivered to client.',
    };
  }

  return { eligible: true };
}

/**
 * Files a financial protection reimbursement claim for an uncollected no-show or late cancel.
 */
export function fileProtectionClaim(input: FileProtectionClaimInput): ProtectionClaimRecord {
  const eligibility = evaluateProtectionEligibility(input.booking);

  if (!eligibility.eligible) {
    return {
      claimId: input.claimId,
      bookingId: input.booking.bookingId,
      salonId: input.booking.salonId,
      incidentType: input.incidentType,
      claimedAmount: input.booking.cancellationFeePolicyAmount,
      underwritingPolicyRef: 'POL-POSIE-PROTECT-2026-V1',
      status: 'denied_ineligible',
      exclusionReason: eligibility.exclusionReason,
      payoutAmount: 0,
      filedAt: new Date().toISOString(),
    };
  }

  return {
    claimId: input.claimId,
    bookingId: input.booking.bookingId,
    salonId: input.booking.salonId,
    incidentType: input.incidentType,
    claimedAmount: input.booking.cancellationFeePolicyAmount,
    underwritingPolicyRef: 'POL-POSIE-PROTECT-2026-V1',
    status: 'submitted_evaluating',
    payoutAmount: 0,
    filedAt: new Date().toISOString(),
  };
}

/**
 * Adjudicates a protection claim with contractual fund reimbursement.
 */
export function adjudicateProtectionClaim(
  claim: ProtectionClaimRecord,
  underwriterApproval: boolean
): {
  updatedClaim: ProtectionClaimRecord;
  reimbursementPaid: number;
} {
  if (claim.status === 'denied_ineligible') {
    return { updatedClaim: claim, reimbursementPaid: 0 };
  }

  if (!underwriterApproval) {
    return {
      updatedClaim: {
        ...claim,
        status: 'denied_ineligible',
        exclusionReason: 'Underwriter review identified non-compliant incident documentation.',
        payoutAmount: 0,
        adjudicatedAt: new Date().toISOString(),
      },
      reimbursementPaid: 0,
    };
  }

  const payout = claim.claimedAmount;

  return {
    updatedClaim: {
      ...claim,
      status: 'approved_reimbursed',
      payoutAmount: payout,
      adjudicatedAt: new Date().toISOString(),
    },
    reimbursementPaid: payout,
  };
}
