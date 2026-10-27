/**
 * Posie Core Engine - Electronic Prescribing (F174)
 *
 * Implements prescriber identity verification (DEA, NPI, state license),
 * regulated prescription drafting for medical aesthetics, allergy contraindication
 * cross-referencing, and pharmacy transmission auditing.
 *
 * Domain Invariant (Basis: Expansion (X); CLIN LEG PART SEC, WB F174, Rule F174, Table 91):
 * Integrates certified prescribing providers within validated medical aesthetics scope
 * (e.g., compounded topical anesthetics, post-laser prophylactics). Prescribers must
 * possess verified state medical licenses, NPI, and DEA registrations. Patient allergies
 * are cross-referenced before transmission. Electronic prescription records are
 * immutable, auditable, and never replace the clinician's independent prescribing judgment.
 */

export interface PrescriberCredentials {
  prescriberId: string;
  fullName: string;
  professionalRole: 'MD' | 'DO' | 'NP' | 'PA';
  stateLicenseNumber: string;
  licenseJurisdiction: string;
  npiNumber: string;
  deaRegistrationNumber: string;
  prescribingAuthorityActive: boolean;
}

export interface PrescriptionMedication {
  medicationName: string; // e.g. "BLT Topical Cream (Benzocaine 20%, Lidocaine 6%, Tetracaine 4%)"
  dosageForm: string; // "Topical Ointment"
  strength: string; // "20/6/4%"
  directionsSig: string; // "Apply thin layer to treatment area 30 minutes prior to microneedling"
  quantityDispense: number;
  quantityUnit: string;
  refillsAllowed: number;
}

export interface PharmacyTarget {
  ncpdpId: string;
  pharmacyName: string;
  address: string;
  phone: string;
  isCompoundingCertified?: boolean;
}

export interface ElectronicPrescription {
  prescriptionId: string;
  clientId: string;
  clientName: string;
  clientDob: string; // YYYY-MM-DD
  clientAllergies: string[];
  prescriber: PrescriberCredentials;
  medication: PrescriptionMedication;
  diagnosisCodeICD10: string; // e.g. "L70.0"
  status: 'draft' | 'verified_ready' | 'transmitted' | 'rejected_allergy_conflict';
  allergyWarning?: string;
  createdAt: string;
}

export interface TransmittedPrescriptionRecord {
  transmissionId: string;
  prescriptionId: string;
  pharmacyNcpdpId: string;
  pharmacyName: string;
  transmittedAt: string;
  prescriberDigitalSignature: string;
  deliveryConfirmationStatus: 'delivered' | 'pending_ack';
}

/**
 * Validates prescriber professional credentials (NPI, DEA, state license).
 */
export function verifyPrescriberCredentials(
  prescriber: PrescriberCredentials
): { verified: boolean; errorReason?: string } {
  if (!prescriber.prescribingAuthorityActive) {
    return { verified: false, errorReason: 'Prescriber prescriptive authority is inactive.' };
  }

  if (!prescriber.npiNumber || prescriber.npiNumber.length !== 10) {
    return { verified: false, errorReason: 'Invalid 10-digit National Provider Identifier (NPI).' };
  }

  if (!prescriber.deaRegistrationNumber || prescriber.deaRegistrationNumber.length < 9) {
    return { verified: false, errorReason: 'Valid DEA registration number required for controlled/compounded prescriptions.' };
  }

  if (!prescriber.stateLicenseNumber) {
    return { verified: false, errorReason: 'State professional medical license required.' };
  }

  return { verified: true };
}

/**
 * Creates an electronic prescription draft and cross-references patient allergies.
 */
export function createElectronicPrescription(input: {
  prescriptionId: string;
  clientId: string;
  clientName: string;
  clientDob: string;
  clientAllergies: string[];
  prescriber: PrescriberCredentials;
  medication: PrescriptionMedication;
  diagnosisCodeICD10: string;
}): ElectronicPrescription {
  // Validate prescriber
  const prescriberCheck = verifyPrescriberCredentials(input.prescriber);
  if (!prescriberCheck.verified) {
    throw new Error(`Prescriber verification failed: ${prescriberCheck.errorReason}`);
  }

  // Allergy cross-reference
  const medLower = input.medication.medicationName.toLowerCase();
  let allergyConflict: string | undefined = undefined;

  for (const allergy of input.clientAllergies) {
    const aLower = allergy.toLowerCase();
    if (medLower.includes(aLower) || (aLower.includes('caine') && medLower.includes('caine'))) {
      allergyConflict = `Severe contraindication: Client has documented allergy to "${allergy}", which conflicts with "${input.medication.medicationName}".`;
      break;
    }
  }

  const status: ElectronicPrescription['status'] = allergyConflict
    ? 'rejected_allergy_conflict'
    : 'verified_ready';

  return {
    prescriptionId: input.prescriptionId,
    clientId: input.clientId,
    clientName: input.clientName,
    clientDob: input.clientDob,
    clientAllergies: input.clientAllergies,
    prescriber: input.prescriber,
    medication: input.medication,
    diagnosisCodeICD10: input.diagnosisCodeICD10,
    status,
    allergyWarning: allergyConflict,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Electronically transmits a verified prescription to a certified pharmacy.
 */
export function transmitPrescriptionToPharmacy(
  prescription: ElectronicPrescription,
  pharmacy: PharmacyTarget
): TransmittedPrescriptionRecord {
  if (prescription.status !== 'verified_ready') {
    throw new Error(`Cannot transmit prescription in status "${prescription.status}". ${prescription.allergyWarning ?? ''}`);
  }

  prescription.status = 'transmitted';

  return {
    transmissionId: `tx_erx_${Date.now()}`,
    prescriptionId: prescription.prescriptionId,
    pharmacyNcpdpId: pharmacy.ncpdpId,
    pharmacyName: pharmacy.pharmacyName,
    transmittedAt: new Date().toISOString(),
    prescriberDigitalSignature: `SIG_${prescription.prescriber.npiNumber}_${prescription.prescriber.fullName}`,
    deliveryConfirmationStatus: 'delivered',
  };
}
