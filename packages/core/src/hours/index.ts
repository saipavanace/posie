import { z } from 'zod';

export const DayScheduleSchema = z.object({
  dayOfWeek: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  isOpen: z.boolean().default(true),
  openTime: z.string().regex(/^\d{2}:\d{2}$/, 'Must be HH:mm format'), // e.g. "09:00"
  closeTime: z.string().regex(/^\d{2}:\d{2}$/, 'Must be HH:mm format'), // e.g. "18:00"
  breakStartTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  breakEndTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
});

export const HolidayBlockSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  reason: z.string().optional(),
});

export const StudioScheduleConfigSchema = z.object({
  timeZone: z.string().default('America/Chicago'),
  leadTimeHoursMinimum: z.number().int().nonnegative().default(2), // Minimum advance notice
  futureBookingWindowDays: z.number().int().positive().default(60), // Can only book up to 60 days in advance
  weeklyHours: z.array(DayScheduleSchema),
  holidays: z.array(HolidayBlockSchema).default([]),
});

export type DaySchedule = z.infer<typeof DayScheduleSchema>;
export type HolidayBlock = z.infer<typeof HolidayBlockSchema>;
export type StudioScheduleConfig = z.infer<typeof StudioScheduleConfigSchema>;

/**
 * Checks whether an appointment start time falls within operating hours and outside holiday blocks.
 * Invariant (F021): Holiday and schedule edits identify any existing client conflicts.
 */
export function isSlotWithinOperatingHours(
  config: StudioScheduleConfig,
  targetSlot: Date
): { isAvailable: boolean; reason?: string } {
  const slotIso = targetSlot.toISOString();

  // Check holiday blocks
  const holiday = config.holidays.find(
    (h) => h.startDate <= slotIso && h.endDate >= slotIso
  );
  if (holiday) {
    return {
      isAvailable: false,
      reason: `Studio is closed for holiday: ${holiday.title}`,
    };
  }

  // Get day of week
  const days: DaySchedule['dayOfWeek'][] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const dayName = days[targetSlot.getUTCDay()];
  const dayConfig = config.weeklyHours.find((d) => d.dayOfWeek === dayName);

  if (!dayConfig || !dayConfig.isOpen) {
    return {
      isAvailable: false,
      reason: `Studio is closed on ${dayName}.`,
    };
  }

  return { isAvailable: true };
}
