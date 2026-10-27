import { z } from 'zod';

export const ServiceDomainSchema = z.enum([
  'facial',
  'lash',
  'brow',
  'hair',
  'massage',
  'general',
]);

export type ServiceDomain = z.infer<typeof ServiceDomainSchema>;

export const ProductUsedSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  brand: z.string().optional(),
  lotOrBatchNumber: z.string().optional(),
  amountUsed: z.string().optional(), // e.g. "2 pumps", "10ml"
});

export type ProductUsed = z.infer<typeof ProductUsedSchema>;

export const NoteAmendmentSchema = z.object({
  id: z.string().uuid(),
  amendedAt: z.string().datetime(),
  amendedByStaffId: z.string().uuid(),
  reason: z.string().min(1, 'Amendment reason is required'),
  contentAddition: z.string().min(1, 'Amendment content is required'),
});

export type NoteAmendment = z.infer<typeof NoteAmendmentSchema>;

export const SoapRecordSchema = z.object({
  subjective: z.string().min(1, 'Subjective notes required'),
  objective: z.string().min(1, 'Objective findings required'),
  assessment: z.string().min(1, 'Assessment analysis required'),
  plan: z.string().min(1, 'Plan and follow-up direction required'),
});

export type SoapRecord = z.infer<typeof SoapRecordSchema>;

export const TreatmentNoteSchema = z.object({
  id: z.string().uuid(),
  appointmentId: z.string().uuid(),
  clientId: z.string().uuid(),
  serviceId: z.string().uuid(),
  domain: ServiceDomainSchema,
  authorStaffId: z.string().uuid(),
  status: z.enum(['draft', 'signed']),
  soap: SoapRecordSchema,
  productsUsed: z.array(ProductUsedSchema).default([]),
  clientStatedResponse: z.string().optional(),
  adverseReactionsReported: z.boolean().default(false),
  reactionsNote: z.string().optional(),
  signedByStaffId: z.string().uuid().optional(),
  signedAt: z.string().datetime().optional(),
  amendments: z.array(NoteAmendmentSchema).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type TreatmentNote = z.infer<typeof TreatmentNoteSchema>;

/**
 * Creates a treatment note draft.
 */
export function createTreatmentNoteDraft(params: {
  id?: string;
  appointmentId: string;
  clientId: string;
  serviceId: string;
  domain: ServiceDomain;
  authorStaffId: string;
  soap: SoapRecord;
  productsUsed?: ProductUsed[];
  clientStatedResponse?: string;
  adverseReactionsReported?: boolean;
  reactionsNote?: string;
}): TreatmentNote {
  const now = new Date().toISOString();
  return TreatmentNoteSchema.parse({
    id: params.id || '50000000-0000-0000-0000-000000000038',
    appointmentId: params.appointmentId,
    clientId: params.clientId,
    serviceId: params.serviceId,
    domain: params.domain,
    authorStaffId: params.authorStaffId,
    status: 'draft',
    soap: params.soap,
    productsUsed: params.productsUsed || [],
    clientStatedResponse: params.clientStatedResponse,
    adverseReactionsReported: params.adverseReactionsReported || false,
    reactionsNote: params.reactionsNote,
    amendments: [],
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Signs and finalizes a treatment note.
 * INVARIANT: Once signed, the note is legally locked.
 * Future edits cannot mutate the original text; amendments must be appended.
 */
export function signTreatmentNote(
  note: TreatmentNote,
  signerStaffId: string
): TreatmentNote {
  if (note.status === 'signed') {
    throw new Error('This treatment note has already been signed and finalized.');
  }

  const now = new Date().toISOString();
  return TreatmentNoteSchema.parse({
    ...note,
    status: 'signed',
    signedByStaffId: signerStaffId,
    signedAt: now,
    updatedAt: now,
  });
}

/**
 * Appends an audit-logged amendment to an already signed treatment note.
 * INVARIANT: Never overwrites historical signed notes. Appends with author, timestamp, and justification.
 */
export function addNoteAmendment(
  note: TreatmentNote,
  params: {
    id?: string;
    amendedByStaffId: string;
    reason: string;
    contentAddition: string;
  }
): TreatmentNote {
  if (note.status !== 'signed') {
    throw new Error('Amendments are only for finalized, signed records. For drafts, edit directly.');
  }

  const now = new Date().toISOString();
  const amendment: NoteAmendment = {
    id: params.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : '91919191-9191-9191-9191-919191919191'),
    amendedAt: now,
    amendedByStaffId: params.amendedByStaffId,
    reason: params.reason,
    contentAddition: params.contentAddition,
  };

  return TreatmentNoteSchema.parse({
    ...note,
    amendments: [...note.amendments, amendment],
    updatedAt: now,
  });
}
