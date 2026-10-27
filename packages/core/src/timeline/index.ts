import { z } from 'zod';

export const TimelineEventTypeSchema = z.enum([
  'completed_visit',
  'retail_purchase',
  'signed_waiver',
  'client_message',
  'practitioner_treatment_note',
  'deposit_collected',
  'cancellation',
]);

export const TimelineEventSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  type: TimelineEventTypeSchema,
  title: z.string().min(1),
  summary: z.string(),
  recordedAt: z.string().datetime(),
  actorName: z.string(),
  actorRole: z.enum(['client', 'esthetician', 'receptionist', 'studio_owner']),
  isRestrictedClinicalOrPrivate: z.boolean().default(false),
  metadata: z.record(z.any()).optional(),
});

export type TimelineEvent = z.infer<typeof TimelineEventSchema>;

/**
 * Compiles a chronological timeline for a client profile.
 * Invariant (F025 / WB F19): Combines visits, forms, messages, notes, and purchases in strict
 * chronological order with original timestamps, while enforcing least-privilege role filters.
 */
export function getUnifiedClientTimeline(
  events: TimelineEvent[],
  viewerRole: 'client' | 'esthetician' | 'receptionist' | 'studio_owner'
): TimelineEvent[] {
  // Sort descending by recorded date
  const sorted = [...events].sort(
    (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
  );

  // Clients and receptionists cannot see restricted private practitioner notes
  if (viewerRole === 'client' || viewerRole === 'receptionist') {
    return sorted.filter((e) => !e.isRestrictedClinicalOrPrivate);
  }

  return sorted;
}
