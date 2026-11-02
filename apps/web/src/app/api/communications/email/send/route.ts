import { NextRequest, NextResponse } from 'next/server';
import {
  sendEmail,
  sendBookingConfirmationEmail,
} from '@/lib/communications';
import { prisma } from '@posie/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      to,
      type = 'confirmation',
      subject,
      html,
      clientName,
      serviceName,
      specialistName,
      scheduledAt,
      depositHoldFormatted,
      clientId,
    } = body;

    if (!to) {
      return NextResponse.json({ error: 'Recipient email address is required' }, { status: 400 });
    }

    const salon = await prisma.salon.findFirst();
    const salonId = salon?.id;

    let result;

    if (type === 'confirmation') {
      result = await sendBookingConfirmationEmail({
        to,
        clientName: clientName || 'Valued Guest',
        serviceName: serviceName || 'Bespoke Atelier Treatment',
        specialistName: specialistName || 'Elena Rostova',
        scheduledAt: scheduledAt || 'Tomorrow at 2:00 PM',
        depositHoldFormatted: depositHoldFormatted || '$50.00',
        salonId,
        clientId,
      });
    } else {
      result = await sendEmail({
        to,
        subject: subject || 'Atelier Posie Communication',
        html: html || '<p>Hello from Atelier Posie.</p>',
        salonId,
        clientId,
      });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error dispatching Email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to dispatch email' },
      { status: 500 }
    );
  }
}
