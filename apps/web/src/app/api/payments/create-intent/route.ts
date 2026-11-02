import { NextRequest, NextResponse } from 'next/server';
import { createDepositHoldPaymentIntent } from '@/lib/stripe';
import { prisma } from '@posie/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amountCents,
      currency = 'usd',
      customerEmail,
      customerName,
      appointmentId,
      salonId,
      isPreAuthHold = true,
    } = body;

    if (!amountCents || amountCents <= 0) {
      return NextResponse.json(
        { error: 'Invalid payment amount. Must be greater than 0.' },
        { status: 400 }
      );
    }

    const intentResult = await createDepositHoldPaymentIntent({
      amountCents,
      currency,
      customerEmail,
      customerName,
      appointmentId,
      salonId,
      isPreAuthHold,
    });

    // If an appointment ID was passed, update appointment with Stripe PaymentIntent ID
    if (appointmentId && intentResult.paymentIntentId) {
      await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          stripePaymentIntentId: intentResult.paymentIntentId,
          depositPaidCents: isPreAuthHold ? amountCents : undefined,
          paymentStatus: isPreAuthHold ? 'DEPOSIT_COLLECTED' : 'PAID_IN_FULL',
        },
      }).catch((e) => {
        console.warn('Could not update appointment with stripePaymentIntentId:', e.message);
      });
    }

    return NextResponse.json({
      ...intentResult,
    });
  } catch (error: any) {
    console.error('Error creating Stripe PaymentIntent:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize payment gateway' },
      { status: 500 }
    );
  }
}
