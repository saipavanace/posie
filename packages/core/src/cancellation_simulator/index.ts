/**
 * Posie Core - F153: Cancellation Policy Simulator
 *
 * Simulates the tradeoffs between upfront booking deposits, funnel checkout conversion
 * drop-off, cancellation rates, and recovered contribution dollars for a proposed cancellation policy.
 * Generates rehearsal blast-radius previews to protect salons from unintended revenue drops
 * before rolling out consequential policy changes to clients.
 *
 * Compliance: Follows Posie Rule DR03, DR04 & WB F153 (Historical funnel and financial data;
 * policy changes are approved and effects are measured after rollout; transparent policy design).
 */

export interface CancellationPolicyTerms {
  policyName: string;
  depositType: 'none' | 'fixed_deposit' | 'percentage_deposit';
  depositValue: number; // in cents if fixed, in percentage (e.g. 50) if percentage
  cancellationWindowHours: number; // e.g. 24 or 48 hours
  lateCancellationFeePercentage: number; // e.g. 50% or 100%
}

export interface HistoricalFunnelBaseline {
  monthlyInquiriesCount: number; // e.g. 400
  historicalCheckoutConversionPct: number; // e.g. 75% -> 300 bookings
  monthlyCompletedVisitsCount: number; // e.g. 250
  monthlyLateCancellationsCount: number; // e.g. 35
  monthlyNoShowsCount: number; // e.g. 15
  averageServicePriceCents: number; // e.g. $140.00 = 14000
  averageDirectContributionCents: number; // e.g. $105.00 = 10500
}

export interface PolicySimulationResult {
  simulationId: string;
  policyName: string;
  proposedTerms: CancellationPolicyTerms;
  funnelImpact: {
    projectedConversionPct: number;
    conversionFrictionDropPct: number;
    projectedTotalBookings: number;
  };
  attendanceImpact: {
    projectedCompletedVisits: number;
    projectedLateCancellations: number;
    projectedNoShows: number;
    cancellationDropPct: number;
  };
  financialOutcome: {
    grossServiceRevenueCents: number;
    forfeitedDepositsCollectedCents: number;
    lateCancellationFeesCollectedCents: number;
    totalRecoveredRevenueCents: number;
    netProjectedContributionCents: number;
    netContributionDeltaVsBaselineCents: number;
  };
  verdict: 'net_positive_gain' | 'net_negative_drop' | 'neutral_risk';
  advisoryNote: string;
}

/**
 * Simulates booking funnel and financial consequences of a proposed cancellation policy
 */
export function simulateCancellationPolicyImpact(
  baseline: HistoricalFunnelBaseline,
  terms: CancellationPolicyTerms
): PolicySimulationResult {
  const simulationId = `sim-pol-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  // 1. Model booking funnel conversion friction from deposits
  // No deposit: 0% friction
  // Small fixed deposit ($25-$35): ~3-5% drop in casual inquiries, but higher commitment
  // 50% deposit: ~8-12% drop
  // 100% full prepayment: ~18-25% drop
  let frictionDropPct = 0;
  if (terms.depositType === 'fixed_deposit') {
    frictionDropPct = terms.depositValue > 3000 ? 6.5 : 3.5;
  } else if (terms.depositType === 'percentage_deposit') {
    if (terms.depositValue >= 100) frictionDropPct = 20.0;
    else if (terms.depositValue >= 50) frictionDropPct = 9.0;
    else frictionDropPct = 5.0;
  }

  const projectedConversionPct = Math.max(20, Math.round((baseline.historicalCheckoutConversionPct - frictionDropPct) * 10) / 10);
  const projectedTotalBookings = Math.round((baseline.monthlyInquiriesCount * projectedConversionPct) / 100);

  // 2. Model attendance & cancellation reduction
  // Requiring deposit cuts late cancellations and no-shows significantly (30% to 60% reduction)
  let cancelReductionFactor = 1.0;
  if (terms.depositType !== 'none') {
    cancelReductionFactor = terms.depositType === 'percentage_deposit' && terms.depositValue >= 50 ? 0.45 : 0.65;
  }
  if (terms.cancellationWindowHours >= 48) {
    cancelReductionFactor *= 0.9; // longer notice window encourages earlier cancellations
  }

  const projectedLateCancels = Math.round(baseline.monthlyLateCancellationsCount * cancelReductionFactor);
  const projectedNoShows = Math.round(baseline.monthlyNoShowsCount * cancelReductionFactor * 0.7); // no-shows drop sharper
  const cancellationDropPct = Math.round((1 - cancelReductionFactor) * 100);

  const projectedCompleted = Math.max(0, projectedTotalBookings - projectedLateCancels - projectedNoShows);

  // 3. Financial calculations
  const grossServiceRevenue = projectedCompleted * baseline.averageServicePriceCents;

  // Deposit forfeited on no-show
  let singleDepositCents = 0;
  if (terms.depositType === 'fixed_deposit') {
    singleDepositCents = terms.depositValue;
  } else if (terms.depositType === 'percentage_deposit') {
    singleDepositCents = Math.round((baseline.averageServicePriceCents * terms.depositValue) / 100);
  }

  const forfeitedDeposits = projectedNoShows * singleDepositCents;

  // Late cancellation fees collected (minus deposit already held)
  const singleLateFeeCents = Math.round((baseline.averageServicePriceCents * terms.lateCancellationFeePercentage) / 100);
  const netLateFeeBilled = Math.max(0, singleLateFeeCents - singleDepositCents);
  const lateFeesCollected = Math.round(projectedLateCancels * netLateFeeBilled * 0.85); // 85% collection rate

  const totalRecovered = grossServiceRevenue + forfeitedDeposits + lateFeesCollected;

  // Baseline contribution
  const baselineContribution = baseline.monthlyCompletedVisitsCount * baseline.averageDirectContributionCents;
  // Projected contribution (completed visits have product cost; forfeited deposits & fees have minimal product cost)
  const projectedContributionFromVisits = projectedCompleted * baseline.averageDirectContributionCents;
  const projectedContributionFromFees = Math.round((forfeitedDeposits + lateFeesCollected) * 0.95); // 95% margin on fee collection
  const netProjectedContribution = projectedContributionFromVisits + projectedContributionFromFees;

  const netDelta = netProjectedContribution - baselineContribution;

  let verdict: 'net_positive_gain' | 'net_negative_drop' | 'neutral_risk' = 'neutral_risk';
  let advisory = '';

  if (netDelta > 50000) {
    verdict = 'net_positive_gain';
    advisory = `Net Positive: Recovers +$${(netDelta / 100).toFixed(2)}/mo. The reduction in no-shows and fee recovery strongly out-weighs the modest ${frictionDropPct}% funnel friction.`;
  } else if (netDelta < -30000) {
    verdict = 'net_negative_drop';
    advisory = `Overly Restrictive: Projected net loss of -$${(Math.abs(netDelta) / 100).toFixed(2)}/mo. The ${frictionDropPct}% upfront conversion friction repels too many casual clients. Consider lowering deposit.`;
  } else {
    verdict = 'neutral_risk';
    advisory = `Balanced Tradeoff: Net contribution variance is small ($${(netDelta / 100).toFixed(2)}/mo). Protects schedule predictability while maintaining solid booking momentum.`;
  }

  return {
    simulationId,
    policyName: terms.policyName,
    proposedTerms: terms,
    funnelImpact: {
      projectedConversionPct,
      conversionFrictionDropPct: frictionDropPct,
      projectedTotalBookings,
    },
    attendanceImpact: {
      projectedCompletedVisits: projectedCompleted,
      projectedLateCancellations: projectedLateCancels,
      projectedNoShows: projectedNoShows,
      cancellationDropPct,
    },
    financialOutcome: {
      grossServiceRevenueCents: grossServiceRevenue,
      forfeitedDepositsCollectedCents: forfeitedDeposits,
      lateCancellationFeesCollectedCents: lateFeesCollected,
      totalRecoveredRevenueCents: totalRecovered,
      netProjectedContributionCents: netProjectedContribution,
      netContributionDeltaVsBaselineCents: netDelta,
    },
    verdict,
    advisoryNote: advisory,
  };
}
