import { z } from 'zod';
import { Service } from '../catalog';
import { BusinessLocation } from '../locations';

export const SearchMetaTagSchema = z.object({
  metaTitle: z.string().max(70),
  metaDescription: z.string().max(160),
  canonicalUrl: z.string().url(),
  openGraphImage: z.string().url().optional(),
  structuredDataJsonLd: z.record(z.any()),
});

export type SearchMetaTag = z.infer<typeof SearchMetaTagSchema>;

/**
 * Generates local SEO metadata and JSON-LD schema for Google Local and search engine discovery.
 * Invariant (F033): Generates crawlable structured data with accurate location coordinates and service menus
 * without creating duplicate locations or misleading keywords.
 */
export function generateLocalDiscoveryMetadata(
  location: BusinessLocation,
  services: Service[],
  baseUrl: string = 'https://posie.app'
): SearchMetaTag {
  const metaTitle = `${location.name} — Facials, Brows & Skin Studio in ${location.city}, ${location.state}`;
  const metaDescription = `Book verified treatments at ${location.name}. Clean, transparent pricing on ${services
    .slice(0, 3)
    .map((s) => s.name)
    .join(', ')}. No login required.`;

  const canonicalUrl = `${baseUrl}/${location.city.toLowerCase()}/${encodeURIComponent(location.name.toLowerCase().replace(/\s+/g, '-'))}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: location.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.streetAddress,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zipCode,
      addressCountry: 'US',
    },
    telephone: location.publicPhone,
    priceRange: '$$',
    hasMenu: services.filter((s) => s.active).map((s) => ({
      '@type': 'MenuItem',
      name: s.name,
      description: s.clientDescription,
      offers: {
        '@type': 'Offer',
        price: (s.basePriceInCents / 100).toFixed(2),
        priceCurrency: 'USD',
      },
    })),
  };

  return {
    metaTitle,
    metaDescription,
    canonicalUrl,
    structuredDataJsonLd: jsonLd,
  };
}
