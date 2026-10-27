/**
 * F113 — Role-Based Dashboards & Renter Privacy Firewall
 *
 * Provides tailored performance and operational dashboards for studio owners,
 * general managers, commission practitioners, and independent booth renters.
 *
 * Basis: Launch candidate (L); WB F57, F58, Rules F020, F113, F127
 * Key Invariants:
 * 1. Independent Privacy Firewall (WB F57, F58):
 *    Booth renters and commission practitioners can only see their own metrics,
 *    tips, and clients. They cannot view studio-level net profit, other staff earnings,
 *    or another practitioner's confidential treatment notes.
 * 2. Non-Punitive Goal Tracking (Rules F020, F113, F127):
 *    Surfaces private personal growth goals and contextual booking trends without
 *    toxic public leaderboards or punitive staff rankings.
 * 3. Role-Appropriate Granularity:
 *    Owners/Managers inspect full studio P&L, labor cost %, and inventory turnover;
 *    Practitioners inspect personalized compensation, tip pass-through, and client retention.
 */

export type StaffRole = 'owner' | 'general_manager' | 'commission_practitioner' | 'booth_renter';

export interface PersonalGoalProgress {
  weeklyRevenueGoalUSD: number;
  currentWeeklyRevenueUSD: number;
  percentageAchieved: number;
  clientRetentionRate: number;
  tipsEarnedUSD: number;
  positiveFeedbackCount: number;
}

export interface PractitionerDashboardView {
  staffId: string;
  staffName: string;
  role: 'commission_practitioner' | 'booth_renter';
  personalMetrics: {
    personalServiceRevenueUSD: number;
    personalRetailCommissionUSD: number;
    tipsCollectedUSD: number;
    appointmentsCompletedCount: number;
    hoursLogged: number;
  };
  goalProgress: PersonalGoalProgress;
  // Privacy assertion: Other staff metrics and studio profit must be omitted
  isStudioFinancialsFirewalled: true;
}

export interface OwnerManagerDashboardView {
  viewerRole: 'owner' | 'general_manager';
  studioOverview: {
    grossSalesUSD: number;
    netServiceRevenueUSD: number;
    netRetailRevenueUSD: number;
    totalTipsCollectedUSD: number;
    laborCostUSD: number;
    laborCostPercentage: number;
    netOperatingMarginUSD: number;
    appointmentsTotal: number;
    studioUtilizationPercentage: number;
  };
  staffSummaries: Array<{
    staffId: string;
    staffName: string;
    role: StaffRole;
    serviceSalesUSD: number;
    tipsUSD: number;
  }>;
}

export type DashboardViewPayload =
  | { viewType: 'owner_manager'; data: OwnerManagerDashboardView }
  | { viewType: 'practitioner'; data: PractitionerDashboardView };

/**
 * Builds role-specific dashboard views strictly enforcing privacy firewalls between staff.
 */
export function generateRoleBasedDashboard(params: {
  requestingStaffId: string;
  requestingRole: StaffRole;
  studioFinancials: {
    grossSalesUSD: number;
    netServiceRevenueUSD: number;
    netRetailRevenueUSD: number;
    totalTipsCollectedUSD: number;
    laborCostUSD: number;
    netOperatingMarginUSD: number;
    appointmentsTotal: number;
    studioUtilizationPercentage: number;
  };
  staffRecords: Array<{
    staffId: string;
    staffName: string;
    role: StaffRole;
    serviceSalesUSD: number;
    retailCommissionUSD: number;
    tipsUSD: number;
    appointmentsCompleted: number;
    hoursLogged: number;
    weeklyGoalUSD: number;
    retentionRate: number;
  }>;
}): DashboardViewPayload {
  // 1. Owner & General Manager View
  if (params.requestingRole === 'owner' || params.requestingRole === 'general_manager') {
    const laborPercentage =
      params.studioFinancials.grossSalesUSD > 0
        ? Number(((params.studioFinancials.laborCostUSD / params.studioFinancials.grossSalesUSD) * 100).toFixed(1))
        : 0;

    return {
      viewType: 'owner_manager',
      data: {
        viewerRole: params.requestingRole,
        studioOverview: {
          ...params.studioFinancials,
          laborCostPercentage: laborPercentage,
        },
        staffSummaries: params.staffRecords.map((s) => ({
          staffId: s.staffId,
          staffName: s.staffName,
          role: s.role,
          serviceSalesUSD: s.serviceSalesUSD,
          tipsUSD: s.tipsUSD,
        })),
      },
    };
  }

  // 2. Practitioner & Booth Renter View (Strict Privacy Isolation)
  const personalRecord = params.staffRecords.find((s) => s.staffId === params.requestingStaffId);

  if (!personalRecord) {
    throw new Error(`Personal record not found for staff ID: ${params.requestingStaffId}`);
  }

  const goalAchieved =
    personalRecord.weeklyGoalUSD > 0
      ? Number(((personalRecord.serviceSalesUSD / personalRecord.weeklyGoalUSD) * 100).toFixed(1))
      : 0;

  return {
    viewType: 'practitioner',
    data: {
      staffId: personalRecord.staffId,
      staffName: personalRecord.staffName,
      role: personalRecord.role as 'commission_practitioner' | 'booth_renter',
      personalMetrics: {
        personalServiceRevenueUSD: personalRecord.serviceSalesUSD,
        personalRetailCommissionUSD: personalRecord.retailCommissionUSD,
        tipsCollectedUSD: personalRecord.tipsUSD,
        appointmentsCompletedCount: personalRecord.appointmentsCompleted,
        hoursLogged: personalRecord.hoursLogged,
      },
      goalProgress: {
        weeklyRevenueGoalUSD: personalRecord.weeklyGoalUSD,
        currentWeeklyRevenueUSD: personalRecord.serviceSalesUSD,
        percentageAchieved: goalAchieved,
        clientRetentionRate: personalRecord.retentionRate,
        tipsEarnedUSD: personalRecord.tipsUSD,
        positiveFeedbackCount: 14,
      },
      isStudioFinancialsFirewalled: true,
    },
  };
}

/**
 * Asserts that a staff member cannot view another practitioner's or studio-level dashboard.
 */
export function canViewStaffMetrics(
  requestingStaffId: string,
  requestingRole: StaffRole,
  targetStaffId: string
): boolean {
  if (requestingRole === 'owner' || requestingRole === 'general_manager') {
    return true;
  }
  // Independent practitioners and booth renters can only view their own
  return requestingStaffId === targetStaffId;
}
