/**
 * Posie Core Engine - Embedded Working Capital (F178)
 *
 * Implements merchant working capital advances, transparent fixed-fee underwriting,
 * daily card sales holdback calculations, and regulated lending partner disclosures.
 *
 * Domain Invariant (Basis: Validate separately (V); PAY FIN LEG PART, WB F178, Rule F178, Table 91):
 * Offers business capital through regulated lending partners with transparent terms.
 * Costs feature a single fixed factor fee with zero compounding interest or late fees.
 * Daily repayments are calculated as a fixed percentage holdback of daily card batches.
 * Software explicitly does not promise guaranteed approvals; merchant capital is
 * strictly distinguished from consumer Buy-Now-Pay-Later (BNPL).
 */

export interface WorkingCapitalOffer {
  offerId: string;
  salonId: string;
  advanceAmount: number; // e.g. $10,000
  fixedFactorFee: number; // e.g. $1,200 (1.12 factor rate)
  totalRepaymentAmount: number; // $11,200
  holdbackPercentage: number; // e.g. 10% of daily card transactions
  estimatedRepaymentMonths: number;
  underwritingPartnerName: string;
  disclosures: string[];
}

export interface ActiveWorkingCapitalAdvance {
  advanceId: string;
  salonId: string;
  originalAdvance: number;
  totalRepaymentTarget: number;
  totalRepaidSoFar: number;
  remainingBalance: number;
  holdbackPercentage: number;
  status: 'active_repaying' | 'fully_settled';
  disbursedAt: string;
  lastDeductionAt?: string;
}

/**
 * Generates an embedded working capital offer based on trailing card processing volume.
 */
export function generateWorkingCapitalOffer(
  salonId: string,
  trailingMonthlyVolume: number,
  requestedAmount: number
): WorkingCapitalOffer {
  const maxEligible = Math.round(trailingMonthlyVolume * 1.5 * 100) / 100;
  if (requestedAmount > maxEligible) {
    throw new Error(`Requested advance of $${requestedAmount} exceeds maximum eligible amount of $${maxEligible}.`);
  }

  // Transparent factor rate: 1.12 (12% flat fee)
  const factorRate = 1.12;
  const totalRepayment = Math.round(requestedAmount * factorRate * 100) / 100;
  const fixedFee = Math.round((totalRepayment - requestedAmount) * 100) / 100;

  return {
    offerId: `offer_wc_${salonId}_${Date.now()}`,
    salonId,
    advanceAmount: requestedAmount,
    fixedFactorFee: fixedFee,
    totalRepaymentAmount: totalRepayment,
    holdbackPercentage: 10.0, // 10% daily holdback
    estimatedRepaymentMonths: 9,
    underwritingPartnerName: 'Celtic Bank / Stripe Capital Partner LLC',
    disclosures: [
      'Fixed fee: No compounding interest, no early payment penalties, and no late fees.',
      'Financing is underwritten by our regulated commercial banking partner.',
      'Software does not guarantee final underwriting approval or credit extension.',
    ],
  };
}

/**
 * Accepts a working capital offer and disburses active advance.
 */
export function acceptWorkingCapitalAdvance(
  offer: WorkingCapitalOffer,
  salonOwnerConfirmed: boolean
): ActiveWorkingCapitalAdvance {
  if (!salonOwnerConfirmed) {
    throw new Error('Working capital agreement requires explicit salon owner acceptance.');
  }

  return {
    advanceId: `adv_${offer.offerId}`,
    salonId: offer.salonId,
    originalAdvance: offer.advanceAmount,
    totalRepaymentTarget: offer.totalRepaymentAmount,
    totalRepaidSoFar: 0,
    remainingBalance: offer.totalRepaymentAmount,
    holdbackPercentage: offer.holdbackPercentage,
    status: 'active_repaying',
    disbursedAt: new Date().toISOString(),
  };
}

/**
 * Deducts daily holdback percentage from settled card batches towards advance balance.
 */
export function settleDailyHoldbackDeduction(
  advance: ActiveWorkingCapitalAdvance,
  dailyCardBatchGross: number
): {
  netPayoutToSalon: number;
  holdbackDeducted: number;
  remainingAdvanceBalance: number;
  isFullySettled: boolean;
} {
  if (advance.status === 'fully_settled' || advance.remainingBalance <= 0) {
    return {
      netPayoutToSalon: dailyCardBatchGross,
      holdbackDeducted: 0,
      remainingAdvanceBalance: 0,
      isFullySettled: true,
    };
  }

  const rawHoldback = Math.round(((dailyCardBatchGross * advance.holdbackPercentage) / 100) * 100) / 100;
  const holdbackDeducted = Math.min(rawHoldback, advance.remainingBalance);
  const netPayout = Math.round((dailyCardBatchGross - holdbackDeducted) * 100) / 100;
  const remaining = Math.round((advance.remainingBalance - holdbackDeducted) * 100) / 100;

  advance.totalRepaidSoFar = Math.round((advance.totalRepaidSoFar + holdbackDeducted) * 100) / 100;
  advance.remainingBalance = remaining;
  advance.lastDeductionAt = new Date().toISOString();

  if (remaining === 0) {
    advance.status = 'fully_settled';
  }

  return {
    netPayoutToSalon: netPayout,
    holdbackDeducted,
    remainingAdvanceBalance: remaining,
    isFullySettled: remaining === 0,
  };
}
