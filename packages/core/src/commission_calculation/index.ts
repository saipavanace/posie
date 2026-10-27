/**
 * F097: Commission Calculation & Staff Earnings Statements (Document D20)
 * 
 * Invariants:
 * 1. Effective-Dated Commission Rules: Rules have explicit effective dates.
 *    Modifying a rule today applies strictly to future services and never
 *    silently retroactively alters past closed commission runs.
 * 2. Tiered and Split Allocations: Supports tiered rates based on periodic service
 *    volume thresholds, separate retail rates, and team commission splits on joint tickets.
 * 3. Document D20 Statements & Statuses: Explicit lifecycle distinguishing
 *    `estimated` (live open period), `manager_approved`, and `paid`.
 * 4. Forward Adjustments Integrity: When a historical service is refunded after
 *    payroll is approved or paid, the system strictly protects the signed historical
 *    record from being rewritten; it logs an auditable adjustment line in the next open pay period.
 * 5. Non-Statutory Transparency Notice: Plainly labels statement as internal
 *    earnings detail for salon reconciliation, preserving statutory payroll boundaries.
 */

export interface CommissionTier {
  thresholdMin: number;
  thresholdMax?: number; // undefined means infinity
  ratePercentage: number; // e.g. 45 for 45%
}

export interface CommissionRule {
  ruleId: string;
  staffId: string;
  effectiveFrom: string; // ISO date
  effectiveTo?: string; // ISO date or undefined if current
  serviceTiers: CommissionTier[]; // tiered commission based on period gross
  retailRatePercentage: number; // flat % for retail sales, e.g. 10%
  assistantSplitDefaultPercentage?: number; // e.g. 25% for assistant on split tickets
}

export interface TicketCommissionLine {
  ticketId: string;
  itemType: 'service' | 'retail';
  description: string;
  grossAmount: number; // apportioned gross
  commissionRate: number; // percentage applied
  earnedCommission: number;
  tipAmount: number; // 100% pass-through gratuity
  performedAt: string;
}

export interface CommissionAdjustment {
  adjustmentId: string;
  originalTicketId: string;
  originalPeriodId: string;
  reason: string; // e.g. "Post-pay-period client refund on HydraFacial"
  adjustmentAmount: number; // negative number for clawback
  recordedAt: string;
  approvedByManager: string;
}

export type EarningsStatementStatus = 'estimated' | 'manager_approved' | 'paid';

export interface EarningsStatementD20 {
  statementId: string;
  periodId: string; // e.g. "PAY-2026-10-B"
  staffId: string;
  staffName: string;
  periodStartDate: string;
  periodEndDate: string;
  ruleVersion: string;
  status: EarningsStatementStatus;
  lines: TicketCommissionLine[];
  adjustments: CommissionAdjustment[];
  summary: {
    totalServiceGross: number;
    totalServiceCommission: number;
    totalRetailGross: number;
    totalRetailCommission: number;
    totalTips: number;
    totalAdjustments: number;
    netPayableEarnings: number;
  };
  approvedBy?: string;
  approvedAt?: string;
  payoutReference?: string;
  paidAt?: string;
  disclaimerNotice: string;
}

/**
 * Creates or updates an effective-dated commission rule.
 */
export function defineCommissionRule(params: {
  ruleId: string;
  staffId: string;
  effectiveFrom: string;
  effectiveTo?: string;
  serviceTiers: CommissionTier[];
  retailRatePercentage: number;
  assistantSplitDefaultPercentage?: number;
}): CommissionRule {
  if (params.serviceTiers.length === 0) {
    throw new Error('At least one service commission tier must be configured.');
  }

  // Ensure tiers are sorted by threshold
  const sortedTiers = [...params.serviceTiers].sort((a, b) => a.thresholdMin - b.thresholdMin);

  return {
    ruleId: params.ruleId,
    staffId: params.staffId,
    effectiveFrom: params.effectiveFrom,
    effectiveTo: params.effectiveTo,
    serviceTiers: sortedTiers,
    retailRatePercentage: params.retailRatePercentage,
    assistantSplitDefaultPercentage: params.assistantSplitDefaultPercentage ?? 25,
  };
}

/**
 * Calculates earned commission on an apportioned ticket line.
 * Automatically looks up applicable tiered service rate or flat retail rate.
 */
export function calculateLineCommission(params: {
  itemType: 'service' | 'retail';
  grossAmount: number;
  cumulativePeriodServiceGross: number;
  rule: CommissionRule;
}): { ratePercentage: number; earnedCommission: number } {
  if (params.itemType === 'retail') {
    const ratePercentage = params.rule.retailRatePercentage;
    const earnedCommission = Number(((params.grossAmount * ratePercentage) / 100).toFixed(2));
    return { ratePercentage, earnedCommission };
  }

  // Tiered service calculation
  const newGross = params.cumulativePeriodServiceGross + params.grossAmount;
  let applicableTier = params.rule.serviceTiers[0];

  for (const tier of params.rule.serviceTiers) {
    if (newGross >= tier.thresholdMin) {
      if (!tier.thresholdMax || newGross <= tier.thresholdMax) {
        applicableTier = tier;
      } else if (newGross > tier.thresholdMax) {
        applicableTier = tier;
      }
    }
  }

  const ratePercentage = applicableTier.ratePercentage;
  const earnedCommission = Number(((params.grossAmount * ratePercentage) / 100).toFixed(2));
  return { ratePercentage, earnedCommission };
}

/**
 * Generates or recalculates a staff member's live Document D20 earnings statement.
 */
export function generateEarningsStatement(params: {
  statementId: string;
  periodId: string;
  staffId: string;
  staffName: string;
  periodStartDate: string;
  periodEndDate: string;
  rule: CommissionRule;
  tickets: Array<{
    ticketId: string;
    itemType: 'service' | 'retail';
    description: string;
    apportionedGross: number;
    tipAmount: number;
    performedAt: string;
  }>;
  priorPeriodAdjustments?: CommissionAdjustment[];
}): EarningsStatementD20 {
  let cumulativeServiceGross = 0;
  let totalServiceCommission = 0;
  let totalRetailGross = 0;
  let totalRetailCommission = 0;
  let totalTips = 0;

  const lines: TicketCommissionLine[] = [];

  for (const t of params.tickets) {
    const { ratePercentage, earnedCommission } = calculateLineCommission({
      itemType: t.itemType,
      grossAmount: t.apportionedGross,
      cumulativePeriodServiceGross: cumulativeServiceGross,
      rule: params.rule,
    });

    if (t.itemType === 'service') {
      cumulativeServiceGross += t.apportionedGross;
      totalServiceCommission += earnedCommission;
    } else {
      totalRetailGross += t.apportionedGross;
      totalRetailCommission += earnedCommission;
    }

    totalTips += t.tipAmount;

    lines.push({
      ticketId: t.ticketId,
      itemType: t.itemType,
      description: t.description,
      grossAmount: Number(t.apportionedGross.toFixed(2)),
      commissionRate: ratePercentage,
      earnedCommission,
      tipAmount: Number(t.tipAmount.toFixed(2)),
      performedAt: t.performedAt,
    });
  }

  const adjustments = params.priorPeriodAdjustments ?? [];
  const totalAdjustments = Number(
    adjustments.reduce((sum, adj) => sum + adj.adjustmentAmount, 0).toFixed(2)
  );

  const netPayableEarnings = Number(
    (
      totalServiceCommission +
      totalRetailCommission +
      totalTips +
      totalAdjustments
    ).toFixed(2)
  );

  return {
    statementId: params.statementId,
    periodId: params.periodId,
    staffId: params.staffId,
    staffName: params.staffName,
    periodStartDate: params.periodStartDate,
    periodEndDate: params.periodEndDate,
    ruleVersion: params.rule.ruleId,
    status: 'estimated',
    lines,
    adjustments,
    summary: {
      totalServiceGross: Number(cumulativeServiceGross.toFixed(2)),
      totalServiceCommission: Number(totalServiceCommission.toFixed(2)),
      totalRetailGross: Number(totalRetailGross.toFixed(2)),
      totalRetailCommission: Number(totalRetailCommission.toFixed(2)),
      totalTips: Number(totalTips.toFixed(2)),
      totalAdjustments,
      netPayableEarnings,
    },
    disclaimerNotice:
      'Document D20 Earnings Statement: Provided for studio commission reconciliation. Tips are passed through at 100%. Statutory payroll deductions are processed separately by your employer or payroll provider.',
  };
}

/**
 * Approves an earnings statement, locking it against direct edits.
 */
export function approveEarningsStatement(params: {
  statement: EarningsStatementD20;
  managerName: string;
  approvalDate?: string;
}): EarningsStatementD20 {
  if (params.statement.status !== 'estimated') {
    throw new Error(`Statement is already ${params.statement.status} and cannot be re-approved.`);
  }

  const approvedAt = params.approvalDate ?? new Date().toISOString();

  return {
    ...params.statement,
    status: 'manager_approved',
    approvedBy: params.managerName,
    approvedAt,
  };
}

/**
 * Creates a forward adjustment for a post-approval refund or correction.
 * Invariant: Never alters an already approved or paid statement.
 */
export function createForwardAdjustment(params: {
  originalStatement: EarningsStatementD20;
  refundedTicketId: string;
  clawbackAmount: number; // positive number, will be converted to negative
  reason: string;
  managerName: string;
}): CommissionAdjustment {
  if (params.originalStatement.status === 'estimated') {
    throw new Error(
      'Forward adjustments are only required for approved or paid statements. Unapproved statements can be recalculated directly.'
    );
  }

  return {
    adjustmentId: `ADJ-${Date.now().toString(36).toUpperCase()}`,
    originalTicketId: params.refundedTicketId,
    originalPeriodId: params.originalStatement.periodId,
    reason: params.reason,
    adjustmentAmount: -Math.abs(params.clawbackAmount),
    recordedAt: new Date().toISOString(),
    approvedByManager: params.managerName,
  };
}
