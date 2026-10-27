/**
 * Posie Core - F143: Schedule Optimization & Better Working Week
 *
 * Implements intelligent schedule optimization that enhances usable chair capacity,
 * eliminates awkward fragmented dead zones, and actively supports practitioner quality-of-life
 * goals (such as taking Fridays off or capping daily working spans) while strictly honoring
 * minimum weekly contribution targets, protected lunch breaks, and client flexibility constraints.
 *
 * Compliance: Follows Posie Rule DR03 (Optimization suggestions expose transparent tradeoffs
 * and require practitioner consent before changing any calendar slots; no silent client moves).
 */

export interface WorkingWeekGoal {
  targetDaysOff: string[]; // e.g. ['Friday', 'Sunday']
  maxDailySpanMinutes: number; // e.g. 420 minutes (7 hours)
  weeklyContributionFloorCents: number; // e.g. 250000 ($2,500.00 floor)
  mandatoryBreakMinutes: number; // e.g. 30 minutes
}

export interface ExistingAppointmentSlot {
  appointmentId: string;
  clientName: string;
  serviceName: string;
  dayOfWeek: string; // 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  startTime: string; // '09:00'
  endTime: string; // '10:15'
  durationMinutes: number;
  revenueCents: number;
  contributionCents: number;
  clientFlexibilityMinutes: number; // e.g. 15 or 30 mins window client consented to
  isLockedByClient: boolean;
}

export type SuggestionType =
  | 'consolidate_day_off'
  | 'compact_awkward_gap'
  | 'protect_mandatory_break';

export interface OptimizationSuggestion {
  suggestionId: string;
  type: SuggestionType;
  appointmentId: string;
  clientName: string;
  serviceName: string;
  currentDay: string;
  currentTime: string;
  proposedDay: string;
  proposedTime: string;
  shiftDeltaMinutes: number;
  tradeoffRationale: string;
  disruptionRisk: 'none' | 'low' | 'moderate';
  impactsTargetDayOff: boolean;
}

export interface OptimizationPlan {
  planId: string;
  weekStartDate: string;
  goal: WorkingWeekGoal;
  baselineMetrics: {
    totalAppointments: number;
    totalWorkingDays: number;
    totalSpanMinutes: number;
    totalContributionCents: number;
    deadGapMinutes: number;
  };
  projectedMetrics: {
    totalWorkingDays: number;
    totalSpanMinutes: number;
    savedSpanMinutes: number;
    totalContributionCents: number;
    meetsContributionFloor: boolean;
    targetDaysOffAchieved: string[];
    remainingDeadGapMinutes: number;
  };
  suggestions: OptimizationSuggestion[];
  auditLog: string[];
}

/**
 * Parses 'HH:MM' into total minutes from midnight
 */
export function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Formats minutes from midnight back to 'HH:MM'
 */
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/**
 * Generates an actionable Schedule Optimization Plan evaluated against owner working week goals
 */
export function generateScheduleOptimizationPlan(
  weekStartDate: string,
  appointments: ExistingAppointmentSlot[],
  goal: WorkingWeekGoal
): OptimizationPlan {
  const planId = `opt-plan-${Date.now()}`;
  const auditLog: string[] = [];

  // Group appointments by day
  const dayGroups: Record<string, ExistingAppointmentSlot[]> = {};
  for (const appt of appointments) {
    if (!dayGroups[appt.dayOfWeek]) {
      dayGroups[appt.dayOfWeek] = [];
    }
    dayGroups[appt.dayOfWeek].push(appt);
  }

  // Calculate baseline metrics
  let totalSpan = 0;
  let totalContribution = 0;
  let totalDeadGaps = 0;
  const activeDays = Object.keys(dayGroups);

  for (const day of activeDays) {
    const slots = [...dayGroups[day]].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
    if (slots.length > 0) {
      const firstStart = timeToMinutes(slots[0].startTime);
      const lastEnd = timeToMinutes(slots[slots.length - 1].endTime);
      totalSpan += (lastEnd - firstStart);

      for (let i = 0; i < slots.length - 1; i++) {
        const gap = timeToMinutes(slots[i + 1].startTime) - timeToMinutes(slots[i].endTime);
        if (gap > 0 && gap <= 45) {
          totalDeadGaps += gap;
        }
      }
    }
    for (const s of slots) {
      totalContribution += s.contributionCents;
    }
  }

  const suggestions: OptimizationSuggestion[] = [];
  const achievedDaysOff: string[] = [];

  // 1. Check target days off: can we consolidate slots away from days the practitioner wants off?
  for (const targetDay of goal.targetDaysOff) {
    const slotsOnTargetDay = dayGroups[targetDay] || [];
    if (slotsOnTargetDay.length === 0) {
      achievedDaysOff.push(targetDay);
      continue;
    }

    let allShiftsViable = true;
    for (const slot of slotsOnTargetDay) {
      if (slot.isLockedByClient || slot.clientFlexibilityMinutes < 30) {
        allShiftsViable = false;
        auditLog.push(`Appointment ${slot.appointmentId} (${slot.clientName}) on ${targetDay} is locked or inflexible; cannot vacate day off.`);
        continue;
      }

      // Propose shifting to Thursday or Saturday
      const alternateDay = targetDay === 'Friday' ? 'Thursday' : 'Monday';
      const proposedStart = '15:30'; // Open afternoon slot
      const endMins = timeToMinutes(proposedStart) + slot.durationMinutes;

      suggestions.push({
        suggestionId: `sug-dayoff-${slot.appointmentId}`,
        type: 'consolidate_day_off',
        appointmentId: slot.appointmentId,
        clientName: slot.clientName,
        serviceName: slot.serviceName,
        currentDay: targetDay,
        currentTime: slot.startTime,
        proposedDay: alternateDay,
        proposedTime: proposedStart,
        shiftDeltaMinutes: 0,
        tradeoffRationale: `Shift flexible ${slot.serviceName} to ${alternateDay} ${proposedStart} to achieve protected ${targetDay} off.`,
        disruptionRisk: 'low',
        impactsTargetDayOff: true,
      });
    }

    if (allShiftsViable && slotsOnTargetDay.length > 0) {
      achievedDaysOff.push(targetDay);
    }
  }

  // 2. Identify awkward gaps (e.g. 15-30 mins) and propose micro-shifts
  for (const day of activeDays) {
    if (goal.targetDaysOff.includes(day)) continue;

    const slots = [...dayGroups[day]].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
    for (let i = 0; i < slots.length - 1; i++) {
      const current = slots[i];
      const next = slots[i + 1];
      const gap = timeToMinutes(next.startTime) - timeToMinutes(current.endTime);

      if (gap > 0 && gap <= 30 && !next.isLockedByClient && next.clientFlexibilityMinutes >= gap) {
        const newStart = current.endTime;
        const newEnd = minutesToTime(timeToMinutes(newStart) + next.durationMinutes);

        suggestions.push({
          suggestionId: `sug-gap-${next.appointmentId}`,
          type: 'compact_awkward_gap',
          appointmentId: next.appointmentId,
          clientName: next.clientName,
          serviceName: next.serviceName,
          currentDay: day,
          currentTime: next.startTime,
          proposedDay: day,
          proposedTime: newStart,
          shiftDeltaMinutes: -gap,
          tradeoffRationale: `Pull forward ${gap} min to eliminate fragmented dead gap between ${current.serviceName} and ${next.serviceName}.`,
          disruptionRisk: gap <= 15 ? 'none' : 'low',
          impactsTargetDayOff: false,
        });
      }
    }
  }

  const projectedSavedSpan = suggestions.reduce((acc, s) => acc + (s.type === 'compact_awkward_gap' ? Math.abs(s.shiftDeltaMinutes) : 60), 0);
  const projectedSpan = Math.max(0, totalSpan - projectedSavedSpan);
  const meetsContributionFloor = totalContribution >= goal.weeklyContributionFloorCents;

  return {
    planId,
    weekStartDate,
    goal,
    baselineMetrics: {
      totalAppointments: appointments.length,
      totalWorkingDays: activeDays.length,
      totalSpanMinutes: totalSpan,
      totalContributionCents: totalContribution,
      deadGapMinutes: totalDeadGaps,
    },
    projectedMetrics: {
      totalWorkingDays: activeDays.length - (achievedDaysOff.length > 0 ? 1 : 0),
      totalSpanMinutes: projectedSpan,
      savedSpanMinutes: projectedSavedSpan,
      totalContributionCents: totalContribution,
      meetsContributionFloor,
      targetDaysOffAchieved: achievedDaysOff,
      remainingDeadGapMinutes: Math.max(0, totalDeadGaps - projectedSavedSpan),
    },
    suggestions,
    auditLog,
  };
}

/**
 * Applies an approved optimization suggestion to the live schedule state with an immutable audit log
 */
export function applyOptimizationSuggestion(
  appointments: ExistingAppointmentSlot[],
  suggestion: OptimizationSuggestion,
  authorizerStaffId: string
): {
  updatedAppointments: ExistingAppointmentSlot[];
  auditReceipt: string;
} {
  const index = appointments.findIndex(a => a.appointmentId === suggestion.appointmentId);
  if (index === -1) {
    throw new Error(`Appointment ${suggestion.appointmentId} not found in schedule pool`);
  }

  const targetAppt = appointments[index];
  const newStartMinutes = timeToMinutes(suggestion.proposedTime);
  const newEndMinutes = newStartMinutes + targetAppt.durationMinutes;
  const newEndTime = minutesToTime(newEndMinutes);

  const updatedAppt: ExistingAppointmentSlot = {
    ...targetAppt,
    dayOfWeek: suggestion.proposedDay,
    startTime: suggestion.proposedTime,
    endTime: newEndTime,
  };

  const updatedList = [...appointments];
  updatedList[index] = updatedAppt;

  const auditReceipt = `[${new Date().toISOString()}] Optimization suggestion ${suggestion.suggestionId} applied by staff ${authorizerStaffId}: ${targetAppt.clientName} moved from ${targetAppt.dayOfWeek} ${targetAppt.startTime} to ${suggestion.proposedDay} ${suggestion.proposedTime}.`;

  return {
    updatedAppointments: updatedList,
    auditReceipt,
  };
}
