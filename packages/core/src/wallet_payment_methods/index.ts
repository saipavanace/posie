/**
 * F135 — Supported Wallet and Online Payment Methods
 *
 * Configures modern digital wallet payments (Apple Pay, Google Pay, Link by Stripe, BNPL)
 * with device-specific capability detection, transparent merchant fee disclosures,
 * and hosted PCI DSS SAQ A scope minimization.
 *
 * KEY INVARIANT (Basis: B; WB F30, Payment Foundation):
 * Transparent Fee & Device Capability Disclosure.
 * "Supported methods and fees are disclosed per country and device."
 * The checkout engine dynamically evaluates client hardware and browser capabilities
 * (e.g. Apple Pay on Safari/iOS vs Google Pay on Chrome/Android) and explicitly itemizes
 * processing rates per tender type, ensuring zero surprise transaction surcharges.
 */

export type PaymentMethodId =
  | 'apple_pay'
  | 'google_pay'
  | 'link_by_stripe'
  | 'card_standard'
  | 'bnpl_afterpay_klarna';

export interface PaymentMethodSpec {
  id: PaymentMethodId;
  name: string;
  category: 'digital_wallet' | 'card' | 'bnpl_installments';
  brandIcon: string;
  processingRatePercentage: number;
  fixedFeeCents: number;
  isAvailableOnDevice: boolean;
  pciScopeMode: 'hosted_tokenization_saq_a';
  supportedCountries: string[]; // e.g. ['US', 'CA', 'GB']
  minimumAmountUSD: number;
  description: string;
}

export interface ClientDeviceContext {
  countryCode: string; // 'US'
  isApplePayHardwareSupported: boolean;
  isGooglePayHardwareSupported: boolean;
  browserName: 'safari' | 'chrome' | 'firefox' | 'edge' | 'other';
  deviceType: 'ios' | 'android' | 'desktop';
}

export interface PaymentMethodsEvaluation {
  availableMethods: PaymentMethodSpec[];
  recommendedMethod: PaymentMethodId;
  pciComplianceStatement: string;
  disclosedFeeSummary: Array<{
    methodName: string;
    rateText: string;
    isWalletFastPay: boolean;
  }>;
}

/**
 * Standard registry of supported wallet and card checkout methods.
 */
export const PAYMENT_METHOD_REGISTRY: Record<PaymentMethodId, Omit<PaymentMethodSpec, 'isAvailableOnDevice'>> = {
  apple_pay: {
    id: 'apple_pay',
    name: 'Apple Pay',
    category: 'digital_wallet',
    brandIcon: 'apple',
    processingRatePercentage: 2.9,
    fixedFeeCents: 30,
    pciScopeMode: 'hosted_tokenization_saq_a',
    supportedCountries: ['US', 'CA', 'GB', 'AU', 'EU'],
    minimumAmountUSD: 1.0,
    description: '1-touch Touch ID / Face ID biometric authorization on Apple devices.',
  },
  google_pay: {
    id: 'google_pay',
    name: 'Google Pay',
    category: 'digital_wallet',
    brandIcon: 'google',
    processingRatePercentage: 2.9,
    fixedFeeCents: 30,
    pciScopeMode: 'hosted_tokenization_saq_a',
    supportedCountries: ['US', 'CA', 'GB', 'AU', 'EU'],
    minimumAmountUSD: 1.0,
    description: 'Accelerated Google account saved card checkout across Chrome & Android.',
  },
  link_by_stripe: {
    id: 'link_by_stripe',
    name: 'Link by Stripe',
    category: 'digital_wallet',
    brandIcon: 'zap',
    processingRatePercentage: 2.9,
    fixedFeeCents: 30,
    pciScopeMode: 'hosted_tokenization_saq_a',
    supportedCountries: ['US', 'CA', 'GB'],
    minimumAmountUSD: 1.0,
    description: 'Instant 1-click SMS OTP payment across millions of Stripe businesses.',
  },
  card_standard: {
    id: 'card_standard',
    name: 'Credit & Debit Card',
    category: 'card',
    brandIcon: 'credit-card',
    processingRatePercentage: 2.9,
    fixedFeeCents: 30,
    pciScopeMode: 'hosted_tokenization_saq_a',
    supportedCountries: ['US', 'CA', 'GB', 'AU', 'EU'],
    minimumAmountUSD: 1.0,
    description: 'Visa, Mastercard, American Express, and Discover via hosted fields.',
  },
  bnpl_afterpay_klarna: {
    id: 'bnpl_afterpay_klarna',
    name: 'Klarna / Afterpay (Pay in 4)',
    category: 'bnpl_installments',
    brandIcon: 'calendar',
    processingRatePercentage: 5.9,
    fixedFeeCents: 30,
    pciScopeMode: 'hosted_tokenization_saq_a',
    supportedCountries: ['US', 'CA', 'GB', 'AU'],
    minimumAmountUSD: 35.0, // BNPL typically requires $35+
    description: 'Split high-ticket wellness treatments into 4 interest-free installments.',
  },
};

/**
 * Filters and configures supported payment methods based on client device capability and country.
 */
export function evaluateSupportedPaymentMethods(
  context: ClientDeviceContext,
  ticketAmountUSD: number = 100.0
): PaymentMethodsEvaluation {
  const availableMethods: PaymentMethodSpec[] = [];

  for (const [id, spec] of Object.entries(PAYMENT_METHOD_REGISTRY)) {
    // 1. Country support check
    if (!spec.supportedCountries.includes(context.countryCode.toUpperCase())) {
      continue;
    }

    // 2. Minimum amount check (e.g. for BNPL)
    if (ticketAmountUSD < spec.minimumAmountUSD) {
      continue;
    }

    // 3. Device hardware & browser capability check
    let isAvailableOnDevice = true;
    if (id === 'apple_pay') {
      isAvailableOnDevice = context.isApplePayHardwareSupported && (context.browserName === 'safari' || context.deviceType === 'ios');
    } else if (id === 'google_pay') {
      isAvailableOnDevice = context.isGooglePayHardwareSupported || context.browserName === 'chrome' || context.deviceType === 'android';
    }

    if (isAvailableOnDevice) {
      availableMethods.push({
        ...spec,
        isAvailableOnDevice: true,
      });
    }
  }

  // Determine top recommended method
  let recommendedMethod: PaymentMethodId = 'card_standard';
  if (availableMethods.some((m) => m.id === 'apple_pay')) {
    recommendedMethod = 'apple_pay';
  } else if (availableMethods.some((m) => m.id === 'google_pay')) {
    recommendedMethod = 'google_pay';
  } else if (availableMethods.some((m) => m.id === 'link_by_stripe')) {
    recommendedMethod = 'link_by_stripe';
  }

  const disclosedFeeSummary = availableMethods.map((m) => ({
    methodName: m.name,
    rateText: `${m.processingRatePercentage}% + ${m.fixedFeeCents}¢`,
    isWalletFastPay: m.category === 'digital_wallet',
  }));

  return {
    availableMethods,
    recommendedMethod,
    pciComplianceStatement:
      'PCI DSS SAQ A Certified: Payment credentials never touch Posie servers and are tokenized directly by Stripe hosted elements.',
    disclosedFeeSummary,
  };
}
