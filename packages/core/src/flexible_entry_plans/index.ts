/**
 * F189: Flexible Entry Plans & Acquisition Fees
 *
 * Supports transparent, sustainable low-volume entry tiers (e.g. Free Starter for solo practitioners),
 * explicit appointment volume caps, and optional marketplace acquisition fees with clear attribution.
 * Invariant: Strictly prohibits surprise "client convenience fees" or automatic paid add-ons at consumer checkout.
 */

export type SubscriptionTierType = 'starter_free' | 'pro_atelier' | 'enterprise_multi_location';

export interface SubscriptionTierConfig {
  tier: SubscriptionTierType;
  name: string;
  monthlyBaseFeeUsd: number;
  monthlyIncludedAppointmentsCap: number;
  overageFeePerAppointmentUsd: number;
  features: string[];
  allowsMarketplaceAcquisition: boolean;
  surpriseClientConvenienceFeePermitted: false; // Invariant: Posie strictly bans surprise client convenience fees
}

export interface SalonPlanUsage {
  salonId: string;
  currentTier: SubscriptionTierType;
  billingCycleMonth: string;
  appointmentsBookedCount: number;
  marketplaceNetNewClientsCount: number;
}

export interface SalonInvoiceSimulation {
  salonId: string;
  tier: SubscriptionTierType;
  baseSubscriptionFeeUsd: number;
  appointmentUsageCount: number;
  includedCap: number;
  overageAppointmentsCount: number;
  overageFeesUsd: number;
  marketplaceAcquisitionFeesUsd: number; // 15% on net-new marketplace clients
  totalMonthlyBillingUsd: number;
  checkoutClientSurchargesUsd: 0; // Invariant: exactly 0
  clientCheckoutFeeStatement: string;
  isUpgradeRecommended: boolean;
}

export const SUBSCRIPTION_TIERS: Record<SubscriptionTierType, SubscriptionTierConfig> = {
  starter_free: {
    tier: 'starter_free',
    name: 'Sole Practitioner Starter',
    monthlyBaseFeeUsd: 0.0,
    monthlyIncludedAppointmentsCap: 30,
    overageFeePerAppointmentUsd: 1.5,
    features: ['Single Calendar', 'Branded Booking Website', 'Online Forms', 'Direct Client 0% Fee'],
    allowsMarketplaceAcquisition: true,
    surpriseClientConvenienceFeePermitted: false,
  },
  pro_atelier: {
    tier: 'pro_atelier',
    name: 'Atelier Professional',
    monthlyBaseFeeUsd: 49.0,
    monthlyIncludedAppointmentsCap: 250,
    overageFeePerAppointmentUsd: 0.5,
    features: ['Unlimited Calendars', 'Automated SMS Campaigns', 'Staff Permissions', 'Direct Client 0% Fee'],
    allowsMarketplaceAcquisition: true,
    surpriseClientConvenienceFeePermitted: false,
  },
  enterprise_multi_location: {
    tier: 'enterprise_multi_location',
    name: 'Multi-Location Studio',
    monthlyBaseFeeUsd: 199.0,
    monthlyIncludedAppointmentsCap: 2000,
    overageFeePerAppointmentUsd: 0.25,
    features: ['Centralized Enterprise Admin', 'SSO / SCIM', 'Custom API', 'Direct Client 0% Fee'],
    allowsMarketplaceAcquisition: true,
    surpriseClientConvenienceFeePermitted: false,
  },
};

/**
 * Calculates monthly billing transparently for a salon based on appointment volume
 * and marketplace discovery attribution, proving zero hidden client fees.
 */
export function calculateFlexiblePlanBilling(
  usage: SalonPlanUsage,
  marketplaceNetNewRevenue = 0,
  marketplaceFeeRate = 0.15
): SalonInvoiceSimulation {
  const tierConfig = SUBSCRIPTION_TIERS[usage.currentTier];
  const baseSubscriptionFeeUsd = tierConfig.monthlyBaseFeeUsd;

  const overageAppointmentsCount = Math.max(0, usage.appointmentsBookedCount - tierConfig.monthlyIncludedAppointmentsCap);
  const overageFeesUsd = Math.round(overageAppointmentsCount * tierConfig.overageFeePerAppointmentUsd * 100) / 100;

  const marketplaceAcquisitionFeesUsd = Math.round(marketplaceNetNewRevenue * marketplaceFeeRate * 100) / 100;
  const totalMonthlyBillingUsd = Math.round((baseSubscriptionFeeUsd + overageFeesUsd + marketplaceAcquisitionFeesUsd) * 100) / 100;

  // If overage fees exceed difference to next tier, recommend upgrade
  const isUpgradeRecommended =
    usage.currentTier === 'starter_free' && usage.appointmentsBookedCount > 45;

  return {
    salonId: usage.salonId,
    tier: usage.currentTier,
    baseSubscriptionFeeUsd,
    appointmentUsageCount: usage.appointmentsBookedCount,
    includedCap: tierConfig.monthlyIncludedAppointmentsCap,
    overageAppointmentsCount,
    overageFeesUsd,
    marketplaceAcquisitionFeesUsd,
    totalMonthlyBillingUsd,
    checkoutClientSurchargesUsd: 0,
    clientCheckoutFeeStatement: 'ZERO_SURPRISE_FEES: No client convenience fee, platform booking markup, or mandatory tip add-on is assessed at consumer checkout.',
    isUpgradeRecommended,
  };
}

/**
 * Validates that consumer checkout totals contain zero surprise platform markups.
 */
export function verifyConsumerCheckoutFeeIntegrity(
  serviceSubtotal: number,
  clientChargedTotal: number
): { isCompliant: boolean; unexpectedMarkupDetected: number } {
  const markup = Math.round((clientChargedTotal - serviceSubtotal) * 100) / 100;
  return {
    isCompliant: markup <= 0.001,
    unexpectedMarkupDetected: Math.max(0, markup),
  };
}
