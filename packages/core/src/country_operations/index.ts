/**
 * Posie Core Engine - Country Specific Operations (F167)
 *
 * Implements country-specific operational profiles, local currency formatting,
 * statutory tax computation (sales tax, GST/HST, VAT inclusive/exclusive),
 * and jurisdictional invoice compliance.
 *
 * Domain Invariant (Basis: Expansion (X); LEG FIN LANG PART, WB F167, Table 90):
 * Adds local currencies, statutory tax regimes, messaging standards, regional payment
 * rails, and mandatory invoicing metadata market by market. Operating rules are
 * deterministic; tax calculations follow strict statutory conventions (e.g., UK/EU VAT
 * is tax-inclusive; US sales tax is tax-exclusive). Invoices mandate jurisdiction-specific
 * compliance fields (e.g., VAT registration numbers, CRA business numbers).
 */

export type SupportedCountryCode = 'US' | 'CA' | 'GB' | 'FR' | 'AU';

export interface CountryOperatingConfig {
  countryCode: SupportedCountryCode;
  countryName: string;
  currencyCode: 'USD' | 'CAD' | 'GBP' | 'EUR' | 'AUD';
  currencySymbol: string;
  taxModel: 'exclusive' | 'inclusive';
  standardTaxRate: number; // e.g. 0.20 for 20%
  taxLabel: string; // 'Sales Tax', 'GST/HST', 'VAT', 'GST'
  requiresSellerTaxRegistrationNumber: boolean;
  supportedPaymentRails: string[];
  e164CountryPrefix: string;
}

export interface LocalizedTaxSummary {
  countryCode: SupportedCountryCode;
  currencyCode: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalWithTax: number;
  isTaxInclusive: boolean;
  taxLabel: string;
}

export interface StatutoryInvoiceInput {
  invoiceId: string;
  countryCode: SupportedCountryCode;
  sellerBusinessName: string;
  sellerTaxRegistrationNumber?: string; // e.g. UK VAT number, CA BN
  subtotal: number;
  lineItems: Array<{ description: string; amount: number }>;
  clientName: string;
}

const COUNTRY_PROFILES: Record<SupportedCountryCode, CountryOperatingConfig> = {
  US: {
    countryCode: 'US',
    countryName: 'United States',
    currencyCode: 'USD',
    currencySymbol: '$',
    taxModel: 'exclusive',
    standardTaxRate: 0.08875, // Default NYC combined state + city
    taxLabel: 'Sales Tax',
    requiresSellerTaxRegistrationNumber: false,
    supportedPaymentRails: ['card', 'apple_pay', 'google_pay', 'ach_debit'],
    e164CountryPrefix: '+1',
  },
  CA: {
    countryCode: 'CA',
    countryName: 'Canada',
    currencyCode: 'CAD',
    currencySymbol: '$',
    taxModel: 'exclusive',
    standardTaxRate: 0.13, // Ontario HST
    taxLabel: 'HST',
    requiresSellerTaxRegistrationNumber: true, // CRA Business Number
    supportedPaymentRails: ['card', 'apple_pay', 'google_pay', 'interac'],
    e164CountryPrefix: '+1',
  },
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    currencyCode: 'GBP',
    currencySymbol: '£',
    taxModel: 'inclusive',
    standardTaxRate: 0.20, // Standard UK VAT
    taxLabel: 'VAT',
    requiresSellerTaxRegistrationNumber: true, // UK VAT Reg
    supportedPaymentRails: ['card', 'apple_pay', 'google_pay', 'bacs', 'faster_payments'],
    e164CountryPrefix: '+44',
  },
  FR: {
    countryCode: 'FR',
    countryName: 'France',
    currencyCode: 'EUR',
    currencySymbol: '€',
    taxModel: 'inclusive',
    standardTaxRate: 0.20, // Standard French TVA
    taxLabel: 'TVA',
    requiresSellerTaxRegistrationNumber: true, // Numéro de TVA intracommunautaire
    supportedPaymentRails: ['card', 'apple_pay', 'google_pay', 'sepa_debit'],
    e164CountryPrefix: '+33',
  },
  AU: {
    countryCode: 'AU',
    countryName: 'Australia',
    currencyCode: 'AUD',
    currencySymbol: '$',
    taxModel: 'inclusive',
    standardTaxRate: 0.10, // Australian GST
    taxLabel: 'GST',
    requiresSellerTaxRegistrationNumber: true, // ABN
    supportedPaymentRails: ['card', 'apple_pay', 'google_pay', 'becs_debit', 'payto'],
    e164CountryPrefix: '+61',
  },
};

/**
 * Retrieves the operational and regulatory configuration for a supported country.
 */
export function getCountryOperatingConfig(countryCode: SupportedCountryCode): CountryOperatingConfig {
  const profile = COUNTRY_PROFILES[countryCode];
  if (!profile) {
    throw new Error(`Country code "${countryCode}" is not currently supported.`);
  }
  return profile;
}

/**
 * Calculates statutory taxes for an invoice or checkout session according to local tax conventions.
 */
export function calculateLocalizedInvoiceTaxes(
  subtotal: number,
  countryConfig: CountryOperatingConfig,
  customTaxRate?: number
): LocalizedTaxSummary {
  const rate = customTaxRate ?? countryConfig.standardTaxRate;

  if (countryConfig.taxModel === 'inclusive') {
    // For inclusive tax (UK VAT, EU TVA, AU GST): subtotal already includes the tax
    // Tax component = Total - (Total / (1 + rate))
    const netAmount = subtotal / (1 + rate);
    const taxAmount = Math.round((subtotal - netAmount) * 100) / 100;
    return {
      countryCode: countryConfig.countryCode,
      currencyCode: countryConfig.currencyCode,
      subtotal: Math.round(netAmount * 100) / 100,
      taxRate: rate,
      taxAmount,
      totalWithTax: subtotal,
      isTaxInclusive: true,
      taxLabel: countryConfig.taxLabel,
    };
  } else {
    // For exclusive tax (US, Canada): tax is added on top of the subtotal
    const taxAmount = Math.round(subtotal * rate * 100) / 100;
    return {
      countryCode: countryConfig.countryCode,
      currencyCode: countryConfig.currencyCode,
      subtotal,
      taxRate: rate,
      taxAmount,
      totalWithTax: Math.round((subtotal + taxAmount) * 100) / 100,
      isTaxInclusive: false,
      taxLabel: countryConfig.taxLabel,
    };
  }
}

/**
 * Validates whether an invoice meets statutory documentation requirements for a given jurisdiction.
 */
export function validateStatutoryInvoiceCompliance(
  invoice: StatutoryInvoiceInput,
  countryConfig: CountryOperatingConfig
): { compliant: boolean; missingStatutoryFields: string[] } {
  const missing: string[] = [];

  if (countryConfig.requiresSellerTaxRegistrationNumber) {
    if (!invoice.sellerTaxRegistrationNumber || invoice.sellerTaxRegistrationNumber.trim() === '') {
      missing.push(`Mandatory statutory tax identifier for ${countryConfig.countryName} (${countryConfig.taxLabel} Number / Business Identifier).`);
    }
  }

  if (!invoice.sellerBusinessName || invoice.sellerBusinessName.trim() === '') {
    missing.push('Seller legal business name');
  }

  if (!invoice.lineItems || invoice.lineItems.length === 0) {
    missing.push('Itemized service line items');
  }

  return {
    compliant: missing.length === 0,
    missingStatutoryFields: missing,
  };
}
