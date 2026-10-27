import { z } from 'zod';

export const ReminderScheduleRuleSchema = z.object({
  id: z.string().uuid(),
  appointmentId: z.string().uuid(),
  clientPhone: z.string(),
  clientEmail: z.string().email(),
  channel: z.enum(['sms', 'email']).default('sms'),
  scheduledSendTimeUtc: z.string().datetime(),
  status: z.enum(['scheduled', 'sent', 'cancelled', 'failed']).default('scheduled'),
  appointmentStartTimeUtc: z.string().datetime(),
});

export type ReminderScheduleRule = z.infer<typeof ReminderScheduleRuleSchema>;

/**
 * Updates scheduled reminders when an appointment is rescheduled or canceled.
 * Invariant (F028 / WB F48 F49): Rescheduling an appointment automatically cancels obsolete
 * pending reminders and recalculates the new reminder queue without dispatching duplicate alerts.
 */
export function syncRemindersOnReschedule(
  existingReminders: ReminderScheduleRule[],
  appointmentId: string,
  newStartTimeUtc: string,
  hoursBeforeVisit: number = 24
): ReminderScheduleRule[] {
  // Cancel old pending reminders for this visit
  const updated = existingReminders.map((r) =>
    r.appointmentId === appointmentId && r.status === 'scheduled'
      ? { ...r, status: 'cancelled' as const }
      : r
  );

  // Calculate new trigger time (e.g. 24 hours prior)
  const apptTime = new Date(newStartTimeUtc).getTime();
  const sendTime = new Date(apptTime - hoursBeforeVisit * 60 * 60 * 1000).toISOString();

  // Insert refreshed reminder rule
  updated.push({
    id: crypto.randomUUID(),
    appointmentId,
    clientPhone: existingReminders[0]?.clientPhone || '+1-555-0100',
    clientEmail: existingReminders[0]?.clientEmail || 'client@example.com',
    channel: 'sms',
    scheduledSendTimeUtc: sendTime,
    status: 'scheduled',
    appointmentStartTimeUtc: newStartTimeUtc,
  });

  return updated;
}
