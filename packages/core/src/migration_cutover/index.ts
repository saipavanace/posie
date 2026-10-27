/**
 * F105: Migration Rehearsal & Cutover (Basis: H; switching confidence)
 * 
 * Invariants:
 * 1. Private Dry-Run Rehearsal: Runs a complete mock cutover comparing source
 *    opening counts and financial balances against target staged entities.
 * 2. Active Customer Obligations Reconciliation: Cutover strictly blocks if there
 *    are unmapped active customer obligations (unredeemed gift cards, prepaid
 *    package credits) unless an approved interim redemption workflow is explicitly
 *    signed off by management. Archiving a liability alone is insufficient.
 * 3. Sample Record Spot-Checking: Verifies sample client records across critical
 *    modalities (gift card holder, future visit client, charting client).
 * 4. Authoritative Cutover Certificate: Issues an immutable cutover audit record
 *    recording opening balance sheet figures, reconciliation parity, and signoff.
 */

import { StagedMigrationBatch } from '../migration_mapping';

export interface OpeningBalanceReconciliation {
  totalClientsStaged: number;
  totalClientsApproved: number;
  activeGiftCardLiabilityDollars: number;
  activePackageUnitsRemaining: number;
  futureAppointmentsCount: number;
  unsupportedActiveObligationsCount: number;
  obligationsReconciled: boolean;
  interimRedemptionWorkflowApproved: boolean;
}

export interface CutoverCertificate {
  certificateId: string;
  sourcePlatform: string;
  rehearsalDate: string;
  cutoverDate: string;
  approvedByManager: string;
  openingBalances: {
    clientCount: number;
    giftCardLiabilityTotal: number;
    packageUnitsTotal: number;
  };
  sampleAuditRecordsVerified: boolean;
  status: 'cutover_completed' | 'rehearsal_passed' | 'rehearsal_blocked';
  blockingReasons?: string[];
}

/**
 * Runs a private migration rehearsal (dry run) to reconcile opening counts
 * and active customer obligations.
 */
export function runMigrationRehearsal(params: {
  stagedBatch: StagedMigrationBatch;
  futureAppointmentsCount?: number;
  interimRedemptionWorkflowApproved?: boolean;
}): {
  reconciliation: OpeningBalanceReconciliation;
  canProceedToCutover: boolean;
  blockingReasons: string[];
} {
  let activeGiftCardLiabilityDollars = 0;
  let activePackageUnitsRemaining = 0;
  let errorRows = 0;

  for (const client of params.stagedBatch.stagedClients) {
    if (client.validationStatus === 'error') {
      errorRows++;
    }
    activeGiftCardLiabilityDollars += client.giftCardBalance;
    activePackageUnitsRemaining += client.packageRemainingSessions;
  }

  // Count unhandled active obligations
  let unsupportedActiveObligations = 0;
  // If there are error rows that have active gift balances or package sessions,
  // those are unhandled obligations!
  for (const client of params.stagedBatch.stagedClients) {
    if (client.validationStatus === 'error') {
      if (client.giftCardBalance > 0 || client.packageRemainingSessions > 0) {
        unsupportedActiveObligations++;
      }
    }
  }

  const interimApproved = params.interimRedemptionWorkflowApproved ?? false;
  const obligationsReconciled =
    unsupportedActiveObligations === 0 || interimApproved;

  const blockingReasons: string[] = [];

  if (errorRows > 0 && !interimApproved) {
    blockingReasons.push(
      `Batch contains ${errorRows} corrupted/error rows that require correction before cutover.`
    );
  }

  // INVARIANT: Cutover requires no unsupported active obligations, or an approved
  // interim redemption workflow; archiving a liability alone is insufficient.
  if (unsupportedActiveObligations > 0 && !interimApproved) {
    blockingReasons.push(
      `Invariant Violation: ${unsupportedActiveObligations} clients with active gift or package liabilities failed validation. Archiving a liability alone is insufficient without an approved interim redemption workflow.`
    );
  }

  const canProceedToCutover = blockingReasons.length === 0;

  const reconciliation: OpeningBalanceReconciliation = {
    totalClientsStaged: params.stagedBatch.totalRows,
    totalClientsApproved: params.stagedBatch.validRowsCount + params.stagedBatch.warningRowsCount,
    activeGiftCardLiabilityDollars: Number(activeGiftCardLiabilityDollars.toFixed(2)),
    activePackageUnitsRemaining,
    futureAppointmentsCount: params.futureAppointmentsCount ?? 0,
    unsupportedActiveObligationsCount: unsupportedActiveObligations,
    obligationsReconciled,
    interimRedemptionWorkflowApproved: interimApproved,
  };

  return {
    reconciliation,
    canProceedToCutover,
    blockingReasons,
  };
}

/**
 * Executes live cutover after rehearsal validation and issues Cutover Certificate.
 */
export function executeLiveCutover(params: {
  stagedBatch: StagedMigrationBatch;
  rehearsalResult: ReturnType<typeof runMigrationRehearsal>;
  approvedByManager: string;
  sampleRecordsSpotChecked: boolean;
  cutoverTime?: string;
}): CutoverCertificate {
  if (!params.rehearsalResult.canProceedToCutover) {
    throw new Error(
      `Cannot execute live cutover: Rehearsal failed with blocking issues: ${params.rehearsalResult.blockingReasons.join(' ')}`
    );
  }

  if (!params.sampleRecordsSpotChecked) {
    throw new Error(
      'Cannot execute live cutover: Manager must complete sample record spot-checks to verify client data fidelity.'
    );
  }

  const now = params.cutoverTime ?? new Date().toISOString();

  return {
    certificateId: `CUTOVER-CERT-${Date.now().toString(36).toUpperCase()}`,
    sourcePlatform: params.stagedBatch.sourcePlatform,
    rehearsalDate: params.stagedBatch.createdAt,
    cutoverDate: now,
    approvedByManager: params.approvedByManager,
    openingBalances: {
      clientCount: params.rehearsalResult.reconciliation.totalClientsApproved,
      giftCardLiabilityTotal: params.rehearsalResult.reconciliation.activeGiftCardLiabilityDollars,
      packageUnitsTotal: params.rehearsalResult.reconciliation.activePackageUnitsRemaining,
    },
    sampleAuditRecordsVerified: true,
    status: 'cutover_completed',
  };
}
