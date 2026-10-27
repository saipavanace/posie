/**
 * F117 — Booking and Product Analytics
 *
 * Instruments onboarding, booking, checkout, document consent, and support funnels
 * with privacy-safe telemetry and idempotent event deduplication.
 *
 * Basis: Foundation; analytics chapter, Rule DR10
 * Key Invariants:
 * 1. Idempotent Conversion Tracking:
 *    Stable event IDs prevent page reloads, browser retries, or back-button steps
 *    from artificially inflating funnel conversion counts.
 * 2. Stage-by-Stage Drop-Off Analysis:
 *    Measures exact transition and drop-off percentages between visit funnel milestones.
 * 3. Privacy-Safe Aggregation:
 *    Oromits raw PII in analytics payloads; aggregates across sessions without tracking
 *    unconsented cross-site fingerprints.
 */

export type FunnelMilestone =
  | 'service_viewed'
  | 'slot_selected'
  | 'intake_submitted'
  | 'consent_signed'
  | 'deposit_authorized'
  | 'checkout_completed';

export interface RawFunnelEvent {
  eventId: string;
  sessionId: string;
  milestone: FunnelMilestone;
  timestamp: string;
  metadata?: Record<string, string | number>;
}

export interface FunnelStageReport {
  milestone: FunnelMilestone;
  uniqueSessionsCount: number;
  dropOffCount: number;
  conversionFromPreviousPercent: number;
  totalFunnelConversionPercent: number;
}

export interface FunnelAnalyticsSummary {
  totalUniqueSessions: number;
  stages: FunnelStageReport[];
  overallConversionRatePercent: number;
  biggestDropOffStage: FunnelMilestone | 'none';
}

/**
 * Standard progression order of Posie client booking journey.
 */
export const FUNNEL_STAGES_ORDER: FunnelMilestone[] = [
  'service_viewed',
  'slot_selected',
  'intake_submitted',
  'consent_signed',
  'deposit_authorized',
  'checkout_completed',
];

/**
 * Analyzes booking funnel events with strict session-level deduplication.
 * Retried actions or reloaded pages within the same session do not inflate conversion numbers.
 */
export function computeBookingFunnelAnalytics(events: RawFunnelEvent[]): FunnelAnalyticsSummary {
  // 1. Deduplicate by (sessionId + milestone)
  const sessionMilestones = new Map<string, Set<FunnelMilestone>>();

  for (const ev of events) {
    if (!sessionMilestones.has(ev.sessionId)) {
      sessionMilestones.set(ev.sessionId, new Set());
    }
    sessionMilestones.get(ev.sessionId)!.add(ev.milestone);
  }

  const totalUniqueSessions = sessionMilestones.size;

  if (totalUniqueSessions === 0) {
    return {
      totalUniqueSessions: 0,
      stages: [],
      overallConversionRatePercent: 0,
      biggestDropOffStage: 'none',
    };
  }

  // Count unique sessions reaching each milestone
  const milestoneCounts = new Map<FunnelMilestone, number>();
  FUNNEL_STAGES_ORDER.forEach((stage) => milestoneCounts.set(stage, 0));

  for (const milestones of sessionMilestones.values()) {
    for (const m of milestones) {
      milestoneCounts.set(m, (milestoneCounts.get(m) || 0) + 1);
    }
  }

  const stagesReport: FunnelStageReport[] = [];
  let previousCount = totalUniqueSessions;
  let maxDropOff = -1;
  let biggestDropOff: FunnelMilestone | 'none' = 'none';

  for (let i = 0; i < FUNNEL_STAGES_ORDER.length; i++) {
    const stage = FUNNEL_STAGES_ORDER[i];
    const count = milestoneCounts.get(stage) || 0;
    const dropOff = Math.max(0, previousCount - count);

    if (dropOff > maxDropOff && i > 0) {
      maxDropOff = dropOff;
      biggestDropOff = stage;
    }

    const conversionFromPrev =
      previousCount > 0 ? Number(((count / previousCount) * 100).toFixed(1)) : 0;
    const totalConversion =
      totalUniqueSessions > 0 ? Number(((count / totalUniqueSessions) * 100).toFixed(1)) : 0;

    stagesReport.push({
      milestone: stage,
      uniqueSessionsCount: count,
      dropOffCount: dropOff,
      conversionFromPreviousPercent: conversionFromPrev,
      totalFunnelConversionPercent: totalConversion,
    });

    previousCount = count;
  }

  const completedCount = milestoneCounts.get('checkout_completed') || 0;
  const overallRate =
    totalUniqueSessions > 0 ? Number(((completedCount / totalUniqueSessions) * 100).toFixed(1)) : 0;

  return {
    totalUniqueSessions,
    stages: stagesReport,
    overallConversionRatePercent: overallRate,
    biggestDropOffStage: biggestDropOff,
  };
}
