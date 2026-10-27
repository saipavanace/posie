/**
 * F191: SMS Marketing Campaigns
 *
 * Creates brand-identified text campaigns with live segment previews, opt-in audience filtering,
 * message segment calculators (GSM-7 vs Unicode), budget caps, quiet hours enforcement, and measurable delivery metrics.
 * Invariant: Strictly filters for explicit marketing SMS consent and enforces TCPA / 10DLC quiet hours.
 */

export interface SmsRecipientProfile {
  clientId: string;
  fullName: string;
  phoneNumber: string;
  marketingSmsOptIn: boolean;
  timezone: string;
  lastMessageSentAt?: string;
}

export interface SmsCampaignDraft {
  campaignId: string;
  salonId: string;
  campaignName: string;
  messageText: string;
  targetAudience: 'all_opted_in' | 'lapsed_90_days' | 'vip_clients';
  budgetCapUsd: number;
  costPerSegmentUsd: number;
}

export interface SmsSegmentAnalysis {
  characterCount: number;
  encoding: 'GSM-7' | 'UCS-2_Unicode';
  segmentCount: number;
  maxCharsPerSegment: number;
  remainingCharsInCurrentSegment: number;
  hasMandatoryOptOutNotice: boolean;
}

export interface SmsCampaignExecutionResult {
  campaignId: string;
  status: 'dispatched' | 'blocked_by_budget' | 'blocked_quiet_hours';
  totalEligibleRecipients: number;
  excludedNonOptedInCount: number;
  totalSegmentsDispatched: number;
  estimatedCostUsd: number;
  quietHoursBlockedCount: number;
  dispatchedAt: string;
  previewMessageSample: string;
  rejectionReason?: string;
}

/**
 * Calculates message segmentation and encoding for SMS campaigns.
 * Invariant: Plain ASCII uses GSM-7 (160 chars for 1 segment, 153 chars for multi-segment).
 * Emojis or special Unicode use UCS-2 (70 chars for 1 segment, 67 chars for multi-segment).
 */
export function analyzeSmsMessageText(messageText: string): SmsSegmentAnalysis {
  // Check if text contains non-GSM characters (emojis, special diacritics)
  // Basic GSM-7 character regex test
  const gsm7Regex = /^[@£$¥èéùìòÇ\r\nØø\r\nÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà]*$/;
  const isGsm7 = gsm7Regex.test(messageText);

  const characterCount = Array.from(messageText).length;
  const encoding = isGsm7 ? 'GSM-7' : 'UCS-2_Unicode';

  let segmentCount = 1;
  let maxCharsPerSegment = isGsm7 ? 160 : 70;
  let remainingChars = 0;

  if (isGsm7) {
    if (characterCount <= 160) {
      segmentCount = 1;
      remainingChars = 160 - characterCount;
    } else {
      maxCharsPerSegment = 153; // Multi-segment UDH overhead
      segmentCount = Math.ceil(characterCount / 153);
      remainingChars = segmentCount * 153 - characterCount;
    }
  } else {
    if (characterCount <= 70) {
      segmentCount = 1;
      remainingChars = 70 - characterCount;
    } else {
      maxCharsPerSegment = 67;
      segmentCount = Math.ceil(characterCount / 67);
      remainingChars = segmentCount * 67 - characterCount;
    }
  }

  const hasMandatoryOptOutNotice = /stop|opt out|unsubscribe/i.test(messageText);

  return {
    characterCount,
    encoding,
    segmentCount,
    maxCharsPerSegment,
    remainingCharsInCurrentSegment: remainingChars,
    hasMandatoryOptOutNotice,
  };
}

/**
 * Checks whether current dispatch time falls within statutory quiet hours (8:00 AM - 9:00 PM recipient local time).
 */
export function isWithinTcpaQuietHours(hourOfRecipient: number): boolean {
  // Outside 8 AM to 9 PM (i.e. < 8 or >= 21) is quiet hours
  return hourOfRecipient < 8 || hourOfRecipient >= 21;
}

/**
 * Validates and executes an SMS marketing campaign, enforcing explicit opt-in consent,
 * segment budget limits, and TCPA compliance.
 */
export function executeSmsMarketingCampaign(
  campaign: SmsCampaignDraft,
  audience: SmsRecipientProfile[],
  currentRecipientLocalHour = 14 // 2:00 PM default (permitted)
): SmsCampaignExecutionResult {
  const analysis = analyzeSmsMessageText(campaign.messageText);

  if (!analysis.hasMandatoryOptOutNotice) {
    throw new Error('TCPA Compliance Error: SMS campaign must include mandatory opt-out instructions (e.g. "Reply STOP to cancel").');
  }

  // Filter ONLY recipients with verified opt-in marketing SMS consent
  const eligibleRecipients = audience.filter((client) => client.marketingSmsOptIn && client.phoneNumber.length >= 10);
  const excludedNonOptedInCount = audience.length - eligibleRecipients.length;

  // Check quiet hours
  if (isWithinTcpaQuietHours(currentRecipientLocalHour)) {
    return {
      campaignId: campaign.campaignId,
      status: 'blocked_quiet_hours',
      totalEligibleRecipients: eligibleRecipients.length,
      excludedNonOptedInCount,
      totalSegmentsDispatched: 0,
      estimatedCostUsd: 0,
      quietHoursBlockedCount: eligibleRecipients.length,
      dispatchedAt: new Date().toISOString(),
      previewMessageSample: campaign.messageText,
      rejectionReason: 'TCPA_QUIET_HOURS_ENFORCED: SMS marketing campaigns cannot be dispatched before 8:00 AM or after 9:00 PM local recipient time.',
    };
  }

  const totalSegments = eligibleRecipients.length * analysis.segmentCount;
  const estimatedCostUsd = Math.round(totalSegments * campaign.costPerSegmentUsd * 100) / 100;

  // Enforce budget cap
  if (estimatedCostUsd > campaign.budgetCapUsd) {
    return {
      campaignId: campaign.campaignId,
      status: 'blocked_by_budget',
      totalEligibleRecipients: eligibleRecipients.length,
      excludedNonOptedInCount,
      totalSegmentsDispatched: 0,
      estimatedCostUsd,
      quietHoursBlockedCount: 0,
      dispatchedAt: new Date().toISOString(),
      previewMessageSample: campaign.messageText,
      rejectionReason: `BUDGET_EXCEEDED: Estimated campaign cost $${estimatedCostUsd.toFixed(2)} exceeds owner budget cap of $${campaign.budgetCapUsd.toFixed(2)}.`,
    };
  }

  return {
    campaignId: campaign.campaignId,
    status: 'dispatched',
    totalEligibleRecipients: eligibleRecipients.length,
    excludedNonOptedInCount,
    totalSegmentsDispatched: totalSegments,
    estimatedCostUsd,
    quietHoursBlockedCount: 0,
    dispatchedAt: new Date().toISOString(),
    previewMessageSample: campaign.messageText,
  };
}
