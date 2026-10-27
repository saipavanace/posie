/**
 * F139 — Multi Location Operations
 *
 * Coordinates enterprise multi-location beauty & wellness operations with shared service catalogs,
 * local price/tax overrides, cross-location gift card/series redemption, and consolidated reporting.
 *
 * KEY INVARIANT (Basis: B; WB F59, Enterprise Coordination):
 * Consolidation Truth & Unique Client Deduplication.
 * "Location consolidation avoids double-counting shared clients."
 * When reporting enterprise-wide customer reach, clients who book across multiple studio locations
 * are deduplicated by canonical identity (email/phone), preventing artificial audience inflation.
 * Local tax registrations and physical addresses retain legal autonomy.
 */

export interface StudioLocationProfile {
  locationId: string;
  name: string; // e.g. 'Beverly Hills Atelier'
  legalEntityName: string;
  taxRegistrationNumber: string;
  city: string;
  state: string;
  localSalesTaxRate: number; // e.g. 9.5
  isActive: boolean;
}

export interface CrossLocationEntitlement {
  entitlementId: string;
  type: 'gift_card' | 'package_series' | 'membership';
  issuedAtLocationId: string;
  clientId: string;
  originalValueOrCredits: number;
  remainingBalance: number;
  allowCrossLocationRedemption: boolean;
}

export interface LocationPerformanceMetric {
  locationId: string;
  locationName: string;
  grossRevenueUSD: number;
  appointmentsCount: number;
  clientIdsServed: string[];
}

export interface ConsolidatedEnterpriseReport {
  enterpriseName: string;
  totalLocationsCount: number;
  totalEnterpriseGrossRevenueUSD: number;
  totalAppointmentsCount: number;
  /** Deduplicated unique client count across all locations */
  totalUniqueClientsCount: number;
  clientCrossVisitationRatePercentage: number;
  locationBreakdown: Array<{
    locationId: string;
    locationName: string;
    grossRevenueUSD: number;
    appointmentsCount: number;
    uniqueClientsCount: number;
  }>;
}

/**
 * Validates cross-location redemption eligibility for gift cards and package series.
 */
export function validateCrossLocationRedemption(
  entitlement: CrossLocationEntitlement,
  targetLocationId: string
): { isEligible: boolean; reason?: string } {
  if (entitlement.remainingBalance <= 0) {
    return { isEligible: false, reason: 'Entitlement balance is exhausted (0 remaining).' };
  }

  if (entitlement.issuedAtLocationId === targetLocationId) {
    return { isEligible: true };
  }

  if (!entitlement.allowCrossLocationRedemption) {
    return {
      isEligible: false,
      reason: `Entitlement was issued at location '${entitlement.issuedAtLocationId}' and is restricted from cross-location redemption.`,
    };
  }

  return { isEligible: true };
}

/**
 * Compiles a consolidated multi-location enterprise report with deduplicated client reach.
 */
export function compileConsolidatedEnterpriseReport(
  enterpriseName: string,
  locations: LocationPerformanceMetric[]
): ConsolidatedEnterpriseReport {
  let totalEnterpriseGrossRevenueUSD = 0;
  let totalAppointmentsCount = 0;
  const uniqueClientSet = new Set<string>();
  let totalRawClientVisitations = 0;

  const locationBreakdown = locations.map((loc) => {
    totalEnterpriseGrossRevenueUSD += loc.grossRevenueUSD;
    totalAppointmentsCount += loc.appointmentsCount;
    totalRawClientVisitations += loc.clientIdsServed.length;

    for (const cid of loc.clientIdsServed) {
      uniqueClientSet.add(cid);
    }

    return {
      locationId: loc.locationId,
      locationName: loc.locationName,
      grossRevenueUSD: Math.round(loc.grossRevenueUSD * 100) / 100,
      appointmentsCount: loc.appointmentsCount,
      uniqueClientsCount: new Set(loc.clientIdsServed).size,
    };
  });

  const totalUniqueClientsCount = uniqueClientSet.size;
  // Calculate cross-visitation: how many repeat client visits occurred across multiple locations
  const multiLocationVisits = totalRawClientVisitations - totalUniqueClientsCount;
  const clientCrossVisitationRatePercentage =
    totalRawClientVisitations > 0
      ? Math.round((multiLocationVisits / totalRawClientVisitations) * 100 * 10) / 10
      : 0;

  return {
    enterpriseName,
    totalLocationsCount: locations.length,
    totalEnterpriseGrossRevenueUSD: Math.round(totalEnterpriseGrossRevenueUSD * 100) / 100,
    totalAppointmentsCount,
    totalUniqueClientsCount,
    clientCrossVisitationRatePercentage,
    locationBreakdown,
  };
}
