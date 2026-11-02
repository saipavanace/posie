import { NextRequest, NextResponse } from 'next/server';
import { capturePreAuthHold, cancelPreAuthHold } from '@/lib/stripe';
import { prisma } from '@posie/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentIntentId, action, amountCents, appointmentId } = body;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'paymentIntentId is required' },
        { status: 400 }
      );
    }

    if (action === 'capture') {
      const result = await capturePreAuthHold(paymentIntentId, amountCents);
      if (appointmentId) {
        await prisma.appointment.update({
          where: { id: appointmentId },
          data: { paymentStatus: 'PAID_IN_FULL' },
        }).catch(() => {});
      }
      return NextResponse.json({ ...result });
    } else if (action === 'cancel' || action === 'release') {
      const result = await cancelPreAuthHold(paymentIntentId);
      if (appointmentId) {
        await prisma.appointment.update({
          where: { id: appointmentId },
          data: { paymentStatus: 'UNPAID' },
        }).catch(() => {});
      }
      return NextResponse.json({ ...result });
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Must be "capture" or "cancel".' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error modifying Stripe hold:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update hold' },
      { status: 500 }
    );
  }
}
