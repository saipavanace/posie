import { z } from 'zod';
import { IntakeSubmission, IntakeFormTemplate, validateIntakeForm } from '../intake';

export const AnswerChangeRecordSchema = z.object({
  questionId: z.string(),
  questionLabel: z.string(),
  previousValue: z.any(),
  newValue: z.any(),
  changeReason: z.string().optional(),
});

export type AnswerChangeRecord = z.infer<typeof AnswerChangeRecordSchema>;

export const IntakeConfirmationTypeSchema = z.enum([
  'confirmed_no_changes',
  'updated_with_changes',
]);

export type IntakeConfirmationType = z.infer<typeof IntakeConfirmationTypeSchema>;

export const RepeatIntakeReviewSchema = z.object({
  id: z.string().uuid(),
  templateId: z.string().uuid(),
  clientId: z.string().uuid(),
  appointmentId: z.string().uuid(),
  baselineSubmissionId: z.string().uuid(),
  confirmationType: IntakeConfirmationTypeSchema,
  changesReported: z.array(AnswerChangeRecordSchema).default([]),
  finalResponses: z.record(z.any()),
  confirmedAt: z.string().datetime(),
  reviewedByStaffId: z.string().uuid().optional(),
  requiresPractitionerTriage: z.boolean().default(false),
  triageReason: z.string().optional(),
});

export type RepeatIntakeReview = z.infer<typeof RepeatIntakeReviewSchema>;

/**
 * Prepares the previous answers for client review before a repeat visit.
 */
export function getPreviousIntakeAnswersForReview(
  previousSubmission: IntakeSubmission
): {
  baselineSubmissionId: string;
  lastCompletedDate: string;
  previousResponses: Record<string, any>;
} {
  return {
    baselineSubmissionId: previousSubmission.id,
    lastCompletedDate: previousSubmission.completedAt || previousSubmission.lastSavedAt,
    previousResponses: { ...previousSubmission.responses },
  };
}

/**
 * Confirms or updates intake responses for a repeat visit.
 * INVARIANT: Never overwrites the baseline historical submission.
 * A new separate record is created with delta tracking and review attribution.
 * INVARIANT: Does NOT imply automatic medical clearance; new medications or contraindications
 * automatically trigger practitioner triage.
 */
export function processRepeatIntakeReview(params: {
  reviewId?: string;
  template: IntakeFormTemplate;
  clientId: string;
  appointmentId: string;
  baselineSubmission: IntakeSubmission;
  confirmationType: IntakeConfirmationType;
  updatedResponses?: Record<string, any>;
  sensitiveQuestionIds?: string[]; // e.g. medications, pregnancy, new allergies
}): RepeatIntakeReview {
  const now = new Date().toISOString();
  const baselineResponses = params.baselineSubmission.responses;

  if (params.confirmationType === 'confirmed_no_changes') {
    return RepeatIntakeReviewSchema.parse({
      id: params.reviewId || '90000000-0000-0000-0000-000000000041',
      templateId: params.template.id,
      clientId: params.clientId,
      appointmentId: params.appointmentId,
      baselineSubmissionId: params.baselineSubmission.id,
      confirmationType: 'confirmed_no_changes',
      changesReported: [],
      finalResponses: { ...baselineResponses },
      confirmedAt: now,
      requiresPractitionerTriage: false,
    });
  }

  // Calculate changes between baseline and new answers
  const incoming = params.updatedResponses || {};
  const mergedResponses = { ...baselineResponses, ...incoming };

  // Validate that visible required questions are satisfied
  const validation = validateIntakeForm(params.template, mergedResponses);
  if (!validation.isValid) {
    throw new Error(
      `Cannot confirm intake updates. Missing required answers for: ${validation.missingQuestionIds.join(
        ', '
      )}`
    );
  }

  const changes: AnswerChangeRecord[] = [];
  let requiresTriage = false;
  const triageReasons: string[] = [];

  const sensitiveIds = new Set(params.sensitiveQuestionIds || []);

  for (const q of params.template.questions) {
    const oldVal = baselineResponses[q.id];
    const newVal = mergedResponses[q.id];

    if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
      changes.push({
        questionId: q.id,
        questionLabel: q.label,
        previousValue: oldVal,
        newValue: newVal,
      });

      if (sensitiveIds.has(q.id)) {
        requiresTriage = true;
        triageReasons.push(`Changed answer for sensitive question: "${q.label}"`);
      }
    }
  }

  return RepeatIntakeReviewSchema.parse({
    id: params.reviewId || '90000000-0000-0000-0000-000000000041',
    templateId: params.template.id,
    clientId: params.clientId,
    appointmentId: params.appointmentId,
    baselineSubmissionId: params.baselineSubmission.id,
    confirmationType: 'updated_with_changes',
    changesReported: changes,
    finalResponses: mergedResponses,
    confirmedAt: now,
    requiresPractitionerTriage: requiresTriage,
    triageReason: triageReasons.length > 0 ? triageReasons.join('; ') : undefined,
  });
}
