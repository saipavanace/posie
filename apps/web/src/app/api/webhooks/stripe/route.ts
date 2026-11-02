import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@posie/database';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: any;

    if (stripe && webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      } catch (err: any) {
        console.error('Stripe webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    } else {
      // In simulation mode / local testing without live webhook signing secret
      try {
        event = JSON.parse(rawBody);
      } catch {
        return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
      }
    }

    const eventType = event.type;
    const dataObject = event.data?.object;

    console.log(`[Stripe Webhook] Received event: ${eventType} (${dataObject?.id})`);

    switch (eventType) {
      case 'payment_intent.succeeded': {
        const paymentIntent = dataObject;
        const appointmentId = paymentIntent.metadata?.appointmentId;

        if (appointmentId) {
          await prisma.appointment.update({
            where: { id: appointmentId },
            data: {
              paymentStatus: 'PAID_IN_FULL',
              depositPaidCents: paymentIntent.amount,
            },
          }).catch(() => {});
        } else if (paymentIntent.id) {
          await prisma.appointment.updateMany({
            where: { stripePaymentIntentId: paymentIntent.id },
            data: {
              paymentStatus: 'PAID_IN_FULL',
            },
          }).catch(() => {});
        }
        break;
      }

      case 'payment_intent.amount_capturable_updated': {
        // Pre-authorization deposit hold placed
        const paymentIntent = dataObject;
        const appointmentId = paymentIntent.metadata?.appointmentId;

        if (appointmentId) {
          await prisma.appointment.update({
            where: { id: appointmentId },
            data: {
              paymentStatus: 'DEPOSIT_COLLECTED',
              depositPaidCents: paymentIntent.amount_capturable || 5000,
            },
          }).catch(() => {});
        }
        break;
      }

      case 'payment_intent.canceled': {
        const paymentIntent = dataObject;
        if (paymentIntent.id) {
          await prisma.appointment.updateMany({
            where: { stripePaymentIntentId: paymentIntent.id },
            data: { paymentStatus: 'UNPAID' },
          }).catch(() => {});
        }
        break;
      }

      case 'charge.refunded': {
        const charge = dataObject;
        console.log(`[Stripe Webhook] Charge refunded: ${charge.id}, amount: ${charge.amount_refunded}`);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true, event: eventType });
  } catch (error: any) {
    console.error('Error handling Stripe webhook:', error);
    return NextResponse.json({ error: 'Webhook handler failure' }, { status: 500 });
  }
}
