import { z } from 'zod';
import { ClientSegmentProfile, ClientMarketingConsent } from '../segments';

export const CampaignStatusSchema = z.enum(['draft', 'scheduled', 'sent', 'canceled']);
export type CampaignStatus = z.infer<typeof CampaignStatusSchema>;

export const EmailCampaignSchema = z.object({
  id: z.string().uuid(),
  campaignName: z.string().min(1, 'Campaign name is required'),
  subjectLine: z.string().min(1, 'Subject line is required'),
  previewText: z.string().optional(),
  segmentId: z.string().uuid(),
  bodyContent: z.string().min(1, 'Body content is required'),
  callToActionText: z.string().optional(),
  callToActionUrl: z.string().url().optional(),
  primaryColorHex: z.string().default('#2C3E30'),
  accentColorHex: z.string().default('#C67D6E'),
  status: CampaignStatusSchema.default('draft'),
  sentAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type EmailCampaign = z.infer<typeof EmailCampaignSchema>;

export interface CampaignSendExecutionResult {
  campaignId: string;
  sentAt: string;
  totalCandidateCount: number;
  deliveredCount: number;
  sendTimeOptOutsExcludedCount: number;
  deliveredEmails: string[];
  skippedOptOutEmails: string[];
}

/**
 * Creates a brand-consistent email campaign draft.
 */
export function createEmailCampaignDraft(params: {
  id?: string;
  campaignName: string;
  subjectLine: string;
  previewText?: string;
  segmentId: string;
  bodyContent: string;
  callToActionText?: string;
  callToActionUrl?: string;
  primaryColorHex?: string;
  accentColorHex?: string;
}): EmailCampaign {
  const now = new Date().toISOString();
  return EmailCampaignSchema.parse({
    id: params.id || '70707070-0000-0000-0000-000000000048',
    campaignName: params.campaignName,
    subjectLine: params.subjectLine,
    previewText: params.previewText,
    segmentId: params.segmentId,
    bodyContent: params.bodyContent,
    callToActionText: params.callToActionText,
    callToActionUrl: params.callToActionUrl,
    primaryColorHex: params.primaryColorHex || '#2C3E30',
    accentColorHex: params.accentColorHex || '#C67D6E',
    status: 'draft',
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Generates brand-formatted preview HTML with low-ink styling, accessible semantic typography,
 * and test badges.
 */
export function renderEmailCampaignHtml(
  campaign: EmailCampaign,
  options?: { isTestSend?: boolean }
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${options?.isTestSend ? '[TEST PREVIEW] ' : ''}${campaign.subjectLine}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #FAF8F5; margin: 0; padding: 24px; color: ${campaign.primaryColorHex}; }
    .container { max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; padding: 32px; border: 1px solid #E3DCD2; }
    .header { font-size: 20px; font-weight: 700; margin-bottom: 16px; border-bottom: 2px solid ${campaign.accentColorHex}; padding-bottom: 12px; }
    .body { font-size: 15px; line-height: 1.6; margin-bottom: 24px; color: #333333; }
    .button { display: inline-block; background-color: ${campaign.primaryColorHex}; color: #FAF8F5; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; }
    .footer { margin-top: 32px; font-size: 12px; color: #777777; border-top: 1px solid #ECE6DF; padding-top: 14px; }
  </style>
</head>
<body>
  <div class="container">
    ${options?.isTestSend ? '<div style="background:#F5E3DF; color:#B36B5C; padding:6px 12px; border-radius:6px; font-weight:600; font-size:12px; margin-bottom:16px;">[TEST SEND] Internal Preview</div>' : ''}
    <div class="header">${campaign.subjectLine}</div>
    <div class="body">${campaign.bodyContent}</div>
    ${
      campaign.callToActionText && campaign.callToActionUrl
        ? `<div style="text-align: center;"><a href="${campaign.callToActionUrl}" class="button">${campaign.callToActionText}</a></div>`
        : ''
    }
    <div class="footer">
      You received this message because you have visited or opted into updates from our studio.<br />
      <a href="#" style="color: ${campaign.accentColorHex};">Unsubscribe or manage preferences</a>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Executes sending of an email campaign.
 * CRITICAL INVARIANT (WB F41): Re-evaluates recipient marketing consent at send-time,
 * NOT only when the segment was drafted! Opted-out recipients are strictly excluded.
 */
export function executeCampaignSend(params: {
  campaign: EmailCampaign;
  targetedClients: ClientSegmentProfile[];
  liveConsentLookup: Map<string, ClientMarketingConsent>; // clientId -> current live consent
}): {
  updatedCampaign: EmailCampaign;
  sendResult: CampaignSendExecutionResult;
} {
  const now = new Date().toISOString();
  const deliveredEmails: string[] = [];
  const skippedOptOutEmails: string[] = [];

  for (const client of params.targetedClients) {
    const liveConsent =
      params.liveConsentLookup.get(client.id) ?? client.marketingConsent;

    if (liveConsent === 'opted_out') {
      skippedOptOutEmails.push(client.email);
    } else {
      deliveredEmails.push(client.email);
    }
  }

  const updatedCampaign = EmailCampaignSchema.parse({
    ...params.campaign,
    status: 'sent',
    sentAt: now,
    updatedAt: now,
  });

  const sendResult: CampaignSendExecutionResult = {
    campaignId: params.campaign.id,
    sentAt: now,
    totalCandidateCount: params.targetedClients.length,
    deliveredCount: deliveredEmails.length,
    sendTimeOptOutsExcludedCount: skippedOptOutEmails.length,
    deliveredEmails,
    skippedOptOutEmails,
  };

  return { updatedCampaign, sendResult };
}
