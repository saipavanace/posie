import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@posie/database';

export async function POST(req: NextRequest) {
  try {
    let fromNumber = '';
    let toNumber = '';
    let messageBody = '';
    let messageSid = '';

    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      fromNumber = (formData.get('From') as string) || '';
      toNumber = (formData.get('To') as string) || '';
      messageBody = (formData.get('Body') as string) || '';
      messageSid = (formData.get('MessageSid') as string) || '';
    } else {
      const json = await req.json().catch(() => ({}));
      fromNumber = json.From || json.from || '';
      toNumber = json.To || json.to || '';
      messageBody = json.Body || json.body || '';
      messageSid = json.MessageSid || json.messageSid || '';
    }

    console.log(`[Twilio Webhook] Inbound SMS from ${fromNumber}: "${messageBody}"`);

    const salon = await prisma.salon.findFirst();
    const salonId = salon?.id || 'default-salon';

    // Find client by phone
    let client = null;
    if (fromNumber) {
      client = await prisma.client.findFirst({
        where: { phone: fromNumber },
      });
    }

    // Persist inbound message
    if (salonId) {
      await prisma.message.create({
        data: {
          salonId,
          clientId: client?.id || null,
          channel: 'SMS',
          direction: 'INBOUND',
          recipient: toNumber,
          sender: fromNumber,
          body: messageBody,
          status: 'DELIVERED',
          externalId: messageSid || `SM_inbound_${Date.now()}`,
        },
      }).catch((e) => console.warn('Could not persist inbound SMS:', e.message));
    }

    const trimmed = messageBody.trim().toUpperCase();
    let twimlReply = 'Thank you for reaching Atelier Posie. Our concierge team has received your message.';

    if (trimmed === 'C' || trimmed === 'CONFIRM') {
      twimlReply = 'Atelier Posie: Thank you! Your appointment is confirmed. We look forward to seeing you.';
      if (client) {
        await prisma.appointment.updateMany({
          where: { clientId: client.id, status: 'PENDING' },
          data: { status: 'CONFIRMED' },
        }).catch(() => {});
      }
    } else if (trimmed === 'R' || trimmed === 'RESCHEDULE') {
      twimlReply = 'Atelier Posie: We received your reschedule request. A concierge specialist will text or call you shortly with available openings.';
    } else if (trimmed === 'STOP' || trimmed === 'UNSUBSCRIBE') {
      twimlReply = 'Atelier Posie: You have unsubscribed from automated marketing texts. Reply START to resubscribe anytime.';
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${twimlReply}</Message></Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (error: any) {
    console.error('Twilio webhook handler error:', error);
    return new NextResponse('<Response/>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}
