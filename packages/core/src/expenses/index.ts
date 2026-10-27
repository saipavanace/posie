import { z } from 'zod';

export const ExpenseCategorySchema = z.enum([
  'supplies_retail',
  'backbar_supplies',
  'equipment_maintenance',
  'software_tech',
  'marketing_ads',
  'rent_utilities',
  'education_licensing',
  'other',
]);

export type ExpenseCategory = z.infer<typeof ExpenseCategorySchema>;

export const ExpensePaymentMethodSchema = z.enum([
  'business_card',
  'petty_cash',
  'staff_reimbursement',
]);

export type ExpensePaymentMethod = z.infer<typeof ExpensePaymentMethodSchema>;

export const BusinessExpenseSchema = z.object({
  id: z.string().uuid(),
  expenseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD required'),
  merchantName: z.string().min(1, 'Merchant name is required'),
  category: ExpenseCategorySchema,
  businessPurpose: z.string().min(1, 'Business purpose is required'),
  amountCents: z.number().int().positive(),
  taxCents: z.number().int().nonnegative().default(0),
  receiptAttachmentUrl: z.string().url().optional(),
  paymentMethod: ExpensePaymentMethodSchema,
  recordedByStaffId: z.string().uuid(),
  isReimbursed: z.boolean().default(false),
  taxDisclaimer: z.string().default(
    'Expense records and categories are for studio bookkeeping management only and do not constitute formal tax or accounting advice.'
  ),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type BusinessExpense = z.infer<typeof BusinessExpenseSchema>;

export interface DuplicateDetectionResult {
  hasPotentialDuplicate: boolean;
  matchedExpense?: BusinessExpense;
  warningPrompt?: string;
}

/**
 * Checks if a candidate expense is a likely duplicate of an existing record.
 * INVARIANT (F056): Duplicate detection flags same merchant, identical amount, and near date (+/- 2 days).
 */
export function checkDuplicateExpense(
  candidate: {
    merchantName: string;
    amountCents: number;
    expenseDate: string;
  },
  existingExpenses: BusinessExpense[]
): DuplicateDetectionResult {
  const candidateDateMs = new Date(candidate.expenseDate).getTime();
  const twoDaysMs = 2 * 24 * 60 * 60 * 1000;

  for (const existing of existingExpenses) {
    const isSameAmount = existing.amountCents === candidate.amountCents;
    const isSameMerchant =
      existing.merchantName.trim().toLowerCase() ===
      candidate.merchantName.trim().toLowerCase();

    const existingDateMs = new Date(existing.expenseDate).getTime();
    const dateDiff = Math.abs(candidateDateMs - existingDateMs);
    const isNearDate = dateDiff <= twoDaysMs;

    if (isSameAmount && isSameMerchant && isNearDate) {
      return {
        hasPotentialDuplicate: true,
        matchedExpense: existing,
        warningPrompt: `Potential duplicate detected: An expense for $${(
          existing.amountCents / 100
        ).toFixed(2)} at "${existing.merchantName}" was already recorded on ${
          existing.expenseDate
        }.`,
      };
    }
  }

  return { hasPotentialDuplicate: false };
}

/**
 * Records a verified business expense with receipt attachment.
 */
export function recordBusinessExpense(params: {
  id?: string;
  expenseDate: string;
  merchantName: string;
  category: ExpenseCategory;
  businessPurpose: string;
  amountCents: number;
  taxCents?: number;
  receiptAttachmentUrl?: string;
  paymentMethod: ExpensePaymentMethod;
  recordedByStaffId: string;
  isReimbursed?: boolean;
}): BusinessExpense {
  const now = new Date().toISOString();
  return BusinessExpenseSchema.parse({
    id: params.id || '30303030-0000-0000-0000-000000000056',
    expenseDate: params.expenseDate,
    merchantName: params.merchantName,
    category: params.category,
    businessPurpose: params.businessPurpose,
    amountCents: params.amountCents,
    taxCents: params.taxCents ?? 0,
    receiptAttachmentUrl: params.receiptAttachmentUrl,
    paymentMethod: params.paymentMethod,
    recordedByStaffId: params.recordedByStaffId,
    isReimbursed: params.isReimbursed || false,
    createdAt: now,
    updatedAt: now,
  });
}
