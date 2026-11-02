import { NextRequest, NextResponse } from 'next/server';
import { executeSmsMarketingCampaign, SmsCampaignDraft, SmsRecipientProfile } from '@posie/core';
import { sendSms } from '@/lib/communications';
import { prisma } from '@posie/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      campaignName = 'Atelier Spring Radiance',
      messageText = 'Atelier Posie: Experience our new Hydra-Dew Glass Facial this week with complimentary peptide infusion. Book at atelierposie.com. Reply STOP to cancel.',
      targetAudience = 'all_opted_in',
      budgetCapUsd = 100,
    } = body;

    const salon = await prisma.salon.findFirst();
    const salonId = salon?.id || 'default-salon';

    // Retrieve active clients from database
    const dbClients = await prisma.client.findMany({
      where: salonId ? { salonId } : undefined,
    });

    const audienceProfiles: SmsRecipientProfile[] = dbClients.length > 0
      ? dbClients.map((c) => ({
          clientId: c.id,
          fullName: `${c.firstName} ${c.lastName}`,
          phoneNumber: c.phone || '+12125550199',
          marketingSmsOptIn: true,
          timezone: 'America/New_York',
        }))
      : [
          {
            clientId: 'client-1',
            fullName: 'Sophia Montgomery',
            phoneNumber: '+12125550104',
            marketingSmsOptIn: true,
            timezone: 'America/New_York',
          },
          {
            clientId: 'client-2',
            fullName: 'Alexander Hayes',
            phoneNumber: '+19175550182',
            marketingSmsOptIn: true,
            timezone: 'America/New_York',
          },
        ];

    const draft: SmsCampaignDraft = {
      campaignId: `CMP-${Date.now()}`,
      salonId,
      campaignName,
      messageText,
      targetAudience,
      budgetCapUsd,
      costPerSegmentUsd: 0.015,
    };

    // Run core TCPA and budget validation
    const execution = executeSmsMarketingCampaign(draft, audienceProfiles, 14);

    if (execution.status === 'dispatched') {
      // Dispatch messages via Twilio / Simulator
      const dispatches = await Promise.all(
        audienceProfiles
          .filter((p) => p.marketingSmsOptIn)
          .map((recipient) =>
            sendSms({
              to: recipient.phoneNumber,
              body: messageText,
              salonId,
              clientId: recipient.clientId,
            }).catch((err) => ({ error: err.message, to: recipient.phoneNumber }))
          )
      );

      return NextResponse.json({
        success: true,
        execution,
        dispatches,
      });
    }

    return NextResponse.json({
      success: false,
      execution,
    });
  } catch (error: any) {
    console.error('Campaign dispatch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to dispatch marketing campaign' },
      { status: 500 }
    );
  }
}
