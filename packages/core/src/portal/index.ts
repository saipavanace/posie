import { z } from 'zod';

export const ClientPortalSessionSchema = z.object({
  clientId: z.string().uuid(),
  magicToken: z.string().min(16),
  expiresAt: z.string().datetime(),
  isValid: z.boolean().default(true),
});

export const ClientPortalViewSchema = z.object({
  clientName: z.string(),
  upcomingAppointments: z.array(
    z.object({
      id: z.string().uuid(),
      serviceName: z.string(),
      specialistName: z.string(),
      dateFormatted: z.string(),
      depositPaidFormatted: z.string(),
      remainingDueFormatted: z.string(),
    })
  ),
  signedWaiversCount: z.number().int().nonnegative(),
  savedPreferences: z.object({
    preferredName: z.string(),
    conversationStyle: z.string(),
    roomComfortRequests: z.array(z.string()),
  }),
});

export type ClientPortalSession = z.infer<typeof ClientPortalSessionSchema>;
export type ClientPortalView = z.infer<typeof ClientPortalViewSchema>;

/**
 * Creates an ephemeral passwordless login token for direct client portal access.
 * Invariant (F031 / WB F6): Clients access their visits, documents, and receipts via secure expiring
 * magic links without needing to download an app or remember a password.
 */
export function createPasswordlessPortalSession(
  clientId: string,
  ttlHours: number = 72
): ClientPortalSession {
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000).toISOString();
  const magicToken = `tok_${crypto.randomUUID().replace(/-/g, '')}`;

  return {
    clientId,
    magicToken,
    expiresAt,
    isValid: true,
  };
}

/**
 * Validates a portal session token before rendering client records.
 */
export function validatePortalSession(session: ClientPortalSession, now: Date = new Date()): boolean {
  if (!session.isValid) return false;
  return new Date(session.expiresAt).getTime() > now.getTime();
}
