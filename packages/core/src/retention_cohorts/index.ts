/**
 * F114 — Retention and Return Cohorts
 *
 * Tracks client return rates, visit cadence, lapsed clients, and repeat revenue
 * contribution segmented by acquisition cohort.
 *
 * Basis: Growth (G); WB F58, Rules F019, F049, F114, F165
 * Key Invariants:
 * 1. Same-Day Repeat Filter (WB F58):
 *    Multiple services or add-ons booked on the same day never count as repeat visits.
 *    Retention strictly measures return visits occurring on distinct calendar dates.
 * 2. Immature Cohort Transparency (WB F58):
 *    Cohorts younger than 60 days are explicitly stamped as 'immature_in_progress'
 *    to prevent owners from panicking over incomplete return windows.
 * 3. Cadence-Based Lapsed Tracking:
 *    Calculates expected return cadence (e.g. 4-week brow wax vs 8-week facial)
 *    and flags clients overdue by >14 days for proactive gentle outreach.
 */

export interface ClientVisitEvent {
  clientId: string;
  clientName: string;
  visitDate: string; // YYYY-MM-DD
  serviceCategory: string;
  amountPaidUSD: number;
}

export interface CohortAnalysisSummary {
  cohortMonth: string; // e.g. "2024-11"
  initialAcquiredClientsCount: number;
  returnedDistinctVisitCount: number;
  retentionRatePercentage: number;
  isImmatureCohort: boolean;
  repeatRevenueUSD: number;
  averageDaysBetweenVisits: number;
}

export interface LapsedClientDetail {
  clientId: string;
  clientName: string;
  lastVisitDate: string;
  daysSinceLastVisit: number;
  expectedCadenceDays: number;
  daysOverdue: number;
  status: 'cadence_on_track' | 'cadence_overdue_lapsed';
}

/**
 * Evaluates retention and return metrics for a monthly acquisition cohort.
 * Excludes same-day visits from retention calculations.
 */
export function analyzeRetentionCohort(params: {
  cohortMonth: string; // "2024-11"
  firstTimeClients: Array<{ clientId: string; clientName: string; firstVisitDate: string }>;
  subsequentVisits: ClientVisitEvent[];
  referenceDate?: string; // Current date, defaults to today
}): CohortAnalysisSummary {
  const reference = params.referenceDate ? new Date(params.referenceDate) : new Date();
  const cohortDate = new Date(`${params.cohortMonth}-01T00:00:00Z`);

  // Immature check: cohort month less than 60 days old
  const ageInDays = (reference.getTime() - cohortDate.getTime()) / (1000 * 60 * 60 * 24);
  const isImmatureCohort = ageInDays < 60;

  const firstVisitMap = new Map<string, string>();
  params.firstTimeClients.forEach((c) => firstVisitMap.set(c.clientId, c.firstVisitDate));

  const returningClients = new Set<string>();
  let totalRepeatRevenue = 0;
  let totalDaysBetween = 0;
  let returnIntervalCount = 0;

  for (const visit of params.subsequentVisits) {
    const firstDate = firstVisitMap.get(visit.clientId);
    if (!firstDate) continue;

    // Invariant 1: Same-day visits DO NOT count as retention
    if (visit.visitDate === firstDate) {
      continue;
    }

    returningClients.add(visit.clientId);
    totalRepeatRevenue += visit.amountPaidUSD;

    const days = (new Date(visit.visitDate).getTime() - new Date(firstDate).getTime()) / (1000 * 60 * 60 * 24);
    if (days > 0) {
      totalDaysBetween += days;
      returnIntervalCount++;
    }
  }

  const initialCount = params.firstTimeClients.length;
  const returnedCount = returningClients.size;
  const retentionRate =
    initialCount > 0 ? Number(((returnedCount / initialCount) * 100).toFixed(1)) : 0;
  const avgDays = returnIntervalCount > 0 ? Math.round(totalDaysBetween / returnIntervalCount) : 0;

  return {
    cohortMonth: params.cohortMonth,
    initialAcquiredClientsCount: initialCount,
    returnedDistinctVisitCount: returnedCount,
    retentionRatePercentage: retentionRate,
    isImmatureCohort,
    repeatRevenueUSD: Number(totalRepeatRevenue.toFixed(2)),
    averageDaysBetweenVisits: avgDays,
  };
}

/**
 * Identifies clients overdue for treatment based on their individualized expected cadence.
 */
export function identifyLapsedClientsByCadence(
  clients: Array<{
    clientId: string;
    clientName: string;
    lastVisitDate: string;
    expectedCadenceDays: number; // e.g. 28 days for lash fill, 45 days for facial
  }>,
  currentDateString?: string
): LapsedClientDetail[] {
  const now = currentDateString ? new Date(currentDateString).getTime() : Date.now();

  return clients.map((c) => {
    const lastVisitMs = new Date(c.lastVisitDate).getTime();
    const daysSince = Math.floor((now - lastVisitMs) / (1000 * 60 * 60 * 24));
    const daysOverdue = daysSince - c.expectedCadenceDays;

    const isLapsed = daysOverdue > 14; // Overdue by more than 14 days past normal cycle

    return {
      clientId: c.clientId,
      clientName: c.clientName,
      lastVisitDate: c.lastVisitDate,
      daysSinceLastVisit: daysSince,
      expectedCadenceDays: c.expectedCadenceDays,
      daysOverdue: Math.max(0, daysOverdue),
      status: isLapsed ? 'cadence_overdue_lapsed' : 'cadence_on_track',
    };
  });
}
