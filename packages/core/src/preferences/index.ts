import { z } from 'zod';

export const ClientServicePreferencesSchema = z.object({
  clientId: z.string().uuid(),
  preferredName: z.string().min(1, 'Preferred name is required'),
  namePronunciation: z.string().optional(),
  preferredContactChannel: z.enum(['sms', 'email', 'phone']).default('sms'),
  conversationPreference: z.enum(['loves_chatting', 'gentle_small_talk', 'quiet_visit_only']).default('gentle_small_talk'),
  roomComfortRequests: z.array(z.string()).default([]), // e.g. "extra blanket", "low lighting", "unscented products"
  privatePractitionerNotes: z.string().optional(),
  isSensitiveCareNote: z.boolean().default(true),
  updatedAt: z.string().datetime(),
});

export type ClientServicePreferences = z.infer<typeof ClientServicePreferencesSchema>;

/**
 * Returns service comfort requests for room preparation while protecting private notes from marketing exports.
 * Invariant (F013): Sensitive comfort preferences remain private to treatment staff and are
 * never automatically converted into public marketing audience tags.
 */
export function sanitizePreferencesForRoomPrep(
  prefs: ClientServicePreferences
): {
  preferredName: string;
  conversationPreference: string;
  roomComfortRequests: string[];
} {
  return {
    preferredName: prefs.preferredName,
    conversationPreference: prefs.conversationPreference,
    roomComfortRequests: prefs.roomComfortRequests,
  };
}
