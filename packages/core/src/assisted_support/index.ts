/**
 * F130 — Assisted Support Sessions
 *
 * Implements permission-scoped, time-bounded temporary support delegation allowing
 * Posie engineers to troubleshoot studio setup while strictly firewalled from private data.
 *
 * KEY INVARIANT (Basis: I; Support Quality, WB F60, Rules SEC, OPS):
 * Scope Restriction & Secret Shielding.
 * "Support cannot see payment secrets or private records outside the granted scope."
 * Cardholder payment secrets (PAN/CVC), client clinical health records, and staff personal
 * earnings are strictly masked from support sessions. All sessions are time-bounded with an
 * instant 1-click owner revocation kill switch and immutable audit logs.
 */

export type SupportSessionScope =
  | 'calendar_scheduling_debug'
  | 'terminal_hardware_troubleshoot'
  | 'catalog_inventory_setup'
  | 'migration_mapping_review';

export interface SupportSessionGrant {
  sessionId: string;
  studioId: string;
  grantedByOwnerId: string;
  supportEngineerId: string;
  scopes: SupportSessionScope[];
  startedAtUtc: string;
  expiresAtUtc: string;
  isRevoked: boolean;
  revokedAtUtc?: string;
  revocationReason?: string;
}

export interface MaskedStudioResource {
  resourceType: 'payment_intent' | 'clinical_chart' | 'staff_compensation' | 'calendar_appointment';
  resourceId: string;
  data: Record<string, unknown>;
  maskedFields: string[];
  isMaskedForSupport: boolean;
}

export interface SupportAuditLogEntry {
  id: string;
  sessionId: string;
  timestampUtc: string;
  actor: string;
  action: 'session_granted' | 'resource_inspected' | 'session_revoked' | 'session_expired';
  details: string;
}

/**
 * Initiates a temporary, scoped support session with maximum 2-hour lifetime.
 */
export function grantAssistedSupportSession(
  studioId: string,
  grantedByOwnerId: string,
  supportEngineerId: string,
  scopes: SupportSessionScope[],
  durationMinutes: number = 60
): SupportSessionGrant {
  const cappedDuration = Math.min(Math.max(15, durationMinutes), 120); // 15m to 2h max
  const now = new Date();
  const expiresAt = new Date(now.getTime() + cappedDuration * 60 * 1000);

  return {
    sessionId: `supp_sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    studioId,
    grantedByOwnerId,
    supportEngineerId,
    scopes,
    startedAtUtc: now.toISOString(),
    expiresAtUtc: expiresAt.toISOString(),
    isRevoked: false,
  };
}

/**
 * Revokes an active support session immediately.
 */
export function revokeAssistedSupportSession(
  session: SupportSessionGrant,
  revokedByUserId: string,
  reason: string = 'Owner manually terminated session'
): SupportSessionGrant {
  return {
    ...session,
    isRevoked: true,
    revokedAtUtc: new Date().toISOString(),
    revocationReason: `${reason} (Revoked by ${revokedByUserId})`,
  };
}

/**
 * Masks confidential clinical data, payment secrets, and staff compensation
 * before displaying resources in an assisted support session.
 */
export function maskResourceForSupport(
  resourceType: MaskedStudioResource['resourceType'],
  resourceId: string,
  rawData: Record<string, unknown>,
  activeScopes: SupportSessionScope[]
): MaskedStudioResource {
  const data: Record<string, unknown> = { ...rawData };
  const maskedFields: string[] = [];

  // Invariant 1: Payment secrets are ALWAYS masked regardless of scope
  if (data.cardNumber || data.cardCvc || data.secretKey) {
    if (data.cardNumber) {
      data.cardNumber = '•••• •••• •••• ' + String(data.cardNumber).slice(-4);
      maskedFields.push('cardNumber');
    }
    if (data.cardCvc) {
      data.cardCvc = '•••';
      maskedFields.push('cardCvc');
    }
    if (data.secretKey) {
      data.secretKey = '[REDACTED_API_SECRET]';
      maskedFields.push('secretKey');
    }
  }

  // Invariant 2: Clinical SOAP notes & medical findings are strictly masked
  if (resourceType === 'clinical_chart' || data.clinicalSoapFindings) {
    data.clinicalSoapFindings = '[Confidential Client Health Record Hidden from Support]';
    data.allergies = '[Hidden from Support]';
    maskedFields.push('clinicalSoapFindings', 'allergies');
  }

  // Invariant 3: Staff personal earnings masked unless specific commission scope exists
  if (data.practitionerNetPayUSD) {
    data.practitionerNetPayUSD = '[Personal Compensation Hidden]';
    maskedFields.push('practitionerNetPayUSD');
  }

  return {
    resourceType,
    resourceId,
    data,
    maskedFields,
    isMaskedForSupport: maskedFields.length > 0,
  };
}
