/**
 * Posie Core Engine - Medical Practice Records and Signoff (F161)
 *
 * Implements structured clinical charts, treating clinician signatures,
 * medical director delegation & co-sign workflows, governed clinical access,
 * and immutable amendment audit trails.
 *
 * Domain Invariant (Basis: Expansion (X); CLIN LEG SEC, WB F161, Rule F161, Table 67/68):
 * Structured clinical charts distinguish medical records from non-medical salon notes.
 * High-risk procedures and mid-level practitioners enforce medical director review.
 * Access to clinical records is strictly governed by role; non-clinical front-desk
 * staff are denied access. Original signed observations remain tamper-evident and
 * immutable; amendments must preserve prior text and clinical rationale.
 */

export type ClinicalRecordType =
  | 'aesthetic_injectable'
  | 'medical_grade_peel'
  | 'laser_treatment'
  | 'wellness_infusion';

export type ClinicianRole =
  | 'treating_clinician'
  | 'medical_director'
  | 'clinical_counsel'
  | 'front_desk'
  | 'receptionist';

export interface ClinicalSigner {
  practitionerId: string;
  name: string;
  licenseType: 'MD' | 'DO' | 'NP' | 'PA' | 'RN' | 'LE';
  licenseNumber: string;
  npiNumber?: string;
  jurisdiction: string;
}

export interface MedicalDirectorReview {
  required: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'exempt';
  medicalDirectorId?: string;
  medicalDirectorName?: string;
  medicalDirectorLicense?: string;
  signedAt?: string;
  supervisoryNotes?: string;
}

export interface ClinicalObservation {
  anatomicalSite: string;
  lotNumber?: string;
  dosageOrUnits?: number;
  unitOfMeasure?: string;
  technique?: string;
  clientTolerance: string;
}

export interface ClinicalAmendment {
  amendedAt: string;
  amendedBy: ClinicalSigner;
  reason: string;
  priorNoteExcerpt: string;
  newNoteExcerpt: string;
}

export interface ClinicalAccessAuditEntry {
  accessedAt: string;
  userId: string;
  role: ClinicianRole;
  permitted: boolean;
  reason?: string;
}

export interface ClinicalChartRecord {
  chartId: string;
  clientId: string;
  practiceId: string;
  serviceId: string;
  procedureName: string;
  recordType: ClinicalRecordType;
  treatingClinician: ClinicalSigner;
  medicalDirectorReview: MedicalDirectorReview;
  observations: ClinicalObservation[];
  informedConsentRefId: string;
  status: 'draft' | 'pending_medical_director' | 'signed_locked' | 'amended';
  signedAt?: string;
  locked: boolean;
  amendments: ClinicalAmendment[];
  accessAuditLog: ClinicalAccessAuditEntry[];
}

export interface CreateClinicalChartInput {
  chartId: string;
  clientId: string;
  practiceId: string;
  serviceId: string;
  procedureName: string;
  recordType: ClinicalRecordType;
  treatingClinician: ClinicalSigner;
  observations: ClinicalObservation[];
  informedConsentRefId: string;
  requiresMedicalDirectorSignoff?: boolean;
}

/**
 * Creates a structured clinical chart draft.
 * Validates mandatory clinician license credentials and consent reference.
 */
export function createClinicalChartDraft(input: CreateClinicalChartInput): ClinicalChartRecord {
  if (!input.treatingClinician.licenseNumber || !input.treatingClinician.licenseType) {
    throw new Error('Treating clinician must possess a valid professional license and type.');
  }

  if (!input.informedConsentRefId || input.informedConsentRefId.trim() === '') {
    throw new Error('Clinical charts require a linked informed consent reference ID before creation.');
  }

  // Automatic medical director review requirement:
  // If practitioner is RN, PA, or LE performing medical procedures, or if explicitly flagged
  const midlevelRoles = ['RN', 'PA', 'LE'];
  const requiresMD =
    input.requiresMedicalDirectorSignoff ??
    (midlevelRoles.includes(input.treatingClinician.licenseType) ||
      input.recordType === 'aesthetic_injectable' ||
      input.recordType === 'laser_treatment');

  return {
    chartId: input.chartId,
    clientId: input.clientId,
    practiceId: input.practiceId,
    serviceId: input.serviceId,
    procedureName: input.procedureName,
    recordType: input.recordType,
    treatingClinician: input.treatingClinician,
    medicalDirectorReview: {
      required: requiresMD,
      status: requiresMD ? 'pending' : 'exempt',
    },
    observations: input.observations,
    informedConsentRefId: input.informedConsentRefId,
    status: 'draft',
    locked: false,
    amendments: [],
    accessAuditLog: [],
  };
}

/**
 * Signs and locks a clinical record.
 * If medical director co-sign is required, marks pending unless supervisor credentials are provided.
 */
export function signAndLockClinicalRecord(
  chart: ClinicalChartRecord,
  signer: ClinicalSigner,
  supervisorSignoff?: {
    medicalDirector: ClinicalSigner;
    supervisoryNotes: string;
  }
): ClinicalChartRecord {
  if (chart.locked && chart.status === 'signed_locked') {
    throw new Error('Cannot re-sign an already locked clinical record; use amendClinicalRecord.');
  }

  const updated: ClinicalChartRecord = { ...chart };
  const now = new Date().toISOString();

  if (updated.medicalDirectorReview.required) {
    if (!supervisorSignoff) {
      // Treating clinician signed, but awaiting supervisory co-sign
      updated.status = 'pending_medical_director';
      updated.treatingClinician = signer;
      updated.signedAt = now;
      return updated;
    }

    if (!['MD', 'DO'].includes(supervisorSignoff.medicalDirector.licenseType)) {
      throw new Error('Medical director must be a licensed physician (MD or DO).');
    }

    updated.medicalDirectorReview = {
      required: true,
      status: 'approved',
      medicalDirectorId: supervisorSignoff.medicalDirector.practitionerId,
      medicalDirectorName: supervisorSignoff.medicalDirector.name,
      medicalDirectorLicense: supervisorSignoff.medicalDirector.licenseNumber,
      signedAt: now,
      supervisoryNotes: supervisorSignoff.supervisoryNotes,
    };
  }

  updated.treatingClinician = signer;
  updated.signedAt = updated.signedAt || now;
  updated.status = 'signed_locked';
  updated.locked = true;

  return updated;
}

/**
 * Governed clinical access check.
 * Strictly separates clinical personnel (physicians, mid-levels, clinical counsel)
 * from front-desk and non-clinical salon staff.
 */
export function verifyGovernedClinicalAccess(
  chart: ClinicalChartRecord,
  accessor: { userId: string; role: ClinicianRole }
): { permitted: boolean; reason?: string } {
  const clinicalRoles: ClinicianRole[] = ['treating_clinician', 'medical_director', 'clinical_counsel'];
  const isPermitted = clinicalRoles.includes(accessor.role);

  const entry: ClinicalAccessAuditEntry = {
    accessedAt: new Date().toISOString(),
    userId: accessor.userId,
    role: accessor.role,
    permitted: isPermitted,
    reason: isPermitted
      ? 'Authorized clinical access granted'
      : 'Access denied: Front-desk role restricted from protected clinical charts',
  };

  chart.accessAuditLog.push(entry);

  return {
    permitted: isPermitted,
    reason: entry.reason,
  };
}

/**
 * Appends an immutable amendment to a locked clinical chart.
 * Original observations are never overwritten.
 */
export function amendClinicalRecord(
  chart: ClinicalChartRecord,
  amendment: {
    clinician: ClinicalSigner;
    reason: string;
    priorNoteExcerpt: string;
    newNoteExcerpt: string;
  }
): ClinicalChartRecord {
  if (!chart.locked) {
    throw new Error('Amendments are only applicable to finalized, locked clinical charts.');
  }

  if (!amendment.reason || amendment.reason.trim().length < 5) {
    throw new Error('Clinical amendment requires an explicit clinical reason.');
  }

  const updated: ClinicalChartRecord = {
    ...chart,
    status: 'amended',
    amendments: [
      ...chart.amendments,
      {
        amendedAt: new Date().toISOString(),
        amendedBy: amendment.clinician,
        reason: amendment.reason,
        priorNoteExcerpt: amendment.priorNoteExcerpt,
        newNoteExcerpt: amendment.newNoteExcerpt,
      },
    ],
  };

  return updated;
}
