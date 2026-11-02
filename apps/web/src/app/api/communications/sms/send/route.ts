import { NextRequest, NextResponse } from 'next/server';
import {
  sendSms,
  sendBookingConfirmationSms,
  sendAppointmentReminderSms,
  sendReceiptSms,
} from '@/lib/communications';
import { prisma } from '@posie/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      to,
      type = 'direct',
      messageText,
      clientName,
      serviceName,
      specialistName,
      scheduledAt,
      holdAmountFormatted,
      totalFormatted,
      ticketId,
      clientId,
    } = body;

    if (!to) {
      return NextResponse.json({ error: 'Recipient phone number is required' }, { status: 400 });
    }

    const salon = await prisma.salon.findFirst();
    const salonId = salon?.id;

    let result;

    if (type === 'confirmation') {
      result = await sendBookingConfirmationSms({
        to,
        clientName: clientName || 'Valued Guest',
        serviceName: serviceName || 'Bespoke Atelier Treatment',
        specialistName: specialistName || 'Elena Rostova',
        scheduledAt: scheduledAt || 'Tomorrow at 2:00 PM',
        holdAmountFormatted: holdAmountFormatted || '$50.00',
        salonId,
        clientId,
      });
    } else if (type === 'reminder') {
      result = await sendAppointmentReminderSms({
        to,
        clientName: clientName || 'Valued Guest',
        serviceName: serviceName || 'Bespoke Atelier Treatment',
        scheduledAt: scheduledAt || 'Tomorrow at 2:00 PM',
        salonId,
        clientId,
      });
    } else if (type === 'receipt') {
      result = await sendReceiptSms({
        to,
        clientName: clientName || 'Valued Guest',
        totalFormatted: totalFormatted || '$254.64',
        ticketId: ticketId || 'TKT-88912',
        salonId,
        clientId,
      });
    } else {
      result = await sendSms({
        to,
        body: messageText || 'Hello from Atelier Posie!',
        salonId,
        clientId,
      });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error dispatching SMS:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to dispatch SMS' },
      { status: 500 }
    );
  }
}
