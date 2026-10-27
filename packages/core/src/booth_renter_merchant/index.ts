/**
 * F140 — Booth Renter Merchant Separation
 *
 * Implements independent merchant architecture for 1099 booth and chair renters
 * with separate Stripe Connect destination payouts, distinct customer ownership,
 * and a unified in-salon client checkout experience.
 *
 * KEY INVARIANT (Basis: B; WB F37, Legal Entity & Merchant Separation):
 * Legal Entity Autonomy & Zero Co-Mingling.
 * "Shared checkout does not mix legal ownership or bank balances."
 * When a client checks out at the studio front desk, funds for booth renter services
 * route directly to the independent contractor's dedicated merchant account via destination
 * charges. The salon owner never co-mingles or withholds renter service revenue.
 * Customer records and clinical charts remain the exclusive property of the independent practitioner.
 */

export interface BoothRenterMerchantProfile {
  renterId: string;
  practitionerName: string;
  businessEntityName: string; // e.g. 'Sienna Woods Esthetics LLC'
  stripeConnectAccountId: string; // e.g. 'acct_renter_99182'
  payoutStatus: 'active_verified' | 'onboarding_incomplete' | 'restricted';
  facilityRentAgreementType: 'fixed_weekly_booth_rent' | 'percentage_facility_fee';
  facilityFeePercentage?: number; // e.g. 10%
  fixedRentBalanceDueUSD: number;
  isClientDataFirewalled: boolean;
}

export interface SplitMerchantCheckoutLine {
  serviceId: string;
  serviceName: string;
  practitionerId: string;
  isIndependentBoothRenter: boolean;
  renterConnectAccountId?: string;
  serviceAmountUSD: number;
  tipAmountUSD: number;
}

export interface BoothRenterPayoutSplitResult {
  totalCustomerPaidUSD: number;
  renterGrossAmountUSD: number;
  renterTipsUSD: number;
  facilityFeeDeductionUSD: number;
  renterDirectNetTransferUSD: number;
  salonOperatingRevenueUSD: number;
  destinationStripeAccountId: string;
  coMinglingPrevented: boolean;
  auditExplanation: string;
}

/**
 * Calculates a non-co-mingled destination payment split for an independent booth renter.
 */
export function calculateBoothRenterSplit(
  line: SplitMerchantCheckoutLine,
  renterProfile: BoothRenterMerchantProfile
): BoothRenterPayoutSplitResult {
  if (!line.isIndependentBoothRenter) {
    throw new Error('Line item is not attributed to an independent booth renter.');
  }

  if (renterProfile.payoutStatus !== 'active_verified') {
    throw new Error(
      `Cannot execute destination payout: Renter Stripe Connect account status is '${renterProfile.payoutStatus}'.`
    );
  }

  const grossService = line.serviceAmountUSD;
  const tips = line.tipAmountUSD;
  const totalCustomerPaidUSD = Math.round((grossService + tips) * 100) / 100;

  // Calculate salon facility fee if applicable
  let facilityFeeDeductionUSD = 0;
  if (renterProfile.facilityRentAgreementType === 'percentage_facility_fee' && renterProfile.facilityFeePercentage) {
    facilityFeeDeductionUSD = Math.round(grossService * (renterProfile.facilityFeePercentage / 100) * 100) / 100;
  }

  // Tips 100% belong to the practitioner and are never subject to salon facility fees
  const renterDirectNetTransferUSD = Math.round((grossService - facilityFeeDeductionUSD + tips) * 100) / 100;
  const salonOperatingRevenueUSD = facilityFeeDeductionUSD;

  return {
    totalCustomerPaidUSD,
    renterGrossAmountUSD: grossService,
    renterTipsUSD: tips,
    facilityFeeDeductionUSD,
    renterDirectNetTransferUSD,
    salonOperatingRevenueUSD,
    destinationStripeAccountId: renterProfile.stripeConnectAccountId,
    coMinglingPrevented: true,
    auditExplanation: `WB F140 Invariant: $${renterDirectNetTransferUSD.toFixed(2)} routed directly to ${renterProfile.businessEntityName} (${renterProfile.stripeConnectAccountId}). Salon retained $${salonOperatingRevenueUSD.toFixed(2)} facility fee. Funds were never co-mingled in salon operating accounts.`,
  };
}

/**
 * Verifies whether salon management is authorized to access a booth renter's private client.
 */
export function checkBoothRenterClientAccess(
  clientId: string,
  clientAttributedRenterId: string,
  requestorUserId: string,
  isSalonOwner: boolean
): { isAccessGranted: boolean; reason: string } {
  if (requestorUserId === clientAttributedRenterId) {
    return { isAccessGranted: true, reason: 'Renter viewing their own proprietary client record.' };
  }

  if (isSalonOwner) {
    return {
      isAccessGranted: false,
      reason:
        'WB F140 / Rule DR04 Invariant: Booth renters legally own their client lists. Salon management is firewalled from exporting or viewing independent contractor client books.',
    };
  }

  return { isAccessGranted: false, reason: 'Access denied: Unassociated staff member.' };
}
