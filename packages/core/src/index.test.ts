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
  createItemizedEstimate,
  acceptProposalPlan,
  submitProposalQuestion,
  reviseProposalEstimate,
  registerRetailProduct,
  recordStockMovement,
  reserveProductStock,
  createPurchaseOrder,
  approvePurchaseOrder,
  receivePurchaseOrderShipment,
  createEmailCampaignDraft,
  renderEmailCampaignHtml,
  executeCampaignSend,
  evaluateClientSegment,
  createFairReviewInvitation,
  formatFairReviewMessage,
  recordPrivateFeedback,
  generateClientReferralProfile,
  claimReferralOnBooking,
  settleReferralOnVisitOutcome,
  createPromotionCoupon,
  applyPromotionCode,
  importDocumentClause,
  recordClauseReview,
  publishDocumentClause,
  getApprovedClausesForService,
  createStaffShift,
  requestShiftCoverage,
  cancelStaffShiftWithSafetyCheck,
  clockInStaff,
  clockOutStaff,
  requestTimeCorrection,
  approveTimeClockEntry,
  recordBusinessExpense,
  checkDuplicateExpense,
  generateStructuredDataExport,
  initDailyClose,
  finalizeDailyClose,
  openComplaintCase,
  appendChronologyEvent,
  attachRedoRecovery,
  resolveComplaintCase,
  createSupportEscalation,
  resolveSupportTicket,
  generateBillingPreview,
  initCommunicationPreferences,
  updateChannelPreference,
  evaluateMessageDispatch,
  submitVisitProgressCheckin,
  reviewVisitProgressCheckin,
  createMediaUseGrant,
  revokeMediaUsePermission,
  checkMediaPublishingEligibility,
  createVirtualConsultation,
  completeVirtualConsultation,
  recordClientArrival,
  reverseAccidentalCheckin,
  seatClientInChair,
  getSanitizedPublicWaitingQueue,
  generateAccessibilityStyles,
  setDevicePreferences,
  issueClientBalance,
  redeemClientBalance,
  maskGiftCardSecret,
  generateStaffOnboardingPacket,
  signStaffOnboardingPacket,
  generateCommissionEarningsStatement,
  approveCommissionStatement,
  getLocalizedServiceDisplay,
  recordLocalizedSignedConsent,
  generateRebookingOffer,
  recordClientRebookingChoice,
  provisionCustomerOwnedNumber,
  generatePortOutLoaDocument,
  assertTenantBoundary,
  checkStaffPermission,
  deactivateStaffMember,
  TenantSecurityViolation,
  executeIdempotentCheckoutPayment,
  reconcilePayoutPeriod,
  holdBookingSlot,
  confirmHeldBooking,
  createProvisionalBooking,
  confirmProvisionalBooking,
  isResourceAvailable,
  reserveAppointmentResources,
  cancelResourceReservations,
  buildSplitIntervalSchedule,
  canFitSecondaryServiceInProcessingGap,
  createMultiPractitionerAppointment,
  addSegmentHandoffNotes,
  recordSegmentDelayAndAssessImpact,
  reviseVisitItinerary,
  createGroupBookingProposal,
  canAccessMemberConfidentialRecords,
  generateDayOfEventPacket,
  registerAttendeeForClass,
  cancelAttendeeAndPromoteWaitlist,
  checkInClassAttendee,
  findMatchingWaitlistCandidates,
  dispatchTimedWaitlistOffer,
  claimWaitlistOffer,
  advanceExpiredOffer,
  rankCancellationRecoveryCandidates,
  fillCancellationOpening,
  auditCancellationRecoveryRevenue,
  ingestExternalCalendarEvents,
  handleExternalDeletionRequest,
  evaluatePreauthExpirationRisk,
  recordBookingDeposit,
  processDepositCancellation,
  buildUnifiedCheckoutTicket,
  addTipToTicket,
  applySplitTenderPayment,
  initiateTerminalPayment,
  recordInterruptedTerminalTransaction,
  resolveInterruptedTerminalPayment,
  calculateEligibleRefundBalance,
  processRefundAndExchange,
  executeNoShowFeeCollection,
  waiveNoShowFee,
  settleNoShowRecoveryLink,
  compileDisputeDefensePacket,
  checkDisputeDeadlineUrgency,
  computeStudioBalanceState,
  transitionPayoutState,
  issueGiftCardLiability,
  redeemGiftCardValue,
  issuePackageSeriesEntitlement,
  consumePackageSession,
  refundRemainingPackageSessions,
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


describe('Posie Core Logic - F044 (Itemized Service Estimates)', () => {
  it('creates transparent itemized estimate with range pricing and deposit breakdown', () => {
    const estimate = createItemizedEstimate({
      clientId: '66666666-6666-6666-6666-666666666666',
      businessId: '77777777-7777-7777-7777-777777777777',
      authorStaffId: '99999999-9999-9999-9999-999999999999',
      title: 'Bridal Party Glow & Hair Package',
      lineItems: [
        {
          itemType: 'service',
          description: 'Bride Deluxe Radiance Facial',
          minPriceCents: 15000,
          maxPriceCents: 15000,
        },
        {
          itemType: 'service',
          description: 'Bridal Party Updo & Styling (x3)',
          quantity: 3,
          minPriceCents: 8500,
          maxPriceCents: 11000,
        },
        {
          itemType: 'product',
          description: 'Touch-Up Lip & Powder Kit',
          minPriceCents: 4500,
        },
      ],
      discountCents: 2000, // $20 bridal promo
      taxRatePercent: 8,
      depositPercent: 25,
      validityDays: 14,
    });

    // 15000 + 3*8500 (25500) + 4500 = 45000 raw min
    // 15000 + 3*11000 (33000) + 4500 = 52500 raw max
    // Subtotal min = 45000 - 2000 = 43000
    // Subtotal max = 52500 - 2000 = 50500
    // Tax = 8% of 50500 = 4040
    // Total min = 43000 + 4040 = 47040 ($470.40)
    // Total max = 50500 + 4040 = 54540 ($545.40)
    expect(estimate.pricingMode).toBe('range');
    expect(estimate.totalMinCents).toBe(47040);
    expect(estimate.totalMaxCents).toBe(54540);
    expect(estimate.depositRequiredCents).toBe(Math.round(47040 * 0.25));
    expect(estimate.disclaimer).toContain('estimate, not a final charge');
    expect(estimate.status).toBe('sent_to_client');
  });
});

describe('Posie Core Logic - F045 (Client Approval of Service Plans & One-Link Proposals)', () => {
  const estimate = createItemizedEstimate({
    id: '12121212-3434-5656-7878-909090909090',
    clientId: '66666666-6666-6666-6666-666666666666',
    businessId: '77777777-7777-7777-7777-777777777777',
    authorStaffId: '99999999-9999-9999-9999-999999999999',
    title: 'Acne Clearing 3-Month Plan',
    lineItems: [
      { id: 'item-1', itemType: 'service', description: 'Monthly Salicylic Peel (x3)', minPriceCents: 30000 },
      { id: 'item-2', itemType: 'product', description: 'Purifying Cleanser + Azelaic Duo', minPriceCents: 7500 },
    ],
    taxRatePercent: 8,
  });

  it('accepts proposal version 1 and rejects outdated version acceptance', () => {
    const { acceptanceRecord, updatedEstimate } = acceptProposalPlan({
      estimate,
      expectedVersion: 1,
      selectedLineItemIds: ['item-1', 'item-2'],
      clientSignerName: 'Sophia Turner',
    });

    expect(acceptanceRecord.estimateVersionAccepted).toBe(1);
    expect(acceptanceRecord.clientSignerName).toBe('Sophia Turner');
    expect(updatedEstimate.status).toBe('accepted');

    // Attempting to accept version 1 if estimate is revised to version 2 throws
    const revised = reviseProposalEstimate(estimate, {
      title: 'Acne Clearing 3-Month Plan (Revised)',
      discountCents: 1500,
    });
    expect(revised.version).toBe(2);
    expect(revised.status).toBe('sent_to_client');

    expect(() =>
      acceptProposalPlan({
        estimate: revised,
        expectedVersion: 1, // trying to accept obsolete v1
        selectedLineItemIds: ['item-1'],
        clientSignerName: 'Sophia Turner',
      })
    ).toThrow(/updated to version 2/);
  });

  it('submits a client question without changing proposal status', () => {
    const inquiry = submitProposalQuestion({
      estimateId: estimate.id,
      question: 'Can I swap the salicylic peel for an enzyme peel if I am pregnant?',
    });

    expect(inquiry.clientQuestion).toContain('pregnant');
    expect(inquiry.resolved).toBe(false);
  });
});

describe('Posie Core Logic - F046 (Retail Inventory Basics & Traceable Stock Movements)', () => {
  const { product } = registerRetailProduct({
    sku: 'POS-OAT-150ML',
    barcode: '850012345678',
    productName: 'Soothing Oat Milk Cleanser',
    variantName: '150ml Pump Bottle',
    brand: 'Posie Skin',
    retailPriceCents: 3200,
    costPriceCents: 1200,
    initialStock: 10,
    reorderThreshold: 3,
  });

  it('maintains an append-only stock ledger for sales, usage, and restocking', () => {
    expect(product.onHandQuantity).toBe(10);
    expect(product.isLowStock).toBe(false);

    // Record retail sale of 2 units
    const saleResult = recordStockMovement(product, {
      movementType: 'retail_sale',
      quantityDelta: -2,
      authorizedStaffId: '99999999-9999-9999-9999-999999999999',
      reason: 'POS In-store checkout',
      referenceId: 'REC-2026-0099',
    });

    expect(saleResult.updatedProduct.onHandQuantity).toBe(8);
    expect(saleResult.movement.resultingOnHand).toBe(8);
    expect(saleResult.movement.movementType).toBe('retail_sale');

    // Backbar consumption of 6 units triggers low stock flag (2 remaining <= threshold 3)
    const backbarResult = recordStockMovement(saleResult.updatedProduct, {
      movementType: 'professional_backbar_use',
      quantityDelta: -6,
      authorizedStaffId: '99999999-9999-9999-9999-999999999999',
      reason: 'Dispensed to Treatment Room 1 for daily facials',
    });

    expect(backbarResult.updatedProduct.onHandQuantity).toBe(2);
    expect(backbarResult.updatedProduct.isLowStock).toBe(true);

    // Cannot sell more stock than on hand
    expect(() =>
      recordStockMovement(backbarResult.updatedProduct, {
        movementType: 'retail_sale',
        quantityDelta: -5,
        authorizedStaffId: '99999999-9999-9999-9999-999999999999',
        reason: 'Attempted oversell',
      })
    ).toThrow(/insufficient inventory on hand/);

    // Stock reservation
    const reservedProduct = reserveProductStock(saleResult.updatedProduct, 3);
    expect(reservedProduct.reservedQuantity).toBe(3);
    expect(reservedProduct.sellableQuantity).toBe(5);
  });
});


describe('Posie Core Logic - F047 (Purchase Orders & Receiving)', () => {
  const { product } = registerRetailProduct({
    sku: 'POS-OAT-150ML',
    productName: 'Soothing Oat Milk Cleanser',
    retailPriceCents: 3200,
    costPriceCents: 1200,
    initialStock: 5,
  });

  const inventoryMap = new Map([['POS-OAT-150ML', product]]);

  it('manages PO approval, partial receiving, and stock movement reconciliation', () => {
    const po = createPurchaseOrder({
      supplierName: 'Organic Botanical Labs',
      supplierEmail: 'orders@botanicallabs.com',
      buyerStaffId: '99999999-9999-9999-9999-999999999999',
      items: [
        { sku: 'POS-OAT-150ML', productName: 'Soothing Oat Milk Cleanser', quantityOrdered: 20, unitCostCents: 1200 },
      ],
    });

    expect(po.status).toBe('draft');
    expect(po.totalCostCents).toBe(24000);

    const approved = approvePurchaseOrder(po, '99999999-9999-9999-9999-999999999999');
    expect(approved.status).toBe('approved');

    // Receive partial shipment of 15 units
    const { updatedPurchaseOrder, stockMovements, updatedProducts } = receivePurchaseOrderShipment({
      purchaseOrder: approved,
      receiptItems: [
        { sku: 'POS-OAT-150ML', quantityReceived: 15, lotNumber: 'LOT-BOT-2026' },
      ],
      inventoryProducts: inventoryMap,
      receivingStaffId: '99999999-9999-9999-9999-999999999999',
    });

    expect(updatedPurchaseOrder.status).toBe('partially_received');
    expect(updatedPurchaseOrder.lineItems[0].quantityReceived).toBe(15);
    expect(updatedPurchaseOrder.lineItems[0].quantityOutstanding).toBe(5);

    // Verifies stock ledger movement
    expect(stockMovements.length).toBe(1);
    expect(stockMovements[0].movementType).toBe('received_purchase');
    expect(stockMovements[0].quantityDelta).toBe(15);

    // Product on hand updated from 5 to 20
    const updatedProd = updatedProducts.get('POS-OAT-150ML')!;
    expect(updatedProd.onHandQuantity).toBe(20);
  });
});

describe('Posie Core Logic - F048 (Email Campaign Builder & Send-Time Consent)', () => {
  const campaign = createEmailCampaignDraft({
    campaignName: 'Spring Skin Refresh Promo',
    subjectLine: 'Wake up your glow this spring! 🌸',
    previewText: 'Exclusive 15% off enzyme facial packages',
    segmentId: '11111111-2222-3333-4444-555555555555',
    bodyContent: 'Treat your winter-weary skin to our botanical papaya enzyme sweep.',
    callToActionText: 'Claim Your Visit',
    callToActionUrl: 'https://glow.posieatelier.com/book',
  });

  const candidates = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Emma Watson',
      email: 'emma@example.com',
      completedVisitsCount: 2,
      marketingConsent: 'opted_in' as const,
      hasActivePackageBalance: false,
      lifetimeSpendCents: 24000,
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Olivia Wilde',
      email: 'olivia@example.com',
      completedVisitsCount: 1,
      marketingConsent: 'opted_in' as const, // was opted in earlier
      hasActivePackageBalance: false,
      lifetimeSpendCents: 12000,
    },
  ];

  it('renders test preview HTML and filters opted-out recipients at send time', () => {
    const html = renderEmailCampaignHtml(campaign, { isTestSend: true });
    expect(html).toContain('[TEST SEND]');
    expect(html).toContain('Wake up your glow');

    // At send time, Olivia opted out
    const liveConsentLookup = new Map([
      ['11111111-1111-1111-1111-111111111111', 'opted_in' as const],
      ['22222222-2222-2222-2222-222222222222', 'opted_out' as const],
    ]);

    const { updatedCampaign, sendResult } = executeCampaignSend({
      campaign,
      targetedClients: candidates,
      liveConsentLookup,
    });

    expect(updatedCampaign.status).toBe('sent');
    expect(sendResult.deliveredCount).toBe(1);
    expect(sendResult.sendTimeOptOutsExcludedCount).toBe(1);
    expect(sendResult.deliveredEmails).toContain('emma@example.com');
    expect(sendResult.skippedOptOutEmails).toContain('olivia@example.com');
  });
});

describe('Posie Core Logic - F049 (Client Segments & Exclusion Inspector)', () => {
  const clients = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Newbie Client',
      email: 'newbie@example.com',
      completedVisitsCount: 1,
      marketingConsent: 'opted_in' as const,
      hasActivePackageBalance: false,
      lifetimeSpendCents: 12000,
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Regular VIP',
      email: 'regular@example.com',
      completedVisitsCount: 4,
      marketingConsent: 'opted_in' as const,
      hasActivePackageBalance: true,
      lifetimeSpendCents: 65000,
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      name: 'Opted Out Client',
      email: 'optout@example.com',
      completedVisitsCount: 1,
      marketingConsent: 'opted_out' as const,
      hasActivePackageBalance: false,
      lifetimeSpendCents: 12000,
    },
  ];

  it('evaluates first visit segment and provides clear human-understandable exclusion reasons', () => {
    const segment = {
      id: '99999999-8888-7777-6666-555555555555',
      title: 'First-Visit Completed Welcome Series',
      ruleType: 'first_visit_completed' as const,
      requireMarketingConsent: true,
    };

    const result = evaluateClientSegment(segment, clients);

    expect(result.includedClients.length).toBe(1);
    expect(result.includedClients[0].name).toBe('Newbie Client');

    expect(result.excludedClients.length).toBe(2);
    const regularExclusion = result.excludedClients.find((c) => c.clientName === 'Regular VIP');
    expect(regularExclusion?.exclusionReason).toContain('Repeat client with 4 completed visits');

    const optOutExclusion = result.excludedClients.find((c) => c.clientName === 'Opted Out Client');
    expect(optOutExclusion?.exclusionReason).toContain('Opted out of marketing');
  });
});

describe('Posie Core Logic - F050 (Fair Review Requests & Anti-Gating)', () => {
  it('enforces appointment completion and rate limit cooldown', () => {
    // Uncompleted visit throws
    expect(() =>
      createFairReviewInvitation({
        appointmentId: '11111111-2222-3333-4444-555555555555',
        clientId: '66666666-6666-6666-6666-666666666666',
        clientName: 'Chloe Bennet',
        recipientDestination: '+1-555-0123',
        channel: 'sms',
        serviceName: 'Hydra-Dew Facial',
        practitionerName: 'Chloe V.',
        publicReviewUrl: 'https://g.page/r/posie-austin/review',
        appointmentCompleted: false,
      })
    ).toThrow(/only be dispatched after an appointment is completed/);

    // Valid invitation creation
    const invite = createFairReviewInvitation({
      appointmentId: '11111111-2222-3333-4444-555555555555',
      clientId: '66666666-6666-6666-6666-666666666666',
      clientName: 'Chloe Bennet',
      recipientDestination: '+1-555-0123',
      channel: 'sms',
      serviceName: 'Hydra-Dew Facial',
      practitionerName: 'Chloe V.',
      publicReviewUrl: 'https://g.page/r/posie-austin/review',
      appointmentCompleted: true,
    });

    expect(invite.isPublicLinkAlwaysVisible).toBe(true);

    const message = formatFairReviewMessage(invite);
    expect(message).toContain('honest feedback on Google');
    expect(message).toContain('https://g.page/r/posie-austin/review');

    // Anti-Gating check: Recording a low 2-star private rating does NOT revoke the public review link
    const updated = recordPrivateFeedback(invite, {
      ratingStars: 2,
      feedbackText: 'Treatment room was a little chilly.',
    });
    expect(updated.privateRatingStars).toBe(2);
    expect(updated.isPublicLinkAlwaysVisible).toBe(true);
    expect(updated.publicReviewUrl).toBe(invite.publicReviewUrl);

    // Rate limiting: attempting to send another request within 60 days throws
    expect(() =>
      createFairReviewInvitation({
        appointmentId: '22222222-3333-4444-5555-666666666666',
        clientId: '66666666-6666-6666-6666-666666666666',
        clientName: 'Chloe Bennet',
        recipientDestination: '+1-555-0123',
        channel: 'sms',
        serviceName: 'Brow Sculpt',
        practitionerName: 'Chloe V.',
        publicReviewUrl: 'https://g.page/r/posie-austin/review',
        appointmentCompleted: true,
        lastReviewRequestSentAt: new Date().toISOString(), // sent today
      })
    ).toThrow(/received a review request recently/);
  });
});


describe('Posie Core Logic - F051 (Referral Tracking & Completed-Visit Attribution)', () => {
  const referrer = generateClientReferralProfile({
    clientId: '11111111-1111-1111-1111-111111111111',
    clientName: 'Sarah Jenkins',
    clientEmail: 'sarah@example.com',
    clientPhone: '+1-555-0101',
    customSlug: 'SARAH-GLOW',
  });

  it('rejects self-referrals and prevents duplicate referral abuse', () => {
    expect(referrer.referralCode).toBe('SARAH-GLOW');

    // Self-referral attempt
    const selfClaim = claimReferralOnBooking({
      referrerProfile: referrer,
      referredClient: {
        id: '11111111-1111-1111-1111-111111111111', // same ID
        name: 'Sarah Jenkins',
        email: 'sarah@example.com',
        phone: '+1-555-0101',
      },
      appointmentId: '22222222-2222-2222-2222-222222222222',
    });

    expect(selfClaim.status).toBe('rejected_self_referral');

    // Valid referral claim
    const validClaim = claimReferralOnBooking({
      referrerProfile: referrer,
      referredClient: {
        id: '33333333-3333-3333-3333-333333333333',
        name: 'Jessica Day',
        email: 'jessica@example.com',
        phone: '+1-555-0202',
      },
      appointmentId: '44444444-4444-4444-4444-444444444444',
    });

    expect(validClaim.status).toBe('pending_first_visit');

    // Duplicate referral claim on same client
    const duplicateClaim = claimReferralOnBooking({
      referrerProfile: referrer,
      referredClient: {
        id: '33333333-3333-3333-3333-333333333333',
        name: 'Jessica Day',
        email: 'jessica@example.com',
        phone: '+1-555-0202',
      },
      appointmentId: '55555555-5555-5555-5555-555555555555',
      existingClaimsForReferredClient: [validClaim],
    });

    expect(duplicateClaim.status).toBe('rejected_already_referred');
  });

  it('credits referrer only upon visit completion and voids reward on cancellation', () => {
    const claim = claimReferralOnBooking({
      referrerProfile: referrer,
      referredClient: {
        id: '66666666-6666-6666-6666-666666666666',
        name: 'Cece Parekh',
        email: 'cece@example.com',
        phone: '+1-555-0303',
      },
      appointmentId: '77777777-7777-7777-7777-777777777777',
    });

    // Cancellation voids reward
    const canceledResult = settleReferralOnVisitOutcome({
      claim,
      referrerProfile: referrer,
      visitOutcome: 'canceled',
    });
    expect(canceledResult.updatedClaim.status).toBe('voided_canceled_visit');
    expect(canceledResult.updatedReferrerProfile.availableCreditsCents).toBe(0);

    // Completed visit credits $20.00 (2000 cents)
    const completedResult = settleReferralOnVisitOutcome({
      claim,
      referrerProfile: referrer,
      visitOutcome: 'completed',
    });
    expect(completedResult.updatedClaim.status).toBe('qualified_credited');
    expect(completedResult.updatedReferrerProfile.availableCreditsCents).toBe(2000);
  });
});

describe('Posie Core Logic - F052 (Promotion Controls & Margin Safeguards)', () => {
  const promo = createPromotionCoupon({
    code: 'SPRING20',
    title: 'Spring 20% Off Facials',
    discountType: 'percentage',
    discountValue: 20,
    minSubtotalCents: 10000, // $100 min
    maxDiscountCents: 3000, // max $30 cap
    validDaysDuration: 14,
    canStackWithOtherCoupons: false,
  });

  it('calculates discount within caps, enforces minimums, and blocks silent stacking', () => {
    expect(promo.code).toBe('SPRING20');

    // 1. Below minimum spend ($80 < $100) -> rejected
    const belowMin = applyPromotionCode({
      coupon: promo,
      serviceId: '11111111-1111-1111-1111-111111111111',
      subtotalCents: 8000,
    });
    expect(belowMin.isApplied).toBe(false);
    expect(belowMin.rejectionReason).toContain('below minimum requirement');

    // 2. Qualifying spend ($200 facial) -> 20% would be $40, but capped at $30
    const valid = applyPromotionCode({
      coupon: promo,
      serviceId: '11111111-1111-1111-1111-111111111111',
      subtotalCents: 20000,
      ownerMarginFloorCents: 10000,
    });
    expect(valid.isApplied).toBe(true);
    expect(valid.discountCents).toBe(3000); // capped at 3000 cents ($30)
    expect(valid.finalPriceCents).toBe(17000);

    // 3. Stacking rejection: attempting to stack with an existing non-stackable promo
    const secondPromo = createPromotionCoupon({
      code: 'EXTRA10',
      title: 'Extra $10 Off',
      discountType: 'fixed_cents',
      discountValue: 1000,
      canStackWithOtherCoupons: false,
    });

    const stackAttempt = applyPromotionCode({
      coupon: secondPromo,
      serviceId: '11111111-1111-1111-1111-111111111111',
      subtotalCents: 20000,
      currentlyAppliedCoupons: [promo], // promo does not allow stacking
    });

    expect(stackAttempt.isApplied).toBe(false);
    expect(stackAttempt.rejectionReason).toContain('cannot be combined');
  });
});

describe('Posie Core Logic - F053 (Approved Document Repository & Governance)', () => {
  const servicePeelId = '22222222-2222-2222-2222-222222222222';

  const clauseDraft = importDocumentClause({
    title: 'TCA Chemical Peel Informed Consent',
    category: 'informed_consent',
    contentMarkdown: 'I understand that Level 2 TCA peels cause epidermal peeling for 5-7 days...',
    applicableServiceIds: [servicePeelId],
  });

  it('enforces specialist review before publication and maps to service catalogs', () => {
    expect(clauseDraft.isPublished).toBe(false);

    // Attempting to publish without named reviewer throws
    expect(() => publishDocumentClause(clauseDraft)).toThrow(
      /require a named reviewer before publication/
    );

    // Conduct named clinician review
    const reviewed = recordClauseReview(clauseDraft, {
      reviewerStaffId: '99999999-9999-9999-9999-999999999999',
      reviewerName: 'Dr. Evelyn Reed, MD (Clinical Advisor)',
      reviewType: 'clinician_reviewed',
      reviewNotes: 'Verified contraindication disclosures against latest dermatology standards.',
    });

    expect(reviewed.reviewType).toBe('clinician_reviewed');
    expect(reviewed.reviewerName).toContain('Dr. Evelyn Reed');

    // Publishing now succeeds
    const published = publishDocumentClause(reviewed);
    expect(published.isPublished).toBe(true);

    // Service catalog mapping retrieval
    const mapped = getApprovedClausesForService([published], servicePeelId);
    expect(mapped.length).toBe(1);
    expect(mapped[0].title).toBe('TCA Chemical Peel Informed Consent');

    // Unrelated service gets empty list
    const unrelated = getApprovedClausesForService([published], '88888888-8888-8888-8888-888888888888');
    expect(unrelated.length).toBe(0);
  });
});


describe('Posie Core Logic - F054 (Team Shifts & Availability)', () => {
  const shift = createStaffShift({
    staffId: '99999999-9999-9999-9999-999999999999',
    staffName: 'Chloe V.',
    locationId: '88888888-8888-8888-8888-888888888888',
    shiftDate: '2026-11-05',
    startTime: '09:00',
    endTime: '17:00',
    roleOrSkillTags: ['Esthetician', 'Chemical Peel Certified'],
  });

  it('requests coverage and blocks silent cancellation when client bookings exist', () => {
    expect(shift.status).toBe('scheduled');

    const coverage = requestShiftCoverage({
      shift,
      requestingStaffId: '99999999-9999-9999-9999-999999999999',
      reason: 'Medical appointment',
    });
    expect(coverage.status).toBe('coverage_requested');
    expect(coverage.coverageReason).toBe('Medical appointment');

    // Attempting to cancel shift when 2 client appointments are booked on that shift
    const conflicted = [
      { appointmentId: 'apt-1', clientName: 'Jessica Day', serviceName: 'Hydra-Dew Facial', scheduledTime: '10:00 AM' },
      { appointmentId: 'apt-2', clientName: 'Cece Parekh', serviceName: 'Glass Glow Facial', scheduledTime: '02:00 PM' },
    ];

    const cancelAttempt = cancelStaffShiftWithSafetyCheck({
      shift,
      appointmentsOnShift: conflicted,
    });

    // Cancellation is safely BLOCKED to protect client commitments
    expect(cancelAttempt.canceledShift).toBeUndefined();
    expect(cancelAttempt.blockedReason).toContain('2 client appointment(s) are booked');
    expect(cancelAttempt.conflictedAppointments.length).toBe(2);

    // After reassigning appointments, cancellation succeeds
    const safeCancel = cancelStaffShiftWithSafetyCheck({
      shift,
      appointmentsOnShift: [],
    });
    expect(safeCancel.canceledShift?.status).toBe('canceled');
  });
});

describe('Posie Core Logic - F055 (Staff Time Clock & Manager Approvals)', () => {
  it('manages clock in, calculates break deductions, and processes manager correction approvals', () => {
    const clockIn = clockInStaff({
      staffId: '99999999-9999-9999-9999-999999999999',
      staffName: 'Chloe V.',
      payPeriodId: 'PP-2026-11-A',
      clockInTime: '2026-11-05T09:00:00.000Z',
    });

    expect(clockIn.status).toBe('clocked_in');

    // Add 30-min unpaid meal break
    const withBreak = {
      ...clockIn,
      breaks: [
        {
          id: 'brk-1',
          startTime: '2026-11-05T13:00:00.000Z',
          endTime: '2026-11-05T13:30:00.000Z',
          breakType: 'unpaid_meal' as const,
        },
      ],
    };

    // Clock out at 17:00 (8 hours = 480 mins, minus 30 mins break = 450 paid mins)
    const clockedOut = clockOutStaff(withBreak, '2026-11-05T17:00:00.000Z');
    expect(clockedOut.totalWorkedMinutes).toBe(480);
    expect(clockedOut.totalUnpaidBreakMinutes).toBe(30);
    expect(clockedOut.totalPaidMinutes).toBe(450); // 7.5 hours

    // Staff requests correction (started 15 minutes earlier at 08:45)
    const corrected = requestTimeCorrection({
      entry: clockedOut,
      requestedClockIn: '2026-11-05T08:45:00.000Z',
      requestedClockOut: '2026-11-05T17:00:00.000Z',
      reason: 'Forgot to tap clock-in tablet while prepping treatment room.',
      requestedByStaffId: '99999999-9999-9999-9999-999999999999',
    });

    expect(corrected.status).toBe('correction_requested');
    expect(corrected.correctionRequest?.reason).toContain('prepping treatment room');

    // Manager approves correction
    const approved = approveTimeClockEntry(corrected, '11111111-1111-1111-1111-111111111111');
    expect(approved.status).toBe('approved');
    expect(approved.clockInTime).toBe('2026-11-05T08:45:00.000Z');
    expect(approved.totalPaidMinutes).toBe(465); // 450 + 15
    expect(approved.approvedByStaffId).toBe('11111111-1111-1111-1111-111111111111');
  });
});

describe('Posie Core Logic - F056 (Expense & Receipt Capture with Duplicate Detection)', () => {
  const existingExpense = recordBusinessExpense({
    expenseDate: '2026-11-02',
    merchantName: 'SalonCentric Austin',
    category: 'backbar_supplies',
    businessPurpose: 'Ultrasonic conductive gel & disposable headbands',
    amountCents: 14500, // $145.00
    paymentMethod: 'business_card',
    recordedByStaffId: '99999999-9999-9999-9999-999999999999',
    receiptAttachmentUrl: 'https://storage.posieatelier.com/receipts/rec-145.pdf',
  });

  it('records verified expense with tax disclaimer and flags duplicate candidate', () => {
    expect(existingExpense.amountCents).toBe(14500);
    expect(existingExpense.taxDisclaimer).toContain('do not constitute formal tax');

    // Duplicate candidate: same merchant, same amount, within 1 day
    const duplicateCheck = checkDuplicateExpense(
      {
        merchantName: 'SalonCentric Austin',
        amountCents: 14500,
        expenseDate: '2026-11-03',
      },
      [existingExpense]
    );

    expect(duplicateCheck.hasPotentialDuplicate).toBe(true);
    expect(duplicateCheck.warningPrompt).toContain('Potential duplicate detected');

    // Distinct expense: different merchant or different amount
    const cleanCheck = checkDuplicateExpense(
      {
        merchantName: 'Dermalogica Pro',
        amountCents: 14500,
        expenseDate: '2026-11-03',
      },
      [existingExpense]
    );

    expect(cleanCheck.hasPotentialDuplicate).toBe(false);
  });
});

describe('Posie Core Logic - F057 (Structured Data Export & Freedom to Leave)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const staffId = '99999999-9999-9999-9999-999999999999';

  const rawRecords = {
    contacts: [
      {
        clientId: '22222222-2222-2222-2222-222222222222',
        fullName: 'Maya Lin',
        email: 'maya@example.com',
        phone: '+15125550199',
        smsConsent: true,
        marketingConsent: false,
        lifetimeSpendCents: 45000,
        createdAt: '2026-01-10T10:00:00Z',
      },
    ],
    services: [
      {
        serviceId: '33333333-3333-3333-3333-333333333333',
        name: 'Signature Biab Gel Manicure',
        priceCents: 7500,
        durationMinutes: 60,
        category: 'Nails',
      },
    ],
    appointments: [
      {
        appointmentId: '44444444-4444-4444-4444-444444444444',
        clientId: '22222222-2222-2222-2222-222222222222',
        specialistName: 'Elena Rostova',
        serviceName: 'Signature Biab Gel Manicure',
        scheduledAt: '2026-10-20T14:00:00Z',
        status: 'completed',
        totalChargedCents: 7500,
      },
    ],
    balances: [
      {
        accountId: '55555555-5555-5555-5555-555555555555',
        clientId: '22222222-2222-2222-2222-222222222222',
        balanceType: 'gift_card' as const,
        remainingCents: 5000,
        expiresAt: null,
      },
    ],
  };

  it('generates complete export archive with manifest, data dictionaries, and integrity hashes', () => {
    const result = generateStructuredDataExport({
      businessId,
      requestedByStaffId: staffId,
      rawRecords,
    });

    expect(result.archive.status).toBe('completed');
    expect(result.archive.summary.totalRecords).toBe(4);
    expect(result.archive.summary.totalOutstandingBalanceCents).toBe(5000);
    expect(result.archive.summary.totalClientsCount).toBe(1);
    expect(result.archive.exitPackNotice).toContain('Posie Freedom-to-Leave Guarantee');

    // Manifest verification
    expect(result.archive.manifest.length).toBe(4);
    const contactsManifest = result.archive.manifest.find(m => m.category === 'contacts')!;
    expect(contactsManifest.rowCount).toBe(1);
    expect(contactsManifest.fields.some(f => f.fieldName === 'smsConsent')).toBe(true);

    // CSV format verification
    expect(result.csvExports['contacts.csv']).toContain('"Maya Lin"');
    expect(result.csvExports['services.csv']).toContain('"Signature Biab Gel Manicure"');

    // JSON format verification
    const parsedJson = JSON.parse(result.jsonExport);
    expect(parsedJson.contacts[0].fullName).toBe('Maya Lin');
  });
});

describe('Posie Core Logic - F058 (Daily Close Workspace & Till Reconciliation)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const locationId = '22222222-2222-2222-2222-222222222222';
  const staffId = '99999999-9999-9999-9999-999999999999';

  it('reconciles cash transactions and blocks close on unexplained cash variance or blocking exceptions', () => {
    const movements = [
      {
        id: '66666666-6666-6666-6666-666666666666',
        type: 'cash_sale' as const,
        amountCents: 15000, // $150
        description: 'Cash payment for styling appointment',
        recordedAt: '2026-11-04T12:00:00Z',
        recordedByStaffId: staffId,
      },
      {
        id: '77777777-7777-7777-7777-777777777777',
        type: 'paid_out' as const,
        amountCents: 1200, // $12 petty cash for oat milk
        description: 'Client refreshment oat milk restock',
        recordedAt: '2026-11-04T14:30:00Z',
        recordedByStaffId: staffId,
      },
    ];

    const blockingException = {
      id: '88888888-8888-8888-8888-888888888888',
      type: 'open_ticket' as const,
      clientName: 'Chloe Bennett',
      amountCents: 9500,
      specialistName: 'Elena Rostova',
      notes: 'Client stepped out to park car before paying',
      canBeDeferred: false,
    };

    const dailyClose = initDailyClose({
      businessId,
      locationId,
      drawerId: 'DRAWER-01',
      date: '2026-11-04',
      openingFloatCents: 20000, // $200.00
      cashMovements: movements,
      unresolvedExceptions: [blockingException],
      cardTotals: {
        creditDebitCents: 125000, // $1,250.00
        tipsCollectedCents: 24000, // $240.00
        bnplCents: 0,
      },
    });

    // Opening $200 + $150 sales - $12 paid out = $338.00 expected ($33,800 cents)
    expect(dailyClose.expectedCashInDrawerCents).toBe(33800);

    // Attempt close with blocking exception
    const failAttempt1 = finalizeDailyClose({
      dailyClose,
      actualCountedCashCents: 33800,
      managerStaffId: staffId,
      managerName: 'Elena Rostova',
    });
    expect(failAttempt1.success).toBe(false);
    expect(failAttempt1.errors[0]).toContain('blocking exception');

    // Clear blocking exception
    const readyClose = {
      ...dailyClose,
      unresolvedExceptions: [],
    };

    // Attempt close with unexplained cash shortage ($320 vs $338 = -$18 shortage)
    const failAttempt2 = finalizeDailyClose({
      dailyClose: readyClose,
      actualCountedCashCents: 32000,
      managerStaffId: staffId,
      managerName: 'Elena Rostova',
    });
    expect(failAttempt2.success).toBe(false);
    expect(failAttempt2.errors[0]).toContain('Till is short by $18.00');

    // Successfully close with explained shortage note
    const successResult = finalizeDailyClose({
      dailyClose: readyClose,
      actualCountedCashCents: 32000,
      managerStaffId: staffId,
      managerName: 'Elena Rostova',
      varianceExplanation: 'Missing $18 verified as cash change miscount during noon rush; owner notified.',
      closingNotes: 'All terminal batches settled cleanly with Stripe.',
    });

    expect(successResult.success).toBe(true);
    expect(successResult.closedRecord?.status).toBe('closed');
    expect(successResult.closedRecord?.varianceCents).toBe(-1800);
    expect(successResult.closedRecord?.actualCountedCashCents).toBe(32000);
    expect(successResult.closedRecord?.closedByStaffId).toBe(staffId);
  });
});

describe('Posie Core Logic - F059 (Client Complaint Resolution & Redo Record - D18)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const clientId = '22222222-2222-2222-2222-222222222222';
  const appointmentId = '33333333-3333-3333-3333-333333333333';
  const staffId = '99999999-9999-9999-9999-999999999999';

  it('manages complaint lifecycle, enforces owner approval for refunds, and records complimentary redo costs', () => {
    // 1. Open complaint for service tone/quality
    const caseRecord = openComplaintCase({
      businessId,
      clientId,
      clientName: 'Sophia Turner',
      clientContact: 'sophia@example.com',
      originalAppointmentId: appointmentId,
      originalServiceName: 'Full Platinum Balayage & Gloss',
      originalSpecialistName: 'Elena Rostova',
      originalAmountChargedCents: 28000, // $280
      category: 'service_quality',
      originalClientConcern: 'Toner turned out noticeably brassier than reference photo consulted at chair.',
      responsibleStaffId: staffId,
      responsibleStaffName: 'Elena Rostova',
    });

    expect(caseRecord.status).toBe('new_received');
    expect(caseRecord.originalClientConcern).toBe('Toner turned out noticeably brassier than reference photo consulted at chair.');
    expect(caseRecord.chronology.length).toBe(1);

    // 2. Append consultation outreach event
    const updatedCase = appendChronologyEvent(caseRecord, {
      authorStaffName: 'Elena Rostova',
      authorRole: 'Senior Colorist',
      actionSummary: 'Phone consultation with client',
      notes: 'Reviewed shade photos together. Offered complimentary 45-minute tone correction appointment.',
      isClientVisible: true,
    });
    expect(updatedCase.chronology.length).toBe(2);

    // 3. Attach complimentary redo recovery
    const withRedo = attachRedoRecovery(updatedCase, {
      redoAppointmentId: '44444444-4444-4444-4444-444444444444',
      redoSpecialistName: 'Elena Rostova',
      scheduledRedoDate: '2026-11-06T10:00:00Z',
      materialsCostCents: 2400, // $24 developer/toner
      laborCostCents: 4500,     // $45 colorist time
      goodwillCreditCents: 0,
    });
    expect(withRedo.status).toBe('redo_scheduled');
    expect(withRedo.redoRecovery?.totalRecoveryCostCents).toBe(6900);
    expect(withRedo.redoRecovery?.isComplimentaryToClient).toBe(true);

    // 4. Invariant: Financial refund requires named owner sign-off
    const failRefund = resolveComplaintCase(withRedo, {
      remedyType: 'partial_refund',
      resolutionSummary: 'Issued $50 refund to client card',
      // Missing ownerApproverName
    });
    expect(failRefund.success).toBe(false);
    expect(failRefund.errors[0]).toContain('requires named business owner sign-off');

    // 5. Successful resolution of complimentary redo with case closure
    const resolveResult = resolveComplaintCase(withRedo, {
      remedyType: 'complimentary_redo',
      resolutionSummary: 'Redo completed successfully. Violet-ash toner achieved desired tone; client thrilled.',
      ownerApproverName: 'Chloe Founder',
    });
    expect(resolveResult.success).toBe(true);
    expect(resolveResult.resolvedRecord?.status).toBe('resolved');
    expect(resolveResult.resolvedRecord?.originalClientConcern).toBe(caseRecord.originalClientConcern); // Preserved intact
    expect(resolveResult.resolvedRecord?.chronology.length).toBe(3);
  });

  it('enforces clinical lead review notes for adverse skin reactions', () => {
    const clinicalCase = openComplaintCase({
      businessId,
      clientId,
      clientName: 'Amara Patel',
      clientContact: 'amara@example.com',
      originalAppointmentId: appointmentId,
      originalServiceName: 'TCA 15% Chemical Peel',
      originalSpecialistName: 'Elena Rostova',
      originalAmountChargedCents: 15000,
      category: 'adverse_skin_reaction',
      originalClientConcern: 'Mild localized blistering and peeling beyond expected erythema on jawline.',
      responsibleStaffId: staffId,
      responsibleStaffName: 'Elena Rostova',
    });

    expect(clinicalCase.requiresClinicalReview).toBe(true);
    expect(clinicalCase.status).toBe('under_investigation');

    // Resolving without clinical lead info fails
    const failClinical = resolveComplaintCase(clinicalCase, {
      remedyType: 'goodwill_retail_gift',
      resolutionSummary: 'Sent soothing barrier balm',
    });
    expect(failClinical.success).toBe(false);
    expect(failClinical.errors[0]).toContain('Adverse skin/treatment reaction cases require documented clinical review notes');

    // Resolving with clinical notes succeeds
    const successClinical = resolveComplaintCase(clinicalCase, {
      remedyType: 'goodwill_retail_gift',
      resolutionSummary: 'Clinical review confirmed contact sensitivity; client provided calming lipid balm.',
      clinicalLeadName: 'Dr. Sarah Jenkins, MD',
      clinicalReviewNotes: 'Reviewed photo and intake. Superficial epidermolysis; healing nicely with topical barrier balm.',
    });
    expect(successClinical.success).toBe(true);
    expect(successClinical.resolvedRecord?.status).toBe('resolved');
    expect(successClinical.resolvedRecord?.clinicalLeadName).toBe('Dr. Sarah Jenkins, MD');
  });
});

describe('Posie Core Logic - F060 (Human Support Escalation)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const staffId = '99999999-9999-9999-9999-999999999999';

  it('provides immediate SLA during staffed hours and rejects fake immediate claims after hours', () => {
    // 1. In-hours submission (e.g. 2:00 PM on Wednesday)
    const inHoursTicket = createSupportEscalation({
      businessId,
      requesterStaffId: staffId,
      requesterName: 'Elena Rostova',
      contactPhone: '+15125550199',
      urgency: 'critical_system_block',
      summary: 'Card terminal offline during checkout rush',
      details: 'Card reader reports SSL connection timeout when processing client debit card.',
      submissionTime: '2026-11-04T14:00:00Z', // Wednesday 14:00 (within 8-19)
    });

    expect(inHoursTicket.submittedDuringStaffedHours).toBe(true);
    expect(inHoursTicket.immediateHumanAvailable).toBe(true);
    expect(inHoursTicket.slaTargetMinutes).toBe(15);
    expect(inHoursTicket.statusNotice).toContain('respond within 15 minutes');

    // 2. After-hours submission (e.g. 10:30 PM on Wednesday)
    const afterHoursTicket = createSupportEscalation({
      businessId,
      requesterStaffId: staffId,
      requesterName: 'Elena Rostova',
      contactPhone: '+15125550199',
      urgency: 'billing_or_payout',
      summary: 'Question regarding weekend deposit payout schedule',
      details: 'Want to confirm if Friday card transactions batch out on Saturday or Monday morning.',
      submissionTime: '2026-11-04T22:30:00Z', // Wednesday 22:30 (outside 8-19)
      callbackRequested: true,
      preferredCallbackWindow: 'Thursday 9:00 AM - 11:00 AM',
    });

    expect(afterHoursTicket.submittedDuringStaffedHours).toBe(false);
    expect(afterHoursTicket.immediateHumanAvailable).toBe(false);
    expect(afterHoursTicket.nextStaffedWindowStart).toBeDefined();
    expect(afterHoursTicket.statusNotice).toContain('human specialist team is currently off-duty');
    expect(afterHoursTicket.status).toBe('callback_scheduled');

    // 3. Resolve ticket
    const resolved = resolveSupportTicket(inHoursTicket, {
      assignedAgentName: 'Marcus Support Lead',
      resolutionNotes: 'Terminal network reset executed remotely; test swipe approved cleanly.',
    });
    expect(resolved.status).toBe('resolved');
    expect(resolved.assignedAgentName).toBe('Marcus Support Lead');
  });
});

describe('Posie Core Logic - F061 (Usage & Bill Preview)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';

  it('itemizes subscription and metered usage, triggering spend limit alerts at 100% threshold', () => {
    // Studio Team ($79/mo, 3 included seats), 4 active staff (+1 seat = $20), 1 terminal ($15), 6,000 SMS ($120)
    const preview = generateBillingPreview({
      businessId,
      planTier: 'studio_team',
      billingCycleStart: '2026-11-01',
      billingCycleEnd: '2026-11-30',
      nextInvoiceDate: '2026-12-01',
      includedStaffSeats: 3,
      totalActiveStaffCount: 4,
      activeTerminalsCount: 1,
      meteredSmsSegmentsUsed: 6000, // 6,000 segments @ $0.02 = $120.00
      spendingCapCents: 10000,      // $100.00 spend cap on variable usage
    });

    // Fixed subscription: $79 (base) + $20 (1 seat) + $15 (1 terminal) = $114.00 (11,400 cents)
    expect(preview.fixedSubscriptionTotalCents).toBe(11400);

    // Variable usage: 6000 * 2 cents = 12,000 cents ($120.00)
    expect(preview.meteredUsageTotalCents).toBe(12000);

    // Cap status should be exceeded
    expect(preview.spendingCapStatus).toBe('cap_reached_100');
    expect(preview.overageAlertMessage).toContain('Monthly variable spend cap reached');

    // Grand total includes estimated 8.25% tax
    expect(preview.estimatedGrandTotalCents).toBeGreaterThan(preview.fixedSubscriptionTotalCents + preview.meteredUsageTotalCents);
    expect(preview.lineItems.length).toBe(4);
  });
});

describe('Posie Core Logic - F062 (Communication Preferences & Quiet Hours - DR05)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const clientId = '22222222-2222-2222-2222-222222222222';

  it('separates marketing from transactional messaging and enforces quiet hours for promotional blasts', () => {
    // 1. Initial preferences with marketing opted out by default
    const prefs = initCommunicationPreferences({
      clientId,
      businessId,
      phone: '+15125550199',
      email: 'claire@example.com',
      initialPromotionalOptIn: false,
    });

    expect(prefs.transactionalSmsEnabled).toBe(true);
    expect(prefs.promotionalSmsEnabled).toBe(false);
    expect(prefs.consentHistory.length).toBe(1);

    // 2. Promotional message blocked due to lack of consent
    const blockedPromo = evaluateMessageDispatch(prefs, {
      channel: 'promotional_marketing',
      proposedSendTimeIso: '2026-11-04T15:00:00Z',
    });
    expect(blockedPromo.canSendImmediately).toBe(false);
    expect(blockedPromo.reason).toContain('Client has opted out of promotional marketing');

    // 3. Client opts in via self-service portal
    const optedInPrefs = updateChannelPreference(prefs, {
      channel: 'promotional_marketing',
      action: 'opt_in',
      source: 'client_self_service_portal',
      notes: 'Client enabled weekly salon glow-up tips and seasonal promo alerts.',
    });
    expect(optedInPrefs.promotionalSmsEnabled).toBe(true);
    expect(optedInPrefs.consentHistory.length).toBe(2);

    // 4. Promotional message during quiet hours (e.g. 23:00 / 11:00 PM) is deferred
    const nightPromo = evaluateMessageDispatch(optedInPrefs, {
      channel: 'promotional_marketing',
      proposedSendTimeIso: '2026-11-04T23:00:00Z',
    });
    expect(nightPromo.canSendImmediately).toBe(false);
    expect(nightPromo.isDeferredForQuietHours).toBe(true);
    expect(nightPromo.reason).toContain('Deferred: Quiet hours active');

    // 5. Critical transactional appointment confirmation during night hours is NOT deferred
    const nightAppointmentAlert = evaluateMessageDispatch(optedInPrefs, {
      channel: 'transactional_appointment',
      proposedSendTimeIso: '2026-11-04T23:00:00Z',
    });
    expect(nightAppointmentAlert.canSendImmediately).toBe(true);
    expect(nightAppointmentAlert.isDeferredForQuietHours).toBe(false);
  });
});

describe('Posie Core Logic - F063 (Visit Progress Check-ins)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const clientId = '22222222-2222-2222-2222-222222222222';
  const appointmentId = '33333333-3333-3333-3333-333333333333';
  const staffId = '99999999-9999-9999-9999-999999999999';

  it('records client healing progress, enforces non-diagnostic notice, and routes advice', () => {
    // 1. Normal progress check-in
    const routineCheckin = submitVisitProgressCheckin({
      businessId,
      clientId,
      clientName: 'Hailey Morgan',
      appointmentId,
      serviceName: 'Level 2 Jessner Peel',
      practitionerStaffId: staffId,
      practitionerName: 'Elena Rostova',
      daysSinceService: 3,
      comfortLevel: 'mild_expected_dryness_or_redness',
      clientReportNotes: 'Light flaking around mouth and chin; feeling comfortable with hyaluronic barrier balm.',
    });

    expect(routineCheckin.status).toBe('submitted_pending_review');
    expect(routineCheckin.triageLevel).toBe('routine_healing');
    expect(routineCheckin.nonDiagnosticNotice).toContain('do not constitute formal medical diagnoses');

    // Practitioner reviews and provides reassurance
    const reviewed = reviewVisitProgressCheckin(routineCheckin, {
      practitionerAdviceNotes: 'Flaking on day 3 is perfectly on track. Keep skin quenched with gentle lipid moisturizer; avoid picking.',
    });
    expect(reviewed.status).toBe('reviewed_reassured');
    expect(reviewed.practitionerAdviceNotes).toContain('Flaking on day 3 is perfectly on track');

    // 2. Severe reaction triggers urgent medical safety guidance
    const severeCheckin = submitVisitProgressCheckin({
      businessId,
      clientId,
      clientName: 'Hailey Morgan',
      appointmentId,
      serviceName: 'Level 2 Jessner Peel',
      practitionerStaffId: staffId,
      practitionerName: 'Elena Rostova',
      daysSinceService: 1,
      comfortLevel: 'severe_reaction',
      clientReportNotes: 'Severe burning sensation and raised blistering near temples.',
    });

    expect(severeCheckin.triageLevel).toBe('urgent_medical_escalation');
    expect(severeCheckin.status).toBe('clinically_escalated');
    expect(severeCheckin.urgentMedicalDisclaimer).toContain('IMPORTANT SAFETY GUIDANCE');
  });
});

describe('Posie Core Logic - F064 (Consent-Aware Portfolio Publishing - Document D12)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const clientId = '22222222-2222-2222-2222-222222222222';
  const assetId = '44444444-4444-4444-4444-444444444444';

  it('enforces separate media permission, validates channel scopes, and unpublishes on revocation', () => {
    // 1. Invariant: Rejects grant if treatment separation is not explicitly acknowledged
    expect(() =>
      createMediaUseGrant({
        businessId,
        clientId,
        clientName: 'Claire Vance',
        assetIds: [assetId],
        permittedChannels: ['website_portfolio', 'social_media_instagram_tiktok'],
        anonymityScope: 'close_up_feature_only',
        signedByClientName: 'Claire Vance',
        clientSignatureToken: 'sig_token_claire_9876',
        explicitTreatmentSeparationAcknowledged: false, // Fails invariant
      })
    ).toThrow('treatment consent is separate from marketing rights');

    // 2. Valid explicit grant for website and instagram
    const grant = createMediaUseGrant({
      businessId,
      clientId,
      clientName: 'Claire Vance',
      assetIds: [assetId],
      permittedChannels: ['website_portfolio', 'social_media_instagram_tiktok'],
      anonymityScope: 'close_up_feature_only',
      signedByClientName: 'Claire Vance',
      clientSignatureToken: 'sig_token_claire_9876',
      explicitTreatmentSeparationAcknowledged: true,
    });

    expect(grant.status).toBe('active_public_granted');
    expect(grant.permittedChannels).toContain('website_portfolio');

    // 3. Check publishing eligibility
    const webCheck = checkMediaPublishingEligibility(grant, 'website_portfolio');
    expect(webCheck.canPublish).toBe(true);

    const printCheck = checkMediaPublishingEligibility(grant, 'printed_salon_lookbook');
    expect(printCheck.canPublish).toBe(false);
    expect(printCheck.reason).toContain('Publication blocked');

    // 4. Revocation removes digital assets from owned platforms
    const revoked = revokeMediaUsePermission(grant, {
      revokedByClientName: 'Claire Vance',
      reason: 'Requested privacy for new professional position',
    });

    expect(revoked.status).toBe('revoked_unpublish_requested');
    expect(revoked.removedFromOwnedDigitalPlatforms).toBe(true);

    // After revocation, publishing on web is blocked
    const postRevocationCheck = checkMediaPublishingEligibility(revoked, 'website_portfolio');
    expect(postRevocationCheck.canPublish).toBe(false);
    expect(postRevocationCheck.reason).toContain('Client has formally revoked marketing consent');
  });
});

describe('Posie Core Logic - F065 (Virtual Consultation Connection - WB A6)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const clientId = '22222222-2222-2222-2222-222222222222';
  const staffId = '99999999-9999-9999-9999-999999999999';

  it('creates zero-friction video consultation with recording disabled by default and links outcomes', () => {
    // 1. Create consultation room
    const consultation = createVirtualConsultation({
      businessId,
      clientId,
      clientName: 'Sienna Miller',
      clientEmail: 'sienna@example.com',
      specialistStaffId: staffId,
      specialistName: 'Elena Rostova',
      scheduledStartTime: '2026-11-10T16:00:00Z',
      durationMinutes: 25,
      provider: 'daily_co',
      consultationGoalsNotes: 'Discussing bridal skin prep timeline and acne scar texture treatment options.',
      hasUploadedConsultationPhotos: true,
    });

    // Zero friction guest link
    expect(consultation.clientOneClickJoinUrl).toContain('guest=true');
    expect(consultation.status).toBe('scheduled');

    // Invariant: Call recording is disabled by default
    expect(consultation.isRecordingActive).toBe(false);
    expect(consultation.recordingConsentGranted).toBe(false);

    // 2. Complete consultation and link recommended plan
    const completed = completeVirtualConsultation(consultation, {
      clinicalConsultationSummary: 'Recommended 3-step gentle mandelic peel series followed by LED barrier repair.',
      recommendedServiceId: '55555555-5555-5555-5555-555555555555',
      followUpProposalEstimateId: '66666666-6666-6666-6666-666666666666',
    });

    expect(completed.status).toBe('completed');
    expect(completed.completedAt).toBeDefined();
    expect(completed.recommendedServiceId).toBe('55555555-5555-5555-5555-555555555555');
  });
});

describe('Posie Core Logic - F066 (Arrival and Waiting Status)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const clientId = '22222222-2222-2222-2222-222222222222';
  const appointmentId = '33333333-3333-3333-3333-333333333333';
  const staffId = '99999999-9999-9999-9999-999999999999';

  it('manages private queue, sanitizes public displays, and reverses accidental check-ins', () => {
    // 1. Record client arrival
    const arrival = recordClientArrival({
      appointmentId,
      businessId,
      clientId,
      fullClientName: 'Maya Lin',
      clientPhone: '+15125550199',
      specialistStaffId: staffId,
      specialistName: 'Elena Rostova',
      serviceName: 'Hydra-Dew Glass Facial',
      scheduledTime: '2026-11-05T14:00:00Z',
      isVipClient: true,
      privateStaffAlertNotes: 'VIP Member: Prefers sparkling water with cucumber.',
      estimatedWaitMinutes: 5,
    });

    expect(arrival.state).toBe('arrived_waiting');
    expect(arrival.publicDisplayName).toBe('Maya L.'); // Sanitized
    expect(arrival.isVipClient).toBe(true);

    // 2. Sanitized public waiting room queue strictly hides VIP flags & phone numbers
    const publicView = getSanitizedPublicWaitingQueue([arrival]);
    expect(publicView.length).toBe(1);
    expect(publicView[0].publicDisplayName).toBe('Maya L.');
    expect((publicView[0] as any).clientPhone).toBeUndefined();
    expect((publicView[0] as any).privateStaffAlertNotes).toBeUndefined();

    // 3. Duplicate check-in is rejected
    expect(() =>
      recordClientArrival({
        appointmentId,
        businessId,
        clientId,
        fullClientName: 'Maya Lin',
        clientPhone: '+15125550199',
        specialistStaffId: staffId,
        specialistName: 'Elena Rostova',
        serviceName: 'Hydra-Dew Glass Facial',
        scheduledTime: '2026-11-05T14:00:00Z',
        existingQueue: [arrival],
      })
    ).toThrow('Duplicate check-in rejected');

    // 4. Reverse accidental check-in
    const reversed = reverseAccidentalCheckin(arrival, 'Client called to say running 10 mins late; front desk tapped early.');
    expect(reversed.state).toBe('accidental_checkin_reversed');
    expect(reversed.reversalReason).toContain('running 10 mins late');

    // 5. Seat client in chair
    const seated = seatClientInChair(arrival, 'Treatment Room 2');
    expect(seated.state).toBe('in_chair');
    expect(seated.seatAssigned).toBe('Treatment Room 2');
  });
});

describe('Posie Core Logic - F067 (Local Device Preferences & Accessibility)', () => {
  it('generates CSS variables and accessibility overrides for typography, contrast, and focus', () => {
    const prefs = setDevicePreferences('device-ipad-reception-01', {
      textSize: 'large',
      contrastMode: 'high_contrast',
      reducedMotion: true,
      focusRingStyle: 'high_visibility',
    });

    const styles = generateAccessibilityStyles(prefs);

    expect(styles.dataAttributes['data-text-size']).toBe('large');
    expect(styles.dataAttributes['data-contrast']).toBe('high_contrast');
    expect(styles.cssVariables['--posie-font-scale']).toBe('1.15');
    expect(styles.cssVariables['--posie-transition-duration']).toBe('0ms');
    expect(styles.cssVariables['--posie-focus-outline']).toContain('3px solid');
    expect(styles.htmlClassNames).toContain('posie-high-contrast');
    expect(styles.htmlClassNames).toContain('posie-reduce-motion');
  });
});

describe('Posie Core Logic - F068 (Client Credit & Balance Explanations - D15, D17)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const clientId = '22222222-2222-2222-2222-222222222222';
  const appointmentId = '33333333-3333-3333-3333-333333333333';

  it('manages transparent entitlement ledgers, masks gift card codes, and translates balances into plain English', () => {
    // 1. Issue Package Series (3 sessions, $300 value)
    const packageInstrument = issueClientBalance({
      businessId,
      clientId,
      type: 'package_series',
      instrumentTitle: 'Signature HydraFacial 3-Pack',
      initialValueCents: 30000,
      totalUnits: 3,
      expiresAt: '2027-10-15T00:00:00Z',
    });

    expect(packageInstrument.remainingValueCents).toBe(30000);
    expect(packageInstrument.remainingUnits).toBe(3);
    expect(packageInstrument.plainEnglishSummary).toContain('You have 3 of 3 sessions remaining');
    expect(packageInstrument.ledger.length).toBe(1);

    // 2. Redeem 1 session ($100) at appointment checkout
    const redeemed = redeemClientBalance(packageInstrument, {
      redeemAmountCents: 10000,
      redeemUnits: 1,
      linkedAppointmentId: appointmentId,
      serviceName: 'Signature HydraFacial',
    });

    expect(redeemed.remainingValueCents).toBe(20000); // $200
    expect(redeemed.remainingUnits).toBe(2);
    expect(redeemed.plainEnglishSummary).toContain('You have 2 of 3 sessions remaining');
    expect(redeemed.ledger.length).toBe(2);
    expect(redeemed.ledger[1].linkedAppointmentId).toBe(appointmentId);

    // 3. Invariant: Insufficient balance rejects redemption
    expect(() =>
      redeemClientBalance(redeemed, {
        redeemAmountCents: 25000, // $250 > $200 available
        redeemUnits: 1,
        linkedAppointmentId: appointmentId,
        serviceName: 'Signature HydraFacial',
      })
    ).toThrow('Insufficient balance');

    // 4. Issue Gift Card with masked code (Document D17)
    const giftCard = issueClientBalance({
      businessId,
      clientId,
      type: 'gift_card',
      instrumentTitle: 'Mother\'s Day Pampering Gift Card',
      initialValueCents: 7500, // $75
      rawGiftCode: 'POSIE-GIFT-CARD-9842',
    });

    expect(giftCard.maskedCode).toBe('GIFT-****-9842');
    expect(giftCard.plainEnglishSummary).toContain('$75.00 spendable store credit');
  });
});

describe('Posie Core Logic - F069 (Staff Document Generation - Documents D19, D20)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const staffId = '99999999-9999-9999-9999-999999999999';

  it('generates relationship-accurate onboarding packets and auditable commission earnings statements', () => {
    // 1. Independent Booth Renter Packet (D19)
    const renterPacket = generateStaffOnboardingPacket({
      businessId,
      businessLegalName: 'Posie Beauty Atelier LLC',
      staffId,
      staffLegalName: 'Camila Rodriguez',
      relationshipType: 'booth_or_chair_renter',
      jobTitle: 'Independent Master Esthetician',
      jurisdictionState: 'TX',
      boothRentalWeeklyFeeCents: 27500, // $275/week
    });

    expect(renterPacket.relationshipType).toBe('booth_or_chair_renter');
    expect(renterPacket.isIndependentMerchantAccount).toBe(true);
    expect(renterPacket.clientDataOwnershipNotice).toContain('Independent Business Notice');
    expect(renterPacket.status).toBe('draft_issued');

    // Sign packet
    const signedPacket = signStaffOnboardingPacket(renterPacket, 'Camila Rodriguez');
    expect(signedPacket.status).toBe('signed_and_active');
    expect(signedPacket.signedAt).toBeDefined();

    // 2. Commission Earnings Statement (D20)
    const earningsStatement = generateCommissionEarningsStatement({
      businessId,
      staffId,
      staffName: 'Camila Rodriguez',
      payPeriodStart: '2026-10-15',
      payPeriodEnd: '2026-10-31',
      lineItems: [
        {
          date: '2026-10-16',
          serviceOrItemName: 'Signature Biab Gel Manicure',
          category: 'service_commission',
          grossRevenueCents: 8000,
          commissionRatePercent: 50,
          earnedCommissionCents: 4000, // $40.00
        },
        {
          date: '2026-10-16',
          serviceOrItemName: 'Cuticle Conditioning Oil',
          category: 'retail_product_commission',
          grossRevenueCents: 2400,
          commissionRatePercent: 15,
          earnedCommissionCents: 360, // $3.60
        },
        {
          date: '2026-10-16',
          serviceOrItemName: 'Client Gratuity Tip',
          category: 'client_tips',
          grossRevenueCents: 2000,
          commissionRatePercent: 100,
          earnedCommissionCents: 2000, // $20.00
        },
      ],
    });

    expect(earningsStatement.status).toBe('estimated');
    expect(earningsStatement.grossTotalPayableCents).toBe(6360); // $63.60
    expect(earningsStatement.statutoryPayslipDisclaimer).toContain('serves as an earnings detail report');

    // Manager approves earnings statement
    const approved = approveCommissionStatement(earningsStatement, 'Elena Rostova (General Manager)');
    expect(approved.status).toBe('manager_approved');
    expect(approved.managerApproverName).toBe('Elena Rostova (General Manager)');
  });
});

describe('Posie Core Logic - F070 (International Language Presentation - Documents DR08, DR09)', () => {
  const serviceId = '44444444-4444-4444-4444-444444444444';
  const clientId = '22222222-2222-2222-2222-222222222222';

  it('translates client-facing service catalog while strictly preserving prices and salon currency', () => {
    // 1. Localize into Spanish (es-US)
    const spanishService = getLocalizedServiceDisplay({
      serviceId,
      serviceKey: 'hydra-dew-facial',
      defaultName: 'Hydra-Dew Glass Glow Facial',
      priceCents: 12000, // $120.00
      durationMinutes: 60,
      catalogCurrency: 'USD',
      targetLocale: 'es-US',
    });

    expect(spanishService.locale).toBe('es-US');
    expect(spanishService.localizedTitle).toBe('Facial Hidratante Efecto Vidrio Glow');
    expect(spanishService.priceCents).toBe(12000); // INVARIANT: Price unchanged
    expect(spanishService.currency).toBe('USD');   // INVARIANT: Currency NEVER inferred from locale
    expect(spanishService.durationMinutes).toBe(60);

    // 2. Localized Signed Consent (DR09)
    const signedRecord = recordLocalizedSignedConsent({
      clientId,
      documentType: 'chemical_peel_informed_consent',
      locale: 'es-US',
      renderedText: 'Entiendo que se debe evitar la exposición directa al sol durante 7 días posteriores al tratamiento.',
      signerName: 'Sofia Fernandez',
    });

    expect(signedRecord.renderedLocale).toBe('es-US');
    expect(signedRecord.verbatimRenderedText).toContain('evitar la exposición directa al sol');
    expect(signedRecord.counselReviewCertified).toBe(true);
  });
});

describe('Posie Core Logic - F071 (Rebooking at Checkout)', () => {
  const appointmentId = '33333333-3333-3333-3333-333333333333';
  const clientId = '22222222-2222-2222-2222-222222222222';
  const staffId = '99999999-9999-9999-9999-999999999999';

  it('calculates recommended return intervals and preserves client right to defer without forced booking', () => {
    // 1. Generate return recommendation for 4-week brow sculpt
    const offer = generateRebookingOffer({
      appointmentId,
      clientId,
      clientName: 'Chloe Bennett',
      serviceName: 'Fluff & Define Brow Sculpt',
      specialistStaffId: staffId,
      specialistName: 'Elena Rostova',
      currentVisitDate: '2026-11-01',
      cadenceType: 'brow_sculpt_and_tint',
    });

    expect(offer.recommendedIntervalWeeks).toBe(4);
    expect(offer.recommendedTargetDate).toBe('2026-11-29');
    expect(offer.decision).toBe('pending_decision'); // Invariant: Unbooked until accepted
    expect(offer.suggestedSlots.length).toBe(2);

    // 2. Client chooses "Remind me via SMS 1 week before"
    const deferredChoice = recordClientRebookingChoice(offer, {
      decision: 'deferred_remind_via_sms',
      reminderDate: '2026-11-22',
    });

    expect(deferredChoice.decision).toBe('deferred_remind_via_sms');
    expect(deferredChoice.scheduledReminderDate).toBe('2026-11-22');
    expect(deferredChoice.confirmedNextAppointmentId).toBeNull();

    // 3. Client accepts suggested slot #1
    const acceptedChoice = recordClientRebookingChoice(offer, {
      decision: 'accepted_and_booked',
      selectedSlotId: 'slot-1',
    });

    expect(acceptedChoice.decision).toBe('accepted_and_booked');
    expect(acceptedChoice.selectedSlotId).toBe('slot-1');
    expect(acceptedChoice.confirmedNextAppointmentId).toBeDefined();
  });
});

describe('Posie Core Logic - F072 (Customer Owned Contact Number & Portability)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';

  it('provisions owned business number and guarantees zero-friction carrier port-out via LOA', () => {
    // 1. Provision business number
    const telephony = provisionCustomerOwnedNumber({
      businessId,
      e164PhoneNumber: '+15125550199',
      formattedDisplayNumber: '(512) 555-0199',
    });

    expect(telephony.status).toBe('active_verified');
    expect(telephony.portingOutAllowed).toBe(true); // INVARIANT: Never held hostage
    expect(telephony.carrierAccountRef).toContain('POSIE-TEL-');

    // 2. Generate Letter of Authorization (LOA) to port out
    const { updatedTelephony, loaDocument } = generatePortOutLoaDocument(telephony, {
      businessLegalName: 'Posie Beauty Atelier LLC',
      authorizedSignerName: 'Elena Rostova',
      serviceAddress: '1204 South Congress Ave, Austin TX 78704',
      targetCarrierName: 'Twilio Inc.',
      signatureToken: 'sig_token_loa_port_9876',
    });

    expect(updatedTelephony.status).toBe('port_out_requested');
    expect(loaDocument.billingTelephoneNumber).toBe('+15125550199');
    expect(loaDocument.pinPasscode).toBe(telephony.portingPinPasscode);
    expect(loaDocument.targetCarrierName).toBe('Twilio Inc.');
  });
});

describe('Posie Core Logic - F073 (Tenant Identity & Access Control - Document DR07)', () => {
  const businessA = '11111111-1111-1111-1111-111111111111';
  const businessB = '22222222-2222-2222-2222-222222222222';
  const staffId = '99999999-9999-9999-9999-999999999999';

  it('enforces multi-tenant isolation, firewalls front desk from clinical SOAP notes, and revokes sessions on deactivation', () => {
    // 1. Multi-Tenant Firewall
    expect(() => assertTenantBoundary(businessA, businessB)).toThrow(TenantSecurityViolation);
    expect(() => assertTenantBoundary(businessA, businessA)).not.toThrow();

    // 2. Role-Based Least Privilege (DR07)
    const frontDeskUser = {
      userId: staffId,
      businessId: businessA,
      email: 'reception@posieatelier.com',
      fullName: 'Sam Receptionist',
      role: 'front_desk_coordinator' as const,
      isActive: true,
      activeSessionTokens: ['sess_token_abc123'],
      deactivatedAt: null,
      deactivationReason: null,
    };

    // Front desk can check in arrival queue
    const checkinPerm = checkStaffPermission(frontDeskUser, 'checkin_reception_queue');
    expect(checkinPerm.allowed).toBe(true);

    // Front desk BLOCKED from clinical treatment SOAP notes (DR07 firewall)
    const soapPerm = checkStaffPermission(frontDeskUser, 'view_client_clinical_soap_notes');
    expect(soapPerm.allowed).toBe(false);
    expect(soapPerm.reason).toContain('DR07 Recipient Firewall');

    // 3. Session Revocation on Deactivation
    const deactivatedUser = deactivateStaffMember(frontDeskUser, 'Staff member relocated out of state');
    expect(deactivatedUser.isActive).toBe(false);
    expect(deactivatedUser.activeSessionTokens.length).toBe(0); // Immediately revoked
    expect(deactivatedUser.deactivatedAt).toBeDefined();

    // Deactivated user cannot perform actions
    const postDeactivationPerm = checkStaffPermission(deactivatedUser, 'checkin_reception_queue');
    expect(postDeactivationPerm.allowed).toBe(false);
  });
});

describe('Posie Core Logic - F074 (Financial Ledger & Event History - Documents D14, D15, D17)', () => {
  const businessId = '11111111-1111-1111-1111-111111111111';
  const clientId = '22222222-2222-2222-2222-222222222222';
  const staffId = '99999999-9999-9999-9999-999999999999';

  it('prevents duplicate charges via idempotency and reconciles 3-way gross/fee/bank payout', () => {
    const idempotencyKey = 'checkout_appt_33333333_attempt_1';

    // 1. Initial checkout payment execution ($120 service + $20 tip = $140 gross)
    const firstAttempt = executeIdempotentCheckoutPayment({
      businessId,
      idempotencyKey,
      clientId,
      clientName: 'Chloe Bennett',
      specialistStaffId: staffId,
      paymentMethod: 'credit_card',
      serviceSubtotalCents: 12000,
      tipCents: 2000,
    });

    expect(firstAttempt.wasExistingIdempotentHit).toBe(false);
    expect(firstAttempt.transaction.grossChargedCents).toBe(14000);
    expect(firstAttempt.transaction.movements.length).toBe(3); // Service revenue + tips + processor fees
    expect(firstAttempt.transaction.processorFeeCents).toBeGreaterThan(0);

    // 2. INVARIANT: Network retry with same idempotencyKey returns existing record without double billing
    const secondAttempt = executeIdempotentCheckoutPayment({
      businessId,
      idempotencyKey,
      clientId,
      clientName: 'Chloe Bennett',
      specialistStaffId: staffId,
      paymentMethod: 'credit_card',
      serviceSubtotalCents: 12000,
      tipCents: 2000,
      existingLedger: [firstAttempt.transaction],
    });

    expect(secondAttempt.wasExistingIdempotentHit).toBe(true);
    expect(secondAttempt.transaction.transactionId).toBe(firstAttempt.transaction.transactionId);
    expect(secondAttempt.transaction.isDuplicateRetryPrevented).toBe(true);

    // 3. Three-Way Payout Reconciliation
    const reconciliation = reconcilePayoutPeriod({
      businessId,
      periodStart: '2026-11-01',
      periodEnd: '2026-11-01',
      transactions: [firstAttempt.transaction],
    });

    expect(reconciliation.totalGrossSalesCents).toBe(12000);
    expect(reconciliation.totalTipsCollectedCents).toBe(2000);
    expect(reconciliation.netBankDepositPayoutCents).toBe(firstAttempt.transaction.netProcessorDepositCents);
    expect(reconciliation.explanationNotice).toContain('Three-Way Payout Tie-Out');
  });
});

describe('Posie Core Logic - F075 (Reliable Booking Engine)', () => {
  const tenantId = 'tenant_posie_east_village';
  const practitionerId = 'prac_maya_stylist';
  const serviceId = 'srv_custom_balayage';

  it('creates temporary atomic slot holds, rejects concurrent collisions, and confirms guest bookings', () => {
    const slotStart = '2026-11-15T14:00:00.000Z';
    const currentTime = '2026-11-15T10:00:00.000Z';

    // 1. Guest A creates a 10-minute hold for 2:00 PM (duration 90m)
    const holdA = holdBookingSlot({
      tenantId,
      practitionerId,
      serviceId,
      startTime: slotStart,
      durationMinutes: 90,
      existingAppointments: [],
      existingHolds: [],
      currentTime,
    });

    expect(holdA.success).toBe(true);
    if (!holdA.success) return;
    expect(holdA.hold.status).toBe('active');
    expect(holdA.hold.holdToken).toBeDefined();

    // 2. Guest B tries to hold an overlapping slot at 2:30 PM for same practitioner -> Rejected!
    const holdB = holdBookingSlot({
      tenantId,
      practitionerId,
      serviceId,
      startTime: '2026-11-15T14:30:00.000Z',
      durationMinutes: 60,
      existingAppointments: [],
      existingHolds: [holdA.hold],
      currentTime,
    });

    expect(holdB.success).toBe(false);
    if (holdB.success) return;
    expect(holdB.reason).toContain('Slot is currently held');

    // 3. Guest A confirms booking without needing an account or app download
    const confirmResult = confirmHeldBooking({
      hold: holdA.hold,
      client: {
        fullName: 'Elena Rostova',
        email: 'elena@gmail.com',
        phoneNumber: '+1-212-555-8932',
        timeZone: 'America/New_York',
      },
      serviceName: 'Custom Sun-Kissed Balayage',
      policyAcknowledged: true,
      currentTime: '2026-11-15T10:05:00.000Z',
    });

    expect(confirmResult.success).toBe(true);
    if (!confirmResult.success) return;
    expect(confirmResult.appointment.status).toBe('confirmed');
    expect(confirmResult.appointment.bookingMethod).toBe('guest_self_service');
    expect(confirmResult.updatedHold.status).toBe('confirmed');

    // 4. Stale/expired hold cannot be confirmed
    const expiredConfirm = confirmHeldBooking({
      hold: {
        ...holdA.hold,
        status: 'active',
        expiresAt: '2026-11-15T10:10:00.000Z',
      },
      client: {
        fullName: 'Elena Rostova',
        email: 'elena@gmail.com',
        phoneNumber: '+1-212-555-8932',
      },
      serviceName: 'Custom Sun-Kissed Balayage',
      policyAcknowledged: true,
      currentTime: '2026-11-15T10:15:00.000Z', // 5 minutes after expiration
    });

    expect(expiredConfirm.success).toBe(false);
    if (expiredConfirm.success) return;
    expect(expiredConfirm.reason).toContain('expired');
  });

  it('supports staff-created provisional express links confirmed by client with card hold', () => {
    // Pro initiates express booking
    const provisional = createProvisionalBooking({
      tenantId,
      practitionerId,
      serviceId,
      serviceName: 'Full Set Sculpted Gel Extensions',
      estimatedPriceCents: 16500,
      startTime: '2026-11-20T16:00:00.000Z',
      durationMinutes: 90,
      client: {
        fullName: 'Zoe Kravitz',
        email: 'zoe@example.com',
        phoneNumber: '+1-310-555-2244',
      },
    });

    expect(provisional.status).toBe('pending_client_confirmation');
    expect(provisional.secureExpressToken).toBeDefined();

    // Client confirms via link by providing card hold token
    const clientConfirmation = confirmProvisionalBooking({
      provisional,
      cardHoldToken: 'card_hold_tok_test_9999',
      policyAcknowledged: true,
    });

    expect(clientConfirmation.success).toBe(true);
    if (!clientConfirmation.success) return;
    expect(clientConfirmation.appointment.status).toBe('confirmed');
    expect(clientConfirmation.appointment.bookingMethod).toBe('provisional_express_link');
    expect(clientConfirmation.updatedProvisional.status).toBe('confirmed');
  });
});

describe('Posie Core Logic - F076 (Room & Equipment Scheduling)', () => {
  const tenantId = 'tenant_posie_tribeca';

  const roomA = {
    resourceId: 'res_room_suite_a',
    tenantId,
    name: 'Esthetics Suite A',
    type: 'treatment_room' as const,
    turnaroundCleanupMinutes: 15, // 15m disinfection turnaround
    isActive: true,
  };

  const laserDevice = {
    resourceId: 'res_device_ipl_1',
    tenantId,
    name: 'IPL Laser Handpiece 01',
    type: 'laser_device' as const,
    turnaroundCleanupMinutes: 20, // 20m sterilization turnaround
    isActive: true,
  };

  it('atomically reserves multi-resource rooms and devices with sanitization buffer', () => {
    // 1. Reserve Suite A and IPL Laser for 2:00 PM (60m duration)
    const reserve1 = reserveAppointmentResources({
      tenantId,
      appointmentId: 'apt_1001',
      serviceName: 'Full Face IPL Photofacial',
      practitionerId: 'prac_laser_nurse_kim',
      startTime: '2026-11-18T14:00:00.000Z',
      durationMinutes: 60, // Ends at 15:00, Suite A blocked until 15:15, Laser blocked until 15:20
      requiredResources: [roomA, laserDevice],
      existingReservations: [],
    });

    expect(reserve1.success).toBe(true);
    if (!reserve1.success) return;
    expect(reserve1.reservations.length).toBe(2);

    const laserReservation = reserve1.reservations.find((r) => r.resourceId === laserDevice.resourceId)!;
    expect(laserReservation.serviceEndTime).toBe('2026-11-18T15:00:00.000Z');
    expect(laserReservation.totalBlockedUntil).toBe('2026-11-18T15:20:00.000Z'); // 60m + 20m buffer

    // 2. Conflicting attempt at 15:10 PM during sanitization window -> REJECTED!
    const reserve2 = reserveAppointmentResources({
      tenantId,
      appointmentId: 'apt_1002',
      serviceName: 'Acne Spot Laser',
      practitionerId: 'prac_laser_dr_smith',
      startTime: '2026-11-18T15:10:00.000Z', // Starts before laser cleanup finishes at 15:20
      durationMinutes: 30,
      requiredResources: [laserDevice],
      existingReservations: reserve1.reservations,
    });

    expect(reserve2.success).toBe(false);
    if (reserve2.success) return;
    expect(reserve2.reason).toContain('sanitization buffer');

    // 3. Booking at 15:25 PM after sanitization buffer -> SUCCEEDS!
    const reserve3 = reserveAppointmentResources({
      tenantId,
      appointmentId: 'apt_1003',
      serviceName: 'Laser Hair Removal',
      practitionerId: 'prac_laser_nurse_kim',
      startTime: '2026-11-18T15:25:00.000Z',
      durationMinutes: 30,
      requiredResources: [laserDevice],
      existingReservations: reserve1.reservations,
    });

    expect(reserve3.success).toBe(true);

    // 4. Cancellation releases the active reservations
    const cancelled = cancelResourceReservations('apt_1001', reserve1.reservations);
    expect(cancelled.every((r) => r.status === 'cancelled')).toBe(true);
  });
});

describe('Posie Core Logic - F077 (Processing & Finishing Intervals)', () => {
  const tenantId = 'tenant_posie_soho';
  const practitionerId = 'prac_maya_master_colorist';
  const stylingChairId = 'res_station_chair_04';
  const secondaryChairId = 'res_station_chair_05';

  const balayageDefinition = {
    serviceId: 'srv_multi_stage_balayage',
    serviceName: 'Signature Balayage & Gloss',
    handsOnDurationMinutes: 45, // 45m foils application
    processingGapMinutes: 40,   // 40m color development (practitioner is FREE!)
    finishingDurationMinutes: 35, // 35m rinse, gloss & blowout
    requiresSameStationThroughout: true, // Primary client remains seated in Chair 04
  };

  it('builds split interval schedule where processing gap frees practitioner while keeping station occupied', () => {
    const startTime = '2026-11-19T10:00:00.000Z';

    const schedule = buildSplitIntervalSchedule({
      tenantId,
      appointmentId: 'apt_balayage_2001',
      practitionerId,
      primaryStationResourceId: stylingChairId,
      definition: balayageDefinition,
      startTime,
    });

    expect(schedule.totalSpanMinutes).toBe(120); // 45 + 40 + 35
    expect(schedule.totalPractitionerHandsOnMinutes).toBe(80); // 45 + 35
    expect(schedule.totalFreedProcessingMinutes).toBe(40);
    expect(schedule.segments.length).toBe(3);

    const [handsOn, gap, finish] = schedule.segments;

    // Segment 1: Hands-on (10:00 - 10:45)
    expect(handsOn.practitionerBusy).toBe(true);
    expect(handsOn.stationOccupied).toBe(true);
    expect(handsOn.endTime).toBe('2026-11-19T10:45:00.000Z');

    // Segment 2: Processing Gap (10:45 - 11:25)
    // KEY INVARIANT: Practitioner is FREE, but Station 04 is STILL OCCUPIED!
    expect(gap.practitionerBusy).toBe(false);
    expect(gap.stationOccupied).toBe(true);
    expect(gap.stationResourceId).toBe(stylingChairId);
    expect(gap.startTime).toBe('2026-11-19T10:45:00.000Z');
    expect(gap.endTime).toBe('2026-11-19T11:25:00.000Z');

    // Segment 3: Finishing (11:25 - 12:00)
    expect(finish.practitionerBusy).toBe(true);
    expect(finish.stationOccupied).toBe(true);
    expect(finish.startTime).toBe('2026-11-19T11:25:00.000Z');
    expect(finish.endTime).toBe('2026-11-19T12:00:00.000Z');

    // INVARIANT TEST 1: Secondary service fits into the gap using a SEPARATE station
    const canFitDryCut = canFitSecondaryServiceInProcessingGap({
      primarySchedule: schedule,
      secondaryServiceDurationMinutes: 25,
      secondaryRequestedStartTime: '2026-11-19T10:50:00.000Z', // 10:50 - 11:15 (finishes 10m before 11:25)
      secondaryTargetStationResourceId: secondaryChairId,
      safetyBufferMinutes: 5,
    });

    expect(canFitDryCut.canFit).toBe(true);

    // INVARIANT TEST 2: Rejects secondary service attempting to steal primary client's occupied station
    const stationTheftAttempt = canFitSecondaryServiceInProcessingGap({
      primarySchedule: schedule,
      secondaryServiceDurationMinutes: 25,
      secondaryRequestedStartTime: '2026-11-19T10:50:00.000Z',
      secondaryTargetStationResourceId: stylingChairId, // Same chair where client is processing!
    });

    expect(stationTheftAttempt.canFit).toBe(false);
    if (stationTheftAttempt.canFit) return;
    expect(stationTheftAttempt.reason).toContain('Primary client remains seated');

    // INVARIANT TEST 3: Rejects secondary service that runs over into finishing segment
    const tooLongService = canFitSecondaryServiceInProcessingGap({
      primarySchedule: schedule,
      secondaryServiceDurationMinutes: 38,
      secondaryRequestedStartTime: '2026-11-19T10:50:00.000Z', // 10:50 + 38m = 11:28, encroaches on 11:25 finish!
      secondaryTargetStationResourceId: secondaryChairId,
      safetyBufferMinutes: 5,
    });

    expect(tooLongService.canFit).toBe(false);
    if (tooLongService.canFit) return;
    expect(tooLongService.reason).toContain('encroaches on the practitioner\'s finishing segment');
  });
});

describe('Posie Core Logic - F078 (Multi-Practitioner Appointments - Document D02)', () => {
  const tenantId = 'tenant_posie_flatiron';

  it('enforces skill checks, attaches handoff notes, and exposes delay consequences before downstream notification', () => {
    // 1. Skill check failure: Practitioner without chemical certification cannot be booked for chemical peel
    const invalidCertResult = createMultiPractitionerAppointment({
      tenantId,
      clientId: 'client_chloe_101',
      clientName: 'Chloe Bennett',
      clientPhone: '+1-212-555-1234',
      locationAddress: '24 E 21st St, New York, NY',
      segments: [
        {
          serviceId: 'srv_deep_peel',
          serviceName: 'Medical Grade Chemical Peel',
          practitionerId: 'prac_apprentice_jen',
          practitionerName: 'Jen Apprentice',
          practitionerCertifications: ['basic_esthetics'],
          requiredCertification: 'advanced_chemical_peel_license',
          startTime: '2026-11-22T13:00:00.000Z',
          durationMinutes: 45,
        },
      ],
    });

    expect(invalidCertResult.success).toBe(false);
    if (invalidCertResult.success) return;
    expect(invalidCertResult.reason).toContain('does not possess required credential');

    // 2. Coordinated valid appointment: Maya (Balayage) -> Sarah (Lash Lift)
    const multiAppt = createMultiPractitionerAppointment({
      tenantId,
      clientId: 'client_chloe_101',
      clientName: 'Chloe Bennett',
      clientPhone: '+1-212-555-1234',
      locationAddress: '24 E 21st St, New York, NY',
      segments: [
        {
          serviceId: 'srv_balayage',
          serviceName: 'Custom Sun-Kissed Balayage',
          practitionerId: 'prac_maya_colorist',
          practitionerName: 'Maya Lin',
          practitionerCertifications: ['master_colorist'],
          startTime: '2026-11-22T13:00:00.000Z',
          durationMinutes: 90, // Ends at 14:30
        },
        {
          serviceId: 'srv_lash_lift',
          serviceName: 'Keratin Lash Infusion',
          practitionerId: 'prac_sarah_lashes',
          practitionerName: 'Sarah Jenkins',
          practitionerCertifications: ['keratin_lash_certified'],
          startTime: '2026-11-22T14:30:00.000Z',
          durationMinutes: 45, // Ends at 15:15
        },
      ],
    });

    expect(multiAppt.success).toBe(true);
    if (!multiAppt.success) return;
    expect(multiAppt.segments.length).toBe(2);
    expect(multiAppt.itinerary.depositStatus).toBe('deposit_paid');

    // 3. Attach handoff notes from Maya to Sarah
    const segmentsWithNotes = addSegmentHandoffNotes(
      multiAppt.segments,
      multiAppt.segments[0].segmentId,
      'Client scalp was slightly warm from lightener processing; avoid high steam on face.'
    );
    expect(segmentsWithNotes[0].handoffNotesToNext).toContain('avoid high steam');

    // 4. INVARIANT: Delayed segment evaluates downstream consequences before staff notification
    const delayCheck = recordSegmentDelayAndAssessImpact({
      segments: multiAppt.segments,
      delayedSegmentId: multiAppt.segments[0].segmentId,
      delayMinutes: 20, // Maya runs 20m late (finishing at 14:50 instead of 14:30)
      practitionerNextBookings: [
        {
          practitionerId: 'prac_sarah_lashes',
          nextAppointmentStart: '2026-11-22T15:30:00.000Z', // Sarah's next appointment
        },
      ],
    });

    // Sarah's service is pushed to 14:50 - 15:35, which collides with her 15:30 client!
    expect(delayCheck.impactAssessment.delayedSegmentId).toBe(multiAppt.segments[0].segmentId);
    expect(delayCheck.impactAssessment.impactedDownstreamSegments.length).toBe(1);
    const downstreamSarah = delayCheck.impactAssessment.impactedDownstreamSegments[0];
    expect(downstreamSarah.hasDownstreamScheduleConflict).toBe(true);
    expect(downstreamSarah.conflictDetails).toContain('collides with next appointment starting at 2026-11-22T15:30:00.000Z');

    // 5. Revise Document D02 Visit Itinerary
    const revisedItinerary = reviseVisitItinerary(
      multiAppt.itinerary,
      delayCheck.updatedSegments,
      'Foils processing extended by 20m for optimal lift'
    );
    expect(revisedItinerary.version).toBe(2);
    expect(revisedItinerary.revisionReason).toContain('optimal lift');
  });
});

describe('Posie Core Logic - F079 (Group & Family Booking - Document D22)', () => {
  const tenantId = 'tenant_posie_chelsea';

  it('organizes party proposals and strictly firewalls adult confidential medical intake from organizers/guardians', () => {
    // 1. Create a party booking proposal with an organizer, an adult friend, and a minor daughter
    const proposal = createGroupBookingProposal({
      tenantId,
      eventTitle: "Lauren's Wedding Morning Glam",
      organizer: {
        fullName: 'Lauren Hayes (Bride & Organizer)',
        email: 'lauren@weddingglow.com',
        phone: '+1-917-555-8811',
      },
      eventDate: '2026-12-05',
      venueType: 'in_salon',
      members: [
        {
          fullName: 'Lauren Hayes',
          ageCategory: 'adult',
          assignedServiceId: 'srv_bridal_hair',
          assignedServiceName: 'Bridal Updo & Veil Placement',
          servicePriceCents: 22000,
          practitionerId: 'prac_maya',
          practitionerName: 'Maya Lin',
          startTime: '2026-12-05T09:00:00.000Z',
          endTime: '2026-12-05T10:30:00.000Z',
          confidentialIntakeNotes: 'History of contact dermatitis from metallic hair pins',
        },
        {
          fullName: 'Brianna Smith (Maid of Honor)',
          ageCategory: 'adult',
          assignedServiceId: 'srv_glam_waves',
          assignedServiceName: 'Hollywood Waves',
          servicePriceCents: 15000,
          practitionerId: 'prac_chloe',
          practitionerName: 'Chloe Bennett',
          startTime: '2026-12-05T09:30:00.000Z',
          endTime: '2026-12-05T10:30:00.000Z',
          confidentialIntakeNotes: 'Pregnant (1st trimester), strictly avoid lavender aromatics',
        },
        {
          fullName: 'Lily Hayes (Junior Bridesmaid)',
          ageCategory: 'minor',
          guardianMemberId: 'mbr_org_lauren', // Lauren is her mother/guardian
          assignedServiceId: 'srv_soft_curls',
          assignedServiceName: 'Youth Soft Curls & Shimmer',
          servicePriceCents: 8500,
          practitionerId: 'prac_maya',
          practitionerName: 'Maya Lin',
          startTime: '2026-12-05T10:30:00.000Z',
          endTime: '2026-12-05T11:15:00.000Z',
          confidentialIntakeNotes: 'Peanut allergy (ensure styling products are nut-oil free)',
        },
      ],
    });

    expect(proposal.members.length).toBe(3);
    expect(proposal.totalEstimatedCents).toBe(45500); // $455.00
    expect(proposal.depositRequiredCents).toBe(13650); // 30% = $136.50

    const organizerMember = proposal.members[0];
    const adultFriendMember = proposal.members[1];
    const minorChildMember = proposal.members[2];

    // INVARIANT TEST 1: Organizer CANNOT access fellow adult friend's private medical/pregnancy notes!
    const adultPrivacyCheck = canAccessMemberConfidentialRecords({
      requesterMemberId: organizerMember.memberId,
      targetMember: adultFriendMember,
    });
    expect(adultPrivacyCheck.authorized).toBe(false);
    expect(adultPrivacyCheck.reason).toContain('Privacy Firewall: Adult party member intake and medical notes cannot be accessed');

    // INVARIANT TEST 2: Organizer/Guardian CAN access their own minor child's allergy disclosures
    // Set minor's guardian ID to organizer's actual ID
    minorChildMember.guardianMemberId = organizerMember.memberId;
    const minorGuardianCheck = canAccessMemberConfidentialRecords({
      requesterMemberId: organizerMember.memberId,
      targetMember: minorChildMember,
    });
    expect(minorGuardianCheck.authorized).toBe(true);
    expect(minorGuardianCheck.reason).toContain('Authorized guardian access');

    // 2. Generate Day-of Event Packet (Document D22)
    const dayOfPacket = generateDayOfEventPacket(proposal);
    expect(dayOfPacket.scheduleItems.length).toBe(3);
    expect(dayOfPacket.privacyNotice).toContain('Confidential Medical Firewall');

    // Verify day-of packet does NOT leak confidential health intake into shared itinerary
    const packetJson = JSON.stringify(dayOfPacket);
    expect(packetJson).not.toContain('Pregnant');
    expect(packetJson).not.toContain('dermatitis');
  });
});

describe('Posie Core Logic - F080 (Classes & Workshops)', () => {
  const tenantId = 'tenant_posie_williamsburg';

  const masterclassSession = {
    sessionId: 'cls_master_glow_01',
    tenantId,
    title: 'Gua Sha & Lymphatic Drainage Masterclass',
    instructorId: 'prac_maya_instructor',
    instructorName: 'Maya Lin',
    roomId: 'room_workshop_studio',
    roomName: 'Movement & Workshop Studio',
    startTime: '2026-11-25T18:00:00.000Z',
    endTime: '2026-11-25T19:30:00.000Z',
    maxCapacity: 2, // 2 seats max for test
    waitlistCapacity: 2,
    priceCents: 6500,
    status: 'scheduled' as const,
    roster: [],
    createdAt: '2026-11-01T12:00:00.000Z',
  };

  it('manages atomic capacity, routes to waitlist on full capacity, and auto-promotes on cancellation', () => {
    // 1. First attendee books seat 1/2
    const reg1 = registerAttendeeForClass({
      session: masterclassSession,
      attendeeId: 'user_emily_1',
      attendeeName: 'Emily Watson',
      attendeeEmail: 'emily@example.com',
      ticketType: 'direct_purchase',
    });
    expect(reg1.success).toBe(true);
    if (!reg1.success) return;
    expect(reg1.status).toBe('confirmed');

    // 2. Second attendee books seat 2/2 (Final seat sold once!)
    const reg2 = registerAttendeeForClass({
      session: reg1.updatedSession,
      attendeeId: 'user_hannah_2',
      attendeeName: 'Hannah Abbott',
      attendeeEmail: 'hannah@example.com',
      ticketType: 'direct_purchase',
    });
    expect(reg2.success).toBe(true);
    if (!reg2.success) return;
    expect(reg2.status).toBe('confirmed');

    // 3. Third attendee attempts booking on sold out class without waitlist -> REJECTED
    const reg3Blocked = registerAttendeeForClass({
      session: reg2.updatedSession,
      attendeeId: 'user_claire_3',
      attendeeName: 'Claire Redfield',
      attendeeEmail: 'claire@example.com',
      ticketType: 'direct_purchase',
      joinWaitlistIfFull: false,
    });
    expect(reg3Blocked.success).toBe(false);
    if (reg3Blocked.success) return;
    expect(reg3Blocked.reason).toContain('completely sold out');

    // 4. Third attendee joins waitlist
    const reg3Waitlist = registerAttendeeForClass({
      session: reg2.updatedSession,
      attendeeId: 'user_claire_3',
      attendeeName: 'Claire Redfield',
      attendeeEmail: 'claire@example.com',
      ticketType: 'direct_purchase',
      joinWaitlistIfFull: true,
    });
    expect(reg3Waitlist.success).toBe(true);
    if (!reg3Waitlist.success) return;
    expect(reg3Waitlist.status).toBe('waitlisted');

    // 5. First attendee cancels -> Claire Redfield is automatically promoted from waitlist to confirmed!
    const cancelResult = cancelAttendeeAndPromoteWaitlist({
      session: reg3Waitlist.updatedSession,
      attendeeId: 'user_emily_1',
    });

    expect(cancelResult.cancelledAttendee.status).toBe('cancelled');
    expect(cancelResult.promotedAttendee).toBeDefined();
    expect(cancelResult.promotedAttendee?.attendeeId).toBe('user_claire_3');
    expect(cancelResult.promotedAttendee?.status).toBe('confirmed');

    // 6. Check-in promoted attendee at session time
    const checkedInSession = checkInClassAttendee({
      session: cancelResult.updatedSession,
      attendeeId: 'user_claire_3',
    });

    const attendeeRecord = checkedInSession.roster.find((a) => a.attendeeId === 'user_claire_3')!;
    expect(attendeeRecord.status).toBe('attended');
    expect(attendeeRecord.checkedInAt).toBeDefined();
  });
});

describe('Posie Core Logic - F081 (Timed Waitlist Offers)', () => {
  const tenantId = 'tenant_posie_tribeca';
  const serviceId = 'srv_custom_facial';
  const practitionerId = 'prac_maya_master';

  it('matches preferences, dispatches timed offer with exclusive claim window, and advances on expiry', () => {
    // 1. Two candidates on waitlist: Candidate A (senior), Candidate B
    const candidateA = {
      entryId: 'entry_a_101',
      tenantId,
      clientId: 'cli_claire',
      clientName: 'Claire Redfield',
      clientPhone: '+1-212-555-1111',
      clientEmail: 'claire@example.com',
      serviceId,
      serviceName: 'Custom Bespoke Facial',
      practitionerId,
      preferredDaysOfWeek: ['thursday', 'friday'],
      preferredTimeOfDay: ['afternoon' as const],
      status: 'active' as const,
      createdAt: '2026-11-01T10:00:00.000Z',
    };

    const candidateB = {
      entryId: 'entry_b_102',
      tenantId,
      clientId: 'cli_diana',
      clientName: 'Diana Prince',
      clientPhone: '+1-212-555-2222',
      clientEmail: 'diana@example.com',
      serviceId,
      serviceName: 'Custom Bespoke Facial',
      practitionerId,
      preferredDaysOfWeek: ['thursday', 'friday'],
      preferredTimeOfDay: ['afternoon' as const],
      status: 'active' as const,
      createdAt: '2026-11-02T10:00:00.000Z',
    };

    // Slot opens on Thursday Nov 20 at 14:00 (Afternoon)
    const slotStartTime = '2026-11-20T14:00:00.000Z';
    const matches = findMatchingWaitlistCandidates({
      tenantId,
      serviceId,
      practitionerId,
      slotStartTime,
      waitlist: [candidateB, candidateA],
    });

    // Oldest candidate A is first
    expect(matches.length).toBe(2);
    expect(matches[0].entryId).toBe(candidateA.entryId);

    // 2. Dispatch 15-minute expiring offer to candidate A
    const { offer: offerA, updatedWaitlistEntry: entryAOffered } = dispatchTimedWaitlistOffer({
      tenantId,
      candidate: candidateA,
      serviceName: 'Custom Bespoke Facial',
      practitionerId,
      practitionerName: 'Maya Lin',
      slotStartTime,
      durationMinutes: 60,
      claimWindowMinutes: 15,
      currentTime: '2026-11-19T09:00:00.000Z',
    });

    expect(offerA.status).toBe('pending_claim');
    expect(offerA.claimToken).toBeDefined();
    expect(entryAOffered.status).toBe('offered');

    // 3. If Candidate A claims with valid token within deadline -> Confirmed!
    const claimSuccess = claimWaitlistOffer({
      offer: offerA,
      claimToken: offerA.claimToken,
      currentTime: '2026-11-19T09:05:00.000Z', // 5m later (within 15m window)
    });

    expect(claimSuccess.success).toBe(true);
    if (!claimSuccess.success) return;
    expect(claimSuccess.claimedOffer.status).toBe('claimed');

    // 4. Test Expiry & Advance to Candidate B
    const expiredClaim = claimWaitlistOffer({
      offer: offerA,
      claimToken: offerA.claimToken,
      currentTime: '2026-11-19T09:20:00.000Z', // 20m later (expired!)
    });
    expect(expiredClaim.success).toBe(false);

    // Advance expired offer to candidate B
    const advanceResult = advanceExpiredOffer({
      expiredOffer: offerA,
      remainingCandidates: [candidateB],
      serviceName: 'Custom Bespoke Facial',
      practitionerName: 'Maya Lin',
      durationMinutes: 60,
      claimWindowMinutes: 15,
      currentTime: '2026-11-19T09:20:00.000Z',
    });

    expect(advanceResult.expiredOffer.status).toBe('passed_to_next');
    expect(advanceResult.nextOffer).toBeDefined();
    expect(advanceResult.nextOffer?.clientName).toBe('Diana Prince');
  });
});

describe('Posie Core Logic - F082 (Cancellation Recovery Queue)', () => {
  const tenantId = 'tenant_posie_soho';

  const cancellationOpening = {
    openingId: 'opn_canc_9901',
    tenantId,
    practitionerId: 'prac_maya',
    practitionerName: 'Maya Lin',
    serviceId: 'srv_signature_balayage',
    serviceName: 'Signature Balayage & Gloss',
    cancelledAppointmentPriceCents: 22000, // $220.00
    slotStartTime: '2026-11-21T14:00:00.000Z',
    slotEndTime: '2026-11-21T16:00:00.000Z',
    durationMinutes: 120,
    status: 'open' as const,
    revenueClassification: 'none' as const,
    createdAt: '2026-11-21T10:00:00.000Z',
  };

  it('ranks recovery candidates and strictly isolates genuine incremental revenue from shifted reschedules', () => {
    // Candidate 1: Earlier-move client booked next week
    const earlierMoveClient = {
      candidateId: 'cand_move_1',
      source: 'earlier_move_request' as const,
      clientId: 'cli_jessica',
      clientName: 'Jessica Alba',
      clientPhone: '+1-310-555-4321',
      serviceId: 'srv_signature_balayage',
      serviceName: 'Signature Balayage & Gloss',
      servicePriceCents: 22000,
      isVip: true,
      existingFutureAppointmentId: 'apt_future_next_week_7712',
      requestTimestamp: '2026-11-20T10:00:00.000Z',
      priorityScore: 0,
    };

    // Candidate 2: New Standby VIP Client (no existing future appointment)
    const standbyVipClient = {
      candidateId: 'cand_standby_2',
      source: 'standby_vip_client' as const,
      clientId: 'cli_gigi',
      clientName: 'Gigi Hadid',
      clientPhone: '+1-212-555-8833',
      serviceId: 'srv_signature_balayage',
      serviceName: 'Signature Balayage & Gloss',
      servicePriceCents: 22000,
      isVip: true,
      requestTimestamp: '2026-11-20T12:00:00.000Z',
      priorityScore: 0,
    };

    const ranked = rankCancellationRecoveryCandidates({
      opening: cancellationOpening,
      candidates: [earlierMoveClient, standbyVipClient],
      prioritizeVips: true,
    });

    expect(ranked.length).toBe(2);

    // 1. Fill with earlier-move client -> classified as simple_reschedule
    const rescheduleFill = fillCancellationOpening({
      opening: cancellationOpening,
      chosenCandidate: earlierMoveClient,
    });

    expect(rescheduleFill.isIncrementalRecovery).toBe(false);
    expect(rescheduleFill.updatedOpening.revenueClassification).toBe('simple_reschedule');
    expect(rescheduleFill.revenueNotice).toContain('shifted from future appointment');

    // 2. Fill with standby client -> classified as genuine incremental_recovery
    const incrementalFill = fillCancellationOpening({
      opening: cancellationOpening,
      chosenCandidate: standbyVipClient,
    });

    expect(incrementalFill.isIncrementalRecovery).toBe(true);
    expect(incrementalFill.updatedOpening.revenueClassification).toBe('incremental_recovery');
    expect(incrementalFill.revenueNotice).toContain('Genuine incremental recovery of $220.00');

    // 3. Audit Revenue Invariant: Never count simple reschedules as net new revenue
    const audit = auditCancellationRecoveryRevenue({
      period: 'November 2026',
      openings: [rescheduleFill.updatedOpening, incrementalFill.updatedOpening],
    });

    expect(audit.totalSlotsRecoveredCount).toBe(2);
    expect(audit.trulyRecoveredIncrementalRevenueCents).toBe(22000); // Only Standby $220
    expect(audit.shiftedRescheduleVolumeCents).toBe(22000); // Earlier-move $220 is separate
    expect(audit.explanation).toContain('Strict Recovery Accounting');
  });
});

describe('Posie Core Logic - F083 (Two-Way Calendar Sync)', () => {
  const tenantId = 'tenant_posie_chelsea';
  const practitionerId = 'prac_maya_lin';

  const connection = {
    connectionId: 'conn_gcal_maya_01',
    tenantId,
    practitionerId,
    provider: 'google_calendar' as const,
    externalCalendarId: 'maya.stylist@gmail.com',
    syncDirection: 'two_way' as const,
    importBusyBlocksOnly: true,
    posieSyncTokenPrefix: 'posie_sync_',
    isActive: true,
    lastSyncedAt: '2026-11-21T08:00:00.000Z',
  };

  it('prevents sync ping-pong loops and defends paid appointments from silent external deletion', () => {
    // Existing confirmed appointment in Posie
    const confirmedPaidAppointment = {
      appointmentId: 'apt_posie_paid_3344',
      practitionerId,
      clientName: 'Chloe Bennett',
      startTime: '2026-11-21T14:00:00.000Z',
      endTime: '2026-11-21T15:30:00.000Z',
      isPaidOrDepositSecured: true,
      status: 'confirmed' as const,
    };

    // Incoming events from Google:
    // Event 1: Posie-originated event reflection (should be ignored to prevent sync loop!)
    // Event 2: Personal dentist appointment colliding with the confirmed appointment
    const incomingEvents = [
      {
        externalId: 'posie_sync_apt_posie_paid_3344',
        title: 'Posie: Chloe Bennett - Custom Balayage',
        startTime: '2026-11-21T14:00:00.000Z',
        endTime: '2026-11-21T15:30:00.000Z',
        isBusyBlock: true,
        originSource: 'posie_origin' as const,
        posieAppointmentId: 'apt_posie_paid_3344',
      },
      {
        externalId: 'gcal_event_personal_dentist',
        title: 'Dentist Checkup & Cleaning',
        startTime: '2026-11-21T14:30:00.000Z',
        endTime: '2026-11-21T15:15:00.000Z',
        isBusyBlock: true,
        originSource: 'external_personal' as const,
      },
    ];

    const syncResult = ingestExternalCalendarEvents({
      connection,
      incomingEvents,
      existingPosieAppointments: [confirmedPaidAppointment],
    });

    // INVARIANT 1: Sync Loop Echo Ignored
    expect(syncResult.loopEchoesIgnoredCount).toBe(1);
    expect(syncResult.busyBlocksIngestedCount).toBe(1);

    // Conflict identified for personal dentist
    expect(syncResult.conflictsIdentified.length).toBe(1);
    expect(syncResult.protectedPaidAppointmentsSavedCount).toBe(1);
    expect(syncResult.status).toBe('synced_with_conflicts');

    // INVARIANT 2: External Delete Blocked on Paid Appointment
    const deletionAttempt = handleExternalDeletionRequest({
      externalEventId: 'gcal_del_req_99',
      targetAppointment: confirmedPaidAppointment,
    });

    expect(deletionAttempt.deletionAllowed).toBe(false);
    expect(deletionAttempt.reason).toContain('Deletion Blocked: Appointment apt_posie_paid_3344');
    expect(deletionAttempt.reason).toContain('secured financial payment');
  });
});

describe('Posie Core Logic - F084 (Deposits and Preauthorizations - Document D05)', () => {
  const tenantId = 'tenant_posie_soho';
  const appointmentId = 'apt_soho_9001';
  const clientId = 'cli_hailey';

  it('evaluates preauth expiration risk and enforces agreed Document D05 cancellation cutoff', () => {
    // 1. Evaluate preauth expiration risk for appointment 21 days in future (> 7-day auth window)
    const riskCheck = evaluatePreauthExpirationRisk({
      appointmentStartTime: '2026-12-15T14:00:00.000Z',
      currentTime: '2026-11-20T14:00:00.000Z', // 25 days away
    });

    expect(riskCheck.isRisky).toBe(true);
    expect(riskCheck.recommendation).toContain('Card pre-authorizations automatically release');

    // 2. Record a captured deposit of $50 on a $200 service with Document D05 policy
    const deposit = recordBookingDeposit({
      tenantId,
      appointmentId,
      clientId,
      clientName: 'Hailey Bieber',
      type: 'captured_deposit',
      totalServicePriceCents: 20000,
      depositAmountCents: 5000,
      processorAuthId: 'ch_stripe_dep_50',
      policyId: 'pol_standard_24h',
      policyVersion: 2,
      cancellationCutoffHours: 24,
      currentTime: '2026-11-20T10:00:00.000Z',
    });

    expect(deposit.remainingBalanceCents).toBe(15000);
    expect(deposit.status).toBe('active_captured');
    expect(deposit.policyAcknowledgement.cancellationCutoffHours).toBe(24);

    // 3. Timely cancellation: Cancelled 48h before appointment -> Full refund
    const timelyCancellation = processDepositCancellation({
      deposit,
      appointmentStartTime: '2026-11-25T14:00:00.000Z',
      cancellationTime: '2026-11-23T10:00:00.000Z', // ~52 hours before
    });

    expect(timelyCancellation.outcome).toBe('refunded');
    expect(timelyCancellation.refundedAmountCents).toBe(5000);
    expect(timelyCancellation.feeRetainedCents).toBe(0);
    expect(timelyCancellation.updatedDeposit.status).toBe('refunded_timely_cancellation');

    // 4. Late cancellation: Cancelled 4h before appointment -> Forfeit deposit
    const lateCancellation = processDepositCancellation({
      deposit,
      appointmentStartTime: '2026-11-25T14:00:00.000Z',
      cancellationTime: '2026-11-25T10:00:00.000Z', // 4 hours before
    });

    expect(lateCancellation.outcome).toBe('forfeited');
    expect(lateCancellation.refundedAmountCents).toBe(0);
    expect(lateCancellation.feeRetainedCents).toBe(5000);
    expect(lateCancellation.updatedDeposit.status).toBe('forfeited_late_cancellation');
  });
});

describe('Posie Core Logic - F085 (Unified Checkout & Split Tender)', () => {
  const tenantId = 'tenant_posie_tribeca';

  it('combines services, taxable retail, tips, and executes split tender payments cleanly', () => {
    // 1. Build unified ticket: Hydra-Dew Facial ($120) + Retail Glow Serum ($40, taxable)
    const ticket = buildUnifiedCheckoutTicket({
      tenantId,
      clientId: 'cli_selena',
      clientName: 'Selena Gomez',
      items: [
        {
          type: 'service',
          name: 'Hydra-Dew Glass Glow Facial',
          unitPriceCents: 12000,
          isTaxable: false,
          specialistStaffId: 'staff_maya',
        },
        {
          type: 'retail_product',
          name: 'Hyaluronic Botanical Mist',
          unitPriceCents: 4000,
          quantity: 1,
          isTaxable: true,
        },
      ],
      salesTaxRate: 0.08875, // 8.875% tax on $40.00 = $3.55 (355 cents)
    });

    expect(ticket.subtotalCents).toBe(16000);
    expect(ticket.taxCents).toBe(355);
    expect(ticket.grossTotalDueCents).toBe(16355); // $163.55
    expect(ticket.status).toBe('open');

    // 2. Client adds a $25.00 tip for Maya on the hosted link
    const ticketWithTip = addTipToTicket(ticket, 2500);
    expect(ticketWithTip.tipCents).toBe(2500);
    expect(ticketWithTip.grossTotalDueCents).toBe(18855); // $188.55

    // 3. Split Tender Step 1: Client redeems $50.00 Birthday Gift Card
    const split1 = applySplitTenderPayment({
      ticket: ticketWithTip,
      method: 'gift_card',
      amountCents: 5000,
      referenceId: 'gift_bday_50',
    });

    expect(split1.isFullySettled).toBe(false);
    expect(split1.updatedTicket.status).toBe('partially_paid');
    expect(split1.updatedTicket.totalPaidCents).toBe(5000);
    expect(split1.updatedTicket.remainingBalanceDueCents).toBe(13855); // $138.55 remaining

    // 4. Split Tender Step 2: Client pays remaining $138.55 with Credit Card on hosted phone link
    const split2 = applySplitTenderPayment({
      ticket: split1.updatedTicket,
      method: 'credit_card',
      amountCents: 13855,
      referenceId: 'ch_stripe_card_final',
    });

    expect(split2.isFullySettled).toBe(true);
    expect(split2.updatedTicket.status).toBe('fully_paid');
    expect(split2.updatedTicket.remainingBalanceDueCents).toBe(0);
    expect(split2.updatedTicket.tenders.length).toBe(2);
  });
});

describe('Posie Core Logic - F086 (Tap to Pay and Certified Terminals)', () => {
  const tenantId = 'tenant_posie_flatiron';

  const onlineTerminal = {
    terminalId: 'term_wisepos_01',
    tenantId,
    name: 'Front Desk WisePOS E',
    type: 'smart_pos_terminal' as const,
    serialNumber: 'WP-9921-X',
    connectionState: 'online' as const,
    batteryPercentage: 92,
    firmwareVersion: 'v2.4.1',
    lastHeartbeatAt: '2026-11-20T12:00:00.000Z',
  };

  const offlineTerminal = {
    ...onlineTerminal,
    terminalId: 'term_iphone_tap_02',
    name: 'Floor Tap to Pay iPhone',
    type: 'tap_to_pay_iphone' as const,
    connectionState: 'offline' as const,
  };

  it('rejects payments on offline terminals and resolves interrupted transactions before retry', () => {
    // 1. Offline terminal rejection
    const offlineAttempt = initiateTerminalPayment({
      terminal: offlineTerminal,
      ticketId: 'tkt_test_101',
      amountCents: 12000,
    });
    expect(offlineAttempt.success).toBe(false);
    if (offlineAttempt.success) return;
    expect(offlineAttempt.reason).toContain('offline');

    // 2. Initiate session on online terminal
    const sessionResult = initiateTerminalPayment({
      terminal: onlineTerminal,
      ticketId: 'tkt_test_101',
      amountCents: 12000,
    });
    expect(sessionResult.success).toBe(true);
    if (!sessionResult.success) return;
    expect(sessionResult.session.status).toBe('awaiting_tap');

    // 3. Network drop mid-transaction -> session marked interrupted
    const interruptedSession = recordInterruptedTerminalTransaction(
      sessionResult.session,
      'Wi-Fi signal lost while card was communicating with reader'
    );
    expect(interruptedSession.status).toBe('interrupted_network_drop');
    expect(interruptedSession.requiresGatewayResolutionBeforeRetry).toBe(true);

    // 4. INVARIANT TEST: Gateway resolution queries actual processor state
    // Case A: Card charge succeeded on the backend -> finalize receipt, DO NOT re-charge card!
    const resolutionSuccess = resolveInterruptedTerminalPayment({
      session: interruptedSession,
      gatewayAuthoritativeState: {
        chargeExecutedOnCard: true,
        processorChargeId: 'ch_recovered_gateway_8899',
      },
    });

    expect(resolutionSuccess.actionRequired).toBe('finalize_receipt');
    expect(resolutionSuccess.updatedSession.status).toBe('resolved_successful_charge');
    expect(resolutionSuccess.updatedSession.processorChargeId).toBe('ch_recovered_gateway_8899');
    expect(resolutionSuccess.explanation).toContain('Card was NOT re-charged');

    // Case B: Card charge failed on the backend -> safe to retry
    const resolutionFailed = resolveInterruptedTerminalPayment({
      session: interruptedSession,
      gatewayAuthoritativeState: {
        chargeExecutedOnCard: false,
      },
    });

    expect(resolutionFailed.actionRequired).toBe('safe_to_retry_card');
    expect(resolutionFailed.updatedSession.status).toBe('resolved_failed_safe_to_retry');
    expect(resolutionFailed.explanation).toContain('safely re-tapped');
  });
});

describe('Posie Core Logic - F087 (Refunds & Exchanges)', () => {
  const tenantId = 'tenant_posie_chelsea';
  const originalPaymentId = 'pay_orig_1001';
  const ticketId = 'tkt_8811';
  const clientId = 'cli_kendall';

  it('reconciles eligible refund balances, blocks over-refunding, and manifests inventory restock', () => {
    // Original payment was $180 ($120 facial + $60 retail cream)
    const originalPaymentAmountCents = 18000;

    // 1. Initial refund check: full $180 eligible
    const initialBalance = calculateEligibleRefundBalance({
      originalPaymentAmountCents,
      existingRefunds: [],
    });
    expect(initialBalance.eligibleRefundCents).toBe(18000);
    expect(initialBalance.totalPreviouslyRefundedCents).toBe(0);

    // 2. Client returns retail cream ($60) due to mild skin sensitivity -> restock to inventory
    const retailRefund = processRefundAndExchange({
      tenantId,
      originalPaymentId,
      ticketId,
      originalPaymentAmountCents,
      existingRefunds: [],
      clientId,
      clientName: 'Kendall Jenner',
      lines: [
        {
          lineId: 'line_cream_1',
          type: 'retail_product',
          name: 'Nourishing Barrier Cream',
          originalAmountCents: 6000,
          refundAmountCents: 6000,
          restockInventory: true,
          restockQuantity: 1,
        },
      ],
      reason: 'medical_contraindication',
      reasonNotes: 'Client experienced mild redness; unopened second bottle returned to retail stock.',
      authorizedByStaffId: 'staff_maya_lead',
      authorizedByStaffName: 'Maya Lin',
    });

    expect(retailRefund.success).toBe(true);
    if (!retailRefund.success) return;
    expect(retailRefund.refund.totalRefundedCents).toBe(6000);
    expect(retailRefund.inventoryRestockManifest.length).toBe(1);
    expect(retailRefund.inventoryRestockManifest[0].quantityToRestock).toBe(1);

    // 3. INVARIANT TEST: Cannot refund more than remaining $120 balance
    const overRefundAttempt = processRefundAndExchange({
      tenantId,
      originalPaymentId,
      ticketId,
      originalPaymentAmountCents,
      existingRefunds: [retailRefund.refund],
      clientId,
      clientName: 'Kendall Jenner',
      lines: [
        {
          lineId: 'line_facial_1',
          type: 'service',
          name: 'Custom Bespoke Facial',
          originalAmountCents: 12000,
          refundAmountCents: 15000, // $150 > $120 remaining!
        },
      ],
      reason: 'client_dissatisfaction',
      reasonNotes: 'Attempting excess goodwill refund beyond ticket balance.',
      authorizedByStaffId: 'staff_maya_lead',
      authorizedByStaffName: 'Maya Lin',
    });

    expect(overRefundAttempt.success).toBe(false);
    if (overRefundAttempt.success) return;
    expect(overRefundAttempt.reason).toContain('Cannot refund $150.00. Only $120.00 is remaining');
  });
});

describe('Posie Core Logic - F088 (No-Show Collection Workflow)', () => {
  const tenantId = 'tenant_posie_tribeca';
  const appointmentId = 'apt_ns_test_44';
  const clientId = 'cli_bella';

  const policyEvidence = {
    policyVersion: 2,
    policyAcknowledgementId: 'ack_d05_8819',
    cancellationCutoffHours: 24,
    stipulatedFeeCents: 5000, // $50.00 no show fee
    acknowledgedTimestamp: '2026-11-10T10:00:00.000Z',
  };

  it('handles card-on-file declines honestly, generates recovery link, and supports manager waiver', () => {
    // 1. Successful charge scenario
    const successCase = executeNoShowFeeCollection({
      tenantId,
      appointmentId,
      clientId,
      clientName: 'Bella Hadid',
      clientPhone: '+1-212-555-9090',
      serviceName: 'Hydra-Dew Glass Glow Facial',
      scheduledStartTime: '2026-11-20T14:00:00.000Z',
      feeAmountCents: 5000,
      policyEvidence,
      cardSimulatedResult: {
        success: true,
        processorChargeId: 'ch_stripe_ns_collected_1',
      },
    });

    expect(successCase.status).toBe('fee_collected_successfully');
    expect(successCase.isClientProfileRestricted).toBe(false);

    // 2. Card Decline Invariant: A saved card is NOT guaranteed money!
    const declinedCase = executeNoShowFeeCollection({
      tenantId,
      appointmentId,
      clientId,
      clientName: 'Bella Hadid',
      clientPhone: '+1-212-555-9090',
      serviceName: 'Hydra-Dew Glass Glow Facial',
      scheduledStartTime: '2026-11-20T14:00:00.000Z',
      feeAmountCents: 5000,
      policyEvidence,
      cardSimulatedResult: {
        success: false,
        declineCode: 'card_declined_insufficient_funds',
      },
    });

    expect(declinedCase.status).toBe('card_declined_recovery_link_dispatched');
    expect(declinedCase.isClientProfileRestricted).toBe(true); // Restricts booking until cleared
    expect(declinedCase.recoveryLinkUrl).toBeDefined();

    // 3. Manager courtesy waiver (e.g. client called with hospital emergency)
    const waivedCase = waiveNoShowFee({
      caseRecord: declinedCase,
      waiveReason: 'Client had documented sudden hospital admission; waiving as emergency courtesy.',
      managerName: 'Maya Lin',
    });

    expect(waivedCase.status).toBe('fee_waived_by_manager');
    expect(waivedCase.isClientProfileRestricted).toBe(false); // Restrictions lifted
    expect(waivedCase.waiveReason).toContain('hospital admission');

    // 4. Client self-service settlement via recovery link
    const settledCase = settleNoShowRecoveryLink({
      caseRecord: declinedCase,
      paymentReferenceId: 'ch_settled_link_7722',
    });

    expect(settledCase.status).toBe('debt_settled_by_client');
    expect(settledCase.isClientProfileRestricted).toBe(false);
  });
});

describe('Posie Core Logic - F089 (Dispute Evidence Workspace)', () => {
  const tenantId = 'tenant_posie_soho';
  const disputeId = 'dp_chargeback_9921';

  it('compiles authoritative dispute defense packet and tracks response deadline urgency', () => {
    // 1. Compile defense packet uniting D05 policy, signed intake, treatment SOAP proof, D15 receipt, and SMS log
    const packet = compileDisputeDefensePacket({
      disputeId,
      tenantId,
      clientName: 'Olivia Rodrigo',
      chargeAmountCents: 14000, // $140.00
      disputeReasonCategory: 'service_not_provided_or_not_as_described',
      responseDeadline: '2026-11-28T23:59:59.000Z',
      policyAcknowledgement: {
        policyName: 'Standard Atelier Booking Policy D05',
        policyVersion: 2,
        acceptedAt: '2026-11-01T15:20:00.000Z',
        stipulatedCancellationTerms: 'Late cancellations forfeit deposit; completed services final upon departure.',
      },
      intakeAndConsent: {
        formName: 'Facial Aesthetics Treatment Consent',
        signedAt: '2026-11-15T13:55:00.000Z',
        signatureVerificationHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      },
      serviceDelivery: {
        serviceName: 'Signature Microcurrent Lift Facial',
        practitionerName: 'Chloe Bennett',
        completedAt: '2026-11-15T15:05:00.000Z',
        treatmentNoteSigned: true,
      },
      receipt: {
        receiptId: 'rcpt_8821_d15',
        transactionTimestamp: '2026-11-15T15:10:00.000Z',
        tenderMethod: 'Visa Ending in 4242',
        authorizedCardLast4: '4242',
      },
      communications: [
        {
          timestamp: '2026-11-14T10:00:00.000Z',
          direction: 'outbound_sms',
          messageSummary: 'Reminder: Your appointment is tomorrow at 2:00 PM.',
        },
        {
          timestamp: '2026-11-14T10:05:00.000Z',
          direction: 'inbound_sms',
          messageSummary: 'Client replied "C" to confirm.',
        },
      ],
    });

    expect(packet.status).toBe('drafting_evidence');
    expect(packet.legalDisclaimer).toContain('Truth-in-Defense Assurance');
    expect(packet.legalDisclaimer).toContain('does not guarantee dispute outcomes');

    // 2. Check deadline urgency: 3 days remaining (not urgent yet)
    const normalDeadline = checkDisputeDeadlineUrgency(
      '2026-11-28T23:59:59.000Z',
      '2026-11-25T12:00:00.000Z'
    );
    expect(normalDeadline.isUrgent).toBe(false);
    expect(normalDeadline.humanNotice).toContain('3 days');

    // 3. Urgent deadline: 24 hours remaining
    const urgentDeadline = checkDisputeDeadlineUrgency(
      '2026-11-28T23:59:59.000Z',
      '2026-11-27T23:59:59.000Z'
    );
    expect(urgentDeadline.isUrgent).toBe(true);
    expect(urgentDeadline.humanNotice).toContain('URGENT');
  });
});

describe('Posie Core Logic - F090 (Payout and Hold Tracker)', () => {
  const tenantId = 'tenant_posie_tribeca';

  it('distinguishes available from held funds and strictly verifies ACH settlement before confirmation', () => {
    // 1. Studio balance calculation with a $500 risk hold
    const balance = computeStudioBalanceState({
      tenantId,
      availableCents: 125000,   // $1,250.00 available
      pendingBatchCents: 45000,  // $450.00 pending 1-day batch
      reservedHoldCents: 50000,  // $500.00 held for verification
      activeRequirements: [
        {
          requirementId: 'req_id_verify_1',
          title: 'Owner Identity Verification',
          description: 'Upload valid state driver license or passport.',
          status: 'action_required',
          actionLink: 'posie.com/verify/owner',
        },
      ],
      recentPayouts: [],
    });

    expect(balance.availableCents).toBe(125000);
    expect(balance.totalUndepositedCents).toBe(220000); // $2,200.00
    expect(balance.explanationNotice).toContain('rolling risk reserve or pending processor verification');

    // 2. Initial predicted payout
    const payoutBatch = {
      payoutId: 'po_batch_8819',
      tenantId,
      payoutAmountCents: 125000,
      status: 'predicted_in_transit' as const,
      predictedArrivalDate: '2026-11-22',
      destinationBankLast4: '9012',
      initiatedAt: '2026-11-20T10:00:00.000Z',
    };

    // 3. Invariant: Cannot confirm settlement without valid ACH trace number
    expect(() => {
      transitionPayoutState({
        payout: payoutBatch,
        targetStatus: 'confirmed_bank_settlement',
        achTraceNumber: '', // Missing ACH trace!
      });
    }).toThrow('A valid bank ACH trace number is required');

    // 4. Confirmed bank settlement with valid ACH trace number
    const confirmedPayout = transitionPayoutState({
      payout: payoutBatch,
      targetStatus: 'confirmed_bank_settlement',
      achTraceNumber: 'ACH-20261122-889912',
      currentTime: '2026-11-22T08:30:00.000Z',
    });

    expect(confirmedPayout.status).toBe('confirmed_bank_settlement');
    expect(confirmedPayout.achTraceNumber).toBe('ACH-20261122-889912');
    expect(confirmedPayout.confirmedSettledTimestamp).toBeDefined();
  });
});

describe('Posie Core Logic - F091 (Gift Card Liability Ledger - Document D17)', () => {
  const tenantId = 'tenant_posie_soho';

  it('records deferred liability upon sale (zero earned revenue) and recognizes revenue only on redemption', () => {
    // 1. Sell $150 gift card
    const saleResult = issueGiftCardLiability({
      tenantId,
      purchasedValueCents: 15000, // $150.00
      purchaserName: 'Gwyneth Paltrow',
      purchaserEmail: 'gwyneth@goop.com',
      recipientName: 'Dakota Johnson',
      recipientEmail: 'dakota@example.com',
      personalMessage: 'Enjoy a relaxing glow afternoon!',
      validityYears: 5,
      currentTime: '2026-11-01T12:00:00.000Z',
    });

    // INVARIANT 1: Selling gift card = $0 earned service revenue! (Account 2100 Liability)
    expect(saleResult.card.remainingLiabilityBalanceCents).toBe(15000);
    expect(saleResult.card.recognizedEarnedRevenueCents).toBe(0);
    expect(saleResult.accountingClassification).toContain('Unearned Gift Card Liability');
    expect(saleResult.accountingClassification).toContain('$0.00 recognized as earned service revenue');
    expect(saleResult.card.maskedCode).toContain('GIFT-****-');

    // 2. Partial redemption: Dakota redeems $60 towards an express treatment
    const redemption1 = redeemGiftCardValue({
      card: saleResult.card,
      ticketId: 'tkt_dakota_1',
      amountToRedeemCents: 6000, // $60.00
      currentTime: '2026-11-15T14:00:00.000Z',
    });

    expect(redemption1.updatedCard.remainingLiabilityBalanceCents).toBe(9000); // $90.00 remaining
    expect(redemption1.updatedCard.recognizedEarnedRevenueCents).toBe(6000);   // $60.00 earned
    expect(redemption1.updatedCard.status).toBe('active');
    expect(redemption1.movement.recognizedEarnedRevenueCents).toBe(6000);

    // 3. Prevent over-redemption ($100 > $90 remaining)
    expect(() => {
      redeemGiftCardValue({
        card: redemption1.updatedCard,
        ticketId: 'tkt_dakota_2',
        amountToRedeemCents: 10000,
      });
    }).toThrow('exceeds remaining card balance');
  });
});

describe('Posie Core Logic - F092 (Package & Series Entitlements - Documents D13, D16)', () => {
  const tenantId = 'tenant_posie_flatiron';

  it('tracks session consumption and ensures partial refunds permanently revoke unconsumed units', () => {
    // 1. Client purchases 5-session HydraFacial package for $500 ($100/session)
    const series = issuePackageSeriesEntitlement({
      tenantId,
      clientId: 'cli_zendaya',
      clientName: 'Zendaya Coleman',
      seriesName: 'HydraFacial 5-Series Radiance Pass',
      eligibleServiceId: 'srv_hydra_facial',
      totalUnits: 5,
      totalPricePaidCents: 50000, // $500.00
      validityMonths: 12,
      currentTime: '2026-11-01T10:00:00.000Z',
    });

    expect(series.unitsRemaining).toBe(5);
    expect(series.unitsConsumed).toBe(0);
    expect(series.unitPriceCents).toBe(10000); // $100.00

    // 2. Consume 1st session
    const consumed1 = consumePackageSession({
      packageSeries: series,
      appointmentId: 'apt_zen_1',
      serviceName: 'HydraFacial Radiance',
      practitionerName: 'Maya Lin',
      currentTime: '2026-11-05T14:00:00.000Z',
    });
    expect(consumed1.unitsConsumed).toBe(1);
    expect(consumed1.unitsRemaining).toBe(4);

    // 3. Consume 2nd session
    const consumed2 = consumePackageSession({
      packageSeries: consumed1,
      appointmentId: 'apt_zen_2',
      serviceName: 'HydraFacial Radiance',
      practitionerName: 'Chloe Bennett',
      currentTime: '2026-11-12T14:00:00.000Z',
    });
    expect(consumed2.unitsConsumed).toBe(2);
    expect(consumed2.unitsRemaining).toBe(3);

    // 4. INVARIANT TEST: Client requests refund for remaining 3 sessions
    // Refund must refund exactly 3 x $100 = $300, AND set unitsRemaining to 0 so they cannot be reused!
    const refundResult = refundRemainingPackageSessions({
      packageSeries: consumed2,
      reason: 'Client relocated across country',
      currentTime: '2026-11-18T10:00:00.000Z',
    });

    expect(refundResult.refundedUnitsCount).toBe(3);
    expect(refundResult.refundAmountCents).toBe(30000); // $300.00
    expect(refundResult.updatedPackageSeries.unitsRemaining).toBe(0); // Revoked!
    expect(refundResult.updatedPackageSeries.status).toBe('partially_refunded_closed');
    expect(refundResult.auditNotice).toContain('The 2 previously consumed sessions remain permanently recognized');

    // Attempting to consume from refunded series throws error
    expect(() => {
      consumePackageSession({
        packageSeries: refundResult.updatedPackageSeries,
        appointmentId: 'apt_zen_3',
        serviceName: 'HydraFacial Radiance',
        practitionerName: 'Maya Lin',
      });
    }).toThrow('Package series is not active');
  });
});












