/**
 * F192: Lost Demand Ledger & Turn-Aways
 *
 * Captures unsuccessful online availability searches and manual front-desk turn-aways with requested service,
 * time window, and client follow-up permissions.
 * Invariant: Reports strictly separate verified observed requests from speculative inferred lost revenue,
 * and deduplicates demand across identical clients and dates.
 */

export type LostDemandSource = 'online_search_no_slots' | 'phone_inquiry_turnaway' | 'walk_in_turnaway';

export interface LostDemandEntry {
  entryId: string;
  salonId: string;
  source: LostDemandSource;
  requestedServiceId: string;
  requestedServiceName: string;
  catalogPriceUsd: number;
  requestedDate: string; // YYYY-MM-DD
  requestedTimeWindow: 'morning' | 'afternoon' | 'evening' | 'exact_slot';
  specificTimeRequested?: string; // HH:MM
  clientIdentifier: string; // phone or client ID or 'anonymous_web_session'
  permissionToFollowUp: boolean;
  loggedAt: string;
  notes?: string;
}

export interface LostDemandSummaryReport {
  salonId: string;
  reportingPeriodStart: string;
  reportingPeriodEnd: string;
  totalTurnAwaysLogged: number;
  deduplicatedUniqueClientsCount: number;
  observedTurnAwayValueUsd: number;
  mostRequestedUnmetServices: Array<{
    serviceId: string;
    serviceName: string;
    unmetRequestsCount: number;
    unmetTotalValueUsd: number;
  }>;
  peakUnmetDaysOfWeek: Array<{
    dayOfWeek: string;
    unmetRequestsCount: number;
  }>;
  followUpPermittedCount: number;
}

/**
 * Logs a turn-away or failed availability search into the lost demand ledger.
 */
export function recordLostDemandEntry(entry: Omit<LostDemandEntry, 'entryId' | 'loggedAt'>): LostDemandEntry {
  const entryId = `ld_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  return {
    ...entry,
    entryId,
    loggedAt: new Date().toISOString(),
  };
}

/**
 * Compiles a lost demand summary report for a given reporting interval.
 * Invariant: Deduplicates multiple failed searches by the same client on the same day for the same service
 * to prevent inflating observed lost demand.
 */
export function generateLostDemandReport(
  salonId: string,
  entries: LostDemandEntry[],
  periodStart: string,
  periodEnd: string
): LostDemandSummaryReport {
  // Filter for date range and matching salon
  const filtered = entries.filter(
    (e) => e.salonId === salonId && e.requestedDate >= periodStart && e.requestedDate <= periodEnd
  );

  // Deduplicate entries: same client, same date, same service counts as 1 unique unmet demand event
  const deduplicationMap = new Map<string, LostDemandEntry>();
  for (const entry of filtered) {
    const key = `${entry.clientIdentifier}_${entry.requestedDate}_${entry.requestedServiceId}`;
    if (!deduplicationMap.has(key)) {
      deduplicationMap.set(key, entry);
    }
  }

  const deduplicatedEntries = Array.from(deduplicationMap.values());
  const uniqueClients = new Set(deduplicatedEntries.map((e) => e.clientIdentifier));

  // Tally by service
  const serviceTally = new Map<string, { serviceName: string; count: number; value: number }>();
  for (const entry of deduplicatedEntries) {
    const current = serviceTally.get(entry.requestedServiceId) || {
      serviceName: entry.requestedServiceName,
      count: 0,
      value: 0,
    };
    current.count += 1;
    current.value += entry.catalogPriceUsd;
    serviceTally.set(entry.requestedServiceId, current);
  }

  const mostRequestedUnmetServices = Array.from(serviceTally.entries())
    .map(([serviceId, data]) => ({
      serviceId,
      serviceName: data.serviceName,
      unmetRequestsCount: data.count,
      unmetTotalValueUsd: Math.round(data.value * 100) / 100,
    }))
    .sort((a, b) => b.unmetRequestsCount - a.unmetRequestsCount);

  // Tally by day of week
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayCounts: Record<string, number> = {};
  for (const entry of deduplicatedEntries) {
    const day = dayNames[new Date(entry.requestedDate + 'T12:00:00Z').getUTCDay()];
    dayCounts[day] = (dayCounts[day] || 0) + 1;
  }

  const peakUnmetDaysOfWeek = Object.entries(dayCounts)
    .map(([dayOfWeek, unmetRequestsCount]) => ({ dayOfWeek, unmetRequestsCount }))
    .sort((a, b) => b.unmetRequestsCount - a.unmetRequestsCount);

  const observedTurnAwayValueUsd = deduplicatedEntries.reduce((sum, e) => sum + e.catalogPriceUsd, 0);
  const followUpPermittedCount = deduplicatedEntries.filter((e) => e.permissionToFollowUp).length;

  return {
    salonId,
    reportingPeriodStart: periodStart,
    reportingPeriodEnd: periodEnd,
    totalTurnAwaysLogged: filtered.length,
    deduplicatedUniqueClientsCount: uniqueClients.size,
    observedTurnAwayValueUsd: Math.round(observedTurnAwayValueUsd * 100) / 100,
    mostRequestedUnmetServices,
    peakUnmetDaysOfWeek,
    followUpPermittedCount,
  };
}
