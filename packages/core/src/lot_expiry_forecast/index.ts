/**
 * F125 — Lots Expiry and Stock Forecasts
 *
 * Tracks batch/lot numbers, manufacturer expiration dates, Period After Opening (PAO)
 * open-container degradation, and forecast demand from upcoming appointments.
 *
 * KEY INVARIANT (Basis: I; WB F46, F47, F150, Inventory Operations):
 * Definite Shortage Truth & Lot Expiry Safety.
 * Alerts strictly distinguish definite shortages (confirmed appointments requiring SKU X
 * where current unexpired stock < committed units) from speculative estimates with
 * unknown consumption rates. Products exceeding PAO or manufacturer expiration dates
 * are automatically quarantined from clinical selection.
 */

export interface ProductLotRecord {
  lotId: string;
  sku: string;
  productName: string;
  lotNumber: string;
  currentUnits: number;
  unitOfMeasure: string; // 'bottles' | 'vials' | 'ml'
  expirationDate: string; // YYYY-MM-DD
  openedDate?: string; // YYYY-MM-DD
  paoMonths?: number; // Period After Opening in months (e.g., 6, 12)
  isQuarantined: boolean;
  quarantineReason?: string;
}

export interface UpcomingAppointmentRequirement {
  appointmentId: string;
  scheduledDate: string;
  serviceId: string;
  serviceName: string;
  sku: string;
  unitsNeeded: number;
  /** Whether the service requires exact 1:1 units (e.g., single-use ampoule) vs estimated backbar */
  isStrictCommitment: boolean;
}

export interface LotHealthStatus {
  lotId: string;
  sku: string;
  productName: string;
  lotNumber: string;
  isExpired: boolean;
  isPaoExpired: boolean;
  isUsable: boolean;
  daysUntilExpiry: number;
  alertLevel: 'healthy' | 'expiring_soon' | 'expired' | 'pao_violated' | 'quarantined';
}

export interface StockForecastResult {
  sku: string;
  productName: string;
  currentAvailableUnexpiredUnits: number;
  committedUnitsNext7Days: number;
  projectedShortageUnits: number;
  shortageType: 'none' | 'definite_shortage' | 'estimated_shortage';
  alertMessage: string;
  requiresImmediateReorder: boolean;
}

/**
 * Evaluates the safety, PAO status, and expiration state of a product lot.
 */
export function evaluateLotHealth(
  lot: ProductLotRecord,
  currentDateStr: string = new Date().toISOString().slice(0, 10)
): LotHealthStatus {
  const current = new Date(currentDateStr).getTime();
  const expiry = new Date(lot.expirationDate).getTime();
  const daysUntilExpiry = Math.floor((expiry - current) / (1000 * 60 * 60 * 24));

  const isExpired = daysUntilExpiry <= 0;
  let isPaoExpired = false;

  if (lot.openedDate && lot.paoMonths) {
    const opened = new Date(lot.openedDate);
    const paoExpiryDate = new Date(opened.getFullYear(), opened.getMonth() + lot.paoMonths, opened.getDate());
    if (paoExpiryDate.getTime() <= current) {
      isPaoExpired = true;
    }
  }

  let alertLevel: LotHealthStatus['alertLevel'] = 'healthy';
  let isUsable = true;

  if (lot.isQuarantined) {
    alertLevel = 'quarantined';
    isUsable = false;
  } else if (isExpired) {
    alertLevel = 'expired';
    isUsable = false;
  } else if (isPaoExpired) {
    alertLevel = 'pao_violated';
    isUsable = false;
  } else if (daysUntilExpiry <= 30) {
    alertLevel = 'expiring_soon';
    isUsable = true; // Still usable but alerts manager
  }

  return {
    lotId: lot.lotId,
    sku: lot.sku,
    productName: lot.productName,
    lotNumber: lot.lotNumber,
    isExpired,
    isPaoExpired,
    isUsable,
    daysUntilExpiry,
    alertLevel,
  };
}

/**
 * Projects stock consumption across upcoming appointments and distinguishes
 * definite scheduled shortages from speculative usage estimates.
 */
export function forecastStockDemand(
  sku: string,
  productName: string,
  lots: ProductLotRecord[],
  upcomingRequirements: UpcomingAppointmentRequirement[],
  currentDateStr: string = new Date().toISOString().slice(0, 10)
): StockForecastResult {
  // Sum usable, unexpired units
  let currentAvailableUnexpiredUnits = 0;
  for (const lot of lots) {
    if (lot.sku === sku) {
      const health = evaluateLotHealth(lot, currentDateStr);
      if (health.isUsable) {
        currentAvailableUnexpiredUnits += lot.currentUnits;
      }
    }
  }

  // Calculate committed units from upcoming bookings
  let committedUnitsNext7Days = 0;
  let hasStrictRequirement = false;

  for (const req of upcomingRequirements) {
    if (req.sku === sku) {
      committedUnitsNext7Days += req.unitsNeeded;
      if (req.isStrictCommitment) {
        hasStrictRequirement = true;
      }
    }
  }

  const netProjected = currentAvailableUnexpiredUnits - committedUnitsNext7Days;
  const projectedShortageUnits = netProjected < 0 ? Math.abs(netProjected) : 0;

  let shortageType: StockForecastResult['shortageType'] = 'none';
  let requiresImmediateReorder = false;
  let alertMessage = 'Stock levels adequate for scheduled appointments.';

  if (projectedShortageUnits > 0) {
    requiresImmediateReorder = true;
    if (hasStrictRequirement) {
      shortageType = 'definite_shortage';
      alertMessage = `Definite Shortage Alert: Confirmed bookings commit ${committedUnitsNext7Days} units, but only ${currentAvailableUnexpiredUnits} unexpired units exist. Shortage of ${projectedShortageUnits} units will disrupt appointments.`;
    } else {
      shortageType = 'estimated_shortage';
      alertMessage = `Estimated Usage Alert: Projected appointment usage exceeds current stock by ${projectedShortageUnits} units based on standard formula averages.`;
    }
  }

  return {
    sku,
    productName,
    currentAvailableUnexpiredUnits,
    committedUnitsNext7Days,
    projectedShortageUnits,
    shortageType,
    alertMessage,
    requiresImmediateReorder,
  };
}
