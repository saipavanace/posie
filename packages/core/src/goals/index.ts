import { z } from 'zod';

export const WeeklyGoalTypeSchema = z.enum([
  'profit_target',
  'rebooking_rate_percentage',
  'admin_hours_cap',
  'protected_days_off',
]);

export const WeeklyGoalSchema = z.object({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  type: WeeklyGoalTypeSchema,
  label: z.string().min(1),
  targetValue: z.number().positive(),
  currentValue: z.number().nonnegative().default(0),
  unit: z.string(),
  isPaused: z.boolean().default(false),
  isPrivateToOwner: z.boolean().default(true),
  weekStartDate: z.string().datetime(),
});

export type WeeklyGoal = z.infer<typeof WeeklyGoalSchema>;

/**
 * Calculates progress towards an owner's private weekly goal.
 * Invariant (F020 / WB U20): Goals are strictly private to the business owner, can be paused,
 * and provide nonpunitive progress feedback without public staff rankings or shaming.
 */
export function calculateGoalProgress(goal: WeeklyGoal): {
  progressPercentage: number;
  remainingValue: number;
  isAchieved: boolean;
  statusMessage: string;
} {
  if (goal.isPaused) {
    return {
      progressPercentage: 0,
      remainingValue: goal.targetValue,
      isAchieved: false,
      statusMessage: 'Goal is currently paused.',
    };
  }

  const progressPercentage = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
  const remainingValue = Math.max(0, goal.targetValue - goal.currentValue);
  const isAchieved = goal.currentValue >= goal.targetValue;

  let statusMessage = `${progressPercentage}% of your target achieved.`;
  if (isAchieved) {
    statusMessage = '🎉 Goal completed for this week!';
  } else if (goal.type === 'protected_days_off') {
    statusMessage = `${goal.currentValue} of ${goal.targetValue} days off taken. Great balance!`;
  }

  return {
    progressPercentage,
    remainingValue,
    isAchieved,
    statusMessage,
  };
}
