/**
 * Posie Core - F158: Practitioner Relocation Workflow
 *
 * Implements a governed, professional transition workflow when a practitioner relocates or departs.
 * Strictly respects employment contract terms (1099 independent booth renters legally own their client lists,
 * whereas W-2 employee client records remain salon-owned). Governs client departure notifications,
 * export authorizations, and non-solicitation compliance.
 *
 * Compliance: Follows Posie Rule DR04 & WB F158 (Contract review and record permissions;
 * exports and client invitations require the appropriate owner's authorization; respectful transitions).
 */

export type PractitionerEmploymentContract =
  | '1099_independent_booth_renter'
  | 'w2_commission_employee'
  | 'w2_hourly_employee';

export type ExportScope =
  | 'personal_earnings_history'
  | 'client_contact_directory'
  | 'clinical_treatment_portfolio';

export interface RelocationTransitionRequest {
  requestId: string;
  practitionerStaffId: string;
  practitionerName: string;
  departureDate: string;
  destinationStudioName: string;
  contractType: PractitionerEmploymentContract;
  requestedExportScopes: ExportScope[];
  status:
    | 'authorized_for_export'
    | 'restricted_w2_salon_owned'
    | 'pending_contract_review'
    | 'completed';
  authorizedScopes: ExportScope[];
  departureNoticeDraft?: string;
  managerSignoff?: {
    managerStaffId: string;
    signedAt: string;
    complianceNotes: string;
  };
  createdAt: string;
}

/**
 * Initiates a relocation transition evaluating contractual data ownership rights
 */
export function initiateRelocationTransition(
  practitionerStaffId: string,
  practitionerName: string,
  departureDate: string,
  destinationStudioName: string,
  contractType: PractitionerEmploymentContract,
  requestedScopes: ExportScope[]
): RelocationTransitionRequest {
  const requestId = `reloc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const nowIso = new Date().toISOString();

  // Invariant WB F37 & WB F158:
  // 1099 independent contractors legally own their customer lists; export is authorized.
  // W-2 employees: client contact directory belongs to the studio and is restricted unless manager signs off.
  let initialStatus: RelocationTransitionRequest['status'] = 'pending_contract_review';
  let authorizedScopes: ExportScope[] = [];

  if (contractType === '1099_independent_booth_renter') {
    initialStatus = 'authorized_for_export';
    authorizedScopes = [...requestedScopes]; // All requested scopes granted
  } else {
    // W-2 employee: personal earnings and treatment portfolio (without client contact PII) are granted;
    // client contact directory requires manager signoff
    authorizedScopes = requestedScopes.filter(s => s !== 'client_contact_directory');
    initialStatus = requestedScopes.includes('client_contact_directory')
      ? 'restricted_w2_salon_owned'
      : 'authorized_for_export';
  }

  return {
    requestId,
    practitionerStaffId,
    practitionerName,
    departureDate,
    destinationStudioName,
    contractType,
    requestedExportScopes: requestedScopes,
    status: initialStatus,
    authorizedScopes,
    createdAt: nowIso,
  };
}

/**
 * Manager review and signoff for departure export scopes
 */
export function authorizeRelocationExport(
  request: RelocationTransitionRequest,
  managerStaffId: string,
  managerApprovedClientListSharing: boolean,
  complianceNotes: string
): RelocationTransitionRequest {
  if (!managerStaffId) {
    throw new Error('Manager staff ID is mandatory to authorize practitioner departure transition');
  }

  const nowIso = new Date().toISOString();
  let updatedAuthorizedScopes = [...request.authorizedScopes];
  let newStatus: RelocationTransitionRequest['status'] = 'authorized_for_export';

  if (request.contractType !== '1099_independent_booth_renter') {
    if (managerApprovedClientListSharing) {
      if (!updatedAuthorizedScopes.includes('client_contact_directory')) {
        updatedAuthorizedScopes.push('client_contact_directory');
      }
      newStatus = 'authorized_for_export';
    } else {
      updatedAuthorizedScopes = updatedAuthorizedScopes.filter(s => s !== 'client_contact_directory');
      newStatus = 'restricted_w2_salon_owned';
    }
  }

  return {
    ...request,
    status: newStatus,
    authorizedScopes: updatedAuthorizedScopes,
    managerSignoff: {
      managerStaffId,
      signedAt: nowIso,
      complianceNotes,
    },
  };
}

/**
 * Generates an ethical, professional client departure notification text
 */
export function generateLawfulDepartureNotice(
  request: RelocationTransitionRequest,
  salonBrandName: string
): string {
  if (request.contractType === '1099_independent_booth_renter') {
    return `Dear Client, ${request.practitionerName} will be transitioning their independent practice from ${salonBrandName} to ${request.destinationStudioName} effective ${request.departureDate}. To continue booking your services with ${request.practitionerName}, your records and booking access remain seamless.`;
  }

  return `Dear Client, our valued team member ${request.practitionerName} will be departing ${salonBrandName} effective ${request.departureDate}. We thank them for their dedication! The team at ${salonBrandName} remains honored to care for your beauty and wellness regimen with our full staff of qualified specialists.`;
}
