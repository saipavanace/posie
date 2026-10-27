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
  generateDocxExportManifest,
  createAftercareTemplate,
  approveAftercareTemplate,
  deliverAftercare,
  formatAftercareClientSummary,
  createTreatmentNoteDraft,
  signTreatmentNote,
  addNoteAmendment,
  registerBaseTreatmentImage,
  addAnnotationLayer,
  grantMediaPublicationConsent,
  revokeMediaPublicationConsent,
  createHomeCarePlan,
  reviseHomeCarePlan,
  formatHomeCarePrintableCard,
  getPreviousIntakeAnswersForReview,
  processRepeatIntakeReview,
  createPatchTestApplication,
  recordPatchTestEvaluation,
  checkServicePatchTestReadiness,
  compileAppointmentFormRequirements,
  evaluateAppointmentFormReadiness,
  reevaluateOnServiceChange,
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

    // Draft autosave succeeds even if incomplete and tracks revision count
    const draft = saveIntakeSubmission({
      template: formTemplate,
      clientId: '66666666-6666-6666-6666-666666666666',
      responses: responsesAccutaneMissingDetails,
      markCompleted: false,
    });
    expect(draft.status).toBe('draft');
    expect(draft.revisionCount).toBe(1);

    const draftRev2 = saveIntakeSubmission({
      template: formTemplate,
      clientId: '66666666-6666-6666-6666-666666666666',
      responses: { ...responsesAccutaneMissingDetails, note: 'Updated draft' },
      existingSubmission: draft,
      markCompleted: false,
    });
    expect(draftRev2.revisionCount).toBe(2);
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

    const manifest = generateDocxExportManifest(issued);
    expect(manifest.documentNumber).toContain('EST-');
    expect(manifest.sections.length).toBe(3);
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

    const summary = formatAftercareClientSummary(delivery);
    expect(summary).toContain('Aftercare Protocol:');
    expect(summary).toContain('Broad Spectrum SPF 50');
    expect(summary).toContain('Chloe at (555) 234-5678');

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


describe('Posie Core Logic - F038 (Structured Treatment Notes & SOAP Charting)', () => {
  const noteDraft = createTreatmentNoteDraft({
    appointmentId: '15151515-1515-1515-1515-151515151515',
    clientId: '16161616-1616-1616-1616-161616161616',
    serviceId: '17171717-1717-1717-1717-171717171717',
    domain: 'facial',
    authorStaffId: '99999999-9999-9999-9999-999999999999',
    soap: {
      subjective: 'Client reports dehydration and slight congestion around chin.',
      objective: 'Fitzpatrick Type II skin, mild comedones on chin, no active inflammatory acne.',
      assessment: 'Skin tolerated ultrasonic extractions and enzyme peel well with no erythema.',
      plan: 'Follow up in 4 weeks for maintenance; prescribed ceramide barrier serum.',
    },
    productsUsed: [
      { productName: 'Papaya Enzyme Polish', brand: 'Posie Professional', amountUsed: '5ml' },
      { productName: 'Hyaluronic Quench Gel', brand: 'Posie Professional', amountUsed: '3 pumps' },
    ],
    clientStatedResponse: 'Client felt immediate cooling and comfort during treatment.',
  });

  it('manages draft lifecycle and locks on sign', () => {
    expect(noteDraft.status).toBe('draft');
    expect(noteDraft.productsUsed.length).toBe(2);

    // Amending unfinalized draft throws
    expect(() =>
      addNoteAmendment(noteDraft, {
        amendedByStaffId: '99999999-9999-9999-9999-999999999999',
        reason: 'Add note',
        contentAddition: 'Extra detail',
      })
    ).toThrow(/Amendments are only for finalized/);

    const signed = signTreatmentNote(noteDraft, '99999999-9999-9999-9999-999999999999');
    expect(signed.status).toBe('signed');
    expect(signed.signedAt).toBeDefined();

    // Re-signing throws
    expect(() => signTreatmentNote(signed, '99999999-9999-9999-9999-999999999999')).toThrow(
      /already been signed/
    );

    // Appending amendment
    const amended = addNoteAmendment(signed, {
      amendedByStaffId: '99999999-9999-9999-9999-999999999999',
      reason: 'Post-treatment follow-up call at 24h',
      contentAddition: 'Client confirmed zero peeling or redness the next morning.',
    });

    expect(amended.amendments.length).toBe(1);
    expect(amended.amendments[0].contentAddition).toContain('zero peeling');
  });
});

describe('Posie Core Logic - F039 (Image Annotation Tools & Face Mapping)', () => {
  const originalUrl = 'https://posie-storage.internal/photos/client-1616-before.jpg';
  const checksum = 'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const baseImage = registerBaseTreatmentImage({
    clientId: '16161616-1616-1616-1616-161616161616',
    appointmentId: '15151515-1515-1515-1515-151515151515',
    originalImageUrl: originalUrl,
    originalImageChecksum: checksum,
    authorStaffId: '99999999-9999-9999-9999-999999999999',
  });

  it('adds non-destructive annotation layer preserving raw photo', () => {
    expect(baseImage.permissionScope).toBe('internal_charting_only');
    expect(baseImage.originalImageChecksum).toBe(checksum);

    const annotated = addAnnotationLayer(baseImage, {
      layerType: 'face_zones',
      title: 'Chemical Peel Sensitivity Zones',
      authorStaffId: '99999999-9999-9999-9999-999999999999',
      markers: [
        {
          id: 'm1',
          zone: 'T-Zone',
          xPercent: 50,
          yPercent: 35,
          label: 'Avoid extra acid pass here due to mild rosacea',
        },
      ],
    });

    // Original image remains unaltered
    expect(annotated.originalImageUrl).toBe(originalUrl);
    expect(annotated.originalImageChecksum).toBe(checksum);
    expect(annotated.annotationLayers.length).toBe(1);
    expect(annotated.annotationLayers[0].markers[0].zone).toBe('T-Zone');

    // Grant separate explicit media consent
    const consented = grantMediaPublicationConsent(annotated, new Date().toISOString());
    expect(consented.permissionScope).toBe('marketing_consented');

    // Revocation resets to internal charting
    const revoked = revokeMediaPublicationConsent(consented);
    expect(revoked.permissionScope).toBe('internal_charting_only');
    expect(revoked.consentRevokedAt).toBeDefined();
  });
});

describe('Posie Core Logic - F040 (Home-Care Regimen Plans)', () => {
  const plan = createHomeCarePlan({
    clientId: '16161616-1616-1616-1616-161616161616',
    title: 'Post-Peel Gentle Barrier Recovery Routine',
    prescribedByStaffId: '99999999-9999-9999-9999-999999999999',
    routineSteps: [
      {
        stepNumber: 1,
        timeOfDay: 'morning',
        productName: 'Milky Oat Cleanser',
        purpose: 'Non-stripping cleanse',
        usageInstructions: 'Massage gently with lukewarm water. Pat dry.',
      },
      {
        stepNumber: 2,
        timeOfDay: 'morning',
        productName: 'Mineral Barrier Zinc SPF 50',
        purpose: 'Broad spectrum UV defense',
        usageInstructions: 'Apply 2 finger lengths to face and neck every morning.',
      },
      {
        stepNumber: 1,
        timeOfDay: 'evening',
        productName: 'Lipid Repair Night Balm',
        purpose: 'Deep moisture replenishment',
        usageInstructions: 'Warm pea-sized amount between palms and press into skin.',
      },
    ],
    clientPreferencesHonored: ['Fragrance-Free Only', 'Minimalist (Under 3 steps)'],
  });

  it('creates versioned home-care plan and bathroom mirror printable card', () => {
    expect(plan.version).toBe(1);
    expect(plan.routineSteps.length).toBe(3);

    const card = formatHomeCarePrintableCard(plan);
    expect(card).toContain('MORNING ROUTINE');
    expect(card).toContain('Milky Oat Cleanser');
    expect(card).toContain('EVENING ROUTINE');
    expect(card).toContain('Fragrance-Free Only');

    // Revise plan to version 2
    const revised = reviseHomeCarePlan(plan, {
      prescribedByStaffId: '99999999-9999-9999-9999-999999999999',
      changeReason: 'Client transitioned from healing phase to active brightening.',
      routineSteps: [
        ...plan.routineSteps,
        {
          stepNumber: 2,
          timeOfDay: 'evening',
          productName: 'Gentle Azelaic 10% Treatment',
          purpose: 'Target residual post-inflammatory redness',
          usageInstructions: 'Apply 3 nights per week after cleansing.',
        },
      ],
    });

    expect(revised.version).toBe(2);
    expect(revised.changeSummaryFromPreviousVersion).toContain('Version 1 -> 2');
    expect(revised.routineSteps.length).toBe(4);
  });
});


describe('Posie Core Logic - F041 (Changes Since Last Visit & Intake Delta Review)', () => {
  const formTemplate = {
    id: '55555555-5555-5555-5555-555555555555',
    title: 'Facial & Chemical Peel Intake',
    version: 1,
    questions: [
      {
        id: 'q_meds',
        label: 'Current prescription medications or topical acids?',
        type: 'text' as const,
        required: true,
      },
      {
        id: 'q_skin_goals',
        label: 'What is your primary skin goal today?',
        type: 'text' as const,
        required: true,
      },
    ],
  };

  const baselineSubmission = saveIntakeSubmission({
    id: '11111111-2222-3333-4444-555555555555',
    template: formTemplate,
    clientId: '66666666-6666-6666-6666-666666666666',
    responses: {
      q_meds: 'None',
      q_skin_goals: 'Hydration',
    },
    markCompleted: true,
  });

  it('allows fast confirmation with zero changes preserving baseline', () => {
    const review = processRepeatIntakeReview({
      template: formTemplate,
      clientId: '66666666-6666-6666-6666-666666666666',
      appointmentId: '77777777-8888-9999-0000-111111111111',
      baselineSubmission,
      confirmationType: 'confirmed_no_changes',
    });

    expect(review.confirmationType).toBe('confirmed_no_changes');
    expect(review.changesReported.length).toBe(0);
    expect(review.requiresPractitionerTriage).toBe(false);
    expect(review.finalResponses.q_meds).toBe('None');
    // Baseline submission is unchanged
    expect(baselineSubmission.responses.q_meds).toBe('None');
  });

  it('detects changes in sensitive questions and flags practitioner triage', () => {
    const review = processRepeatIntakeReview({
      template: formTemplate,
      clientId: '66666666-6666-6666-6666-666666666666',
      appointmentId: '77777777-8888-9999-0000-111111111111',
      baselineSubmission,
      confirmationType: 'updated_with_changes',
      updatedResponses: {
        q_meds: 'Started Spironolactone 50mg daily',
        q_skin_goals: 'Hormonal breakout prevention',
      },
      sensitiveQuestionIds: ['q_meds'],
    });

    expect(review.confirmationType).toBe('updated_with_changes');
    expect(review.changesReported.length).toBe(2);
    expect(review.requiresPractitionerTriage).toBe(true);
    expect(review.triageReason).toContain('Current prescription medications');
    expect(review.finalResponses.q_meds).toContain('Spironolactone');
  });
});

describe('Posie Core Logic - F042 (Patch Test Record & Readiness Tracking)', () => {
  const application = createPatchTestApplication({
    clientId: '66666666-6666-6666-6666-666666666666',
    productName: 'Ultra-Hold Lash Adhesive Cyanoacrylate',
    brand: 'Posie Pro Lash',
    lotNumber: 'LOT-9821',
    patchLocation: 'Behind right ear',
    appliedByStaffId: '99999999-9999-9999-9999-999999999999',
    validityDays: 180,
  });

  it('manages evaluation lifecycle, contraindications, and expiry checks', () => {
    expect(application.readinessStatus).toBe('pending_evaluation');

    // Check service readiness when evaluation is still pending
    const pendingCheck = checkServicePatchTestReadiness({
      serviceRequiresPatchTest: true,
      appointmentDate: new Date().toISOString(),
      patchTestRecord: application,
    });
    expect(pendingCheck.isCleared).toBe(false);
    expect(pendingCheck.readinessStatus).toBe('pending_evaluation');

    // Professional records negative evaluation
    const clearedRecord = recordPatchTestEvaluation(application, {
      evaluatedByStaffId: '99999999-9999-9999-9999-999999999999',
      result: 'negative_no_reaction',
      observationsNote: 'Zero erythema or pruritus observed at 48 hours.',
    });
    expect(clearedRecord.readinessStatus).toBe('cleared_for_service');

    // Service readiness check succeeds for date within 180 days
    const validCheck = checkServicePatchTestReadiness({
      serviceRequiresPatchTest: true,
      appointmentDate: new Date().toISOString(),
      patchTestRecord: clearedRecord,
    });
    expect(validCheck.isCleared).toBe(true);
    expect(validCheck.readinessStatus).toBe('cleared_for_service');

    // Service readiness check fails if appointment is after validity window (181 days later)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 200);

    const expiredCheck = checkServicePatchTestReadiness({
      serviceRequiresPatchTest: true,
      appointmentDate: futureDate.toISOString(),
      patchTestRecord: clearedRecord,
    });
    expect(expiredCheck.isCleared).toBe(false);
    expect(expiredCheck.readinessStatus).toBe('expired_test_record');
  });

  it('flags contraindications when an adverse reaction is recorded', () => {
    const adverseRecord = recordPatchTestEvaluation(application, {
      evaluatedByStaffId: '99999999-9999-9999-9999-999999999999',
      result: 'moderate_reaction',
      observationsNote: 'Raised erythematous papules observed at 24 hours.',
    });

    expect(adverseRecord.readinessStatus).toBe('contraindicated');

    const check = checkServicePatchTestReadiness({
      serviceRequiresPatchTest: true,
      appointmentDate: new Date().toISOString(),
      patchTestRecord: adverseRecord,
    });
    expect(check.isCleared).toBe(false);
    expect(check.readinessStatus).toBe('contraindicated');
  });
});

describe('Posie Core Logic - F043 (Forms Matched to Appointment & Re-Evaluation)', () => {
  const serviceFacialId = '11111111-1111-1111-1111-111111111111';
  const servicePeelId = '22222222-2222-2222-2222-222222222222';
  const formGeneralIntakeId = '33333333-3333-3333-3333-333333333333';
  const formPeelConsentId = '44444444-4444-4444-4444-444444444444';

  const rules = [
    {
      serviceId: serviceFacialId,
      serviceName: 'Hydra-Dew Facial',
      formId: formGeneralIntakeId,
      formTitle: 'General Skin Health Questionnaire',
      formType: 'intake' as const,
      reasonRequired: 'Standard baseline health screening',
    },
    {
      serviceId: servicePeelId,
      serviceName: 'Level 2 Chemical Peel',
      formId: formGeneralIntakeId,
      formTitle: 'General Skin Health Questionnaire',
      formType: 'intake' as const,
      reasonRequired: 'Standard baseline health screening',
    },
    {
      serviceId: servicePeelId,
      serviceName: 'Level 2 Chemical Peel',
      formId: formPeelConsentId,
      formTitle: 'Chemical Peel Informed Consent & Release',
      formType: 'consent' as const,
      reasonRequired: 'Required legal consent for clinical-grade acid exfoliation',
    },
  ];

  it('compiles and deduplicates required forms for multi-service visit', () => {
    const bundle = compileAppointmentFormRequirements(
      [serviceFacialId, servicePeelId],
      rules
    );

    // General intake is shared across both services, so total required must be 2, not 3
    expect(bundle.length).toBe(2);
    const intakeEntry = bundle.find((b) => b.formId === formGeneralIntakeId);
    expect(intakeEntry?.serviceNames).toContain('Hydra-Dew Facial');
    expect(intakeEntry?.serviceNames).toContain('Level 2 Chemical Peel');
  });

  it('evaluates readiness and re-evaluates when services are changed', () => {
    // Client only has completed General Intake
    const status = evaluateAppointmentFormReadiness({
      appointmentId: '88888888-8888-8888-8888-888888888888',
      serviceIds: [serviceFacialId, servicePeelId],
      catalogRules: rules,
      clientCompletedFormIds: [formGeneralIntakeId],
    });

    expect(status.isReady).toBe(false);
    expect(status.completedCount).toBe(1);
    expect(status.outstandingForms.length).toBe(1);
    expect(status.outstandingForms[0].formId).toBe(formPeelConsentId);

    // Re-evaluating if client changes from Facial only to adding Peel
    const reeval = reevaluateOnServiceChange({
      appointmentId: '88888888-8888-8888-8888-888888888888',
      previousServiceIds: [serviceFacialId],
      newServiceIds: [serviceFacialId, servicePeelId],
      catalogRules: rules,
      clientCompletedFormIds: [formGeneralIntakeId],
    });

    expect(reeval.newlyRequiredForms.length).toBe(1);
    expect(reeval.newlyRequiredForms[0].formId).toBe(formPeelConsentId);
    expect(reeval.newlyRequiredForms[0].formTitle).toContain('Chemical Peel');
  });
});
