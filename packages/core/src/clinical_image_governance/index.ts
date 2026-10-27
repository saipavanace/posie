/**
 * F184: Clinical Image Interpretation
 *
 * Treats medical/clinical image diagnostic assessment as a separate regulated-product decision,
 * strictly barring diagnostic classifications from standard appointment booking workflows,
 * and requiring certified medical oversight and IRB/SaMD validation.
 */

export interface ImageGovernanceContext {
  imageId: string;
  capturedInModule: 'booking_flow' | 'standard_salon_notes' | 'regulated_clinical_trial' | 'investigational_dermatology';
  uploaderRole: 'esthetician' | 'cosmetologist' | 'registered_nurse' | 'physician' | 'client';
}

export interface ClinicalDiagnosticAttempt {
  suspectedCondition: string;
  automatedClassificationConfidence?: number;
  requestingDiagnosticReport: boolean;
}

export interface ClinicalGovernanceDecision {
  decisionId: string;
  imageId: string;
  isDiagnosticLaunchBlocked: boolean;
  blockReason?: string;
  isSegregatedFromBooking: boolean;
  regulatoryStatus: 'investigational_samd_only' | 'blocked_unregulated' | 'standard_cosmetic_photography';
  requiresMedicalDirectorReview: boolean;
  recommendedAction:
    | 'proceed_as_standard_photo'
    | 'block_autonomous_diagnosis_and_refer_in_person'
    | 'conduct_under_approved_irb_protocol';
  evaluatedAt: string;
}

/**
 * Enforces a strict regulatory firewall between casual aesthetic photography and medical
 * diagnostic Software as a Medical Device (SaMD) evaluations.
 */
export function evaluateClinicalImageGovernance(
  context: ImageGovernanceContext,
  attempt?: ClinicalDiagnosticAttempt
): ClinicalGovernanceDecision {
  const decisionId = `gov_img_${Date.now()}`;
  const evaluatedAt = new Date().toISOString();

  // If no diagnostic evaluation is attempted, treat as standard cosmetic photography
  if (!attempt || !attempt.requestingDiagnosticReport) {
    return {
      decisionId,
      imageId: context.imageId,
      isDiagnosticLaunchBlocked: false,
      isSegregatedFromBooking: false,
      regulatoryStatus: 'standard_cosmetic_photography',
      requiresMedicalDirectorReview: false,
      recommendedAction: 'proceed_as_standard_photo',
      evaluatedAt,
    };
  }

  // Attempted diagnostic classification in core booking or regular salon notes: STRICT BLOCK
  if (context.capturedInModule === 'booking_flow' || context.capturedInModule === 'standard_salon_notes') {
    return {
      decisionId,
      imageId: context.imageId,
      isDiagnosticLaunchBlocked: true,
      blockReason:
        'REGULATORY_BOUNDARY_VIOLATION: Medical image assessment is segregated from booking and cosmetic charting. Clinical diagnosis requires FDA SaMD clearance, formal clinical trials, and licensed physician oversight.',
      isSegregatedFromBooking: true,
      regulatoryStatus: 'blocked_unregulated',
      requiresMedicalDirectorReview: true,
      recommendedAction: 'block_autonomous_diagnosis_and_refer_in_person',
      evaluatedAt,
    };
  }

  // Regulated research or investigational environment with appropriate clinical clinician
  const isLicensedClinician = context.uploaderRole === 'physician' || context.uploaderRole === 'registered_nurse';

  if (!isLicensedClinician) {
    return {
      decisionId,
      imageId: context.imageId,
      isDiagnosticLaunchBlocked: true,
      blockReason: 'UNAUTHORIZED_CLINICAL_ROLE: Only licensed clinical investigators (MD/DO/RN) may interpret diagnostic trial images.',
      isSegregatedFromBooking: true,
      regulatoryStatus: 'blocked_unregulated',
      requiresMedicalDirectorReview: true,
      recommendedAction: 'block_autonomous_diagnosis_and_refer_in_person',
      evaluatedAt,
    };
  }

  return {
    decisionId,
    imageId: context.imageId,
    isDiagnosticLaunchBlocked: false,
    isSegregatedFromBooking: true,
    regulatoryStatus: 'investigational_samd_only',
    requiresMedicalDirectorReview: true,
    recommendedAction: 'conduct_under_approved_irb_protocol',
    evaluatedAt,
  };
}
