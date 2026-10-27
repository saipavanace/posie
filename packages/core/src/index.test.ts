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
  WeeklyGoalSchema,
  calculateGoalProgress,
  isSlotWithinOperatingHours,
  matchServiceToGoals,
  calculateInclusiveServicePrice,
  formatCanonicalLocationSummary,
  getUnifiedClientTimeline,
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

describe('Posie Core Logic - F023 (Inclusive Menu Options)', () => {
  it('calculates gender-neutral complexity pricing with zero hidden surcharges', () => {
    const base = 12000; // $120.00
    const extraDensityTier = {
      id: '12345678-1234-1234-1234-123456789abc',
      serviceId: 'c8172c3d-d6a9-4519-9e8c-8f24c30c33ef',
      tierName: 'Extended Extraction & Calming Cryo',
      durationMinutes: 75,
      priceInCents: 15000,
      isGenderNeutral: true as const,
    };

    const breakdown = calculateInclusiveServicePrice(base, extraDensityTier);
    expect(breakdown.basePriceInCents).toBe(12000);
    expect(breakdown.complexitySurchargeCents).toBe(3000);
    expect(breakdown.finalQuotedPriceInCents).toBe(15000);
    expect(breakdown.clientConsentedToRange).toBe(true);
  });
});

describe('Posie Core Logic - F024 (Business Contact & Opening Status)', () => {
  const loc = {
    id: '88888888-8888-8888-8888-888888888888',
    name: 'Posie Flagship Atelier',
    streetAddress: '1204 S Congress Ave',
    unitOrSuite: 'Suite 200',
    city: 'Austin',
    state: 'TX',
    zipCode: '78704',
    timeZone: 'America/Chicago',
    publicPhone: '+1-555-0199',
    publicEmail: 'hello@posieatelier.com',
    parkingInstructions: 'Reserved client parking behind building or complimentary valet.',
    arrivalDirections: 'Take elevator to 2nd floor, turn right.',
    accessibilityFeatures: ['Step-free ramp', 'Elevator access', 'Accessible restrooms'],
    isActive: true,
  };

  it('formats canonical address, contact, and accessibility summaries across surfaces', () => {
    const summary = formatCanonicalLocationSummary(loc);
    expect(summary.singleLineAddress).toBe('1204 S Congress Ave, Suite 200, Austin, TX 78704');
    expect(summary.contactHeader).toBe('+1-555-0199 • hello@posieatelier.com');
    expect(summary.accessibilitySummary).toContain('Step-free ramp');
  });
});

describe('Posie Core Logic - F025 (Unified Client Timeline)', () => {
  const events = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      clientId: '44444444-4444-4444-4444-444444444444',
      type: 'completed_visit' as const,
      title: 'Hydra-Dew Glass Glow Facial',
      summary: 'Delivered 60-min treatment with extra scalp massage.',
      recordedAt: '2026-10-01T14:00:00Z',
      actorName: 'Chloe',
      actorRole: 'esthetician' as const,
      isRestrictedClinicalOrPrivate: false,
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      clientId: '44444444-4444-4444-4444-444444444444',
      type: 'practitioner_treatment_note' as const,
      title: 'Private Skin Sensitivity Observation',
      summary: 'Mild erythma noted on nasal folds after glycolic 10%. Used aloe soothing compress.',
      recordedAt: '2026-10-01T14:30:00Z',
      actorName: 'Chloe',
      actorRole: 'esthetician' as const,
      isRestrictedClinicalOrPrivate: true, // Restricted
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      clientId: '44444444-4444-4444-4444-444444444444',
      type: 'retail_purchase' as const,
      title: 'Barrier Repair Ceramide Balm',
      summary: 'Purchased 1x take-home balm ($45.00).',
      recordedAt: '2026-10-01T15:00:00Z',
      actorName: 'Maya',
      actorRole: 'client' as const,
      isRestrictedClinicalOrPrivate: false,
    },
  ];

  it('orders timeline chronologically descending', () => {
    const timeline = getUnifiedClientTimeline(events, 'esthetician');
    expect(timeline.length).toBe(3);
    expect(timeline[0].type).toBe('retail_purchase'); // 15:00
    expect(timeline[1].type).toBe('practitioner_treatment_note'); // 14:30
    expect(timeline[2].type).toBe('completed_visit'); // 14:00
  });

  it('restricts private treatment notes from client and receptionist views', () => {
    const clientView = getUnifiedClientTimeline(events, 'client');
    expect(clientView.length).toBe(2);
    expect(clientView.find((e) => e.type === 'practitioner_treatment_note')).toBeUndefined();

    const receptionistView = getUnifiedClientTimeline(events, 'receptionist');
    expect(receptionistView.length).toBe(2);
    expect(receptionistView.find((e) => e.type === 'practitioner_treatment_note')).toBeUndefined();
  });
});
