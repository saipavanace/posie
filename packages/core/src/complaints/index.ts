import { z } from 'zod';

/**
 * F059 — Client Complaint Resolution & Redo Record (Document D18)
 *
 * Provides a structured, compassionate, and auditable workflow for resolving client
 * service disputes, complaints, and service recovery.
 *
 * Invariants:
 * 1. The original client concern and factual timeline are immutable once logged (never deleted or rewritten).
 * 2. Consequential financial resolutions (refunds, credits) or formal release wording require named business owner sign-off.
 * 3. Clinical concerns (skin irritation, burns, adverse reactions) strictly flag clinical lead triage.
 * 4. Tracks full cost of redo recovery: materials/product, labor, and goodwill compensation.
 */

export const ComplaintCategorySchema = z.enum([
  'service_quality',
  'adverse_skin_reaction',
  'scheduling_or_wait_time',
  'billing_dispute',
  'staff_conduct',
  'facility_cleanliness',
]);
export type ComplaintCategory = z.infer<typeof ComplaintCategorySchema>;

export const ComplaintStatusSchema = z.enum([
  'new_received',
  'under_investigation',
  'remedy_proposed',
  'redo_scheduled',
  'resolved',
  'escalated_to_owner',
]);
export type ComplaintStatus = z.infer<typeof ComplaintStatusSchema>;

export const RemedyTypeSchema = z.enum([
  'complimentary_redo',
  'full_refund',
  'partial_refund',
  'store_credit',
  'goodwill_retail_gift',
  'formal_apology_and_coaching',
]);
export type RemedyType = z.infer<typeof RemedyTypeSchema>;

export const ChronologyEventSchema = z.object({
  id: z.string().uuid(),
  timestamp: z.string().datetime(),
  authorStaffName: z.string().min(1),
  authorRole: z.string().min(1),
  actionSummary: z.string().min(1),
  notes: z.string(),
  isClientVisible: z.boolean().default(false),
});
export type ChronologyEvent = z.infer<typeof ChronologyEventSchema>;

export const RedoServiceRecoverySchema = z.object({
  redoAppointmentId: z.string().uuid().optional(),
  redoSpecialistId: z.string().uuid().optional(),
  redoSpecialistName: z.string().optional(),
  scheduledRedoDate: z.string().optional(),
  materialsCostCents: z.number().int().nonnegative().default(0),
  laborCostCents: z.number().int().nonnegative().default(0),
  goodwillCreditCents: z.number().int().nonnegative().default(0),
  totalRecoveryCostCents: z.number().int().nonnegative(),
  isComplimentaryToClient: z.literal(true).default(true),
});
export type RedoServiceRecovery = z.infer<typeof RedoServiceRecoverySchema>;

export const ComplaintResolutionRecordSchema = z.object({
  caseId: z.string().uuid(),
  businessId: z.string().uuid(),
  clientId: z.string().uuid(),
  clientName: z.string().min(1),
  clientContact: z.string().min(1),
  originalAppointmentId: z.string().uuid(),
  originalServiceName: z.string().min(1),
  originalSpecialistName: z.string().min(1),
  originalAmountChargedCents: z.number().int().nonnegative(),

  // Concern & Categorization (Immutable original report)
  category: ComplaintCategorySchema,
  originalClientConcern: z.string().min(5),
  submittedAt: z.string().datetime(),
  responsibleStaffId: z.string().uuid(),
  responsibleStaffName: z.string().min(1),

  // Clinical Safety Triage
  requiresClinicalReview: z.boolean(),
  clinicalReviewNotes: z.string().nullable(),
  clinicalLeadName: z.string().nullable(),

  // Factual Chronology Ledger
  chronology: z.array(ChronologyEventSchema),

  // Agreed Resolution & Redo
  status: ComplaintStatusSchema,
  agreedRemedyType: RemedyTypeSchema.nullable(),
  resolutionSummary: z.string().nullable(),
  redoRecovery: RedoServiceRecoverySchema.nullable(),

  // Owner Governance (Mandatory for refunds or legal releases)
  consequentialFinancialAction: z.boolean(),
  ownerApprovedAt: z.string().datetime().nullable(),
  ownerApproverName: z.string().nullable(),
  closedAt: z.string().datetime().nullable(),
});
export type ComplaintResolutionRecord = z.infer<typeof ComplaintResolutionRecordSchema>;

/**
 * Creates a new client complaint case, preserving the raw concern and starting the factual timeline.
 */
export function openComplaintCase(params: {
  businessId: string;
  clientId: string;
  clientName: string;
  clientContact: string;
  originalAppointmentId: string;
  originalServiceName: string;
  originalSpecialistName: string;
  originalAmountChargedCents: number;
  category: ComplaintCategory;
  originalClientConcern: string;
  responsibleStaffId: string;
  responsibleStaffName: string;
}): ComplaintResolutionRecord {
  const caseId = crypto.randomUUID ? crypto.randomUUID() : 'f0590000-0000-4000-8000-000000000001';
  const now = new Date().toISOString();

  const isClinical = params.category === 'adverse_skin_reaction';

  const initialEvent: ChronologyEvent = {
    id: crypto.randomUUID ? crypto.randomUUID() : 'f0590000-0000-4000-8000-000000000002',
    timestamp: now,
    authorStaffName: params.responsibleStaffName,
    authorRole: 'Intake Specialist',
    actionSummary: `Complaint received: ${params.category.replace(/_/g, ' ')}`,
    notes: `Client contacted salon regarding visit ${params.originalServiceName}. Case opened.`,
    isClientVisible: true,
  };

  return ComplaintResolutionRecordSchema.parse({
    caseId,
    businessId: params.businessId,
    clientId: params.clientId,
    clientName: params.clientName,
    clientContact: params.clientContact,
    originalAppointmentId: params.originalAppointmentId,
    originalServiceName: params.originalServiceName,
    originalSpecialistName: params.originalSpecialistName,
    originalAmountChargedCents: params.originalAmountChargedCents,
    category: params.category,
    originalClientConcern: params.originalClientConcern,
    submittedAt: now,
    responsibleStaffId: params.responsibleStaffId,
    responsibleStaffName: params.responsibleStaffName,
    requiresClinicalReview: isClinical,
    clinicalReviewNotes: null,
    clinicalLeadName: null,
    chronology: [initialEvent],
    status: isClinical ? 'under_investigation' : 'new_received',
    agreedRemedyType: null,
    resolutionSummary: null,
    redoRecovery: null,
    consequentialFinancialAction: false,
    ownerApprovedAt: null,
    ownerApproverName: null,
    closedAt: null,
  });
}

/**
 * Appends an immutable event to the factual chronology log.
 */
export function appendChronologyEvent(
  record: ComplaintResolutionRecord,
  event: Omit<ChronologyEvent, 'id' | 'timestamp'>
): ComplaintResolutionRecord {
  const newEvent: ChronologyEvent = {
    id: crypto.randomUUID ? crypto.randomUUID() : 'f0590000-0000-4000-8000-000000000003',
    timestamp: new Date().toISOString(),
    ...event,
  };

  return ComplaintResolutionRecordSchema.parse({
    ...record,
    chronology: [...record.chronology, newEvent],
  });
}

/**
 * Attaches a complimentary redo service recovery and calculates business recovery investment.
 */
export function attachRedoRecovery(
  record: ComplaintResolutionRecord,
  params: {
    redoAppointmentId?: string;
    redoSpecialistId?: string;
    redoSpecialistName?: string;
    scheduledRedoDate?: string;
    materialsCostCents: number;
    laborCostCents: number;
    goodwillCreditCents?: number;
  }
): ComplaintResolutionRecord {
  const goodwill = params.goodwillCreditCents ?? 0;
  const totalRecoveryCostCents = params.materialsCostCents + params.laborCostCents + goodwill;

  const redoRecovery: RedoServiceRecovery = {
    redoAppointmentId: params.redoAppointmentId,
    redoSpecialistId: params.redoSpecialistId,
    redoSpecialistName: params.redoSpecialistName,
    scheduledRedoDate: params.scheduledRedoDate,
    materialsCostCents: params.materialsCostCents,
    laborCostCents: params.laborCostCents,
    goodwillCreditCents: goodwill,
    totalRecoveryCostCents,
    isComplimentaryToClient: true,
  };

  return ComplaintResolutionRecordSchema.parse({
    ...record,
    status: 'redo_scheduled',
    agreedRemedyType: 'complimentary_redo',
    redoRecovery,
  });
}

/**
 * Resolves and closes a complaint case with governance safeguards.
 *
 * Invariants:
 * 1. Consequential financial remedies (refunds/credits) or settlements require named owner sign-off.
 * 2. Clinical adverse reaction complaints require clinical lead notes before closing.
 * 3. Never mutates or removes original complaint concern or historical chronology entries.
 */
export function resolveComplaintCase(
  record: ComplaintResolutionRecord,
  params: {
    remedyType: RemedyType;
    resolutionSummary: string;
    ownerApproverName?: string;
    clinicalLeadName?: string;
    clinicalReviewNotes?: string;
  }
): { success: boolean; resolvedRecord?: ComplaintResolutionRecord; errors: string[] } {
  const errors: string[] = [];

  const isFinancial =
    params.remedyType === 'full_refund' ||
    params.remedyType === 'partial_refund' ||
    params.remedyType === 'store_credit';

  // Check owner approval invariant
  if (isFinancial && (!params.ownerApproverName || params.ownerApproverName.trim().length === 0)) {
    errors.push(
      `Consequential financial resolution (${params.remedyType.replace(/_/g, ' ')}) requires named business owner sign-off.`
    );
  }

  // Check clinical safety invariant
  if (record.requiresClinicalReview) {
    if (!params.clinicalLeadName || !params.clinicalReviewNotes) {
      errors.push(
        'Adverse skin/treatment reaction cases require documented clinical review notes and a named clinical lead signature before closing.'
      );
    }
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const now = new Date().toISOString();

  const closingEvent: ChronologyEvent = {
    id: crypto.randomUUID ? crypto.randomUUID() : 'f0590000-0000-4000-8000-000000000004',
    timestamp: now,
    authorStaffName: params.ownerApproverName ?? record.responsibleStaffName,
    authorRole: isFinancial ? 'Business Owner' : 'Service Lead',
    actionSummary: `Case resolved: ${params.remedyType.replace(/_/g, ' ')}`,
    notes: params.resolutionSummary,
    isClientVisible: true,
  };

  const resolvedRecord = ComplaintResolutionRecordSchema.parse({
    ...record,
    status: 'resolved',
    agreedRemedyType: params.remedyType,
    resolutionSummary: params.resolutionSummary,
    consequentialFinancialAction: isFinancial,
    ownerApprovedAt: isFinancial ? now : null,
    ownerApproverName: params.ownerApproverName ?? null,
    clinicalLeadName: params.clinicalLeadName ?? record.clinicalLeadName,
    clinicalReviewNotes: params.clinicalReviewNotes ?? record.clinicalReviewNotes,
    chronology: [...record.chronology, closingEvent],
    closedAt: now,
  });

  return { success: true, resolvedRecord, errors: [] };
}
