/**
 * F186: Client Pay Over Time (Buy-Now-Pay-Later)
 *
 * Offers eligible consumer installment financing (BNPL) through regulated partners (e.g. Klarna, Affirm, Afterpay),
 * strictly segregated from merchant working capital (F178) and daily payout schedules (F090).
 * Guarantees 100% upfront salon payout protection against client default, transparent schedule breakdowns,
 * and proportional refund adjustments.
 */

export type BnplPartnerProvider = 'affirm' | 'klarna' | 'afterpay';

export interface BnplInstallmentPlan {
  planId: string;
  provider: BnplPartnerProvider;
  totalServiceAmount: number;
  numberOfInstallments: number;
  installmentAmount: number;
  dueDates: string[];
  aprPercentage: number;
  financeFeeTotal: number;
}

export interface BnplCheckoutEvaluation {
  isEligible: boolean;
  ineligibilityReason?: string;
  minTransactionAmount: number;
  maxTransactionAmount: number;
  offeredPlans: BnplInstallmentPlan[];
}

export interface BnplOrderSettlement {
  settlementId: string;
  bookingId: string;
  provider: BnplPartnerProvider;
  grossServiceAmount: number;
  partnerInterchangeFee: number;
  salonImmediatePayoutAmount: number;
  clientInstallmentTotal: number;
  defaultRiskAssumedBy: 'financing_partner_exclusive';
  settledAt: string;
  status: 'settled_funded' | 'refunded_partially' | 'refunded_fully';
}

export interface BnplRefundAdjustment {
  refundId: string;
  settlementId: string;
  refundAmount: number;
  salonLedgerDeduction: number;
  clientRemainingInstallmentReduction: number;
  adjustedAt: string;
}

/**
 * Evaluates transaction eligibility for Buy-Now-Pay-Later checkout,
 * enforcing minimum and maximum transaction bands ($50 to $4,000).
 */
export function evaluateBnplCheckoutEligibility(
  totalServiceAmount: number,
  provider: BnplPartnerProvider = 'klarna'
): BnplCheckoutEvaluation {
  const minAmount = 50.0;
  const maxAmount = 4000.0;

  if (totalServiceAmount < minAmount) {
    return {
      isEligible: false,
      ineligibilityReason: `Transaction amount $${totalServiceAmount.toFixed(2)} is below minimum BNPL threshold of $${minAmount.toFixed(2)}.`,
      minTransactionAmount: minAmount,
      maxTransactionAmount: maxAmount,
      offeredPlans: [],
    };
  }

  if (totalServiceAmount > maxAmount) {
    return {
      isEligible: false,
      ineligibilityReason: `Transaction amount $${totalServiceAmount.toFixed(2)} exceeds maximum BNPL threshold of $${maxAmount.toFixed(2)}.`,
      minTransactionAmount: minAmount,
      maxTransactionAmount: maxAmount,
      offeredPlans: [],
    };
  }

  // 4 interest-free bi-weekly installments (Pay in 4)
  const installmentAmount = Math.round((totalServiceAmount / 4) * 100) / 100;
  const now = new Date();
  const dueDates = [0, 14, 28, 42].map((days) => {
    const d = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return d.toISOString().split('T')[0];
  });

  const payIn4Plan: BnplInstallmentPlan = {
    planId: `bnpl_plan_4pay_${Date.now()}`,
    provider,
    totalServiceAmount,
    numberOfInstallments: 4,
    installmentAmount,
    dueDates,
    aprPercentage: 0,
    financeFeeTotal: 0,
  };

  return {
    isEligible: true,
    minTransactionAmount: minAmount,
    maxTransactionAmount: maxAmount,
    offeredPlans: [payIn4Plan],
  };
}

/**
 * Executes BNPL settlement upon booking completion.
 * Invariant: The salon receives 100% upfront payout immediately (minus standard partner fee),
 * while the financing partner assumes 100% of consumer installment collection and default risk.
 */
export function settleBnplBooking(
  bookingId: string,
  plan: BnplInstallmentPlan,
  partnerFeeRate = 0.059, // 5.9% standard BNPL rate
  fixedPartnerFee = 0.3
): BnplOrderSettlement {
  const partnerInterchangeFee = Math.round((plan.totalServiceAmount * partnerFeeRate + fixedPartnerFee) * 100) / 100;
  const salonImmediatePayoutAmount = Math.round((plan.totalServiceAmount - partnerInterchangeFee) * 100) / 100;

  return {
    settlementId: `settle_bnpl_${Date.now()}`,
    bookingId,
    provider: plan.provider,
    grossServiceAmount: plan.totalServiceAmount,
    partnerInterchangeFee,
    salonImmediatePayoutAmount,
    clientInstallmentTotal: plan.totalServiceAmount,
    defaultRiskAssumedBy: 'financing_partner_exclusive',
    settledAt: new Date().toISOString(),
    status: 'settled_funded',
  };
}

/**
 * Processes a refund on a BNPL order, proportionally adjusting the salon's ledger
 * and the client's outstanding installment obligation with the financing partner.
 */
export function processBnplRefund(
  settlement: BnplOrderSettlement,
  refundAmount: number
): { updatedSettlement: BnplOrderSettlement; refundAdjustment: BnplRefundAdjustment } {
  if (refundAmount <= 0 || refundAmount > settlement.grossServiceAmount) {
    throw new Error('Invalid refund amount: must be positive and not exceed gross service amount.');
  }

  const salonLedgerDeduction = Math.round(refundAmount * 100) / 100;
  const clientRemainingInstallmentReduction = Math.round(refundAmount * 100) / 100;
  const isFullRefund = refundAmount === settlement.grossServiceAmount;

  const refundAdjustment: BnplRefundAdjustment = {
    refundId: `ref_bnpl_${Date.now()}`,
    settlementId: settlement.settlementId,
    refundAmount,
    salonLedgerDeduction,
    clientRemainingInstallmentReduction,
    adjustedAt: new Date().toISOString(),
  };

  const updatedSettlement: BnplOrderSettlement = {
    ...settlement,
    status: isFullRefund ? 'refunded_fully' : 'refunded_partially',
  };

  return { updatedSettlement, refundAdjustment };
}
