/**
 * Posie Core Engine - External Staffing Marketplace (F180)
 *
 * Implements vetted external substitute professional recruitment, shift gig matching,
 * credential and background verification, escrowed gig payouts, and incident handling.
 *
 * Domain Invariant (Basis: Validate separately (V); NET CLIN LEG OPS, WB F180, Rule F180, Table 91, Table 105):
 * Recruits and verifies independent substitute professionals (state licenses, background checks)
 * to fulfill paid salon shift coverage. Shift compensation is escrowed upon booking and
 * released upon successful shift completion minus transparent platform fees. Shift incidents
 * or complaints freeze escrow and route to operational dispute arbitration.
 */

export interface ExternalSubstituteProfile {
  substituteId: string;
  fullName: string;
  specialtyRole: 'hair_stylist' | 'licensed_esthetician' | 'nail_artist' | 'salon_assistant';
  stateLicenseNumber: string;
  licensedJurisdiction: string;
  backgroundCheckPassed: boolean;
  insurancePolicyNumber?: string;
  ratingAverage: number;
  completedShiftsCount: number;
  status: 'active_verified' | 'pending_verification' | 'suspended';
}

export interface ExternalShiftRequest {
  shiftId: string;
  salonId: string;
  salonName: string;
  locationState: string;
  shiftDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  durationHours: number;
  requiredRole: ExternalSubstituteProfile['specialtyRole'];
  offeredHourlyRate: number;
  totalCompensationEscrow: number; // e.g. 6 hours @ $45/hr = $270
}

export interface MatchedShiftGig {
  gigId: string;
  shiftId: string;
  salonId: string;
  substituteId: string;
  substituteName: string;
  agreedCompensation: number;
  platformServiceFee: number; // e.g. 10%
  netSubstitutePayout: number;
  escrowStatus: 'held_in_escrow' | 'released' | 'frozen_in_dispute';
  status: 'confirmed' | 'in_progress' | 'completed_verified' | 'incident_flagged';
  incidentNotes?: string;
  createdAt: string;
}

/**
 * Registers and verifies an external substitute professional profile.
 */
export function registerExternalSubstitute(input: {
  substituteId: string;
  fullName: string;
  specialtyRole: ExternalSubstituteProfile['specialtyRole'];
  stateLicenseNumber: string;
  licensedJurisdiction: string;
  backgroundCheckPassed: boolean;
  insurancePolicyNumber?: string;
}): ExternalSubstituteProfile {
  if (!input.stateLicenseNumber || !input.licensedJurisdiction) {
    throw new Error('Valid state license number and jurisdiction required for external substitutes.');
  }

  const isVerified = input.backgroundCheckPassed;

  return {
    substituteId: input.substituteId,
    fullName: input.fullName,
    specialtyRole: input.specialtyRole,
    stateLicenseNumber: input.stateLicenseNumber,
    licensedJurisdiction: input.licensedJurisdiction,
    backgroundCheckPassed: input.backgroundCheckPassed,
    insurancePolicyNumber: input.insurancePolicyNumber,
    ratingAverage: 5.0,
    completedShiftsCount: 0,
    status: isVerified ? 'active_verified' : 'pending_verification',
  };
}

/**
 * Matches an external shift coverage request with a verified substitute.
 * Escrows shift compensation and verifies jurisdiction and role prerequisites.
 */
export function matchExternalShiftCoverage(
  shift: ExternalShiftRequest,
  substitute: ExternalSubstituteProfile,
  platformFeeRatePercentage: number = 10.0
): MatchedShiftGig {
  if (substitute.status !== 'active_verified') {
    throw new Error('Substitute must be active and background-verified before matching.');
  }

  if (substitute.specialtyRole !== shift.requiredRole) {
    throw new Error(`Substitute role (${substitute.specialtyRole}) does not match shift requirement (${shift.requiredRole}).`);
  }

  if (substitute.licensedJurisdiction !== shift.locationState) {
    throw new Error(`Substitute jurisdiction (${substitute.licensedJurisdiction}) does not match shift location (${shift.locationState}).`);
  }

  const agreed = shift.totalCompensationEscrow;
  const fee = Math.round(((agreed * platformFeeRatePercentage) / 100) * 100) / 100;
  const netPayout = Math.round((agreed - fee) * 100) / 100;

  return {
    gigId: `gig_${shift.shiftId}_${substitute.substituteId}`,
    shiftId: shift.shiftId,
    salonId: shift.salonId,
    substituteId: substitute.substituteId,
    substituteName: substitute.fullName,
    agreedCompensation: agreed,
    platformServiceFee: fee,
    netSubstitutePayout: netPayout,
    escrowStatus: 'held_in_escrow',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Completes a shift gig and releases escrowed funds to the substitute,
 * or freezes funds if an operational incident or dispute is lodged.
 */
export function completeShiftAndReleaseEscrow(
  gig: MatchedShiftGig,
  incidentReport?: string
): {
  updatedGig: MatchedShiftGig;
  payoutReleased: number;
  statusSummary: string;
} {
  if (incidentReport && incidentReport.trim() !== '') {
    const updatedGig: MatchedShiftGig = {
      ...gig,
      escrowStatus: 'frozen_in_dispute',
      status: 'incident_flagged',
      incidentNotes: incidentReport,
    };

    return {
      updatedGig,
      payoutReleased: 0,
      statusSummary: `Escrow frozen pending operational dispute resolution. Incident: "${incidentReport}".`,
    };
  }

  const updatedGig: MatchedShiftGig = {
    ...gig,
    escrowStatus: 'released',
    status: 'completed_verified',
  };

  return {
    updatedGig,
    payoutReleased: gig.netSubstitutePayout,
    statusSummary: `Shift successfully completed. Net payout of $${gig.netSubstitutePayout.toFixed(2)} released to ${gig.substituteName}.`,
  };
}
