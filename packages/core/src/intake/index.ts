import { z } from 'zod';

export const FormQuestionTypeSchema = z.enum([
  'text',
  'boolean',
  'select',
  'multiselect',
  'number',
]);

export type FormQuestionType = z.infer<typeof FormQuestionTypeSchema>;

export const QuestionConditionSchema = z.object({
  dependsOnQuestionId: z.string(),
  operator: z.enum(['equals', 'in', 'not_equals']),
  expectedValue: z.any(),
});

export type QuestionCondition = z.infer<typeof QuestionConditionSchema>;

export const IntakeQuestionSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Question label is required'),
  helpText: z.string().optional(),
  type: FormQuestionTypeSchema,
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
  /** Accessible explanation why sensitive data (allergies, medications, pregnancy) is needed */
  sensitiveReason: z.string().optional(),
  condition: QuestionConditionSchema.optional(),
});

export type IntakeQuestion = z.infer<typeof IntakeQuestionSchema>;

export const IntakeFormTemplateSchema = z.object({
  id: z.string().uuid(),
  serviceId: z.string().uuid().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  version: z.number().int().positive().default(1),
  questions: z.array(IntakeQuestionSchema),
});

export type IntakeFormTemplate = z.infer<typeof IntakeFormTemplateSchema>;

export const IntakeSubmissionStatusSchema = z.enum([
  'sent',
  'opened',
  'draft',
  'completed',
  'superseded',
]);

export type IntakeSubmissionStatus = z.infer<typeof IntakeSubmissionStatusSchema>;

export const IntakeSubmissionSchema = z.object({
  id: z.string().uuid(),
  templateId: z.string().uuid(),
  clientId: z.string().uuid(),
  appointmentId: z.string().uuid().optional(),
  status: IntakeSubmissionStatusSchema,
  revisionCount: z.number().int().nonnegative().default(1),
  responses: z.record(z.any()),
  firstOpenedAt: z.string().datetime().optional(),
  lastSavedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
});

export type IntakeSubmission = z.infer<typeof IntakeSubmissionSchema>;

/**
 * Checks whether a question should be shown to the client based on responses to previous questions.
 */
export function isQuestionVisible(
  question: IntakeQuestion,
  responses: Record<string, any>
): boolean {
  if (!question.condition) {
    return true;
  }

  const { dependsOnQuestionId, operator, expectedValue } = question.condition;
  const parentValue = responses[dependsOnQuestionId];

  if (parentValue === undefined || parentValue === null) {
    return false;
  }

  if (operator === 'equals') {
    return parentValue === expectedValue;
  }

  if (operator === 'not_equals') {
    return parentValue !== expectedValue;
  }

  if (operator === 'in') {
    return Array.isArray(expectedValue) && expectedValue.includes(parentValue);
  }

  return true;
}

/**
 * Validates an intake submission.
 * INVARIANT: Hidden questions are NEVER treated as missing required answers.
 * Only visible questions with `required: true` must have non-empty responses.
 */
export function validateIntakeForm(
  template: IntakeFormTemplate,
  responses: Record<string, any>
): {
  isValid: boolean;
  missingQuestionIds: string[];
  visibleQuestionIds: string[];
} {
  const visibleQuestions = template.questions.filter((q) =>
    isQuestionVisible(q, responses)
  );
  const visibleQuestionIds = visibleQuestions.map((q) => q.id);

  const missingQuestionIds = visibleQuestions
    .filter((q) => {
      if (!q.required) return false;
      const val = responses[q.id];
      if (val === undefined || val === null || val === '') return true;
      if (Array.isArray(val) && val.length === 0) return true;
      return false;
    })
    .map((q) => q.id);

  return {
    isValid: missingQuestionIds.length === 0,
    missingQuestionIds,
    visibleQuestionIds,
  };
}

/**
 * Autosaves or completes an intake draft.
 */
export function saveIntakeSubmission(params: {
  id?: string;
  template: IntakeFormTemplate;
  clientId: string;
  appointmentId?: string;
  responses: Record<string, any>;
  existingSubmission?: IntakeSubmission;
  markCompleted?: boolean;
}): IntakeSubmission {
  const validation = validateIntakeForm(params.template, params.responses);

  if (params.markCompleted && !validation.isValid) {
    throw new Error(
      `Cannot complete intake form. Missing required answers for: ${validation.missingQuestionIds.join(
        ', '
      )}`
    );
  }

  const now = new Date().toISOString();
  const revision = (params.existingSubmission?.revisionCount || 0) + 1;

  return IntakeSubmissionSchema.parse({
    id: params.id || params.existingSubmission?.id || '10000000-0000-0000-0000-000000000035',
    templateId: params.template.id,
    clientId: params.clientId,
    appointmentId: params.appointmentId || params.existingSubmission?.appointmentId,
    status: params.markCompleted ? 'completed' : 'draft',
    revisionCount: revision,
    responses: params.responses,
    firstOpenedAt: params.existingSubmission?.firstOpenedAt || now,
    lastSavedAt: now,
    completedAt: params.markCompleted ? now : undefined,
  });
}
