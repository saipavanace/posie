import { z } from 'zod';

/**
 * F069 — Staff Document Generation (Documents D19, D20)
 *
 * Generates role descriptions, onboarding packets, relationship separation agreements
 * (W-2 Employee vs. 1099 Contractor vs. Booth Renter), and commission earnings statements.
 *
 * Invariants (D19, D20):
 * 1. Relationship Integrity: Strictly differentiates W-2 employees from independent booth renters.
 *    The software does not misclassify worker statutory status or merge separate merchant accounts.
 * 2. Earnings Transparency (D20): Statements clearly distinguish estimated earnings from manager-approved
 *    and paid amounts, and label statements as "earnings details" unless statutory payslips are provided.
 */

export const StaffRelationshipTypeSchema = z.enum([
  'w2_employee',
  'independent_contractor_1099',
  'booth_or_chair_renter',
]);
export type StaffRelationshipType = z.infer<typeof StaffRelationshipTypeSchema>;

export const OnboardingPacketSchema = z.object({
  packetId: z.string().uuid(),
  businessId: z.string().uuid(),
  businessLegalName: z.string().min(1),
  staffId: z.string().uuid(),
  staffLegalName: z.string().min(1),
  relationshipType: StaffRelationshipTypeSchema,
  jobTitle: z.string().min(1),
  jurisdictionState: z.string().length(2), // e.g. "TX"
  professionalLicenseNumber: z.string().nullable(),

  // Agreement Terms
  boothRentalWeeklyFeeCents: z.number().int().nonnegative().nullable(),
  commissionRatePercent: z.number().nonnegative().nullable(),
  hourlyBaseRateCents: z.number().int().nonnegative().nullable(),
  handbookPoliciesAcknowledged: z.array(z.string()).min(1),

  // Signatures & Version
  issuedAt: z.string().datetime(),
  signedAt: z.string().datetime().nullable(),
  clientDataOwnershipNotice: z.string(),
  isIndependentMerchantAccount: z.boolean(),
  status: z.enum(['draft_issued', 'signed_and_active', 'superseded_by_amendment']),
});
export type OnboardingPacket = z.infer<typeof OnboardingPacketSchema>;

export const EarningsLineItemSchema = z.object({
  appointmentId: z.string().uuid().optional(),
  date: z.string(),
  serviceOrItemName: z.string().min(1),
  category: z.enum(['service_commission', 'retail_product_commission', 'client_tips', 'hourly_wages']),
  grossRevenueCents: z.number().int().nonnegative(),
  commissionRatePercent: z.number().nonnegative(),
  earnedCommissionCents: z.number().int().nonnegative(),
});
export type EarningsLineItem = z.infer<typeof EarningsLineItemSchema>;

export const CommissionEarningsStatementSchema = z.object({
  statementId: z.string().uuid(),
  businessId: z.string().uuid(),
  staffId: z.string().uuid(),
  staffName: z.string().min(1),
  payPeriodStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  payPeriodEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  // Earnings Breakdown
  totalServiceRevenueCents: z.number().int().nonnegative(),
  totalServiceCommissionCents: z.number().int().nonnegative(),
  totalRetailCommissionCents: z.number().int().nonnegative(),
  totalClientTipsCents: z.number().int().nonnegative(),
  totalHourlyWagesCents: z.number().int().nonnegative(),
  grossTotalPayableCents: z.number().int().nonnegative(),

  // Status & Approvals
  status: z.enum(['estimated', 'manager_approved', 'paid_and_settled']),
  managerApproverName: z.string().nullable(),
  approvedAt: z.string().datetime().nullable(),
  statutoryPayslipDisclaimer: z.string(),
  lineItems: z.array(EarningsLineItemSchema),
});
export type CommissionEarningsStatement = z.infer<typeof CommissionEarningsStatementSchema>;

export const BOOTH_RENTER_LEGAL_NOTICE =
  'Independent Business Notice: As an independent booth/chair renter, you operate your own business, ' +
  'maintain your own professional liability insurance, and process payments through your own merchant credentials. ' +
  'Posie does not merge your client list or earnings into the host salon entity.';

export const W2_EMPLOYEE_LEGAL_NOTICE =
  'Employee Relationship Notice: As an employee, you are entitled to statutory protections, workers compensation, ' +
  'and employer payroll tax withholdings as defined under state and federal law.';

export const STATUTORY_EARNINGS_DISCLAIMER =
  'This statement reflects internal salon service earnings, tip allocations, and retail commissions. ' +
  'It serves as an earnings detail report and does not substitute for a statutory payroll pay stub with tax withholdings.';

/**
 * Generates an onboarding packet tailored to the worker's explicit legal relationship (Document D19).
 */
export function generateStaffOnboardingPacket(params: {
  businessId: string;
  businessLegalName: string;
  staffId: string;
  staffLegalName: string;
  relationshipType: StaffRelationshipType;
  jobTitle: string;
  jurisdictionState: string;
  professionalLicenseNumber?: string;
  boothRentalWeeklyFeeCents?: number;
  commissionRatePercent?: number;
  hourlyBaseRateCents?: number;
  handbookPoliciesAcknowledged?: string[];
}): OnboardingPacket {
  const packetId = crypto.randomUUID ? crypto.randomUUID() : 'f0690000-0000-4000-8000-000000000001';
  const now = new Date().toISOString();

  const isRenter = params.relationshipType === 'booth_or_chair_renter';

  const defaultPolicies = params.handbookPoliciesAcknowledged ?? [
    'Sanitation & Infection Control Standards',
    'Client Privacy & Photo Consent Policy',
    'Salon Station Cleanliness & Checkout SOP',
  ];

  return OnboardingPacketSchema.parse({
    packetId,
    businessId: params.businessId,
    businessLegalName: params.businessLegalName,
    staffId: params.staffId,
    staffLegalName: params.staffLegalName,
    relationshipType: params.relationshipType,
    jobTitle: params.jobTitle,
    jurisdictionState: params.jurisdictionState.toUpperCase(),
    professionalLicenseNumber: params.professionalLicenseNumber ?? null,
    boothRentalWeeklyFeeCents: isRenter ? (params.boothRentalWeeklyFeeCents ?? 25000) : null,
    commissionRatePercent: isRenter ? null : (params.commissionRatePercent ?? 50),
    hourlyBaseRateCents: params.relationshipType === 'w2_employee' ? (params.hourlyBaseRateCents ?? 1800) : null,
    handbookPoliciesAcknowledged: defaultPolicies,
    issuedAt: now,
    signedAt: null,
    clientDataOwnershipNotice: isRenter ? BOOTH_RENTER_LEGAL_NOTICE : W2_EMPLOYEE_LEGAL_NOTICE,
    isIndependentMerchantAccount: isRenter,
    status: 'draft_issued',
  });
}

/**
 * Signs and activates the staff onboarding packet.
 */
export function signStaffOnboardingPacket(
  packet: OnboardingPacket,
  clientSignatureName: string
): OnboardingPacket {
  if (clientSignatureName.trim().length === 0) {
    throw new Error('Valid signature required to activate staff onboarding packet.');
  }

  return OnboardingPacketSchema.parse({
    ...packet,
    status: 'signed_and_active',
    signedAt: new Date().toISOString(),
  });
}

/**
 * Generates an auditable commission & earnings statement (Document D20).
 */
export function generateCommissionEarningsStatement(params: {
  businessId: string;
  staffId: string;
  staffName: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  lineItems: EarningsLineItem[];
}): CommissionEarningsStatement {
  const statementId = crypto.randomUUID ? crypto.randomUUID() : 'f0690000-0000-4000-8000-000000000002';

  let totalServiceRevenueCents = 0;
  let totalServiceCommissionCents = 0;
  let totalRetailCommissionCents = 0;
  let totalClientTipsCents = 0;
  let totalHourlyWagesCents = 0;

  for (const item of params.lineItems) {
    if (item.category === 'service_commission') {
      totalServiceRevenueCents += item.grossRevenueCents;
      totalServiceCommissionCents += item.earnedCommissionCents;
    } else if (item.category === 'retail_product_commission') {
      totalRetailCommissionCents += item.earnedCommissionCents;
    } else if (item.category === 'client_tips') {
      totalClientTipsCents += item.earnedCommissionCents;
    } else if (item.category === 'hourly_wages') {
      totalHourlyWagesCents += item.earnedCommissionCents;
    }
  }

  const grossTotalPayableCents =
    totalServiceCommissionCents +
    totalRetailCommissionCents +
    totalClientTipsCents +
    totalHourlyWagesCents;

  return CommissionEarningsStatementSchema.parse({
    statementId,
    businessId: params.businessId,
    staffId: params.staffId,
    staffName: params.staffName,
    payPeriodStart: params.payPeriodStart,
    payPeriodEnd: params.payPeriodEnd,
    totalServiceRevenueCents,
    totalServiceCommissionCents,
    totalRetailCommissionCents,
    totalClientTipsCents,
    totalHourlyWagesCents,
    grossTotalPayableCents,
    status: 'estimated',
    managerApproverName: null,
    approvedAt: null,
    statutoryPayslipDisclaimer: STATUTORY_EARNINGS_DISCLAIMER,
    lineItems: params.lineItems,
  });
}

/**
 * Approves a commission earnings statement for payroll distribution.
 */
export function approveCommissionStatement(
  statement: CommissionEarningsStatement,
  managerName: string
): CommissionEarningsStatement {
  return CommissionEarningsStatementSchema.parse({
    ...statement,
    status: 'manager_approved',
    managerApproverName: managerName,
    approvedAt: new Date().toISOString(),
  });
}
