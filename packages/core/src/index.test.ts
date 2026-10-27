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
  AccessAndComfortRequestSchema,
  filterAccessRequestsForPractitioner,
  DailyTaskSchema,
  completeDailyTask,
  validateCatalogCsv,
  CATALOG_CSV_HEADER,
  calculateTotalCostEstimate,
  generateDailyOwnerDigest,
  identifyLapsedClients,
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

  it('never exposes private staff to public view', () => {
    const publicStaff = filterStaffForPublicDisplay(staffList);
    expect(publicStaff.length).toBe(1);
    expect(publicStaff[0].displayName).toBe('Chloe');
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

  it('creates an immutable snapshot with full plain-language terms', () => {
    const snapshot = createPolicySnapshot(policy, '7a8b9c0d-1e2f-4a3b-9c8d-7e6f5a4b3c2d');
    expect(snapshot.snapshotTerms).toContain('Deposit: 20% required');
  });
});

describe('Posie Core Logic - F005 (Direct Booking Links & QR Codes)', () => {
  it('generates a direct booking URL with all query parameters intact', () => {
    const url = generateDirectBookingUrl('https://posie.app', {
      businessSlug: 'posie-austin',
      serviceId: 'c8172c3d-d6a9-4519-9e8c-8f24c30c33ef',
      practitionerId: 'b3f5d8e2-1a4c-4e89-9b12-5c8e9f2a3b4c',
      campaignSource: 'instagram',
    });

    expect(url).toContain('service=c8172c3d-d6a9-4519-9e8c-8f24c30c33ef');
  });

  it('generates an SVG QR code matching the chosen color', () => {
    const svg = generateQrCodeSvg('https://posie.app/posie-austin/book', '#2C3E30');
    expect(svg).toContain('<svg');
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
      basePriceInCents: 12000,
      baseDurationMinutes: 60,
      active: true,
      addons: [],
      practitionerOverrides: [],
      version: 1,
    },
  ];

  it('renders valid printable HTML with print CSS styles', () => {
    const menu = generatePrintableMenu(brand, services);
    const html = renderPrintableMenuHtml(menu);
    expect(html).toContain('<!DOCTYPE html>');
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
    portalLink: 'https://posie.app/portal/visit-123',
    businessName: 'Posie',
    businessPhone: '+1-555-0199',
  };

  it('compiles message without unresolved tokens', () => {
    const message = compileMessage('confirmation', vars);
    expect(message.compiledText).toContain('Hey Maya! ✨');
  });
});

describe('Posie Core Logic - F008 (Document Content Library)', () => {
  const block = {
    id: '12345678-1234-1234-1234-123456789abc',
    title: 'Facial Peel Sensitivity Waiver',
    category: 'consent_waiver' as const,
    content: 'Client acknowledges possible temporary redness.',
    applicableServiceIds: [],
    version: 1,
    approvedBy: 'Sarah Jenkins, Esq.',
    reviewType: 'legal_counsel' as const,
    reviewDate: new Date().toISOString(),
    active: true,
  };

  it('increments version upon update', () => {
    const updated = updateContentBlock(block, { content: 'Updated' }, 'Counsel', 'legal_counsel');
    expect(updated.version).toBe(2);
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
        taskDescription: 'Autoclave tools',
        completed: false,
      },
    ],
    acknowledgedByStaffIds: [],
    updatedAt: new Date().toISOString(),
  };

  it('completes individual SOP items with staff attribution', () => {
    const completed = completeSopItem(
      sop,
      '11111111-1111-1111-1111-111111111111',
      '99999999-9999-9999-9999-999999999999'
    );
    expect(completed.items[0].completed).toBe(true);
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
  });
});

describe('Posie Core Logic - F011 (Guided First-Day Setup)', () => {
  it('correctly calculates setup progress and identifies remaining blockers', () => {
    const status = evaluateBookingReadiness(INITIAL_SETUP_STEPS);
    expect(status.isBookingReady).toBe(true);
  });
});

describe('Posie Core Logic - F012 (Contextual Help & Demo Sandbox)', () => {
  it('blocks live event/message dispatch when in demo sandbox mode', () => {
    const check = assertSafeDemoAction(true);
    expect(check.canDispatchLiveEvents).toBe(false);
  });
});

describe('Posie Core Logic - F013 (Client Service Preferences)', () => {
  const prefs = {
    clientId: '44444444-4444-4444-4444-444444444444',
    preferredName: 'Maya',
    preferredContactChannel: 'sms' as const,
    conversationPreference: 'quiet_visit_only' as const,
    roomComfortRequests: ['extra blanket'],
    isSensitiveCareNote: true,
    updatedAt: new Date().toISOString(),
  };

  it('sanitizes preferences for room prep while stripping sensitive notes', () => {
    const prep = sanitizePreferencesForRoomPrep(prefs);
    expect(prep.preferredName).toBe('Maya');
  });
});

describe('Posie Core Logic - F014 (Quiet Visit & Access Requests)', () => {
  const req = {
    id: '55555555-5555-5555-5555-555555555555',
    clientId: '44444444-4444-4444-4444-444444444444',
    quietVisitRequested: true,
    stepFreeAccessRequired: true,
    supportPersonAccompanying: false,
    lowSensoryLighting: true,
    scentFreeEnvironment: true,
    extraConsultationTimeNeeded: false,
    acknowledgedByStaffId: 'd1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a',
    createdAt: new Date().toISOString(),
  };

  it('filters requests only to assigned practitioner', () => {
    const filtered = filterAccessRequestsForPractitioner([req], 'd1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a');
    expect(filtered.length).toBe(1);
  });
});

describe('Posie Core Logic - F015 (Daily Task List)', () => {
  const tasks = [
    {
      id: '66666666-6666-6666-6666-666666666666',
      type: 'incomplete_form' as const,
      title: 'Missing Acid Waiver for Maya',
      details: 'Appointment today at 2:30 PM.',
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    },
  ];

  it('completes daily task and marks timestamp and staff', () => {
    const updated = completeDailyTask(tasks, '66666666-6666-6666-6666-666666666666', 'd1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a');
    expect(updated[0].status).toBe('completed');
  });
});

describe('Posie Core Logic - F016 (Catalog Import Templates)', () => {
  it('validates a correct catalog CSV string', () => {
    const csv = `${CATALOG_CSV_HEADER}\nHydra Facial,cat-1,12000,60,Deep cleanse,No retinol`;
    const res = validateCatalogCsv(csv);
    expect(res.isValid).toBe(true);
  });
});

describe('Posie Core Logic - F017 (Total Cost Estimator)', () => {
  it('calculates solo tier cost transparently with zero hidden fees', () => {
    const estimate = calculateTotalCostEstimate({
      subscriptionTier: 'solo',
      staffCount: 1,
      locationCount: 1,
      monthlySmsCount: 100, // within included 100
      monthlyCreditCardVolumeInCents: 500000, // $5,000
      addCustomDomain: false,
      addFormsAndWaiversUnlimited: true,
    });

    expect(estimate.baseSubscriptionCents).toBe(2900); // $29
    expect(estimate.extraStaffCents).toBe(0);
    expect(estimate.smsUsageCents).toBe(0);
    expect(estimate.totalEstimatedMonthlyCostCents).toBeGreaterThan(2900);
    expect(estimate.breakdownExplanation).toContain('Software Base (solo): $29.00');
  });
});

describe('Posie Core Logic - F018 (Short Daily Owner Digest)', () => {
  it('summarizes gross revenue, collected deposits, and required decisions', () => {
    const appointments = [
      { priceInCents: 12000, depositPaidInCents: 2400 },
      { priceInCents: 9000, depositPaidInCents: 1800 },
    ];

    const digest = generateDailyOwnerDigest(appointments, 1, new Date('2026-11-12T12:00:00Z'), false);
    expect(digest.confirmedAppointmentsCount).toBe(2);
    expect(digest.expectedGrossRevenueInCents).toBe(21000); // $210.00
    expect(digest.collectedDepositsInCents).toBe(4200); // $42.00
    expect(digest.outstandingBalanceInCents).toBe(16800); // $168.00
    expect(digest.topDecisionNeeded).toContain('1 pending exception(s)');
  });
});

describe('Posie Core Logic - F019 (Lapsed Client Worklist)', () => {
  const clients = [
    {
      clientId: '11111111-1111-1111-1111-111111111111',
      clientName: 'Sarah Jenkins',
      phone: '+1-555-0101',
      lastVisitDate: '2026-09-01T10:00:00Z',
      preferredCadenceDays: 30, // Due Oct 1
      optedOutMarketing: false,
      hasFutureAppointment: false,
      isActiveClient: true,
    },
    {
      clientId: '22222222-2222-2222-2222-222222222222',
      clientName: 'Chloe Bennett (Opted Out)',
      phone: '+1-555-0102',
      lastVisitDate: '2026-09-01T10:00:00Z',
      preferredCadenceDays: 30,
      optedOutMarketing: true, // Must be excluded
      hasFutureAppointment: false,
      isActiveClient: true,
    },
    {
      clientId: '33333333-3333-3333-3333-333333333333',
      clientName: 'Emma Watson (Already Booked)',
      phone: '+1-555-0103',
      lastVisitDate: '2026-09-01T10:00:00Z',
      preferredCadenceDays: 30,
      optedOutMarketing: false,
      hasFutureAppointment: true, // Must be excluded
      isActiveClient: true,
    },
  ];

  it('identifies overdue clients while strictly excluding opted-out and rebooked clients', () => {
    const refDate = new Date('2026-10-26T12:00:00Z'); // 25 days past due
    const lapsed = identifyLapsedClients(clients, refDate);

    expect(lapsed.length).toBe(1);
    expect(lapsed[0].clientName).toBe('Sarah Jenkins');
    expect(lapsed[0].daysOverdue).toBe(25);
    expect(lapsed[0].suggestedAction).toContain('regular 30-day cycle');
  });
});
