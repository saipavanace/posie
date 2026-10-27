import { z } from 'zod';

export const AccessAndComfortRequestSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  appointmentId: z.string().uuid().optional(),
  quietVisitRequested: z.boolean().default(false),
  stepFreeAccessRequired: z.boolean().default(false),
  supportPersonAccompanying: z.boolean().default(false),
  lowSensoryLighting: z.boolean().default(false),
  scentFreeEnvironment: z.boolean().default(false),
  extraConsultationTimeNeeded: z.boolean().default(false),
  privateNotes: z.string().optional(),
  acknowledgedByStaffId: z.string().uuid().optional(),
  createdAt: z.string().datetime(),
});

export type AccessAndComfortRequest = z.infer<typeof AccessAndComfortRequestSchema>;

/**
 * Filters accessibility and quiet-visit requests so only preparing practitioners view them.
 * Invariant (F014): Access and comfort requests are strictly scoped to the staff member
 * preparing the treatment room and are never converted into public marketing tags.
 */
export function filterAccessRequestsForPractitioner(
  requests: AccessAndComfortRequest[],
  practitionerId: string
): AccessAndComfortRequest[] {
  return requests.filter(
    (req) => !req.acknowledgedByStaffId || req.acknowledgedByStaffId === practitionerId
  );
}
