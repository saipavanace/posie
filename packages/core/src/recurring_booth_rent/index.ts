/**
 * F198: Recurring Booth and Chair Rent
 *
 * Manages 1099 independent contractor renter agreements, recurring rent schedules (weekly, bi-weekly, monthly),
 * segregated security deposits, invoices, partial payments, and ledger balances.
 * Invariant: Security deposits stay segregated from operational rent; independent renter client data
 * and financial processing remain strictly separated from the salon owner's merchant account.
 */

export type RentBillingCadence = 'weekly' | 'bi_weekly' | 'monthly';

export interface BoothRenterAgreement {
  agreementId: string;
  renterId: string;
  renterFullName: string;
  renterBusinessName: string;
  chairOrBoothIdentifier: string;
  billingCadence: RentBillingCadence;
  rentAmountUsd: number;
  securityDepositHeldUsd: number;
  leaseStartDate: string;
  leaseEndDate?: string;
  gracePeriodDays: number;
  lateFeeFlatUsd: number;
  status: 'active' | 'suspended' | 'terminated';
}

export interface RentInvoiceRecord {
  rentInvoiceId: string;
  agreementId: string;
  renterId: string;
  rentalPeriodStart: string;
  rentalPeriodEnd: string;
  rentDueAmountUsd: number;
  amountPaidUsd: number;
  remainingBalanceUsd: number;
  lateFeeAssessedUsd: number;
  dueDate: string;
  isPastDue: boolean;
  status: 'pending' | 'partially_paid' | 'paid_in_full' | 'past_due';
}

export interface RentStatementSummary {
  renterId: string;
  renterFullName: string;
  chairIdentifier: string;
  totalRentBilledUsd: number;
  totalRentPaidUsd: number;
  currentOutstandingBalanceUsd: number;
  segregatedSecurityDepositUsd: number;
  activeInvoicesCount: number;
  pastDueInvoicesCount: number;
}

/**
 * Generates an automated recurring rent invoice for a named booth/chair renter.
 */
export function generateRentInvoice(
  agreement: BoothRenterAgreement,
  periodStart: string,
  periodEnd: string,
  dueDate: string,
  currentDate = new Date().toISOString().split('T')[0]
): RentInvoiceRecord {
  const isPastDue = currentDate > dueDate;
  const lateFeeAssessedUsd = isPastDue ? agreement.lateFeeFlatUsd : 0;
  const totalDue = agreement.rentAmountUsd + lateFeeAssessedUsd;

  return {
    rentInvoiceId: `rnt_inv_${agreement.renterId}_${periodStart}`,
    agreementId: agreement.agreementId,
    renterId: agreement.renterId,
    rentalPeriodStart: periodStart,
    rentalPeriodEnd: periodEnd,
    rentDueAmountUsd: totalDue,
    amountPaidUsd: 0,
    remainingBalanceUsd: totalDue,
    lateFeeAssessedUsd,
    dueDate,
    isPastDue,
    status: isPastDue ? 'past_due' : 'pending',
  };
}

/**
 * Applies a payment against a booth rent invoice, properly reconciling partial balances.
 */
export function recordRentPayment(
  invoice: RentInvoiceRecord,
  paymentAmount: number
): RentInvoiceRecord {
  if (paymentAmount <= 0) {
    throw new Error('Payment amount must be greater than zero.');
  }

  const updatedPaid = Math.round((invoice.amountPaidUsd + paymentAmount) * 100) / 100;
  const updatedRemaining = Math.max(0, Math.round((invoice.rentDueAmountUsd - updatedPaid) * 100) / 100);

  let status: RentInvoiceRecord['status'] = 'partially_paid';
  if (updatedRemaining === 0) {
    status = 'paid_in_full';
  } else if (invoice.isPastDue && updatedRemaining > 0) {
    status = 'past_due';
  }

  return {
    ...invoice,
    amountPaidUsd: updatedPaid,
    remainingBalanceUsd: updatedRemaining,
    status,
  };
}

/**
 * Produces an itemized rent statement summary for a booth renter,
 * proving that security deposits remain segregated and protected from operational rent.
 */
export function generateRenterStatement(
  agreement: BoothRenterAgreement,
  invoices: RentInvoiceRecord[]
): RentStatementSummary {
  const matching = invoices.filter((inv) => inv.agreementId === agreement.agreementId);

  const totalRentBilledUsd = matching.reduce((sum, inv) => sum + inv.rentDueAmountUsd, 0);
  const totalRentPaidUsd = matching.reduce((sum, inv) => sum + inv.amountPaidUsd, 0);
  const currentOutstandingBalanceUsd = matching.reduce((sum, inv) => sum + inv.remainingBalanceUsd, 0);
  const pastDueInvoicesCount = matching.filter((inv) => inv.status === 'past_due' || (inv.isPastDue && inv.remainingBalanceUsd > 0)).length;

  return {
    renterId: agreement.renterId,
    renterFullName: agreement.renterFullName,
    chairIdentifier: agreement.chairOrBoothIdentifier,
    totalRentBilledUsd: Math.round(totalRentBilledUsd * 100) / 100,
    totalRentPaidUsd: Math.round(totalRentPaidUsd * 100) / 100,
    currentOutstandingBalanceUsd: Math.round(currentOutstandingBalanceUsd * 100) / 100,
    segregatedSecurityDepositUsd: agreement.securityDepositHeldUsd,
    activeInvoicesCount: matching.length,
    pastDueInvoicesCount,
  };
}
