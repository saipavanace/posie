/**
 * Posie Core Engine - Explainable Return Likelihood (F165)
 *
 * Implements transparent, cadence-driven client return ranking with explicit
 * visit cycle intervals, day-of-week preferences, opt-out enforcement,
 * and clear, human-understandable explanations.
 *
 * Domain Invariant (Basis: Expansion (X); DATA LEG, WB F165, Rule F165, Table 110):
 * Outreach candidates are ranked exclusively through transparent, cadence-based
 * visit patterns and stated client booking preferences. Software strictly prohibits
 * opaque black-box AI scoring, discriminatory demographic proxies, or derogatory
 * client value labels. Clients with active marketing or rebooking opt-outs are
 * strictly filtered out. Every suggestion provides an explainable reason.
 */

export interface ClientHistoricalCandidate {
  clientId: string;
  clientName: string;
  preferredPractitionerId?: string;
  preferredWeekday?: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  visitHistory: Array<{
    appointmentId: string;
    completedAt: string; // ISO 8601
    serviceName: string;
  }>;
  optedOutOfOutreach: boolean;
  notes?: string;
}

export interface ReturnOutreachCandidate {
  clientId: string;
  clientName: string;
  averageCadenceDays: number;
  daysSinceLastVisit: number;
  cadenceMultiplier: number; // e.g. 1.25x their normal cycle
  preferredWeekdayName?: string;
  likelihoodRank: number; // 1 = highest priority for outreach
  urgencyLevel: 'due_for_visit' | 'overdue_lapse_risk' | 'on_cadence';
  explainableReason: string;
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Computes individual historical visit cadence in days from completed appointments.
 */
export function computeClientVisitCadence(visitDates: string[]): {
  averageCadenceDays: number;
  visitCount: number;
  regularityScore: number;
} {
  if (visitDates.length < 2) {
    return {
      averageCadenceDays: 42, // Default 6 weeks for single-visit guests
      visitCount: visitDates.length,
      regularityScore: 0.5,
    };
  }

  // Sort chronological ascending
  const sortedDates = [...visitDates]
    .map((d) => new Date(d).getTime())
    .sort((a, b) => a - b);

  const intervals: number[] = [];
  for (let i = 1; i < sortedDates.length; i++) {
    const diffDays = (sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24);
    if (diffDays > 0) {
      intervals.push(diffDays);
    }
  }

  if (intervals.length === 0) {
    return { averageCadenceDays: 42, visitCount: visitDates.length, regularityScore: 0.5 };
  }

  const sum = intervals.reduce((acc, val) => acc + val, 0);
  const avg = Math.round((sum / intervals.length) * 10) / 10;

  // Regularity: standard deviation relative to mean
  const variance = intervals.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / intervals.length;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = avg > 0 ? stdDev / avg : 1;
  const regularityScore = Math.max(0.1, Math.min(1.0, 1 - coefficientOfVariation * 0.5));

  return {
    averageCadenceDays: avg,
    visitCount: visitDates.length,
    regularityScore: Math.round(regularityScore * 100) / 100,
  };
}

/**
 * Evaluates a list of salon clients and generates an explainable, privacy-safe return ranking.
 * Filters out clients who have opted out of outreach or have insufficient history.
 */
export function rankReturnLikelihoodCandidates(
  clients: ClientHistoricalCandidate[],
  currentDateStr?: string
): ReturnOutreachCandidate[] {
  const now = currentDateStr ? new Date(currentDateStr).getTime() : new Date().getTime();
  const candidates: Array<Omit<ReturnOutreachCandidate, 'likelihoodRank'>> = [];

  for (const client of clients) {
    // 1. Mandatory opt-out check
    if (client.optedOutOfOutreach) {
      continue;
    }

    if (!client.visitHistory || client.visitHistory.length === 0) {
      continue;
    }

    const visitTimestamps = client.visitHistory
      .map((v) => new Date(v.completedAt).getTime())
      .sort((a, b) => b - a); // Descending

    const mostRecentVisit = visitTimestamps[0];
    const daysSinceLastVisit = Math.floor((now - mostRecentVisit) / (1000 * 60 * 60 * 24));

    if (daysSinceLastVisit < 7) {
      // Too recent to suggest outreach
      continue;
    }

    const { averageCadenceDays, visitCount } = computeClientVisitCadence(
      client.visitHistory.map((v) => v.completedAt)
    );

    const cadenceMultiplier = Math.round((daysSinceLastVisit / averageCadenceDays) * 100) / 100;

    let urgencyLevel: ReturnOutreachCandidate['urgencyLevel'] = 'on_cadence';
    if (cadenceMultiplier >= 1.4) {
      urgencyLevel = 'overdue_lapse_risk';
    } else if (cadenceMultiplier >= 1.0) {
      urgencyLevel = 'due_for_visit';
    } else {
      urgencyLevel = 'on_cadence';
    }

    const preferredWeekdayName =
      client.preferredWeekday !== undefined ? WEEKDAYS[client.preferredWeekday] : undefined;

    let explainableReason = `Client averages a visit every ${averageCadenceDays} days across ${visitCount} appointment(s). Currently at ${daysSinceLastVisit} days (${cadenceMultiplier}x cadence).`;
    if (preferredWeekdayName) {
      explainableReason += ` Historical preference for ${preferredWeekdayName} bookings.`;
    }

    candidates.push({
      clientId: client.clientId,
      clientName: client.clientName,
      averageCadenceDays,
      daysSinceLastVisit,
      cadenceMultiplier,
      preferredWeekdayName,
      urgencyLevel,
      explainableReason,
    });
  }

  // Rank by urgency / cadence multiplier descending (those closest to ideal rebook or slightly overdue first)
  // Optimal candidates are those between 1.0x and 1.8x cadence (high likelihood to rebook with a nudge)
  candidates.sort((a, b) => {
    // Score based on distance from sweet spot (1.1x cadence)
    const scoreA = Math.abs(a.cadenceMultiplier - 1.15);
    const scoreB = Math.abs(b.cadenceMultiplier - 1.15);
    return scoreA - scoreB;
  });

  return candidates.map((c, index) => ({
    ...c,
    likelihoodRank: index + 1,
  }));
}
