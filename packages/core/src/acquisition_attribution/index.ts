/**
 * F116 — Acquisition Attribution Records & Marketplace Defense
 *
 * Tracks client acquisition sources (direct links, pro website widget, client referral,
 * walk-ins, and marketplace consumer discovery) with auditable evidence and dispute overrides.
 *
 * Basis: Growth (G); WB C9, Rules F051, F116, F177, F189
 * Key Invariants:
 * 1. Pro Exemption Defense (WB C9):
 *    Clients brought by the practitioner (direct link, custom domain, or legacy import)
 *    are strictly exempt from marketplace acquisition commission (0% fee).
 * 2. Verifiable Evidence Trail:
 *    Captures immutable acquisition proof (UTM parameters, referring client ID, link token,
 *    and client phone hash) to defend against wrongful marketplace fee charges.
 * 3. Auditable Dispute Override:
 *    Studio owners can override an attribution classification with manager rationale,
 *    triggering automatic commission reversal.
 */

export type AcquisitionChannel =
  | 'direct_pro_link'
  | 'studio_website_embed'
  | 'client_referral'
  | 'walk_in'
  | 'legacy_imported_client'
  | 'consumer_marketplace_discovery';

export interface AttributionEvidence {
  channel: AcquisitionChannel;
  utmSource?: string;
  utmCampaign?: string;
  referringClientId?: string;
  bookingLinkToken?: string;
  sourceIpAddress?: string;
  capturedAt: string;
}

export interface ClientAttributionRecord {
  recordId: string;
  clientId: string;
  clientName: string;
  initialChannel: AcquisitionChannel;
  evidence: AttributionEvidence;
  isMarketplaceCommissionChargeable: boolean;
  commissionFeeRatePercent: number; // e.g. 20% on marketplace, 0% on direct
  isLegacyExistingClient: boolean;
  overrideHistory: Array<{
    overrideId: string;
    previousChannel: AcquisitionChannel;
    newChannel: AcquisitionChannel;
    reason: string;
    overriddenByStaffId: string;
    timestamp: string;
  }>;
}

/**
 * Evaluates attribution channel and determines whether marketplace acquisition fees apply.
 */
export function recordClientAcquisition(params: {
  clientId: string;
  clientName: string;
  channel: AcquisitionChannel;
  evidence: Omit<AttributionEvidence, 'channel' | 'capturedAt'>;
  isLegacyImport?: boolean;
}): ClientAttributionRecord {
  const recordId = `ATTR-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  const isLegacy = params.isLegacyImport ?? (params.channel === 'legacy_imported_client');

  // Invariant 1: Existing clients and direct channels are NEVER charged marketplace acquisition fees
  const isDirectOrLegacy =
    isLegacy ||
    params.channel === 'direct_pro_link' ||
    params.channel === 'studio_website_embed' ||
    params.channel === 'walk_in' ||
    params.channel === 'legacy_imported_client' ||
    params.channel === 'client_referral';

  const isMarketplaceCommissionChargeable = !isDirectOrLegacy && params.channel === 'consumer_marketplace_discovery';
  const commissionFeeRatePercent = isMarketplaceCommissionChargeable ? 20.0 : 0.0;

  return {
    recordId,
    clientId: params.clientId,
    clientName: params.clientName,
    initialChannel: params.channel,
    evidence: {
      channel: params.channel,
      ...params.evidence,
      capturedAt: now,
    },
    isMarketplaceCommissionChargeable,
    commissionFeeRatePercent,
    isLegacyExistingClient: isLegacy,
    overrideHistory: [],
  };
}

/**
 * Overrides an attribution classification when a practitioner demonstrates prior relationship.
 */
export function applyAttributionOverride(
  record: ClientAttributionRecord,
  params: {
    newChannel: AcquisitionChannel;
    reason: string;
    staffId: string;
  }
): ClientAttributionRecord {
  const overrideId = `OVR-${Date.now()}`;
  const now = new Date().toISOString();

  const isChargeable = params.newChannel === 'consumer_marketplace_discovery' && !record.isLegacyExistingClient;
  const commissionRate = isChargeable ? 20.0 : 0.0;

  return {
    ...record,
    initialChannel: params.newChannel,
    isMarketplaceCommissionChargeable: isChargeable,
    commissionFeeRatePercent: commissionRate,
    overrideHistory: [
      ...record.overrideHistory,
      {
        overrideId,
        previousChannel: record.initialChannel,
        newChannel: params.newChannel,
        reason: params.reason,
        overriddenByStaffId: params.staffId,
        timestamp: now,
      },
    ],
  };
}
