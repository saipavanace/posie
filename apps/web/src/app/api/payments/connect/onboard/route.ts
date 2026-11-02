import { NextRequest, NextResponse } from 'next/server';
import { createConnectAccountLink } from '@/lib/stripe';
import { prisma } from '@posie/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { salonId, email, businessName } = body;

    let targetSalon = null;
    if (salonId) {
      targetSalon = await prisma.salon.findUnique({ where: { id: salonId } });
    }
    if (!targetSalon) {
      targetSalon = await prisma.salon.findFirst();
    }

    if (!targetSalon) {
      return NextResponse.json({ error: 'Salon not found' }, { status: 404 });
    }

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const returnUrl = `${protocol}://${host}/admin?stripe_connect=success`;
    const refreshUrl = `${protocol}://${host}/admin?stripe_connect=refresh`;

    const connectResult = await createConnectAccountLink({
      salonId: targetSalon.id,
      email: email || targetSalon.email || 'concierge@atelierposie.com',
      businessName: businessName || targetSalon.name,
      returnUrl,
      refreshUrl,
    });

    if (connectResult.stripeAccountId) {
      await prisma.salon.update({
        where: { id: targetSalon.id },
        data: { stripeAccountId: connectResult.stripeAccountId },
      }).catch(() => {});
    }

    return NextResponse.json({
      ...connectResult,
    });
  } catch (error: any) {
    console.error('Error generating Stripe Connect link:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize merchant onboarding' },
      { status: 500 }
    );
  }
}
