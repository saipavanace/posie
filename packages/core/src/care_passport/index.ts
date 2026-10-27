/**
 * Posie Core - F157: Client-Controlled Care Passport
 *
 * Implements a sovereign, portable client care record allowing clients to securely export
 * and selectively share time-limited access to their treatment history, patch test clearances,
 * formula notes, and clinical photos with another studio or practitioner.
 *
 * Compliance: Follows Posie Rule DR04 & WB F157 (Explicit consent, identity and interoperability;
 * no business can browse another's records without an active, client-issued grant; portable client care).
 */

export type CarePassportScope =
  | 'treatment_history'
  | 'patch_test_clearances'
  | 'formula_notes'
  | 'treatment_photos'
  | 'allergies_and_sensitivities';

export interface VerifiedPassportEntry {
  entryId: string;
  scope: CarePassportScope;
  date: string;
  performingStudioName: string;
  performingPractitioner: string;
  summary: string;
  clinicalDetails?: Record<string, any>;
}

export interface CarePassportRecord {
  passportId: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  verifiedEntries: VerifiedPassportEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface CarePassportAccessGrant {
  grantId: string;
  passportId: string;
  recipientStudioName: string;
  recipientPractitionerName: string;
  grantedScopes: CarePassportScope[];
  accessToken: string;
  expiresAt: string;
  isRevoked: boolean;
  revokedAt?: string;
  accessCount: number;
}

/**
 * Creates or initializes a client's care passport record
 */
export function createCarePassportRecord(
  clientId: string,
  clientName: string,
  clientPhone: string,
  entries: VerifiedPassportEntry[]
): CarePassportRecord {
  const nowIso = new Date().toISOString();
  return {
    passportId: `pass-${clientId}-${Date.now().toString().slice(-6)}`,
    clientId,
    clientName,
    clientPhone,
    verifiedEntries: entries,
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}

/**
 * Issues a scoped, time-limited passport access grant to another studio or practitioner
 */
export function issueCarePassportGrant(
  passport: CarePassportRecord,
  recipientStudioName: string,
  recipientPractitionerName: string,
  scopes: CarePassportScope[],
  durationHours = 48
): CarePassportAccessGrant {
  if (scopes.length === 0) {
    throw new Error('At least one access scope must be granted');
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000).toISOString();
  const grantId = `grant-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const accessToken = `tok-pass-${Math.random().toString(36).substring(2, 12)}-${Date.now()}`;

  return {
    grantId,
    passportId: passport.passportId,
    recipientStudioName,
    recipientPractitionerName,
    grantedScopes: scopes,
    accessToken,
    expiresAt,
    isRevoked: false,
    accessCount: 0,
  };
}

/**
 * Immediately revokes an active passport access grant via client kill switch
 */
export function revokeCarePassportGrant(
  grant: CarePassportAccessGrant,
  clientAuthorizerId: string
): CarePassportAccessGrant {
  return {
    ...grant,
    isRevoked: true,
    revokedAt: new Date().toISOString(),
  };
}

/**
 * Evaluates an external studio's attempt to view passport data under a specific access token
 */
export function accessCarePassport(
  grant: CarePassportAccessGrant,
  passport: CarePassportRecord,
  requestIp: string
): {
  isAccessGranted: boolean;
  authorizedEntries: VerifiedPassportEntry[];
  updatedGrant: CarePassportAccessGrant;
  rejectionReason?: string;
} {
  // Check passport identity match
  if (grant.passportId !== passport.passportId) {
    return {
      isAccessGranted: false,
      authorizedEntries: [],
      updatedGrant: grant,
      rejectionReason: 'Passport token does not match requested client record',
    };
  }

  // Check revocation
  if (grant.isRevoked) {
    return {
      isAccessGranted: false,
      authorizedEntries: [],
      updatedGrant: grant,
      rejectionReason: 'Access grant has been explicitly revoked by the client',
    };
  }

  // Check expiration
  if (new Date() > new Date(grant.expiresAt)) {
    return {
      isAccessGranted: false,
      authorizedEntries: [],
      updatedGrant: grant,
      rejectionReason: 'Time-limited access token has expired',
    };
  }

  // Filter entries strictly to granted scopes
  const authorized = passport.verifiedEntries.filter(e => grant.grantedScopes.includes(e.scope));

  const updatedGrant: CarePassportAccessGrant = {
    ...grant,
    accessCount: grant.accessCount + 1,
  };

  return {
    isAccessGranted: true,
    authorizedEntries: authorized,
    updatedGrant,
  };
}
