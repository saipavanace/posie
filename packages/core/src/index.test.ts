import { describe, it, expect } from 'vitest';
import {
  BrandKitSchema,
  publishWebsiteConfig,
  generateLocalDiscoveryMetadata,
  createConsultationInquiry,
  isQuestionVisible,
  validateIntakeForm,
  saveIntakeSubmission,
  createDocumentDraft,
  issueDocument,
  renderPrintableHtml,
  createAftercareTemplate,
  approveAftercareTemplate,
  deliverAftercare,
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

describe('Posie Core Logic - F035 (Conditional Intake Forms)', () => {
  const formTemplate = {
    id: '55555555-5555-5555-5555-555555555555',
    title: 'Facial & Chemical Peel Intake',
    version: 1,
    questions: [
      {
        id: 'q_accutane',
        label: 'Are you currently taking or have you taken Accutane in the last 6 months?',
        type: 'boolean' as const,
        required: true,
        sensitiveReason: 'Accutane causes severe skin sensitivity and contraindicates chemical peels.',
      },
      {
        id: 'q_accutane_details',
        label: 'When was your last dose of Accutane?',
        type: 'text' as const,
        required: true,
        condition: {
          dependsOnQuestionId: 'q_accutane',
          operator: 'equals' as const,
          expectedValue: true,
        },
      },
      {
        id: 'q_skin_goals',
        label: 'What is your primary skin goal today?',
        type: 'text' as const,
        required: true,
      },
    ],
  };

  it('evaluates branching visibility and does not require hidden questions', () => {
    // When q_accutane is false, q_accutane_details is hidden
    const responsesNoAccutane = {
      q_accutane: false,
      q_skin_goals: 'Hydration and glowing skin',
    };

    const valNoAccutane = validateIntakeForm(formTemplate, responsesNoAccutane);
    expect(valNoAccutane.isValid).toBe(true);
    expect(valNoAccutane.visibleQuestionIds).not.toContain('q_accutane_details');
    expect(valNoAccutane.missingQuestionIds).toHaveLength(0);

    // Autosave as completed succeeds
    const completed = saveIntakeSubmission({
      template: formTemplate,
      clientId: '66666666-6666-6666-6666-666666666666',
      responses: responsesNoAccutane,
      markCompleted: true,
    });
    expect(completed.status).toBe('completed');
  });

  it('requires dependent questions when condition is met', () => {
    // When q_accutane is true, q_accutane_details is visible and required
    const responsesAccutaneMissingDetails = {
      q_accutane: true,
      q_skin_goals: 'Clear pores',
    };

    const val = validateIntakeForm(formTemplate, responsesAccutaneMissingDetails);
    expect(val.isValid).toBe(false);
    expect(val.visibleQuestionIds).toContain('q_accutane_details');
    expect(val.missingQuestionIds).toContain('q_accutane_details');

    // Attempting to finalize incomplete submission throws
    expect(() =>
      saveIntakeSubmission({
        template: formTemplate,
        clientId: '66666666-6666-6666-6666-666666666666',
        responses: responsesAccutaneMissingDetails,
        markCompleted: true,
      })
    ).toThrow(/Missing required answers/);

    // Draft autosave succeeds even if incomplete
    const draft = saveIntakeSubmission({
      template: formTemplate,
      clientId: '66666666-6666-6666-6666-666666666666',
      responses: responsesAccutaneMissingDetails,
      markCompleted: false,
    });
    expect(draft.status).toBe('draft');
  });
});

describe('Posie Core Logic - F036 (Branded Document Generation)', () => {
  const business = {
    name: 'Posie Skin Atelier',
    contactNumber: '+1-555-0199',
    email: 'hello@posie.com',
  };

  const client = {
    id: '77777777-7777-7777-7777-777777777777',
    name: 'Clara Oswald',
    phone: '+1-555-4321',
  };

  it('creates draft, calculates totals, and blocks issuance on missing items', () => {
    const emptyDraft = createDocumentDraft({
      type: 'estimate_quote',
      title: 'Bespoke Bridal Treatment Plan',
      authorStaffId: '99999999-9999-9999-9999-999999999999',
      business,
      client,
      lineItems: [],
    });

    expect(() => issueDocument(emptyDraft, 1)).toThrow(/at least one line item/);
  });

  it('issues branded document with sequence number and renders accessible print HTML', () => {
    const draft = createDocumentDraft({
      type: 'estimate_quote',
      title: 'Bridal Radiance Series',
      authorStaffId: '99999999-9999-9999-9999-999999999999',
      business,
      client,
      lineItems: [
        { description: 'Glass Glow HydraFacial (x3 Series)', quantity: 1, unitPriceCents: 45000 },
        { description: 'Collagene Lift Eye Mask', quantity: 3, unitPriceCents: 3500 },
      ],
      taxRatePercent: 8,
      clauses: ['Valid for 30 days from issue date.', 'Non-refundable after 1st session.'],
    });

    expect(draft.subtotalCents).toBe(45000 + 10500); // 55500
    expect(draft.taxCents).toBe(4440); // 8% of 55500 = 4440
    expect(draft.totalCents).toBe(59940);

    const issued = issueDocument(draft, 42);
    expect(issued.status).toBe('issued');
    expect(issued.documentNumber).toBe(`EST-${new Date().getFullYear()}-0042`);
    expect(issued.issuedAt).toBeDefined();

    const html = renderPrintableHtml(issued);
    expect(html).toContain('Posie Skin Atelier');
    expect(html).toContain('Glass Glow HydraFacial');
    expect(html).toContain('$599.40');
    expect(html).toContain('Valid for 30 days');
  });
});

describe('Posie Core Logic - F037 (Approved Aftercare Delivery)', () => {
  const template = createAftercareTemplate({
    serviceId: '12121212-1212-1212-1212-121212121212',
    serviceName: 'Level 2 TCA Chemical Peel',
    emergencyContactRoute: 'Direct text Chloe at (555) 234-5678 or salon desk',
    instructions: [
      {
        stepNumber: 1,
        title: 'Do Not Pick or Peel',
        instruction: 'Allow peeling skin to slough off naturally to prevent hyperpigmentation.',
        timingWindow: 'Days 2 through 7',
        doNotDoWarning: 'Never pull flakes of dry skin manually.',
      },
      {
        stepNumber: 2,
        title: 'Broad Spectrum SPF 50',
        instruction: 'Apply mineral zinc oxide SPF 50 every 2 hours if near windows or outside.',
        timingWindow: 'First 14 days continuously',
      },
    ],
  });

  it('prevents delivery until approved by a qualified practitioner', () => {
    expect(() =>
      deliverAftercare({
        template,
        appointmentId: '13131313-1313-1313-1313-131313131313',
        clientId: '14141414-1414-1414-1414-141414141414',
        deliveredByStaffId: '99999999-9999-9999-9999-999999999999',
        deliveryMethod: 'sms',
        recipientDestination: '+1-555-8888',
      })
    ).toThrow(/must be approved by a qualified practitioner/);
  });

  it('delivers approved aftercare and locks snapshot against future edits', () => {
    const approved = approveAftercareTemplate(
      template,
      '99999999-9999-9999-9999-999999999999'
    );
    expect(approved.practitionerApprovedStaffId).toBe('99999999-9999-9999-9999-999999999999');

    const delivery = deliverAftercare({
      template: approved,
      appointmentId: '13131313-1313-1313-1313-131313131313',
      clientId: '14141414-1414-1414-1414-141414141414',
      deliveredByStaffId: '99999999-9999-9999-9999-999999999999',
      deliveryMethod: 'sms',
      recipientDestination: '+1-555-8888',
    });

    expect(delivery.snapshotInstructions.length).toBe(2);
    expect(delivery.directContactRoute).toContain('Chloe');

    // Subsequent modifications to original template do not change delivered snapshot
    approved.instructions.push({
      stepNumber: 3,
      title: 'New revised step',
      instruction: 'Do this extra thing',
      timingWindow: 'Day 10',
    });

    expect(delivery.snapshotInstructions.length).toBe(2);
  });
});
