/**
 * F101: Private Records & Chart Amendments (Rules DR04, DR07, D08)
 * 
 * Invariants:
 * 1. Draft vs. Signed / Locked Lifecycle: Draft treatment notes can be revised by
 *    the authoring provider. Once signed, the note is permanently locked against
 *    direct mutation.
 * 2. Addendum-Only Integrity: Any subsequent correction or late entry must be an
 *    append-only amendment that preserves the original entry verbatim, timestamps
 *    the addendum, and identifies the author and reason.
 * 3. Role-Based Privacy Separation (Rule DR07): Clinical and esthetic charts are
 *    strictly restricted to qualified practitioners and clinical directors. Marketing
 *    and general front-desk receptionists cannot inherit clinical chart access.
 * 4. Audit-Stamped Record Export: Client record access requests produce a complete,
 *    tamper-evident PDF/HTML export containing all historical versions and amendments.
 * 5. Statutory Retention Tracking: Retains chart records for a configured statutory
 *    duration (default 7 years) from the visit date before lawful purging.
 */

import { createHash } from 'crypto';

export type ChartStatus = 'draft' | 'signed_locked' | 'amended';

export interface ChartSOAPContent {
  subjective: string; // Client reported symptoms, changes, goals
  objective: string; // Observed skin condition, Fitzpatrick type, barrier state
  assessment: string; // Professional evaluation, skin response
  plan: string; // Home care regimen, future appointment interval
  productsUsed?: Array<{ name: string; lotNumber?: string; durationMinutes?: number }>;
}

export interface ChartAmendment {
  amendmentId: string;
  authorId: string;
  authorName: string;
  authorRole: 'practitioner' | 'clinical_director';
  timestamp: string; // ISO 8601 UTC
  reason: string; // e.g., "Late entry: Client phoned regarding mild erythema"
  content: string; // Specific correction or supplementary observation
  amendmentHash: string;
}

export interface TreatmentChartRecord {
  chartId: string;
  clientId: string;
  clientName: string;
  practitionerId: string;
  practitionerName: string;
  serviceId: string;
  serviceName: string;
  visitDate: string; // 'YYYY-MM-DD'
  status: ChartStatus;
  soap: ChartSOAPContent;
  contentHash: string;
  createdAt: string;
  updatedAt: string;
  signedAt?: string;
  signedBy?: string;
  amendments: ChartAmendment[];
  retentionUntilDate: string; // Default: visitDate + 7 years
}

export type StaffRole = 'practitioner' | 'clinical_director' | 'front_desk' | 'marketing';

/**
 * Validates role-based access to client chart records (Rule DR07).
 * Marketing and front desk cannot access clinical records.
 */
export function assertChartAccessPrivilege(role: StaffRole): boolean {
  if (role === 'front_desk' || role === 'marketing') {
    throw new Error(
      `Access Denied (Rule DR07): Staff role "${role}" does not have privilege to view or modify clinical treatment charts.`
    );
  }
  return true;
}

function computeChartHash(soap: ChartSOAPContent): string {
  const serialized = JSON.stringify(soap);
  return createHash('sha256').update(serialized, 'utf8').digest('hex');
}

/**
 * Calculates statutory retention expiration date (default 7 years).
 */
export function calculateRetentionDate(visitDate: string, retentionYears: number = 7): string {
  const d = new Date(visitDate);
  d.setFullYear(d.getFullYear() + retentionYears);
  return d.toISOString().split('T')[0];
}

/**
 * Creates a new draft treatment chart note.
 */
export function createChartDraft(params: {
  chartId: string;
  clientId: string;
  clientName: string;
  practitionerId: string;
  practitionerName: string;
  serviceId: string;
  serviceName: string;
  visitDate: string;
  soap: ChartSOAPContent;
  authorRole?: StaffRole;
}): TreatmentChartRecord {
  assertChartAccessPrivilege(params.authorRole ?? 'practitioner');

  const now = new Date().toISOString();
  const contentHash = computeChartHash(params.soap);
  const retentionUntilDate = calculateRetentionDate(params.visitDate);

  return {
    chartId: params.chartId,
    clientId: params.clientId,
    clientName: params.clientName,
    practitionerId: params.practitionerId,
    practitionerName: params.practitionerName,
    serviceId: params.serviceId,
    serviceName: params.serviceName,
    visitDate: params.visitDate,
    status: 'draft',
    soap: params.soap,
    contentHash,
    createdAt: now,
    updatedAt: now,
    amendments: [],
    retentionUntilDate,
  };
}

/**
 * Updates a chart while it remains in draft status.
 * Invariant: Cannot directly mutate a signed or amended note.
 */
export function updateChartDraft(params: {
  chart: TreatmentChartRecord;
  updatedSoap: Partial<ChartSOAPContent>;
  authorRole?: StaffRole;
}): TreatmentChartRecord {
  assertChartAccessPrivilege(params.authorRole ?? 'practitioner');

  if (params.chart.status !== 'draft') {
    throw new Error(
      `Cannot directly edit chart ${params.chart.chartId} with status "${params.chart.status}". Signed records require append-only amendments.`
    );
  }

  const mergedSoap: ChartSOAPContent = {
    ...params.chart.soap,
    ...params.updatedSoap,
  };

  const now = new Date().toISOString();
  return {
    ...params.chart,
    soap: mergedSoap,
    contentHash: computeChartHash(mergedSoap),
    updatedAt: now,
  };
}

/**
 * Signs and locks a treatment chart note.
 * Locks the record against future direct edits.
 */
export function signAndLockChart(params: {
  chart: TreatmentChartRecord;
  practitionerName: string;
  authorRole?: StaffRole;
}): TreatmentChartRecord {
  assertChartAccessPrivilege(params.authorRole ?? 'practitioner');

  if (params.chart.status !== 'draft') {
    throw new Error(`Chart is already "${params.chart.status}" and cannot be re-signed.`);
  }

  const now = new Date().toISOString();
  return {
    ...params.chart,
    status: 'signed_locked',
    signedAt: now,
    signedBy: params.practitionerName,
    updatedAt: now,
  };
}

/**
 * Appends an auditable amendment to a signed chart note (Rule DR04).
 * Preserves the original signed entry intact.
 */
export function appendChartAmendment(params: {
  chart: TreatmentChartRecord;
  authorId: string;
  authorName: string;
  authorRole: 'practitioner' | 'clinical_director';
  reason: string;
  content: string;
}): TreatmentChartRecord {
  assertChartAccessPrivilege(params.authorRole);

  if (params.chart.status === 'draft') {
    throw new Error('Draft charts can be updated directly without creating an amendment.');
  }

  if (!params.reason.trim()) {
    throw new Error('An explicit justification reason is required for chart amendments.');
  }

  if (!params.content.trim()) {
    throw new Error('Amendment content cannot be empty.');
  }

  const now = new Date().toISOString();
  const amendmentHash = createHash('sha256')
    .update(`${params.authorId}:${now}:${params.content}`, 'utf8')
    .digest('hex');

  const amendment: ChartAmendment = {
    amendmentId: `AMD-${Date.now().toString(36).toUpperCase()}`,
    authorId: params.authorId,
    authorName: params.authorName,
    authorRole: params.authorRole,
    timestamp: now,
    reason: params.reason,
    content: params.content,
    amendmentHash,
  };

  return {
    ...params.chart,
    status: 'amended',
    amendments: [...params.chart.amendments, amendment],
    updatedAt: now,
  };
}

/**
 * Compiles a formal client record export with audit stamps.
 */
export function exportClientRecordTimeline(params: {
  charts: TreatmentChartRecord[];
  requestingParty: 'client' | 'authorized_physician' | 'legal_counsel';
  requestedAt?: string;
}): {
  exportId: string;
  exportedAt: string;
  requestingParty: string;
  totalRecords: number;
  records: Array<{
    chartId: string;
    visitDate: string;
    serviceName: string;
    practitionerName: string;
    originalSoap: ChartSOAPContent;
    signedAt?: string;
    signedBy?: string;
    amendments: ChartAmendment[];
    retentionUntilDate: string;
    integrityVerified: boolean;
  }>;
} {
  const now = params.requestedAt ?? new Date().toISOString();

  const formattedRecords = params.charts.map((c) => {
    const verified = computeChartHash(c.soap) === c.contentHash;
    return {
      chartId: c.chartId,
      visitDate: c.visitDate,
      serviceName: c.serviceName,
      practitionerName: c.practitionerName,
      originalSoap: c.soap,
      signedAt: c.signedAt,
      signedBy: c.signedBy,
      amendments: c.amendments,
      retentionUntilDate: c.retentionUntilDate,
      integrityVerified: verified,
    };
  });

  return {
    exportId: `REC-EXP-${Date.now().toString(36).toUpperCase()}`,
    exportedAt: now,
    requestingParty: params.requestingParty,
    totalRecords: formattedRecords.length,
    records: formattedRecords,
  };
}
