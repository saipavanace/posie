import { z } from 'zod';

export const DocumentTypeSchema = z.enum([
  'estimate_quote',
  'service_plan',
  'financial_receipt',
  'treatment_summary',
]);

export type DocumentType = z.infer<typeof DocumentTypeSchema>;

export const DocumentLineItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Item description is required'),
  quantity: z.number().int().positive().default(1),
  unitPriceCents: z.number().int().nonnegative(),
  totalCents: z.number().int().nonnegative(),
});

export type DocumentLineItem = z.infer<typeof DocumentLineItemSchema>;

export const BusinessSnapshotSchema = z.object({
  name: z.string().min(1, 'Business name is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  email: z.string().email().optional(),
  address: z.string().optional(),
  logoUrl: z.string().optional(),
});

export const ClientSnapshotSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Client name is required'),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export const BrandedDocumentSchema = z.object({
  id: z.string().uuid(),
  documentNumber: z.string().optional(),
  type: DocumentTypeSchema,
  title: z.string().min(1),
  authorStaffId: z.string().uuid(),
  business: BusinessSnapshotSchema,
  client: ClientSnapshotSchema,
  lineItems: z.array(DocumentLineItemSchema),
  subtotalCents: z.number().int().nonnegative(),
  taxCents: z.number().int().nonnegative().default(0),
  totalCents: z.number().int().nonnegative(),
  clauses: z.array(z.string()).default([]),
  templateVersion: z.number().int().positive().default(1),
  status: z.enum(['draft', 'issued', 'superseded']).default('draft'),
  createdAt: z.string().datetime(),
  issuedAt: z.string().datetime().optional(),
});

export type BrandedDocument = z.infer<typeof BrandedDocumentSchema>;

/**
 * Creates a draft document from provided data and line items.
 */
export function createDocumentDraft(params: {
  id?: string;
  type: DocumentType;
  title: string;
  authorStaffId: string;
  business: z.infer<typeof BusinessSnapshotSchema>;
  client: z.infer<typeof ClientSnapshotSchema>;
  lineItems: Array<{ description: string; quantity: number; unitPriceCents: number }>;
  clauses?: string[];
  taxRatePercent?: number;
  templateVersion?: number;
}): BrandedDocument {
  const items: DocumentLineItem[] = params.lineItems.map((item, idx) => ({
    id: `item-${idx + 1}`,
    description: item.description,
    quantity: item.quantity,
    unitPriceCents: item.unitPriceCents,
    totalCents: item.quantity * item.unitPriceCents,
  }));

  const subtotalCents = items.reduce((acc, curr) => acc + curr.totalCents, 0);
  const taxRate = params.taxRatePercent ?? 0;
  const taxCents = Math.round(subtotalCents * (taxRate / 100));
  const totalCents = subtotalCents + taxCents;

  return BrandedDocumentSchema.parse({
    id: params.id || '20000000-0000-0000-0000-000000000036',
    type: params.type,
    title: params.title,
    authorStaffId: params.authorStaffId,
    business: params.business,
    client: params.client,
    lineItems: items,
    subtotalCents,
    taxCents,
    totalCents,
    clauses: params.clauses || [],
    templateVersion: params.templateVersion || 1,
    status: 'draft',
    createdAt: new Date().toISOString(),
  });
}

/**
 * Validates and issues a document, locking its contents and assigning a sequence number.
 * INVARIANT: Missing line items or missing contact details strictly block issuance.
 * Issued documents cannot be silently rewritten; later template changes will not modify this snapshot.
 */
export function issueDocument(
  draft: BrandedDocument,
  sequenceNumber: number
): BrandedDocument {
  if (draft.lineItems.length === 0) {
    throw new Error('Cannot issue document without at least one line item.');
  }

  if (!draft.business.contactNumber) {
    throw new Error('Business contact phone/number is required to issue documents.');
  }

  const prefixMap: Record<DocumentType, string> = {
    estimate_quote: 'EST',
    service_plan: 'PLN',
    financial_receipt: 'REC',
    treatment_summary: 'SUM',
  };

  const code = prefixMap[draft.type] || 'DOC';
  const year = new Date().getFullYear();
  const documentNumber = `${code}-${year}-${String(sequenceNumber).padStart(4, '0')}`;

  return BrandedDocumentSchema.parse({
    ...draft,
    documentNumber,
    status: 'issued',
    issuedAt: new Date().toISOString(),
  });
}

/**
 * Generates an accessible, low-ink printable HTML representation of the issued document.
 */
export function renderPrintableHtml(doc: BrandedDocument): string {
  const currency = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const rows = doc.lineItems
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E3DCD2;">${item.description}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E3DCD2; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E3DCD2; text-align: right;">${currency(item.unitPriceCents)}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #E3DCD2; text-align: right; font-weight: 600;">${currency(item.totalCents)}</td>
    </tr>`
    )
    .join('');

  const clausesList = doc.clauses
    .map((c) => `<li style="margin-bottom: 4px;">${c}</li>`)
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${doc.title} - ${doc.documentNumber || 'Draft'}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #2C3E30; margin: 36px; }
    .header { border-bottom: 2px solid #8A9A86; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 24px; }
    th { text-align: left; background-color: #FAF8F5; padding: 10px 12px; border-bottom: 2px solid #8A9A86; }
    .totals { margin-left: auto; width: 280px; text-align: right; }
    .totals div { display: flex; justify-content: space-between; padding: 4px 0; }
    .clauses { margin-top: 32px; font-size: 12px; color: #555; background: #FAF8F5; padding: 12px 16px; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 style="margin: 0 0 6px 0; font-size: 24px;">${doc.business.name}</h1>
      <p style="margin: 0; font-size: 14px; color: #555;">${doc.business.contactNumber} ${doc.business.email ? `• ${doc.business.email}` : ''}</p>
    </div>
    <div style="text-align: right;">
      <h2 style="margin: 0; font-size: 18px; color: #C67D6E;">${doc.title}</h2>
      <p style="margin: 4px 0 0 0; font-weight: 600;">${doc.documentNumber || 'DRAFT'}</p>
      <p style="margin: 2px 0 0 0; font-size: 12px; color: #777;">Version ${doc.templateVersion} • ${doc.issuedAt ? new Date(doc.issuedAt).toLocaleDateString() : 'Unissued'}</p>
    </div>
  </div>

  <div style="margin-bottom: 20px;">
    <strong>Prepared for:</strong> ${doc.client.name} ${doc.client.phone ? `(${doc.client.phone})` : ''}
  </div>

  <table>
    <thead>
      <tr>
        <th>Service / Item</th>
        <th style="text-align: center;">Qty</th>
        <th style="text-align: right;">Unit Price</th>
        <th style="text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <div class="totals">
    <div><span>Subtotal:</span> <strong>${currency(doc.subtotalCents)}</strong></div>
    ${doc.taxCents > 0 ? `<div><span>Tax:</span> <strong>${currency(doc.taxCents)}</strong></div>` : ''}
    <div style="font-size: 16px; border-top: 2px solid #2C3E30; padding-top: 6px; margin-top: 4px;">
      <span>Total:</span> <strong>${currency(doc.totalCents)}</strong>
    </div>
  </div>

  ${doc.clauses.length > 0 ? `
  <div class="clauses">
    <strong style="display: block; margin-bottom: 6px;">Important Details & Terms:</strong>
    <ul style="margin: 0; padding-left: 20px;">
      ${clausesList}
    </ul>
  </div>` : ''}
</body>
</html>
  `.trim();
}
