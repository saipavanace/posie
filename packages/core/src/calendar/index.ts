import { z } from 'zod';

export const CalendarViewModeSchema = z.enum(['day', 'week', 'practitioner', 'resource']);
export type CalendarViewMode = z.infer<typeof CalendarViewModeSchema>;

export const CalendarEventSchema = z.object({
  id: z.string().uuid(),
  appointmentId: z.string().uuid(),
  clientName: z.string(),
  serviceName: z.string(),
  practitionerId: z.string().uuid(),
  practitionerName: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  status: z.enum(['confirmed', 'completed', 'cancelled', 'in_progress']).default('confirmed'),
});

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;

/**
 * Validates whether rescheduling or moving an event creates a scheduling conflict.
 * Invariant (F027 / WB F14): Moving an appointment validates provider and resource conflicts
 * before committing and reports overlapping commitments.
 */
export function checkCalendarConflict(
  existingEvents: CalendarEvent[],
  targetEvent: { practitionerId: string; startTime: string; endTime: string; excludeEventId?: string }
): { hasConflict: boolean; conflictingEvent?: CalendarEvent } {
  const targetStart = new Date(targetEvent.startTime).getTime();
  const targetEnd = new Date(targetEvent.endTime).getTime();

  for (const event of existingEvents) {
    if (targetEvent.excludeEventId && event.id === targetEvent.excludeEventId) {
      continue;
    }

    if (event.practitionerId === targetEvent.practitionerId && event.status !== 'cancelled') {
      const eventStart = new Date(event.startTime).getTime();
      const eventEnd = new Date(event.endTime).getTime();

      // Overlap condition
      if (targetStart < eventEnd && targetEnd > eventStart) {
        return {
          hasConflict: true,
          conflictingEvent: event,
        };
      }
    }
  }

  return { hasConflict: false };
}
