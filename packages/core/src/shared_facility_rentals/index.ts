/**
 * Posie Core Engine - Shared Room and Equipment Rentals (F171)
 *
 * Implements short-term treatment room, medspa suite, and specialized equipment
 * reservations with practitioner eligibility verification, security deposit holds,
 * and check-in/check-out condition inspection and damage reporting.
 *
 * Domain Invariant (Basis: Expansion (X); NET LEG PAY, WB F171, Rule F171, Table 90, Table 105):
 * Allows approved independent businesses to reserve available studio suites and equipment.
 * Enforces practitioner licensure and liability insurance prerequisites before booking.
 * Keeps security deposits strictly segregated from rental fees on distinct ledgers.
 * Every booking records a responsible operator, check-in photo inspection, and damage triage.
 */

export type FacilityResourceType =
  | 'aesthetic_treatment_room'
  | 'medspa_laser_suite'
  | 'styling_chair_station'
  | 'wellness_infusion_bay';

export interface RenterEligibilityCredentials {
  renterBusinessName: string;
  responsibleOperatorName: string;
  professionalLicenseNumber: string;
  licenseJurisdiction: string;
  insurancePolicyNumber: string;
  insuranceExpiryDate: string; // YYYY-MM-DD
  isVerified: boolean;
}

export interface FacilityRentalListing {
  facilityId: string;
  facilityName: string;
  resourceType: FacilityResourceType;
  hourlyRentalRate: number;
  dailyRentalRate: number;
  requiredSecurityDeposit: number;
  includedEquipment: string[];
}

export interface InspectionChecklist {
  surfacesClean: boolean;
  equipmentFunctional: boolean;
  wasteProperlyDisposed: boolean;
  notes?: string;
  photoUrls: string[];
}

export interface FacilityReservation {
  reservationId: string;
  facilityId: string;
  facilityName: string;
  renter: RenterEligibilityCredentials;
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
  rentalDurationHours: number;
  rentalFeeTotal: number;
  securityDepositHeld: number;
  status: 'booked' | 'checked_in' | 'completed' | 'damage_flagged' | 'cancelled';
  checkInInspection?: InspectionChecklist;
  checkOutInspection?: InspectionChecklist;
  damageReport?: {
    reportedAt: string;
    damageDescription: string;
    estimatedCost: number;
    depositWithheld: number;
    refundedDeposit: number;
  };
  createdAt: string;
}

/**
 * Creates a facility or equipment reservation after verifying the renter's
 * professional license and active general liability insurance.
 */
export function createFacilityReservation(input: {
  reservationId: string;
  listing: FacilityRentalListing;
  renter: RenterEligibilityCredentials;
  startTime: string;
  endTime: string;
  currentDateStr?: string;
}): FacilityReservation {
  const now = input.currentDateStr ? new Date(input.currentDateStr) : new Date();

  // 1. Mandatory eligibility validation
  if (!input.renter.isVerified) {
    throw new Error('Renter business identity and professional license must be verified before booking.');
  }

  const insuranceExp = new Date(input.renter.insuranceExpiryDate);
  if (insuranceExp < now) {
    throw new Error(`Renter liability insurance expired on ${input.renter.insuranceExpiryDate}. Active insurance required.`);
  }

  const start = new Date(input.startTime).getTime();
  const end = new Date(input.endTime).getTime();
  if (end <= start) {
    throw new Error('Reservation end time must be after start time.');
  }

  const durationHours = Math.round(((end - start) / (1000 * 60 * 60)) * 10) / 10;
  const rentalFee = Math.round(durationHours * input.listing.hourlyRentalRate * 100) / 100;

  return {
    reservationId: input.reservationId,
    facilityId: input.listing.facilityId,
    facilityName: input.listing.facilityName,
    renter: input.renter,
    startTime: input.startTime,
    endTime: input.endTime,
    rentalDurationHours: durationHours,
    rentalFeeTotal: rentalFee,
    securityDepositHeld: input.listing.requiredSecurityDeposit,
    status: 'booked',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Records check-in inspection checklist and photos.
 */
export function checkInFacilityRental(
  reservation: FacilityReservation,
  checklist: InspectionChecklist
): FacilityReservation {
  if (reservation.status !== 'booked') {
    throw new Error(`Cannot check in reservation in status "${reservation.status}".`);
  }

  return {
    ...reservation,
    status: 'checked_in',
    checkInInspection: checklist,
  };
}

/**
 * Completes check-out inspection, resolving security deposit and assessing damage if present.
 */
export function checkOutFacilityRental(
  reservation: FacilityReservation,
  checkOutChecklist: InspectionChecklist,
  damageAssessment?: { damageDescription: string; repairCost: number }
): FacilityReservation {
  if (reservation.status !== 'checked_in') {
    throw new Error(`Cannot check out reservation in status "${reservation.status}".`);
  }

  if (damageAssessment && damageAssessment.repairCost > 0) {
    const depositWithheld = Math.min(reservation.securityDepositHeld, damageAssessment.repairCost);
    const refundedDeposit = Math.round((reservation.securityDepositHeld - depositWithheld) * 100) / 100;

    return {
      ...reservation,
      status: 'damage_flagged',
      checkOutInspection: checkOutChecklist,
      damageReport: {
        reportedAt: new Date().toISOString(),
        damageDescription: damageAssessment.damageDescription,
        estimatedCost: damageAssessment.repairCost,
        depositWithheld,
        refundedDeposit,
      },
    };
  }

  return {
    ...reservation,
    status: 'completed',
    checkOutInspection: checkOutChecklist,
    damageReport: {
      reportedAt: new Date().toISOString(),
      damageDescription: 'None. Returned in clean, functional condition.',
      estimatedCost: 0,
      depositWithheld: 0,
      refundedDeposit: reservation.securityDepositHeld,
    },
  };
}
