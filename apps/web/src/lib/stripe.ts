import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const isStripeConfigured = Boolean(stripeSecretKey && !stripeSecretKey.includes('replace-with'));

// Export configured or mock-capable Stripe client
export const stripe = isStripeConfigured
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-01-27.acacia' as any,
      typescript: true,
    })
  : null;

export interface CreateDepositHoldParams {
  amountCents: number;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  appointmentId?: string;
  salonId?: string;
  isPreAuthHold?: boolean;
}

/**
 * Creates a Stripe PaymentIntent.
 * When isPreAuthHold is true (default for booking deposits), capture_method is 'manual'
 * ensuring card is authorized/held without immediately capturing funds (Document D05 Policy compliant).
 */
export async function createDepositHoldPaymentIntent(params: CreateDepositHoldParams) {
  const {
    amountCents,
    currency = 'usd',
    customerEmail,
    customerName,
    appointmentId,
    salonId,
    isPreAuthHold = true,
  } = params;

  if (stripe) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency,
      capture_method: isPreAuthHold ? 'manual' : 'automatic',
      automatic_payment_methods: { enabled: true },
      receipt_email: customerEmail,
      description: `Posie Atelier ${isPreAuthHold ? 'Deposit Preauthorization Hold' : 'Treatment Charge'}`,
      metadata: {
        appointmentId: appointmentId || '',
        salonId: salonId || '',
        customerName: customerName || '',
        policy: 'D05_CANCELLATION_PREAUTH',
      },
    });

    return {
      success: true,
      mode: 'live' as const,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
    };
  }

  // Graceful simulation mode when STRIPE_SECRET_KEY is not configured in local environment
  const simulatedId = `pi_mock_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const simulatedSecret = `${simulatedId}_secret_${Math.random().toString(36).substring(2, 12)}`;

  return {
    success: true,
    mode: 'simulated' as const,
    clientSecret: simulatedSecret,
    paymentIntentId: simulatedId,
    amount: amountCents,
    status: isPreAuthHold ? 'requires_capture' : 'succeeded',
    simulatedNotice: 'Stripe running in Atelier Simulator Mode. Set STRIPE_SECRET_KEY in .env for live gateway.',
  };
}

/**
 * Generates a Stripe Terminal Connection Token for WisePOS E / BBPOS card readers
 */
export async function createTerminalConnectionToken() {
  if (stripe) {
    const token = await stripe.terminal.connectionTokens.create();
    return {
      success: true,
      mode: 'live' as const,
      secret: token.secret,
    };
  }

  return {
    success: true,
    mode: 'simulated' as const,
    secret: `pst_test_secret_${Math.random().toString(36).substring(2, 12)}`,
    simulatedNotice: 'Terminal WisePOS E online in simulation mode.',
  };
}

/**
 * Captures a previously pre-authorized deposit hold (e.g. upon service completion or no-show)
 */
export async function capturePreAuthHold(paymentIntentId: string, amountCents?: number) {
  if (stripe && !paymentIntentId.startsWith('pi_mock_')) {
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId, {
      amount_to_capture: amountCents,
    });
    return {
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amountCaptured: paymentIntent.amount_received,
    };
  }

  return {
    success: true,
    mode: 'simulated' as const,
    paymentIntentId,
    status: 'succeeded',
    amountCaptured: amountCents || 5000,
  };
}

/**
 * Releases/cancels a pre-authorized deposit hold (e.g. cancelled > 24 hours prior)
 */
export async function cancelPreAuthHold(paymentIntentId: string) {
  if (stripe && !paymentIntentId.startsWith('pi_mock_')) {
    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId, {
      cancellation_reason: 'requested_by_customer',
    });
    return {
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    };
  }

  return {
    success: true,
    mode: 'simulated' as const,
    paymentIntentId,
    status: 'canceled',
  };
}

/**
 * Generates Stripe Connect Express onboarding link for salon owners or 1099 booth renters
 */
export async function createConnectAccountLink(params: {
  salonId: string;
  email: string;
  businessName: string;
  returnUrl: string;
  refreshUrl: string;
}) {
  const { salonId, email, businessName, returnUrl, refreshUrl } = params;

  if (stripe) {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US',
      email,
      business_type: 'company',
      company: { name: businessName },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      metadata: { salonId },
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    });

    return {
      success: true,
      mode: 'live' as const,
      stripeAccountId: account.id,
      onboardingUrl: accountLink.url,
    };
  }

  return {
    success: true,
    mode: 'simulated' as const,
    stripeAccountId: `acct_mock_${Date.now()}`,
    onboardingUrl: `${returnUrl}?simulated_stripe_connect=success&salon_id=${salonId}`,
    simulatedNotice: 'Stripe Connect simulator active. Directing to instant authorization verification.',
  };
}
