import { z } from 'zod';

export const ClientReturnProfileSchema = z.object({
  clientId: z.string().uuid(),
  clientName: z.string(),
  phone: z.string(),
  lastVisitDate: z.string().datetime(),
  preferredCadenceDays: z.number().int().positive().default(30), // e.g. 4 weeks
  optedOutMarketing: z.boolean().default(false),
  hasFutureAppointment: z.boolean().default(false),
  isActiveClient: z.boolean().default(true),
});

export const LapsedClientEntrySchema = z.object({
  clientId: z.string().uuid(),
  clientName: z.string(),
  daysOverdue: z.number().int().positive(),
  expectedReturnDate: z.string().datetime(),
  suggestedAction: z.string(),
});

export type ClientReturnProfile = z.infer<typeof ClientReturnProfileSchema>;
export type LapsedClientEntry = z.infer<typeof LapsedClientEntrySchema>;

/**
 * Evaluates return cadences and compiles a respectful lapsed client reconnect worklist.
 * Invariant (F019): Excludes opted-out, deceased, or already rebooked clients. Shows
 * exactly why each client appears based on their individual treatment cycle.
 */
export function identifyLapsedClients(
  clients: ClientReturnProfile[],
  referenceDate: Date = new Date()
): LapsedClientEntry[] {
  const refTime = referenceDate.getTime();
  const lapsedList: LapsedClientEntry[] = [];

  for (const client of clients) {
    // Invariant: Never include opted-out or clients with an upcoming visit booked
    if (client.optedOutMarketing || client.hasFutureAppointment || !client.isActiveClient) {
      continue;
    }

    const lastVisitTime = new Date(client.lastVisitDate).getTime();
    const cadenceMs = client.preferredCadenceDays * 24 * 60 * 60 * 1000;
    const expectedReturnTime = lastVisitTime + cadenceMs;

    if (refTime > expectedReturnTime) {
      const daysOverdue = Math.floor((refTime - expectedReturnTime) / (24 * 60 * 60 * 1000));
      if (daysOverdue > 0) {
        lapsedList.push({
          clientId: client.clientId,
          clientName: client.clientName,
          daysOverdue,
          expectedReturnDate: new Date(expectedReturnTime).toISOString(),
          suggestedAction: `Due ${daysOverdue} days ago based on regular ${client.preferredCadenceDays}-day cycle. Send friendly check-in snippet.`,
        });
      }
    }
  }

  // Sort descending by days overdue
  return lapsedList.sort((a, b) => b.daysOverdue - a.daysOverdue);
}
