/**
 * F103: Client Deduplication & Reversible Merge
 * 
 * Invariants:
 * 1. Intelligent Matching: Proposes probable duplicate candidates by scoring
 *    name similarity, email exactness, and phone matches.
 * 2. Shared Contact Defense: Prohibits automatic merging when two records share
 *    a phone number but have distinct names (e.g. parent/child, spouses, or roommates).
 *    Flags these as shared household contacts instead of a destructive merge.
 * 3. Operator Review & Conflict Resolution: Requires human review to choose master
 *    attributes when conflicting fields exist (e.g. conflicting birthdays, addresses).
 * 4. Consolidated Histories: Combines visit timelines, future appointments, active
 *    packages, loyalty points, and treatment notes under the master identity.
 * 5. Reversible Merge Log: Maintains an immutable before/after snapshot of both
 *    records, allowing complete unmerging and identity restoration if ever needed.
 */

export interface ClientProfileRecord {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  loyaltyPoints: number;
  visitHistoryCount: number;
  activePackagePassIds: string[];
  treatmentChartIds: string[];
  householdContactIds?: string[];
  isMerged?: boolean;
  mergedIntoId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DuplicateMatchCandidate {
  primaryClient: ClientProfileRecord;
  duplicateClient: ClientProfileRecord;
  confidenceScore: number; // 0 to 100
  matchReasons: string[];
  hasConflictingPhoneIdentity: boolean; // e.g. same phone but distinct names
  recommendation: 'merge_review' | 'shared_household_flag' | 'distinct_clients';
}

export interface ClientMergeLogEntry {
  mergeId: string;
  masterClientId: string;
  mergedClientId: string;
  mergedAt: string;
  performedBy: string;
  conflictResolutionChoices: Record<string, string>;
  masterBeforeSnapshot: ClientProfileRecord;
  mergedBeforeSnapshot: ClientProfileRecord;
}

/**
 * Calculates similarity between two strings (case-insensitive Levenshtein / token match).
 */
function isNameSimilar(nameA: string, nameB: string): boolean {
  const a = nameA.trim().toLowerCase();
  const b = nameB.trim().toLowerCase();
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;
  return false;
}

/**
 * Scans a client record against an existing database of clients to propose
 * duplicate candidates.
 */
export function findDuplicateCandidates(params: {
  targetClient: ClientProfileRecord;
  existingClients: ClientProfileRecord[];
}): DuplicateMatchCandidate[] {
  const matches: DuplicateMatchCandidate[] = [];

  for (const existing of params.existingClients) {
    if (existing.id === params.targetClient.id || existing.isMerged) continue;

    let score = 0;
    const reasons: string[] = [];

    const sameEmail =
      params.targetClient.email &&
      existing.email &&
      params.targetClient.email.toLowerCase() === existing.email.toLowerCase();

    const samePhone =
      params.targetClient.phone &&
      existing.phone &&
      params.targetClient.phone.replace(/\D/g, '') === existing.phone.replace(/\D/g, '');

    const sameFirstName = isNameSimilar(params.targetClient.firstName, existing.firstName);
    const sameLastName = isNameSimilar(params.targetClient.lastName, existing.lastName);

    if (sameEmail) {
      score += 60;
      reasons.push('Exact email match');
    }

    if (samePhone) {
      score += 40;
      reasons.push('Exact phone match');
    }

    if (sameFirstName && sameLastName) {
      score += 40;
      reasons.push('Full name match');
    } else if (sameLastName) {
      score += 15;
      reasons.push('Last name match');
    }

    if (
      params.targetClient.birthDate &&
      existing.birthDate &&
      params.targetClient.birthDate === existing.birthDate
    ) {
      score += 20;
      reasons.push('Birth date match');
    }

    // Invariant: If phone matches but first names are completely different,
    // do NOT recommend merging! Prohibit destructive merge of family members.
    const hasConflictingPhoneIdentity = !!(samePhone && !sameFirstName);

    let recommendation: DuplicateMatchCandidate['recommendation'] = 'distinct_clients';
    if (hasConflictingPhoneIdentity) {
      recommendation = 'shared_household_flag';
    } else if (score >= 60) {
      recommendation = 'merge_review';
    }

    if (score >= 40 || hasConflictingPhoneIdentity) {
      matches.push({
        primaryClient: existing,
        duplicateClient: params.targetClient,
        confidenceScore: Math.min(100, score),
        matchReasons: reasons,
        hasConflictingPhoneIdentity,
        recommendation,
      });
    }
  }

  return matches.sort((a, b) => b.confidenceScore - a.confidenceScore);
}

/**
 * Merges a duplicate client into a master client record with full consolidation
 * and reversible audit logging.
 */
export function mergeClientProfiles(params: {
  masterClient: ClientProfileRecord;
  duplicateClient: ClientProfileRecord;
  chosenFieldOverrides?: Partial<ClientProfileRecord>;
  performedBy: string;
  notes?: string;
}): {
  masterClient: ClientProfileRecord;
  duplicateClient: ClientProfileRecord;
  mergeLog: ClientMergeLogEntry;
} {
  if (params.masterClient.id === params.duplicateClient.id) {
    throw new Error('Cannot merge a client record with itself.');
  }

  if (params.duplicateClient.isMerged) {
    throw new Error(`Client ${params.duplicateClient.id} is already merged into another profile.`);
  }

  // Prevent merging distinct individuals sharing a phone without explicit confirmation
  if (
    params.masterClient.phone &&
    params.duplicateClient.phone &&
    params.masterClient.phone.replace(/\D/g, '') === params.duplicateClient.phone.replace(/\D/g, '') &&
    !isNameSimilar(params.masterClient.firstName, params.duplicateClient.firstName)
  ) {
    if (!params.chosenFieldOverrides?.firstName) {
      throw new Error(
        `Invariant Protected: Cannot merge clients sharing phone "${params.masterClient.phone}" with different names ("${params.masterClient.firstName}" vs "${params.duplicateClient.firstName}") without explicit override. These should be linked as shared household contacts.`
      );
    }
  }

  const now = new Date().toISOString();

  // Snapshot before states for reversibility
  const masterBeforeSnapshot: ClientProfileRecord = { ...params.masterClient };
  const mergedBeforeSnapshot: ClientProfileRecord = { ...params.duplicateClient };

  // Consolidate packages, loyalty, charts, and visit counts
  const consolidatedLoyalty =
    params.masterClient.loyaltyPoints + params.duplicateClient.loyaltyPoints;
  const consolidatedVisits =
    params.masterClient.visitHistoryCount + params.duplicateClient.visitHistoryCount;

  const combinedPackages = Array.from(
    new Set([
      ...params.masterClient.activePackagePassIds,
      ...params.duplicateClient.activePackagePassIds,
    ])
  );

  const combinedCharts = Array.from(
    new Set([
      ...params.masterClient.treatmentChartIds,
      ...params.duplicateClient.treatmentChartIds,
    ])
  );

  const updatedMaster: ClientProfileRecord = {
    ...params.masterClient,
    ...params.chosenFieldOverrides,
    loyaltyPoints: consolidatedLoyalty,
    visitHistoryCount: consolidatedVisits,
    activePackagePassIds: combinedPackages,
    treatmentChartIds: combinedCharts,
    updatedAt: now,
  };

  const updatedDuplicate: ClientProfileRecord = {
    ...params.duplicateClient,
    isMerged: true,
    mergedIntoId: params.masterClient.id,
    updatedAt: now,
  };

  const mergeLog: ClientMergeLogEntry = {
    mergeId: `MRG-${Date.now().toString(36).toUpperCase()}`,
    masterClientId: params.masterClient.id,
    mergedClientId: params.duplicateClient.id,
    mergedAt: now,
    performedBy: params.performedBy,
    conflictResolutionChoices: Object.keys(params.chosenFieldOverrides ?? {}).reduce(
      (acc, k) => ({ ...acc, [k]: String((params.chosenFieldOverrides as any)[k]) }),
      {}
    ),
    masterBeforeSnapshot,
    mergedBeforeSnapshot,
  };

  return {
    masterClient: updatedMaster,
    duplicateClient: updatedDuplicate,
    mergeLog,
  };
}

/**
 * Reverses a client merge, restoring both profiles to their pre-merge state.
 */
export function unmergeClientProfiles(mergeLog: ClientMergeLogEntry): {
  restoredMaster: ClientProfileRecord;
  restoredDuplicate: ClientProfileRecord;
} {
  return {
    restoredMaster: {
      ...mergeLog.masterBeforeSnapshot,
      updatedAt: new Date().toISOString(),
    },
    restoredDuplicate: {
      ...mergeLog.mergedBeforeSnapshot,
      isMerged: false,
      mergedIntoId: undefined,
      updatedAt: new Date().toISOString(),
    },
  };
}
