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
  generateDirectBookingUrl,
  generateQrCodeSvg,
  generatePrintableMenu,
  renderPrintableMenuHtml,
  compileMessage,
  ContentBlockSchema,
  updateContentBlock,
  SopChecklistSchema,
  updateSopChecklist,
  completeSopItem,
  getVisibleWorkspaceSections,
  toggleWorkspaceModule,
  evaluateBookingReadiness,
  INITIAL_SETUP_STEPS,
  createDemoSandbox,
  assertSafeDemoAction,
  ClientServicePreferencesSchema,
  sanitizePreferencesForRoomPrep,
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
      isPublic: false,
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

describe('Posie Core Logic - F005 (Direct Booking Links & QR Codes)', () => {
  it('generates a direct booking URL with all query parameters intact', () => {
    const url = generateDirectBookingUrl('https://posie.app', {
      businessSlug: 'posie-austin',
      serviceId: 'c8172c3d-d6a9-4519-9e8c-8f24c30c33ef',
      practitionerId: 'b3f5d8e2-1a4c-4e89-9b12-5c8e9f2a3b4c',
      campaignSource: 'instagram',
      customUtm: 'bio_link_spring',
    });

    expect(url).toBe(
      'https://posie.app/posie-austin/book?service=c8172c3d-d6a9-4519-9e8c-8f24c30c33ef&specialist=b3f5d8e2-1a4c-4e89-9b12-5c8e9f2a3b4c&src=instagram&utm=bio_link_spring'
    );
  });

  it('generates an SVG QR code matching the chosen color', () => {
    const svg = generateQrCodeSvg('https://posie.app/posie-austin/book', '#2C3E30');
    expect(svg).toContain('<svg');
    expect(svg).toContain('#2C3E30');
    expect(svg).toContain('fill="#FAF8F5"');
  });
});

describe('Posie Core Logic - F006 (Printable Branded Materials)', () => {
  const brand = {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    businessName: 'Posie Beauty Atelier',
    contactEmail: 'hello@posieatelier.com',
    contactPhone: '+1-555-0199',
    logoSvg: '<svg></svg>',
    accentColor: '#C67D6E',
    toneOfVoice: 'quirky-playful' as const,
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const services = [
    {
      id: 'c8172c3d-d6a9-4519-9e8c-8f24c30c33ef',
      categoryId: 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
      name: 'Hydra-Dew Glow Facial',
      clientDescription: 'A 60-minute deep cleanse.',
      preparationInstructions: 'Stop retinol 48h prior.',
      basePriceInCents: 12000,
      baseDurationMinutes: 60,
      active: true,
      addons: [],
      practitionerOverrides: [],
      version: 1,
    },
  ];

  it('creates a printable price menu matching active catalog items', () => {
    const menu = generatePrintableMenu(brand, services);
    expect(menu.businessName).toBe('Posie Beauty Atelier');
    expect(menu.items.length).toBe(1);
    expect(menu.items[0].priceFormatted).toBe('$120.00');
  });

  it('renders valid printable HTML with print CSS styles', () => {
    const menu = generatePrintableMenu(brand, services);
    const html = renderPrintableMenuHtml(menu);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Posie Beauty Atelier');
    expect(html).toContain('$120.00');
  });
});

describe('Posie Core Logic - F007 (Message Template Library)', () => {
  const vars = {
    clientFirstName: 'Maya',
    serviceName: 'Hydra-Dew Glow Facial',
    appointmentDateFormatted: 'Thursday, Nov 12',
    appointmentTimeFormatted: '2:30 PM',
    specialistName: 'Chloe',
    depositPaidFormatted: '$24.00',
    remainingBalanceFormatted: '$96.00',
    prepSummary: 'Stop retinol 48 hours prior.',
    portalLink: 'https://posie.app/portal/visit-123',
    businessName: 'Posie',
    businessPhone: '+1-555-0199',
  };

  it('compiles a confirmation message in the quirky/playful tone without unresolved tokens', () => {
    const message = compileMessage('confirmation', vars);
    expect(message.compiledText).toContain('Hey Maya! ✨');
    expect(message.compiledText).toContain('Hydra-Dew Glow Facial');
    expect(message.compiledText).not.toContain('{{');
  });

  it('throws a validation error when required variables are missing', () => {
    // @ts-expect-error deliberately missing variables
    expect(() => compileMessage('confirmation', { clientFirstName: 'Maya' })).toThrow();
  });
});

describe('Posie Core Logic - F008 (Document Content Library)', () => {
  const block = {
    id: '12345678-1234-1234-1234-123456789abc',
    title: 'Facial Peel Sensitivity Waiver',
    category: 'consent_waiver' as const,
    content: 'Client acknowledges possible temporary redness after glycolic peel treatment.',
    applicableServiceIds: [],
    version: 1,
    approvedBy: 'Sarah Jenkins, Esq.',
    reviewType: 'legal_counsel' as const,
    reviewDate: new Date().toISOString(),
    active: true,
  };

  it('validates content block schemas', () => {
    expect(() => ContentBlockSchema.parse(block)).not.toThrow();
  });

  it('increments version and updates review credentials upon revision', () => {
    const updated = updateContentBlock(
      block,
      { content: 'Client acknowledges possible temporary tingling or redness.' },
      'Dr. Lisa Vance',
      'licensed_esthetician'
    );
    expect(updated.version).toBe(2);
    expect(updated.approvedBy).toBe('Dr. Lisa Vance');
    expect(updated.content).toContain('tingling');
  });
});

describe('Posie Core Logic - F009 (Staff SOPs & Checklists)', () => {
  const sop = {
    id: '87654321-4321-4321-4321-cba987654321',
    title: 'Morning Studio Sanitization SOP',
    type: 'opening' as const,
    assignedRole: 'Lead Esthetician',
    version: 1,
    items: [
      {
        id: '11111111-1111-1111-1111-111111111111',
        taskDescription: 'Autoclave stainless steel tools at 270°F for 30 mins',
        completed: false,
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        taskDescription: 'Disinfect treatment beds with hospital-grade surface wipes',
        completed: false,
      },
    ],
    acknowledgedByStaffIds: ['33333333-3333-3333-3333-333333333333'],
    updatedAt: new Date().toISOString(),
  };

  it('validates SOP schemas properly', () => {
    expect(() => SopChecklistSchema.parse(sop)).not.toThrow();
  });

  it('completes individual SOP items with staff attribution', () => {
    const completed = completeSopItem(
      sop,
      '11111111-1111-1111-1111-111111111111',
      '99999999-9999-9999-9999-999999999999'
    );
    expect(completed.items[0].completed).toBe(true);
    expect(completed.items[0].completedByStaffId).toBe('99999999-9999-9999-9999-999999999999');
    expect(completed.items[1].completed).toBe(false);
  });

  it('resets acknowledgment tracking when SOP checklist is updated', () => {
    const updated = updateSopChecklist(
      sop,
      [
        { id: '11111111-1111-1111-1111-111111111111', taskDescription: 'Updated autoclave run' },
      ],
      'Revised Morning SOP'
    );
    expect(updated.version).toBe(2);
    expect(updated.title).toBe('Revised Morning SOP');
    expect(updated.acknowledgedByStaffIds.length).toBe(0);
  });
});

describe('Posie Core Logic - F010 (Progressive Feature Setup)', () => {
  const soloFlags = {
    soloPractitionerMode: true,
    teamManagementEnabled: false,
    retailInventoryEnabled: false,
    classesAndWorkshopsEnabled: false,
    boothRenterSeparationEnabled: false,
    clinicalChartingEnabled: false,
  };

  it('returns clean uncluttered sections for solo practitioners', () => {
    const visible = getVisibleWorkspaceSections(soloFlags);
    expect(visible).toEqual(['schedule', 'clients', 'services', 'settings']);
    expect(visible).not.toContain('team');
  });

  it('reveals team section when team management is toggled', () => {
    const updated = toggleWorkspaceModule(soloFlags, 'teamManagementEnabled', true);
    const visible = getVisibleWorkspaceSections(updated);
    expect(visible).toContain('team');
    expect(updated.soloPractitionerMode).toBe(false);
  });
});

describe('Posie Core Logic - F011 (Guided First-Day Setup)', () => {
  it('correctly calculates setup progress and identifies remaining blockers', () => {
    const status = evaluateBookingReadiness(INITIAL_SETUP_STEPS);
    expect(status.isBookingReady).toBe(true); // essential services & policy steps are configured
    expect(status.progressPercentage).toBe(80); // 4 out of 5 steps completed
  });

  it('flags booking readiness as false if service is missing', () => {
    const incompleteSteps = INITIAL_SETUP_STEPS.map((s) =>
      s.key === 'first_service' ? { ...s, completed: false } : s
    );
    const status = evaluateBookingReadiness(incompleteSteps);
    expect(status.isBookingReady).toBe(false);
    expect(status.unresolvedBlockers).toContain('Must configure at least one active service.');
  });
});

describe('Posie Core Logic - F012 (Contextual Help & Demo Sandbox)', () => {
  it('generates an isolated demo sandbox business with fictional records', () => {
    const sandbox = createDemoSandbox();
    expect(sandbox.isDemoTenant).toBe(true);
    expect(sandbox.fictionalClients.length).toBe(2);
    expect(sandbox.fictionalClients[0].isFictional).toBe(true);
  });

  it('blocks live event/message dispatch when in demo sandbox mode', () => {
    const check = assertSafeDemoAction(true);
    expect(check.canDispatchLiveEvents).toBe(false);
  });
});

describe('Posie Core Logic - F013 (Client Service Preferences)', () => {
  const prefs = {
    clientId: '44444444-4444-4444-4444-444444444444',
    preferredName: 'Maya',
    namePronunciation: 'MY-uh',
    preferredContactChannel: 'sms' as const,
    conversationPreference: 'quiet_visit_only' as const,
    roomComfortRequests: ['extra blanket', 'low lighting'],
    privatePractitionerNotes: 'Skin reacts easily to heavy citrus scents.',
    isSensitiveCareNote: true,
    updatedAt: new Date().toISOString(),
  };

  it('validates client preference schemas', () => {
    expect(() => ClientServicePreferencesSchema.parse(prefs)).not.toThrow();
  });

  it('sanitizes preferences for room prep while stripping sensitive notes from public export', () => {
    const prep = sanitizePreferencesForRoomPrep(prefs);
    expect(prep.preferredName).toBe('Maya');
    expect(prep.conversationPreference).toBe('quiet_visit_only');
    expect(prep.roomComfortRequests).toContain('extra blanket');
    // @ts-expect-error privatePractitionerNotes must not be in sanitized room prep
    expect(prep.privatePractitionerNotes).toBeUndefined();
  });
});
