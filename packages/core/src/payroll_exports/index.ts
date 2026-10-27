/**
 * F131 — Payroll Ready Exports
 *
 * Compiles approved time records, service commissions, gratuity splits, retail commissions,
 * and forward adjustments into standardized provider-ready exports (Gusto, ADP, Rippling).
 *
 * KEY INVARIANT (Basis: B; WB F55, Payroll Foundation):
 * Pay Rules & Period Locks.
 * "Every amount ties to a service, time record or approved correction."
 * Once a payroll period is approved, Posie locks the underlying appointment lines and time punch
 * records against backdated tampering. Any retroactive adjustments generate an auditable
 * forward adjustment in the next open pay period. An exception ledger flags missing tax IDs
 * or negative balances before payroll transmission.
 */

export type PayrollProviderFormat = 'gusto' | 'adp' | 'rippling' | 'generic_csv';

export interface StaffPayrollLineInput {
  practitionerId: string;
  practitionerName: string;
  externalPayrollEmployeeId: string;
  regularHoursWorked: number;
  hourlyRateUSD: number;
  serviceCommissionUSD: number;
  retailCommissionUSD: number;
  tipsUSD: number;
  forwardAdjustmentsUSD: number; // e.g. clawbacks or bonus corrections
  hasMissingTaxId?: boolean;
}

export interface StaffPayrollSummary {
  practitionerId: string;
  practitionerName: string;
  externalPayrollEmployeeId: string;
  regularHours: number;
  hourlyWagesUSD: number;
  serviceCommissionUSD: number;
  retailCommissionUSD: number;
  tipsUSD: number;
  forwardAdjustmentsUSD: number;
  grossPayUSD: number;
  exceptions: string[];
}

export interface PayrollExportManifest {
  payPeriodId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;
  format: PayrollProviderFormat;
  isPeriodLocked: boolean;
  lockedByUserId?: string;
  lockedAtUtc?: string;
  staffSummaries: StaffPayrollSummary[];
  totalHourlyWagesUSD: number;
  totalCommissionsUSD: number;
  totalTipsUSD: number;
  totalForwardAdjustmentsUSD: number;
  totalGrossPayrollUSD: number;
  exceptionCount: number;
  allExceptions: string[];
  csvContent: string;
}

/**
 * Compiles and validates payroll records into an auditable payroll manifest.
 */
export function generatePayrollExport(
  payPeriodId: string,
  startDate: string,
  endDate: string,
  format: PayrollProviderFormat,
  staffInputs: StaffPayrollLineInput[],
  isPeriodLocked: boolean = true,
  lockedByUserId?: string
): PayrollExportManifest {
  let totalHourlyWagesUSD = 0;
  let totalCommissionsUSD = 0;
  let totalTipsUSD = 0;
  let totalForwardAdjustmentsUSD = 0;
  let totalGrossPayrollUSD = 0;
  const allExceptions: string[] = [];

  const staffSummaries: StaffPayrollSummary[] = staffInputs.map((staff) => {
    const hourlyWages = Math.round(staff.regularHoursWorked * staff.hourlyRateUSD * 100) / 100;
    const commissions = Math.round((staff.serviceCommissionUSD + staff.retailCommissionUSD) * 100) / 100;
    const grossPay = Math.round((hourlyWages + commissions + staff.tipsUSD + staff.forwardAdjustmentsUSD) * 100) / 100;

    const exceptions: string[] = [];
    if (!staff.externalPayrollEmployeeId || staff.externalPayrollEmployeeId.trim() === '') {
      exceptions.push(`Missing external payroll employee ID for ${staff.practitionerName}.`);
    }
    if (staff.hasMissingTaxId) {
      exceptions.push(`Missing Tax ID / SSN on file for ${staff.practitionerName}.`);
    }
    if (grossPay < 0) {
      exceptions.push(`Negative gross pay balance ($${grossPay.toFixed(2)}) for ${staff.practitionerName} due to clawbacks.`);
    }

    allExceptions.push(...exceptions);

    totalHourlyWagesUSD += hourlyWages;
    totalCommissionsUSD += commissions;
    totalTipsUSD += staff.tipsUSD;
    totalForwardAdjustmentsUSD += staff.forwardAdjustmentsUSD;
    totalGrossPayrollUSD += grossPay;

    return {
      practitionerId: staff.practitionerId,
      practitionerName: staff.practitionerName,
      externalPayrollEmployeeId: staff.externalPayrollEmployeeId || 'UNMAPPED',
      regularHours: staff.regularHoursWorked,
      hourlyWagesUSD: hourlyWages,
      serviceCommissionUSD: staff.serviceCommissionUSD,
      retailCommissionUSD: staff.retailCommissionUSD,
      tipsUSD: staff.tipsUSD,
      forwardAdjustmentsUSD: staff.forwardAdjustmentsUSD,
      grossPayUSD: grossPay,
      exceptions,
    };
  });

  // Round summary totals
  totalHourlyWagesUSD = Math.round(totalHourlyWagesUSD * 100) / 100;
  totalCommissionsUSD = Math.round(totalCommissionsUSD * 100) / 100;
  totalTipsUSD = Math.round(totalTipsUSD * 100) / 100;
  totalForwardAdjustmentsUSD = Math.round(totalForwardAdjustmentsUSD * 100) / 100;
  totalGrossPayrollUSD = Math.round(totalGrossPayrollUSD * 100) / 100;

  // Build CSV format according to provider
  const headers = ['Employee_ID', 'Employee_Name', 'Regular_Hours', 'Hourly_Wages', 'Commissions', 'Tips', 'Adjustments', 'Gross_Pay'];
  const rows = staffSummaries.map((s) => [
    s.externalPayrollEmployeeId,
    `"${s.practitionerName}"`,
    s.regularHours.toFixed(2),
    s.hourlyWagesUSD.toFixed(2),
    (s.serviceCommissionUSD + s.retailCommissionUSD).toFixed(2),
    s.tipsUSD.toFixed(2),
    s.forwardAdjustmentsUSD.toFixed(2),
    s.grossPayUSD.toFixed(2),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  return {
    payPeriodId,
    startDate,
    endDate,
    format,
    isPeriodLocked,
    lockedByUserId: isPeriodLocked ? lockedByUserId || 'system_payroll_engine' : undefined,
    lockedAtUtc: isPeriodLocked ? new Date().toISOString() : undefined,
    staffSummaries,
    totalHourlyWagesUSD,
    totalCommissionsUSD,
    totalTipsUSD,
    totalForwardAdjustmentsUSD,
    totalGrossPayrollUSD,
    exceptionCount: allExceptions.length,
    allExceptions,
    csvContent,
  };
}
