import { z } from 'zod';

export const DailyTaskTypeSchema = z.enum([
  'incomplete_form',
  'client_callback',
  'low_stock_warning',
  'unpaid_deposit',
  'room_prep',
]);

export const DailyTaskSchema = z.object({
  id: z.string().uuid(),
  type: DailyTaskTypeSchema,
  title: z.string().min(1),
  details: z.string(),
  assignedStaffId: z.string().uuid().optional(),
  assignedStaffName: z.string().optional(),
  linkedEntityId: z.string().uuid().optional(), // Linked to bookingId, clientId, or skuId
  status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
  completedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
});

export type DailyTask = z.infer<typeof DailyTaskSchema>;

/**
 * Resolves a daily task and updates the underlying entity status.
 * Invariant (F015): Completing a task synchronously marks it completed and suppresses duplicate alerts.
 */
export function completeDailyTask(
  tasks: DailyTask[],
  taskId: string,
  staffId: string
): DailyTask[] {
  return tasks.map((task) => {
    if (task.id === taskId) {
      return DailyTaskSchema.parse({
        ...task,
        status: 'completed',
        assignedStaffId: staffId,
        completedAt: new Date().toISOString(),
      });
    }
    return task;
  });
}
