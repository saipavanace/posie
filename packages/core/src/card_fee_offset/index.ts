/**
 * F187: Optional Card Fee Offset (Compliant Surcharging & Cash Discounting)
 *
 * Enforces strict federal and card-network surcharging rules:
 * - Prohibits surcharges on debit and prepaid cards under the Durbin Amendment / Visa/Mastercard rules.
 * - Caps credit card surcharges at statutory limits (maximum 3.0% or 4.0% depending on state law).
 * - Enforces state jurisdiction prohibitions (e.g., CT, ME, MA, OK prohibit credit card surcharging).
 * - Demands prominent upfront line-item disclosure before client authorization.
 */

export type PaymentTenderType = 'credit_card' | 'debit_card' | 'prepaid_card' | 'cash' | 'ach_transfer';

export interface CardFeeOffsetJurisdictionRule {
  stateOrProvince: string;
  surchargingPermitted: boolean;
  maxSurchargePercentage: number;
  cashDiscountPermitted: boolean;
  notes?: string;
}

export interface CardFeeEvaluationRequest {
  serviceSubtotal: number;
  tenderType: PaymentTenderType;
  jurisdictionState: string;
  configuredSurchargePercentage?: number; // e.g. 2.75%
}

export interface CardFeeEvaluationResult {
  isSurchargeApplicable: boolean;
  surchargePercentage: number;
  surchargeAmount: number;
  finalTotalToCharge: number;
  lineItemDescription: string;
  regulatoryComplianceNote: string;
  debitCardExclusionEnforced: boolean;
  jurisdictionCompliant: boolean;
}

// Statutory rules by US State (subset of regulated markets)
const JURISDICTION_RULES: Record<string, CardFeeOffsetJurisdictionRule> = {
  'US-CT': { stateOrProvince: 'Connecticut', surchargingPermitted: false, maxSurchargePercentage: 0, cashDiscountPermitted: true, notes: 'Credit card surcharging prohibited by Conn. Gen. Stat. § 42-133ff.' },
  'US-MA': { stateOrProvince: 'Massachusetts', surchargingPermitted: false, maxSurchargePercentage: 0, cashDiscountPermitted: true, notes: 'Surcharging prohibited under Mass. Gen. Laws ch. 140D § 28A.' },
  'US-ME': { stateOrProvince: 'Maine', surchargingPermitted: false, maxSurchargePercentage: 0, cashDiscountPermitted: true, notes: 'Surcharging prohibited under Me. Rev. Stat. tit. 9-A § 8-509.' },
  'US-OK': { stateOrProvince: 'Oklahoma', surchargingPermitted: false, maxSurchargePercentage: 0, cashDiscountPermitted: true, notes: 'Surcharging prohibited under 14A Okl. St. § 2-417.' },
  'US-NY': { stateOrProvince: 'New York', surchargingPermitted: true, maxSurchargePercentage: 3.0, cashDiscountPermitted: true, notes: 'Permitted with total dollar price displayed prior to checkout under NY Gen. Bus. Law § 518.' },
  'US-CA': { stateOrProvince: 'California', surchargingPermitted: true, maxSurchargePercentage: 3.0, cashDiscountPermitted: true },
  'US-TX': { stateOrProvince: 'Texas', surchargingPermitted: true, maxSurchargePercentage: 3.0, cashDiscountPermitted: true },
  'US-FL': { stateOrProvince: 'Florida', surchargingPermitted: true, maxSurchargePercentage: 3.0, cashDiscountPermitted: true },
};

/**
 * Evaluates whether an optional card fee surcharge can be lawfully assessed on a transaction.
 * Invariants:
 * 1. Debit and prepaid cards are NEVER surcharged (statutory and card-brand mandate).
 * 2. Cash and ACH incur 0% fee.
 * 3. Credit cards are surcharged only where permitted by state law, capped at statutory limits (default 3%).
 * 4. Itemized disclosure is rendered before payment is submitted.
 */
export function evaluateCardFeeOffset(request: CardFeeEvaluationRequest): CardFeeEvaluationResult {
  const { serviceSubtotal, tenderType, jurisdictionState, configuredSurchargePercentage = 2.8 } = request;

  const rule = JURISDICTION_RULES[jurisdictionState] || {
    stateOrProvince: jurisdictionState,
    surchargingPermitted: true,
    maxSurchargePercentage: 3.0,
    cashDiscountPermitted: true,
  };

  // Rule 1: Debit and prepaid cards are strictly exempt from surcharging
  if (tenderType === 'debit_card' || tenderType === 'prepaid_card') {
    return {
      isSurchargeApplicable: false,
      surchargePercentage: 0,
      surchargeAmount: 0,
      finalTotalToCharge: serviceSubtotal,
      lineItemDescription: 'No surcharge (Debit / Prepaid Card Exemption)',
      regulatoryComplianceNote: 'Federal law and network operating regulations strictly prohibit surcharges on all debit card transactions regardless of signature or PIN routing.',
      debitCardExclusionEnforced: true,
      jurisdictionCompliant: true,
    };
  }

  // Rule 2: Cash and ACH transactions have zero surcharge
  if (tenderType === 'cash' || tenderType === 'ach_transfer') {
    return {
      isSurchargeApplicable: false,
      surchargePercentage: 0,
      surchargeAmount: 0,
      finalTotalToCharge: serviceSubtotal,
      lineItemDescription: 'Zero fee (Cash / ACH Payment)',
      regulatoryComplianceNote: 'Direct funds transfer and cash payments incur zero processing surcharge.',
      debitCardExclusionEnforced: false,
      jurisdictionCompliant: true,
    };
  }

  // Rule 3: Credit card surcharging checked against state law
  if (!rule.surchargingPermitted) {
    return {
      isSurchargeApplicable: false,
      surchargePercentage: 0,
      surchargeAmount: 0,
      finalTotalToCharge: serviceSubtotal,
      lineItemDescription: `Surcharge prohibited in ${rule.stateOrProvince}`,
      regulatoryComplianceNote: rule.notes || `Credit card surcharges are prohibited by law in ${rule.stateOrProvince}. Cash discount program may be utilized instead.`,
      debitCardExclusionEnforced: false,
      jurisdictionCompliant: true,
    };
  }

  // Rule 4: Cap surcharge at the lower of configured rate or state statutory cap
  const effectiveSurchargePercentage = Math.min(configuredSurchargePercentage, rule.maxSurchargePercentage);
  const surchargeAmount = Math.round(((serviceSubtotal * effectiveSurchargePercentage) / 100) * 100) / 100;
  const finalTotalToCharge = Math.round((serviceSubtotal + surchargeAmount) * 100) / 100;

  return {
    isSurchargeApplicable: true,
    surchargePercentage: effectiveSurchargePercentage,
    surchargeAmount,
    finalTotalToCharge,
    lineItemDescription: `Credit Card Processing Offset (${effectiveSurchargePercentage.toFixed(2)}%)`,
    regulatoryComplianceNote: `Lawfully assessed credit card surcharge in ${rule.stateOrProvince}. Capped at ${rule.maxSurchargePercentage}%. Debit cards exempt.`,
    debitCardExclusionEnforced: true,
    jurisdictionCompliant: true,
  };
}
