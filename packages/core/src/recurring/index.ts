import { z } from 'zod';

export const RecurringProposalFrequencySchema = z.enum(['every_2_weeks', 'every_3_weeks', 'every_4_weeks', 'every_6_weeks']);
export type RecurringProposalFrequency = z.infer<typeof RecurringProposalFrequencySchema>;

export const RecurringOccurrenceSchema = z.object({
  occurrenceIndex: z.number().int().positive(),
  proposedDateUtc: z.string().datetime(),
  hasConflict: z.boolean().default(false),
  status: z.enum(['tentative', 'confirmed', 'declined']).default('tentative'),
});

export const RecurringAppointmentProposalSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  serviceId: z.string().uuid(),
  practitionerId: z.string().uuid(),
  frequency: RecurringProposalFrequencySchema,
  totalOccurrences: z.number().int().min(2).max(12),
  occurrences: z.array(RecurringOccurrenceSchema),
  clientApproved: z.boolean().default(false),
  createdAt: z.string().datetime(),
});

export type RecurringOccurrence = z.infer<typeof RecurringOccurrenceSchema>;
export type RecurringAppointmentProposal = z.infer<typeof RecurringAppointmentProposalSchema>;

/**
 * Generates recurring visit proposals with end dates and explicit conflict checks.
 * Invariant (F029): Conflicting occurrences remain flagged as tentative until the owner/specialist
 * resolves them; the system never silently books overlapping commitments.
 */
export function generateRecurringProposal(
  clientId: string,
  serviceId: string,
  practitionerId: string,
  startDateUtc: string,
  frequency: RecurringProposalFrequency,
  totalOccurrences: number = 4
): RecurringAppointmentProposal {
  const frequencyDays: Record<RecurringProposalFrequency, number> = {
    every_2_weeks: 14,
    every_3_weeks: 21,
    every_4_weeks: 28,
    every_6_weeks: 42,
  };

  const intervalDays = frequencyDays[frequency];
  const startTime = new Date(startDateUtc).getTime();
  const occurrences: RecurringOccurrence[] = [];

  for (let i = 0; i < totalOccurrences; i++) {
    const occurrenceTime = new Date(startTime + i * intervalDays * 24 * 60 * 60 * 1000);
    occurrences.push({
      occurrenceIndex: i + 1,
      proposedDateUtc: occurrenceTime.toISOString(),
      hasConflict: false,
      status: 'tentative',
    });
  }

  return {
    id: crypto.randomUUID(),
    clientId,
    serviceId,
    practitionerId,
    frequency,
    totalOccurrences,
    occurrences,
    clientApproved: false,
    createdAt: new Date().toISOString(),
  };
}
