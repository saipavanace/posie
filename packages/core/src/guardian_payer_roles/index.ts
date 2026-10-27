/**
 * F128 — Guardian and Authorized Payer Roles
 *
 * Implements strict identity separation between the client receiving service,
 * legal guardians (for minors/dependents), third-party payers, and update recipients.
 *
 * KEY INVARIANT (Basis: I; Family Relationships, Rules DR04, DR05, F100):
 * Payer Separation from Clinical Records.
 * "Paying for an appointment alone never grants access to private notes or images."
 * A third-party payer (parent, partner, employer) receives billing receipts and invoices ONLY.
 * They are strictly firewalled from viewing confidential intake questionnaires, clinical SOAP notes,
 * treatment photography, or private aftercare instructions without explicit client consent.
 */

export type RelationshipRole = 'client' | 'guardian' | 'authorized_payer' | 'update_recipient';

export interface PersonIdentity {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string; // YYYY-MM-DD
  isMinor?: boolean;
}

export interface AppointmentRoleRelationship {
  appointmentId: string;
  client: PersonIdentity;
  guardian?: PersonIdentity;
  payer?: PersonIdentity;
  updateRecipients?: PersonIdentity[];
  /** Explicit release signed by client permitting third-party clinical note viewing */
  hasClientAuthorizedPayerMedicalDisclosure?: boolean;
  hasClientAuthorizedPayerPhotoDisclosure?: boolean;
}

export interface AccessPrivilegeCheck {
  requestorId: string;
  requestorRole: RelationshipRole;
  canViewBillingInvoice: boolean;
  canViewClinicalNotes: boolean;
  canViewBeforeAfterPhotos: boolean;
  canSignTreatmentConsent: boolean;
  canReceiveStatusUpdates: boolean;
  explanation: string;
}

/**
 * Determines whether a client is legally a minor based on date of birth.
 */
export function isMinorClient(dateOfBirthStr?: string, referenceDateStr?: string): boolean {
  if (!dateOfBirthStr) return false;
  const dob = new Date(dateOfBirthStr);
  const ref = referenceDateStr ? new Date(referenceDateStr) : new Date();
  let age = ref.getFullYear() - dob.getFullYear();
  const m = ref.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && ref.getDate() < dob.getDate())) {
    age--;
  }
  return age < 18;
}

/**
 * Evaluates access privileges for a specific person in an appointment relationship.
 */
export function evaluateRelationshipPrivileges(
  relationship: AppointmentRoleRelationship,
  requestorId: string
): AccessPrivilegeCheck {
  const isClient = relationship.client.id === requestorId;
  const isGuardian = relationship.guardian?.id === requestorId;
  const isPayer = relationship.payer?.id === requestorId;
  const isUpdateRecipient = relationship.updateRecipients?.some((u) => u.id === requestorId);

  const isClientMinor =
    relationship.client.isMinor ?? isMinorClient(relationship.client.dateOfBirth);

  if (isClient) {
    return {
      requestorId,
      requestorRole: 'client',
      canViewBillingInvoice: true,
      canViewClinicalNotes: true,
      canViewBeforeAfterPhotos: true,
      canSignTreatmentConsent: !isClientMinor, // Minor requires guardian to sign legal medical consent
      canReceiveStatusUpdates: true,
      explanation: isClientMinor
        ? 'Client (Minor): Full record viewing access. Guardian required for legal procedure consent signature.'
        : 'Client (Adult): Full self-service record, billing, and clinical consent access.',
    };
  }

  if (isGuardian) {
    return {
      requestorId,
      requestorRole: 'guardian',
      canViewBillingInvoice: true,
      canViewClinicalNotes: true,
      canViewBeforeAfterPhotos: true,
      canSignTreatmentConsent: true,
      canReceiveStatusUpdates: true,
      explanation: 'Authorized Legal Guardian: Authorized to sign medical consents and review dependent clinical care.',
    };
  }

  if (isPayer) {
    const canViewClinical = Boolean(relationship.hasClientAuthorizedPayerMedicalDisclosure);
    const canViewPhotos = Boolean(relationship.hasClientAuthorizedPayerPhotoDisclosure);

    return {
      requestorId,
      requestorRole: 'authorized_payer',
      canViewBillingInvoice: true,
      canViewClinicalNotes: canViewClinical,
      canViewBeforeAfterPhotos: canViewPhotos,
      canSignTreatmentConsent: false, // Paying does not grant right to sign medical consent
      canReceiveStatusUpdates: Boolean(isUpdateRecipient),
      explanation: canViewClinical
        ? 'Authorized Payer: Billing access active. Clinical disclosure granted via explicit client release form.'
        : 'Authorized Payer (WB F128 Invariant): Paying for a visit grants billing invoice access ONLY. Private notes and clinical photos are firewalled.',
    };
  }

  if (isUpdateRecipient) {
    return {
      requestorId,
      requestorRole: 'update_recipient',
      canViewBillingInvoice: false,
      canViewClinicalNotes: false,
      canViewBeforeAfterPhotos: false,
      canSignTreatmentConsent: false,
      canReceiveStatusUpdates: true,
      explanation: 'Update Recipient: Permitted to receive appointment scheduling reminders and ETA alerts only.',
    };
  }

  // Unknown or unassociated requestor
  return {
    requestorId,
    requestorRole: 'authorized_payer',
    canViewBillingInvoice: false,
    canViewClinicalNotes: false,
    canViewBeforeAfterPhotos: false,
    canSignTreatmentConsent: false,
    canReceiveStatusUpdates: false,
    explanation: 'Access Denied: Person is not associated with this appointment.',
  };
}
