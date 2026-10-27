import { describe, it, expect } from 'vitest';
import {
  BrandKitSchema,
  updateBrandKit,
  getEffectiveServiceQuote,
  ServiceSchema,
  filterStaffForPublicDisplay,
  StaffProfileSchema,
  createPolicySnapshot,
  BookingPolicySchema,
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

  it('increments version on brand update and preserves invariants', () => {
    const updated = updateBrandKit(sampleBrand, {
      businessName: 'Posie Chic Salon',
    });
    expect(updated.version).toBe(2);
    expect(updated.businessName).toBe('Posie Chic Salon');
  });
});

describe('Posie Core Logic - F002 (Service Catalog)', () => {
  const sampleService = {
    id: 'c8172c3d-d6a9-4519-9e8c-8f24c30c33ef',
    categoryId: 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
    name: 'Hydra-Dew Glow Facial',
    clientDescription: 'A 60-minute deep cleanse that leaves you looking fresh.',
    preparationInstructions: 'Avoid retinoids for 48 hours prior.',
    basePriceInCents: 12000,
    baseDurationMinutes: 60,
    active: true,
    addons: [],
    practitionerOverrides: [
      {
        practitionerId: 'b3f5d8e2-1a4c-4e89-9b12-5c8e9f2a3b4c',
        priceInCents: 14000,
        durationMinutes: 75,
        effectiveFrom: '2026-01-01T00:00:00.000Z',
        effectiveTo: '2026-12-31T23:59:59.000Z',
      },
    ],
    version: 1,
  };

  it('validates service schemas accurately', () => {
    const parsed = ServiceSchema.parse(sampleService);
    expect(parsed.name).toBe('Hydra-Dew Glow Facial');
  });

  it('returns base price if no practitioner specified', () => {
    const quote = getEffectiveServiceQuote(sampleService);
    expect(quote.priceInCents).toBe(12000);
    expect(quote.durationMinutes).toBe(60);
    expect(quote.hasOverride).toBe(false);
  });

  it('returns override price if practitioner has active override', () => {
    const quote = getEffectiveServiceQuote(
      sampleService,
      'b3f5d8e2-1a4c-4e89-9b12-5c8e9f2a3b4c',
      new Date('2026-06-01T12:00:00Z')
    );
    expect(quote.priceInCents).toBe(14000);
    expect(quote.durationMinutes).toBe(75);
    expect(quote.hasOverride).toBe(true);
  });

  it('falls back to base price if date falls outside override window', () => {
    const quote = getEffectiveServiceQuote(
      sampleService,
      'b3f5d8e2-1a4c-4e89-9b12-5c8e9f2a3b4c',
      new Date('2027-02-01T12:00:00Z')
    );
    expect(quote.priceInCents).toBe(12000);
    expect(quote.durationMinutes).toBe(60);
    expect(quote.hasOverride).toBe(false);
  });
});

describe('Posie Core Logic - F003 (Staff Profiles)', () => {
  const staffList = [
    {
      id: 'd1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a',
      fullName: 'Chloe Martinez',
      displayName: 'Chloe',
      role: 'Master Esthetician',
      bio: 'Loves bouncy hydration and painless extractions.',
      isPublic: true,
      active: true,
      languages: ['English', 'Spanish'],
      skills: ['Chemical Peels', 'Dermaplaning'],
      eligibleServiceIds: [],
      portfolioItems: [
        {
          id: '11111111-2222-3333-4444-555555555555',
          imageUrl: 'https://example.com/photo1.jpg',
          caption: 'Glow finish after 1 session',
          clientConsentGranted: true,
        },
        {
          id: '66666666-7777-8888-9999-000000000000',
          imageUrl: 'https://example.com/photo2-private.jpg',
          caption: 'Internal check',
          clientConsentGranted: false,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'e2f3a4b5-c6d7-4e8f-9a0b-1c2d3e4f5a6b',
      fullName: 'Secret Trainee',
      displayName: 'Alex',
      role: 'Apprentice',
      bio: 'In training.',
      isPublic: false, // Private
      active: true,
      languages: ['English'],
      skills: [],
      eligibleServiceIds: [],
      portfolioItems: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  it('validates staff profile schemas', () => {
    expect(() => StaffProfileSchema.parse(staffList[0])).not.toThrow();
  });

  it('never exposes private staff to public view', () => {
    const publicStaff = filterStaffForPublicDisplay(staffList);
    expect(publicStaff.length).toBe(1);
    expect(publicStaff[0].displayName).toBe('Chloe');
  });

  it('never exposes portfolio items without explicit client consent', () => {
    const publicStaff = filterStaffForPublicDisplay(staffList);
    expect(publicStaff[0].portfolioItems.length).toBe(1);
    expect(publicStaff[0].portfolioItems[0].clientConsentGranted).toBe(true);
  });
});

describe('Posie Core Logic - F004 (Booking Policies)', () => {
  const policy = {
    id: 'f9e8d7c6-b5a4-4321-1234-567890abcdef',
    depositPercentage: 20,
    cancellationNoticeHours: 24,
    lateCancelFeePercentage: 50,
    noShowFeePercentage: 100,
    refundPolicyText: 'Full deposit refund if canceled 24 hours prior.',
    accessibilityContactEmail: 'access@posieatelier.com',
    accessibilityContactPhone: '+1-555-0100',
    stepFreeAccessAvailable: true,
    quietVisitAvailable: true,
    version: 1,
    effectiveDate: new Date().toISOString(),
  };

  it('validates booking policy schemas', () => {
    expect(() => BookingPolicySchema.parse(policy)).not.toThrow();
  });

  it('creates an immutable snapshot with full plain-language terms', () => {
    const snapshot = createPolicySnapshot(policy, '7a8b9c0d-1e2f-4a3b-9c8d-7e6f5a4b3c2d');
    expect(snapshot.policyId).toBe(policy.id);
    expect(snapshot.snapshotTerms).toContain('Deposit: 20% required');
    expect(snapshot.snapshotTerms).toContain('Cancellations: Must be made at least 24 hours');
    expect(snapshot.snapshotTerms).toContain('access@posieatelier.com');
    expect(snapshot.clientAcknowledged).toBe(true);
  });
});
