import { z } from 'zod';

export const CheckpointItemSchema = z.object({
  id: z.string().uuid(),
  taskDescription: z.string().min(1),
  completed: z.boolean().default(false),
  completedByStaffId: z.string().uuid().optional(),
  completedAt: z.string().datetime().optional(),
});

export const SopChecklistSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'SOP title is required'),
  type: z.enum(['opening', 'closing', 'sanitization_sterilization', 'equipment_calibration', 'stock_intake']),
  assignedRole: z.string().min(1),
  version: z.number().int().positive().default(1),
  items: z.array(CheckpointItemSchema).min(1, 'Checklist must contain at least one task'),
  acknowledgedByStaffIds: z.array(z.string().uuid()).default([]),
  updatedAt: z.string().datetime(),
});

export type CheckpointItem = z.infer<typeof CheckpointItemSchema>;
export type SopChecklist = z.infer<typeof SopChecklistSchema>;

/**
 * Updates an existing SOP checklist and resets acknowledgment tracking.
 * Invariant (F009): Updating an operational checklist bumps its version and identifies
 * which active staff members must review and acknowledge the latest revision.
 */
export function updateSopChecklist(
  current: SopChecklist,
  newItems: Array<{ id: string; taskDescription: string }>,
  title?: string
): SopChecklist {
  const updated: SopChecklist = {
    ...current,
    title: title ?? current.title,
    version: current.version + 1,
    items: newItems.map((item) => ({
      id: item.id,
      taskDescription: item.taskDescription,
      completed: false,
    })),
    acknowledgedByStaffIds: [], // Resets acknowledgments for new version
    updatedAt: new Date().toISOString(),
  };

  return SopChecklistSchema.parse(updated);
}

/**
 * Marks an individual item as completed with staff attribution and immutable timestamp.
 */
export function completeSopItem(
  checklist: SopChecklist,
  itemId: string,
  staffId: string
): SopChecklist {
  const items = checklist.items.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        completed: true,
        completedByStaffId: staffId,
        completedAt: new Date().toISOString(),
      };
    }
    return item;
  });

  return SopChecklistSchema.parse({
    ...checklist,
    items,
  });
}
