/**
 * Posie Core - F151: What-If Business Planning
 *
 * Implements interactive scenario planning allowing salon owners to preview the financial
 * and workload effects of schedule changes, price adjustments, service mix shifts, or staffing
 * additions. Enables owners to protect lifestyle time off (e.g., taking Mondays or Fridays off)
 * while verifying whether explicit weekly direct contribution floors are preserved.
 *
 * Compliance: Follows Posie Rule DR03 & WB F151 (Trusted historical costs and explicit owner-entered
 * assumptions; scenarios never become actual forecasts without validation; decision tools).
 */

export interface BaselineFinancialMetrics {
  weeklyServiceRevenueCents: number;
  weeklyRetailRevenueCents: number;
  weeklyLaborCostCents: number;
  weeklyProductCostCents: number;
  weeklyOperatingOverheadCents: number;
  weeklyOwnerHoursWorked: number;
  weeklyDirectContributionCents: number;
}

export interface WhatIfAssumptions {
  scenarioName: string;
  targetDaysOff: string[]; // e.g. ['Monday', 'Sunday']
  targetOwnerMaxHoursPerWeek: number; // e.g. 32 hours
  priceAdjustmentPercentage: number; // e.g. +10%
  serviceVolumeMultiplier: number; // e.g. 0.95 (due to price elasticity)
  staffHeadcountDelta: number; // e.g. +1 assistant / provider
  additionalWeeklyLaborCostCents: number;
  minimumWeeklyContributionFloorCents: number; // owner-specified floor
}

export interface WhatIfScenarioOutcome {
  scenarioId: string;
  scenarioName: string;
  assumptions: WhatIfAssumptions;
  projectedFinancials: {
    grossRevenueCents: number;
    laborCostCents: number;
    productCostCents: number;
    overheadCostCents: number;
    netContributionCents: number;
    contributionMarginPct: number;
  };
  ownerWorkload: {
    projectedWeeklyHours: number;
    hoursSavedPerWeek: number;
    targetTimeOffAchieved: boolean;
  };
  meetsContributionFloor: boolean;
  tradeoffSummary: string;
  isApprovedForImplementation: boolean;
}

/**
 * Simulates financial and quality-of-life outcomes for an owner-entered What-If scenario
 */
export function simulateWhatIfScenario(
  baseline: BaselineFinancialMetrics,
  assumptions: WhatIfAssumptions
): WhatIfScenarioOutcome {
  const scenarioId = `scen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  // 1. Calculate projected service revenue
  const priceMultiplier = 1 + assumptions.priceAdjustmentPercentage / 100;
  const projectedServiceRev = Math.round(
    baseline.weeklyServiceRevenueCents * priceMultiplier * assumptions.serviceVolumeMultiplier
  );
  const projectedGrossRevenue = projectedServiceRev + baseline.weeklyRetailRevenueCents;

  // 2. Calculate projected costs
  const projectedLaborCost = baseline.weeklyLaborCostCents + assumptions.additionalWeeklyLaborCostCents;
  // Product cost scales with service volume
  const projectedProductCost = Math.round(baseline.weeklyProductCostCents * assumptions.serviceVolumeMultiplier);
  const overheadCost = baseline.weeklyOperatingOverheadCents;

  // 3. Direct Contribution = Gross Revenue - Labor - Products
  const netContribution = projectedGrossRevenue - projectedLaborCost - projectedProductCost - overheadCost;
  const contributionMarginPct = Math.round((netContribution / Math.max(1, projectedGrossRevenue)) * 1000) / 10;

  // 4. Owner Workload & Time Off evaluation
  // If owner hires an assistant or closes an extra day, owner hours scale down
  let projectedOwnerHours = baseline.weeklyOwnerHoursWorked;
  if (assumptions.staffHeadcountDelta > 0) {
    projectedOwnerHours = Math.max(10, projectedOwnerHours - assumptions.staffHeadcountDelta * 8);
  }
  if (assumptions.targetDaysOff.length > 2) {
    // 3 or more days off -> fewer hours
    projectedOwnerHours = Math.min(projectedOwnerHours, assumptions.targetOwnerMaxHoursPerWeek);
  }

  const hoursSaved = Math.max(0, baseline.weeklyOwnerHoursWorked - projectedOwnerHours);
  const targetTimeOffAchieved = projectedOwnerHours <= assumptions.targetOwnerMaxHoursPerWeek;
  const meetsContributionFloor = netContribution >= assumptions.minimumWeeklyContributionFloorCents;

  let tradeoff = '';
  if (meetsContributionFloor && targetTimeOffAchieved) {
    tradeoff = `Balanced Win: Generates $${(netContribution / 100).toFixed(2)}/wk (exceeds $${(assumptions.minimumWeeklyContributionFloorCents / 100).toFixed(2)} floor) while saving ${hoursSaved} owner hours.`;
  } else if (!meetsContributionFloor && targetTimeOffAchieved) {
    const deficit = assumptions.minimumWeeklyContributionFloorCents - netContribution;
    tradeoff = `Time Off Tradeoff: Achieves ${projectedOwnerHours}h work week, but falls $${(deficit / 100).toFixed(2)} short of contribution floor. Consider a +${Math.ceil(assumptions.priceAdjustmentPercentage + 5)}% price adjustment.`;
  } else {
    tradeoff = `Unmet Goals: Projected hours (${projectedOwnerHours}h) exceed target ${assumptions.targetOwnerMaxHoursPerWeek}h.`;
  }

  return {
    scenarioId,
    scenarioName: assumptions.scenarioName,
    assumptions,
    projectedFinancials: {
      grossRevenueCents: projectedGrossRevenue,
      laborCostCents: projectedLaborCost,
      productCostCents: projectedProductCost,
      overheadCostCents: overheadCost,
      netContributionCents: netContribution,
      contributionMarginPct,
    },
    ownerWorkload: {
      projectedWeeklyHours: projectedOwnerHours,
      hoursSavedPerWeek: hoursSaved,
      targetTimeOffAchieved,
    },
    meetsContributionFloor,
    tradeoffSummary: tradeoff,
    isApprovedForImplementation: false,
  };
}

/**
 * Compares multiple What-If scenarios side-by-side to assist the owner with strategic planning
 */
export function compareWhatIfScenarios(scenarios: WhatIfScenarioOutcome[]): {
  bestMarginScenario: string;
  bestTimeOffScenario: string;
  comparisonTable: Array<{
    name: string;
    netContributionUSD: number;
    ownerHours: number;
    meetsFloor: boolean;
  }>;
} {
  if (scenarios.length === 0) {
    throw new Error('At least one scenario is required to generate a comparison');
  }

  const sortedByMargin = [...scenarios].sort(
    (a, b) => b.projectedFinancials.netContributionCents - a.projectedFinancials.netContributionCents
  );
  const sortedByTimeOff = [...scenarios].sort(
    (a, b) => a.ownerWorkload.projectedWeeklyHours - b.ownerWorkload.projectedWeeklyHours
  );

  const comparisonTable = scenarios.map(s => ({
    name: s.scenarioName,
    netContributionUSD: Math.round((s.projectedFinancials.netContributionCents / 100) * 100) / 100,
    ownerHours: s.ownerWorkload.projectedWeeklyHours,
    meetsFloor: s.meetsContributionFloor,
  }));

  return {
    bestMarginScenario: sortedByMargin[0].scenarioName,
    bestTimeOffScenario: sortedByTimeOff[0].scenarioName,
    comparisonTable,
  };
}
