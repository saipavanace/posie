import { describe, it, expect } from 'vitest';
import {
  BrandKitSchema,
  updateBrandKit,
  getEffectiveServiceQuote,
  calculateInclusiveServicePrice,
  formatCanonicalLocationSummary,
  getUnifiedClientTimeline,
  resolveEffectiveServicePolicy,
  checkCalendarConflict,
  syncRemindersOnReschedule,
  generateRecurringProposal,
  processSelfServiceCancellation,
  createPasswordlessPortalSession,
  validatePortalSession,
  publishWebsiteConfig,
  generateLocalDiscoveryMetadata,
  createConsultationInquiry,
} from './index';

describe('Posie Core Logic - F001 (Brand Kit)', () => {
  const sampleBrand = {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    businessName: 'Posie Beauty Atelier',
    tagline: 'Glow up without the headache',
    contactEmail: 'hello@posieatelier.com',
    contactPhone: '+1-555-0199',
    logoSvg: '<svg><circle r="10"/></svg>',
    accentColor: '#C67D6E',
    toneOfVoice: 'quirky-playful' as const,
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('validates a correct brand kit structure', () => {
    const parsed = BrandKitSchema.parse(sampleBrand);
    expect(parsed.businessName).toBe('Posie Beauty Atelier');
  });
});

describe('Posie Core Logic - F032 (Brandable Booking Website)', () => {
  const siteConfig = {
    id: '11111111-1111-1111-1111-111111111111',
    businessSlug: 'posie-austin',
    customDomain: 'glow.posieatelier.com',
    layoutTheme: 'editorial_atelier' as const,
    heroHeadline: 'Skincare that feels like magic.',
    heroSubheadline: 'Bespoke facials and brows on South Congress.',
    accentColorHex: '#C67D6E',
    serviceOrderIds: [],
    showSpecialistBios: true,
    isPublished: true,
    version: 1,
  };

  it('increments version upon website publication', () => {
    const updated = publishWebsiteConfig(siteConfig, {
      heroHeadline: 'Effortless Radiance on South Congress.',
    });

    expect(updated.version).toBe(2);
    expect(updated.heroHeadline).toContain('Effortless Radiance');
  });
});

describe('Posie Core Logic - F033 (Website Search & Local Discovery)', () => {
  const loc = {
    id: '88888888-8888-8888-8888-888888888888',
    name: 'Posie Flagship Atelier',
    streetAddress: '1204 S Congress Ave',
    city: 'Austin',
    state: 'TX',
    zipCode: '78704',
    timeZone: 'America/Chicago',
    publicPhone: '+1-555-0199',
    publicEmail: 'hello@posieatelier.com',
    parkingInstructions: 'Complimentary valet.',
    arrivalDirections: '2nd floor.',
    accessibilityFeatures: ['Step-free ramp'],
    isActive: true,
  };

  const services = [
    {
      id: 'c8172c3d-d6a9-4519-9e8c-8f24c30c33ef',
      categoryId: 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
      name: 'Hydra-Dew Glass Glow Facial',
      clientDescription: 'A 60-minute deep cleanse.',
      basePriceInCents: 12000,
      baseDurationMinutes: 60,
      active: true,
      addons: [],
      practitionerOverrides: [],
      version: 1,
    },
  ];

  it('generates structured schema.org JSON-LD and crawlable metadata', () => {
    const meta = generateLocalDiscoveryMetadata(loc, services);
    expect(meta.metaTitle).toContain('Posie Flagship Atelier');
    expect(meta.canonicalUrl).toContain('/austin/posie-flagship-atelier');
    expect(meta.structuredDataJsonLd['@type']).toBe('BeautySalon');
    expect(meta.structuredDataJsonLd.hasMenu.length).toBe(1);
  });
});

describe('Posie Core Logic - F034 (Inquiry & Consultation Requests)', () => {
  it('creates consultation request queue with response deadline and photos', () => {
    const inquiry = createConsultationInquiry(
      'Maya S.',
      '+1-555-0199',
      'maya@example.com',
      'I have rosacea flare-ups and want to know if dermaplaning is safe for me.',
      ['https://example.com/skin-photo.jpg'],
      24
    );

    expect(inquiry.status).toBe('received');
    expect(inquiry.clientName).toBe('Maya S.');
    expect(inquiry.inspirationPhotoUrls.length).toBe(1);
    expect(inquiry.responseDeadlineUtc).toBeDefined();
  });
});
