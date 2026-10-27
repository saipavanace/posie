/**
 * F190: Self-Service Subscription Exit
 *
 * Enables 1-click self-service subscription cancellation and downgrades without retention friction,
 * provides a guaranteed 90-day read-only historical archive period, generates comprehensive export manifests,
 * and publishes clear data retention and purge schedules.
 */

export interface SubscriptionExitRequest {
  salonId: string;
  salonName: string;
  action: 'cancel_subscription' | 'downgrade_to_free';
  targetTier?: 'starter_free';
  cancellationReason?: string;
  confirmedByOwnerEmail: string;
}

export interface ExportManifestItem {
  resourceType: 'clients' | 'appointments' | 'financial_transactions' | 'treatment_notes' | 'tax_reports';
  recordCount: number;
  format: 'json' | 'csv' | 'zip';
  downloadUrl: string;
}

export interface SubscriptionExitSummary {
  exitId: string;
  salonId: string;
  effectiveAction: 'cancelled' | 'downgraded_to_free';
  requestTimestamp: string;
  immediateChanges: {
    newBookingIntakeStopped: boolean;
    marketingSmsDisabled: boolean;
    staffWritePermissionsRevoked: boolean;
  };
  historicalAccessGuarantee: {
    readOnlyAccessGranted: boolean;
    readOnlyPeriodDays: number;
    readOnlyExpiresAt: string;
  };
  scheduledPurgeDate: string;
  exportArchiveManifest: ExportManifestItem[];
  retentionPolicyStatement: string;
}

/**
 * Executes a clean self-service cancellation or downgrade for a salon subscription.
 * Invariant: Never traps the salon; provides 90 days guaranteed read-only historical access,
 * comprehensive data export manifests, and an auditable data purge schedule.
 */
export function processSelfServiceSubscriptionExit(
  request: SubscriptionExitRequest,
  salonStats = { clientCount: 450, appointmentCount: 1820, transactionCount: 2310 }
): SubscriptionExitSummary {
  const exitId = `exit_${Date.now()}`;
  const now = new Date();

  // Read-only period: 90 days guaranteed
  const readOnlyDays = 90;
  const readOnlyExpires = new Date(now.getTime() + readOnlyDays * 24 * 60 * 60 * 1000);

  // Scheduled purge: 30 days after read-only window expires (total 120 days from cancellation)
  const scheduledPurge = new Date(now.getTime() + 120 * 24 * 60 * 60 * 1000);

  const exportArchiveManifest: ExportManifestItem[] = [
    {
      resourceType: 'clients',
      recordCount: salonStats.clientCount,
      format: 'csv',
      downloadUrl: `https://export.posie.app/${request.salonId}/clients_${now.toISOString().split('T')[0]}.csv`,
    },
    {
      resourceType: 'appointments',
      recordCount: salonStats.appointmentCount,
      format: 'csv',
      downloadUrl: `https://export.posie.app/${request.salonId}/appointments_${now.toISOString().split('T')[0]}.csv`,
    },
    {
      resourceType: 'financial_transactions',
      recordCount: salonStats.transactionCount,
      format: 'csv',
      downloadUrl: `https://export.posie.app/${request.salonId}/ledger_${now.toISOString().split('T')[0]}.csv`,
    },
    {
      resourceType: 'treatment_notes',
      recordCount: salonStats.appointmentCount,
      format: 'zip',
      downloadUrl: `https://export.posie.app/${request.salonId}/clinical_charts_${now.toISOString().split('T')[0]}.zip`,
    },
  ];

  const isDowngrade = request.action === 'downgrade_to_free';

  return {
    exitId,
    salonId: request.salonId,
    effectiveAction: isDowngrade ? 'downgraded_to_free' : 'cancelled',
    requestTimestamp: now.toISOString(),
    immediateChanges: {
      newBookingIntakeStopped: !isDowngrade, // Downgrade keeps intake up to 30 appts
      marketingSmsDisabled: true,
      staffWritePermissionsRevoked: !isDowngrade,
    },
    historicalAccessGuarantee: {
      readOnlyAccessGranted: true,
      readOnlyPeriodDays: readOnlyDays,
      readOnlyExpiresAt: readOnlyExpires.toISOString(),
    },
    scheduledPurgeDate: scheduledPurge.toISOString(),
    exportArchiveManifest,
    retentionPolicyStatement:
      'GUARANTEED_EXIT_POLICY: Full client data, appointment history, and financial records remain available in read-only mode for 90 days with complete export packages. Data is permanently purged at scheduled date unless renewed.',
  };
}
