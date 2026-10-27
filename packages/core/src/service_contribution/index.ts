/**
 * F115 — Service Contribution Analysis
 *
 * Calculates unit-level service profitability by deducting direct backbar supplies,
 * practitioner compensation, and merchant processing fees from gross service revenue.
 *
 * Basis: Growth (G); Rules R06, R07, F143, F152, F177
 * Key Invariants:
 * 1. Truth in Accounting (Rules R06, R07):
 *    Estimated contribution is strictly labeled as 'Operational Contribution Margin',
 *    NEVER masqueraded as CPA-audited net business profit.
 * 2. Explicit Missing Cost Coverage:
 *    If direct supply costs (backbar recipes) or merchant fees are unmapped,
 *    the system flags `hasMissingCostCoverage: true` and details unmapped items.
 * 3. Floor Rate Evaluation:
 *    Tests third-party discount or off-peak promotions against owner-defined
 *    contribution floors ($ and %) to prevent margin cannibalization.
 */

export interface ServiceCostComponents {
  serviceId: string;
  serviceName: string;
  grossPriceUSD: number;
  practitionerCompensationUSD: number; // e.g. 45% commission = $67.50 on $150
  backbarSuppliesUSD?: number;         // e.g. $12.00 in serums, cleansers, masks
  merchantProcessingFeeUSD?: number;   // e.g. 2.6% + $0.10 = $4.00
  overheadAllocationUSD?: number;      // e.g. $15.00 room & laundry fee
}

export interface ContributionMarginResult {
  serviceId: string;
  serviceName: string;
  grossPriceUSD: number;
  totalDirectCostsUSD: number;
  contributionMarginUSD: number;
  contributionMarginPercentage: number;
  hasMissingCostCoverage: boolean;
  missingCostItems: string[];
  meetsContributionFloor: boolean;
  accountingDisclaimer: string;
}

export interface ContributionFloorRule {
  minimumDollarMarginUSD: number;   // e.g. $40.00
  minimumPercentageMargin: number;  // e.g. 45.0%
}

/**
 * Calculates operational contribution margin for a service line.
 */
export function calculateServiceContribution(
  components: ServiceCostComponents,
  floorRule?: ContributionFloorRule
): ContributionMarginResult {
  const missingCostItems: string[] = [];

  if (components.backbarSuppliesUSD === undefined) {
    missingCostItems.push('backbar_supplies_cost_unmapped');
  }

  if (components.merchantProcessingFeeUSD === undefined) {
    missingCostItems.push('merchant_processing_fee_unmapped');
  }

  const suppliesCost = components.backbarSuppliesUSD ?? 0;
  const merchantFee = components.merchantProcessingFeeUSD ?? 0;
  const laborCost = components.practitionerCompensationUSD;
  const overhead = components.overheadAllocationUSD ?? 0;

  const totalDirectCosts = Number((laborCost + suppliesCost + merchantFee + overhead).toFixed(2));
  const contributionMarginUSD = Number((components.grossPriceUSD - totalDirectCosts).toFixed(2));

  const contributionMarginPercentage =
    components.grossPriceUSD > 0
      ? Number(((contributionMarginUSD / components.grossPriceUSD) * 100).toFixed(1))
      : 0;

  const hasMissingCostCoverage = missingCostItems.length > 0;

  let meetsContributionFloor = true;
  if (floorRule) {
    if (
      contributionMarginUSD < floorRule.minimumDollarMarginUSD ||
      contributionMarginPercentage < floorRule.minimumPercentageMargin
    ) {
      meetsContributionFloor = false;
    }
  }

  return {
    serviceId: components.serviceId,
    serviceName: components.serviceName,
    grossPriceUSD: components.grossPriceUSD,
    totalDirectCostsUSD: totalDirectCosts,
    contributionMarginUSD,
    contributionMarginPercentage,
    hasMissingCostCoverage,
    missingCostItems,
    meetsContributionFloor,
    accountingDisclaimer:
      'Operational estimate only. Reflects unit contribution margin (Revenue less direct costs) and does not constitute GAAP-audited CPA net studio profit (Rule R06).',
  };
}
