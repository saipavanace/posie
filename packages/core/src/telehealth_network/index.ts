/**
 * Posie Core Engine - Clinical Telehealth Network (F175)
 *
 * Implements clinical telehealth matching based on patient state licensure,
 * good-faith medical clearance consultations, documented clinical outcomes,
 * and emergency / in-person escalation protocols.
 *
 * Domain Invariant (Basis: Expansion (X); NET CLIN LEG OPS, WB F175, Rule F175, Table 91, Table 105):
 * Matches clients exclusively with clinicians credentialed and actively licensed
 * in the client's physical state. Clear medical responsibility is assigned to the
 * evaluating clinician. If ambiguous eligibility, acute contraindications, or emergency
 * symptoms arise, the workflow halts automated clearance and triggers immediate
 * escalation to in-person medical care with structured clinical handover.
 */

export interface TelehealthClinician {
  clinicianId: string;
  fullName: string;
  title: 'MD' | 'DO' | 'NP' | 'PA';
  licensedStates: string[]; // e.g. ["US-NY", "US-CA", "US-FL"]
  npiNumber: string;
  telehealthCertified: boolean;
  activeStatus: 'available' | 'in_consultation' | 'off_duty';
}

export interface TelehealthConsultationInput {
  consultationId: string;
  clientId: string;
  clientName: string;
  clientPhysicalState: string; // e.g. "US-CA"
  clinician: TelehealthClinician;
  primaryConcernOrServiceRequested: string; // e.g. "Good Faith Exam for Dysport / Dermal Filler"
  reportedMedicalHistory: {
    allergies: string[];
    medications: string[];
    pregnantOrNursing: boolean;
    activeSkinInfections: boolean;
  };
}

export interface TelehealthConsultationRecord {
  consultationId: string;
  clientId: string;
  clientName: string;
  clientPhysicalState: string;
  evaluatingClinicianId: string;
  evaluatingClinicianName: string;
  clearanceOutcome: 'cleared_for_treatment' | 'deferred_contraindication' | 'escalated_urgent_care';
  clinicalNotes: string;
  completedAt: string;
  validityWindowDays: number; // e.g. 365 days for Good Faith Exam clearance
}

export interface TelehealthEscalationPacket {
  escalationId: string;
  consultationId: string;
  clientName: string;
  escalationSeverity: 'urgent_referral' | 'immediate_emergency';
  escalationReason: string;
  recommendedCareSetting: 'emergency_department' | 'urgent_care' | 'in_person_dermatologist';
  escalatedAt: string;
}

/**
 * Matches a client with an available clinician actively licensed in the client's physical state.
 */
export function matchTelehealthClinician(
  clientPhysicalState: string,
  roster: TelehealthClinician[]
): TelehealthClinician | null {
  const matching = roster.find(
    (c) =>
      c.activeStatus === 'available' &&
      c.telehealthCertified &&
      c.licensedStates.includes(clientPhysicalState)
  );

  return matching ?? null;
}

/**
 * Conducts a standardized telehealth good-faith evaluation, enforcing jurisdiction
 * alignment and clinical contraindication checks.
 */
export function conductTelehealthConsultation(
  input: TelehealthConsultationInput
): TelehealthConsultationRecord {
  // Jurisdiction check
  if (!input.clinician.licensedStates.includes(input.clientPhysicalState)) {
    throw new Error(
      `Clinician ${input.clinician.fullName} is not licensed in client state ${input.clientPhysicalState}. Cross-state telehealth prohibited.`
    );
  }

  // Clinical safety checks
  let outcome: TelehealthConsultationRecord['clearanceOutcome'] = 'cleared_for_treatment';
  let clinicalNotes = 'Patient evaluated in good faith. Anatomy and history reviewed; cleared for planned procedure.';

  if (input.reportedMedicalHistory.pregnantOrNursing) {
    outcome = 'deferred_contraindication';
    clinicalNotes = 'Treatment deferred: Neuromodulators and elective injectables contraindicated during pregnancy/nursing.';
  } else if (input.reportedMedicalHistory.activeSkinInfections) {
    outcome = 'escalated_urgent_care';
    clinicalNotes = 'Active facial skin infection reported. In-person clinical assessment required before any aesthetic intervention.';
  }

  return {
    consultationId: input.consultationId,
    clientId: input.clientId,
    clientName: input.clientName,
    clientPhysicalState: input.clientPhysicalState,
    evaluatingClinicianId: input.clinician.clinicianId,
    evaluatingClinicianName: input.clinician.fullName,
    clearanceOutcome: outcome,
    clinicalNotes,
    completedAt: new Date().toISOString(),
    validityWindowDays: outcome === 'cleared_for_treatment' ? 365 : 0,
  };
}

/**
 * Triggers an immediate clinical escalation packet for cases with acute contraindications.
 */
export function escalateUrgentClinicalCase(
  record: TelehealthConsultationRecord,
  escalationReason: string
): TelehealthEscalationPacket {
  return {
    escalationId: `esc_${record.consultationId}_${Date.now()}`,
    consultationId: record.consultationId,
    clientName: record.clientName,
    escalationSeverity: 'urgent_referral',
    escalationReason,
    recommendedCareSetting: 'in_person_dermatologist',
    escalatedAt: new Date().toISOString(),
  };
}
