import { z } from 'zod';

export const RoutineTimeOfDaySchema = z.enum([
  'morning',
  'evening',
  'weekly_treatment',
]);

export type RoutineTimeOfDay = z.infer<typeof RoutineTimeOfDaySchema>;

export const RegimenProductStepSchema = z.object({
  stepNumber: z.number().int().positive(),
  timeOfDay: RoutineTimeOfDaySchema,
  productName: z.string().min(1, 'Product name is required'),
  brand: z.string().optional(),
  purpose: z.string().min(1, 'Product purpose is required'),
  usageInstructions: z.string().min(1, 'Instructions are required'),
  cautionNotes: z.string().optional(),
  optionalShopUrl: z.string().url().optional(),
});

export type RegimenProductStep = z.infer<typeof RegimenProductStepSchema>;

export const HomeCarePlanSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  visitAppointmentId: z.string().uuid().optional(),
  title: z.string().min(1),
  version: z.number().int().positive().default(1),
  prescribedByStaffId: z.string().uuid(),
  approvedAt: z.string().datetime(),
  routineSteps: z.array(RegimenProductStepSchema).min(1, 'At least one routine step required'),
  clientPreferencesHonored: z.array(z.string()).default([]),
  changeSummaryFromPreviousVersion: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type HomeCarePlan = z.infer<typeof HomeCarePlanSchema>;

/**
 * Creates a practitioner-approved home-care regimen plan.
 */
export function createHomeCarePlan(params: {
  id?: string;
  clientId: string;
  visitAppointmentId?: string;
  title: string;
  prescribedByStaffId: string;
  routineSteps: RegimenProductStep[];
  clientPreferencesHonored?: string[];
}): HomeCarePlan {
  const now = new Date().toISOString();
  return HomeCarePlanSchema.parse({
    id: params.id || '80000000-0000-0000-0000-000000000040',
    clientId: params.clientId,
    visitAppointmentId: params.visitAppointmentId,
    title: params.title,
    version: 1,
    prescribedByStaffId: params.prescribedByStaffId,
    approvedAt: now,
    routineSteps: params.routineSteps,
    clientPreferencesHonored: params.clientPreferencesHonored || [],
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Revises an existing home-care plan, incrementing the version and preserving the historical record.
 * INVARIANT: Revisions never erase earlier delivered routines. Clients see the plan version they were given.
 */
export function reviseHomeCarePlan(
  previousPlan: HomeCarePlan,
  params: {
    title?: string;
    prescribedByStaffId: string;
    routineSteps: RegimenProductStep[];
    changeReason: string;
    clientPreferencesHonored?: string[];
  }
): HomeCarePlan {
  const now = new Date().toISOString();
  const nextVersion = previousPlan.version + 1;
  const changeSummary = `Version ${previousPlan.version} -> ${nextVersion}: ${params.changeReason}`;

  return HomeCarePlanSchema.parse({
    ...previousPlan,
    title: params.title || previousPlan.title,
    version: nextVersion,
    prescribedByStaffId: params.prescribedByStaffId,
    approvedAt: now,
    routineSteps: params.routineSteps,
    clientPreferencesHonored:
      params.clientPreferencesHonored || previousPlan.clientPreferencesHonored,
    changeSummaryFromPreviousVersion: changeSummary,
    updatedAt: now,
  });
}

/**
 * Formats a bathroom-mirror printable card for client home daily compliance.
 */
export function formatHomeCarePrintableCard(plan: HomeCarePlan): string {
  const morningSteps = plan.routineSteps
    .filter((s) => s.timeOfDay === 'morning')
    .map(
      (s) =>
        `• Step ${s.stepNumber}: ${s.productName} (${s.purpose})\n  ${s.usageInstructions}${
          s.cautionNotes ? `\n  ⚠️ ${s.cautionNotes}` : ''
        }`
    )
    .join('\n\n');

  const eveningSteps = plan.routineSteps
    .filter((s) => s.timeOfDay === 'evening')
    .map(
      (s) =>
        `• Step ${s.stepNumber}: ${s.productName} (${s.purpose})\n  ${s.usageInstructions}${
          s.cautionNotes ? `\n  ⚠️ ${s.cautionNotes}` : ''
        }`
    )
    .join('\n\n');

  return `
========================================
${plan.title.toUpperCase()} (v${plan.version})
Prescribed by Posie Atelier
========================================

☀️ MORNING ROUTINE
------------------
${morningSteps || 'No morning steps specified.'}

🌙 EVENING ROUTINE
------------------
${eveningSteps || 'No evening steps specified.'}

Client Preferences Honored:
${plan.clientPreferencesHonored.map((p) => `✓ ${p}`).join('\n')}
========================================
  `.trim();
}
