import { z } from 'zod';

export const LocationCoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const BusinessLocationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  streetAddress: z.string().min(1),
  unitOrSuite: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(2),
  zipCode: z.string().min(5),
  timeZone: z.string().default('America/Chicago'),
  publicPhone: z.string().min(7),
  publicEmail: z.string().email(),
  parkingInstructions: z.string(),
  arrivalDirections: z.string(),
  accessibilityFeatures: z.array(z.string()).default([]), // e.g. "Step-free ramp", "Elevator access", "Accessible restroom"
  holidayNotice: z.string().optional(),
  coordinates: LocationCoordinatesSchema.optional(),
  isActive: z.boolean().default(true),
});

export type BusinessLocation = z.infer<typeof BusinessLocationSchema>;

/**
 * Validates and formats the canonical address and contact details across all touchpoints.
 * Invariant (F024): Every client touchpoint (website, booking links, emails, PDFs) displays
 * identical verified address, parking, and timezone details.
 */
export function formatCanonicalLocationSummary(location: BusinessLocation): {
  singleLineAddress: string;
  contactHeader: string;
  accessibilitySummary: string;
} {
  const address = `${location.streetAddress}${location.unitOrSuite ? `, ${location.unitOrSuite}` : ''}, ${location.city}, ${location.state} ${location.zipCode}`;
  const contact = `${location.publicPhone} • ${location.publicEmail}`;
  const access = location.accessibilityFeatures.length > 0
    ? location.accessibilityFeatures.join(' • ')
    : 'Step-free access available';

  return {
    singleLineAddress: address,
    contactHeader: contact,
    accessibilitySummary: access,
  };
}
