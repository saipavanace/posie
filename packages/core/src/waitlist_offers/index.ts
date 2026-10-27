import { z } from 'zod';

export const TimeOfDayPreferenceSchema = z.enum(['morning', 'afternoon', 'evening']);
export type TimeOfDayPreference = z.infer<typeof TimeOfDayPreferenceSchema>;

export const WaitlistEntrySchema = z.object({
  entryId: z.string(),
  tenantId: z.string(),
  clientId: z.string(),
  clientName: z.string(),
  clientPhone: z.string(),
  clientEmail: z.string().email(),
  serviceId: z.string(),
  serviceName: z.string(),
  practitionerId: z.string().optional(), // optional = any practitioner
  preferredDaysOfWeek: z.array(z.string()).default([]), // ['monday', 'friday', etc.]
  preferredTimeOfDay: z.array(TimeOfDayPreferenceSchema).default(['morning', 'afternoon', 'evening']),
  status: z.enum(['active', 'offered', 'claimed', 'expired', 'removed']).default('active'),
  createdAt: z.string().datetime(),
});
export type WaitlistEntry = z.infer<typeof WaitlistEntrySchema>;

export const TimedWaitlistOfferSchema = z.object({
  offerId: z.string(),
  tenantId: z.string(),
  entryId: z.string(),
  clientId: z.string(),
  clientName: z.string(),
  clientPhone: z.string(),
  serviceId: z.string(),
  serviceName: z.string(),
  practitionerId: z.string(),
  practitionerName: z.string(),
  slotStartTime: z.string().datetime(),
  slotEndTime: z.string().datetime(),
  claimToken: z.string(),
  claimDeadline: z.string().datetime(),
  status: z.enum(['pending_claim', 'claimed', 'expired', 'passed_to_next']).default('pending_claim'),
  dispatchedAt: z.string().datetime(),
  claimedAt: z.string().datetime().optional(),
});
export type TimedWaitlistOffer = z.infer<typeof TimedWaitlistOfferSchema>;

/**
 * Evaluates whether an open time slot matches a waitlist entry's day and time-of-day preferences.
 */
export function doesSlotMatchPreferences(
  slotStartTime: string,
  entry: WaitlistEntry
): boolean {
  const slotDate = new Date(slotStartTime);
  const dayName = slotDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  // If specific days are preferred, check day match
  if (entry.preferredDaysOfWeek.length > 0) {
    const dayMatches = entry.preferredDaysOfWeek.map((d) => d.toLowerCase()).includes(dayName);
    if (!dayMatches) return false;
  }

  // Check time-of-day preference
  const hour = slotDate.getUTCHours(); // Simplified UTC hours or local
  let slotTimeOfDay: TimeOfDayPreference = 'afternoon';
  if (hour < 12) slotTimeOfDay = 'morning';
  else if (hour >= 17) slotTimeOfDay = 'evening';

  if (!entry.preferredTimeOfDay.includes(slotTimeOfDay)) {
    return false;
  }

  return true;
}

/**
 * Finds and sorts matching waitlist entries for a newly opened calendar slot.
 * Matches serviceId, practitionerId (or any practitioner), and day/time preferences.
 * Sorts by waitlist seniority (oldest first).
 */
export function findMatchingWaitlistCandidates(params: {
  tenantId: string;
  serviceId: string;
  practitionerId: string;
  slotStartTime: string;
  waitlist: WaitlistEntry[];
}): WaitlistEntry[] {
  return params.waitlist
    .filter((entry) => {
      if (entry.tenantId !== params.tenantId || entry.status !== 'active') return false;
      if (entry.serviceId !== params.serviceId) return false;
      if (entry.practitionerId && entry.practitionerId !== params.practitionerId) return false;
      return doesSlotMatchPreferences(params.slotStartTime, entry);
    })
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

/**
 * Dispatches a timed, expiring waitlist offer to the top eligible candidate.
 * Invariant: Offer holds exclusive right to claim within window (e.g. 15 minutes TTL).
 */
export function dispatchTimedWaitlistOffer(params: {
  tenantId: string;
  candidate: WaitlistEntry;
  serviceName: string;
  practitionerId: string;
  practitionerName: string;
  slotStartTime: string;
  durationMinutes: number;
  claimWindowMinutes?: number;
  currentTime?: string;
}): { offer: TimedWaitlistOffer; updatedWaitlistEntry: WaitlistEntry } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const slotStart = new Date(params.slotStartTime);
  const slotEnd = new Date(slotStart.getTime() + params.durationMinutes * 60 * 1000);
  const claimWindowMinutes = params.claimWindowMinutes ?? 15;
  const claimDeadline = new Date(now.getTime() + claimWindowMinutes * 60 * 1000);

  const offer: TimedWaitlistOffer = {
    offerId: `wlo_${Math.random().toString(36).substring(2, 9)}`,
    tenantId: params.tenantId,
    entryId: params.candidate.entryId,
    clientId: params.candidate.clientId,
    clientName: params.candidate.clientName,
    clientPhone: params.candidate.clientPhone,
    serviceId: params.candidate.serviceId,
    serviceName: params.serviceName,
    practitionerId: params.practitionerId,
    practitionerName: params.practitionerName,
    slotStartTime: slotStart.toISOString(),
    slotEndTime: slotEnd.toISOString(),
    claimToken: `clm_${Math.random().toString(36).substring(2, 14)}`,
    claimDeadline: claimDeadline.toISOString(),
    status: 'pending_claim',
    dispatchedAt: now.toISOString(),
  };

  const updatedWaitlistEntry: WaitlistEntry = {
    ...params.candidate,
    status: 'offered',
  };

  return { offer, updatedWaitlistEntry };
}

/**
 * Atomically claims a timed waitlist offer.
 * Invariant: "A successful claim stops later offers; message delivery failure advances safely."
 */
export function claimWaitlistOffer(params: {
  offer: TimedWaitlistOffer;
  claimToken: string;
  currentTime?: string;
}): { success: true; claimedOffer: TimedWaitlistOffer } | { success: false; reason: string } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  if (params.offer.status !== 'pending_claim') {
    return {
      success: false,
      reason: `Offer is no longer available (current status: ${params.offer.status}).`,
    };
  }

  if (params.offer.claimToken !== params.claimToken) {
    return {
      success: false,
      reason: 'Invalid claim token for this waitlist offer.',
    };
  }

  if (new Date(params.offer.claimDeadline).getTime() <= now.getTime()) {
    return {
      success: false,
      reason: 'Offer claim window has expired. The slot has been released to the next client.',
    };
  }

  const claimedOffer: TimedWaitlistOffer = {
    ...params.offer,
    status: 'claimed',
    claimedAt: now.toISOString(),
  };

  return {
    success: true,
    claimedOffer,
  };
}

/**
 * Advances an expired offer to the next queued candidate in line.
 */
export function advanceExpiredOffer(params: {
  expiredOffer: TimedWaitlistOffer;
  remainingCandidates: WaitlistEntry[];
  serviceName: string;
  practitionerName: string;
  durationMinutes: number;
  claimWindowMinutes?: number;
  currentTime?: string;
}): {
  expiredOffer: TimedWaitlistOffer;
  nextOffer?: TimedWaitlistOffer;
  updatedNextEntry?: WaitlistEntry;
} {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  const markedExpiredOffer: TimedWaitlistOffer = {
    ...params.expiredOffer,
    status: 'passed_to_next',
  };

  if (params.remainingCandidates.length === 0) {
    return { expiredOffer: markedExpiredOffer };
  }

  const nextCandidate = params.remainingCandidates[0];
  const { offer: nextOffer, updatedWaitlistEntry: updatedNextEntry } = dispatchTimedWaitlistOffer({
    tenantId: params.expiredOffer.tenantId,
    candidate: nextCandidate,
    serviceName: params.serviceName,
    practitionerId: params.expiredOffer.practitionerId,
    practitionerName: params.practitionerName,
    slotStartTime: params.expiredOffer.slotStartTime,
    durationMinutes: params.durationMinutes,
    claimWindowMinutes: params.claimWindowMinutes,
    currentTime: now.toISOString(),
  });

  return {
    expiredOffer: markedExpiredOffer,
    nextOffer,
    updatedNextEntry,
  };
}
