/**
 * F132 — Tax and Receipt Configuration
 *
 * Implements effective-dated sales tax rate configurations, category-specific taxability rules
 * (services vs retail), and transparent receipt disclosures with strict revenue/liability separation.
 *
 * KEY INVARIANT (Basis: B; Checkout Foundation, Launch candidate (L)):
 * Effective-Dated Tax Rules & Revenue Separation.
 * "Tax changes are effective-dated and separately reported from business revenue."
 * Tax liability collected is credited strictly to Liability Account 2200 (Sales Tax Payable)
 * and is never co-mingled with gross business revenue. Rate adjustments are effective-dated,
 * ensuring past closed transactions and receipts retain their historical audit integrity.
 */

export interface TaxRateComponent {
  jurisdictionName: string; // e.g. 'California State', 'Los Angeles County', 'Beverly Hills City'
  ratePercentage: number; // e.g. 6.0, 0.25, 3.25
}

export interface EffectiveTaxRule {
  ruleId: string;
  name: string;
  effectiveFromDate: string; // YYYY-MM-DD
  effectiveToDate?: string;
  servicesTaxable: boolean;
  retailTaxable: boolean;
  components: TaxRateComponent[];
  totalRatePercentage: number;
  studioTaxRegistrationId: string; // e.g. 'CA-SELLER-998124'
}

export interface CheckoutLineItem {
  id: string;
  name: string;
  category: 'service' | 'retail_product' | 'tip' | 'gift_card';
  amountUSD: number;
}

export interface TaxCalculationResult {
  taxableSubtotalUSD: number;
  exemptSubtotalUSD: number;
  totalTaxLiabilityUSD: number;
  grandTotalUSD: number;
  effectiveRatePercentage: number;
  itemizedTaxLines: Array<{
    lineItemId: string;
    name: string;
    isTaxable: boolean;
    lineAmountUSD: number;
    taxAmountUSD: number;
  }>;
  liabilityAccountCode: string; // '2200'
  revenueAccountCode: string; // '4000' / '4100'
}

export interface FormattedTaxReceipt {
  receiptNumber: string;
  checkoutDate: string;
  taxRegistrationId: string;
  lines: CheckoutLineItem[];
  taxCalculation: TaxCalculationResult;
  formattedReceiptText: string;
}

/**
 * Calculates itemized taxes based on effective-dated tax rules.
 */
export function calculateCheckoutTaxes(
  lines: CheckoutLineItem[],
  rule: EffectiveTaxRule
): TaxCalculationResult {
  let taxableSubtotalUSD = 0;
  let exemptSubtotalUSD = 0;
  let totalTaxLiabilityUSD = 0;

  const itemizedTaxLines = lines.map((line) => {
    let isTaxable = false;

    if (line.category === 'retail_product' && rule.retailTaxable) {
      isTaxable = true;
    } else if (line.category === 'service' && rule.servicesTaxable) {
      isTaxable = true;
    }
    // Tips and gift cards are universally non-taxable at point of checkout

    let taxAmountUSD = 0;
    if (isTaxable) {
      taxableSubtotalUSD += line.amountUSD;
      taxAmountUSD = Math.round(line.amountUSD * (rule.totalRatePercentage / 100) * 100) / 100;
      totalTaxLiabilityUSD += taxAmountUSD;
    } else {
      exemptSubtotalUSD += line.amountUSD;
    }

    return {
      lineItemId: line.id,
      name: line.name,
      isTaxable,
      lineAmountUSD: line.amountUSD,
      taxAmountUSD,
    };
  });

  taxableSubtotalUSD = Math.round(taxableSubtotalUSD * 100) / 100;
  exemptSubtotalUSD = Math.round(exemptSubtotalUSD * 100) / 100;
  totalTaxLiabilityUSD = Math.round(totalTaxLiabilityUSD * 100) / 100;
  const grandTotalUSD = Math.round((taxableSubtotalUSD + exemptSubtotalUSD + totalTaxLiabilityUSD) * 100) / 100;

  return {
    taxableSubtotalUSD,
    exemptSubtotalUSD,
    totalTaxLiabilityUSD,
    grandTotalUSD,
    effectiveRatePercentage: rule.totalRatePercentage,
    itemizedTaxLines,
    liabilityAccountCode: '2200', // Sales Tax Payable (Liability)
    revenueAccountCode: '4000', // Gross Operating Revenue
  };
}

/**
 * Generates an itemized, compliant tax receipt with explicit liability separation.
 */
export function generateTaxReceipt(
  receiptNumber: string,
  checkoutDate: string,
  lines: CheckoutLineItem[],
  rule: EffectiveTaxRule
): FormattedTaxReceipt {
  const calculation = calculateCheckoutTaxes(lines, rule);

  const textLines = [
    `RECEIPT #${receiptNumber} • ${checkoutDate}`,
    `Tax ID: ${rule.studioTaxRegistrationId}`,
    '----------------------------------------',
    ...lines.map((l) => `${l.name} (${l.category}): $${l.amountUSD.toFixed(2)}`),
    '----------------------------------------',
    `Taxable Subtotal: $${calculation.taxableSubtotalUSD.toFixed(2)}`,
    `Exempt Subtotal:  $${calculation.exemptSubtotalUSD.toFixed(2)}`,
    `Sales Tax (${rule.totalRatePercentage}%): $${calculation.totalTaxLiabilityUSD.toFixed(2)}`,
    `GRAND TOTAL:      $${calculation.grandTotalUSD.toFixed(2)}`,
    '----------------------------------------',
    'Tax liability collected is remitted to state and municipal authorities.',
  ];

  return {
    receiptNumber,
    checkoutDate,
    taxRegistrationId: rule.studioTaxRegistrationId,
    lines,
    taxCalculation: calculation,
    formattedReceiptText: textLines.join('\n'),
  };
}
