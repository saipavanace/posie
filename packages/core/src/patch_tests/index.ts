import { z } from 'zod';

export const PatchTestResultSchema = z.enum([
  'pending_evaluation',
  'negative_no_reaction',
  'mild_erythema',
  'moderate_reaction',
  'severe_adverse',
]);

export type PatchTestResult = z.infer<typeof PatchTestResultSchema>;

export const PatchTestReadinessSchema = z.enum([
  'cleared_for_service',
  'contraindicated',
  'pending_evaluation',
  'missing_test_record',
  'expired_test_record',
]);

export type PatchTestReadiness = z.infer<typeof PatchTestReadinessSchema>;

export const PatchTestRecordSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  serviceId: z.string().uuid().optional(),
  productName: z.string().min(1, 'Product name is required'),
  brand: z.string().optional(),
  lotNumber: z.string().optional(),
  patchLocation: z.string().min(1, 'Patch location is required'),
  appliedByStaffId: z.string().uuid(),
  appliedAt: z.string().datetime(),
  evaluatedByStaffId: z.string().uuid().optional(),
  evaluatedAt: z.string().datetime().optional(),
  result: PatchTestResultSchema.default('pending_evaluation'),
  readinessStatus: PatchTestReadinessSchema.default('pending_evaluation'),
  /** Salon or service-specific validity window in days (e.g. 180 days for lash adhesive; no universal guess) */
  validityDays: z.number().int().positive().default(180),
  nextReviewDueDate: z.string().datetime().optional(),
  observationsNote: z.string().optional(),
  requiresMedicalReferral: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type PatchTestRecord = z.infer<typeof PatchTestRecordSchema>;

/**
 * Creates a record of a patch test application.
 */
export function createPatchTestApplication(params: {
  id?: string;
  clientId: string;
  serviceId?: string;
  productName: string;
  brand?: string;
  lotNumber?: string;
  patchLocation: string;
  appliedByStaffId: string;
  validityDays?: number;
}): PatchTestRecord {
  const now = new Date().toISOString();
  return PatchTestRecordSchema.parse({
    id: params.id || '12000000-0000-0000-0000-000000000042',
    clientId: params.clientId,
    serviceId: params.serviceId,
    productName: params.productName,
    brand: params.brand,
    lotNumber: params.lotNumber,
    patchLocation: params.patchLocation,
    appliedByStaffId: params.appliedByStaffId,
    appliedAt: now,
    result: 'pending_evaluation',
    readinessStatus: 'pending_evaluation',
    validityDays: params.validityDays || 180,
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Records the professional evaluation of a patch test after the observation period (e.g. 24–48 hours).
 * INVARIANT: Safety readiness is decided by a qualified professional; no system automated guarantee of safety.
 */
export function recordPatchTestEvaluation(
  record: PatchTestRecord,
  params: {
    evaluatedByStaffId: string;
    result: Exclude<PatchTestResult, 'pending_evaluation'>;
    observationsNote: string;
  }
): PatchTestRecord {
  const now = new Date().toISOString();
  const isAdverse =
    params.result === 'moderate_reaction' || params.result === 'severe_adverse';
  const readiness: PatchTestReadiness = isAdverse
    ? 'contraindicated'
    : 'cleared_for_service';

  // Calculate next review due date based on configured validity days
  const evalDate = new Date(now);
  evalDate.setDate(evalDate.getDate() + record.validityDays);
  const nextReviewDueDate = evalDate.toISOString();

  return PatchTestRecordSchema.parse({
    ...record,
    evaluatedByStaffId: params.evaluatedByStaffId,
    evaluatedAt: now,
    result: params.result,
    readinessStatus: readiness,
    nextReviewDueDate,
    observationsNote: params.observationsNote,
    requiresMedicalReferral: params.result === 'severe_adverse',
    updatedAt: now,
  });
}

/**
 * Assesses whether a client is cleared for a planned appointment requiring a patch test.
 * INVARIANT: Flags missing or expired records without inventing arbitrary medical conclusions.
 */
export function checkServicePatchTestReadiness(params: {
  serviceRequiresPatchTest: boolean;
  appointmentDate: string;
  patchTestRecord?: PatchTestRecord;
}): {
  isCleared: boolean;
  readinessStatus: PatchTestReadiness;
  reason: string;
} {
  if (!params.serviceRequiresPatchTest) {
    return {
      isCleared: true,
      readinessStatus: 'cleared_for_service',
      reason: 'Service does not require a patch test.',
    };
  }

  if (!params.patchTestRecord) {
    return {
      isCleared: false,
      readinessStatus: 'missing_test_record',
      reason: 'A documented patch test is required before this service can be performed.',
    };
  }

  const { result, readinessStatus, nextReviewDueDate, productName } = params.patchTestRecord;

  if (result === 'pending_evaluation') {
    return {
      isCleared: false,
      readinessStatus: 'pending_evaluation',
      reason: `Patch test for ${productName} is still pending professional evaluation.`,
    };
  }

  if (readinessStatus === 'contraindicated') {
    return {
      isCleared: false,
      readinessStatus: 'contraindicated',
      reason: `Patch test showed reaction (${result}). Service is contraindicated with ${productName}.`,
    };
  }

  if (nextReviewDueDate && new Date(params.appointmentDate) > new Date(nextReviewDueDate)) {
    return {
      isCleared: false,
      readinessStatus: 'expired_test_record',
      reason: `Patch test for ${productName} passed its review date (${new Date(
        nextReviewDueDate
      ).toLocaleDateString()}). A new patch test is required.`,
    };
  }

  return {
    isCleared: true,
    readinessStatus: 'cleared_for_service',
    reason: `Valid negative patch test on file for ${productName}. Cleared for service.`,
  };
}
