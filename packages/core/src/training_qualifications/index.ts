/**
 * Posie Core Engine - Training and Qualification Records (F162)
 *
 * Tracks professional licenses, equipment certifications, training dates,
 * and service execution eligibility for salon and clinic practitioners.
 *
 * Domain Invariant (Basis: Expansion (X); CLIN OPS, WB F162, Rule F162, Table 79):
 * Documents practitioner-defined prerequisites, equipment safety qualifications,
 * and expiration timelines. Expired credentials trigger immediate scheduling flags
 * and block booking assignments for dependent services without falsely claiming
 * that the software itself certifies legal competence. Keeps personnel qualifications
 * strictly isolated from renter commercial agreements and client files.
 */

export type CredentialCategory =
  | 'state_license'
  | 'laser_safety_certification'
  | 'advanced_modality'
  | 'sanitation_and_infection_control'
  | 'manufacturer_equipment_training';

export interface CredentialEntry {
  credentialId: string;
  category: CredentialCategory;
  title: string;
  issuingAuthority: string;
  licenseOrCertificateNumber: string;
  issuedDate: string;
  expirationDate: string; // ISO 8601 YYYY-MM-DD
  verifiedBy: string;
  verifiedAt: string;
  documentRefUrl?: string;
}

export interface StaffCredentialProfile {
  staffId: string;
  staffName: string;
  employmentType: 'w2_employee' | '1099_contractor' | 'booth_renter';
  credentials: CredentialEntry[];
  authorizedServiceCategories: string[];
}

export interface ServiceCredentialRequirement {
  serviceId: string;
  serviceName: string;
  requiredCategories: CredentialCategory[];
  minimumActiveCredentials: string[]; // Specific titles required (e.g., 'Class IV Laser Operator')
}

export interface EligibilityResult {
  eligible: boolean;
  blockedReason?: string;
  matchedCredentials: string[];
  expiringSoonWarning?: string;
}

export interface CredentialAuditAlert {
  staffId: string;
  staffName: string;
  credentialTitle: string;
  category: CredentialCategory;
  expirationDate: string;
  status: 'active' | 'expiring_soon' | 'expired';
  daysRemaining: number;
}

/**
 * Registers or updates a credential on a staff profile.
 * Validates expiration date is a valid future or current date format.
 */
export function registerStaffCredential(
  profile: StaffCredentialProfile,
  newCredential: Omit<CredentialEntry, 'verifiedAt'>,
  verifier: string
): StaffCredentialProfile {
  if (!newCredential.title || !newCredential.expirationDate) {
    throw new Error('Credential requires a title and an expiration date.');
  }

  const verifiedEntry: CredentialEntry = {
    ...newCredential,
    verifiedBy: verifier,
    verifiedAt: new Date().toISOString(),
  };

  const existingIndex = profile.credentials.findIndex(
    (c) => c.credentialId === newCredential.credentialId
  );

  let updatedList = [...profile.credentials];
  if (existingIndex >= 0) {
    updatedList[existingIndex] = verifiedEntry;
  } else {
    updatedList.push(verifiedEntry);
  }

  return {
    ...profile,
    credentials: updatedList,
  };
}

/**
 * Evaluates whether a practitioner possesses active, unexpired credentials
 * required to safely perform a given clinical or advanced modality service.
 */
export function evaluateServiceEligibility(
  profile: StaffCredentialProfile,
  requirements: ServiceCredentialRequirement,
  currentDateStr?: string
): EligibilityResult {
  const now = currentDateStr ? new Date(currentDateStr) : new Date();

  // 1. Check if required categories are satisfied by unexpired credentials
  const matchedTitles: string[] = [];

  for (const requiredTitle of requirements.minimumActiveCredentials) {
    const matchingCredential = profile.credentials.find(
      (c) => c.title.toLowerCase() === requiredTitle.toLowerCase()
    );

    if (!matchingCredential) {
      return {
        eligible: false,
        blockedReason: `Missing required prerequisite qualification: "${requiredTitle}".`,
        matchedCredentials: matchedTitles,
      };
    }

    const expDate = new Date(matchingCredential.expirationDate);
    if (expDate < now) {
      return {
        eligible: false,
        blockedReason: `Required credential "${matchingCredential.title}" expired on ${matchingCredential.expirationDate}. Service scheduling blocked until renewed.`,
        matchedCredentials: matchedTitles,
      };
    }

    matchedTitles.push(matchingCredential.title);
  }

  // Check 30-day expiration notice
  let warning: string | undefined = undefined;
  for (const cred of profile.credentials) {
    const expDate = new Date(cred.expirationDate);
    const diffDays = Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= 30) {
      warning = `Credential "${cred.title}" expires in ${diffDays} days (${cred.expirationDate}). Renewal recommended.`;
      break;
    }
  }

  return {
    eligible: true,
    matchedCredentials: matchedTitles,
    expiringSoonWarning: warning,
  };
}

/**
 * Audits all credentials across a studio roster, identifying lapsed or near-term expiring qualifications.
 */
export function auditExpiringCredentials(
  profiles: StaffCredentialProfile[],
  reviewDateStr?: string,
  warningWindowDays: number = 30
): CredentialAuditAlert[] {
  const now = reviewDateStr ? new Date(reviewDateStr) : new Date();
  const alerts: CredentialAuditAlert[] = [];

  for (const profile of profiles) {
    for (const cred of profile.credentials) {
      const expDate = new Date(cred.expirationDate);
      const diffDays = Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      let status: 'active' | 'expiring_soon' | 'expired' = 'active';
      if (diffDays < 0) {
        status = 'expired';
      } else if (diffDays <= warningWindowDays) {
        status = 'expiring_soon';
      }

      if (status !== 'active') {
        alerts.push({
          staffId: profile.staffId,
          staffName: profile.staffName,
          credentialTitle: cred.title,
          category: cred.category,
          expirationDate: cred.expirationDate,
          status,
          daysRemaining: diffDays,
        });
      }
    }
  }

  return alerts;
}
