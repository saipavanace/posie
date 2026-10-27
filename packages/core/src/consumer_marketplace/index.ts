/**
 * Posie Core Engine - Consumer Discovery Marketplace (F177)
 *
 * Implements opt-in marketplace listings, strict direct vs. marketplace attribution,
 * zero-commission protection for existing clients, and auditable attribution disputes.
 *
 * Domain Invariant (Basis: Validate separately (V); NET OPS DATA, WB F177, Rule F177, Table 91):
 * Providers can use Posie direct booking without ever buying marketplace distribution.
 * Marketplace listings are strictly opt-in. Provenance tracking transparently distinguishes
 * a salon's direct clients (0% fee) from net-new marketplace discovery (explicit commission).
 * Direct branded booking journeys never display competitor ads or poach clients.
 * Attribution disputes allow providers to present referral evidence and appeal fees.
 */

export interface MarketplaceListing {
  listingId: string;
  salonId: string;
  businessName: string;
  locationCity: string;
  isOptedIn: boolean;
  publishedCategories: string[];
  commissionRatePercentage: number; // e.g. 15% on net-new discovery only
  listedAt?: string;
}

export interface BookingAttributionInput {
  bookingId: string;
  salonId: string;
  clientId: string;
  bookingAmount: number;
  referralSource: 'direct_brand_url' | 'salon_qr_code' | 'posie_marketplace_search';
  referralToken?: string;
}

export interface AttributionEvaluation {
  bookingId: string;
  clientId: string;
  attributionSource: 'direct_pro_client' | 'marketplace_discovery';
  isNetNewDiscovery: boolean;
  commissionPercentage: number;
  commissionAmountOwed: number;
  payoutToSalon: number;
  attributionEvidence: string;
  disputeAvailable: boolean;
}

export interface AttributionDisputeCase {
  disputeId: string;
  bookingId: string;
  salonId: string;
  proEvidenceToken: string;
  disputeReason: string;
  status: 'under_review' | 'resolved_salon_favor' | 'denied_valid_discovery';
  commissionRefunded: number;
  filedAt: string;
}

/**
 * Opts a studio into or out of the consumer discovery marketplace.
 */
export function toggleMarketplaceListing(
  listing: MarketplaceListing,
  optIn: boolean
): MarketplaceListing {
  return {
    ...listing,
    isOptedIn: optIn,
    listedAt: optIn ? new Date().toISOString() : undefined,
  };
}

/**
 * Evaluates booking source attribution with strict protections for existing salon clients.
 * Direct brand bookings and existing clients NEVER incur marketplace commission.
 */
export function evaluateBookingAttribution(
  input: BookingAttributionInput,
  clientPriorVisitCount: number,
  marketplaceCommissionRate: number = 15.0
): AttributionEvaluation {
  // Invariant 1: Direct URLs or QR codes are ALWAYS direct (0% fee)
  if (input.referralSource === 'direct_brand_url' || input.referralSource === 'salon_qr_code') {
    return {
      bookingId: input.bookingId,
      clientId: input.clientId,
      attributionSource: 'direct_pro_client',
      isNetNewDiscovery: false,
      commissionPercentage: 0,
      commissionAmountOwed: 0,
      payoutToSalon: input.bookingAmount,
      attributionEvidence: `Direct booking via ${input.referralSource}. 0% marketplace commission applied.`,
      disputeAvailable: false,
    };
  }

  // Invariant 2: If client has visited this salon previously, they are an existing client (0% fee)
  if (clientPriorVisitCount > 0) {
    return {
      bookingId: input.bookingId,
      clientId: input.clientId,
      attributionSource: 'direct_pro_client',
      isNetNewDiscovery: false,
      commissionPercentage: 0,
      commissionAmountOwed: 0,
      payoutToSalon: input.bookingAmount,
      attributionEvidence: `Client has ${clientPriorVisitCount} prior completed visits at this studio. Protected client: 0% fee.`,
      disputeAvailable: false,
    };
  }

  // Net-new marketplace discovery: explicit auditable commission
  const commission = Math.round(((input.bookingAmount * marketplaceCommissionRate) / 100) * 100) / 100;
  const payout = Math.round((input.bookingAmount - commission) * 100) / 100;

  return {
    bookingId: input.bookingId,
    clientId: input.clientId,
    attributionSource: 'marketplace_discovery',
    isNetNewDiscovery: true,
    commissionPercentage: marketplaceCommissionRate,
    commissionAmountOwed: commission,
    payoutToSalon: payout,
    attributionEvidence: `Net-new client discovered salon via Posie Consumer Marketplace search. Standard ${marketplaceCommissionRate}% discovery fee.`,
    disputeAvailable: true,
  };
}

/**
 * Files an attribution dispute when a provider has evidence that a client was their direct relationship.
 */
export function fileAttributionDispute(
  evaluation: AttributionEvaluation,
  disputeReason: string,
  proEvidenceToken: string
): AttributionDisputeCase {
  if (!evaluation.disputeAvailable || evaluation.commissionAmountOwed === 0) {
    throw new Error('No commission was charged on this booking; dispute not applicable.');
  }

  if (!proEvidenceToken || proEvidenceToken.trim() === '') {
    throw new Error('Attribution dispute requires proof of prior relationship or direct marketing token.');
  }

  return {
    disputeId: `disp_attr_${evaluation.bookingId}_${Date.now()}`,
    bookingId: evaluation.bookingId,
    salonId: 'salon_current',
    proEvidenceToken,
    disputeReason,
    status: 'under_review',
    commissionRefunded: 0,
    filedAt: new Date().toISOString(),
  };
}
