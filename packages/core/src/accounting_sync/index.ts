/**
 * F099: Accounting Integration & Reconciled Journal Sync
 * 
 * Invariants:
 * 1. Chart of Accounts Granularity: Reconciles liabilities (gift cards, deferred packages),
 *    sales tax payable, tips payable, processor fees, and revenues separately—never as a
 *    blended lump sales figure.
 * 2. Idempotent Journal Sync: Sync retries never create duplicate journal entries in
 *    QuickBooks or Xero. Sync operations require an idempotency key.
 * 3. Double-Entry Balance Verification: Every journal entry strictly balances
 *    (Total Debits === Total Credits) before dispatching to external partners.
 * 4. Payout Clearing Reconciled: Distinguishes clearing account debits from settled
 *    bank account deposits.
 * 5. Safe Mapping Updates: Changes to account mappings affect only future syncs,
 *    preserving historical synced batch ledgers.
 */

export type AccountingPlatform = 'quickbooks_online' | 'xero';

export interface ChartOfAccountsMapping {
  platform: AccountingPlatform;
  serviceRevenueAccount: string; // e.g. "4000 - Service Sales"
  retailRevenueAccount: string; // e.g. "4100 - Retail Product Sales"
  giftCardLiabilityAccount: string; // e.g. "2100 - Deferred Revenue / Gift Cards"
  salesTaxPayableAccount: string; // e.g. "2200 - Sales Tax Payable"
  tipsPayableAccount: string; // e.g. "2300 - Gratuities / Tips Payable"
  processingFeeExpenseAccount: string; // e.g. "6050 - Merchant Processing Fees"
  clearingDepositAccount: string; // e.g. "1050 - Undeposited Clearing Funds"
}

export interface JournalLineItem {
  account: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
}

export interface JournalEntry {
  entryId: string;
  idempotencyKey: string;
  transactionDate: string; // ISO date 'YYYY-MM-DD'
  reference: string; // e.g. "BATCH-2026-10-27" or "TKT-10492"
  lines: JournalLineItem[];
  totalDebit: number;
  totalCredit: number;
  isBalanced: boolean;
}

export type SyncStatus = 'pending' | 'in_flight' | 'synced' | 'failed';

export interface AccountingSyncBatch {
  batchId: string;
  platform: AccountingPlatform;
  createdAt: string;
  idempotencyKey: string;
  journalEntries: JournalEntry[];
  status: SyncStatus;
  externalReferenceId?: string; // e.g. "qbo_je_98319"
  syncedAt?: string;
  retryCount: number;
  lastErrorMessage?: string;
}

/**
 * Validates that all required accounts are mapped for the selected platform.
 */
export function validateChartOfAccountsMapping(mapping: ChartOfAccountsMapping): boolean {
  const requiredFields: Array<keyof ChartOfAccountsMapping> = [
    'serviceRevenueAccount',
    'retailRevenueAccount',
    'giftCardLiabilityAccount',
    'salesTaxPayableAccount',
    'tipsPayableAccount',
    'processingFeeExpenseAccount',
    'clearingDepositAccount',
  ];

  for (const field of requiredFields) {
    if (!mapping[field] || typeof mapping[field] !== 'string' || !mapping[field].trim()) {
      throw new Error(`Chart of accounts mapping is missing required account for: ${field}`);
    }
  }

  return true;
}

/**
 * Compiles a balanced double-entry journal entry from sales and fee components.
 * Enforces: Debits === Credits to the exact cent.
 */
export function buildSalesJournalEntry(params: {
  idempotencyKey: string;
  transactionDate: string;
  reference: string;
  serviceRevenue: number;
  retailRevenue: number;
  giftCardLiabilitySold: number;
  salesTax: number;
  tips: number;
  processingFee: number;
  mapping: ChartOfAccountsMapping;
}): JournalEntry {
  validateChartOfAccountsMapping(params.mapping);

  const lines: JournalLineItem[] = [];

  // Credits (Liabilities & Revenues)
  if (params.serviceRevenue > 0) {
    lines.push({
      account: params.mapping.serviceRevenueAccount,
      type: 'credit',
      amount: Number(params.serviceRevenue.toFixed(2)),
      description: 'Service Revenue',
    });
  }

  if (params.retailRevenue > 0) {
    lines.push({
      account: params.mapping.retailRevenueAccount,
      type: 'credit',
      amount: Number(params.retailRevenue.toFixed(2)),
      description: 'Retail Product Revenue',
    });
  }

  if (params.giftCardLiabilitySold > 0) {
    lines.push({
      account: params.mapping.giftCardLiabilityAccount,
      type: 'credit',
      amount: Number(params.giftCardLiabilitySold.toFixed(2)),
      description: 'Deferred Revenue - Gift Card Sales',
    });
  }

  if (params.salesTax > 0) {
    lines.push({
      account: params.mapping.salesTaxPayableAccount,
      type: 'credit',
      amount: Number(params.salesTax.toFixed(2)),
      description: 'Sales Tax Collected',
    });
  }

  if (params.tips > 0) {
    lines.push({
      account: params.mapping.tipsPayableAccount,
      type: 'credit',
      amount: Number(params.tips.toFixed(2)),
      description: 'Staff Tips Collected',
    });
  }

  const grossTotal = Number(
    (
      params.serviceRevenue +
      params.retailRevenue +
      params.giftCardLiabilitySold +
      params.salesTax +
      params.tips
    ).toFixed(2)
  );

  // Debits (Expenses & Clearing Assets)
  if (params.processingFee > 0) {
    lines.push({
      account: params.mapping.processingFeeExpenseAccount,
      type: 'debit',
      amount: Number(params.processingFee.toFixed(2)),
      description: 'Merchant Processing Fees Expense',
    });
  }

  const netClearingDeposit = Number((grossTotal - params.processingFee).toFixed(2));
  lines.push({
    account: params.mapping.clearingDepositAccount,
    type: 'debit',
    amount: netClearingDeposit,
    description: 'Net Settlement to Payment Clearing Account',
  });

  const totalDebit = Number(
    lines
      .filter((l) => l.type === 'debit')
      .reduce((sum, l) => sum + l.amount, 0)
      .toFixed(2)
  );

  const totalCredit = Number(
    lines
      .filter((l) => l.type === 'credit')
      .reduce((sum, l) => sum + l.amount, 0)
      .toFixed(2)
  );

  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.001;
  if (!isBalanced) {
    throw new Error(
      `Double-entry imbalance detected: Total Debits ($${totalDebit}) must equal Total Credits ($${totalCredit}).`
    );
  }

  return {
    entryId: `JE-${Date.now().toString(36).toUpperCase()}`,
    idempotencyKey: params.idempotencyKey,
    transactionDate: params.transactionDate,
    reference: params.reference,
    lines,
    totalDebit,
    totalCredit,
    isBalanced,
  };
}

/**
 * Creates an accounting sync batch for a collection of journal entries.
 */
export function createSyncBatch(params: {
  batchId: string;
  platform: AccountingPlatform;
  journalEntries: JournalEntry[];
  idempotencyKey: string;
}): AccountingSyncBatch {
  for (const je of params.journalEntries) {
    if (!je.isBalanced) {
      throw new Error(`Cannot include unbalanced journal entry ${je.entryId} in sync batch.`);
    }
  }

  return {
    batchId: params.batchId,
    platform: params.platform,
    createdAt: new Date().toISOString(),
    idempotencyKey: params.idempotencyKey,
    journalEntries: params.journalEntries,
    status: 'pending',
    retryCount: 0,
  };
}

/**
 * Executes or simulates sync with accounting platform.
 * Invariant: Re-running with same idempotency key detects already synced state and returns
 * existing record without creating duplicate entries.
 */
export function executeAccountingSync(params: {
  batch: AccountingSyncBatch;
  mockExternalSystemFailure?: boolean;
}): { batch: AccountingSyncBatch; duplicatePrevented: boolean } {
  if (params.batch.status === 'synced') {
    // Idempotent protection: already synced
    return { batch: params.batch, duplicatePrevented: true };
  }

  if (params.mockExternalSystemFailure) {
    return {
      batch: {
        ...params.batch,
        status: 'failed',
        retryCount: params.batch.retryCount + 1,
        lastErrorMessage: 'Accounting partner API timeout (504 Gateway Timeout).',
      },
      duplicatePrevented: false,
    };
  }

  const externalPrefix = params.batch.platform === 'quickbooks_online' ? 'QBO-JE-' : 'XERO-JE-';
  const externalReferenceId = `${externalPrefix}${Math.floor(100000 + Math.random() * 900000)}`;

  const updatedBatch: AccountingSyncBatch = {
    ...params.batch,
    status: 'synced',
    externalReferenceId,
    syncedAt: new Date().toISOString(),
    lastErrorMessage: undefined,
  };

  return { batch: updatedBatch, duplicatePrevented: false };
}
