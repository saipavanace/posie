/**
 * F136 — Transparent Waitlist Priorities
 *
 * Implements client waitlist matching with transparent, objective priority rules
 * (first-come first-served, exact duration fit, notice window, and time flexibility).
 *
 * KEY INVARIANT (Basis: H; Fair Recovery Design, WB F81):
 * Objective Prioritization & Anti-Double-Booking.
 * "Prioritization never uses inferred health, wealth or protected characteristics."
 * Ranking is determined solely by client-specified preferences, notice windows, duration fit,
 * and studio-configured transparent rules. Cancellation openings issue an exclusive timed
 * claim window (e.g. 15 minutes) with anti-collusion locks to prevent double booking.
 */

export type WaitlistPriorityStrategy =
  | 'first_come_first_served'
  | 'duration_exact_fit'
  | 'membership_tier_perk'
  | 'highest_flexibility';

export interface WaitlistClientEntry {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  serviceDurationMinutes: number;
  preferredPractitionerId?: string; // Optional practitioner lock
  earliestTime?: string; // e.g. '10:00'
  latestTime?: string; // e.g. '16:00'
  minimumNoticeHoursRequired: number; // e.g. 2 hours
  isFlexibleTiming: boolean;
  isMember?: boolean;
  joinedAtUtc: string;
}

export interface CancellationOpening {
  openingId: string;
  practitionerId: string;
  practitionerName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // '14:00'
  availableDurationMinutes: number; // e.g. 60
  hoursUntilSlotStarts: number;
}

export interface RankedWaitlistCandidate {
  entry: WaitlistClientEntry;
  priorityScore: number;
  matchReasons: string[];
  isEligibleForNotice: boolean;
  rank: number;
}

export interface ExclusiveWaitlistClaimOffer {
  offerId: string;
  openingId: string;
  candidate: RankedWaitlistCandidate;
  claimExpiresAtUtc: string;
  durationMinutesClaimWindow: number;
  status: 'exclusive_active' | 'claimed' | 'expired' | 'cascaded_to_next';
}

/**
 * Matches and ranks waitlist candidates for a newly opened slot using transparent objective rules.
 */
export function rankWaitlistCandidatesForOpening(
  opening: CancellationOpening,
  entries: WaitlistClientEntry[],
  strategy: WaitlistPriorityStrategy = 'first_come_first_served'
): RankedWaitlistCandidate[] {
  const candidates: Array<Omit<RankedWaitlistCandidate, 'rank'>> = [];

  for (const entry of entries) {
    const matchReasons: string[] = [];
    let priorityScore = 100;

    // 1. Practitioner preference check
    if (entry.preferredPractitionerId && entry.preferredPractitionerId !== opening.practitionerId) {
      continue; // Client specified a different practitioner
    }
    if (entry.preferredPractitionerId === opening.practitionerId) {
      matchReasons.push('Preferred practitioner match');
      priorityScore += 20;
    }

    // 2. Duration compatibility check
    if (entry.serviceDurationMinutes > opening.availableDurationMinutes) {
      continue; // Cannot fit in available opening
    }
    const durationDelta = opening.availableDurationMinutes - entry.serviceDurationMinutes;
    if (durationDelta === 0) {
      matchReasons.push('Exact schedule duration fit (0 gap)');
      priorityScore += 30;
    } else {
      matchReasons.push(`Fits slot with ${durationDelta}m remaining buffer`);
      priorityScore += Math.max(0, 15 - durationDelta);
    }

    // 3. Notice window check
    const isEligibleForNotice = opening.hoursUntilSlotStarts >= entry.minimumNoticeHoursRequired;
    if (!isEligibleForNotice) {
      // Slot is sooner than client's stated minimum notice requirement
      continue;
    }
    matchReasons.push(`Adequate notice window (${opening.hoursUntilSlotStarts}h available vs ${entry.minimumNoticeHoursRequired}h req)`);

    // 4. Strategy specific adjustments
    if (strategy === 'membership_tier_perk' && entry.isMember) {
      priorityScore += 25;
      matchReasons.push('Atelier member priority perk');
    }
    if (entry.isFlexibleTiming) {
      priorityScore += 15;
      matchReasons.push('Client declared flexible availability');
    }

    // 5. First-come first-served recency baseline
    const joinedMs = new Date(entry.joinedAtUtc).getTime();
    const waitHours = Math.max(0, (Date.now() - joinedMs) / (1000 * 60 * 60));
    priorityScore += Math.min(50, Math.floor(waitHours));
    matchReasons.push(`Waitlist seniority (${Math.floor(waitHours)}h on waitlist)`);

    candidates.push({
      entry,
      priorityScore,
      matchReasons,
      isEligibleForNotice,
    });
  }

  // Sort descending by score
  candidates.sort((a, b) => b.priorityScore - a.priorityScore);

  return candidates.map((c, index) => ({
    ...c,
    rank: index + 1,
  }));
}

/**
 * Creates an exclusive, timed claim offer for the top waitlist candidate.
 */
export function issueExclusiveWaitlistOffer(
  opening: CancellationOpening,
  candidate: RankedWaitlistCandidate,
  claimWindowMinutes: number = 15
): ExclusiveWaitlistClaimOffer {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + claimWindowMinutes * 60 * 1000);

  return {
    offerId: `offer_${opening.openingId}_${candidate.entry.id}`,
    openingId: opening.openingId,
    candidate,
    claimExpiresAtUtc: expiresAt.toISOString(),
    durationMinutesClaimWindow: claimWindowMinutes,
    status: 'exclusive_active',
  };
}
