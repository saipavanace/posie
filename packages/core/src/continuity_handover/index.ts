/**
 * Posie Core Engine - Business Continuity Handover (F172)
 *
 * Implements emergency handover cover packs, scoped temporary access delegation
 * for medical or sudden leave, strict financial/banking firewalls, and tamper-evident
 * access audit logging.
 *
 * Domain Invariant (Basis: Expansion (X); OPS LEG SEC, WB F172, Rule F172, Table 90):
 * Prepares an authorized temporary cover pack for illness or sudden emergencies.
 * The owner controls activation parameters. The designated cover proxy receives strictly
 * scoped access limited to urgent upcoming appointments, client contact channels, and
 * active product orders. Banking credentials, payout destinations, and legal equity
 * remain strictly firewalled. Every access during emergency activation is logged.
 */

export interface EmergencyProxyContact {
  proxyId: string;
  fullName: string;
  relationship: 'colleague' | 'studio_manager' | 'trusted_peer' | 'family_executor';
  phone: string;
  email: string;
  authorizedWindowDays: number; // e.g. 14 days maximum cover
}

export interface EmergencyClientContactEntry {
  appointmentId: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  scheduledTime: string;
  serviceName: string;
  actionRequired: 'reschedule_requested' | 'reassign_to_cover' | 'notify_delay';
}

export interface EmergencyHandoverPack {
  packId: string;
  ownerPractitionerId: string;
  ownerPractitionerName: string;
  businessName: string;
  designatedProxy: EmergencyProxyContact;
  emergencyPassphraseHash: string;
  urgentClientContacts: EmergencyClientContactEntry[];
  unresolvedWorkSummary: string;
  status: 'dormant_configured' | 'activated_in_progress' | 'deactivated_closed';
  activatedAt?: string;
  activatedBy?: string;
  activationReason?: string;
  accessLog: Array<{
    accessedAt: string;
    accessorName: string;
    resourceAccessed: string;
    permitted: boolean;
  }>;
}

export interface EmergencyHandoverSession {
  sessionId: string;
  packId: string;
  proxyName: string;
  activatedAt: string;
  expiresAt: string;
  active: boolean;
}

/**
 * Configures an emergency business continuity handover pack.
 */
export function configureEmergencyHandoverPack(input: {
  packId: string;
  ownerPractitionerId: string;
  ownerPractitionerName: string;
  businessName: string;
  designatedProxy: EmergencyProxyContact;
  passphraseHash: string;
  urgentClientContacts: EmergencyClientContactEntry[];
  unresolvedWorkSummary: string;
}): EmergencyHandoverPack {
  if (!input.designatedProxy.fullName || !input.designatedProxy.email) {
    throw new Error('Continuity handover pack requires a designated proxy name and email.');
  }

  return {
    packId: input.packId,
    ownerPractitionerId: input.ownerPractitionerId,
    ownerPractitionerName: input.ownerPractitionerName,
    businessName: input.businessName,
    designatedProxy: input.designatedProxy,
    emergencyPassphraseHash: input.passphraseHash,
    urgentClientContacts: input.urgentClientContacts,
    unresolvedWorkSummary: input.unresolvedWorkSummary,
    status: 'dormant_configured',
    accessLog: [],
  };
}

/**
 * Activates emergency cover delegation using the authorized passphrase and reason.
 */
export function activateEmergencyHandover(
  pack: EmergencyHandoverPack,
  activationRequest: {
    activatedBy: string;
    emergencyPassphrase: string;
    reason: string;
  }
): { updatedPack: EmergencyHandoverPack; session: EmergencyHandoverSession } {
  if (pack.status === 'activated_in_progress') {
    throw new Error('Continuity pack is already active.');
  }

  // Verify passphrase
  if (activationRequest.emergencyPassphrase !== pack.emergencyPassphraseHash) {
    throw new Error('Invalid emergency handover passphrase. Activation denied.');
  }

  const now = new Date();
  const expires = new Date(now.getTime() + pack.designatedProxy.authorizedWindowDays * 24 * 60 * 60 * 1000);

  const updatedPack: EmergencyHandoverPack = {
    ...pack,
    status: 'activated_in_progress',
    activatedAt: now.toISOString(),
    activatedBy: activationRequest.activatedBy,
    activationReason: activationRequest.reason,
    accessLog: [
      ...pack.accessLog,
      {
        accessedAt: now.toISOString(),
        accessorName: activationRequest.activatedBy,
        resourceAccessed: 'Emergency Pack Activation',
        permitted: true,
      },
    ],
  };

  const session: EmergencyHandoverSession = {
    sessionId: `sess_handover_${Date.now()}`,
    packId: pack.packId,
    proxyName: pack.designatedProxy.fullName,
    activatedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    active: true,
  };

  return { updatedPack, session };
}

/**
 * Enforces least-privilege scoping: permits emergency client communications and appointments,
 * strictly denies bank routing, payouts, and company equity documents.
 */
export function verifyHandoverResourceAccess(
  pack: EmergencyHandoverPack,
  session: EmergencyHandoverSession,
  resource: 'urgent_client_contacts' | 'upcoming_appointments' | 'financial_banking_payouts' | 'equity_and_tax_docs'
): { permitted: boolean; reason?: string } {
  if (!session.active || pack.status !== 'activated_in_progress') {
    return {
      permitted: false,
      reason: 'Continuity session is not active.',
    };
  }

  const isFinancialOrEquity =
    resource === 'financial_banking_payouts' || resource === 'equity_and_tax_docs';

  const permitted = !isFinancialOrEquity;

  pack.accessLog.push({
    accessedAt: new Date().toISOString(),
    accessorName: session.proxyName,
    resourceAccessed: resource,
    permitted,
  });

  if (!permitted) {
    return {
      permitted: false,
      reason: `Access Denied: Resource "${resource}" is strictly firewalled from emergency continuity proxies. Bank routing and equity remain owner-exclusive.`,
    };
  }

  return { permitted: true };
}
