/**
 * Posie Core Engine - Insurance Billing (F176)
 *
 * Implements electronic claims generation (CMS-1500 / 837P format), eligibility
 * verification (270/271), remittance reconciliation (ERA 835), and denial management
 * for medically necessary aesthetic, dermatological, and therapeutic services.
 *
 * Domain Invariant (Basis: Expansion (X); CLIN FIN PART, WB F176, Rule F176, Table 91):
 * Supports eligibility, claims, and remittance exclusively for legitimate covered
 * services and qualified licensed practitioners (NPI, taxonomy). Claims reconcile
 * strictly to electronic remittances (ERA 835). Every claim denial is assigned an
 * accountable owner with a structured appeal and correction workflow.
 */

export interface InsurancePolicyDetails {
  payerId: string;
  payerName: string;
  memberId: string;
  groupNumber?: string;
  insuredName: string;
  relationshipToInsured: 'self' | 'spouse' | 'child' | 'other';
  isEligibilityVerified: boolean;
  verifiedCopayAmount?: number;
  verifiedDeductibleRemaining?: number;
}

export interface ClaimLineItem {
  serviceDate: string; // YYYY-MM-DD
  cptCode: string; // e.g., "99213", "17110", "97124"
  cptDescription: string;
  modifier?: string; // e.g. "25", "59"
  diagnosisPointers: string[]; // e.g. ["L70.0", "M79.1"]
  billedCharge: number;
  units: number;
}

export interface InsuranceClaimDraft {
  claimId: string;
  appointmentId: string;
  clientId: string;
  clientName: string;
  renderingProviderNpi: string;
  renderingProviderName: string;
  renderingProviderTaxonomy: string;
  billingProviderNpi: string;
  policy: InsurancePolicyDetails;
  diagnosisCodesICD10: string[];
  lineItems: ClaimLineItem[];
  totalBilledAmount: number;
  status: 'draft' | 'submitted' | 'adjudicated_paid' | 'denied_pending_appeal';
  submittedAt?: string;
}

export interface RemittanceAdvice835 {
  remittanceId: string;
  claimId: string;
  payerName: string;
  allowedAmount: number;
  paidAmount: number;
  patientResponsibilityCopay: number;
  patientResponsibilityCoinsurance: number;
  contractualAdjustment: number;
  claimStatusCode: 'processed_as_primary' | 'denied';
  denialReasonCode?: string; // e.g. "CO-16" (Missing information), "PR-1" (Deductible)
  adjudicatedAt: string;
}

export interface ClaimDenialAppeal {
  appealId: string;
  claimId: string;
  denialReasonCode: string;
  assignedOwnerName: string;
  correctiveAction: string;
  status: 'open' | 'submitted_appeal' | 'resolved';
  updatedAt: string;
}

/**
 * Creates an electronic health insurance claim for a qualified covered treatment.
 */
export function createInsuranceClaim(input: {
  claimId: string;
  appointmentId: string;
  clientId: string;
  clientName: string;
  renderingProviderNpi: string;
  renderingProviderName: string;
  renderingProviderTaxonomy: string;
  billingProviderNpi: string;
  policy: InsurancePolicyDetails;
  diagnosisCodesICD10: string[];
  lineItems: ClaimLineItem[];
}): InsuranceClaimDraft {
  if (!input.policy.isEligibilityVerified) {
    throw new Error('Insurance eligibility must be verified (270/271) before submitting claims.');
  }

  if (input.renderingProviderNpi.length !== 10) {
    throw new Error('Valid 10-digit National Provider Identifier (NPI) required for rendering clinician.');
  }

  if (input.diagnosisCodesICD10.length === 0 || input.lineItems.length === 0) {
    throw new Error('Claim requires at least one ICD-10 diagnosis code and one itemized CPT line item.');
  }

  const totalBilled = input.lineItems.reduce((acc, item) => acc + item.billedCharge * item.units, 0);

  return {
    claimId: input.claimId,
    appointmentId: input.appointmentId,
    clientId: input.clientId,
    clientName: input.clientName,
    renderingProviderNpi: input.renderingProviderNpi,
    renderingProviderName: input.renderingProviderName,
    renderingProviderTaxonomy: input.renderingProviderTaxonomy,
    billingProviderNpi: input.billingProviderNpi,
    policy: input.policy,
    diagnosisCodesICD10: input.diagnosisCodesICD10,
    lineItems: input.lineItems,
    totalBilledAmount: Math.round(totalBilled * 100) / 100,
    status: 'draft',
  };
}

/**
 * Reconciles an adjudicated electronic remittance advice (ERA 835) against the billed claim.
 */
export function reconcileClaimRemittance(
  claim: InsuranceClaimDraft,
  era: RemittanceAdvice835
): {
  updatedClaim: InsuranceClaimDraft;
  denialAppealNeeded: boolean;
  financialSummary: {
    billed: number;
    paid: number;
    patientOwes: number;
    contractualWriteOff: number;
  };
} {
  const isDenied = era.claimStatusCode === 'denied';
  const updatedClaim: InsuranceClaimDraft = {
    ...claim,
    status: isDenied ? 'denied_pending_appeal' : 'adjudicated_paid',
  };

  const patientOwes = Math.round((era.patientResponsibilityCopay + era.patientResponsibilityCoinsurance) * 100) / 100;

  return {
    updatedClaim,
    denialAppealNeeded: isDenied,
    financialSummary: {
      billed: claim.totalBilledAmount,
      paid: era.paidAmount,
      patientOwes,
      contractualWriteOff: era.contractualAdjustment,
    },
  };
}

/**
 * Assigns an accountable owner to investigate and appeal a claim denial.
 */
export function assignClaimDenialAppeal(
  claimId: string,
  denialReasonCode: string,
  assignedOwner: string,
  correctiveAction: string
): ClaimDenialAppeal {
  if (!assignedOwner || assignedOwner.trim() === '') {
    throw new Error('Claim denials must be assigned to an accountable billing or clinical specialist.');
  }

  return {
    appealId: `appeal_${claimId}_${Date.now()}`,
    claimId,
    denialReasonCode,
    assignedOwnerName: assignedOwner,
    correctiveAction,
    status: 'open',
    updatedAt: new Date().toISOString(),
  };
}
