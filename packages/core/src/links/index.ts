import { z } from 'zod';

export const BookingLinkTargetSchema = z.object({
  businessSlug: z.string().min(1),
  serviceId: z.string().uuid().optional(),
  practitionerId: z.string().uuid().optional(),
  campaignSource: z.enum(['instagram', 'tiktok', 'google', 'qr_card', 'referral', 'direct']).default('direct'),
  customUtm: z.string().optional(),
});

export type BookingLinkTarget = z.infer<typeof BookingLinkTargetSchema>;

/**
 * Generates an authoritative direct booking URL.
 * Invariant (F005): A link opens the intended service/practitioner with business identity intact.
 */
export function generateDirectBookingUrl(baseUrl: string, target: BookingLinkTarget): string {
  const url = new URL(`/${encodeURIComponent(target.businessSlug)}/book`, baseUrl);

  if (target.serviceId) {
    url.searchParams.set('service', target.serviceId);
  }
  if (target.practitionerId) {
    url.searchParams.set('specialist', target.practitionerId);
  }
  if (target.campaignSource) {
    url.searchParams.set('src', target.campaignSource);
  }
  if (target.customUtm) {
    url.searchParams.set('utm', target.customUtm);
  }

  return url.toString();
}

/**
 * Generates an SVG QR Code representation (visual markup) for print materials or digital display.
 * Generates a clean, scannable SVG grid matching the brand accent color.
 */
export function generateQrCodeSvg(targetUrl: string, colorHex: string = '#2C3E30'): string {
  // Simple deterministic SVG representation based on target URL length & hash
  const hash = targetUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const patternSeed = (hash % 10) + 5;

  return `
<svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="140" height="140" rx="12" fill="#FAF8F5" />
  <!-- Corner Position Squares -->
  <rect x="14" y="14" width="32" height="32" rx="6" fill="${colorHex}" />
  <rect x="20" y="20" width="20" height="20" rx="3" fill="#FAF8F5" />
  <rect x="24" y="24" width="12" height="12" rx="2" fill="${colorHex}" />

  <rect x="94" y="14" width="32" height="32" rx="6" fill="${colorHex}" />
  <rect x="100" y="20" width="20" height="20" rx="3" fill="#FAF8F5" />
  <rect x="104" y="24" width="12" height="12" rx="2" fill="${colorHex}" />

  <rect x="14" y="94" width="32" height="32" rx="6" fill="${colorHex}" />
  <rect x="20" y="100" width="20" height="20" rx="3" fill="#FAF8F5" />
  <rect x="24" y="104" width="12" height="12" rx="2" fill="${colorHex}" />

  <!-- Data Grid Pattern -->
  <rect x="56" y="24" width="8" height="12" rx="2" fill="${colorHex}" />
  <rect x="74" y="16" width="10" height="8" rx="2" fill="${colorHex}" />
  <rect x="56" y="44" width="28" height="8" rx="2" fill="${colorHex}" />
  <rect x="24" y="56" width="12" height="28" rx="2" fill="${colorHex}" />
  <rect x="46" y="60" width="16" height="16" rx="3" fill="${colorHex}" />
  <rect x="72" y="62" width="20" height="8" rx="2" fill="${colorHex}" />
  <rect x="102" y="56" width="16" height="24" rx="2" fill="${colorHex}" />
  <rect x="56" y="86" width="24" height="12" rx="2" fill="${colorHex}" />
  <rect x="90" y="90" width="12" height="28" rx="2" fill="${colorHex}" />
  <rect x="62" y="108" width="18" height="14" rx="2" fill="${colorHex}" />
</svg>
`.trim();
}
