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
  enrollClientInMembership,
  previewMembershipCancellation,
  executeMembershipCancellation,
  pauseMembershipSubscription,
  handleRecurringPaymentFailure,
  allocateTipAcrossProviders,
  processTipRefundChoice,
  accrueLoyaltyPoints,
  reverseLoyaltyPointsForReturn,
  redeemLoyaltyPoints,
  createStoreProduct,
  reserveCartItems,
  releaseExpiredReservation,
  calculateOrderQuote,
  checkoutOnlineOrder,
  fulfillStoreOrder,
  refundAndRestockOrder,
  defineCommissionRule,
  calculateLineCommission,
  generateEarningsStatement,
  approveEarningsStatement,
  createForwardAdjustment,
  submitTimeOffRequest,
  generateConflictImpactReport,
  reassignConflictedBooking,
  markBookingForRescheduling,
  approveTimeOffRequest,
  rejectTimeOffRequest,
  validateChartOfAccountsMapping,
  buildSalesJournalEntry,
  createSyncBatch,
  executeAccountingSync,
  computeDocumentHash,
  createSignableDocument,
  issueDocumentForSignature,
  applyElectronicSignature,
  verifySignatureIntegrity,
  createAmendedDocument,
  assertChartAccessPrivilege,
  createChartDraft,
  updateChartDraft,
  signAndLockChart,
  appendChartAmendment,
  exportClientRecordTimeline,
  registerClinicalPhoto,
  addPhotoAnnotation,
  compareBeforeAndAfter,
  grantMediaPermissionD12,
  revokeMediaPermissionD12,
  findDuplicateCandidates,
  mergeClientProfiles,
  unmergeClientProfiles,
  getDefaultMappingRules,
  stageMigrationRecords,
  runMigrationRehearsal,
  executeLiveCutover,
  createInitialBrandTheme,
  stageBrandRevision,
  publishBrandRevision,
  issueBrandedDocument,
  verifyHistoricalArtifactIntegrity,
  rollbackBrandTheme,
  createVisitHubSession,
  completeHubIntake,
  completeHubConsentSignature,
  completeHubDepositPayment,
  completeHubSelfCheckout,
  getDefaultAutomationRecipes,
  rehearseAutomationRecipe,
  toggleAutomationPause,
  createInboxThread,
  sendOutboundMessage,
  receiveInboundMessage,
  updateMessageDeliveryStatus,
  saveMessageToClientTimeline,
  evaluateInboundCallRoute,
  handleInboundCallReceived,
  processInboundVoicemail,
  setCallRecordingState,
  recordCommunicationConsent,
  revokeMarketingConsent,
  evaluateMessageDispatchPermission,
  dispatchGovernedMessage,
  CANONICAL_METRIC_DICTIONARY,
  computeGovernedMetrics,
  generateRoleBasedDashboard,
  canViewStaffMetrics,
  analyzeRetentionCohort,
  identifyLapsedClientsByCadence,
  calculateServiceContribution,
  recordClientAcquisition,
  applyAttributionOverride,
  computeBookingFunnelAnalytics,
  evaluateSystemReliability,
  reconcileAmbiguousPayment,
  generateStudioExitArchive,
  verifyExitArchiveIntegrity,
  CORE_WORKDAY_PARITY_SPECS,
  auditWorkdayDeviceParity,
  executeUnifiedSearch,
  buildEmergencyDayViewCache,
  evaluateEmergencyDayView,
  queueOfflineAction,
  validateApiTokenScope,
  createWebhookEventPayload,
  calculateNextRetryDelaySeconds,
  convertToBaseUnit,
  computeBackbarUsageSummary,
  evaluateLotHealth,
  forecastStockDemand,
  evaluateServiceReadiness,
  evaluateBusinessAnomaly,
  evaluateRelationshipPrivileges,
  isMinorClient,
  createCareSummaryDraft,
  signAndApproveCareSummary,
  renderCareSummaryHtml,
  grantAssistedSupportSession,
  revokeAssistedSupportSession,
  maskResourceForSupport,
  generatePayrollExport,
  calculateCheckoutTaxes,
  generateTaxReceipt,
  compileIntegrationCenterOverview,
  DEFAULT_INTEGRATION_TEMPLATES,
  requestConsequentialChangeApproval,
  approveConsequentialChange,
  rejectConsequentialChange,
  evaluateSupportedPaymentMethods,
  rankWaitlistCandidatesForOpening,
  issueExclusiveWaitlistOffer,
  processOcrDocumentDraft,
  verifyOcrField,
  commitVerifiedOcrRecord,
  buildMobileAppConfig,
  establishClientMobileSession,
  compileConsolidatedEnterpriseReport,
  validateCrossLocationRedemption,
  calculateBoothRenterSplit,
  checkBoothRenterClientAccess,
  createEmbeddedPayrollRun,
  submitPayrollRunToPartner,
  recordPayrollCorrection,
  calculateTotalStatutoryDeductions,
  initOfflineOperationalQueue,
  queueOfflineOperationalAction,
  reconcileOfflineOperationalQueue,
  resolveOfflineOperationalConflict,
  generateScheduleOptimizationPlan,
  applyOptimizationSuggestion,
  timeToMinutes,
  minutesToTime,
  calculateMobileTravelFee,
  buildMobileRouteItinerary,
  evaluateTrafficDelayAlert,
  processReceptionistQuery,
  verifyCallerIdentity,
  initiateCrossChannelSession,
  switchSessionChannel,
  executeChannelBookingAction,
  evaluateScreenAssistantRequest,
  confirmAndExecuteAssistantAction,
  generateDictationNoteDraft,
  updateSoapSection,
  signAndFinalizeDictationNote,
  executeGovernedDataQuery,
  GOVERNED_METRIC_DEFINITIONS,
  generateDemandStaffingForecast,
  simulateWhatIfScenario,
  compareWhatIfScenarios,
  createGrowthExperiment,
  assignClientToExperiment,
  evaluateGrowthExperimentResults,
  simulateCancellationPolicyImpact,
  matchServicesToClientPreferences,
  generatePurchasingRecommendations,
  approvePurchaseOrderDraft,
  publishMarketplaceTemplate,
  adoptMarketplaceTemplate,
  checkTemplateUpdate,
  createCarePassportRecord,
  issueCarePassportGrant,
  revokeCarePassportGrant,
  accessCarePassport,
  initiateRelocationTransition,
  authorizeRelocationExport,
  generateLawfulDepartureNotice,
  createEncryptedBackupSnapshot,
  executeAutomatedRestoreDrill,
  auditAndPruneAccessTokens,
  configureEnterpriseSso,
  processScimProvisioningEvent,
  generateEnterpriseAuditExport,
  createClinicalChartDraft,
  signAndLockClinicalRecord,
  verifyGovernedClinicalAccess,
  amendClinicalRecord,
  type ClinicalSigner,
  registerStaffCredential,
  evaluateServiceEligibility,
  auditExpiringCredentials,
  type StaffCredentialProfile,
  type ServiceCredentialRequirement,
  recordDispensedProductWeighing,
  reconcileServiceColorCosting,
  syncDistributorCatalogFeed,
  type FormulaTargetSpec,
  type LocalInventorySku,
  createShiftCoverageRequest,
  acceptShiftCoverage,
  verifySubstituteAccessScope,
  type SubstituteCandidate,
  computeClientVisitCadence,
  rankReturnLikelihoodCandidates,
  type ClientHistoricalCandidate,
  calculateContrastRatio,
  generateBrandThemeSuggestion,
  publishBrandTheme,
  applyBrandVoiceWithFactualGuardrails,
  getCountryOperatingConfig,
  calculateLocalizedInvoiceTaxes,
  validateStatutoryInvoiceCompliance,
  createBridalEventWorkspace,
  recordStagedMilestonePayment,
  generateBridalDayOfPacket,
  simulateBulkChangePlan,
  commitBulkChangePlan,
  rollbackBulkChange,
  evaluateLateRunningImpact,
  approveAndDispatchArrivalUpdates,
  recordClientDelayResolution,
  type CatalogItem,
  type ActiveBookingItem,
  type DownstreamAppointment,
  createFacilityReservation,
  checkInFacilityRental,
  checkOutFacilityRental,
  type RenterEligibilityCredentials,
  type FacilityRentalListing,
  configureEmergencyHandoverPack,
  activateEmergencyHandover,
  verifyHandoverResourceAccess,
  generateActionProposalFromFinding,
  executeActionProposal,
  reportActionOutcomes,
  verifyPrescriberCredentials,
  createElectronicPrescription,
  transmitPrescriptionToPharmacy,
  type PrescriberCredentials,
  matchTelehealthClinician,
  conductTelehealthConsultation,
  escalateUrgentClinicalCase,
  type TelehealthClinician,
  createInsuranceClaim,
  reconcileClaimRemittance,
  assignClaimDenialAppeal,
  type InsurancePolicyDetails,
  type RemittanceAdvice835,
  toggleMarketplaceListing,
  evaluateBookingAttribution,
  fileAttributionDispute,
  generateWorkingCapitalOffer,
  acceptWorkingCapitalAdvance,
  settleDailyHoldbackDeduction,
  evaluateProtectionEligibility,
  fileProtectionClaim,
  adjudicateProtectionClaim,
  registerExternalSubstitute,
  matchExternalShiftCoverage,
  completeShiftAndReleaseEscrow,
  type ExternalShiftRequest,
  createPurchasingBatchOrder,
  allocateBatchFulfillment,
  type PurchasingBatchItem,
  type SalonOrderIntent,
  generatePeerBenchmarkReport,
  type SalonBenchmarkProfile,
  type BenchmarkCohortQuery,
  createVisualServicePreview,
  purgeSimulationRecordPerClient,
  type ClientSimulationConsent,
  type VisualSimulationParams,
  MANDATORY_PREVIEW_DISCLAIMER,
  evaluateClinicalImageGovernance,
  type ImageGovernanceContext,
  type ClinicalDiagnosticAttempt,
  evaluatePaymentHardwareStrategy,
  checkTerminalHealth,
  type CertifiedPartnerDevice,
  type ProprietaryHardwareProposal,
  evaluateBnplCheckoutEligibility,
  settleBnplBooking,
  processBnplRefund,
  type BnplInstallmentPlan,
  evaluateCardFeeOffset,
  type CardFeeEvaluationRequest,
  formatPartnerCatalogFeed,
  processNativePartnerBooking,
  type NativeCatalogFeedItem,
  type NativePartnerBookingRequest,
  calculateFlexiblePlanBilling,
  verifyConsumerCheckoutFeeIntegrity,
  type SalonPlanUsage,
  processSelfServiceSubscriptionExit,
  type SubscriptionExitRequest,
  analyzeSmsMessageText,
  executeSmsMarketingCampaign,
  type SmsCampaignDraft,
  type SmsRecipientProfile,
  recordLostDemandEntry,
  generateLostDemandReport,
  type LostDemandEntry,
  evaluateLeaveByConstraint,
  type LeaveByConstraintRequest,
  type ServiceStageBreakdown,
  findBudgetConstrainedOptions,
  type CuratedServiceOption,
  type ClientVisitConstraints,
  createAssistedNonSmartphoneBooking,
  attachWetSignedPaperScan,
  type NonSmartphoneBookingRecord,
  type PaperDocumentAttachment,
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

describe('Posie Core Logic - F093 (Membership Lifecycle - Document D16)', () => {
  const tenantId = 'tenant_posie_tribeca';
  const clientId = 'cli_emma';

  const glowPassTerms = {
    termsId: 'terms_glow_99',
    planName: 'Monthly Atelier Glow Pass',
    monthlyFeeCents: 9900, // $99.00 / month
    includedMonthlyCredits: 1,
    retailDiscountPercent: 15,
    cancellationNoticeDays: 0,
    rolloverCreditsAllowed: true,
    bankedCreditValidityMonths: 6,
  };

  it('enrolls client, previews cancellation impact transparently, and supports pausing and dunning', () => {
    // 1. Enroll client
    const subscription = enrollClientInMembership({
      tenantId,
      clientId,
      clientName: 'Emma Stone',
      clientEmail: 'emma@example.com',
      planId: 'plan_glow_99',
      terms: glowPassTerms,
      currentTime: '2026-11-01T10:00:00.000Z',
    });

    expect(subscription.status).toBe('active');
    expect(subscription.bankedCreditsCount).toBe(1);

    // 2. Cancellation Preview Invariant: Must preview future charges avoided and banked credits retention
    const preview = previewMembershipCancellation({
      subscription,
      currentTime: '2026-11-15T12:00:00.000Z',
    });

    expect(preview.bankedCreditsCount).toBe(1);
    expect(preview.futureChargesAvoidedCents).toBe(9900);
    expect(preview.summaryNotice).toContain('You have 1 banked treatment credit(s)');
    expect(preview.summaryNotice).toContain('No further monthly charges of $99.00');

    // 3. Pause membership for 60 days
    const paused = pauseMembershipSubscription({
      subscription,
      pauseDays: 60,
      currentTime: '2026-11-15T12:00:00.000Z',
    });

    expect(paused.status).toBe('paused');
    expect(paused.bankedCreditsCount).toBe(1); // Credits intact
    expect(paused.pausedUntilDate).toBeDefined();

    // 4. Payment failure enters grace period dunning
    const dunning = handleRecurringPaymentFailure({
      subscription,
      failureReason: 'card_expired',
    });

    expect(dunning.status).toBe('grace_period_dunning');
    expect(dunning.failedPaymentCount).toBe(1);
    expect(dunning.cardUpdateToken).toBeDefined();

    // 5. Execute cancellation
    const cancelled = executeMembershipCancellation({
      subscription,
      currentTime: '2026-11-20T10:00:00.000Z',
    });

    expect(cancelled.status).toBe('cancelled');
    expect(cancelled.cancelledAt).toBeDefined();
  });
});

describe('Posie Core Logic - F094 (Tipping Across Checkout Types & Provider Allocation)', () => {
  const tenantId = 'tenant_posie_soho';
  const ticketId = 'tkt_balayage_9912';

  it('allocates tips across specialists/assistants and supports distinct tip refund choices', () => {
    // 1. $40 tip split: 75% to Master Colorist Maya Lin, 25% to Shampoo Assistant Jen
    const allocation = allocateTipAcrossProviders({
      tenantId,
      ticketId,
      totalTipCents: 4000, // $40.00
      isZeroBalanceRedemptionVisit: true, // Client redeemed voucher but tipped on card
      recipients: [
        {
          staffId: 'staff_maya',
          staffName: 'Maya Lin',
          role: 'Master Colorist',
          percentage: 75,
        },
        {
          staffId: 'staff_jen',
          staffName: 'Jen Apprentice',
          role: 'Shampoo Assistant',
          percentage: 25,
        },
      ],
    });

    expect(allocation.recipients.length).toBe(2);
    expect(allocation.recipients[0].allocatedAmountCents).toBe(3000); // $30.00
    expect(allocation.recipients[1].allocatedAmountCents).toBe(1000); // $10.00
    expect(allocation.isZeroBalanceRedemptionVisit).toBe(true);

    // 2. Invariant Choice A: Retain tip for staff when service is refunded
    const choiceRetain = processTipRefundChoice({
      allocation,
      choice: 'retain_tip_for_staff',
    });
    expect(choiceRetain.clientRefundAmountCents).toBe(0);
    expect(choiceRetain.staffClawbackAmountCents).toBe(0);
    expect(choiceRetain.explanation).toContain('remains intact and paid to staff');

    // 3. Invariant Choice B: Clawback tip from staff
    const choiceClawback = processTipRefundChoice({
      allocation,
      choice: 'refund_tip_and_clawback_from_staff',
    });
    expect(choiceClawback.clientRefundAmountCents).toBe(4000);
    expect(choiceClawback.staffClawbackAmountCents).toBe(4000);
    expect(choiceClawback.explanation).toContain('reversed from staff payout ledger');

    // 4. Invariant Choice C: Studio absorbs tip as goodwill courtesy
    const choiceGoodwill = processTipRefundChoice({
      allocation,
      choice: 'salon_absorbed_as_goodwill',
    });
    expect(choiceGoodwill.clientRefundAmountCents).toBe(4000);
    expect(choiceGoodwill.staffClawbackAmountCents).toBe(0);
    expect(choiceGoodwill.salonExpenseCents).toBe(4000);
    expect(choiceGoodwill.explanation).toContain('salon absorbs the expense');
  });
});

describe('Posie Core Logic - F095 (Loyalty Balance Ledger & Rewards)', () => {
  const tenantId = 'tenant_posie_chelsea';
  const clientId = 'cli_ariana';

  const initialAccount = {
    accountId: 'loy_acc_ariana',
    tenantId,
    clientId,
    clientName: 'Ariana Grande',
    tier: 'bronze' as const,
    lifetimePointsEarned: 0,
    currentPointsBalance: 0,
    activeRuleVersion: 1,
    movements: [],
    createdAt: '2026-11-01T10:00:00.000Z',
    updatedAt: '2026-11-01T10:00:00.000Z',
  };

  const ruleV1 = {
    version: 1,
    pointsPerDollarSpent: 1, // 1 point per $1
    redemptionRatePointsPerDollar: 10, // 10 points = $1
    giftCardPurchasesEligible: false,
    effectiveDate: '2026-01-01',
  };

  it('accrues points, promotes tiers, executes clawbacks on returns, and prevents retroactive point erasure', () => {
    // 1. Client spends $300 on services (Ticket #101)
    const accrual1 = accrueLoyaltyPoints({
      account: initialAccount,
      ticketId: 'tkt_101',
      eligibleSpendCents: 30000, // $300.00
      rule: ruleV1,
      currentTime: '2026-11-05T12:00:00.000Z',
    });

    expect(accrual1.pointsEarned).toBe(300);
    expect(accrual1.updatedAccount.currentPointsBalance).toBe(300);
    expect(accrual1.updatedAccount.tier).toBe('silver'); // Promoted to silver (≥250 pts)

    // 2. Client spends another $250 (Ticket #102) -> promoted to rose_gold_vip (≥500 pts)
    const accrual2 = accrueLoyaltyPoints({
      account: accrual1.updatedAccount,
      ticketId: 'tkt_102',
      eligibleSpendCents: 25000, // $250.00
      rule: ruleV1,
      currentTime: '2026-11-10T12:00:00.000Z',
    });

    expect(accrual2.pointsEarned).toBe(250);
    expect(accrual2.updatedAccount.currentPointsBalance).toBe(550);
    expect(accrual2.updatedAccount.tier).toBe('rose_gold_vip');

    // 3. Return clawback: Client returns $50 retail item -> 50 points deducted cleanly
    const postReturn = reverseLoyaltyPointsForReturn({
      account: accrual2.updatedAccount,
      ticketId: 'tkt_102',
      pointsToReverse: 50,
      reason: 'Returned hair mask',
      currentTime: '2026-11-12T14:00:00.000Z',
    });

    expect(postReturn.currentPointsBalance).toBe(500);

    // 4. Client redeems 200 points for $20 discount
    const redemption = redeemLoyaltyPoints({
      account: postReturn,
      pointsToRedeem: 200,
      rule: ruleV1,
      ticketId: 'tkt_103',
      currentTime: '2026-11-15T10:00:00.000Z',
    });

    expect(redemption.discountAmountCents).toBe(2000); // $20.00 discount
    expect(redemption.updatedAccount.currentPointsBalance).toBe(300);

    // INVARIANT: Changing rule to Rule v2 (e.g. 0.5 points per $1) preserves existing points
    const ruleV2 = {
      version: 2,
      pointsPerDollarSpent: 0.5,
      redemptionRatePointsPerDollar: 10,
      giftCardPurchasesEligible: false,
      effectiveDate: '2026-12-01',
    };

    const accrualUnderV2 = accrueLoyaltyPoints({
      account: redemption.updatedAccount,
      ticketId: 'tkt_104',
      eligibleSpendCents: 10000, // $100 spent -> 50 points under v2
      rule: ruleV2,
      currentTime: '2026-12-02T10:00:00.000Z',
    });

    expect(accrualUnderV2.pointsEarned).toBe(50);
    expect(accrualUnderV2.updatedAccount.currentPointsBalance).toBe(350); // 300 historical + 50 new
  });
});

// F096: Online Retail Storefront & Unified Stock Ledger
describe('Posie Core Logic - F096 (Online Retail Storefront & Unified Stock Ledger)', () => {
  it('manages unified stock ledger, cart reservations, expiration release, checkout, and restock', () => {
      // 1. Setup products in unified stock ledger
      const cleanser = createStoreProduct({
        id: 'prod_cleanse',
        sku: 'CLN-001',
        name: 'Barrier Gentle Cleanser',
        category: 'skincare',
        price: 32.0,
        weightOz: 8,
        initialStock: 10,
      });

      const serum = createStoreProduct({
        id: 'prod_serum',
        sku: 'SRM-002',
        name: 'Glow Hyaluronic Serum',
        category: 'skincare',
        price: 48.0,
        weightOz: 4,
        initialStock: 4,
      });

      const products = new Map<string, typeof cleanser>();
      products.set(cleanser.id, cleanser);
      products.set(serum.id, serum);

      // 2. Reserve items during client online checkout session
      const { reservation, updatedProducts: pAfterReserve } = reserveCartItems({
        cartId: 'cart_123',
        items: [
          { productId: 'prod_cleanse', quantity: 2 },
          { productId: 'prod_serum', quantity: 1 },
        ],
        products,
        holdDurationMinutes: 15,
        currentTime: '2026-10-27T10:00:00.000Z',
      });

      expect(pAfterReserve.get('prod_cleanse')!.availableStock).toBe(8);
      expect(pAfterReserve.get('prod_cleanse')!.reservedStock).toBe(2);
      expect(pAfterReserve.get('prod_serum')!.availableStock).toBe(3);
      expect(pAfterReserve.get('prod_serum')!.reservedStock).toBe(1);

      // Oversell prevention
      expect(() => {
        reserveCartItems({
          cartId: 'cart_fail',
          items: [{ productId: 'prod_serum', quantity: 10 }],
          products: pAfterReserve,
        });
      }).toThrow(/Insufficient stock/);

      // 3. Expiration release test
      const expiredRelease = releaseExpiredReservation({
        reservation,
        products: pAfterReserve,
        currentTime: '2026-10-27T10:20:00.000Z', // 20 mins later (>15 mins)
      });
      expect(expiredRelease.released).toBe(true);
      expect(expiredRelease.updatedProducts.get('prod_cleanse')!.availableStock).toBe(10);
      expect(expiredRelease.updatedProducts.get('prod_cleanse')!.reservedStock).toBe(0);

      // 4. Re-reserve and calculate quote (Pickup vs Shipping)
      const { reservation: activeReservation, updatedProducts: pLive } = reserveCartItems({
        cartId: 'cart_456',
        items: [
          { productId: 'prod_cleanse', quantity: 1 }, // $32
          { productId: 'prod_serum', quantity: 1 }, // $48 = $80 total (qualifies for free shipping)
        ],
        products,
        currentTime: '2026-10-27T11:00:00.000Z',
      });

      const quote = calculateOrderQuote({
        items: activeReservation.items,
        fulfillmentMethod: 'shipping',
        storeTaxRate: 0.0825,
      });

      expect(quote.subtotal).toBe(80.0);
      expect(quote.shippingFee).toBe(0); // >= $75 free shipping
      expect(quote.shippingTier).toBe('free');
      expect(quote.taxAmount).toBe(6.6); // 80 * 0.0825 = 6.60
      expect(quote.totalAmount).toBe(86.6);

      // 5. Checkout online order
      const { order, updatedProducts: pAfterCheckout } = checkoutOnlineOrder({
        reservation: activeReservation,
        clientId: 'client_maya',
        clientName: 'Maya Angelou',
        clientEmail: 'maya@example.com',
        fulfillmentMethod: 'shipping',
        shippingAddress: {
          recipientName: 'Maya Angelou',
          street1: '123 Atelier Way',
          city: 'Beverly Hills',
          state: 'CA',
          postalCode: '90210',
          country: 'USA',
          phone: '310-555-0199',
        },
        paymentReference: 'ch_card_9931',
        quote,
        products: pLive,
        currentTime: '2026-10-27T11:05:00.000Z',
      });

      expect(order.status).toBe('paid_processing');
      // Invariant: Reserved stock cleared, available stock stays decremented
      expect(pAfterCheckout.get('prod_cleanse')!.reservedStock).toBe(0);
      expect(pAfterCheckout.get('prod_cleanse')!.availableStock).toBe(9);

      // 6. Fulfill order with shipping tracking
      const shippedOrder = fulfillStoreOrder({
        order,
        action: 'dispatch_shipping',
        trackingNumber: 'USPS9400111899223344',
        carrier: 'USPS Priority Mail',
      });
      expect(shippedOrder.status).toBe('shipped');
      expect(shippedOrder.trackingNumber).toBe('USPS9400111899223344');

      // 7. Refund and restock order
      const { order: refundedOrder, updatedProducts: pRestocked } = refundAndRestockOrder({
        order: shippedOrder,
        products: pAfterCheckout,
        reason: 'Customer requested cancellation prior to carrier scan',
      });

      expect(refundedOrder.status).toBe('cancelled_restocked');
      expect(refundedOrder.refundedAmount).toBe(86.6);
      // Invariant: Available stock cleanly incremented back in the unified ledger
      expect(pRestocked.get('prod_cleanse')!.availableStock).toBe(10);
      expect(pRestocked.get('prod_serum')!.availableStock).toBe(4);
    });
  });

  // F097: Commission Calculation & Staff Earnings Statements (Document D20)
  describe('Posie Core Logic - F097 (Commission Calculation - Document D20)', () => {
    it('applies tiered service and retail commission, locks approved statement, and generates forward adjustments', () => {
      // 1. Define tiered commission rule
      const rule = defineCommissionRule({
        ruleId: 'RULE-2026-V1',
        staffId: 'staff_sophia',
        effectiveFrom: '2026-01-01',
        serviceTiers: [
          { thresholdMin: 0, thresholdMax: 1000, ratePercentage: 45 },
          { thresholdMin: 1000, ratePercentage: 55 }, // 55% over $1,000 in service sales
        ],
        retailRatePercentage: 10, // 10% flat on retail sales
      });

      // 2. Generate live Document D20 statement
      const statement = generateEarningsStatement({
        statementId: 'STMT-OCT-2026-01',
        periodId: 'PAY-2026-10-B',
        staffId: 'staff_sophia',
        staffName: 'Sophia Loren',
        periodStartDate: '2026-10-16',
        periodEndDate: '2026-10-31',
        rule,
        tickets: [
          {
            ticketId: 'tkt_01',
            itemType: 'service',
            description: 'Hydra-Dew Facial',
            apportionedGross: 120.0,
            tipAmount: 25.0,
            performedAt: '2026-10-18T14:00:00Z',
          },
          {
            ticketId: 'tkt_02',
            itemType: 'service',
            description: 'Custom Chemical Peel',
            apportionedGross: 180.0,
            tipAmount: 35.0,
            performedAt: '2026-10-20T11:00:00Z',
          },
          {
            ticketId: 'tkt_03',
            itemType: 'retail',
            description: 'SPF 50 Glow Drops',
            apportionedGross: 50.0,
            tipAmount: 0,
            performedAt: '2026-10-20T11:30:00Z',
          },
        ],
      });

      expect(statement.status).toBe('estimated');
      expect(statement.summary.totalServiceGross).toBe(300.0);
      // Service commission at 45% (under $1,000 tier): 300 * 0.45 = $135.00
      expect(statement.summary.totalServiceCommission).toBe(135.0);
      // Retail commission at 10%: 50 * 0.10 = $5.00
      expect(statement.summary.totalRetailCommission).toBe(5.0);
      // Tips: 25 + 35 = $60.00
      expect(statement.summary.totalTips).toBe(60.0);
      // Total payable: 135 + 5 + 60 = $200.00
      expect(statement.summary.netPayableEarnings).toBe(200.0);

      // 3. Manager approves statement (locking historical record)
      const approved = approveEarningsStatement({
        statement,
        managerName: 'Audrey (Salon Director)',
      });
      expect(approved.status).toBe('manager_approved');
      expect(approved.approvedBy).toBe('Audrey (Salon Director)');

      // Invariant: Cannot re-approve an already approved statement
      expect(() => {
        approveEarningsStatement({
          statement: approved,
          managerName: 'Audrey (Salon Director)',
        });
      }).toThrow(/already manager_approved/);

      // 4. Forward Adjustment: A client receives a redo refund on tkt_01 ($120 facial)
      // Invariant: Never alters historical approved statement; creates linked forward adjustment
      const forwardAdj = createForwardAdjustment({
        originalStatement: approved,
        refundedTicketId: 'tkt_01',
        clawbackAmount: 54.0, // 45% of $120 = $54 commission clawback
        reason: 'Post-payroll redo refund approved for sensitive skin client reaction',
        managerName: 'Audrey (Salon Director)',
      });

      expect(forwardAdj.adjustmentAmount).toBe(-54.0);
      expect(forwardAdj.originalPeriodId).toBe('PAY-2026-10-B');

      // Next pay period includes forward adjustment
      const nextStatement = generateEarningsStatement({
        statementId: 'STMT-NOV-2026-01',
        periodId: 'PAY-2026-11-A',
        staffId: 'staff_sophia',
        staffName: 'Sophia Loren',
        periodStartDate: '2026-11-01',
        periodEndDate: '2026-11-15',
        rule,
        tickets: [
          {
            ticketId: 'tkt_04',
            itemType: 'service',
            description: 'Dermaplaning Deluxe',
            apportionedGross: 150.0,
            tipAmount: 30.0,
            performedAt: '2026-11-02T10:00:00Z',
          },
        ],
        priorPeriodAdjustments: [forwardAdj],
      });

      // 150 * 0.45 = 67.50 service commission + 30 tip - 54 clawback = $43.50 net
      expect(nextStatement.summary.totalServiceCommission).toBe(67.5);
      expect(nextStatement.summary.totalAdjustments).toBe(-54.0);
      expect(nextStatement.summary.netPayableEarnings).toBe(43.5);
    });
  });

  // F098: Time Off & Coverage Planning
  describe('Posie Core Logic - F098 (Time Off & Coverage Planning)', () => {
    it('detects booking conflicts, prevents unassigned approvals, matches certified coverage, and locks calendar', () => {
      // 1. Submit time off request
      const request = submitTimeOffRequest({
        requestId: 'REQ-PTO-01',
        staffId: 'staff_maya',
        staffName: 'Maya (Lead Esthetician)',
        category: 'vacation',
        startDate: '2026-11-10T00:00:00Z',
        endDate: '2026-11-12T23:59:59Z',
        totalDays: 3,
        isPaid: true,
        notes: 'Annual wellness retreat',
      });

      expect(request.status).toBe('submitted');

      // 2. Existing studio bookings during that window
      const existingBookings = [
        {
          bookingId: 'bk_101',
          staffId: 'staff_maya',
          clientName: 'Chloe Bennett',
          clientPhone: '310-555-4422',
          serviceId: 'srv_facial',
          serviceName: 'Hydra-Dew Glass Facial',
          startTime: '2026-11-10T14:00:00Z',
          endTime: '2026-11-10T15:00:00Z',
          price: 120.0,
          depositPaid: 50.0,
        },
        {
          bookingId: 'bk_102',
          staffId: 'staff_maya',
          clientName: 'Hailey Bieber',
          clientPhone: '310-555-7788',
          serviceId: 'srv_peel',
          serviceName: 'Radiance Chemical Peel',
          startTime: '2026-11-11T11:00:00Z',
          endTime: '2026-11-11T12:00:00Z',
          price: 180.0,
          depositPaid: 50.0,
        },
      ];

      // 3. Generate conflict impact report
      const impactReport = generateConflictImpactReport({
        request,
        existingBookings,
      });

      expect(impactReport.totalConflictingBookings).toBe(2);
      expect(impactReport.totalRevenueAtRisk).toBe(300.0);
      expect(impactReport.hasUnresolvedCommitments).toBe(true);

      // Invariant: Cannot approve time off while appointments are unassigned
      expect(() => {
        approveTimeOffRequest({
          request,
          impactReport,
          managerName: 'Audrey (Owner)',
        });
      }).toThrow(/Cannot approve time off: 2 client appointment\(s\) have not been resolved/);

      // 4. Resolve Conflict 1: Reassign to qualified coverage provider
      const qualifiedReplacement = {
        staffId: 'staff_jen',
        name: 'Jen (Licensed Esthetician)',
        qualifiedServiceIds: ['srv_facial', 'srv_peel'],
        isAvailableOnDate: (d: string) => d.startsWith('2026-11-10'),
      };

      const resolvedBooking1 = reassignConflictedBooking({
        booking: impactReport.conflictingBookings[0],
        replacementProvider: qualifiedReplacement,
      });
      expect(resolvedBooking1.coverageStatus).toBe('coverage_assigned');
      expect(resolvedBooking1.reassignedStaffName).toBe('Jen (Licensed Esthetician)');

      // Invariant: Unqualified replacement attempt rejected
      const unqualifiedProvider = {
        staffId: 'staff_tom',
        name: 'Tom (Lash Stylist)',
        qualifiedServiceIds: ['srv_lashes'], // does not do chemical peels
        isAvailableOnDate: () => true,
      };
      expect(() => {
        reassignConflictedBooking({
          booking: impactReport.conflictingBookings[1],
          replacementProvider: unqualifiedProvider,
        });
      }).toThrow(/not certified\/qualified/);

      // 5. Resolve Conflict 2: Mark for proactive client rescheduling outreach
      const resolvedBooking2 = markBookingForRescheduling(impactReport.conflictingBookings[1]);
      expect(resolvedBooking2.coverageStatus).toBe('reschedule_required');

      // 6. Approve time off with all client commitments resolved
      const resolvedReport = {
        ...impactReport,
        conflictingBookings: [resolvedBooking1, resolvedBooking2],
        hasUnresolvedCommitments: false,
      };

      const { request: approvedRequest, calendarBlocked } = approveTimeOffRequest({
        request,
        impactReport: resolvedReport,
        managerName: 'Audrey (Owner)',
        notes: 'Coverage coordinated with Jen; client Hailey queued for VIP reschedule call',
      });

      expect(approvedRequest.status).toBe('approved');
      expect(calendarBlocked).toBe(true);
      expect(approvedRequest.reviewedBy).toBe('Audrey (Owner)');
    });
  });

  // F099: Accounting Integration & Reconciled Journal Sync
  describe('Posie Core Logic - F099 (Accounting Integration & Reconciled Journal Sync)', () => {
    const qboMapping = {
      platform: 'quickbooks_online' as const,
      serviceRevenueAccount: '4000 - Service Sales',
      retailRevenueAccount: '4100 - Retail Boutique Sales',
      giftCardLiabilityAccount: '2100 - Deferred Revenue / Gift Cards',
      salesTaxPayableAccount: '2200 - Sales Tax Payable',
      tipsPayableAccount: '2300 - Gratuities / Tips Payable',
      processingFeeExpenseAccount: '6050 - Merchant Processing Fees',
      clearingDepositAccount: '1050 - Undeposited Clearing Funds',
    };

    it('validates account mappings and enforces double-entry balancing across revenues, liabilities, and clearing', () => {
      // 1. Validation check
      expect(validateChartOfAccountsMapping(qboMapping)).toBe(true);

      expect(() => {
        validateChartOfAccountsMapping({
          ...qboMapping,
          clearingDepositAccount: '',
        });
      }).toThrow(/missing required account for: clearingDepositAccount/);

      // 2. Build balanced sales journal entry
      const entry = buildSalesJournalEntry({
        idempotencyKey: 'IDEMP-2026-10-27-DAILY',
        transactionDate: '2026-10-27',
        reference: 'DAILY-SALES-BATCH-1027',
        serviceRevenue: 200.0,
        retailRevenue: 50.0,
        giftCardLiabilitySold: 50.0, // Deferred revenue liability
        salesTax: 20.63,
        tips: 40.0,
        processingFee: 10.45,
        mapping: qboMapping,
      });

      // Total credits: 200 + 50 + 50 + 20.63 + 40 = $360.63
      // Total debits: 10.45 fee + 350.18 clearing deposit = $360.63
      expect(entry.totalCredit).toBe(360.63);
      expect(entry.totalDebit).toBe(360.63);
      expect(entry.isBalanced).toBe(true);

      // 3. Create sync batch and execute sync
      const batch = createSyncBatch({
        batchId: 'BATCH-SYNC-001',
        platform: 'quickbooks_online',
        journalEntries: [entry],
        idempotencyKey: 'IDEMP-2026-10-27-DAILY',
      });

      expect(batch.status).toBe('pending');

      const { batch: syncedBatch, duplicatePrevented: firstSyncDup } = executeAccountingSync({
        batch,
      });

      expect(firstSyncDup).toBe(false);
      expect(syncedBatch.status).toBe('synced');
      expect(syncedBatch.externalReferenceId).toMatch(/^QBO-JE-\d+/);

      // 4. Invariant: Idempotent re-sync prevents duplicate journal entries
      const { batch: retryBatch, duplicatePrevented } = executeAccountingSync({
        batch: syncedBatch,
      });

      expect(duplicatePrevented).toBe(true);
      expect(retryBatch.externalReferenceId).toBe(syncedBatch.externalReferenceId);

      // 5. Handles API gateway failures and tracks retry count
      const failedSync = executeAccountingSync({
        batch,
        mockExternalSystemFailure: true,
      });

      expect(failedSync.batch.status).toBe('failed');
      expect(failedSync.batch.retryCount).toBe(1);
      expect(failedSync.batch.lastErrorMessage).toContain('API timeout');
    });
  });

  // F100: Versioned Electronic Signatures & Cryptographic Evidence Record
  describe('Posie Core Logic - F100 (Versioned Electronic Signatures - Rules BR05, DR04, DR05, DR10)', () => {
    it('cryptographically binds signatures to document text, enforces payment separation, and locks amended versions', () => {
      // 1. Create signable document draft
      const documentText =
        'TREATMENT CONSENT & ARBITRATION AGREEMENT v1.0\nClient agrees to patch test protocols and informs practitioner of active retinoid use. Posie Atelier reserves right to postpone service if skin barrier is impaired.';

      const docDraft = createSignableDocument({
        documentId: 'DOC-CONSENT-991',
        documentType: 'service_consent',
        title: 'Chemical Peel & Exfoliation Consent',
        content: documentText,
        version: 1,
      });

      expect(docDraft.status).toBe('draft');
      expect(docDraft.documentHash).toBe(computeDocumentHash(documentText));

      // 2. Issue document for signature
      const issuedDoc = issueDocumentForSignature(docDraft);
      expect(issuedDoc.status).toBe('issued_awaiting_signature');

      // 3. Invariant DR05: Consent and payment are separate actions
      // Signing without acknowledging payment separation MUST fail
      expect(() => {
        applyElectronicSignature({
          document: issuedDoc,
          signer: {
            name: 'Zendaya Coleman',
            email: 'zendaya@example.com',
            role: 'client',
          },
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
          signatureType: 'drawn',
          signatureData: 'M10 20 Q 30 50 80 20 T 120 40',
          consentAcknowledgementText:
            'I have read and agree to all treatment terms and contraindications.',
          acknowledgedSeparationOfPayment: false, // Invariant DR05 test
        });
      }).toThrow(/Invariant DR05 Violation/);

      // 4. Apply lawful electronic signature with evidence record
      const signedDoc = applyElectronicSignature({
        document: issuedDoc,
        signer: {
          name: 'Zendaya Coleman',
          email: 'zendaya@example.com',
          phone: '310-555-9011',
          role: 'client',
        },
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
        signatureType: 'drawn',
        signatureData: 'M10 20 Q 30 50 80 20 T 120 40',
        consentAcknowledgementText:
          'I have read and agree to all treatment terms and contraindications.',
        acknowledgedSeparationOfPayment: true,
        currentTime: '2026-10-27T14:30:00.000Z',
      });

      expect(signedDoc.status).toBe('signed_completed');
      expect(signedDoc.signatureEvidence).toBeDefined();
      expect(signedDoc.signatureEvidence!.signer.name).toBe('Zendaya Coleman');
      expect(signedDoc.signatureEvidence!.documentHash).toBe(signedDoc.documentHash);

      // 5. Verify signature integrity
      const verification = verifySignatureIntegrity(signedDoc);
      expect(verification.isValid).toBe(true);

      // 6. Tamper Detection: Changing a single character in content invalidates the hash
      const tamperedDoc = {
        ...signedDoc,
        content: documentText + ' [Unapproved stealth modification]',
      };
      const tamperCheck = verifySignatureIntegrity(tamperedDoc);
      expect(tamperCheck.isValid).toBe(false);
      expect(tamperCheck.error).toContain('Content Tamper detected');

      // 7. Invariant DR04: Amending a document supersedes the original and preserves historical artifact
      const { supersededDocument, newVersionDraft } = createAmendedDocument({
        signedDocument: signedDoc,
        newContent:
          documentText + '\nAMENDMENT 1: Client advised to discontinue AHA/BHA 7 days prior.',
        amendmentReason: 'Added high-percentage AHA precaution guidance',
        newDocumentId: 'DOC-CONSENT-992',
      });

      // Original document is superseded, historical signature intact
      expect(supersededDocument.status).toBe('superseded');
      expect(supersededDocument.supersededByDocumentId).toBe('DOC-CONSENT-992');
      expect(supersededDocument.signatureEvidence!.signer.name).toBe('Zendaya Coleman');

      // New draft is version 2, draft status, awaiting new signature
      expect(newVersionDraft.version).toBe(2);
      expect(newVersionDraft.status).toBe('draft');
      expect(newVersionDraft.documentId).toBe('DOC-CONSENT-992');
      expect(newVersionDraft.signatureEvidence).toBeUndefined();
    });
  });

  // F101: Private Records and Chart Amendments (Rules DR04, DR07, D08)
  describe('Posie Core Logic - F101 (Private Records and Chart Amendments - Rules DR04, DR07, D08)', () => {
    it('enforces role-based privacy, locks signed notes, and preserves original entries on amendment', () => {
      // 1. Invariant DR07: Front-desk and marketing staff cannot access clinical charts
      expect(() => {
        assertChartAccessPrivilege('marketing');
      }).toThrow(/Access Denied \(Rule DR07\)/);

      expect(() => {
        assertChartAccessPrivilege('front_desk');
      }).toThrow(/Access Denied \(Rule DR07\)/);

      expect(assertChartAccessPrivilege('practitioner')).toBe(true);

      // 2. Create draft treatment chart
      const chartDraft = createChartDraft({
        chartId: 'CHART-2026-001',
        clientId: 'client_zendaya',
        clientName: 'Zendaya Coleman',
        practitionerId: 'staff_maya',
        practitionerName: 'Maya Lin',
        serviceId: 'srv_peel',
        serviceName: 'Clinical Radiance Chemical Peel',
        visitDate: '2026-10-27',
        soap: {
          subjective: 'Client reports mild dryness around nasal folds.',
          objective: 'Fitzpatrick type IV; intact stratum corneum; no active dermatitis.',
          assessment: 'Tolerates 20% lactic acid fruit enzyme prep well.',
          plan: 'Maintain barrier gentle cleanser; apply SPF 50 daily; return in 4 weeks.',
          productsUsed: [{ name: 'Lactic 20% Solution', lotNumber: 'LOT-9921', durationMinutes: 5 }],
        },
      });

      expect(chartDraft.status).toBe('draft');
      // 7-year statutory retention calculation
      expect(chartDraft.retentionUntilDate).toBe('2033-10-27');

      // 3. Draft update is permitted
      const updatedDraft = updateChartDraft({
        chart: chartDraft,
        updatedSoap: {
          objective: 'Fitzpatrick IV; intact barrier; mild T-zone congestion resolved with enzyme.',
        },
      });
      expect(updatedDraft.soap.objective).toContain('mild T-zone congestion');

      // 4. Sign and lock chart note
      const signedChart = signAndLockChart({
        chart: updatedDraft,
        practitionerName: 'Maya Lin, Lead Esthetician',
      });
      expect(signedChart.status).toBe('signed_locked');
      expect(signedChart.signedBy).toBe('Maya Lin, Lead Esthetician');

      // Invariant: Direct edits to signed chart are rejected
      expect(() => {
        updateChartDraft({
          chart: signedChart,
          updatedSoap: { subjective: 'Tampered note text' },
        });
      }).toThrow(/Cannot directly edit chart/);

      // 5. Append amendment (Rule DR04): preserves original signed entry
      const amendedChart = appendChartAmendment({
        chart: signedChart,
        authorId: 'staff_maya',
        authorName: 'Maya Lin',
        authorRole: 'practitioner',
        reason: 'Late entry: Client phoned 2h post-treatment regarding mild flush on cheek apex',
        content: 'Advised client to apply chilled ceramide compress; erythema resolved in 20 mins.',
      });

      expect(amendedChart.status).toBe('amended');
      expect(amendedChart.amendments.length).toBe(1);
      expect(amendedChart.amendments[0].reason).toContain('Late entry');
      // Original SOAP content is 100% preserved
      expect(amendedChart.soap.subjective).toBe(signedChart.soap.subjective);

      // 6. Client record export compilation
      const recordExport = exportClientRecordTimeline({
        charts: [amendedChart],
        requestingParty: 'client',
      });

      expect(recordExport.totalRecords).toBe(1);
      expect(recordExport.records[0].integrityVerified).toBe(true);
      expect(recordExport.records[0].amendments.length).toBe(1);
    });
  });

  // F102: Standardized Before and After Photos (Document D12, Rules F039, F064)
  describe('Posie Core Logic - F102 (Standardized Before and After Photos - Document D12)', () => {
    it('guides capture angles, discloses lighting differences, and firewalls internal vs marketing media', () => {
      // 1. Register Before and After photos with raw digest
      const beforePhoto = registerClinicalPhoto({
        photoId: 'PH-BEFORE-01',
        clientId: 'client_zendaya',
        serviceId: 'srv_peel',
        phase: 'before',
        rawMediaUri: 'file:///secure/photos/zendaya_before_raw.jpg',
        rawMediaContent: 'RAW_IMAGE_BYTES_BEFORE_12345',
        metadata: {
          angle: 'frontal',
          distanceInches: 18,
          lightingKelvin: 3200, // Warm incandescent
          deviceModel: 'iPad Pro 11-inch',
          capturedAt: '2026-10-27T14:00:00Z',
        },
      });

      const afterPhoto = registerClinicalPhoto({
        photoId: 'PH-AFTER-01',
        clientId: 'client_zendaya',
        serviceId: 'srv_peel',
        phase: 'after',
        rawMediaUri: 'file:///secure/photos/zendaya_after_raw.jpg',
        rawMediaContent: 'RAW_IMAGE_BYTES_AFTER_67890',
        metadata: {
          angle: 'frontal',
          distanceInches: 18,
          lightingKelvin: 5000, // Cool daylight (>500K delta)
          deviceModel: 'iPad Pro 11-inch',
          capturedAt: '2026-10-27T15:15:00Z',
        },
      });

      expect(beforePhoto.isRawOriginalPreserved).toBe(true);

      // 2. Add non-destructive annotation (F039)
      const annotatedBefore = addPhotoAnnotation({
        photo: beforePhoto,
        annotation: {
          annotationId: 'ANN-01',
          type: 'peel_depth_boundary',
          coordinates: [
            { x: 100, y: 150 },
            { x: 200, y: 150 },
          ],
          note: 'Target zone for 20% lactic solution',
        },
      });
      // Raw hash remains unchanged
      expect(annotatedBefore.rawMediaSha256).toBe(beforePhoto.rawMediaSha256);
      expect(annotatedBefore.annotations.length).toBe(1);

      // 3. Document D12 Permission: Tier 1 (Internal) vs Tier 2 (Public Marketing)
      const permission = grantMediaPermissionD12({
        permissionId: 'PERM-D12-991',
        clientId: 'client_zendaya',
        publicMarketingAllowed: true,
        allowedChannels: ['instagram', 'website_case_study'],
      });

      // 4. Comparison analysis: detects lighting delta and discloses difference
      const comparison = compareBeforeAndAfter({
        beforePhoto,
        afterPhoto,
        permission,
      });

      expect(comparison.angleMatched).toBe(true);
      // Invariant: Discloses >500K lighting delta
      expect(comparison.differingConditionsDisclosed).toBe(true);
      expect(comparison.disclosureNotes).toContain('Lighting disparity: Before photo was captured at 3200K vs After at 5000K');
      expect(comparison.marketingEligible).toBe(true);

      // 5. Revoking marketing permission instantly blocks public marketing eligibility
      const revokedPerm = revokeMediaPermissionD12({
        permission,
        reason: 'Client requested withdrawal of social media image sharing',
      });

      expect(revokedPerm.publicMarketingAllowed).toBe(false);
      expect(revokedPerm.internalClinicalAllowed).toBe(true); // Internal progress remains accessible

      const postRevocationComparison = compareBeforeAndAfter({
        beforePhoto,
        afterPhoto,
        permission: revokedPerm,
      });

      expect(postRevocationComparison.marketingEligible).toBe(false);
    });
  });

  // F103: Client Deduplication & Reversible Merge
  describe('Posie Core Logic - F103 (Client Deduplication & Reversible Merge)', () => {
    it('proposes duplicate candidates, protects shared phones, and performs reversible merges', () => {
      const clientA = {
        id: 'cli_01',
        firstName: 'Zendaya',
        lastName: 'Coleman',
        email: 'zendaya@example.com',
        phone: '310-555-0199',
        loyaltyPoints: 300,
        visitHistoryCount: 5,
        activePackagePassIds: ['pass_1'],
        treatmentChartIds: ['chart_1'],
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      };

      const clientB = {
        id: 'cli_02',
        firstName: 'Zendaya M',
        lastName: 'Coleman',
        email: 'zendaya@example.com', // exact email match
        phone: '310-555-0199',
        loyaltyPoints: 150,
        visitHistoryCount: 2,
        activePackagePassIds: ['pass_2'],
        treatmentChartIds: ['chart_2'],
        createdAt: '2025-06-01T00:00:00Z',
        updatedAt: '2025-06-01T00:00:00Z',
      };

      const householdMember = {
        id: 'cli_03',
        firstName: 'Kazembe',
        lastName: 'Coleman',
        phone: '310-555-0199', // same phone, different first name
        loyaltyPoints: 50,
        visitHistoryCount: 1,
        activePackagePassIds: [],
        treatmentChartIds: [],
        createdAt: '2025-08-01T00:00:00Z',
        updatedAt: '2025-08-01T00:00:00Z',
      };

      // 1. Detect probable duplicates
      const dupCandidates = findDuplicateCandidates({
        targetClient: clientB,
        existingClients: [clientA],
      });

      expect(dupCandidates.length).toBe(1);
      expect(dupCandidates[0].confidenceScore).toBeGreaterThanOrEqual(80);
      expect(dupCandidates[0].recommendation).toBe('merge_review');

      // 2. Invariant: Same phone with distinct names flags as shared household contact, NOT a merge candidate
      const householdCandidates = findDuplicateCandidates({
        targetClient: householdMember,
        existingClients: [clientA],
      });

      expect(householdCandidates[0].hasConflictingPhoneIdentity).toBe(true);
      expect(householdCandidates[0].recommendation).toBe('shared_household_flag');

      // Attempting to merge distinct household members without explicit name override throws error
      expect(() => {
        mergeClientProfiles({
          masterClient: clientA,
          duplicateClient: householdMember,
          performedBy: 'Audrey (Director)',
        });
      }).toThrow(/Invariant Protected: Cannot merge clients sharing phone/);

      // 3. Perform valid merge
      const { masterClient: mergedMaster, duplicateClient: mergedDup, mergeLog } =
        mergeClientProfiles({
          masterClient: clientA,
          duplicateClient: clientB,
          performedBy: 'Audrey (Director)',
        });

      // Consolidated attributes
      expect(mergedMaster.loyaltyPoints).toBe(450); // 300 + 150
      expect(mergedMaster.visitHistoryCount).toBe(7); // 5 + 2
      expect(mergedMaster.activePackagePassIds).toEqual(['pass_1', 'pass_2']);
      expect(mergedMaster.treatmentChartIds).toEqual(['chart_1', 'chart_2']);
      expect(mergedDup.isMerged).toBe(true);
      expect(mergedDup.mergedIntoId).toBe('cli_01');

      // 4. Invariant: Reversible unmerge restores both original records exactly
      const { restoredMaster, restoredDuplicate } = unmergeClientProfiles(mergeLog);
      expect(restoredMaster.loyaltyPoints).toBe(300);
      expect(restoredMaster.visitHistoryCount).toBe(5);
      expect(restoredDuplicate.isMerged).toBe(false);
      expect(restoredDuplicate.loyaltyPoints).toBe(150);
    });
  });

  // F104: Historical Migration Mapping & Provenance Archive
  describe('Posie Core Logic - F104 (Historical Migration Mapping & Provenance Archive)', () => {
    it('maps legacy platform columns, preserves unsupported fields in provenance archive, and flags anomalies', () => {
      const mappingRules = getDefaultMappingRules('glossgenius');

      const rawRows = [
        {
          'First Name': 'Hailey',
          'Last Name': 'Bieber',
          'Client Phone': '310-555-7788',
          'Client Email': 'hailey@example.com',
          'Gift Card Balance': '$150.00',
          'Legacy Custom Hair Formula 2021': 'Formula: 9N + 20 Vol Glaze', // Unsupported field
        },
        {
          'First Name': '',
          'Last Name': '',
          'Client Phone': '310-555-0000',
          'Gift Card Balance': '-$25.00', // Anomaly: Negative balance
        },
      ];

      const batch = stageMigrationRecords({
        batchId: 'BATCH-GG-01',
        sourcePlatform: 'glossgenius',
        mappingRules,
        rawRows,
      });

      expect(batch.totalRows).toBe(2);
      expect(batch.validRowsCount).toBe(1);
      expect(batch.errorRowsCount).toBe(1);

      const validClient = batch.stagedClients[0];
      expect(validClient.firstName).toBe('Hailey');
      expect(validClient.giftCardBalance).toBe(150.0);
      // Invariant: Unsupported legacy field preserved in provenanceArchive
      expect(validClient.provenanceArchive.length).toBe(1);
      expect(validClient.provenanceArchive[0].sourceColumn).toBe('Legacy Custom Hair Formula 2021');
      expect(validClient.provenanceArchive[0].rawValue).toContain('Formula: 9N');

      const corruptedClient = batch.stagedClients[1];
      expect(corruptedClient.validationStatus).toBe('error');
      expect(corruptedClient.validationErrors).toContain('Negative gift card balance (-25) detected.');
    });
  });

  // F105: Migration Rehearsal & Live Cutover
  describe('Posie Core Logic - F105 (Migration Rehearsal & Live Cutover)', () => {
    it('runs rehearsal dry-run, reconciles active customer obligations, and issues cutover certificate', () => {
      const validBatch = stageMigrationRecords({
        batchId: 'BATCH-VALID-01',
        sourcePlatform: 'vagaro',
        mappingRules: getDefaultMappingRules('vagaro'),
        rawRows: [
          {
            FirstName: 'Chloe',
            LastName: 'Bennett',
            CellPhone: '310-555-4422',
            EmailAddress: 'chloe@example.com',
            GiftBalance: '50.00',
            RemainingPackages: '3',
          },
        ],
      });

      // 1. Rehearsal on clean batch
      const rehearsalClean = runMigrationRehearsal({
        stagedBatch: validBatch,
        futureAppointmentsCount: 4,
      });

      expect(rehearsalClean.canProceedToCutover).toBe(true);
      expect(rehearsalClean.reconciliation.activeGiftCardLiabilityDollars).toBe(50.0);
      expect(rehearsalClean.reconciliation.activePackageUnitsRemaining).toBe(3);

      // 2. Rehearsal on corrupted batch with active obligations blocks cutover
      const corruptedBatch = stageMigrationRecords({
        batchId: 'BATCH-CORRUPT-01',
        sourcePlatform: 'vagaro',
        mappingRules: getDefaultMappingRules('vagaro'),
        rawRows: [
          {
            FirstName: '',
            LastName: '', // Missing name error
            GiftBalance: '100.00', // Active obligation trapped in error row
          },
        ],
      });

      const rehearsalCorrupted = runMigrationRehearsal({
        stagedBatch: corruptedBatch,
      });

      expect(rehearsalCorrupted.canProceedToCutover).toBe(false);
      expect(rehearsalCorrupted.blockingReasons[0]).toContain('corrupted/error rows');

      // Approving interim redemption workflow allows controlled cutover
      const rehearsalApproved = runMigrationRehearsal({
        stagedBatch: corruptedBatch,
        interimRedemptionWorkflowApproved: true,
      });
      expect(rehearsalApproved.canProceedToCutover).toBe(true);

      // 3. Live cutover execution
      const certificate = executeLiveCutover({
        stagedBatch: validBatch,
        rehearsalResult: rehearsalClean,
        approvedByManager: 'Audrey (Salon Owner)',
        sampleRecordsSpotChecked: true,
        cutoverTime: '2026-10-27T16:00:00Z',
      });

      expect(certificate.status).toBe('cutover_completed');
      expect(certificate.openingBalances.giftCardLiabilityTotal).toBe(50.0);
      expect(certificate.openingBalances.packageUnitsTotal).toBe(3);
    });
  });

  // F106: Brand Changes Across All Surfaces (Rules BR02, BR03, BR05, BR07, BR10, DR04)
  describe('Posie Core Logic - F106 (Brand Changes Across Surfaces - Rules BR03, BR05, BR10, DR04)', () => {
    it('stages brand revisions, locks previously issued documents against theme updates, and supports rollback', () => {
      const v1Tokens = {
        primaryColor: '#2C3E30',
        secondaryColor: '#8A9A86',
        accentColor: '#C67D6E',
        headlineFont: 'Newsreader',
        bodyFont: 'Manrope',
        logoSvg: '<svg id="v1-emblem"/>',
        businessName: 'Posie Beauty Atelier',
        tagline: 'Glow up without the headache',
        contactEmail: 'hello@posie.com',
        contactPhone: '310-555-0199',
      };

      // 1. Initial published theme
      const themeV1 = createInitialBrandTheme({
        tokens: v1Tokens,
        publishedBy: 'Design Lead',
      });
      expect(themeV1.versionNumber).toBe(1);
      expect(themeV1.status).toBe('published');

      // 2. Issue document under Theme v1
      const issuedInvoiceV1 = issueBrandedDocument({
        documentId: 'INV-10992',
        title: 'HydraFacial Treatment Invoice',
        content: 'Services rendered: $120.00. Paid via Card.',
        activeTheme: themeV1,
      });

      expect(issuedInvoiceV1.brandVersionApplied).toBe(1);
      expect(issuedInvoiceV1.bakedBrandTokens.primaryColor).toBe('#2C3E30');

      // 3. Stage brand revision (e.g. Autumn Refresh: Primary color becomes Dark Forest #1D2B20)
      const stagedV2 = stageBrandRevision({
        currentTheme: themeV1,
        updatedTokens: {
          primaryColor: '#1D2B20',
          accentColor: '#D97757',
        },
        changelogNotes: 'Autumn Palette Refresh',
      });
      expect(stagedV2.status).toBe('draft');
      expect(stagedV2.versionNumber).toBe(2);

      // 4. Publish brand revision
      const { publishedTheme: themeV2 } = publishBrandRevision({
        stagedTheme: stagedV2,
        publishedBy: 'Creative Director',
      });
      expect(themeV2.status).toBe('published');
      expect(themeV2.tokens.primaryColor).toBe('#1D2B20');

      // 5. Invariant DR04 & BR05: Previously issued invoice permanently preserves Theme v1 tokens
      const isHistoricalIntact = verifyHistoricalArtifactIntegrity({
        issuedDocument: issuedInvoiceV1,
        newTheme: themeV2,
      });
      expect(isHistoricalIntact).toBe(true);
      expect(issuedInvoiceV1.bakedBrandTokens.primaryColor).toBe('#2C3E30'); // Original #2C3E30 unchanged!

      // 6. Safe rollback to v1 theme
      const rolledBackTheme = rollbackBrandTheme({
        historicalTheme: themeV1,
        rolledBackBy: 'Design Lead',
      });
      expect(rolledBackTheme.tokens.primaryColor).toBe('#2C3E30');
      expect(rolledBackTheme.changelogNotes).toContain('Rollback to Theme Version 1');
    });
  });

  describe('Posie Core Logic - F107 (One Link for a Complete Visit & Express Flow)', () => {
    it('manages a complete resumable visit link, preserves progress on payment decline, and executes self-checkout', () => {
      // 1. Initialize session
      const session = createVisitHubSession({
        clientId: 'cli-zendaya',
        clientName: 'Zendaya Coleman',
        clientEmail: 'zendaya@example.com',
        clientPhone: '+13105550199',
        studioId: 'studio-beverly-hills',
        appointment: {
          serviceId: 'srv-hydra',
          serviceName: 'Hydra-Dew Glass Facial',
          practitionerId: 'pro-maya',
          practitionerName: 'Maya Lin',
          startTime: '2026-11-01T14:00:00Z',
          durationMinutes: 60,
          price: 150,
        },
      });

      expect(session.status).toBe('active');
      expect(session.currentStep).toBe('intake_forms');
      expect(session.steps.length).toBe(5);

      // 2. Complete intake
      const withIntake = completeHubIntake(session, 'sub-intake-981');
      expect(withIntake.steps.find((s) => s.stepId === 'intake_forms')?.isCompleted).toBe(true);
      expect(withIntake.currentStep).toBe('consent_signature');

      // 3. Complete consent signature (Rule DR05: consent is separate from payment)
      const withConsent = completeHubConsentSignature(withIntake, 'doc-signed-consent-44');
      expect(withConsent.steps.find((s) => s.stepId === 'consent_signature')?.isCompleted).toBe(true);
      expect(withConsent.currentStep).toBe('payment_deposit');

      // 4. Payment decline: forms and consent must be preserved!
      const declinedAttempt = completeHubDepositPayment(withConsent, {
        amount: 50,
        paymentIntentId: 'pi_declined_123',
        cardLast4: '0002',
        status: 'failed',
      });
      expect(declinedAttempt.error).toContain('declined. Completed intake and consent documents were preserved');
      expect(declinedAttempt.session.steps.find((s) => s.stepId === 'intake_forms')?.isCompleted).toBe(true);
      expect(declinedAttempt.session.steps.find((s) => s.stepId === 'consent_signature')?.isCompleted).toBe(true);

      // 5. Successful payment with alternate card
      const succeededAttempt = completeHubDepositPayment(withConsent, {
        amount: 50,
        paymentIntentId: 'pi_succ_456',
        cardLast4: '4242',
        status: 'succeeded',
      });
      expect(succeededAttempt.session.status).toBe('completed');
      expect(succeededAttempt.session.currentStep).toBe('booking_confirmation');

      // 6. Express self-checkout flow on client phone
      const selfCheckoutSession = createVisitHubSession({
        clientId: 'cli-zendaya',
        clientName: 'Zendaya Coleman',
        clientEmail: 'zendaya@example.com',
        clientPhone: '+13105550199',
        studioId: 'studio-beverly-hills',
        mode: 'self_checkout_remaining',
      });
      expect(selfCheckoutSession.currentStep).toBe('self_checkout');

      const completedSelfCheckout = completeHubSelfCheckout(selfCheckoutSession, {
        serviceAmount: 150,
        tipAmount: 30,
        tenderType: 'apple_pay',
        cardLast4: '8811',
      });
      expect(completedSelfCheckout.status).toBe('completed');
      expect(completedSelfCheckout.selfCheckoutPayment?.totalPaid).toBe(180);
      expect(completedSelfCheckout.currentStep).toBe('aftercare_portal');
    });
  });

  describe('Posie Core Logic - F108 (Automation Recipes with Previews & Dry-Run Rehearsal)', () => {
    it('previews recipient audience, enforces quiet hours and consent exclusions, and supports emergency pause', () => {
      const recipes = getDefaultAutomationRecipes();
      expect(recipes.length).toBeGreaterThanOrEqual(4);

      const reviewRecipe = recipes.find((r) => r.type === 'review_request')!;
      expect(reviewRecipe.costPerMessageUSD).toBe(0.02);

      const cohort = [
        {
          clientId: 'c1',
          clientName: 'Zendaya Coleman',
          phone: '+13105550199',
          email: 'zendaya@example.com',
          timezone: 'America/Los_Angeles',
          hasMarketingConsent: true,
        },
        {
          clientId: 'c2',
          clientName: 'Opted Out Client',
          phone: '+13105550100',
          email: 'optout@example.com',
          timezone: 'America/Los_Angeles',
          hasMarketingConsent: false, // Should be excluded!
        },
        {
          clientId: 'c3',
          clientName: 'Recent Recipient',
          phone: '+13105550101',
          email: 'recent@example.com',
          timezone: 'America/Los_Angeles',
          hasMarketingConsent: true,
          lastMessageSentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago (Frequency capped!)
        },
      ];

      // Rehearse during daytime (2 PM = 14)
      const rehearsalDay = rehearseAutomationRecipe(reviewRecipe, cohort, {
        studioName: 'Posie Atelier',
        currentHourLocal: 14,
        reviewLink: 'posie.com/review/beverlyhills',
      });

      expect(rehearsalDay.totalAudienceEvaluated).toBe(3);
      expect(rehearsalDay.eligibleRecipientCount).toBe(1); // Only Zendaya
      expect(rehearsalDay.exclusions.optedOutCount).toBe(1);
      expect(rehearsalDay.exclusions.frequencyCappedCount).toBe(1);
      expect(rehearsalDay.estimatedTotalCostUSD).toBe(0.02);
      expect(rehearsalDay.sampleRecipients[0].personalizedMessage).toContain('Hi Zendaya');

      // Rehearse during quiet hours (11 PM = 23)
      const rehearsalNight = rehearseAutomationRecipe(reviewRecipe, cohort, {
        studioName: 'Posie Atelier',
        currentHourLocal: 23,
      });
      expect(rehearsalNight.exclusions.quietHoursCount).toBe(1); // Zendaya blocked by quiet hours
      expect(rehearsalNight.eligibleRecipientCount).toBe(0);

      // Emergency pause
      const paused = toggleAutomationPause(reviewRecipe, true);
      expect(paused.isPaused).toBe(true);
    });
  });

  describe('Posie Core Logic - F109 (Unified Communication Inbox & Attributed Firewall)', () => {
    it('manages multi-channel messages, tracks carrier failure, and protects clinical notes firewall', () => {
      const thread = createInboxThread({
        clientId: 'c-zendaya',
        clientName: 'Zendaya Coleman',
        clientPhone: '+13105550199',
        clientEmail: 'zendaya@example.com',
        assignedStaffId: 'staff-maya',
        assignedStaffName: 'Maya Lin',
        clientContext: {
          lifetimeSpendUSD: 1450,
          completedVisitsCount: 8,
          allergies: ['Retin-A'],
        },
      });

      expect(thread.clientName).toBe('Zendaya Coleman');
      expect(thread.clientContext.lifetimeSpendUSD).toBe(1450);

      // Staff sends outbound message via studio verified business line
      const { thread: threadWithOutbound, message: outMsg } = sendOutboundMessage(
        thread,
        {
          staffId: 'staff-maya',
          staffName: 'Maya Lin',
          studioBusinessNumber: '+13105557674',
        },
        {
          body: 'Hi Zendaya! Looking forward to seeing you tomorrow at 2 PM.',
          channel: 'sms',
        }
      );

      expect(threadWithOutbound.messages.length).toBe(1);
      expect(outMsg.senderContact).toBe('+13105557674'); // Masked staff personal number

      // Inbound client reply
      const { thread: threadWithReply, message: inMsg } = receiveInboundMessage(threadWithOutbound, {
        body: 'Thank you Maya! My barrier feels a little dry today, can we do extra hydration?',
        channel: 'sms',
        senderPhoneOrEmail: '+13105550199',
      });

      expect(threadWithReply.unreadCount).toBe(1);
      expect(inMsg.deliveryStatus).toBe('delivered');

      // Webhook carrier failure test
      const threadWithFailedMsg = updateMessageDeliveryStatus(
        threadWithReply,
        outMsg.id,
        'failed',
        'Carrier handset unreachable'
      );
      expect(threadWithFailedMsg.messages[0].deliveryStatus).toBe('failed');
      expect(threadWithFailedMsg.messages[0].failureReason).toContain('handset unreachable');

      // Save inbound text to client timeline (Rules F025, F063, F101, DR04)
      const { timelineRecord } = saveMessageToClientTimeline(threadWithReply, inMsg.id);
      expect(timelineRecord.classification).toBe('client_communication_reply');
      expect(timelineRecord.legalNotice).toContain('Does not constitute a signed clinical SOAP entry');
    });
  });

  describe('Posie Core Logic - F110 (Business Calling, Voicemail & Staff Routing)', () => {
    const config = {
      phoneNumber: '+13105557674',
      callerIdName: 'Posie Beverly Hills',
      operatingHours: {
        daysOfWeek: [1, 2, 3, 4, 5, 6], // Mon-Sat
        openHourLocal: 9, // 9 AM
        closeHourLocal: 19, // 7 PM
        timezone: 'America/Los_Angeles',
      },
      ringGroupStaffIds: ['staff-maya', 'staff-frontdesk'],
      voicemailGreetingText: 'Thank you for calling Posie Atelier. We are currently assisting clients...',
      isCallRecordingEnabled: true,
      recordingDisclosureAudioText: 'This call may be recorded for quality and coaching.',
    };

    const clientDirectory = [
      {
        clientId: 'c-zendaya',
        clientName: 'Zendaya Coleman',
        phone: '+13105550199',
        tier: 'Gold VIP',
        upcomingBooking: { date: '2026-11-01 14:00', service: 'Hydra-Dew Facial' },
      },
    ];

    it('evaluates operating hours routing, matches caller ID, and enforces recording consent rules', () => {
      // 1. Call during operating hours (Tuesday 2 PM = Day 2, Hour 14)
      const dayCall = handleInboundCallReceived(
        'call-001',
        '+13105550199',
        config,
        clientDirectory,
        { dayOfWeek: 2, hourLocal: 14 }
      );
      expect(dayCall.routeAction).toBe('ring_staff_group');
      expect(dayCall.callRecord.matchedClient?.clientName).toBe('Zendaya Coleman');
      expect(dayCall.callRecord.matchedClient?.membershipTier).toBe('Gold VIP');
      expect(dayCall.callRecord.recordingConsentState).toBe('recording_announced');

      // 2. Call after hours (Sunday = Day 0, Hour 22)
      const nightCall = handleInboundCallReceived(
        'call-002',
        '+13105550199',
        config,
        clientDirectory,
        { dayOfWeek: 0, hourLocal: 22 }
      );
      expect(nightCall.routeAction).toBe('route_to_voicemail');
      expect(nightCall.callRecord.disposition).toBe('voicemail');

      // 3. Process voicemail with transcription and task generation
      const processedVm = processInboundVoicemail(
        nightCall.callRecord,
        'https://storage.posie.com/voicemail/vm-12.mp3',
        'Hi, this is Zendaya. I wanted to see if Maya has an opening this Saturday.'
      );
      expect(processedVm.voicemail?.transcript).toContain('Zendaya');
      expect(processedVm.voicemail?.followUpTaskId).toBeDefined();
      expect(processedVm.recordingConsentState).toBe('transcription_only');

      // 4. Consent control: unrecorded call test (Rule U19)
      const unrecordedCall = setCallRecordingState(dayCall.callRecord, false);
      expect(unrecordedCall.recordingConsentState).toBe('unrecorded');
      expect(unrecordedCall.recordingAudioUrl).toBeUndefined();

      // Consent granted
      const activeRecordedCall = setCallRecordingState(dayCall.callRecord, true);
      expect(activeRecordedCall.recordingConsentState).toBe('recording_active');
      expect(activeRecordedCall.recordingAudioUrl).toContain('call-001.mp3');
    });
  });

  describe('Posie Core Logic - F111 (Message Consent & Delivery System - Rules DR05, DR07, DR10, R03)', () => {
    it('manages purpose-specific consent, suppresses marketing on opt-out, and enforces budget caps', () => {
      const consent = recordCommunicationConsent({
        clientId: 'cli-zendaya',
        clientPhone: '+13105550199',
        clientEmail: 'zendaya@example.com',
        transactionalConsent: true,
        marketingConsent: true,
        clinicalCareConsent: true,
      });

      const budget = {
        studioId: 'studio-bh',
        monthlyBudgetCapUSD: 20.0,
        currentSpendUSD: 19.99, // Budget near max
        costPerSmsUSD: 0.02,
        isHardCapEnforced: true,
      };

      // 1. Transactional send is allowed
      const txDispatch = dispatchGovernedMessage({
        consent,
        budget,
        purpose: 'transactional',
        channel: 'sms',
        contentBody: 'Your appointment is confirmed for tomorrow at 2 PM.',
      });
      expect(txDispatch.evidence.status).toBe('delivered');

      // 2. Budget cap stops marketing when budget would exceed $20.00
      const budgetCapped = dispatchGovernedMessage({
        consent,
        budget,
        purpose: 'marketing',
        channel: 'sms',
        contentBody: 'Enjoy $25 off our seasonal facial this week!',
      });
      expect(budgetCapped.evidence.status).toBe('suppressed_budget_cap');
      expect(budgetCapped.evidence.failureReason).toContain('monthly SMS budget cap');

      // 3. Revoke marketing consent (Client texts STOP)
      const revoked = revokeMarketingConsent(consent, 'Client sent STOP via SMS');
      expect(revoked.marketingConsent).toBe(false);
      expect(revoked.transactionalConsent).toBe(true); // Transactional remains intact!

      // 4. Marketing send is now suppressed due to opt-out
      const optOutSuppressed = dispatchGovernedMessage({
        consent: revoked,
        budget: { ...budget, currentSpendUSD: 5.0 }, // Plenty of budget
        purpose: 'marketing',
        channel: 'sms',
        contentBody: 'Seasonal specials are here!',
      });
      expect(optOutSuppressed.evidence.status).toBe('suppressed_optout');
      expect(optOutSuppressed.evidence.failureReason).toContain('opted out of marketing');
    });
  });

  describe('Posie Core Logic - F112 (Metric Dictionary & Governed Data Model)', () => {
    it('computes governed studio metrics with canonical source lineage and freshness timestamps', () => {
      expect(CANONICAL_METRIC_DICTIONARY.gross_sales.underlyingAccounts).toContain('4000');
      expect(CANONICAL_METRIC_DICTIONARY.tips_collected.underlyingAccounts).toContain('2300');

      const data = {
        serviceSalesCents: 20000,    // $200.00
        serviceDiscountsCents: 2000, // $20.00
        serviceRefundsCents: 1000,   // $10.00 -> Net Service: $170.00
        retailSalesCents: 5000,      // $50.00
        retailRefundsCents: 500,     // $5.00 -> Net Retail: $45.00
        tipsCollectedCents: 4000,    // $40.00
        salesTaxCollectedCents: 2100,// $21.00
        giftCardsSoldCents: 5000,    // $50.00
        giftCardsRedeemedCents: 2000,// $20.00 -> GC Delta: $30.00
        completedAppointmentsCount: 2,
        rebookedAppointmentsCount: 1, // 50% rebooking
      };

      const metrics = computeGovernedMetrics(data, { startDate: '2026-10-01', endDate: '2026-10-31' });

      // Invariant: Canonical Net Service Revenue
      expect(metrics.net_service_revenue.value).toBe(170.0);
      expect(metrics.net_retail_revenue.value).toBe(45.0);
      expect(metrics.gross_sales.value).toBe(300.0); // 200 + 50 + 50
      expect(metrics.tips_collected.value).toBe(40.0);
      expect(metrics.deferred_gift_card_liability.value).toBe(30.0);
      expect(metrics.rebooking_rate_percentage.value).toBe(50.0);
      expect(metrics.average_ticket_value_usd.value).toBe(107.5); // (170 + 45) / 2

      // Lineage & freshness
      expect(metrics.net_service_revenue.sourceLineage).toEqual(['4000']);
      expect(metrics.net_service_revenue.freshnessTimestampUTC).toBeDefined();
    });
  });

  describe('Posie Core Logic - F113 (Role-Based Dashboards & Renter Privacy Firewall)', () => {
    const studioFinancials = {
      grossSalesUSD: 10000,
      netServiceRevenueUSD: 8500,
      netRetailRevenueUSD: 1500,
      totalTipsCollectedUSD: 1800,
      laborCostUSD: 4000,
      netOperatingMarginUSD: 3500,
      appointmentsTotal: 75,
      studioUtilizationPercentage: 82.5,
    };

    const staffRecords = [
      {
        staffId: 'staff-maya',
        staffName: 'Maya Lin',
        role: 'commission_practitioner' as const,
        serviceSalesUSD: 3200,
        retailCommissionUSD: 120,
        tipsUSD: 680,
        appointmentsCompleted: 24,
        hoursLogged: 32,
        weeklyGoalUSD: 3000,
        retentionRate: 85.0,
      },
      {
        staffId: 'staff-chloe',
        staffName: 'Chloe Vance',
        role: 'booth_renter' as const,
        serviceSalesUSD: 2800,
        retailCommissionUSD: 0,
        tipsUSD: 540,
        appointmentsCompleted: 20,
        hoursLogged: 28,
        weeklyGoalUSD: 2500,
        retentionRate: 78.0,
      },
    ];

    it('enforces privacy firewall for practitioners while providing full P&L to owners', () => {
      // 1. Owner view
      const ownerDashboard = generateRoleBasedDashboard({
        requestingStaffId: 'owner-elena',
        requestingRole: 'owner',
        studioFinancials,
        staffRecords,
      });

      expect(ownerDashboard.viewType).toBe('owner_manager');
      if (ownerDashboard.viewType === 'owner_manager') {
        expect(ownerDashboard.data.studioOverview.grossSalesUSD).toBe(10000);
        expect(ownerDashboard.data.studioOverview.laborCostPercentage).toBe(40.0);
        expect(ownerDashboard.data.staffSummaries.length).toBe(2);
      }

      // 2. Practitioner view (Maya)
      const mayaDashboard = generateRoleBasedDashboard({
        requestingStaffId: 'staff-maya',
        requestingRole: 'commission_practitioner',
        studioFinancials,
        staffRecords,
      });

      expect(mayaDashboard.viewType).toBe('practitioner');
      if (mayaDashboard.viewType === 'practitioner') {
        expect(mayaDashboard.data.personalMetrics.personalServiceRevenueUSD).toBe(3200);
        expect(mayaDashboard.data.personalMetrics.tipsCollectedUSD).toBe(680);
        expect(mayaDashboard.data.goalProgress.percentageAchieved).toBe(106.7); // 3200 / 3000
        expect(mayaDashboard.data.isStudioFinancialsFirewalled).toBe(true);
      }

      // 3. Privacy access check
      expect(canViewStaffMetrics('staff-maya', 'commission_practitioner', 'staff-maya')).toBe(true);
      expect(canViewStaffMetrics('staff-maya', 'commission_practitioner', 'staff-chloe')).toBe(false); // Maya cannot snoop on Chloe!
      expect(canViewStaffMetrics('owner-elena', 'owner', 'staff-chloe')).toBe(true); // Owner can view all
    });
  });

  describe('Posie Core Logic - F114 (Retention and Return Cohorts - WB F58)', () => {
    it('analyzes return cohorts, ignores same-day add-on visits, and flags cadence-lapsed clients', () => {
      const firstTimeClients = [
        { clientId: 'c1', clientName: 'Zendaya Coleman', firstVisitDate: '2024-11-01' },
        { clientId: 'c2', clientName: 'Anne Hathaway', firstVisitDate: '2024-11-05' },
        { clientId: 'c3', clientName: 'One-Time Visitor', firstVisitDate: '2024-11-10' },
      ];

      const subsequentVisits = [
        // Same-day add-on visit for Zendaya on 2024-11-01 (MUST BE IGNORED)
        { clientId: 'c1', clientName: 'Zendaya Coleman', visitDate: '2024-11-01', serviceCategory: 'Add-on Mask', amountPaidUSD: 35 },
        // Valid return visit for Zendaya 28 days later
        { clientId: 'c1', clientName: 'Zendaya Coleman', visitDate: '2024-11-29', serviceCategory: 'Facial', amountPaidUSD: 150 },
        // Valid return visit for Anne 30 days later
        { clientId: 'c2', clientName: 'Anne Hathaway', visitDate: '2024-12-05', serviceCategory: 'Brow Sculpt', amountPaidUSD: 55 },
      ];

      const summary = analyzeRetentionCohort({
        cohortMonth: '2024-11',
        firstTimeClients,
        subsequentVisits,
        referenceDate: '2025-02-01', // Cohort is >60 days old
      });

      expect(summary.initialAcquiredClientsCount).toBe(3);
      expect(summary.returnedDistinctVisitCount).toBe(2); // Zendaya + Anne (One-time visitor did not return)
      expect(summary.retentionRatePercentage).toBe(66.7);
      expect(summary.repeatRevenueUSD).toBe(205.0); // 150 + 55 (35 same-day was excluded!)
      expect(summary.isImmatureCohort).toBe(false);

      // Immature cohort test (<60 days)
      const immatureSummary = analyzeRetentionCohort({
        cohortMonth: '2026-10',
        firstTimeClients,
        subsequentVisits,
        referenceDate: '2026-10-27',
      });
      expect(immatureSummary.isImmatureCohort).toBe(true);

      // Cadence lapsed client analysis
      const lapsedReport = identifyLapsedClientsByCadence(
        [
          { clientId: 'c1', clientName: 'Zendaya', lastVisitDate: '2026-10-15', expectedCadenceDays: 28 }, // 12 days ago: On track
          { clientId: 'c2', clientName: 'Lapsed Client', lastVisitDate: '2026-08-01', expectedCadenceDays: 28 }, // ~87 days ago: Lapsed
        ],
        '2026-10-27'
      );

      expect(lapsedReport[0].status).toBe('cadence_on_track');
      expect(lapsedReport[1].status).toBe('cadence_overdue_lapsed');
      expect(lapsedReport[1].daysOverdue).toBeGreaterThan(14);
    });
  });

  describe('Posie Core Logic - F115 (Service Contribution Analysis - Rules R06, R07)', () => {
    it('calculates operational contribution margin, flags missing costs, and evaluates floor thresholds', () => {
      // 1. Fully mapped service
      const hydraFacial = {
        serviceId: 'srv-hydra',
        serviceName: 'Hydra-Dew Glass Facial',
        grossPriceUSD: 150.0,
        practitionerCompensationUSD: 67.5, // 45% commission
        backbarSuppliesUSD: 12.0,          // Serums + cleanser
        merchantProcessingFeeUSD: 4.0,     // 2.6% + $0.10
        overheadAllocationUSD: 10.0,       // Linens
      };

      const floorRule = {
        minimumDollarMarginUSD: 50.0,
        minimumPercentageMargin: 35.0,
      };

      const result = calculateServiceContribution(hydraFacial, floorRule);

      // Costs = 67.5 + 12.0 + 4.0 + 10.0 = $93.50
      // Margin = 150.0 - 93.50 = $56.50
      // Margin % = 56.50 / 150 = 37.7%
      expect(result.totalDirectCostsUSD).toBe(93.5);
      expect(result.contributionMarginUSD).toBe(56.5);
      expect(result.contributionMarginPercentage).toBe(37.7);
      expect(result.hasMissingCostCoverage).toBe(false);
      expect(result.meetsContributionFloor).toBe(true);
      expect(result.accountingDisclaimer).toContain('Operational estimate only');

      // 2. Service with missing backbar cost mapping
      const unmappedService = {
        serviceId: 'srv-peel',
        serviceName: 'Custom Chemical Peel',
        grossPriceUSD: 120.0,
        practitionerCompensationUSD: 54.0,
        // Missing backbarSuppliesUSD & merchantProcessingFeeUSD!
      };

      const unmappedResult = calculateServiceContribution(unmappedService, floorRule);
      expect(unmappedResult.hasMissingCostCoverage).toBe(true);
      expect(unmappedResult.missingCostItems).toContain('backbar_supplies_cost_unmapped');
      expect(unmappedResult.missingCostItems).toContain('merchant_processing_fee_unmapped');
    });
  });

  describe('Posie Core Logic - F116 (Acquisition Attribution & Marketplace Defense)', () => {
    it('exempts direct and legacy clients from marketplace fees and allows auditable dispute overrides', () => {
      // 1. Direct booking via practitioner custom link -> 0% fee
      const directClient = recordClientAcquisition({
        clientId: 'cli-direct-1',
        clientName: 'Direct Client',
        channel: 'direct_pro_link',
        evidence: {
          bookingLinkToken: 'posie.com/maya/book',
          utmSource: 'instagram_bio',
        },
      });
      expect(directClient.isMarketplaceCommissionChargeable).toBe(false);
      expect(directClient.commissionFeeRatePercent).toBe(0.0);

      // 2. Legacy imported client from Vagaro -> 0% fee
      const legacyClient = recordClientAcquisition({
        clientId: 'cli-legacy-2',
        clientName: 'Legacy Regular',
        channel: 'legacy_imported_client',
        evidence: { utmSource: 'vagaro_migration' },
        isLegacyImport: true,
      });
      expect(legacyClient.isMarketplaceCommissionChargeable).toBe(false);
      expect(legacyClient.commissionFeeRatePercent).toBe(0.0);

      // 3. Marketplace discovery -> 20% commission
      const marketplaceClient = recordClientAcquisition({
        clientId: 'cli-mkt-3',
        clientName: 'Marketplace Explorer',
        channel: 'consumer_marketplace_discovery',
        evidence: { utmSource: 'posie_explore_app' },
      });
      expect(marketplaceClient.isMarketplaceCommissionChargeable).toBe(true);
      expect(marketplaceClient.commissionFeeRatePercent).toBe(20.0);

      // 4. Dispute override: Pro proves client was a personal referral
      const overridden = applyAttributionOverride(marketplaceClient, {
        newChannel: 'client_referral',
        reason: 'Client showed text proof of personal referral from Zendaya Coleman prior to booking',
        staffId: 'staff-maya',
      });
      expect(overridden.isMarketplaceCommissionChargeable).toBe(false);
      expect(overridden.commissionFeeRatePercent).toBe(0.0);
      expect(overridden.overrideHistory.length).toBe(1);
      expect(overridden.overrideHistory[0].reason).toContain('personal referral');
    });
  });

  describe('Posie Core Logic - F117 (Booking and Product Analytics)', () => {
    it('deduplicates retried events within sessions to prevent artificial conversion inflation', () => {
      const rawEvents = [
        // Session 1: Normal flow (completes checkout)
        { eventId: 'e1', sessionId: 's1', milestone: 'service_viewed' as const, timestamp: '2026-10-27T10:00:00Z' },
        { eventId: 'e2', sessionId: 's1', milestone: 'slot_selected' as const, timestamp: '2026-10-27T10:01:00Z' },
        // Reloads slot selection page twice (MUST NOT inflate count!)
        { eventId: 'e3', sessionId: 's1', milestone: 'slot_selected' as const, timestamp: '2026-10-27T10:01:10Z' },
        { eventId: 'e4', sessionId: 's1', milestone: 'slot_selected' as const, timestamp: '2026-10-27T10:01:20Z' },
        { eventId: 'e5', sessionId: 's1', milestone: 'intake_submitted' as const, timestamp: '2026-10-27T10:02:00Z' },
        { eventId: 'e6', sessionId: 's1', milestone: 'consent_signed' as const, timestamp: '2026-10-27T10:03:00Z' },
        { eventId: 'e7', sessionId: 's1', milestone: 'deposit_authorized' as const, timestamp: '2026-10-27T10:04:00Z' },
        { eventId: 'e8', sessionId: 's1', milestone: 'checkout_completed' as const, timestamp: '2026-10-27T10:05:00Z' },

        // Session 2: Drops off after service_viewed
        { eventId: 'e9', sessionId: 's2', milestone: 'service_viewed' as const, timestamp: '2026-10-27T10:10:00Z' },
      ];

      const analytics = computeBookingFunnelAnalytics(rawEvents);

      expect(analytics.totalUniqueSessions).toBe(2);
      expect(analytics.stages[0].milestone).toBe('service_viewed');
      expect(analytics.stages[0].uniqueSessionsCount).toBe(2); // Both s1 and s2

      // Invariant: slot_selected is exactly 1 session, despite 3 duplicate reload events
      expect(analytics.stages[1].milestone).toBe('slot_selected');
      expect(analytics.stages[1].uniqueSessionsCount).toBe(1);

      expect(analytics.overallConversionRatePercent).toBe(50.0); // 1 of 2 completed
      expect(analytics.biggestDropOffStage).toBe('slot_selected');
    });
  });

  describe('Posie Core Logic - F118 (Operational Reliability Dashboard & Incident Recovery)', () => {
    it('evaluates subsystem health, reconciles ambiguous payments, and maintains emergency read views', () => {
      const subsystems = [
        {
          subsystem: 'payment_gateway_stripe' as const,
          displayName: 'Stripe Payment Gateway',
          status: 'healthy' as const,
          latencyMs: 145,
          lastCheckedAt: '2026-10-27T10:30:00Z',
          errorRatePercent: 0.01,
          recoveryRunbookUrl: 'posie.com/ops/stripe',
        },
        {
          subsystem: 'certified_terminals_pos' as const,
          displayName: 'WisePOS E Smart Terminals',
          status: 'degraded' as const,
          latencyMs: 650,
          lastCheckedAt: '2026-10-27T10:30:00Z',
          errorRatePercent: 4.5,
          activeIncidentMessage: 'Terminal #3 experiencing sporadic WiFi packet retransmissions',
          recoveryRunbookUrl: 'posie.com/ops/terminals',
        },
      ];

      const ambiguousPayments = [
        {
          transactionId: 'tx-ambig-1',
          terminalId: 'term-wise-01',
          appointmentId: 'apt-912',
          clientName: 'Zendaya Coleman',
          amountUSD: 180.0,
          gatewayPaymentIntentId: 'pi_3Pqz_ambiguous',
          status: 'ambiguous_pending_check' as const,
          flaggedAt: '2026-10-27T10:25:00Z',
        },
      ];

      const report = evaluateSystemReliability(subsystems, ambiguousPayments);

      expect(report.overallSystemStatus).toBe('degraded');
      expect(report.openIncidentsCount).toBe(1);
      expect(report.ambiguousPaymentsCount).toBe(1);
      expect(report.emergencyReadViewAvailable).toBe(true);

      // Invariant: Gateway check verifies transaction status and prevents double charging
      const reconciled = reconcileAmbiguousPayment(ambiguousPayments[0], 'succeeded');
      expect(reconciled.status).toBe('reconciled_captured');
      expect(reconciled.resolutionNote).toContain('without recharging client');
    });
  });

  describe('Posie Core Logic - F119 (Complete Exit Archive & Freedom to Leave)', () => {
    it('compiles an offline-accessible exit archive with zero fees and verifies cryptographic integrity', () => {
      const clients = [
        {
          clientId: 'c1',
          fullName: 'Zendaya Coleman',
          email: 'zendaya@example.com',
          phone: '(310) 555-0199',
          firstVisitDate: '2024-11-01',
          totalVisitsCount: 14,
          lifetimeSpendUSD: 1450.0,
          unredeemedGiftCardBalanceUSD: 50.0,
          activePackageSessionsRemaining: 3,
          signedConsentDocumentHashes: ['9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e'],
        },
        {
          clientId: 'c2',
          fullName: 'Anne Hathaway',
          email: 'anne@example.com',
          phone: '(310) 555-0188',
          firstVisitDate: '2024-11-05',
          totalVisitsCount: 4,
          lifetimeSpendUSD: 420.0,
          unredeemedGiftCardBalanceUSD: 0.0,
          activePackageSessionsRemaining: 0,
          signedConsentDocumentHashes: [],
        },
      ];

      const manifest = generateStudioExitArchive({
        studioLegalName: 'Posie Beverly Hills Atelier LLC',
        clients,
      });

      // Invariants: Free export, offline index, liability accounting
      expect(manifest.exportFeeUSD).toBe(0);
      expect(manifest.totalClientsExported).toBe(2);
      expect(manifest.totalActiveGiftCardLiabilityUSD).toBe(50.0);
      expect(manifest.totalActivePackageSessions).toBe(3);
      expect(manifest.offlineIndexHtml).toContain('Zendaya Coleman');
      expect(manifest.offlineIndexHtml).toContain('Zero-Lock-In Guarantee');

      const isValid = verifyExitArchiveIntegrity(manifest);
      expect(isValid).toBe(true);
    });
  });

  describe('Posie Core Logic - F120 (Phone, Tablet, and Desktop Parity)', () => {
    it('verifies 100% workday functional parity on mobile browsers with documented responsive adaptations', () => {
      const audit = auditWorkdayDeviceParity();

      expect(audit.allCoreActionsSupportedOnMobile).toBe(true);
      expect(audit.totalCoreActionsCount).toBe(6);
      expect(audit.mobileSupportedCount).toBe(6);
      expect(audit.minimumTapTargetCompliant).toBe(true);
      expect(audit.contrastRatioCompliant).toBe(true);
      expect(audit.auditPassed).toBe(true);

      // Verify specific ergonomic mobile patterns
      expect(CORE_WORKDAY_PARITY_SPECS.create_booking.mobileUIPattern).toBe('bottom_drawer');
      expect(CORE_WORKDAY_PARITY_SPECS.create_booking.minimumTapTargetPixels).toBeGreaterThanOrEqual(44);
      expect(CORE_WORKDAY_PARITY_SPECS.checkout_pos_payment.mobileUIPattern).toBe('bottom_sticky_bar');
    });
  });

  describe('Posie Core Logic - F121 (Unified Search and Commands)', () => {
    const testItems = [
      {
        id: 'c1',
        category: 'client' as const,
        title: 'Maya Lin',
        subtitle: '(415) 555-0199 • VIP Client',
        snippet: 'Prefers quiet sessions with jasmine aromatherapy.',
        actionRoute: '/clients/c1',
        actionType: 'navigate' as const,
        keywords: ['maya', 'lin', 'vip'],
      },
      {
        id: 'doc1',
        category: 'document' as const,
        title: 'SOAP Note: Chemical Peel',
        subtitle: 'Visit on 2026-10-14 with Dr. Evelyn Reed',
        snippet: 'TCA 15% applied for 4 minutes with frost observation.',
        restrictedSnippet: 'Clinical finding: Stage 2 erythema and sensitive dermis. Prescribed soothing serum.',
        practitionerId: 'prac_reed',
        actionRoute: '/charts/doc1',
        actionType: 'modal' as const,
      },
      {
        id: 'cmd1',
        category: 'command' as const,
        title: 'Export Studio Exit Archive',
        subtitle: '1-click $0 complete data backup (Rule DR06)',
        requiredRoles: ['owner'] as ('owner' | 'manager' | 'practitioner' | 'booth_renter' | 'receptionist')[],
        actionRoute: '/admin/settings/export',
        actionType: 'command' as const,
      },
    ];

    it('searches records and protects restricted clinical snippets from unauthorized roles', () => {
      // 1. Receptionist search - sensitive note snippet must be redacted
      const receptionistRes = executeUnifiedSearch(testItems, {
        query: 'peel',
        userRole: 'receptionist',
        userId: 'staff_1',
      });

      expect(receptionistRes.totalMatches).toBe(1);
      const docMatch = receptionistRes.resultsByCategory.document[0];
      expect(docMatch.isSnippetRedacted).toBe(true);
      expect(docMatch.displaySnippet).toContain('[Restricted Clinical / Financial Record Redacted]');

      // 2. Owner search - owner sees full clinical finding
      const ownerRes = executeUnifiedSearch(testItems, {
        query: 'peel',
        userRole: 'owner',
        userId: 'owner_1',
      });
      const ownerDocMatch = ownerRes.resultsByCategory.document[0];
      expect(ownerDocMatch.isSnippetRedacted).toBe(false);
      expect(ownerDocMatch.displaySnippet).toContain('Stage 2 erythema');

      // 3. Command authorization - receptionist cannot find owner-only exit archive command
      const receptionistCmdRes = executeUnifiedSearch(testItems, {
        query: 'exit',
        userRole: 'receptionist',
        userId: 'staff_1',
      });
      expect(receptionistCmdRes.totalMatches).toBe(0);

      // 4. Booth renter isolation - cannot see another practitioner's document
      const renterRes = executeUnifiedSearch(testItems, {
        query: 'peel',
        userRole: 'practitioner',
        userId: 'prac_other',
        isBoothRenter: true,
      });
      expect(renterRes.totalMatches).toBe(0);
    });
  });

  describe('Posie Core Logic - F122 (Emergency Day View & Outage Recovery)', () => {
    it('caches day view with cryptographic digest and marks offline actions as unconfirmed', () => {
      const appointments = [
        {
          id: 'appt_1',
          clientName: 'Chloe Bennett',
          clientPhone: '(212) 555-0144',
          practitionerName: 'Sienna Woods',
          practitionerId: 'prac_1',
          serviceName: 'Hydra-Dew Facial',
          startTime: '10:00 AM',
          endTime: '11:00 AM',
          status: 'confirmed' as const,
          safetyAlerts: ['Allergic to Tea Tree Oil', 'Retin-A use 3 days ago'],
          roomOrStation: 'Room 2',
        },
      ];

      const cache = buildEmergencyDayViewCache('studio_beverly', 'device_tablet_1', '2026-10-27', appointments);

      expect(cache.isEncrypted).toBe(true);
      expect(cache.cacheDigest).toMatch(/^sha256_/);
      expect(cache.appointments.length).toBe(1);

      // Evaluate active offline status
      const status = evaluateEmergencyDayView(cache, true, []);
      expect(status.isOffline).toBe(true);
      expect(status.safetyAlertCount).toBe(2);
      expect(status.statusMessage).toContain('Emergency Read-Only Mode');

      // Invariant: No false confirmation during outages
      const queuedAction = queueOfflineAction('cash_received', 'appt_1', { amountUSD: 120 });
      expect(queuedAction.syncStatus).toBe('offline_unconfirmed_queued');
      expect(queuedAction.disclaimer).toContain('WB C6 Invariant');
      expect(queuedAction.disclaimer).toContain('It is not confirmed until the studio reconnects');
    });
  });

  describe('Posie Core Logic - F123 (Public API and Webhooks)', () => {
    it('validates permission scopes and dispatches idempotent signed webhook payloads', () => {
      const token = {
        id: 'tok_123',
        name: 'Zapier Lead Connector',
        tokenPrefix: 'posie_live_zapier',
        tokenHash: 'hash_abc',
        scopes: ['appointments:read', 'clients:read'] as ('appointments:read' | 'clients:read')[],
        studioId: 'studio_1',
        createdAtUtc: '2026-10-01T00:00:00Z',
        rateLimitPerMinute: 60,
      };

      // Scope validation
      const readAllowed = validateApiTokenScope(token, 'appointments:read');
      expect(readAllowed.isAuthorized).toBe(true);

      const writeDenied = validateApiTokenScope(token, 'clients:write' as any);
      expect(writeDenied.isAuthorized).toBe(false);
      expect(writeDenied.reason).toContain('lacks required scope');

      // Webhook payload creation with signature and idempotency key
      const payload = createWebhookEventPayload(
        'appointment.booked',
        'studio_1',
        { appointmentId: 'appt_99', clientName: 'Gemma Chan' },
        'whsec_secret_key_777'
      );

      expect(payload.idempotencyKey).toMatch(/^posie_idemp_evt_/);
      expect(payload.signatureHeader).toMatch(/^t=\d+,v1=[a-f0-9]+/);
      expect(payload.apiVersion).toBe('2026-10-01');

      // Exponential backoff
      expect(calculateNextRetryDelaySeconds(0)).toBe(10);
      expect(calculateNextRetryDelaySeconds(1)).toBe(60);
      expect(calculateNextRetryDelaySeconds(2)).toBe(300);
      expect(calculateNextRetryDelaySeconds(3)).toBe(1800);
      expect(calculateNextRetryDelaySeconds(4)).toBeNull(); // Abandon after 4 retries
    });
  });

  describe('Posie Core Logic - F124 (Product Use Per Service & Fractional Backbar)', () => {
    it('converts units consistently and explicitly labels unmeasured usage as estimated', () => {
      // Test unit conversions
      expect(convertToBaseUnit(1, 'fl_oz').normalizedValue).toBeCloseTo(29.57, 1);
      expect(convertToBaseUnit(2, 'pumps').normalizedValue).toBe(3); // 2 * 1.5ml
      expect(convertToBaseUnit(1, 'oz').normalizedValue).toBeCloseTo(28.35, 1);

      const formula = {
        id: 'formula_42',
        appointmentId: 'appt_100',
        serviceId: 'srv_peel',
        practitionerId: 'prac_1',
        formulaVersion: 2,
        formulaName: 'Custom Glycolic Radiance Mix v2',
        createdAtUtc: '2026-10-27T10:00:00Z',
        ingredients: [
          {
            productId: 'prod_peel',
            productName: 'Glycolic 30% Solution',
            quantity: 15, // 15 ml
            unit: 'ml' as const,
            costPerBaseUnitCents: 12, // 12 cents/ml ($1.80)
            measurementSource: 'measured_scale' as const,
            wasteQuantity: 3, // 3 ml wasted ($0.36)
          },
          {
            productId: 'prod_serum',
            productName: 'Botanical Soothing Drops',
            quantity: 4, // 4 pumps (6 ml)
            unit: 'pumps' as const,
            costPerBaseUnitCents: 20, // 20 cents/ml ($1.20)
            measurementSource: 'estimated_formula_default' as const,
          },
        ],
      };

      const summary = computeBackbarUsageSummary(formula);

      expect(summary.totalConsumedCostCents).toBe(180 + 120); // $3.00
      expect(summary.totalWasteCostCents).toBe(36); // $0.36
      expect(summary.grossBackbarCostCents).toBe(336); // $3.36

      // Invariant: explicitly marks estimates
      expect(summary.hasUnmeasuredEstimates).toBe(true);
      expect(summary.unmeasuredIngredientCount).toBe(1);
      expect(summary.itemizedBreakdown[0].isEstimated).toBe(false);
      expect(summary.itemizedBreakdown[1].isEstimated).toBe(true);
    });
  });

  describe('Posie Core Logic - F125 (Lots Expiry and Stock Forecasts)', () => {
    it('quarantines expired and PAO-violated lots and distinguishes definite shortages from estimates', () => {
      const lots = [
        {
          lotId: 'lot_fresh',
          sku: 'SKU_PEEL_01',
          productName: 'Pure Glycolic Acid 30%',
          lotNumber: 'LOT-2026-A',
          currentUnits: 5,
          unitOfMeasure: 'vials',
          expirationDate: '2027-12-31',
          isQuarantined: false,
        },
        {
          lotId: 'lot_pao_expired',
          sku: 'SKU_PEEL_01',
          productName: 'Pure Glycolic Acid 30%',
          lotNumber: 'LOT-2025-X',
          currentUnits: 4,
          unitOfMeasure: 'vials',
          expirationDate: '2027-01-01',
          openedDate: '2026-01-01',
          paoMonths: 6, // Expired July 2026
          isQuarantined: false,
        },
      ];

      // PAO evaluation
      const freshHealth = evaluateLotHealth(lots[0], '2026-10-27');
      expect(freshHealth.isUsable).toBe(true);
      expect(freshHealth.alertLevel).toBe('healthy');

      const paoHealth = evaluateLotHealth(lots[1], '2026-10-27');
      expect(paoHealth.isPaoExpired).toBe(true);
      expect(paoHealth.isUsable).toBe(false);
      expect(paoHealth.alertLevel).toBe('pao_violated');

      // Forecast demand with strict requirement exceeding available unexpired stock
      const upcoming = [
        {
          appointmentId: 'appt_1',
          scheduledDate: '2026-10-28',
          serviceId: 'srv_peel',
          serviceName: 'Level 2 Chemical Peel',
          sku: 'SKU_PEEL_01',
          unitsNeeded: 8, // Needs 8 vials, only 5 unexpired exist
          isStrictCommitment: true,
        },
      ];

      const forecast = forecastStockDemand('SKU_PEEL_01', 'Pure Glycolic Acid 30%', lots, upcoming, '2026-10-27');

      // Invariant: Definite shortage detected
      expect(forecast.currentAvailableUnexpiredUnits).toBe(5);
      expect(forecast.committedUnitsNext7Days).toBe(8);
      expect(forecast.projectedShortageUnits).toBe(3);
      expect(forecast.shortageType).toBe('definite_shortage');
      expect(forecast.requiresImmediateReorder).toBe(true);
      expect(forecast.alertMessage).toContain('Definite Shortage Alert');
    });
  });

  describe('Posie Core Logic - F126 (Service Readiness Rules)', () => {
    const prerequisites = [
      {
        id: 'p1',
        type: 'intake_form' as const,
        title: 'Facial Intake Questionnaire',
        description: 'Updated within last 12 months',
        isSatisfied: true,
      },
      {
        id: 'p2',
        type: 'patch_test' as const,
        title: 'Glycolic Patch Test Verification',
        description: 'Negative reaction recorded within 14 days',
        isSatisfied: false,
      },
      {
        id: 'p3',
        type: 'staff_qualification' as const,
        title: 'Esthetician Chemical Peel Certification',
        description: 'State license and internal certification active',
        isSatisfied: true,
      },
    ];

    it('blocks readiness when clinical prerequisites are missing and requires documented practitioner override', () => {
      // 1. Blocked due to missing patch test
      const verdict = evaluateServiceReadiness({
        appointmentId: 'appt_101',
        serviceId: 'srv_peel',
        serviceName: 'Level 2 Chemical Peel',
        clientId: 'cli_1',
        clientName: 'Gemma Chan',
        practitionerId: 'prac_1',
        prerequisites,
      });

      expect(verdict.status).toBe('blocked_missing_prerequisite');
      expect(verdict.satisfiedCount).toBe(2);
      expect(verdict.totalCount).toBe(3);
      expect(verdict.missingPrerequisites[0].id).toBe('p2');
      expect(verdict.guidanceMessage).toContain('Essential clinical safety requirements missing');

      // 2. Override validation: empty reason must throw
      expect(() =>
        evaluateServiceReadiness({
          appointmentId: 'appt_101',
          serviceId: 'srv_peel',
          serviceName: 'Level 2 Chemical Peel',
          clientId: 'cli_1',
          clientName: 'Gemma Chan',
          practitionerId: 'prac_1',
          prerequisites,
          override: {
            authorizedByPractitionerId: 'prac_1',
            practitionerName: 'Dr. Evelyn Reed',
            reason: 'ok', // too short
            timestampUtc: new Date().toISOString(),
          },
        })
      ).toThrow('valid clinical/operational reason');

      // 3. Documented override succeeds with audit trail
      const overridden = evaluateServiceReadiness({
        appointmentId: 'appt_101',
        serviceId: 'srv_peel',
        serviceName: 'Level 2 Chemical Peel',
        clientId: 'cli_1',
        clientName: 'Gemma Chan',
        practitionerId: 'prac_1',
        prerequisites,
        override: {
          authorizedByPractitionerId: 'prac_1',
          practitionerName: 'Dr. Evelyn Reed',
          reason: 'Client received identical 30% formulation 10 days ago at sister atelier with zero erythema.',
          timestampUtc: new Date().toISOString(),
        },
      });

      expect(overridden.status).toBe('overridden_ready');
      expect(overridden.overrideApplied?.authorizedByPractitionerId).toBe('prac_1');
      expect(overridden.guidanceMessage).toContain('Prerequisites overridden by Dr. Evelyn Reed');
    });
  });

  describe('Posie Core Logic - F127 (Business Anomaly Explanations)', () => {
    it('suppresses alerts for insufficient sample sizes and flags significant anomalies with root-cause attribution', () => {
      // 1. Low sample size suppression
      const lowSample = evaluateBusinessAnomaly({
        studioId: 'studio_1',
        category: 'booking_volume_drop',
        observation: {
          currentValue: 2,
          baselineValue: 4,
          sampleSize: 3,
          minSampleSizeRequired: 15, // minimum 15 required
          unit: 'count',
        },
        sourceRecordIds: ['appt_1', 'appt_2'],
      });

      expect(lowSample.isAlertSuppressed).toBe(true);
      expect(lowSample.suppressionReason).toContain('Insufficient sample size');
      expect(lowSample.suggestedChecks[0]).toContain('Continue monitoring baseline');

      // 2. Statistically valid booking drop
      const validDrop = evaluateBusinessAnomaly({
        studioId: 'studio_1',
        category: 'booking_volume_drop',
        observation: {
          currentValue: 24,
          baselineValue: 48,
          sampleSize: 50,
          minSampleSizeRequired: 15,
          unit: 'count',
        },
        sourceRecordIds: ['rec_1', 'rec_2'],
      });

      expect(validDrop.isAlertSuppressed).toBe(false);
      expect(validDrop.percentageDeviation).toBe(-50);
      expect(validDrop.severity).toBe('high');
      expect(validDrop.suggestedChecks.length).toBeGreaterThan(0);
      expect(validDrop.suggestedChecks[0]).toContain('Review direct booking website');
    });
  });

  describe('Posie Core Logic - F128 (Guardian and Authorized Payer Roles)', () => {
    it('firewalls payers from clinical notes while enabling billing receipts and minors care', () => {
      const clientMinor = {
        id: 'person_minor',
        fullName: 'Zoe Kravitz (Junior)',
        email: 'zoe.jr@example.com',
        phone: '(310) 555-0111',
        dateOfBirth: '2012-05-15', // 14 years old
        isMinor: true,
      };

      const guardian = {
        id: 'person_mom',
        fullName: 'Lisa Bonet',
        email: 'lisa@example.com',
        phone: '(310) 555-0122',
      };

      const payer = {
        id: 'person_payer',
        fullName: 'Jason Momoa',
        email: 'jason@example.com',
        phone: '(310) 555-0133',
      };

      const relationship = {
        appointmentId: 'appt_family_1',
        client: clientMinor,
        guardian,
        payer,
        hasClientAuthorizedPayerMedicalDisclosure: false,
      };

      // 1. Minor check
      expect(isMinorClient(clientMinor.dateOfBirth, '2026-10-27')).toBe(true);

      // 2. Payer privileges: billing only, zero clinical access
      const payerAccess = evaluateRelationshipPrivileges(relationship, payer.id);
      expect(payerAccess.canViewBillingInvoice).toBe(true);
      expect(payerAccess.canViewClinicalNotes).toBe(false);
      expect(payerAccess.canViewBeforeAfterPhotos).toBe(false);
      expect(payerAccess.canSignTreatmentConsent).toBe(false);
      expect(payerAccess.explanation).toContain('WB F128 Invariant');
      expect(payerAccess.explanation).toContain('Paying for a visit grants billing invoice access ONLY');

      // 3. Guardian privileges: can sign consent and view notes
      const guardianAccess = evaluateRelationshipPrivileges(relationship, guardian.id);
      expect(guardianAccess.canViewBillingInvoice).toBe(true);
      expect(guardianAccess.canViewClinicalNotes).toBe(true);
      expect(guardianAccess.canSignTreatmentConsent).toBe(true);
    });
  });

  describe('Posie Core Logic - F129 (Documented Care Summaries)', () => {
    it('manages care summary draft lifecycle, excludes unreleased media, and locks on practitioner sign', () => {
      const draft = createCareSummaryDraft(
        'appt_50',
        'Hydra-Dew Glass Facial',
        'Zendaya Coleman',
        'prac_reed',
        'Dr. Evelyn Reed',
        '2026-10-27',
        'Skin presented with dehydration. Applied hyaluronic infusion with positive calm response.',
        [
          { productId: 'p1', name: 'Hydra-Infusion Ampoule', purpose: 'applied_in_treatment' },
          { productId: 'p2', name: 'Barrier Recovery Cream', purpose: 'recommended_home_care', instructions: 'Twice daily' },
        ],
        ['Apply SPF 50 generously', 'Avoid retinol for 48 hours'],
        [
          { photoId: 'ph1', caption: 'Cheek hydration post-treatment', hasClientMediaRelease: true, thumbnailUrl: 'https://cdn.posie.com/ph1.jpg' },
          { photoId: 'ph2', caption: 'Clinical pore close-up', hasClientMediaRelease: false, thumbnailUrl: 'https://cdn.posie.com/ph2.jpg' },
        ]
      );

      // Invariant: unreleased photo excluded
      expect(draft.photos.length).toBe(1);
      expect(draft.photos[0].photoId).toBe('ph1');
      expect(draft.status).toBe('draft');

      // Invariant: unapproved draft cannot be delivered
      expect(() => renderCareSummaryHtml(draft)).toThrow('Unapproved care summary drafts cannot be delivered');

      // Sign and approve
      const signed = signAndApproveCareSummary(draft, 'prac_reed');
      expect(signed.status).toBe('practitioner_approved_signed');
      expect(signed.approvedByPractitionerId).toBe('prac_reed');

      const html = renderCareSummaryHtml(signed);
      expect(html).toContain('Your Treatment Care Packet');
      expect(html).toContain('Hydra-Dew Glass Facial');
      expect(html).toContain('Barrier Recovery Cream');
      expect(html).toContain('Verified and signed by Dr. Evelyn Reed');
    });
  });

  describe('Posie Core Logic - F130 (Assisted Support Sessions)', () => {
    it('enforces session caps, masks payment/health secrets, and supports instant kill switch', () => {
      // 1. Session grant with duration cap (15m to 120m)
      const session = grantAssistedSupportSession('studio_1', 'owner_1', 'eng_alex', ['calendar_scheduling_debug'], 240); // requested 240
      expect(session.scopes).toEqual(['calendar_scheduling_debug']);
      expect(session.isRevoked).toBe(false);

      // 2. Secret masking
      const rawCustomerResource = {
        clientName: 'Anne Hathaway',
        cardNumber: '4242424242421111',
        cardCvc: '888',
        secretKey: 'sk_live_posie_9999',
        clinicalSoapFindings: 'Patient diagnosed with rosacea flare and dermal hypersensitivity.',
        allergies: 'Severe fragrance allergy',
        practitionerNetPayUSD: 450.0,
      };

      const masked = maskResourceForSupport('clinical_chart', 'chart_99', rawCustomerResource, session.scopes);
      expect(masked.data.cardNumber).toBe('•••• •••• •••• 1111');
      expect(masked.data.cardCvc).toBe('•••');
      expect(masked.data.secretKey).toBe('[REDACTED_API_SECRET]');
      expect(masked.data.clinicalSoapFindings).toBe('[Confidential Client Health Record Hidden from Support]');
      expect(masked.data.practitionerNetPayUSD).toBe('[Personal Compensation Hidden]');
      expect(masked.isMaskedForSupport).toBe(true);

      // 3. Instant revocation kill switch
      const revoked = revokeAssistedSupportSession(session, 'owner_1', 'Security audit complete');
      expect(revoked.isRevoked).toBe(true);
      expect(revoked.revocationReason).toContain('Security audit complete');
    });
  });

  describe('Posie Core Logic - F131 (Payroll Ready Exports)', () => {
    it('compiles provider-ready exports with period locks and exception auditing', () => {
      const staffInputs = [
        {
          practitionerId: 'prac_1',
          practitionerName: 'Sienna Woods',
          externalPayrollEmployeeId: 'EMP-001',
          regularHoursWorked: 32,
          hourlyRateUSD: 25.0, // $800
          serviceCommissionUSD: 450.0,
          retailCommissionUSD: 60.0,
          tipsUSD: 180.0,
          forwardAdjustmentsUSD: -50.0, // Clawback from previous refund
        },
        {
          practitionerId: 'prac_2',
          practitionerName: 'Chloe Bennett',
          externalPayrollEmployeeId: '', // Missing ID exception
          regularHoursWorked: 40,
          hourlyRateUSD: 20.0,
          serviceCommissionUSD: 300.0,
          retailCommissionUSD: 0,
          tipsUSD: 120.0,
          forwardAdjustmentsUSD: 0,
          hasMissingTaxId: true,
        },
      ];

      const manifest = generatePayrollExport(
        'pay_period_2026_10_A',
        '2026-10-01',
        '2026-10-15',
        'gusto',
        staffInputs,
        true,
        'mgr_sophie'
      );

      // Invariants: Period locks and exception reporting
      expect(manifest.isPeriodLocked).toBe(true);
      expect(manifest.lockedByUserId).toBe('mgr_sophie');
      expect(manifest.totalHourlyWagesUSD).toBe(800 + 800); // $1600
      expect(manifest.totalCommissionsUSD).toBe(510 + 300); // $810
      expect(manifest.totalTipsUSD).toBe(300);
      expect(manifest.totalForwardAdjustmentsUSD).toBe(-50);
      expect(manifest.totalGrossPayrollUSD).toBe(1440 + 1220); // $2660

      // Exceptions: Missing employee ID and missing tax ID
      expect(manifest.exceptionCount).toBe(2);
      expect(manifest.allExceptions[0]).toContain('Missing external payroll employee ID for Chloe Bennett');
      expect(manifest.allExceptions[1]).toContain('Missing Tax ID / SSN on file for Chloe Bennett');

      // CSV output verification
      expect(manifest.csvContent).toContain('Employee_ID,Employee_Name,Regular_Hours');
      expect(manifest.csvContent).toContain('EMP-001,"Sienna Woods",32.00,800.00');
    });
  });

  describe('Posie Core Logic - F132 (Tax and Receipt Configuration)', () => {
    it('enforces effective-dated tax rules and separates liability account 2200 from revenue', () => {
      const rule = {
        ruleId: 'tax_ca_beverly_hills_2026',
        name: 'Beverly Hills Combined Sales Tax (Effective Oct 2026)',
        effectiveFromDate: '2026-10-01',
        servicesTaxable: false, // Services tax-exempt in CA
        retailTaxable: true, // Retail products taxable
        components: [
          { jurisdictionName: 'California State', ratePercentage: 6.0 },
          { jurisdictionName: 'Los Angeles County', ratePercentage: 0.25 },
          { jurisdictionName: 'Beverly Hills City', ratePercentage: 3.25 },
        ],
        totalRatePercentage: 9.5, // 9.5% total
        studioTaxRegistrationId: 'CA-SELLER-998124',
      };

      const lines = [
        { id: 'l1', name: 'Hydra-Dew Glass Facial', category: 'service' as const, amountUSD: 150.0 },
        { id: 'l2', name: 'Glow Hyaluronic Serum', category: 'retail_product' as const, amountUSD: 50.0 },
        { id: 'l3', name: 'Practitioner Gratuity', category: 'tip' as const, amountUSD: 30.0 },
      ];

      const calculation = calculateCheckoutTaxes(lines, rule);

      // Invariants: Only retail is taxed, tips and services exempt
      expect(calculation.taxableSubtotalUSD).toBe(50.0);
      expect(calculation.exemptSubtotalUSD).toBe(180.0);
      expect(calculation.totalTaxLiabilityUSD).toBe(4.75); // 9.5% of $50
      expect(calculation.grandTotalUSD).toBe(234.75);

      // Accounting ledger code separation
      expect(calculation.liabilityAccountCode).toBe('2200'); // Sales Tax Payable
      expect(calculation.revenueAccountCode).toBe('4000'); // Gross Operating Revenue

      // Formatted receipt output
      const receipt = generateTaxReceipt('REC-99104', '2026-10-27', lines, rule);
      expect(receipt.formattedReceiptText).toContain('RECEIPT #REC-99104');
      expect(receipt.formattedReceiptText).toContain('Tax ID: CA-SELLER-998124');
      expect(receipt.formattedReceiptText).toContain('Sales Tax (9.5%): $4.75');
      expect(receipt.formattedReceiptText).toContain('GRAND TOTAL:      $234.75');
    });
  });

  describe('Posie Core Logic - F133 (Integration Connection Center)', () => {
    it('evaluates connection health and warns what external data is delayed during disconnections', () => {
      const states = [
        {
          serviceId: 'quickbooks_online' as const,
          displayName: 'QuickBooks Online',
          category: 'accounting' as const,
          status: 'token_expired' as const,
          authorizedScopes: ['accounting'],
          pendingRetryQueueCount: 3,
          reconnectEndpoint: '/api/integrations/qbo/oauth/connect',
        },
        {
          serviceId: 'stripe_terminal' as const,
          displayName: 'Stripe Terminal (WisePOS E)',
          category: 'payments' as const,
          status: 'connected' as const,
          authorizedScopes: ['terminal.hardware.read'],
          pendingRetryQueueCount: 0,
          reconnectEndpoint: '/api/integrations/stripe/pair',
        },
      ];

      const overview = compileIntegrationCenterOverview('studio_beverly', states);

      expect(overview.totalIntegrationsCount).toBe(2);
      expect(overview.healthyCount).toBe(1);
      expect(overview.degradedOrOfflineCount).toBe(1);

      // Invariant: Disconnected QBO warns what data is lagging
      const qbo = overview.integrations.find((i) => i.serviceId === 'quickbooks_online');
      expect(qbo?.delayedDataImpactDescription).toContain('Daily sales journal entries and sales tax liability accounts are lagging');
      expect(overview.actionRequiredSummary[0]).toContain('QuickBooks Online disconnected: Click to refresh Intuit OAuth token');
    });
  });

  describe('Posie Core Logic - F134 (Approvals for Consequential Changes)', () => {
    it('creates blast-radius previews and requires documented rationale for approval', () => {
      // 1. Request consequential bulk SMS blast
      const req = requestConsequentialChangeApproval(
        'bulk_sms_broadcast',
        'VIP Holiday Flash Promotion',
        'Broadcast 20% gift card bonus to all active clients',
        'staff_1',
        'Emma Watson',
        450, // 450 recipients
        22.5 // $22.50 estimated messaging fee
      );

      expect(req.status).toBe('pending_approval');
      expect(req.riskSeverity).toBe('high');
      expect(req.affectedRecordsCount).toBe(450);
      expect(req.totalFinancialImpactUSD).toBe(22.5);

      // 2. Reject approval without adequate rationale
      expect(() => approveConsequentialChange(req, 'owner_1', 'Dr. Evelyn Reed', 'no')).toThrow('minimum 5 characters');

      // 3. Documented approval succeeds
      const approved = approveConsequentialChange(
        req,
        'owner_1',
        'Dr. Evelyn Reed',
        'Approved within Q4 marketing carrier budget and complies with quiet hours.'
      );

      expect(approved.status).toBe('approved');
      expect(approved.approvalDecision?.decision).toBe('approved');
      expect(approved.approvalDecision?.decidedByUserId).toBe('owner_1');
      expect(approved.approvalDecision?.rationale).toContain('Approved within Q4 marketing carrier budget');
    });
  });

  describe('Posie Core Logic - F135 (Supported Wallet and Online Payment Methods)', () => {
    it('filters payment methods based on client device capability and discloses transparent fees', () => {
      // 1. iOS Safari device context: Apple Pay should be available
      const iosContext = {
        countryCode: 'US',
        isApplePayHardwareSupported: true,
        isGooglePayHardwareSupported: false,
        browserName: 'safari' as const,
        deviceType: 'ios' as const,
      };

      const iosEval = evaluateSupportedPaymentMethods(iosContext, 120.0);
      expect(iosEval.recommendedMethod).toBe('apple_pay');
      expect(iosEval.availableMethods.some((m) => m.id === 'apple_pay')).toBe(true);
      expect(iosEval.pciComplianceStatement).toContain('PCI DSS SAQ A Certified');

      // 2. Android Chrome device context: Google Pay available, Apple Pay filtered out
      const androidContext = {
        countryCode: 'US',
        isApplePayHardwareSupported: false,
        isGooglePayHardwareSupported: true,
        browserName: 'chrome' as const,
        deviceType: 'android' as const,
      };

      const androidEval = evaluateSupportedPaymentMethods(androidContext, 120.0);
      expect(androidEval.recommendedMethod).toBe('google_pay');
      expect(androidEval.availableMethods.some((m) => m.id === 'google_pay')).toBe(true);
      expect(androidEval.availableMethods.some((m) => m.id === 'apple_pay')).toBe(false);

      // Invariant: Disclosed processing fees
      const bnplFee = androidEval.disclosedFeeSummary.find((s) => s.methodName.includes('Klarna'));
      expect(bnplFee?.rateText).toBe('5.9% + 30¢');
    });
  });

  describe('Posie Core Logic - F136 (Transparent Waitlist Priorities)', () => {
    it('ranks waitlist candidates on objective criteria, filters inadequate notice, and issues timed exclusive offers', () => {
      const opening = {
        openingId: 'open_slot_99',
        practitionerId: 'prac_reed',
        practitionerName: 'Dr. Evelyn Reed',
        date: '2026-10-28',
        startTime: '14:00',
        availableDurationMinutes: 60,
        hoursUntilSlotStarts: 4, // 4 hours until slot
      };

      const entries = [
        {
          id: 'wait_1',
          clientId: 'cli_1',
          clientName: 'Anne Hathaway',
          clientPhone: '(310) 555-0101',
          serviceId: 'srv_peel',
          serviceDurationMinutes: 60, // Exact fit
          preferredPractitionerId: 'prac_reed',
          minimumNoticeHoursRequired: 2, // 2h notice required (fits within 4h)
          isFlexibleTiming: true,
          joinedAtUtc: '2026-10-25T10:00:00Z',
        },
        {
          id: 'wait_2',
          clientId: 'cli_2',
          clientName: 'Zendaya Coleman',
          clientPhone: '(310) 555-0102',
          serviceId: 'srv_peel',
          serviceDurationMinutes: 60,
          preferredPractitionerId: 'prac_reed',
          minimumNoticeHoursRequired: 12, // Needs 12h notice! Inadequate notice for 4h slot
          isFlexibleTiming: false,
          joinedAtUtc: '2026-10-24T10:00:00Z',
        },
        {
          id: 'wait_3',
          clientId: 'cli_3',
          clientName: 'Gemma Chan',
          clientPhone: '(310) 555-0103',
          serviceId: 'srv_facial',
          serviceDurationMinutes: 45, // 45m fit (15m gap)
          minimumNoticeHoursRequired: 1,
          isFlexibleTiming: false,
          joinedAtUtc: '2026-10-26T10:00:00Z',
        },
      ];

      const ranked = rankWaitlistCandidatesForOpening(opening, entries);

      // Invariants: wait_2 filtered out due to 12h notice requirement; wait_1 ranked #1 due to exact duration & practitioner match
      expect(ranked.length).toBe(2);
      expect(ranked[0].entry.id).toBe('wait_1');
      expect(ranked[0].rank).toBe(1);
      expect(ranked[0].matchReasons).toContain('Exact schedule duration fit (0 gap)');
      expect(ranked[0].matchReasons).toContain('Preferred practitioner match');

      // Issue timed exclusive claim offer
      const offer = issueExclusiveWaitlistOffer(opening, ranked[0], 15);
      expect(offer.durationMinutesClaimWindow).toBe(15);
      expect(offer.status).toBe('exclusive_active');
    });
  });

  describe('Posie Core Logic - F137 (Intake and Note OCR Assistance)', () => {
    it('flags low-confidence and sensitive fields for triage and prevents committing unverified drafts', () => {
      const rawDetections = [
        { fieldKey: 'full_name', fieldLabel: 'Client Full Name', extractedValue: 'Maya Lin', confidenceScore: 0.98, isMedicallySensitive: false },
        { fieldKey: 'allergies', fieldLabel: 'Allergies & Sensitivities', extractedValue: 'Retin-A, Fragrance (unclear)', confidenceScore: 0.72, isMedicallySensitive: true },
        { fieldKey: 'treatment_history', fieldLabel: 'Past Peels', extractedValue: 'TCA 10% in 2025', confidenceScore: 0.88, isMedicallySensitive: false },
      ];

      const session = processOcrDocumentDraft('doc_ocr_1', 'paper_intake_form', 'file:///scans/scan_01.jpg', rawDetections);

      expect(session.status).toBe('draft_pending_human_verification');
      expect(session.triagePendingCount).toBe(2); // allergies (<0.9 & sensitive) and past peels (<0.9)
      expect(session.allFieldsVerified).toBe(false);

      // Invariant: cannot commit unverified draft
      expect(() => commitVerifiedOcrRecord(session, 'staff_1')).toThrow('Cannot commit unverified OCR draft');

      // Human verifies sensitive fields
      const step1 = verifyOcrField(session, 'allergies', 'Retin-A 0.05%, Synthetic Fragrance', 'staff_1');
      const step2 = verifyOcrField(step1, 'treatment_history', 'TCA 10% in June 2025', 'staff_1');

      expect(step2.triagePendingCount).toBe(0);
      expect(step2.allFieldsVerified).toBe(true);

      const committed = commitVerifiedOcrRecord(step2, 'staff_1');
      expect(committed.status).toBe('verified_and_committed');
      expect(committed.committedRecordId).toBeDefined();
    });
  });

  describe('Posie Core Logic - F138 (Business Branded Mobile App)', () => {
    it('builds branded app config matching web identity with zero exit fee guarantee', () => {
      const config = buildMobileAppConfig('Posie Beverly Hills Atelier', 'https://book.posieatelier.com', '#C47059');

      expect(config.appDisplayName).toBe('Posie Beverly Hills Atelier');
      expect(config.bundleIdentifier).toBe('com.posie.posiebeverlyhillsatelier');
      expect(config.primaryBrandColor).toBe('#C47059');
      expect(config.hasBiometricsEnabled).toBe(true);
      expect(config.customDomainUrl).toBe('https://book.posieatelier.com');

      const clientProfile = {
        clientId: 'cli_99',
        clientFullName: 'Zendaya Coleman',
        email: 'zendaya@example.com',
        isPushOptedIn: true,
        upcomingAppointmentsCount: 1,
        availableCareSummariesCount: 3,
      };

      const session = establishClientMobileSession(config, clientProfile, 'ios', true);
      expect(session.isBiometricAuthenticated).toBe(true);
      expect(session.dataExportAvailableUSD).toBe(0.0); // Rule DR06 zero extortion fee
      expect(session.activeNotificationBadgeCount).toBe(1);
    });
  });

  describe('Posie Core Logic - F139 (Multi Location Operations)', () => {
    it('manages cross-location entitlements and deduplicates shared clients in enterprise reporting', () => {
      // 1. Cross-location gift card redemption
      const card = {
        entitlementId: 'gc_100',
        type: 'gift_card' as const,
        issuedAtLocationId: 'loc_beverly',
        clientId: 'cli_1',
        originalValueOrCredits: 200.0,
        remainingBalance: 150.0,
        allowCrossLocationRedemption: true,
      };

      const redeemBeverly = validateCrossLocationRedemption(card, 'loc_beverly');
      expect(redeemBeverly.isEligible).toBe(true);

      const redeemSoho = validateCrossLocationRedemption(card, 'loc_soho');
      expect(redeemSoho.isEligible).toBe(true);

      // Restricted card
      const restrictedCard = { ...card, allowCrossLocationRedemption: false };
      const redeemBlocked = validateCrossLocationRedemption(restrictedCard, 'loc_soho');
      expect(redeemBlocked.isEligible).toBe(false);
      expect(redeemBlocked.reason).toContain('restricted from cross-location redemption');

      // 2. Enterprise consolidated reporting with unique client deduplication
      const locations = [
        {
          locationId: 'loc_beverly',
          locationName: 'Beverly Hills Atelier',
          grossRevenueUSD: 12500.0,
          appointmentsCount: 50,
          clientIdsServed: ['cli_1', 'cli_2', 'cli_3', 'cli_4'],
        },
        {
          locationId: 'loc_soho',
          locationName: 'Soho Manhattan Studio',
          grossRevenueUSD: 9800.0,
          appointmentsCount: 40,
          clientIdsServed: ['cli_1', 'cli_4', 'cli_5'], // cli_1 and cli_4 visited both!
        },
      ];

      const enterpriseReport = compileConsolidatedEnterpriseReport('Posie Global Group', locations);

      expect(enterpriseReport.totalEnterpriseGrossRevenueUSD).toBe(22300.0);
      expect(enterpriseReport.totalAppointmentsCount).toBe(90);
      // Invariant: Total unique clients deduplicated (cli_1 through cli_5 = 5 unique clients, not 7)
      expect(enterpriseReport.totalUniqueClientsCount).toBe(5);
      expect(enterpriseReport.clientCrossVisitationRatePercentage).toBeGreaterThan(0);
    });
  });

  describe('Posie Core Logic - F140 (Booth Renter Merchant Separation)', () => {
    it('routes destination split directly to renter account preventing funds co-mingling and firewalls client books', () => {
      const renterProfile = {
        renterId: 'renter_sienna',
        practitionerName: 'Sienna Woods',
        businessEntityName: 'Sienna Woods Esthetics LLC',
        stripeConnectAccountId: 'acct_renter_99182',
        payoutStatus: 'active_verified' as const,
        facilityRentAgreementType: 'percentage_facility_fee' as const,
        facilityFeePercentage: 10.0, // 10% facility fee to salon
        fixedRentBalanceDueUSD: 0,
        isClientDataFirewalled: true,
      };

      const checkoutLine = {
        serviceId: 'srv_facial',
        serviceName: 'Hydra-Dew Glass Facial',
        practitionerId: 'renter_sienna',
        isIndependentBoothRenter: true,
        renterConnectAccountId: 'acct_renter_99182',
        serviceAmountUSD: 150.0,
        tipAmountUSD: 30.0, // 100% tip goes to renter
      };

      const split = calculateBoothRenterSplit(checkoutLine, renterProfile);

      // Invariants: zero co-mingling, direct net transfer
      expect(split.totalCustomerPaidUSD).toBe(180.0);
      expect(split.renterGrossAmountUSD).toBe(150.0);
      expect(split.renterTipsUSD).toBe(30.0);
      expect(split.facilityFeeDeductionUSD).toBe(15.0); // 10% of $150
      expect(split.salonOperatingRevenueUSD).toBe(15.0);
      expect(split.renterDirectNetTransferUSD).toBe(165.0); // ($150 - $15) + $30 tip
      expect(split.destinationStripeAccountId).toBe('acct_renter_99182');
      expect(split.coMinglingPrevented).toBe(true);

      // Invariant: Client records privacy firewall
      const renterAccess = checkBoothRenterClientAccess('cli_private_1', 'renter_sienna', 'renter_sienna', false);
      expect(renterAccess.isAccessGranted).toBe(true);

      const ownerAccess = checkBoothRenterClientAccess('cli_private_1', 'renter_sienna', 'owner_salon', true);
      expect(ownerAccess.isAccessGranted).toBe(false);
      expect(ownerAccess.reason).toContain('Booth renters legally own their client lists');
    });
  });

  describe('Posie Core Logic - F141 (Embedded Payroll)', () => {
    const mockPartnerConfig = {
      provider: 'gusto_embedded' as const,
      partnerMerchantId: 'merch_posie_sf',
      environment: 'sandbox' as const,
      directTaxFilingsEnabled: true,
      webhookSecret: 'whsec_gusto_live_mock',
      accountableAdminId: 'staff_owner_elena',
    };

    const mockStaffLines = [
      {
        staffId: 'staff_maya',
        staffName: 'Maya Lin',
        employmentType: 'w2_hourly' as const,
        basePayCents: 150000, // $1,500.00
        commissionCents: 50000, // $500.00
        tipsDisbursedCents: 20000, // $200.00
        reimbursementsCents: 0,
        statutoryDeductions: {
          federalIncomeTaxCents: 25000,
          stateIncomeTaxCents: 10000,
          ficaMedicareCents: 2900,
          ficaSocialSecurityCents: 12400,
          healthBenefitsCents: 5000,
          wageGarnishmentsCents: 0,
        },
        directDepositAccountMask: '•••• 4412',
      },
      {
        staffId: 'staff_1099_leo',
        staffName: 'Leo Vance',
        employmentType: '1099_contractor' as const,
        basePayCents: 0,
        commissionCents: 180000, // $1,800.00
        tipsDisbursedCents: 30000, // $300.00
        reimbursementsCents: 5000, // $50.00
        statutoryDeductions: {
          federalIncomeTaxCents: 0,
          stateIncomeTaxCents: 0,
          ficaMedicareCents: 0,
          ficaSocialSecurityCents: 0,
          healthBenefitsCents: 0,
          wageGarnishmentsCents: 0,
        },
        directDepositAccountMask: '•••• 8831',
      },
    ];

    it('creates draft payroll run, computes net pay, employer FICA, and enforces approver signatures', () => {
      const run = createEmbeddedPayrollRun(
        'run_2026_10b',
        '2026-10-15',
        '2026-10-31',
        mockStaffLines,
        mockPartnerConfig,
        'staff_owner_elena'
      );

      expect(run.status).toBe('draft_preview');
      expect(run.staffLines).toHaveLength(2);

      // Maya W2: gross = 1500 + 500 + 200 = 2200 ($2,200). Deductions = 250 + 100 + 29 + 124 + 50 = $553 (55300 cents)
      // Net pay = 220000 - 55300 = 164700 ($1,647.00)
      const mayaLine = run.staffLines.find(l => l.staffId === 'staff_maya');
      expect(mayaLine?.netPayCents).toBe(164700);

      // Leo 1099: gross = 1800 + 300 + 50 = $2,150. Deductions = $0
      const leoLine = run.staffLines.find(l => l.staffId === 'staff_1099_leo');
      expect(leoLine?.netPayCents).toBe(215000);

      // Employer tax liability calculated for W-2 employee (7.65% of $2,000 base+comm)
      expect(run.summary.totalEmployerTaxLiabilityCents).toBeGreaterThan(0);

      // Submit with authorized signature
      const submittedRun = submitPayrollRunToPartner(
        run,
        { staffId: 'staff_owner_elena', staffName: 'Elena Rostova', ipAddress: '192.168.1.42' },
        mockPartnerConfig
      );

      expect(submittedRun.status).toBe('submitted_to_partner');
      expect(submittedRun.approvalSignature?.approvedByName).toBe('Elena Rostova');
      expect(submittedRun.partnerSubmission?.partnerConfirmationCode).toContain('GUSTO-ACK');

      // Accountable retroactive correction: Maya missed $100 tip payout
      const correctedRun = recordPayrollCorrection(
        submittedRun,
        'staff_maya',
        10000,
        'Retroactive adjustment: client cash tip omitted from terminal batch',
        'staff_owner_elena'
      );

      expect(correctedRun.status).toBe('filing_exception_flagged'); // Mandates partner filing sync
      expect(correctedRun.corrections).toHaveLength(1);
      expect(correctedRun.corrections[0].differenceCents).toBe(10000);
      expect(correctedRun.staffLines.find(l => l.staffId === 'staff_maya')?.netPayCents).toBe(174700);
    });
  });

  describe('Posie Core Logic - F142 (Offline Operational Changes)', () => {
    it('queues permitted offline actions, prevents double billing on reconcile, and flags remote conflict triage', () => {
      let queue = initOfflineOperationalQueue('ipad_frontdesk_01', true);
      expect(queue.isOffline).toBe(true);

      // Invariant: Risky destructive action forbidden offline
      expect(() => {
        queueOfflineOperationalAction(queue, {
          type: 'client_checkin',
          payload: { refundCents: 5000 },
        });
      }).toThrow(/forbidden offline/i);

      // Queue valid check-in and service completion
      queue = queueOfflineOperationalAction(queue, {
        type: 'client_checkin',
        payload: { appointmentId: 'appt_101', clientName: 'Chloe Dupont' },
      });

      // Queue action for appointment that was cancelled online while salon was disconnected
      queue = queueOfflineOperationalAction(queue, {
        type: 'service_complete',
        payload: { appointmentId: 'appt_cancelled_remotely', clientName: 'Devon Smith' },
      });

      // Queue deferred card capture
      queue = queueOfflineOperationalAction(queue, {
        type: 'offline_payment_capture',
        payload: { appointmentId: 'appt_101', amountCents: 12500, cardToken: 'tok_offline_reader' },
      });

      expect(queue.pendingCount).toBe(3);

      // Reconnection simulation
      const serverAppointments = [
        {
          appointmentId: 'appt_101',
          currentStatus: 'confirmed' as const,
          updatedAt: '2026-10-27T10:00:00Z',
          clientId: 'cli_chloe',
          assignedStaffId: 'staff_maya',
        },
        {
          appointmentId: 'appt_cancelled_remotely',
          currentStatus: 'cancelled' as const, // Client cancelled online during studio outage
          updatedAt: '2026-10-27T10:15:00Z',
          clientId: 'cli_devon',
          assignedStaffId: 'staff_elena',
        },
      ];

      const { updatedQueue, reconciledCount, conflictedCount } = reconcileOfflineOperationalQueue(queue, serverAppointments);

      expect(reconciledCount).toBe(2); // appt_101 checkin + offline payment capture
      expect(conflictedCount).toBe(1); // appt_cancelled_remotely flagged for conflict
      expect(updatedQueue.isOffline).toBe(false);

      const conflictItem = updatedQueue.queuedActions.find(a => a.status === 'conflict_flagged');
      expect(conflictItem?.conflictDetails?.conflictType).toBe('remote_cancellation');
      expect(conflictItem?.conflictDetails?.requiresStaffTriage).toBe(true);

      // Staff triage resolution
      const resolvedQueue = resolveOfflineOperationalConflict(
        updatedQueue,
        conflictItem!.actionId,
        'discard_offline_action',
        'staff_maya',
        'Client cancelled appointment via online portal during internet outage; confirmed service was not provided.'
      );

      expect(resolvedQueue.conflictsCount).toBe(0);
      expect(resolvedQueue.queuedActions.find(a => a.actionId === conflictItem!.actionId)?.status).toBe('rejected_invalid');
    });
  });

  describe('Posie Core Logic - F143 (Schedule Optimization)', () => {
    it('analyzes appointment schedule, respects weekly contribution floor, and generates day-off consolidation suggestions', () => {
      const mockGoal = {
        targetDaysOff: ['Friday'],
        maxDailySpanMinutes: 420,
        weeklyContributionFloorCents: 150000, // $1,500.00 floor
        mandatoryBreakMinutes: 30,
      };

      const mockSlots = [
        // Thursday appointments
        {
          appointmentId: 'appt_thurs_1',
          clientName: 'Alice M.',
          serviceName: 'HydraFacial Luxe',
          dayOfWeek: 'Thursday',
          startTime: '10:00',
          endTime: '11:15',
          durationMinutes: 75,
          revenueCents: 22000,
          contributionCents: 18000,
          clientFlexibilityMinutes: 0,
          isLockedByClient: true,
        },
        // Fragmented dead gap (11:15 to 11:35 = 20 mins)
        {
          appointmentId: 'appt_thurs_2',
          clientName: 'Bria K.',
          serviceName: 'Brow Lamination',
          dayOfWeek: 'Thursday',
          startTime: '11:35',
          endTime: '12:20',
          durationMinutes: 45,
          revenueCents: 11000,
          contributionCents: 9000,
          clientFlexibilityMinutes: 30,
          isLockedByClient: false,
        },
        // Friday appointment (practitioner wants Friday off!)
        {
          appointmentId: 'appt_fri_1',
          clientName: 'Clara S.',
          serviceName: 'Full Balayage & Glaze',
          dayOfWeek: 'Friday',
          startTime: '10:00',
          endTime: '12:30',
          durationMinutes: 150,
          revenueCents: 35000,
          contributionCents: 28000,
          clientFlexibilityMinutes: 60,
          isLockedByClient: false,
        },
      ];

      const plan = generateScheduleOptimizationPlan('2026-11-02', mockSlots, mockGoal);

      expect(plan.baselineMetrics.deadGapMinutes).toBe(20);
      expect(plan.projectedMetrics.meetsContributionFloor).toBe(false); // Total is only $550 vs $1,500 floor

      // Suggestions should propose compacting the 20m awkward gap and shifting Clara from Friday to Thursday
      const gapSuggestion = plan.suggestions.find(s => s.type === 'compact_awkward_gap');
      expect(gapSuggestion).toBeDefined();
      expect(gapSuggestion?.proposedTime).toBe('11:15'); // Pull forward to close gap

      const dayOffSuggestion = plan.suggestions.find(s => s.type === 'consolidate_day_off');
      expect(dayOffSuggestion).toBeDefined();
      expect(dayOffSuggestion?.currentDay).toBe('Friday');
      expect(dayOffSuggestion?.proposedDay).toBe('Thursday');

      // Apply gap suggestion
      const { updatedAppointments, auditReceipt } = applyOptimizationSuggestion(mockSlots, gapSuggestion!, 'staff_elena');
      const updatedBria = updatedAppointments.find(a => a.appointmentId === 'appt_thurs_2');
      expect(updatedBria?.startTime).toBe('11:15');
      expect(updatedBria?.endTime).toBe('12:00');
      expect(auditReceipt).toContain('Optimization suggestion');
    });
  });

  describe('Posie Core Logic - F144 (Mobile Service Routes)', () => {
    const mockZoneConfig = {
      baseLocationName: 'Posie Flagship Atelier',
      baseLatitude: 37.7891,
      baseLongitude: -122.4014,
      baseAddress: '100 Maiden Lane, San Francisco, CA',
      freeTravelRadiusMiles: 10,
      perMileRateCents: 200, // $2.00/mile
      fixedBaseTravelFeeCents: 3000, // $30.00
      maxServiceRadiusMiles: 40,
      defaultSetupBufferMinutes: 15,
      defaultTeardownBufferMinutes: 15,
    };

    it('calculates mileage travel fees, compiles multi-stop itinerary, and evaluates traffic delay client alerts', () => {
      // 8 miles (within free radius) -> only fixed base fee
      const feeUnder = calculateMobileTravelFee(8, mockZoneConfig);
      expect(feeUnder.isWithinServiceArea).toBe(true);
      expect(feeUnder.travelFeeCents).toBe(3000);
      expect(feeUnder.billableMiles).toBe(0);

      // 25 miles (15 billable miles @ $2.00/mi = $30.00 + $30.00 base = $60.00)
      const feeOver = calculateMobileTravelFee(25, mockZoneConfig);
      expect(feeOver.isWithinServiceArea).toBe(true);
      expect(feeOver.travelFeeCents).toBe(6000);
      expect(feeOver.billableMiles).toBe(15);

      // 55 miles (exceeds max radius)
      const feeExcess = calculateMobileTravelFee(55, mockZoneConfig);
      expect(feeExcess.isWithinServiceArea).toBe(false);

      // Build itinerary
      const candidateStops = [
        {
          stopId: 'stop_1_bridal_party',
          clientId: 'cli_bride_sara',
          clientName: 'Sara Kensington',
          clientPhone: '415-555-0199',
          destinationAddress: 'The Fairmont Penthouse, San Francisco',
          distanceFromPriorStopMiles: 5,
          estimatedTravelMinutes: 20,
          serviceDurationMinutes: 180,
          scheduledArrivalWindowStart: '08:00',
          scheduledArrivalWindowEnd: '08:15',
          serviceFeeCents: 65000,
        },
        {
          stopId: 'stop_2_inhome_facial',
          clientId: 'cli_gemma',
          clientName: 'Gemma Ward',
          clientPhone: '415-555-0288',
          destinationAddress: '2400 Pacific Ave, San Francisco',
          distanceFromPriorStopMiles: 18,
          estimatedTravelMinutes: 35,
          serviceDurationMinutes: 60,
          scheduledArrivalWindowStart: '13:00',
          scheduledArrivalWindowEnd: '13:15',
          serviceFeeCents: 22000,
        },
      ];

      const itinerary = buildMobileRouteItinerary('prov_daniela', 'Daniela Cruz', '2026-11-05', mockZoneConfig, candidateStops);
      expect(itinerary.stops).toHaveLength(2);
      expect(itinerary.totalEarningsCents.combinedTotalCents).toBeGreaterThan(87000);
      expect(itinerary.totalSetupTeardownMinutes).toBe(60); // (15+15) * 2 stops

      // Minor traffic delay (3 mins) -> suppressed
      const minorRes = evaluateTrafficDelayAlert(itinerary, 0, 3);
      expect(minorRes.alertGenerated).toBe(false);

      // Significant traffic delay (15 mins) -> creates client SMS alert
      const majorRes = evaluateTrafficDelayAlert(itinerary, 0, 15);
      expect(majorRes.alertGenerated).toBe(true);
      expect(majorRes.notification?.revisedEta).toBe('08:15');
      expect(majorRes.notification?.notificationMessage).toContain('Sara Kensington');
      expect(majorRes.notification?.notificationMessage).toContain('+15m');
    });
  });

  describe('Posie Core Logic - F145 (Constrained AI Receptionist)', () => {
    const mockKb = {
      studioName: 'Posie Maison San Francisco',
      businessHours: {
        monday: { open: '09:00 AM', close: '07:00 PM' },
        friday: { open: '09:00 AM', close: '08:00 PM' },
      },
      location: {
        address: '450 Sutter St, Suite 1200, San Francisco, CA',
        parkingInstructions: 'Valet parking available at Sutter Stockton Garage.',
        landmarks: 'Near Union Square across from the Olympic Club.',
      },
      cancellationPolicy: {
        summary: '24-hour advance notice is required to cancel or reschedule without penalty.',
        gracePeriodHours: 24,
        feePercentage: 50,
      },
      approvedServices: [
        {
          id: 'srv_signature_facial',
          name: 'Signature Bespoke Facial',
          priceCents: 19500,
          durationMinutes: 60,
          description: 'Custom botanical exfoliation, targeted extractions, and LED phototherapy.',
        },
      ],
      approvedFaq: [
        {
          keywords: ['wifi', 'internet'],
          answerText: 'Complimentary high-speed WiFi is available for all atelier guests: network "PosieGuest".',
        },
      ],
    };

    it('answers verified business hours, prices, routes safety queries to urgent triage, and requires PIN verification before booking', () => {
      let caller = {
        callerPhone: '415-555-8811',
        isRegisteredClient: true,
        clientId: 'cli_hannah',
        clientName: 'Hannah Vance',
        verifiedSession: false,
        verificationMethod: 'unverified' as const,
      };

      // 1. Business hours query
      const hoursRes = processReceptionistQuery('What are your hours on Monday?', caller, mockKb);
      expect(hoursRes.intent).toBe('query_hours');
      expect(hoursRes.responseSpeech).toContain('09:00 AM to 07:00 PM');
      expect(hoursRes.requiresHumanHandoff).toBe(false);

      // 2. Service pricing query (matches approved catalog)
      const priceRes = processReceptionistQuery('How much does the Signature Bespoke Facial cost?', caller, mockKb);
      expect(priceRes.intent).toBe('query_service_pricing');
      expect(priceRes.responseSpeech).toContain('$195.00');
      expect(priceRes.responseSpeech).toContain('60 minutes');

      // 3. Clinical health / allergy question (Safety invariant: MUST trigger urgent human handoff)
      const medRes = processReceptionistQuery('I have a severe retinol allergy and had swelling after last time', caller, mockKb);
      expect(medRes.intent).toBe('medical_contraindication_query');
      expect(medRes.requiresHumanHandoff).toBe(true);
      expect(medRes.handoffUrgency).toBe('urgent_escalation');
      expect(medRes.staffTriageTicket?.reason).toContain('health or allergy');

      // 4. Booking query with unverified session prompts for OTP PIN
      const bookUnverified = processReceptionistQuery('I want to book an appointment for tomorrow', caller, mockKb);
      expect(bookUnverified.intent).toBe('request_booking');
      expect(bookUnverified.responseSpeech).toContain('verification code');

      // Verify OTP PIN
      caller = verifyCallerIdentity(caller, '4921', '4921');
      expect(caller.verifiedSession).toBe(true);

      // Booking query with verified session reserves slot
      const bookVerified = processReceptionistQuery(
        'I want to book an appointment',
        caller,
        mockKb,
        [{ time: 'Tomorrow 2:00 PM', providerName: 'Elena Rostova' }]
      );
      expect(bookVerified.intent).toBe('request_booking');
      expect(bookVerified.executedAction?.type).toBe('slot_reserved');
      expect(bookVerified.executedAction?.summary).toContain('Elena Rostova');

      // 5. Unknown inquiry: does not hallucinate; creates staff triage ticket
      const unkRes = processReceptionistQuery('Do you offer laser tattoo removal on pets?', caller, mockKb);
      expect(unkRes.intent).toBe('unknown_inquiry');
      expect(unkRes.requiresHumanHandoff).toBe(true);
      expect(unkRes.staffTriageTicket?.reason).toContain('outside approved receptionist knowledge base');
    });
  });

  describe('Posie Core Logic - F146 (Reliable Booking Across Channels)', () => {
    it('maintains single reservation identity across channel handoffs, generates receipts, and prevents duplicates', () => {
      // 1. Client starts on Voice AI
      let session = initiateCrossChannelSession('cli_sara_99', '415-555-7722', 'voice_ai');
      expect(session.originatingChannel).toBe('voice_ai');
      expect(session.currentChannel).toBe('voice_ai');
      expect(session.status).toBe('intent_in_progress');

      // 2. Provisional hold created via Voice AI
      const serviceDetails = {
        serviceId: 'srv_signature_facial',
        serviceName: 'Signature Bespoke Facial',
        providerId: 'prov_maya',
        providerName: 'Maya Lin',
        startIso: '2026-11-10T14:00:00Z',
        durationMinutes: 60,
        priceCents: 19500,
      };

      const holdRes = executeChannelBookingAction(session, 'create_hold', serviceDetails, 'voice_ai', 'idemp_hold_1');
      session = holdRes.updatedSession;
      expect(session.status).toBe('held_provisional');
      expect(session.activeReservationId).toBeDefined();
      expect(holdRes.receipt.action).toBe('create_hold');

      const initialReservationId = session.activeReservationId;

      // 3. Client hangs up and completes confirmation via SMS interactive link
      const switchSms = switchSessionChannel(session, 'sms_interactive');
      session = switchSms.updatedSession;
      expect(session.currentChannel).toBe('sms_interactive');
      expect(session.channelHandoffs).toHaveLength(1);
      expect(session.channelHandoffs[0].fromChannel).toBe('voice_ai');
      expect(session.channelHandoffs[0].toChannel).toBe('sms_interactive');

      // Confirm via SMS
      const confirmRes = executeChannelBookingAction(session, 'confirm_booking', serviceDetails, 'sms_interactive', 'idemp_conf_1');
      session = confirmRes.updatedSession;
      expect(session.status).toBe('confirmed');
      // Invariant: MUST preserve the exact same reservation ID, NEVER creating a phantom duplicate
      expect(session.activeReservationId).toBe(initialReservationId);
      expect(confirmRes.receipt.channel).toBe('sms_interactive');

      // 4. Later, client opens Web Portal to reschedule
      const switchWeb = switchSessionChannel(session, 'web_portal');
      session = switchWeb.updatedSession;
      expect(session.currentChannel).toBe('web_portal');
      expect(session.channelHandoffs).toHaveLength(2);

      const rescheduleDetails = {
        ...serviceDetails,
        startIso: '2026-11-10T16:30:00Z',
      };

      const rescheduleRes = executeChannelBookingAction(session, 'reschedule_slot', rescheduleDetails, 'web_portal', 'idemp_resched_1');
      session = rescheduleRes.updatedSession;
      expect(session.status).toBe('rescheduled');
      expect(session.activeReservationId).toBe(initialReservationId);
      expect(rescheduleRes.receipt.changesSummary).toContain('16:30:00Z');
    });
  });

  describe('Posie Core Logic - F147 (Screen-Aware Assistant)', () => {
    it('understands active record context, validates role permissions, declines unauthorized actions, and enforces confirmation on consequential diffs', () => {
      const mockCheckoutContext = {
        screenName: 'checkout_ticket' as const,
        activeRecordId: 'tkt_8819',
        activeRecordType: 'ticket' as const,
        recordSnapshot: {
          ticketId: 'tkt_8819',
          clientName: 'Julianne Moore',
          totalCents: 20000,
          discountPercentage: 0,
        },
        operatorRole: 'front_desk_coordinator' as const,
        operatorStaffId: 'staff_reception_amy',
        operatorName: 'Amy Pond',
      };

      // 1. Front desk attempts to apply discount (Consequential financial action restricted to manager/owner)
      const unauthPreview = evaluateScreenAssistantRequest(mockCheckoutContext, 'Give client a 20% discount');
      expect(unauthPreview.status).toBe('declined_unauthorized');
      expect(unauthPreview.declineReason).toContain('lacks permissions');

      // 2. Salon owner requests 15% discount on checkout ticket
      const ownerContext = {
        ...mockCheckoutContext,
        operatorRole: 'salon_owner' as const,
        operatorStaffId: 'staff_owner_elena',
        operatorName: 'Elena Rostova',
      };

      const ownerPreview = evaluateScreenAssistantRequest(ownerContext, 'Apply 15% discount for first visit');
      expect(ownerPreview.status).toBe('pending_confirmation');
      expect(ownerPreview.isConsequential).toBe(true);
      expect(ownerPreview.requiresExplicitConfirmation).toBe(true);
      expect(ownerPreview.diffItems).toHaveLength(2);
      expect(ownerPreview.diffItems[1].proposedValue).toBe(17000); // $200 -> $170

      // Consequential execution rejected by operator
      const rejectedResult = confirmAndExecuteAssistantAction(ownerPreview, ownerContext, false);
      expect(rejectedResult.rejectionNotice).toContain('rejected');
      expect(rejectedResult.updatedRecord.totalCents).toBe(20000);

      // Consequential execution confirmed by operator
      const approvedResult = confirmAndExecuteAssistantAction(ownerPreview, ownerContext, true);
      expect(approvedResult.updatedRecord.totalCents).toBe(17000);
      expect(approvedResult.auditLog?.isConsequential).toBe(true);
      expect(approvedResult.auditLog?.operatorStaffId).toBe('staff_owner_elena');

      // 3. Non-consequential hospitality update (valid for any role)
      const profileContext = {
        screenName: 'client_profile' as const,
        activeRecordId: 'cli_julianne',
        activeRecordType: 'client' as const,
        recordSnapshot: { clientId: 'cli_julianne', hospitalityNotes: '' },
        operatorRole: 'front_desk_coordinator' as const,
        operatorStaffId: 'staff_reception_amy',
        operatorName: 'Amy Pond',
      };

      const hospPreview = evaluateScreenAssistantRequest(profileContext, 'Client loves oat milk matcha latte');
      expect(hospPreview.status).toBe('executed_immediately');
      expect(hospPreview.isConsequential).toBe(false);
      expect(hospPreview.proposedSnapshot.hospitalityNotes).toContain('matcha latte');
    });
  });

  describe('Posie Core Logic - F148 (Draft Notes from Dictation)', () => {
    const mockProvenance = {
      audioRecordingId: 'rec_audio_991',
      durationSeconds: 120,
      clientConsentDocumentId: 'consent_audio_julianne',
      recordedAt: '2026-11-01T15:00:00Z',
      practitionerStaffId: 'staff_daniela',
    };

    it('transcribes dictation into structured SOAP draft, flags phonetic clinical terms, allows section revision, and mandates license signoff', () => {
      const rawDictation = `
        Subjective: Client reports mild dehydration and sensitivity to winter air.
        Objective: Evident mild localized erythema across cheeks. Skin barrier looks compromised.
        Assessment: Impaired stratum corneum barrier. Recommended avoiding tretinoin for 5 days.
        Plan: Custom calming hyaluronic infusion and soothing lipid barrier balm. Follow up next month.
      `;

      const draft = generateDictationNoteDraft('draft_note_1', 'appt_881', 'cli_julianne', rawDictation, mockProvenance);

      expect(draft.status).toBe('triage_flagged'); // "erythema", "tretinoin", "hyaluronic" detected
      expect(draft.sections.subjective.content).toContain('mild dehydration');
      expect(draft.sections.objective.flaggedUncertainTerms).toContain('erythema');
      expect(draft.sections.assessment.flaggedUncertainTerms).toContain('tretinoin');

      // Invariant: Cannot finalize/sign note with active unverified clinical triage flags
      expect(() => {
        signAndFinalizeDictationNote(draft, {
          signedByStaffId: 'staff_daniela',
          signedByName: 'Daniela Cruz, LE',
          licenseNumber: 'LE-CA-88192',
          ipAddress: '192.168.1.10',
        });
      }).toThrow(/unresolved phonetic clinical triage flags/i);

      // Practitioner reviews and updates the sections, clearing triage flags
      let updatedDraft = updateSoapSection(draft, 'objective', 'Evident mild localized erythema across cheeks verified by practitioner.', 'staff_daniela');
      updatedDraft = updateSoapSection(updatedDraft, 'assessment', 'Impaired stratum corneum barrier. Verified avoiding tretinoin for 5 days.', 'staff_daniela');
      updatedDraft = updateSoapSection(updatedDraft, 'plan', 'Custom calming hyaluronic infusion and barrier balm.', 'staff_daniela');

      expect(updatedDraft.status).toBe('unfinalized_draft');

      // Now sign note with valid license
      const signedNote = signAndFinalizeDictationNote(updatedDraft, {
        signedByStaffId: 'staff_daniela',
        signedByName: 'Daniela Cruz, LE',
        licenseNumber: 'LE-CA-88192',
        ipAddress: '192.168.1.10',
      });

      expect(signedNote.status).toBe('practitioner_signed');
      expect(signedNote.practitionerSignature?.licenseNumber).toBe('LE-CA-88192');

      // Locked: cannot edit signed clinical note
      expect(() => {
        updateSoapSection(signedNote, 'subjective', 'New note', 'staff_daniela');
      }).toThrow(/already been signed/i);
    });
  });

  describe('Posie Core Logic - F149 (Ask Questions of Business Data)', () => {
    it('answers queries using official metric definitions, honors filters, and reports insufficient data rather than hallucinating', () => {
      const mockDataset = [
        { recordId: 'r1', metricId: 'direct_contribution_margin_pct' as const, date: '2026-10-05', value: 72 },
        { recordId: 'r2', metricId: 'direct_contribution_margin_pct' as const, date: '2026-10-12', value: 68 },
        { recordId: 'r3', metricId: 'direct_contribution_margin_pct' as const, date: '2026-10-19', value: 75 },
        { recordId: 'r4', metricId: 'direct_contribution_margin_pct' as const, date: '2026-10-26', value: 71 },
        { recordId: 'r5', metricId: 'direct_contribution_margin_pct' as const, date: '2026-10-28', value: 74 },
        { recordId: 'r6', metricId: 'rebooking_rate_at_checkout' as const, date: '2026-10-05', value: 62 },
        { recordId: 'r7', metricId: 'rebooking_rate_at_checkout' as const, date: '2026-10-12', value: 58 },
      ];

      // 1. Contribution margin query with sufficient sample size (5 records)
      const filterSufficient = { startDate: '2026-10-01', endDate: '2026-10-31' };
      const answer = executeGovernedDataQuery('What is our direct contribution margin this month?', filterSufficient, mockDataset);

      expect(answer.isDataSufficient).toBe(true);
      expect(answer.metricMeta.metricId).toBe('direct_contribution_margin_pct');
      expect(answer.sampleSize).toBe(5);
      expect(answer.computedValueNumeric).toBe(72);
      expect(answer.formattedDisplayValue).toBe('72.0%');
      expect(answer.reproducibleReportLink).toContain('direct_contribution_margin_pct');

      // 2. Rebooking rate query with insufficient sample size (only 2 records vs minimum 5)
      const answerInsufficient = executeGovernedDataQuery('What was our rebooking rate at checkout?', filterSufficient, mockDataset);
      expect(answerInsufficient.isDataSufficient).toBe(false);
      expect(answerInsufficient.formattedDisplayValue).toBe('Insufficient Data');
      expect(answerInsufficient.explanationText).toContain('A minimum of 5 records is required');
    });
  });

  describe('Posie Core Logic - F150 (Forecast Demand and Staffing)', () => {
    it('estimates demand with 80% confidence uncertainty intervals, compares against moving baseline, and degrades gracefully for cold starts', () => {
      const mockHistory = [
        { weekLabel: 'Week 40', completedAppointments: 45, cancellationsAndNoShows: 5, staffedHours: 55, revenueCents: 607500 },
        { weekLabel: 'Week 41', completedAppointments: 48, cancellationsAndNoShows: 6, staffedHours: 60, revenueCents: 648000 },
        { weekLabel: 'Week 42', completedAppointments: 52, cancellationsAndNoShows: 7, staffedHours: 65, revenueCents: 702000 },
        { weekLabel: 'Week 43', completedAppointments: 50, cancellationsAndNoShows: 6, staffedHours: 62, revenueCents: 675000 },
      ];

      // 1. Forecast for established studio (4 weeks history)
      const forecast = generateDemandStaffingForecast('studio_sf_01', 'upcoming_30_days', mockHistory);
      expect(forecast.isColdStartBusiness).toBe(false);
      expect(forecast.buckets).toHaveLength(4);
      expect(forecast.buckets[0].uncertaintyInterval.confidenceLevelPct).toBe(80);
      expect(forecast.buckets[0].uncertaintyInterval.lowerBound).toBeLessThan(forecast.buckets[0].expectedAppointments);
      expect(forecast.buckets[0].uncertaintyInterval.upperBound).toBeGreaterThan(forecast.buckets[0].expectedAppointments);
      expect(forecast.buckets[0].simpleBaselineEstimate).toBe(49); // avg of 45, 48, 52, 50
      expect(forecast.aggregateSummary.totalExpectedAppointments).toBeGreaterThan(180);
      expect(forecast.aggregateSummary.totalRecommendedStaffHours).toBeGreaterThan(200);

      // 2. Cold-start studio with only 1 week of history
      const coldStartHistory = [
        { weekLabel: 'Week 1', completedAppointments: 20, cancellationsAndNoShows: 2, staffedHours: 25, revenueCents: 270000 },
      ];
      const coldForecast = generateDemandStaffingForecast('studio_new_01', 'upcoming_7_days', coldStartHistory);
      expect(coldForecast.isColdStartBusiness).toBe(true);
      expect(coldForecast.modelDegradationNotice).toContain('Limited history');
      expect(coldForecast.modelDegradationNotice).toContain('Uncertainty intervals widened');
      expect(coldForecast.buckets).toHaveLength(7);
    });
  });

  describe('Posie Core Logic - F151 (What-If Business Planning)', () => {
    const mockBaseline = {
      weeklyServiceRevenueCents: 500000, // $5,000.00
      weeklyRetailRevenueCents: 80000, // $800.00
      weeklyLaborCostCents: 200000, // $2,000.00
      weeklyProductCostCents: 45000, // $450.00
      weeklyOperatingOverheadCents: 55000, // $550.00
      weeklyOwnerHoursWorked: 48,
      weeklyDirectContributionCents: 280000, // $2,800.00
    };

    it('simulates financial tradeoffs, protects owner time off, and verifies contribution floor preservation', () => {
      // Scenario A: Raise prices 15%, slight 5% volume elasticity, hire assistant ($500/wk) to cut owner hours to 32h
      const assumptionsA = {
        scenarioName: 'Balanced Growth & 4-Day Work Week',
        targetDaysOff: ['Sunday', 'Monday', 'Friday'],
        targetOwnerMaxHoursPerWeek: 32,
        priceAdjustmentPercentage: 15,
        serviceVolumeMultiplier: 0.95,
        staffHeadcountDelta: 1,
        additionalWeeklyLaborCostCents: 50000, // $500.00
        minimumWeeklyContributionFloorCents: 250000, // $2,500.00 floor
      };

      const outcomeA = simulateWhatIfScenario(mockBaseline, assumptionsA);

      expect(outcomeA.meetsContributionFloor).toBe(true);
      expect(outcomeA.ownerWorkload.targetTimeOffAchieved).toBe(true);
      expect(outcomeA.ownerWorkload.hoursSavedPerWeek).toBeGreaterThanOrEqual(16);
      expect(outcomeA.projectedFinancials.netContributionCents).toBeGreaterThan(250000);
      expect(outcomeA.tradeoffSummary).toContain('Balanced Win');

      // Scenario B: Drop prices 20% to drive volume (+10%), but contribution fails floor
      const assumptionsB = {
        scenarioName: 'Discount Volume Push',
        targetDaysOff: ['Sunday'],
        targetOwnerMaxHoursPerWeek: 50,
        priceAdjustmentPercentage: -20,
        serviceVolumeMultiplier: 1.10,
        staffHeadcountDelta: 0,
        additionalWeeklyLaborCostCents: 0,
        minimumWeeklyContributionFloorCents: 250000,
      };

      const outcomeB = simulateWhatIfScenario(mockBaseline, assumptionsB);
      expect(outcomeB.meetsContributionFloor).toBe(false);

      // Compare scenarios
      const comparison = compareWhatIfScenarios([outcomeA, outcomeB]);
      expect(comparison.bestMarginScenario).toBe('Balanced Growth & 4-Day Work Week');
      expect(comparison.bestTimeOffScenario).toBe('Balanced Growth & 4-Day Work Week');
      expect(comparison.comparisonTable).toHaveLength(2);
    });
  });

  describe('Posie Core Logic - F152 (Measured Growth Experiments)', () => {
    it('enforces owner approval, splits cohorts into randomized holdouts, and detects true causal uplift vs cannibalization', () => {
      // 1. Create experiment config
      const expConfig = createGrowthExperiment(
        {
          title: 'Off-Peak Thursday 15% Courtesy Incentive',
          type: 'off_peak_promotional_offer',
          holdoutPercentage: 50,
          minimumSampleSize: 20,
          contributionFloorCents: 6500,
          approvedByOwnerStaffId: 'staff_owner_elena',
          startDate: '2026-11-01',
          endDate: '2026-11-28',
          hypothesis: 'Offering 15% off on Thursday afternoon fills open slots without eroding full-price regulars.',
        },
        'staff_owner_elena'
      );

      expect(expConfig.experimentId).toBeDefined();

      // 2. Cohort assignment distribution
      const assignment1 = assignClientToExperiment(expConfig, 'cli_101');
      const assignment2 = assignClientToExperiment(expConfig, 'cli_102');
      expect(['treatment', 'control_holdout']).toContain(assignment1);
      expect(['treatment', 'control_holdout']).toContain(assignment2);

      // 3. Evaluate results with sufficient sample size and positive causal uplift
      const mockCohort: any[] = [];
      // 25 treatment clients: 16 completed (64%), high contribution, low opt-out
      for (let i = 0; i < 25; i++) {
        mockCohort.push({
          clientId: `treat_${i}`,
          assignment: 'treatment',
          completedAppointment: i < 16,
          revenueCents: 12000,
          discountAppliedCents: 1800,
          directContributionCents: i < 16 ? 7500 : 0,
          unsubscribedOrOptedOut: i === 0, // 1 opt-out (4%)
        });
      }
      // 25 control holdouts: 10 completed (40%), 1 opt-out (4%)
      for (let i = 0; i < 25; i++) {
        mockCohort.push({
          clientId: `ctrl_${i}`,
          assignment: 'control_holdout',
          completedAppointment: i < 10,
          revenueCents: 12000,
          discountAppliedCents: 0,
          directContributionCents: i < 10 ? 8200 : 0,
          unsubscribedOrOptedOut: i === 0, // 1 opt-out (4%)
        });
      }

      const report = evaluateGrowthExperimentResults(expConfig, mockCohort);

      expect(report.status).toBe('completed_statistically_significant');
      expect(report.isCausalUpliftConfirmed).toBe(true);
      expect(report.conversionRates.upliftPct).toBe(24.0); // 64% vs 40%
      expect(report.contributionMetrics.netIncrementalContributionCents).toBeGreaterThan(0);
      expect(report.recommendation).toContain('Adopt strategy');
    });
  });

  describe('Posie Core Logic - F153 (Cancellation Policy Simulator)', () => {
    const mockBaseline = {
      monthlyInquiriesCount: 400,
      historicalCheckoutConversionPct: 75, // 300 bookings
      monthlyCompletedVisitsCount: 250,
      monthlyLateCancellationsCount: 35,
      monthlyNoShowsCount: 15,
      averageServicePriceCents: 15000, // $150.00
      averageDirectContributionCents: 11000, // $110.00
    };

    it('simulates conversion drop vs recovered funds and identifies net positive policy terms', () => {
      // 1. Moderate fixed deposit ($30) with 24h notice window
      const moderateTerms = {
        policyName: 'Moderate $30 Deposit with 24h Notice',
        depositType: 'fixed_deposit' as const,
        depositValue: 3000, // $30.00
        cancellationWindowHours: 24,
        lateCancellationFeePercentage: 50,
      };

      const modResult = simulateCancellationPolicyImpact(mockBaseline, moderateTerms);
      expect(modResult.funnelImpact.conversionFrictionDropPct).toBe(3.5);
      expect(modResult.attendanceImpact.projectedNoShows).toBeLessThan(15);
      expect(modResult.financialOutcome.forfeitedDepositsCollectedCents).toBeGreaterThan(0);
      expect(modResult.verdict).toBe('net_positive_gain');

      // 2. Extreme full prepayment (100% deposit) with 48h notice
      const extremeTerms = {
        policyName: 'Extreme 100% Prepayment',
        depositType: 'percentage_deposit' as const,
        depositValue: 100, // 100%
        cancellationWindowHours: 48,
        lateCancellationFeePercentage: 100,
      };

      const extremeResult = simulateCancellationPolicyImpact(mockBaseline, extremeTerms);
      expect(extremeResult.funnelImpact.conversionFrictionDropPct).toBe(20.0); // 20% conversion drop
      expect(extremeResult.verdict).toBe('net_negative_drop');
      expect(extremeResult.advisoryNote).toContain('Overly Restrictive');
    });
  });

  describe('Posie Core Logic - F154 (Service Match Assistant)', () => {
    const mockCatalog = [
      {
        serviceId: 'srv_hydra_dew',
        name: 'Hydra-Dew Glass Glow Facial',
        priceCents: 14000,
        durationMinutes: 60,
        category: 'facial' as const,
        targetConcerns: ['dry skin', 'dehydration', 'dullness', 'texture'],
        suitableSkinHairTypes: ['Sensitive Fitzpatrick II', 'Dry', 'Combination'],
        contraindicatedConditions: ['open wounds'],
        description: 'Deep hyaluronic infusion and soothing botanical exfoliation.',
      },
      {
        serviceId: 'srv_brow_sculpt',
        name: 'Precision Brow Lamination & Tint',
        priceCents: 6500,
        durationMinutes: 40,
        category: 'brows_lashes' as const,
        targetConcerns: ['sparse arches', 'unruly brows'],
        suitableSkinHairTypes: ['All types'],
        contraindicatedConditions: [],
        description: 'Keratin smoothing and bespoke arch tinting.',
      },
    ];

    it('matches services based on concern and budget, while routing medical contraindications to clinical referral', () => {
      // 1. Standard matching client
      const standardInput = {
        primaryConcern: 'dehydration and dullness',
        skinOrHairType: 'Sensitive Fitzpatrick II',
        budgetRangeCents: { min: 10000, max: 18000 },
        availableMinutes: 75,
        hasContraindicationsOrAllergies: false,
      };

      const matchRes = matchServicesToClientPreferences(standardInput, mockCatalog);
      expect(matchRes.requiresClinicalReferral).toBe(false);
      expect(matchRes.matchedServices[0].service.serviceId).toBe('srv_hydra_dew');
      expect(matchRes.matchedServices[0].isWithinBudget).toBe(true);
      expect(matchRes.matchedServices[0].isWithinTimeLimit).toBe(true);
      expect(matchRes.explanationSpeech).toContain('Hydra-Dew Glass Glow Facial');

      // 2. Medical contraindication guardrail trigger (retinol burn)
      const medicalInput = {
        primaryConcern: 'severe peeling and redness',
        skinOrHairType: 'Dry',
        budgetRangeCents: { min: 5000, max: 20000 },
        availableMinutes: 60,
        hasContraindicationsOrAllergies: true,
        contraindicationsNotes: 'Suffering from active retinol burn from prescription cream last week',
      };

      const medRes = matchServicesToClientPreferences(medicalInput, mockCatalog);
      expect(medRes.requiresClinicalReferral).toBe(true);
      expect(medRes.matchedServices).toHaveLength(0);
      expect(medRes.clinicalReferralReason).toContain('retinol burn');
      expect(medRes.explanationSpeech).toContain('complimentary 15-minute consultation');
    });
  });

  describe('Posie Core Logic - F155 (Purchasing Recommendations)', () => {
    const mockInventoryItems = [
      {
        sku: 'SKU_HYALURONIC_SERUM_500ML',
        productName: 'Botanical Hyaluronic Acid Professional Backbar (500ml)',
        supplierName: 'Luxe Derm Supply',
        supplierSku: 'LDS-HA-500',
        currentStockOnHand: 2,
        allocatedBookedDemandUnits: 3, // Deficit! 3 committed vs 2 on hand
        supplierLeadTimeDays: 7,
        minimumOrderQuantity: 4,
        unitCostCents: 4500, // $45.00
        packSizeUnits: 4,
        averageWeeklyUsageUnits: 3,
      },
      {
        sku: 'SKU_ORGANIC_COTTON_PADS',
        productName: 'Organic Unbleached Cleansing Rounds (500ct)',
        supplierName: 'EcoSpa Wholesale',
        supplierSku: 'ECO-ROUND-500',
        currentStockOnHand: 25,
        allocatedBookedDemandUnits: 4,
        supplierLeadTimeDays: 5,
        minimumOrderQuantity: 10,
        unitCostCents: 1200,
        packSizeUnits: 5,
        averageWeeklyUsageUnits: 2,
      },
    ];

    it('identifies imminent stockouts, respects MOQs and pack sizes, and mandates authorized buyer PO signoff', () => {
      const plan = generatePurchasingRecommendations(mockInventoryItems, 50000); // $500 budget cap

      expect(plan.isWithinBudget).toBe(true);
      expect(plan.items).toHaveLength(2);

      // Item 1 (Hyaluronic Serum) should be urgent stockout imminent
      const serumRec = plan.items.find(i => i.sku === 'SKU_HYALURONIC_SERUM_500ML');
      expect(serumRec?.urgency).toBe('urgent_stockout_imminent');
      expect(serumRec?.recommendedUnitsToOrder).toBe(8); // 2 packs of 4 to cover 7-unit deficit
      expect(serumRec?.estimatedCostCents).toBe(36000); // 8 * $45.00 = $360.00

      // Item 2 (Cotton rounds) has 21 available units (healthy)
      const cottonRec = plan.items.find(i => i.sku === 'SKU_ORGANIC_COTTON_PADS');
      expect(cottonRec?.urgency).toBe('healthy_stock');
      expect(cottonRec?.recommendedUnitsToOrder).toBe(0);

      // Verify draft PO creation
      expect(plan.draftPurchaseOrders).toHaveLength(1);
      expect(plan.draftPurchaseOrders[0].supplierName).toBe('Luxe Derm Supply');
      expect(plan.draftPurchaseOrders[0].status).toBe('draft_pending_owner_approval');

      // Invariant: Approve purchase order draft
      const approvedPo = approvePurchaseOrderDraft(plan, 'Luxe Derm Supply', 'staff_owner_elena');
      expect(approvedPo.isApproved).toBe(true);
      expect(approvedPo.approvedPoNumber).toContain('PO-LUX');
      expect(approvedPo.auditRecord).toContain('authorized buyer staff_owner_elena');
    });
  });

  describe('Posie Core Logic - F156 (Expert Template Marketplace)', () => {
    it('validates review credentials for clinical/legal templates, tracks adoptions, and detects version updates', () => {
      // 1. Invariant: Clinical template requires verified license & jurisdiction
      expect(() => {
        publishMarketplaceTemplate({
          title: 'Advanced Chemical Peel Consent Protocol',
          category: 'consent_agreement',
          version: '1.0.0',
          creator: { name: 'Dr. Aris Thorne', organization: 'DermLaw Guild', verifiedTitle: 'Board Certified Dermatologist' },
          reviewCredentials: {
            reviewType: 'clinician_reviewed',
            reviewedByName: 'Dr. Aris Thorne, MD',
            professionalLicenseOrBarNumber: '', // Missing license!
            jurisdiction: 'US-CA',
            reviewDate: '2026-10-01',
            expirationDate: '2027-10-01',
          },
          contentSchema: { sections: ['risks', 'contraindications'] },
          pricing: { priceCents: 2900, isFreeCommunityTemplate: false },
          changelog: 'Initial release',
        });
      }).toThrow(/license or bar number is mandatory/i);

      // 2. Publish valid expert template
      const validTemplate = publishMarketplaceTemplate({
        title: 'Advanced Chemical Peel Consent Protocol',
        category: 'consent_agreement',
        version: '1.0.0',
        creator: { name: 'Dr. Aris Thorne', organization: 'DermLaw Guild', verifiedTitle: 'Board Certified Dermatologist' },
        reviewCredentials: {
          reviewType: 'clinician_reviewed',
          reviewedByName: 'Dr. Aris Thorne, MD',
          professionalLicenseOrBarNumber: 'MD-CA-449102',
          jurisdiction: 'US-CA',
          reviewDate: '2026-10-01',
          expirationDate: '2027-10-01',
        },
        contentSchema: { sections: ['risks', 'contraindications', 'peel_strengths'] },
        pricing: { priceCents: 2900, isFreeCommunityTemplate: false },
        changelog: 'Initial compliant release',
      });

      expect(validTemplate.templateId).toBeDefined();

      // 3. Adopt template into studio
      const { installation, updatedTemplate } = adoptMarketplaceTemplate(validTemplate, 'studio_posie_sf');
      expect(installation.installedVersion).toBe('1.0.0');
      expect(updatedTemplate.adoptionCount).toBe(1);

      // 4. Check for update when author releases v1.1.0
      const updatedTemplateV11 = { ...updatedTemplate, version: '1.1.0', changelog: 'Added TCA 30% aftercare caveat' };
      const updateCheck = checkTemplateUpdate(installation, updatedTemplateV11);
      expect(updateCheck.hasUpdate).toBe(true);
      expect(updateCheck.latestVersion).toBe('1.1.0');
      expect(updateCheck.changelog).toContain('TCA 30%');
    });
  });

  describe('Posie Core Logic - F157 (Client-Controlled Care Passport)', () => {
    it('manages client-sovereign care entries, issues time-limited scoped grants, and supports instant client revocation', () => {
      const mockEntries = [
        {
          entryId: 'ent_1',
          scope: 'treatment_history' as const,
          date: '2026-09-15',
          performingStudioName: 'Posie Maison SF',
          performingPractitioner: 'Elena Rostova',
          summary: 'Bespoke Hydration Treatment',
        },
        {
          entryId: 'ent_2',
          scope: 'formula_notes' as const,
          date: '2026-09-15',
          performingStudioName: 'Posie Maison SF',
          performingPractitioner: 'Elena Rostova',
          summary: 'Hair gloss formulation',
          clinicalDetails: { formula: 'Shades EQ 09P + 09V equal parts' },
        },
        {
          entryId: 'ent_3',
          scope: 'patch_test_clearances' as const,
          date: '2026-09-10',
          performingStudioName: 'Posie Maison SF',
          performingPractitioner: 'Elena Rostova',
          summary: 'PPD tint patch test 48h clear',
        },
      ];

      // 1. Create client passport
      const passport = createCarePassportRecord('cli_chloe_du', 'Chloe Dupont', '415-555-4499', mockEntries);
      expect(passport.verifiedEntries).toHaveLength(3);

      // 2. Issue scoped 24h grant to a guest studio for formula notes and patch tests only (excludes history)
      const grant = issueCarePassportGrant(
        passport,
        'Atelier NYC',
        'Sylvia Vance',
        ['formula_notes', 'patch_test_clearances'],
        24
      );

      expect(grant.accessToken).toBeDefined();
      expect(grant.isRevoked).toBe(false);

      // 3. Recipient accesses passport data
      const accessRes = accessCarePassport(grant, passport, '198.51.100.22');
      expect(accessRes.isAccessGranted).toBe(true);
      expect(accessRes.authorizedEntries).toHaveLength(2); // Only formula_notes & patch_test_clearances
      expect(accessRes.authorizedEntries.map(e => e.scope)).not.toContain('treatment_history');

      // 4. Client exercises instant kill switch revocation
      const revokedGrant = revokeCarePassportGrant(grant, 'cli_chloe_du');
      expect(revokedGrant.isRevoked).toBe(true);

      const revokedAccess = accessCarePassport(revokedGrant, passport, '198.51.100.22');
      expect(revokedAccess.isAccessGranted).toBe(false);
      expect(revokedAccess.rejectionReason).toContain('explicitly revoked');
    });
  });

  describe('Posie Core Logic - F158 (Practitioner Relocation Workflow)', () => {
    it('honors 1099 contractor data ownership rights while restricting W-2 salon client lists without signoff', () => {
      // 1. 1099 Booth Renter leaves studio: Under WB F37, renter owns their client list
      const renterReq = initiateRelocationTransition(
        'staff_renter_sienna',
        'Sienna Woods',
        '2026-12-01',
        'Sienna Aesthetics Studio',
        '1099_independent_booth_renter',
        ['personal_earnings_history', 'client_contact_directory', 'clinical_treatment_portfolio']
      );

      expect(renterReq.status).toBe('authorized_for_export');
      expect(renterReq.authorizedScopes).toContain('client_contact_directory');

      const renterNotice = generateLawfulDepartureNotice(renterReq, 'Posie Atelier');
      expect(renterNotice).toContain('transitioning their independent practice');

      // 2. W-2 Employee leaves studio: Client contacts belong to salon unless manager signs off
      const w2Req = initiateRelocationTransition(
        'staff_w2_maya',
        'Maya Lin',
        '2026-12-01',
        'Downtown Spa Club',
        'w2_commission_employee',
        ['personal_earnings_history', 'client_contact_directory', 'clinical_treatment_portfolio']
      );

      expect(w2Req.status).toBe('restricted_w2_salon_owned');
      expect(w2Req.authorizedScopes).not.toContain('client_contact_directory');
      expect(w2Req.authorizedScopes).toContain('personal_earnings_history');

      // Manager reviews and authorizes mutual departure transition
      const approvedW2 = authorizeRelocationExport(w2Req, 'staff_manager_elena', true, 'Mutual separation agreement signed; non-solicitation waiver granted for direct regular clients.');
      expect(approvedW2.status).toBe('authorized_for_export');
      expect(approvedW2.authorizedScopes).toContain('client_contact_directory');
      expect(approvedW2.managerSignoff?.complianceNotes).toContain('Mutual separation');
    });
  });

  describe('Posie Core Logic - F159 (Recovery Operations and Security Assurance)', () => {
    it('executes automated restore drills proving RTO and RPO benchmarks and prunes stale access tokens', () => {
      // 1. Create encrypted backup snapshot
      const snapshot = createEncryptedBackupSnapshot({
        appointments: 1420,
        clients: 890,
        giftCardLedgerCents: 4500000, // $45,000.00
        transactionLines: 3100,
      });

      expect(snapshot.sha256Digest).toContain('sha256:');

      // 2. Run automated restore drill with passing RTO and RPO
      const drill = executeAutomatedRestoreDrill(snapshot, {
        targetRtoMinutes: 15,
        targetRpoMinutes: 5,
        simulatedLatencyMinutes: 3.8,
        simulatedLagMinutes: 1.2,
      });

      expect(drill.status).toBe('passed_clean');
      expect(drill.isRtoMet).toBe(true);
      expect(drill.isRpoMet).toBe(true);
      expect(drill.integrityChecks.appointmentsMatched).toBe(true);
      expect(drill.integrityChecks.ledgerBalancesBalanced).toBe(true);
      expect(drill.auditReport).toContain('Restore Drill');

      // 3. Audit access tokens and prune stale credentials (>30 days)
      const mockTokens = [
        { tokenId: 'tok_active', staffId: 's1', staffName: 'Elena Rostova', role: 'owner', lastUsedAt: new Date().toISOString() },
        { tokenId: 'tok_stale', staffId: 's2', staffName: 'Former Intern', role: 'assistant', lastUsedAt: '2026-08-01T12:00:00Z' },
      ];

      const review = auditAndPruneAccessTokens(mockTokens, 30);
      expect(review.activeTokens).toHaveLength(1);
      expect(review.revokedTokens).toHaveLength(1);
      expect(review.revokedTokens[0].staffName).toBe('Former Intern');
    });
  });

  describe('Posie Core Logic - F160 (Enterprise Administration)', () => {
    it('configures enterprise SSO, processes SCIM deprovisioning with instant session kills, and exports audit digests', () => {
      // 1. SSO Configuration
      const ssoResult = configureEnterpriseSso({
        enterpriseName: 'Posie Luxury Group LLC',
        identityProvider: 'okta',
        ssoProtocol: 'saml_2_0',
        entityIdOrClientId: 'sp_posie_okta_prod',
        ssoLoginUrl: 'https://auth.posiegroup.okta.com/app/sso',
        enforceSsoForAllStaff: true,
        allowedBreakGlassAdmins: ['elena.breakglass@posiegroup.com'],
      });

      expect(ssoResult.isConfigured).toBe(true);
      expect(ssoResult.ssoStatus).toContain('OKTA');

      // 2. SCIM Provisioning: Create Regional Director
      const initialUsers: any[] = [];
      const createRes = processScimProvisioningEvent(
        {
          action: 'create_user',
          userEmail: 'director.sofia@posiegroup.com',
          fullName: 'Sofia Valenti',
          assignedLocationIds: ['loc_beverly_hills', 'loc_soho'],
          enterpriseRole: 'regional_director',
        },
        initialUsers
      );

      expect(createRes.event.status).toBe('success');
      expect(createRes.updatedUsers[0].isActive).toBe(true);
      expect(createRes.updatedUsers[0].assignedLocationIds).toHaveLength(2);

      // 3. SCIM Deprovisioning: Invariant: Instant token kill across all enterprise locations
      const userWithSessions = [{ ...createRes.updatedUsers[0], activeSessionsCount: 4 }];
      const deprovRes = processScimProvisioningEvent(
        {
          action: 'deprovision_user',
          userEmail: 'director.sofia@posiegroup.com',
          assignedLocationIds: [],
          enterpriseRole: 'regional_director',
        },
        userWithSessions
      );

      expect(deprovRes.event.status).toBe('revocation_complete');
      expect(deprovRes.updatedUsers[0].isActive).toBe(false);
      expect(deprovRes.updatedUsers[0].activeSessionsCount).toBe(0); // All 4 sessions instantly killed

      // 4. Enterprise Audit Export
      const auditExport = generateEnterpriseAuditExport('Posie Luxury Group LLC', '2026-10-01', '2026-10-31', 1250);
      expect(auditExport.totalSecurityEvents).toBe(1250);
      expect(auditExport.sha256Digest).toContain('sha256:');
      expect(auditExport.downloadUrl).toContain('/api/v1/enterprise/audit-logs');
    });
  });

  describe('Posie Core Logic - F161 (Medical Practice Records and Signoff)', () => {
    const rnClinician: ClinicalSigner = {
      practitionerId: 'prac_rn_taylor',
      name: 'Taylor Reed, RN',
      licenseType: 'RN',
      licenseNumber: 'RN-CA-992144',
      jurisdiction: 'US-CA',
    };

    const physicianMD: ClinicalSigner = {
      practitionerId: 'prac_md_vance',
      name: 'Dr. Sarah Vance, MD',
      licenseType: 'MD',
      licenseNumber: 'MD-CA-402911',
      npiNumber: '1982736450',
      jurisdiction: 'US-CA',
    };

    it('requires valid licenses, enforces medical director review for mid-levels, governs access, and allows immutable amendments', () => {
      // 1. Rejects creation without consent reference
      expect(() =>
        createClinicalChartDraft({
          chartId: 'chart_101',
          clientId: 'client_eva',
          practiceId: 'prac_lux_med',
          serviceId: 'srv_toxin',
          procedureName: 'Botox Cosmetic 30u',
          recordType: 'aesthetic_injectable',
          treatingClinician: rnClinician,
          observations: [],
          informedConsentRefId: '',
        })
      ).toThrow('informed consent reference ID');

      // 2. Creates valid draft, flags medical director requirement for RN
      const chartDraft = createClinicalChartDraft({
        chartId: 'chart_101',
        clientId: 'client_eva',
        practiceId: 'prac_lux_med',
        serviceId: 'srv_toxin',
        procedureName: 'Botox Cosmetic 30u',
        recordType: 'aesthetic_injectable',
        treatingClinician: rnClinician,
        observations: [
          {
            anatomicalSite: 'Glabellar complex (Procerus & Corrugators)',
            lotNumber: 'BX-99420-EXP',
            dosageOrUnits: 20,
            technique: 'Intramuscular micro-droplet',
            clientTolerance: 'Well tolerated with minimal erythema',
          },
        ],
        informedConsentRefId: 'consent_doc_eva_992',
      });

      expect(chartDraft.medicalDirectorReview.required).toBe(true);
      expect(chartDraft.medicalDirectorReview.status).toBe('pending');

      // 3. Treating clinician signs, stays pending until medical director signs
      const pendingSign = signAndLockClinicalRecord(chartDraft, rnClinician);
      expect(pendingSign.status).toBe('pending_medical_director');
      expect(pendingSign.locked).toBe(false);

      // 4. Medical Director co-signs and locks record
      const lockedRecord = signAndLockClinicalRecord(pendingSign, rnClinician, {
        medicalDirector: physicianMD,
        supervisoryNotes: 'Reviewed anatomy, dilution, and dosage. Protocol compliant.',
      });
      expect(lockedRecord.status).toBe('signed_locked');
      expect(lockedRecord.locked).toBe(true);
      expect(lockedRecord.medicalDirectorReview.status).toBe('approved');
      expect(lockedRecord.medicalDirectorReview.medicalDirectorName).toBe('Dr. Sarah Vance, MD');

      // 5. Governed access: clinical roles permitted, front desk denied
      const accessTreating = verifyGovernedClinicalAccess(lockedRecord, {
        userId: 'prac_rn_taylor',
        role: 'treating_clinician',
      });
      expect(accessTreating.permitted).toBe(true);

      const accessFrontDesk = verifyGovernedClinicalAccess(lockedRecord, {
        userId: 'staff_reception_claire',
        role: 'front_desk',
      });
      expect(accessFrontDesk.permitted).toBe(false);
      expect(accessFrontDesk.reason).toContain('Front-desk role restricted');
      expect(lockedRecord.accessAuditLog).toHaveLength(2);

      // 6. Immutable amendment preserves original observations
      const amendedRecord = amendClinicalRecord(lockedRecord, {
        clinician: rnClinician,
        reason: 'Post-treatment 15-minute ice compress check confirmed resolution of mild swelling.',
        priorNoteExcerpt: 'Well tolerated with minimal erythema',
        newNoteExcerpt: 'Well tolerated; post-15m icing confirmed complete resolution of transient swelling.',
      });

      expect(amendedRecord.status).toBe('amended');
      expect(amendedRecord.amendments).toHaveLength(1);
      expect(amendedRecord.observations[0].dosageOrUnits).toBe(20); // Original unaltered
    });
  });

  describe('Posie Core Logic - F162 (Training and Qualification Records)', () => {
    it('manages certificates, evaluates service prerequisites, blocks on expired credentials, and audits renewals', () => {
      const initialProfile: StaffCredentialProfile = {
        staffId: 'staff_kendra_aesthetic',
        staffName: 'Kendra Miller',
        employmentType: 'w2_employee',
        authorizedServiceCategories: ['laser_hair_removal', 'chemical_peel'],
        credentials: [
          {
            credentialId: 'cred_laser_01',
            category: 'laser_safety_certification',
            title: 'Class IV Laser Operator Safety',
            issuingAuthority: 'National Laser Institute',
            licenseOrCertificateNumber: 'NLI-883921',
            issuedDate: '2024-01-15',
            expirationDate: '2026-12-31', // Active
            verifiedBy: 'Studio Owner Maya',
            verifiedAt: '2024-01-20T10:00:00Z',
          },
          {
            credentialId: 'cred_peel_01',
            category: 'advanced_modality',
            title: 'Advanced Medical Chemical Exfoliation',
            issuingAuthority: 'State Board of Cosmetology',
            licenseOrCertificateNumber: 'PEEL-7718',
            issuedDate: '2023-05-10',
            expirationDate: '2026-05-10', // Expired as of Nov 2026
            verifiedBy: 'Studio Owner Maya',
            verifiedAt: '2023-05-15T10:00:00Z',
          },
        ],
      };

      const laserReq: ServiceCredentialRequirement = {
        serviceId: 'srv_laser_clarity',
        serviceName: 'Full Leg Alexandrite Laser Resurfacing',
        requiredCategories: ['laser_safety_certification'],
        minimumActiveCredentials: ['Class IV Laser Operator Safety'],
      };

      const peelReq: ServiceCredentialRequirement = {
        serviceId: 'srv_deep_tca',
        serviceName: 'TCA 20% Medical Grade Peel',
        requiredCategories: ['advanced_modality'],
        minimumActiveCredentials: ['Advanced Medical Chemical Exfoliation'],
      };

      // 1. Eligible for Laser
      const laserEligibility = evaluateServiceEligibility(initialProfile, laserReq, '2026-11-01');
      expect(laserEligibility.eligible).toBe(true);
      expect(laserEligibility.matchedCredentials).toContain('Class IV Laser Operator Safety');

      // 2. Blocked for Chemical Peel due to expiration
      const peelEligibility = evaluateServiceEligibility(initialProfile, peelReq, '2026-11-01');
      expect(peelEligibility.eligible).toBe(false);
      expect(peelEligibility.blockedReason).toContain('expired on 2026-05-10. Service scheduling blocked');

      // 3. Register renewed credential
      const updatedProfile = registerStaffCredential(
        initialProfile,
        {
          credentialId: 'cred_peel_01',
          category: 'advanced_modality',
          title: 'Advanced Medical Chemical Exfoliation',
          issuingAuthority: 'State Board of Cosmetology',
          licenseOrCertificateNumber: 'PEEL-7718-R2',
          issuedDate: '2026-05-11',
          expirationDate: '2028-05-11',
          verifiedBy: 'Studio Director Sarah',
        },
        'Studio Director Sarah'
      );

      const renewedEligibility = evaluateServiceEligibility(updatedProfile, peelReq, '2026-11-01');
      expect(renewedEligibility.eligible).toBe(true);

      // 4. Audit expiring credentials across profiles
      const alerts = auditExpiringCredentials([initialProfile], '2026-12-15', 30);
      expect(alerts).toHaveLength(2); // One expired (peel) + one expiring in 16 days (laser)
      const laserAlert = alerts.find((a) => a.credentialTitle === 'Class IV Laser Operator Safety');
      expect(laserAlert?.status).toBe('expiring_soon');
      expect(laserAlert?.daysRemaining).toBe(16);
    });
  });

  describe('Posie Core Logic - F163 (Distributor and Scale Integrations)', () => {
    it('records precision weighed dispensing, reconciles cost variances against targets, and syncs distributor feeds without fabricating stock', () => {
      // 1. Record weighed color dispensing
      const dispensingEvent = recordDispensedProductWeighing({
        dispensingId: 'disp_color_881',
        appointmentId: 'appt_chloe_balayage',
        practitionerId: 'prac_maya_lin',
        deviceId: 'scale_vish_bt_09',
        scaleModel: 'Vish Bluetooth Smart Scale Pro',
        source: 'hardware_scale',
        components: [
          {
            sku: 'SKU-W-9A',
            productName: 'Wella Illumina 9/60 Very Light Violet Blonde',
            category: 'color',
            targetWeightGrams: 30.0,
            actualWeightGrams: 34.5, // 4.5g over target
            costPerGram: 0.22,
          },
          {
            sku: 'SKU-DEV-20V',
            productName: 'Welloxon Perfect 20 Vol Developer',
            category: 'developer',
            targetWeightGrams: 60.0,
            actualWeightGrams: 69.0, // 9g over target (1:2 ratio)
            costPerGram: 0.05,
          },
        ],
      });

      expect(dispensingEvent.totalTargetGrams).toBe(90.0);
      expect(dispensingEvent.totalActualGrams).toBe(103.5);
      expect(dispensingEvent.totalProductCost).toBe(11.04);

      // 2. Reconcile color costing
      const formulaTarget: FormulaTargetSpec = {
        formulaName: 'Nordic Vanilla Pearl Glaze',
        targetComponents: [
          {
            sku: 'SKU-W-9A',
            productName: 'Wella Illumina 9/60',
            category: 'color',
            targetWeightGrams: 30.0,
            costPerGram: 0.22,
          },
          {
            sku: 'SKU-DEV-20V',
            productName: 'Welloxon Perfect 20 Vol Developer',
            category: 'developer',
            targetWeightGrams: 60.0,
            costPerGram: 0.05,
          },
        ],
      };

      const reconciliation = reconcileServiceColorCosting(formulaTarget, dispensingEvent);
      expect(reconciliation.varianceGrams).toBe(13.5);
      expect(reconciliation.variancePercentage).toBe(15);
      expect(reconciliation.isOverDispensed).toBe(true);
      expect(reconciliation.wasteWarning).toContain('Dispensed weight exceeds formula target by 15%');

      // 3. Distributor Catalog Sync: Online update
      const existingSkus: LocalInventorySku[] = [
        {
          sku: 'SKU-W-9A',
          name: 'Wella Illumina 9/60',
          distributorId: 'dist_saloncentric_nyc',
          costPerUnit: 12.5,
          stockOnHand: 14,
          lastSyncedAt: '2026-10-01T00:00:00Z',
        },
      ];

      const feedOnline = syncDistributorCatalogFeed(
        {
          distributorId: 'dist_saloncentric_nyc',
          distributorName: 'SalonCentric Metro NY',
          items: [
            {
              sku: 'SKU-W-9A',
              name: 'Wella Illumina 9/60',
              wholesalePrice: 13.25, // Price increase
              availableStock: 250,
              inStock: true,
            },
          ],
          timestamp: '2026-10-27T12:00:00Z',
        },
        existingSkus,
        'connected'
      );

      expect(feedOnline.updatedCount).toBe(1);
      expect(feedOnline.skus[0].costPerUnit).toBe(13.25);

      // 4. Invariant: Disconnected feed gracefully falls back without fabricating stock
      const feedOffline = syncDistributorCatalogFeed(
        {
          distributorId: 'dist_saloncentric_nyc',
          distributorName: 'SalonCentric Metro NY',
          items: [],
          timestamp: '2026-10-27T12:05:00Z',
        },
        existingSkus,
        'offline'
      );

      expect(feedOffline.connectionState).toBe('offline_fallback');
      expect(feedOffline.skus[0].stockOnHand).toBe(14); // Preserves real count, does not fabricate
      expect(feedOffline.message).toContain('Preserving existing inventory counts without fabrication');
    });
  });

  describe('Posie Core Logic - F164 (Staff Coverage Exchanges)', () => {
    it('creates coverage requests, enforces qualification matching, and strictly restricts substitute access scope', () => {
      // 1. Create coverage request
      const shiftRequest = createShiftCoverageRequest({
        requestId: 'req_shift_sat_991',
        requestingStaffId: 'staff_elena_colorist',
        requestingStaffName: 'Elena Rostova',
        date: '2026-11-14',
        shiftStartTime: '10:00',
        shiftEndTime: '16:00',
        appointments: [
          {
            appointmentId: 'appt_101',
            clientId: 'client_charlotte_1',
            clientName: 'Charlotte M.',
            serviceId: 'srv_balayage',
            serviceName: 'Balayage Blonde',
            startTime: '10:00',
            endTime: '12:30',
            requiredQualificationTitle: 'Master Balayage Certification',
          },
          {
            appointmentId: 'appt_102',
            clientId: 'client_sophia_2',
            clientName: 'Sophia K.',
            serviceId: 'srv_gloss',
            serviceName: 'Signature Glaze & Blowout',
            startTime: '13:00',
            endTime: '14:30',
          },
        ],
        compensationTerms: {
          serviceCommissionPercentage: 50,
          tipsPaidDirectToSubstitute: true,
        },
        requiresManagerApproval: true,
      });

      expect(shiftRequest.status).toBe('open');

      // 2. Reject unqualified candidate
      const apprenticeCandidate: SubstituteCandidate = {
        staffId: 'staff_apprentice_jen',
        staffName: 'Jenna Apprentice',
        employmentType: 'internal_peer',
        activeQualifications: ['Sanitation & Hygiene'], // Lacks Balayage certification
      };

      expect(() => acceptShiftCoverage(shiftRequest, apprenticeCandidate, true)).toThrow(
        'lacks required qualification "Master Balayage Certification"'
      );

      // 3. Accept qualified candidate with manager signoff
      const seniorCandidate: SubstituteCandidate = {
        staffId: 'staff_senior_maya',
        staffName: 'Maya Lin',
        employmentType: 'internal_peer',
        activeQualifications: ['Master Balayage Certification', 'Advanced Colorist License'],
      };

      const assignment = acceptShiftCoverage(shiftRequest, seniorCandidate, true);
      expect(assignment.status).toBe('active');
      expect(assignment.substituteStaffName).toBe('Maya Lin');
      expect(assignment.coveredAppointmentIds).toHaveLength(2);

      // 4. Invariant: Assignment-limited access scope
      // Permits access to covered appointments & clients
      const allowedApptAccess = verifySubstituteAccessScope(assignment, {
        resourceType: 'shift_appointment',
        appointmentId: 'appt_101',
        clientId: 'client_charlotte_1',
      });
      expect(allowedApptAccess.permitted).toBe(true);

      // Denies access to unassigned appointments
      const deniedApptAccess = verifySubstituteAccessScope(assignment, {
        resourceType: 'shift_appointment',
        appointmentId: 'appt_999_other_stylist',
      });
      expect(deniedApptAccess.permitted).toBe(false);
      expect(deniedApptAccess.reason).toContain('not assigned to this coverage shift');

      // Denies full client database access
      const broadDbAccess = verifySubstituteAccessScope(assignment, {
        resourceType: 'full_client_database',
      });
      expect(broadDbAccess.permitted).toBe(false);
      expect(broadDbAccess.reason).toContain('Full database access is withheld');

      // Denies salon financial reports
      const financialsAccess = verifySubstituteAccessScope(assignment, {
        resourceType: 'salon_financials',
      });
      expect(financialsAccess.permitted).toBe(false);
    });
  });

  describe('Posie Core Logic - F165 (Explainable Return Likelihood)', () => {
    it('calculates historical visit cadence, excludes opted-out clients, and ranks return candidates with transparent explanations', () => {
      // 1. Calculate visit cadence
      const cadenceData = computeClientVisitCadence([
        '2026-06-01T10:00:00Z',
        '2026-07-01T10:00:00Z', // 30 days
        '2026-08-02T10:00:00Z', // 32 days
        '2026-08-31T10:00:00Z', // 29 days
      ]);
      expect(cadenceData.visitCount).toBe(4);
      expect(cadenceData.averageCadenceDays).toBe(30.3);
      expect(cadenceData.regularityScore).toBeGreaterThan(0.9);

      // 2. Candidate roster
      const clients: ClientHistoricalCandidate[] = [
        {
          clientId: 'client_claire_active',
          clientName: 'Claire Dupont',
          preferredWeekday: 5, // Friday
          optedOutOfOutreach: false,
          visitHistory: [
            { appointmentId: 'a1', completedAt: '2026-08-01T10:00:00Z', serviceName: 'Cut & Style' },
            { appointmentId: 'a2', completedAt: '2026-09-01T10:00:00Z', serviceName: 'Cut & Style' },
            { appointmentId: 'a3', completedAt: '2026-10-01T10:00:00Z', serviceName: 'Cut & Style' },
          ], // ~30.5 days cadence. Ref date is 2026-11-04 (34 days since last visit = 1.1x cadence)
        },
        {
          clientId: 'client_opted_out_rachel',
          clientName: 'Rachel Green',
          optedOutOfOutreach: true, // Invariant: must be excluded
          visitHistory: [
            { appointmentId: 'b1', completedAt: '2026-09-01T10:00:00Z', serviceName: 'Highlights' },
            { appointmentId: 'b2', completedAt: '2026-10-01T10:00:00Z', serviceName: 'Highlights' },
          ],
        },
        {
          clientId: 'client_recent_olivia',
          clientName: 'Olivia Wilde',
          optedOutOfOutreach: false,
          visitHistory: [
            { appointmentId: 'c1', completedAt: '2026-11-02T10:00:00Z', serviceName: 'Blowout' }, // 2 days ago
          ],
        },
        {
          clientId: 'client_overdue_diana',
          clientName: 'Diana Prince',
          optedOutOfOutreach: false,
          visitHistory: [
            { appointmentId: 'd1', completedAt: '2026-07-01T10:00:00Z', serviceName: 'Balayage' },
            { appointmentId: 'd2', completedAt: '2026-08-15T10:00:00Z', serviceName: 'Balayage' }, // 45 day cadence
          ], // Ref date 2026-11-04 is 81 days since last visit (1.8x cadence -> overdue lapse risk)
        },
      ];

      const ranked = rankReturnLikelihoodCandidates(clients, '2026-11-04');

      // 3. Invariants verified
      // Rachel (opted-out) and Olivia (visited 2 days ago) must not appear
      const ids = ranked.map((r) => r.clientId);
      expect(ids).toContain('client_claire_active');
      expect(ids).toContain('client_overdue_diana');
      expect(ids).not.toContain('client_opted_out_rachel');
      expect(ids).not.toContain('client_recent_olivia');

      // Top candidate is Claire because her cadenceMultiplier is ~1.11 (right in the sweet spot)
      expect(ranked[0].clientId).toBe('client_claire_active');
      expect(ranked[0].urgencyLevel).toBe('due_for_visit');
      expect(ranked[0].explainableReason).toContain('Historical preference for Friday bookings');
      expect(ranked[0].explainableReason).toContain('averages a visit every');

      // Diana is ranked as overdue lapse risk
      const diana = ranked.find((r) => r.clientId === 'client_overdue_diana');
      expect(diana?.urgencyLevel).toBe('overdue_lapse_risk');
    });
  });

  describe('Posie Core Logic - F166 (Brand Design Assistant)', () => {
    it('generates mood presets, enforces WCAG AA contrast, prevents unapproved publication, and guards factual rewrites', () => {
      // 1. Generate calm theme suggestion
      const theme = generateBrandThemeSuggestion({
        businessName: 'Atelier Sage & Linen',
        preferredMood: 'calm',
        primaryAccentHex: '#2D4A3E',
      });

      expect(theme.typography.category).toBe('classic_editorial');
      expect(theme.isAccessible).toBe(true);
      expect(theme.requiresOwnerApproval).toBe(true);
      expect(theme.contrastEvaluations[0].wcagAAMet).toBe(true);

      // 2. Contrast calculation check
      const ratio = calculateContrastRatio('#1E2D24', '#F8F6F2');
      expect(ratio).toBeGreaterThan(4.5);

      // 3. Publishing requires owner approval
      expect(() => publishBrandTheme(theme, false)).toThrow('explicit owner review and approval');
      const published = publishBrandTheme(theme, true);
      expect(published.status).toBe('published_active');

      // 4. Brand voice rewrite preserves factual boundaries
      const factualTokens = ['$145.00', '24 hours notice', 'Saturday, Nov 21 at 11:30 AM'];
      const rewrite = applyBrandVoiceWithFactualGuardrails({
        rawMessage: 'Your haircut is booked for Sat Nov 21 at 11:30 AM for $145. Cancel within 24 hours.',
        tone: 'warm_boutique',
        requiredFactualTokens: factualTokens,
      });

      expect(rewrite.verifiedFactualPreservation).toBe(true);
      for (const token of factualTokens) {
        expect(rewrite.rewrittenMessage).toContain(token);
      }
    });
  });

  describe('Posie Core Logic - F167 (Country Specific Operations)', () => {
    it('manages localized tax models, currency symbols, and statutory invoice requirements market by market', () => {
      // 1. UK Config (VAT Inclusive)
      const gbConfig = getCountryOperatingConfig('GB');
      expect(gbConfig.currencyCode).toBe('GBP');
      expect(gbConfig.taxModel).toBe('inclusive');

      const gbTax = calculateLocalizedInvoiceTaxes(120.0, gbConfig);
      expect(gbTax.totalWithTax).toBe(120.0);
      expect(gbTax.taxAmount).toBe(20.0); // 120 / 1.20 = 100 net, 20 VAT
      expect(gbTax.subtotal).toBe(100.0);

      // 2. US Config (Sales Tax Exclusive)
      const usConfig = getCountryOperatingConfig('US');
      expect(usConfig.taxModel).toBe('exclusive');
      const usTax = calculateLocalizedInvoiceTaxes(100.0, usConfig, 0.08875);
      expect(usTax.taxAmount).toBe(8.88);
      expect(usTax.totalWithTax).toBe(108.88);

      // 3. Statutory Invoice Compliance (Canada requires Business Number)
      const caConfig = getCountryOperatingConfig('CA');
      const invalidCaInvoice = validateStatutoryInvoiceCompliance(
        {
          invoiceId: 'inv_ca_01',
          countryCode: 'CA',
          sellerBusinessName: 'Posie Toronto Inc',
          subtotal: 150.0,
          lineItems: [{ description: 'Hydrafacial', amount: 150.0 }],
          clientName: 'Sarah Jenkins',
        },
        caConfig
      );
      expect(invalidCaInvoice.compliant).toBe(false);
      expect(invalidCaInvoice.missingStatutoryFields[0]).toContain('Mandatory statutory tax identifier');

      const validCaInvoice = validateStatutoryInvoiceCompliance(
        {
          invoiceId: 'inv_ca_01',
          countryCode: 'CA',
          sellerBusinessName: 'Posie Toronto Inc',
          sellerTaxRegistrationNumber: 'BN 123456789 RT0001',
          subtotal: 150.0,
          lineItems: [{ description: 'Hydrafacial', amount: 150.0 }],
          clientName: 'Sarah Jenkins',
        },
        caConfig
      );
      expect(validCaInvoice.compliant).toBe(true);
    });
  });

  describe('Posie Core Logic - F168 (Bridal and Event Workspace)', () => {
    it('coordinates multi-client wedding timelines, staged milestone deposits, and protects individual health privacy', () => {
      // 1. Create bridal workspace with 3 staged payment milestones
      const eventWorkspace = createBridalEventWorkspace({
        eventId: 'event_wedding_sophia',
        eventName: 'Sophia & James Wedding Morning',
        eventDate: '2026-12-05',
        organizerName: 'Sophia Miller (Bride)',
        organizerEmail: 'sophia.m@luxurymail.com',
        venueAddress: 'The Beekman Hotel, NYC',
        travelDistanceMiles: 12.0,
        mileageRate: 2.0, // $24 travel fee
        setupBufferMinutes: 45,
        serviceTotalCost: 1200.0,
        partyMembers: [
          {
            memberId: 'mem_bride',
            name: 'Sophia Miller',
            role: 'bride',
            serviceName: 'Bridal Updo & Airbrush Makeup',
            durationMinutes: 90,
            assignedStylistId: 'stylist_elena',
            startTime: '08:00',
            endTime: '09:30',
            hasTrialCompleted: true,
            privateMedicalOrAllergyNotes: 'Severe latex and adhesive sensitivity around eyes',
          },
          {
            memberId: 'mem_moh',
            name: 'Chloe Bennett',
            role: 'maid_of_honor',
            serviceName: 'Signature Hollywood Waves',
            durationMinutes: 45,
            assignedStylistId: 'stylist_elena',
            startTime: '09:30',
            endTime: '10:15',
          },
        ],
      });

      expect(eventWorkspace.totalContractValue).toBe(1224.0); // $1200 + $24 travel
      expect(eventWorkspace.paymentMilestones).toHaveLength(3);
      expect(eventWorkspace.paymentMilestones[0].percentage).toBe(25); // Retainer = $306.00

      // 2. Pay initial booking retainer milestone
      const paidWorkspace = recordStagedMilestonePayment(
        eventWorkspace,
        eventWorkspace.paymentMilestones[0].milestoneId,
        306.0,
        'txn_stripe_retainer_991'
      );
      expect(paidWorkspace.status).toBe('contract_signed');
      expect(paidWorkspace.paymentMilestones[0].status).toBe('paid');

      // 3. Privacy Invariant: Shared group packet hides confidential medical intake from organizer/guests
      const organizerPacket = generateBridalDayOfPacket(paidWorkspace, 'event_organizer');
      expect(organizerPacket.timeline).toHaveLength(2);
      expect(organizerPacket.confidentialIntakeIncluded).toBe(false);

      // Lead stylist packet receives clinical/allergy clearance
      const stylistPacket = generateBridalDayOfPacket(paidWorkspace, 'lead_stylist');
      expect(stylistPacket.confidentialIntakeIncluded).toBe(true);
    });
  });

  describe('Posie Core Logic - F169 (Safe Bulk Change Planning)', () => {
    it('simulates blast radius of price increases, demands owner approval, and supports 1-click rollback', () => {
      const catalog: CatalogItem[] = [
        { serviceId: 's1', name: 'Signature Haircut', price: 100.0, durationMinutes: 60, depositRequired: false, depositAmount: 0 },
        { serviceId: 's2', name: 'Balayage Blonde', price: 250.0, durationMinutes: 150, depositRequired: true, depositAmount: 50 },
      ];

      const bookings: ActiveBookingItem[] = [
        { bookingId: 'b1', serviceId: 's1', clientId: 'c1', clientName: 'Alice', scheduledTime: '2026-11-20T10:00:00Z', lockedPrice: 100.0, depositPaid: 0 },
        { bookingId: 'b2', serviceId: 's2', clientId: 'c2', clientName: 'Bob', scheduledTime: '2026-11-20T14:00:00Z', lockedPrice: 250.0, depositPaid: 50 },
      ];

      // 1. Simulate +10% price increase applying to new services only
      const simNewOnly = simulateBulkChangePlan(
        {
          targetCategory: 'service_pricing',
          adjustmentType: 'percentage_increase',
          value: 10,
          scopeServiceIds: [],
          applyToExistingBookings: false,
        },
        catalog,
        bookings
      );

      expect(simNewOnly.affectedServicesCount).toBe(2);
      expect(simNewOnly.totalRevenueDeltaProjected).toBe(0); // Existing bookings untouched

      // 2. Simulate +10% applying to existing bookings
      const simWithExisting = simulateBulkChangePlan(
        {
          targetCategory: 'service_pricing',
          adjustmentType: 'percentage_increase',
          value: 10,
          scopeServiceIds: ['s1'],
          applyToExistingBookings: true,
        },
        catalog,
        bookings
      );

      expect(simWithExisting.affectedBookings).toHaveLength(1);
      expect(simWithExisting.affectedBookings[0].priceDelta).toBe(10.0);
      expect(simWithExisting.affectedBookings[0].requiresClientNotice).toBe(true);

      // 3. Commit requires owner authorization
      expect(() =>
        commitBulkChangePlan(simNewOnly, catalog, { ownerId: 'own_1', ownerName: 'Maya Lin', confirmed: false })
      ).toThrow('explicit verified owner approval');

      const commitRecord = commitBulkChangePlan(simNewOnly, catalog, {
        ownerId: 'own_1',
        ownerName: 'Maya Lin',
        confirmed: true,
      });

      expect(commitRecord.updatedCatalog[0].price).toBe(110.0);
      expect(commitRecord.updatedCatalog[1].price).toBe(275.0);

      // 4. Invariant: 1-click rollback restores original catalog
      const rollback = rollbackBulkChange(commitRecord);
      expect(rollback.status).toBe('reverted');
      expect(rollback.restoredCatalog[0].price).toBe(100.0);
      expect(rollback.restoredCatalog[1].price).toBe(250.0);
    });
  });

  describe('Posie Core Logic - F170 (Late Running Recovery)', () => {
    it('evaluates overrun delay, absorbs buffers, requires staff signoff, and offers flexible client resolution options', () => {
      const upcoming: DownstreamAppointment[] = [
        {
          appointmentId: 'appt_201',
          clientId: 'client_charlotte',
          clientName: 'Charlotte M.',
          clientPhone: '+1-212-555-0199',
          scheduledStartTime: '14:00',
          scheduledEndTime: '15:00',
          serviceName: 'Single Process Glaze',
          allocatedBufferMinutes: 10, // 10m buffer between appointments
        },
        {
          appointmentId: 'appt_202',
          clientId: 'client_victoria',
          clientName: 'Victoria S.',
          clientPhone: '+1-212-555-0288',
          scheduledStartTime: '15:10',
          scheduledEndTime: '16:10',
          serviceName: 'Blowout & Style',
          allocatedBufferMinutes: 5,
        },
      ];

      // 1. Evaluate 25-minute active service overrun
      // Appt 1 absorbs 10m buffer -> 15m delay -> New start: 14:15
      // Appt 2 absorbs 5m buffer -> 10m delay -> New start: 15:20
      const plan = evaluateLateRunningImpact('prac_maya_lin', 25, upcoming);

      expect(plan.impactedAppointmentsCount).toBe(2);
      expect(plan.impacts[0].delayMinutes).toBe(15);
      expect(plan.impacts[0].suggestedStartTime).toBe('14:15');
      expect(plan.impacts[0].bufferAbsorbedMinutes).toBe(10);
      expect(plan.impacts[0].proposedMessage).toContain('running approximately 15 minutes behind');

      // 2. Staff approves and dispatches arrival updates
      const notifications = approveAndDispatchArrivalUpdates(plan, {
        staffId: 'staff_frontdesk_claire',
        staffName: 'Claire Front Desk',
      });

      expect(notifications).toHaveLength(2);
      expect(notifications[0].resolutionStatus).toBe('pending_client_reply');
      expect(notifications[0].suggestedStartTime).toBe('14:15');

      // 3. Client responds with alternative choice
      const resolution = recordClientDelayResolution(notifications[0], 'accept_delay');
      expect(resolution.resolutionStatus).toBe('accepted_delay');
      expect(resolution.resolutionSummary).toContain('Client confirmed new arrival time at 14:15');

      const reschedResolution = recordClientDelayResolution(notifications[1], 'reschedule_complimentary');
      expect(reschedResolution.resolutionStatus).toBe('rescheduled');
      expect(reschedResolution.resolutionSummary).toContain('late-fee penalty waived');
    });
  });

  describe('Posie Core Logic - F171 (Shared Room and Equipment Rentals)', () => {
    const validRenter: RenterEligibilityCredentials = {
      renterBusinessName: 'Radiance Skin Studio LLC',
      responsibleOperatorName: 'Chloe Bennett, LE',
      professionalLicenseNumber: 'LE-NY-88291',
      licenseJurisdiction: 'US-NY',
      insurancePolicyNumber: 'POL-HISC-992144',
      insuranceExpiryDate: '2027-12-31', // Active
      isVerified: true,
    };

    const listing: FacilityRentalListing = {
      facilityId: 'suite_medspa_3',
      facilityName: 'Laser & Aesthetics Suite C',
      resourceType: 'medspa_laser_suite',
      hourlyRentalRate: 75.0,
      dailyRentalRate: 450.0,
      requiredSecurityDeposit: 250.0,
      includedEquipment: ['Lumenis M22 IPL', 'HydraFacial Elite MD'],
    };

    it('validates credentials, manages segregated deposits, and executes check-in/check-out damage reporting', () => {
      // 1. Rejects unverified renter
      expect(() =>
        createFacilityReservation({
          reservationId: 'res_101',
          listing,
          renter: { ...validRenter, isVerified: false },
          startTime: '2026-11-20T09:00:00Z',
          endTime: '2026-11-20T13:00:00Z',
        })
      ).toThrow('identity and professional license must be verified');

      // 2. Creates valid reservation with 4 hours @ $75 = $300 fee + $250 deposit
      const res = createFacilityReservation({
        reservationId: 'res_101',
        listing,
        renter: validRenter,
        startTime: '2026-11-20T09:00:00Z',
        endTime: '2026-11-20T13:00:00Z',
        currentDateStr: '2026-11-10',
      });

      expect(res.rentalDurationHours).toBe(4);
      expect(res.rentalFeeTotal).toBe(300.0);
      expect(res.securityDepositHeld).toBe(250.0);
      expect(res.status).toBe('booked');

      // 3. Check-in inspection
      const checkedIn = checkInFacilityRental(res, {
        surfacesClean: true,
        equipmentFunctional: true,
        wasteProperlyDisposed: true,
        photoUrls: ['https://storage.posie.com/inspections/suite_c_in.jpg'],
      });
      expect(checkedIn.status).toBe('checked_in');

      // 4. Damage triage at check-out (Handpiece crack: $150 damage assessed)
      const checkedOut = checkOutFacilityRental(
        checkedIn,
        {
          surfacesClean: true,
          equipmentFunctional: false,
          wasteProperlyDisposed: true,
          notes: 'Handpiece outer casing cracked during use.',
          photoUrls: ['https://storage.posie.com/inspections/suite_c_out_damage.jpg'],
        },
        {
          damageDescription: 'Handpiece outer casing cracked',
          repairCost: 150.0,
        }
      );

      expect(checkedOut.status).toBe('damage_flagged');
      expect(checkedOut.damageReport?.depositWithheld).toBe(150.0);
      expect(checkedOut.damageReport?.refundedDeposit).toBe(100.0);
    });
  });

  describe('Posie Core Logic - F172 (Business Continuity Handover)', () => {
    it('activates emergency cover with passphrase, grants scoped client access, and strictly firewalls banking and equity', () => {
      // 1. Configure emergency handover pack
      const pack = configureEmergencyHandoverPack({
        packId: 'pack_continuity_maya',
        ownerPractitionerId: 'prac_maya_lin',
        ownerPractitionerName: 'Maya Lin',
        businessName: 'Atelier Maya SoHo',
        designatedProxy: {
          proxyId: 'proxy_elena',
          fullName: 'Elena Rostova',
          relationship: 'colleague',
          phone: '+1-212-555-0199',
          email: 'elena@atelierposie.com',
          authorizedWindowDays: 14,
        },
        passphraseHash: 'EMERGENCY_COVER_TOKEN_2026',
        urgentClientContacts: [
          {
            appointmentId: 'appt_991',
            clientId: 'cl_charlotte',
            clientName: 'Charlotte Miller',
            clientPhone: '+1-212-555-0211',
            scheduledTime: '2026-11-15T10:00:00Z',
            serviceName: 'Balayage Blonde',
            actionRequired: 'reschedule_requested',
          },
        ],
        unresolvedWorkSummary: 'Color inventory shipment arriving Tuesday; notify Charlotte Miller about appointment delay.',
      });

      expect(pack.status).toBe('dormant_configured');

      // 2. Reject incorrect passphrase
      expect(() =>
        activateEmergencyHandover(pack, {
          activatedBy: 'Elena Rostova',
          emergencyPassphrase: 'WRONG_PASSPHRASE',
          reason: 'Maya hospitalized with acute appendicitis',
        })
      ).toThrow('Invalid emergency handover passphrase');

      // 3. Activate valid emergency session
      const { updatedPack, session } = activateEmergencyHandover(pack, {
        activatedBy: 'Elena Rostova',
        emergencyPassphrase: 'EMERGENCY_COVER_TOKEN_2026',
        reason: 'Maya hospitalized with acute appendicitis',
      });

      expect(updatedPack.status).toBe('activated_in_progress');
      expect(session.active).toBe(true);

      // 4. Invariant: Scoped access permits urgent client communication
      const clientAccess = verifyHandoverResourceAccess(updatedPack, session, 'urgent_client_contacts');
      expect(clientAccess.permitted).toBe(true);

      // 5. Invariant: Banking credentials & equity documents are strictly firewalled
      const bankingAccess = verifyHandoverResourceAccess(updatedPack, session, 'financial_banking_payouts');
      expect(bankingAccess.permitted).toBe(false);
      expect(bankingAccess.reason).toContain('strictly firewalled from emergency continuity proxies');

      const equityAccess = verifyHandoverResourceAccess(updatedPack, session, 'equity_and_tax_docs');
      expect(equityAccess.permitted).toBe(false);

      expect(updatedPack.accessLog).toHaveLength(4); // Activation + 3 resource checks
    });
  });

  describe('Posie Core Logic - F173 (Action Based Analytics Workspace)', () => {
    it('turns metric findings into previewable action proposals, requires owner signoff, and separates real revenue from speculative time saved', () => {
      // 1. Metric finding: Thursday afternoon occupancy drop
      const proposal = generateActionProposalFromFinding({
        findingId: 'finding_occ_thu',
        metricKey: 'thursday_afternoon_occupancy',
        metricTitle: 'Thursday Afternoon Station Occupancy',
        observedValue: 38,
        targetBaselineValue: 75,
        unit: '%',
        evidenceSummary: 'Thursday 13:00-17:00 shows 38% booking rate across 4 consecutive weeks.',
      });

      expect(proposal.proposalType).toBe('schedule_block_consolidation');
      expect(proposal.dismissalOptionAvailable).toBe(true);
      expect(proposal.status).toBe('preview_ready');

      // 2. Execute requires owner approval
      expect(() =>
        executeActionProposal(proposal, {
          approved: false,
          ownerName: 'Maya Lin',
          baselineRevenue: 4200.0,
        })
      ).toThrow('verified owner approval');

      const execution = executeActionProposal(proposal, {
        approved: true,
        ownerName: 'Maya Lin',
        baselineRevenue: 4200.0,
      });
      expect(execution.status).toBe('active_monitoring');

      // 3. Post-action outcome: Truthful reporting
      const report = reportActionOutcomes(execution, 5100.0, 8.5);
      expect(report.trueIncrementalBenefit).toBe(900.0); // $5100 - $4200 baseline
      expect(report.speculativeTimeSavedHoursReportedSeparately).toBe(8.5); // Never added to revenue dollars!
      expect(report.claimValid).toBe(true);
    });
  });

  describe('Posie Core Logic - F174 (Electronic Prescribing)', () => {
    const licensedPrescriber: PrescriberCredentials = {
      prescriberId: 'presc_md_vance',
      fullName: 'Dr. Sarah Vance, MD',
      professionalRole: 'MD',
      stateLicenseNumber: 'MD-CA-402911',
      licenseJurisdiction: 'US-CA',
      npiNumber: '1982736450',
      deaRegistrationNumber: 'BV1982734',
      prescribingAuthorityActive: true,
    };

    it('validates prescriber credentials, cross-references allergies, blocks conflicts, and transmits clean prescriptions', () => {
      // 1. Validate prescriber
      const check = verifyPrescriberCredentials(licensedPrescriber);
      expect(check.verified).toBe(true);

      // 2. Patient with documented lidocaine allergy attempting to receive BLT cream
      const conflictedRx = createElectronicPrescription({
        prescriptionId: 'rx_blt_101',
        clientId: 'cl_sophia',
        clientName: 'Sophia Miller',
        clientDob: '1992-04-12',
        clientAllergies: ['Lidocaine', 'Sulfa'],
        prescriber: licensedPrescriber,
        medication: {
          medicationName: 'BLT Topical Cream (Benzocaine 20%, Lidocaine 6%, Tetracaine 4%)',
          dosageForm: 'Topical Ointment',
          strength: '20/6/4%',
          directionsSig: 'Apply thin layer 30 min before procedure',
          quantityDispense: 30,
          quantityUnit: 'grams',
          refillsAllowed: 0,
        },
        diagnosisCodeICD10: 'L70.0',
      });

      expect(conflictedRx.status).toBe('rejected_allergy_conflict');
      expect(conflictedRx.allergyWarning).toContain('Severe contraindication');

      // 3. Block transmission of conflicted prescription
      expect(() =>
        transmitPrescriptionToPharmacy(conflictedRx, {
          ncpdpId: 'NCPDP_992144',
          pharmacyName: 'Atelier Compounding Pharmacy NYC',
          address: '450 Lexington Ave, NY',
          phone: '+1-212-555-0811',
        })
      ).toThrow('Cannot transmit prescription in status "rejected_allergy_conflict"');

      // 4. Clean prescription: Prophylactic Valacyclovir for Laser Resurfacing (Allergy-free)
      const cleanRx = createElectronicPrescription({
        prescriptionId: 'rx_val_102',
        clientId: 'cl_eva',
        clientName: 'Eva Green',
        clientDob: '1988-08-20',
        clientAllergies: ['Penicillin'],
        prescriber: licensedPrescriber,
        medication: {
          medicationName: 'Valacyclovir 500mg Tablet',
          dosageForm: 'Oral Tablet',
          strength: '500mg',
          directionsSig: 'Take 1 tablet twice daily starting 1 day prior to laser',
          quantityDispense: 10,
          quantityUnit: 'tablets',
          refillsAllowed: 0,
        },
        diagnosisCodeICD10: 'B00.9',
      });

      expect(cleanRx.status).toBe('verified_ready');

      const txRecord = transmitPrescriptionToPharmacy(cleanRx, {
        ncpdpId: 'NCPDP_992144',
        pharmacyName: 'Atelier Compounding Pharmacy NYC',
        address: '450 Lexington Ave, NY',
        phone: '+1-212-555-0811',
      });

      expect(txRecord.deliveryConfirmationStatus).toBe('delivered');
      expect(txRecord.prescriberDigitalSignature).toContain('Dr. Sarah Vance, MD');
    });
  });

  describe('Posie Core Logic - F175 (Clinical Telehealth Network)', () => {
    const clinicianRoster: TelehealthClinician[] = [
      {
        clinicianId: 'doc_ny_sarah',
        fullName: 'Dr. Sarah Vance, MD',
        title: 'MD',
        licensedStates: ['US-NY', 'US-NJ'],
        npiNumber: '1982736450',
        telehealthCertified: true,
        activeStatus: 'available',
      },
      {
        clinicianId: 'doc_ca_kevin',
        fullName: 'Dr. Kevin Zhao, MD',
        title: 'MD',
        licensedStates: ['US-CA'],
        npiNumber: '1827364590',
        telehealthCertified: true,
        activeStatus: 'available',
      },
    ];

    it('matches clinicians strictly by client physical state, conducts good faith exams, and escalates acute contraindications', () => {
      // 1. Match clinician for NY patient
      const nyMatch = matchTelehealthClinician('US-NY', clinicianRoster);
      expect(nyMatch?.clinicianId).toBe('doc_ny_sarah');

      // 2. Reject cross-state consultation if clinician is not licensed in patient state
      expect(() =>
        conductTelehealthConsultation({
          consultationId: 'tele_101',
          clientId: 'cl_california_guest',
          clientName: 'Chloe California',
          clientPhysicalState: 'US-CA',
          clinician: clinicianRoster[0], // Licensed only in NY & NJ
          primaryConcernOrServiceRequested: 'Good Faith Exam for Dermal Fillers',
          reportedMedicalHistory: {
            allergies: [],
            medications: [],
            pregnantOrNursing: false,
            activeSkinInfections: false,
          },
        })
      ).toThrow('is not licensed in client state US-CA');

      // 3. Clear consultation for eligible patient
      const clearedConsult = conductTelehealthConsultation({
        consultationId: 'tele_102',
        clientId: 'cl_ny_guest',
        clientName: 'Olivia Wilde',
        clientPhysicalState: 'US-NY',
        clinician: clinicianRoster[0],
        primaryConcernOrServiceRequested: 'Good Faith Exam for Dysport',
        reportedMedicalHistory: {
          allergies: [],
          medications: [],
          pregnantOrNursing: false,
          activeSkinInfections: false,
        },
      });

      expect(clearedConsult.clearanceOutcome).toBe('cleared_for_treatment');
      expect(clearedConsult.validityWindowDays).toBe(365);

      // 4. Acute contraindication triggers escalation to in-person urgent care
      const infectedConsult = conductTelehealthConsultation({
        consultationId: 'tele_103',
        clientId: 'cl_ny_guest_2',
        clientName: 'Rachel Green',
        clientPhysicalState: 'US-NY',
        clinician: clinicianRoster[0],
        primaryConcernOrServiceRequested: 'Good Faith Exam for Microneedling',
        reportedMedicalHistory: {
          allergies: [],
          medications: [],
          pregnantOrNursing: false,
          activeSkinInfections: true, // Red flag!
        },
      });

      expect(infectedConsult.clearanceOutcome).toBe('escalated_urgent_care');

      const escalationPacket = escalateUrgentClinicalCase(
        infectedConsult,
        'Suspected active bacterial impetigo or viral flare on mid-face.'
      );
      expect(escalationPacket.escalationSeverity).toBe('urgent_referral');
      expect(escalationPacket.recommendedCareSetting).toBe('in_person_dermatologist');
    });
  });

  describe('Posie Core Logic - F176 (Insurance Billing)', () => {
    const verifiedPolicy: InsurancePolicyDetails = {
      payerId: 'PAYER_BCBS',
      payerName: 'Blue Cross Blue Shield',
      memberId: 'MEM_9921448',
      insuredName: 'Sophia Miller',
      relationshipToInsured: 'self',
      isEligibilityVerified: true,
      verifiedCopayAmount: 30.0,
      verifiedDeductibleRemaining: 0,
    };

    it('creates electronic claims, reconciles remittances, and assigns accountable owners to claim denials', () => {
      // 1. Rejects unverified insurance eligibility
      expect(() =>
        createInsuranceClaim({
          claimId: 'clm_101',
          appointmentId: 'appt_med_1',
          clientId: 'client_sophia',
          clientName: 'Sophia Miller',
          renderingProviderNpi: '1982736450',
          renderingProviderName: 'Dr. Sarah Vance, MD',
          renderingProviderTaxonomy: '207N00000X',
          billingProviderNpi: '1982736450',
          policy: { ...verifiedPolicy, isEligibilityVerified: false },
          diagnosisCodesICD10: ['L70.0'],
          lineItems: [{ serviceDate: '2026-11-01', cptCode: '99213', cptDescription: 'Office Visit Level 3', billedCharge: 180.0, units: 1, diagnosisPointers: ['L70.0'] }],
        })
      ).toThrow('Insurance eligibility must be verified');

      // 2. Creates valid claim
      const claim = createInsuranceClaim({
        claimId: 'clm_101',
        appointmentId: 'appt_med_1',
        clientId: 'client_sophia',
        clientName: 'Sophia Miller',
        renderingProviderNpi: '1982736450',
        renderingProviderName: 'Dr. Sarah Vance, MD',
        renderingProviderTaxonomy: '207N00000X',
        billingProviderNpi: '1982736450',
        policy: verifiedPolicy,
        diagnosisCodesICD10: ['L70.0'],
        lineItems: [
          { serviceDate: '2026-11-01', cptCode: '99213', cptDescription: 'Office Visit Level 3', billedCharge: 180.0, units: 1, diagnosisPointers: ['L70.0'] },
          { serviceDate: '2026-11-01', cptCode: '17110', cptDescription: 'Destruction of Benign Lesions', billedCharge: 220.0, units: 1, diagnosisPointers: ['L70.0'] },
        ],
      });

      expect(claim.totalBilledAmount).toBe(400.0);
      expect(claim.status).toBe('draft');

      // 3. Reconcile clean ERA 835 remittance
      const cleanEra: RemittanceAdvice835 = {
        remittanceId: 'era_8821',
        claimId: 'clm_101',
        payerName: 'Blue Cross Blue Shield',
        allowedAmount: 320.0,
        paidAmount: 290.0,
        patientResponsibilityCopay: 30.0,
        patientResponsibilityCoinsurance: 0,
        contractualAdjustment: 80.0, // 400 - 320
        claimStatusCode: 'processed_as_primary',
        adjudicatedAt: '2026-11-04T12:00:00Z',
      };

      const cleanReconciliation = reconcileClaimRemittance(claim, cleanEra);
      expect(cleanReconciliation.updatedClaim.status).toBe('adjudicated_paid');
      expect(cleanReconciliation.denialAppealNeeded).toBe(false);
      expect(cleanReconciliation.financialSummary.paid).toBe(290.0);
      expect(cleanReconciliation.financialSummary.patientOwes).toBe(30.0);

      // 4. Invariant: Denied remittance requires accountable owner assignment
      const deniedEra: RemittanceAdvice835 = {
        remittanceId: 'era_denied_991',
        claimId: 'clm_101',
        payerName: 'Blue Cross Blue Shield',
        allowedAmount: 0,
        paidAmount: 0,
        patientResponsibilityCopay: 0,
        patientResponsibilityCoinsurance: 0,
        contractualAdjustment: 0,
        claimStatusCode: 'denied',
        denialReasonCode: 'CO-16', // Missing clinical documentation / modifier
        adjudicatedAt: '2026-11-04T12:00:00Z',
      };

      const deniedReconciliation = reconcileClaimRemittance(claim, deniedEra);
      expect(deniedReconciliation.updatedClaim.status).toBe('denied_pending_appeal');
      expect(deniedReconciliation.denialAppealNeeded).toBe(true);

      const appeal = assignClaimDenialAppeal(
        claim.claimId,
        'CO-16',
        'Jenna Reynolds (Lead Medical Biller)',
        'Attach signed SOAP treatment chart and append modifier -25 to E/M visit.'
      );

      expect(appeal.assignedOwnerName).toBe('Jenna Reynolds (Lead Medical Biller)');
      expect(appeal.status).toBe('open');
    });
  });

  describe('Posie Core Logic - F177 (Consumer Discovery Marketplace)', () => {
    it('supports opt-in listings, protects direct and repeat clients with 0% fees, and manages attribution disputes', () => {
      const listing = toggleMarketplaceListing(
        {
          listingId: 'list_soho_1',
          salonId: 'salon_maya_soho',
          businessName: 'Atelier Maya SoHo',
          locationCity: 'New York, NY',
          isOptedIn: false,
          publishedCategories: ['hair_color', 'balayage'],
          commissionRatePercentage: 15.0,
        },
        true
      );
      expect(listing.isOptedIn).toBe(true);

      // 1. Direct booking via salon URL -> 0% fee (Invariant)
      const directAttr = evaluateBookingAttribution(
        {
          bookingId: 'bk_direct_1',
          salonId: 'salon_maya_soho',
          clientId: 'cl_new_direct',
          bookingAmount: 200.0,
          referralSource: 'direct_brand_url',
        },
        0 // New client, but arrived directly
      );

      expect(directAttr.attributionSource).toBe('direct_pro_client');
      expect(directAttr.commissionPercentage).toBe(0);
      expect(directAttr.payoutToSalon).toBe(200.0);
      expect(directAttr.disputeAvailable).toBe(false);

      // 2. Existing client booking via marketplace search -> 0% fee (Invariant: Protected relationship)
      const existingClientAttr = evaluateBookingAttribution(
        {
          bookingId: 'bk_repeat_2',
          salonId: 'salon_maya_soho',
          clientId: 'cl_charlotte_repeat',
          bookingAmount: 300.0,
          referralSource: 'posie_marketplace_search',
        },
        4 // 4 prior visits
      );

      expect(existingClientAttr.attributionSource).toBe('direct_pro_client');
      expect(existingClientAttr.commissionPercentage).toBe(0);
      expect(existingClientAttr.payoutToSalon).toBe(300.0);

      // 3. Net-new discovery client via marketplace search -> 15% discovery fee
      const netNewDiscovery = evaluateBookingAttribution(
        {
          bookingId: 'bk_netnew_3',
          salonId: 'salon_maya_soho',
          clientId: 'cl_stranger_netnew',
          bookingAmount: 160.0,
          referralSource: 'posie_marketplace_search',
        },
        0 // 0 prior visits
      );

      expect(netNewDiscovery.attributionSource).toBe('marketplace_discovery');
      expect(netNewDiscovery.commissionAmountOwed).toBe(24.0); // 15% of $160
      expect(netNewDiscovery.payoutToSalon).toBe(136.0);
      expect(netNewDiscovery.disputeAvailable).toBe(true);

      // 4. File attribution dispute
      const dispute = fileAttributionDispute(
        netNewDiscovery,
        'Client was referred via personal Instagram DM with proof token.',
        'IG_CAMPAIGN_TOKEN_MAYASOHO'
      );
      expect(dispute.status).toBe('under_review');
      expect(dispute.proEvidenceToken).toBe('IG_CAMPAIGN_TOKEN_MAYASOHO');
    });
  });

  describe('Posie Core Logic - F178 (Embedded Working Capital)', () => {
    it('generates transparent fixed-fee offers, enforces owner acceptance, and deducts daily card holdback', () => {
      // 1. Generate offer based on $20k monthly volume
      const offer = generateWorkingCapitalOffer('salon_maya_soho', 20000.0, 15000.0);
      expect(offer.advanceAmount).toBe(15000.0);
      expect(offer.fixedFactorFee).toBe(1800.0); // 1.12 factor rate
      expect(offer.totalRepaymentAmount).toBe(16800.0);
      expect(offer.holdbackPercentage).toBe(10.0);
      expect(offer.disclosures[0]).toContain('Fixed fee: No compounding interest');

      // 2. Reject advance over eligibility cap (max $30k)
      expect(() => generateWorkingCapitalOffer('salon_maya_soho', 20000.0, 35000.0)).toThrow(
        'exceeds maximum eligible amount'
      );

      // 3. Accept advance requires owner confirmation
      expect(() => acceptWorkingCapitalAdvance(offer, false)).toThrow('explicit salon owner acceptance');
      const activeAdvance = acceptWorkingCapitalAdvance(offer, true);
      expect(activeAdvance.status).toBe('active_repaying');
      expect(activeAdvance.remainingBalance).toBe(16800.0);

      // 4. Settle daily holdback deduction from $1,200 daily card batch (10% = $120)
      const deduction1 = settleDailyHoldbackDeduction(activeAdvance, 1200.0);
      expect(deduction1.holdbackDeducted).toBe(120.0);
      expect(deduction1.netPayoutToSalon).toBe(1080.0);
      expect(deduction1.remainingAdvanceBalance).toBe(16680.0);
      expect(deduction1.isFullySettled).toBe(false);
    });
  });

  describe('Posie Core Logic - F179 (Financial Protection Products)', () => {
    const compliantBooking: ProtectedBookingDetails = {
      bookingId: 'bk_prot_101',
      salonId: 'salon_maya_soho',
      clientId: 'cl_no_show_dan',
      serviceName: 'Balayage & Glaze',
      servicePrice: 280.0,
      cancellationFeePolicyAmount: 140.0, // 50% cancellation fee
      hasPreauthorizedCard: true,
      hasSignedCancellationPolicy: true,
      hasConfirmedAppointmentReminder: true,
      wasCancelledBySalon: false,
    };

    it('enforces underwriting eligibility exclusions and reimburses approved claims from funded reserves', () => {
      // 1. Ineligible exclusion: Salon-cancelled booking
      const salonCancelledCheck = evaluateProtectionEligibility({
        ...compliantBooking,
        wasCancelledBySalon: true,
      });
      expect(salonCancelledCheck.eligible).toBe(false);
      expect(salonCancelledCheck.exclusionReason).toContain('Cancellations initiated by the salon');

      // 2. Ineligible exclusion: Missing card preauthorization
      const noCardCheck = evaluateProtectionEligibility({
        ...compliantBooking,
        hasPreauthorizedCard: false,
      });
      expect(noCardCheck.eligible).toBe(false);
      expect(noCardCheck.exclusionReason).toContain('verified pre-authorized payment method');

      // 3. File valid claim for uncollectible no-show (client card declined on late charge attempt)
      const claim = fileProtectionClaim({
        claimId: 'claim_noshow_9921',
        booking: compliantBooking,
        incidentType: 'uncollectible_no_show',
        failedChargeAttemptDetails: {
          attemptedAmount: 140.0,
          declineCode: 'card_declined_insufficient_funds',
          attemptedAt: '2026-11-10T14:30:00Z',
        },
      });

      expect(claim.status).toBe('submitted_evaluating');
      expect(claim.claimedAmount).toBe(140.0);

      // 4. Adjudicate claim: Underwriter approves and disburses reimbursement to salon
      const adjudication = adjudicateProtectionClaim(claim, true);
      expect(adjudication.updatedClaim.status).toBe('approved_reimbursed');
      expect(adjudication.reimbursementPaid).toBe(140.0);
    });
  });

  describe('Posie Core Logic - F180 (External Staffing Marketplace)', () => {
    const verifiedStylist: ExternalSubstituteProfile = {
      substituteId: 'sub_stylist_marcus',
      fullName: 'Marcus Vance',
      specialtyRole: 'hair_stylist',
      stateLicenseNumber: 'COSM-NY-49210',
      licensedJurisdiction: 'US-NY',
      backgroundCheckPassed: true,
      insurancePolicyNumber: 'POL-PRO-8819',
      ratingAverage: 4.95,
      completedShiftsCount: 14,
      status: 'active_verified',
    };

    const shiftRequest: ExternalShiftRequest = {
      shiftId: 'shift_ext_992',
      salonId: 'salon_maya_soho',
      salonName: 'Atelier Maya SoHo',
      locationState: 'US-NY',
      shiftDate: '2026-11-18',
      startTime: '10:00',
      endTime: '16:00',
      durationHours: 6,
      requiredRole: 'hair_stylist',
      offeredHourlyRate: 45.0,
      totalCompensationEscrow: 270.0, // 6 hrs * $45
    };

    it('verifies substitute credentials, escrows compensation, releases net payout, and freezes escrow on dispute', () => {
      // 1. Register substitute
      const sub = registerExternalSubstitute({
        substituteId: 'sub_1',
        fullName: 'Marcus Vance',
        specialtyRole: 'hair_stylist',
        stateLicenseNumber: 'COSM-NY-49210',
        licensedJurisdiction: 'US-NY',
        backgroundCheckPassed: true,
      });
      expect(sub.status).toBe('active_verified');

      // 2. Reject role or jurisdiction mismatch
      expect(() =>
        matchExternalShiftCoverage(shiftRequest, { ...verifiedStylist, specialtyRole: 'nail_artist' })
      ).toThrow('does not match shift requirement');

      expect(() =>
        matchExternalShiftCoverage(shiftRequest, { ...verifiedStylist, licensedJurisdiction: 'US-NJ' })
      ).toThrow('does not match shift location');

      // 3. Match valid shift: Escrow $270, 10% platform fee ($27), Net payout ($243)
      const gig = matchExternalShiftCoverage(shiftRequest, verifiedStylist, 10.0);
      expect(gig.agreedCompensation).toBe(270.0);
      expect(gig.platformServiceFee).toBe(27.0);
      expect(gig.netSubstitutePayout).toBe(243.0);
      expect(gig.escrowStatus).toBe('held_in_escrow');

      // 4. Clean shift completion: Releases escrow payout
      const cleanSettlement = completeShiftAndReleaseEscrow(gig);
      expect(cleanSettlement.updatedGig.status).toBe('completed_verified');
      expect(cleanSettlement.payoutReleased).toBe(243.0);
      expect(cleanSettlement.statusSummary).toContain('Net payout of $243.00 released');

      // 5. Invariant: Incident lodged freezes escrow in dispute
      const disputedSettlement = completeShiftAndReleaseEscrow(
        gig,
        'Substitute arrived 45 minutes late and failed to sanitize station.'
      );
      expect(disputedSettlement.updatedGig.status).toBe('incident_flagged');
      expect(disputedSettlement.updatedGig.escrowStatus).toBe('frozen_in_dispute');
      expect(disputedSettlement.payoutReleased).toBe(0);
      expect(disputedSettlement.statusSummary).toContain('Escrow frozen pending operational dispute resolution');
    });
  });

  describe('Posie Core Logic - F181 (Collective Purchasing Network)', () => {
    const item: PurchasingBatchItem = {
      itemId: 'prod_color_tubes_6n',
      name: 'Olaplex Bond Multiplier No. 1 (500ml Backbar)',
      sku: 'OLA-BOND-500',
      category: 'backbar',
      unitPriceRetail: 120.0,
      unitPriceNegotiated: 75.0, // $45 gross discount per unit
      minimumOrderQuantity: 20,
    };

    const intents: SalonOrderIntent[] = [
      {
        salonId: 'salon_a',
        salonName: 'Atelier SoHo',
        itemId: 'prod_color_tubes_6n',
        quantity: 10,
        shippingAddress: '100 Prince St, New York, NY',
      },
      {
        salonId: 'salon_b',
        salonName: 'Luxe Brooklyn',
        itemId: 'prod_color_tubes_6n',
        quantity: 15,
        shippingAddress: '45 Main St, Brooklyn, NY',
      },
    ];

    it('aggregates demand, ensures net savings survive shipping and waste, and traces batch fulfillment', () => {
      // 1. Unmet MOQ scenario
      const unmetBatch = createPurchasingBatchOrder('batch_unmet', item, [intents[0]]); // 10 units < 20 MOQ
      expect(unmetBatch.totalQuantity).toBe(10);
      expect(unmetBatch.moqMet).toBe(false);
      expect(unmetBatch.status).toBe('open_accumulating');

      expect(() => allocateBatchFulfillment(unmetBatch, [intents[0]], 'TRACK_123')).toThrow(
        'has not satisfied supplier minimum order quantity'
      );

      // 2. Satisfied MOQ: 25 units pooled >= 20 MOQ
      const metBatch = createPurchasingBatchOrder('batch_met', item, intents);
      expect(metBatch.totalQuantity).toBe(25);
      expect(metBatch.moqMet).toBe(true);
      expect(metBatch.status).toBe('pooled_moq_met');
      // Gross discount = 25 * ($120 - $75) = $1,125.00
      expect(metBatch.grossSupplierDiscount).toBe(1125.0);
      // Net savings must survive friction (shipping $25 min, 2% waste $37.50, 5% fee $56.25)
      expect(metBatch.netSalonSavings).toBeGreaterThan(900.0);
      expect(metBatch.netSavingsPercentage).toBeGreaterThan(25.0);

      // 3. Allocate and trace batch fulfillment
      const fulfillment = allocateBatchFulfillment(metBatch, intents, 'FEDEX-9921448821');
      expect(fulfillment.status).toBe('dispatched');
      expect(fulfillment.carrierTrackingNumber).toBe('FEDEX-9921448821');
      expect(fulfillment.allocations).toHaveLength(2);
      expect(fulfillment.allocations[0].salonId).toBe('salon_a');
      expect(fulfillment.allocations[0].unitsDispatched).toBe(10);
      expect(fulfillment.allocations[1].salonId).toBe('salon_b');
      expect(fulfillment.allocations[1].unitsDispatched).toBe(15);
      expect(fulfillment.allocations[0].proRataNetSavings + fulfillment.allocations[1].proRataNetSavings).toBeCloseTo(
        metBatch.netSalonSavings,
        1
      );
    });
  });

  describe('Posie Core Logic - F182 (Privacy Preserving Peer Benchmarks)', () => {
    // Generate synthetic cohort of 12 salons
    const sampleSalons: SalonBenchmarkProfile[] = Array.from({ length: 12 }, (_, i) => ({
      salonId: `salon_peer_${i + 1}`,
      salonName: `Studio ${i + 1}`,
      businessType: 'hair_salon',
      maturityTier: 'growth_2_4yr',
      metroTier: 'tier_1_major',
      optInBenchmarking: i !== 11, // 11 opted-in, 1 opted-out
      metrics: {
        rebookRatePct: 50 + i * 2, // 50% to 72%
        retailToServiceRatioPct: 10 + i * 0.5,
        clientRetention90DayPct: 65 + i,
        revPerHourChair: 80 + i * 5,
      },
    }));

    const query: BenchmarkCohortQuery = {
      businessType: 'hair_salon',
      maturityTier: 'growth_2_4yr',
      metroTier: 'tier_1_major',
    };

    it('suppresses peer benchmark output when cohort size is below k-anonymity cell size threshold', () => {
      // Threshold 10: Cohort has 11 consenting salons -> Passes
      const validReport = generatePeerBenchmarkReport(sampleSalons, query, 10);
      expect(validReport.isSuppressed).toBe(false);
      expect(validReport.qualifyingCohortSize).toBe(11);
      expect(validReport.distributions).toBeDefined();
      expect(validReport.distributions?.rebookRatePct.median).toBeGreaterThanOrEqual(50);
      expect(validReport.distributions?.revPerHourChair.p75).toBeGreaterThan(validReport.distributions?.revPerHourChair.p25!);

      // Threshold 15: Cohort has 11 consenting salons -> Suppressed to prevent re-identification
      const suppressedReport = generatePeerBenchmarkReport(sampleSalons, query, 15);
      expect(suppressedReport.isSuppressed).toBe(true);
      expect(suppressedReport.suppressionReason).toContain('INSUFFICIENT_CELL_SIZE_K_ANONYMITY');
      expect(suppressedReport.distributions).toBeUndefined();
    });
  });

  describe('Posie Core Logic - F183 (Visual Service Previews)', () => {
    const validConsent: ClientSimulationConsent = {
      clientId: 'client_charlotte_9',
      consentGiven: true,
      consentedAt: '2026-11-20T11:00:00Z',
      allowPortfolioUse: false,
      rightToDeleteRequested: false,
    };

    const simParams: VisualSimulationParams = {
      simulationType: 'hair_balayage_tone',
      targetShadeOrStyle: 'Honey Melt Caramel',
      intensityLevel: 7,
    };

    it('enforces explicit consent, embeds mandatory disclaimer, and allows client data purging', () => {
      // 1. Blocks simulation without consent
      expect(() =>
        createVisualServicePreview('client_charlotte_9', 'hash_sha256_8819', simParams, {
          ...validConsent,
          consentGiven: false,
        })
      ).toThrow('verified client consultation consent is required');

      // 2. Generates simulation with legal disclaimer watermark and outcome non-guarantee
      const preview = createVisualServicePreview('client_charlotte_9', 'hash_sha256_8819', simParams, validConsent);
      expect(preview.simulationType).toBe('hair_balayage_tone');
      expect(preview.mandatoryDisclaimerWatermark).toBe(MANDATORY_PREVIEW_DISCLAIMER);
      expect(preview.isGuaranteedOutcome).toBe(false);
      expect(preview.retentionPolicy).toBe('delete_after_consultation');
      expect(preview.status).toBe('draft_preview');

      // 3. Client invokes right-to-delete
      const purged = purgeSimulationRecordPerClient(preview);
      expect(purged.status).toBe('purged_per_client_request');
      expect(purged.previewImageUrl).toBe('');
    });
  });

  describe('Posie Core Logic - F184 (Clinical Image Interpretation)', () => {
    it('strictly segregates diagnostic image assessment from regular booking and enforces SaMD boundaries', () => {
      const casualBookingContext: ImageGovernanceContext = {
        imageId: 'img_facial_consult_10',
        capturedInModule: 'booking_flow',
        uploaderRole: 'esthetician',
      };

      // 1. Standard cosmetic photo without diagnostic claim -> allowed
      const standardEval = evaluateClinicalImageGovernance(casualBookingContext);
      expect(standardEval.isDiagnosticLaunchBlocked).toBe(false);
      expect(standardEval.regulatoryStatus).toBe('standard_cosmetic_photography');

      // 2. Attempting autonomous diagnosis within standard booking -> STRICTLY BLOCKED
      const diagnosticAttempt: ClinicalDiagnosticAttempt = {
        suspectedCondition: 'Melanocytic Nevus vs Melanoma',
        automatedClassificationConfidence: 0.94,
        requestingDiagnosticReport: true,
      };

      const blockedEval = evaluateClinicalImageGovernance(casualBookingContext, diagnosticAttempt);
      expect(blockedEval.isDiagnosticLaunchBlocked).toBe(true);
      expect(blockedEval.blockReason).toContain('REGULATORY_BOUNDARY_VIOLATION');
      expect(blockedEval.recommendedAction).toBe('block_autonomous_diagnosis_and_refer_in_person');
      expect(blockedEval.isSegregatedFromBooking).toBe(true);

      // 3. Regulated investigational clinical trial with licensed physician -> investigational SaMD allowed
      const trialContext: ImageGovernanceContext = {
        imageId: 'img_samd_trial_901',
        capturedInModule: 'investigational_dermatology',
        uploaderRole: 'physician',
      };

      const trialEval = evaluateClinicalImageGovernance(trialContext, diagnosticAttempt);
      expect(trialEval.isDiagnosticLaunchBlocked).toBe(false);
      expect(trialEval.regulatoryStatus).toBe('investigational_samd_only');
      expect(trialEval.recommendedAction).toBe('conduct_under_approved_irb_protocol');
    });
  });

  describe('Posie Core Logic - F185 (Proprietary Payment Hardware Governance)', () => {
    const certifiedTerminal: CertifiedPartnerDevice = {
      deviceId: 'dev_wisepos_e_01',
      model: 'stripe_wisepos_e',
      pciPtsCertified: true,
      nfcContactlessEnabled: true,
      offlineProcessingSupport: true,
      unitCostUsd: 249.0,
      fieldFailureRatePct: 2.1,
    };

    it('rejects custom proprietary terminals when certified partner devices meet needs or beat lifecycle TCO', () => {
      // Proposal 1: Partner meets needs -> Custom rejected
      const proposalWithoutNeed: ProprietaryHardwareProposal = {
        proposalId: 'prop_hw_01',
        hardwareCodename: 'PosieTerminal-X1',
        validatedNeedUnmetByPartners: false,
        unmetNeedDescription: 'Bespoke aesthetic casing for countertop',
        projectedBomCostUsd: 180.0,
        certificationCostUsd: 150000.0,
        expectedAnnualRmaRatePct: 4.5,
        projectedVolumeUnits: 500,
      };

      const verdict1 = evaluatePaymentHardwareStrategy(proposalWithoutNeed, certifiedTerminal);
      expect(verdict1.approvedForCustomManufacturing).toBe(false);
      expect(verdict1.recommendedSolution).toBe('adopt_certified_partner_terminal');
      expect(verdict1.rejectionReason).toContain('VALIDATED_NEED_UNSATISFIED');

      // Proposal 2: Unmet need claimed, but custom lifecycle TCO ($180 BOM + $300 cert + $24 RMA + $450 support) > partner TCO
      const proposalHighTco: ProprietaryHardwareProposal = {
        ...proposalWithoutNeed,
        validatedNeedUnmetByPartners: true,
        unmetNeedDescription: 'Acetone-resistant capacitive touchscreen for nail salons',
      };

      const verdict2 = evaluatePaymentHardwareStrategy(proposalHighTco, certifiedTerminal);
      expect(verdict2.approvedForCustomManufacturing).toBe(false);
      expect(verdict2.rejectionReason).toContain('LIFECYCLE_ECONOMICS_UNFAVORABLE');

      // Terminal runtime health check
      const healthyStatus = checkTerminalHealth({
        deviceId: 'dev_wisepos_e_01',
        firmwareVersion: 'v2.4.1-pci',
        batteryPct: 88,
        tamperSensorTriggered: false,
        pciPtsExpiryYear: 2029,
      });
      expect(healthyStatus.operational).toBe(true);
      expect(healthyStatus.alerts).toHaveLength(0);

      const tamperedStatus = checkTerminalHealth({
        deviceId: 'dev_wisepos_e_02',
        firmwareVersion: 'v2.4.1-pci',
        batteryPct: 88,
        tamperSensorTriggered: true,
        pciPtsExpiryYear: 2029,
      });
      expect(tamperedStatus.operational).toBe(false);
      expect(tamperedStatus.alerts[0]).toContain('Physical tamper sensor triggered');
    });
  });

  describe('Posie Core Logic - F186 (Client Pay Over Time / BNPL)', () => {
    it('evaluates consumer installment eligibility, funds salon upfront with partner default risk, and processes refunds', () => {
      // 1. Ineligible thresholds (<$50 and >$4000)
      const lowEval = evaluateBnplCheckoutEligibility(35.0, 'klarna');
      expect(lowEval.isEligible).toBe(false);
      expect(lowEval.ineligibilityReason).toContain('below minimum BNPL threshold');

      const highEval = evaluateBnplCheckoutEligibility(5000.0, 'klarna');
      expect(highEval.isEligible).toBe(false);
      expect(highEval.ineligibilityReason).toContain('exceeds maximum BNPL threshold');

      // 2. Eligible: $300 service -> 4 bi-weekly payments of $75
      const validEval = evaluateBnplCheckoutEligibility(300.0, 'klarna');
      expect(validEval.isEligible).toBe(true);
      expect(validEval.offeredPlans).toHaveLength(1);
      const plan = validEval.offeredPlans[0];
      expect(plan.numberOfInstallments).toBe(4);
      expect(plan.installmentAmount).toBe(75.0);
      expect(plan.dueDates).toHaveLength(4);

      // 3. Upfront salon settlement: Salon gets $300 - ($300 * 5.9% + $0.30) = $282.00
      const settlement = settleBnplBooking('booking_bnpl_99', plan, 0.059, 0.3);
      expect(settlement.status).toBe('settled_funded');
      expect(settlement.partnerInterchangeFee).toBe(18.0);
      expect(settlement.salonImmediatePayoutAmount).toBe(282.0);
      expect(settlement.defaultRiskAssumedBy).toBe('financing_partner_exclusive');

      // 4. Refund adjustment: $100 partial refund adjusts client installments and salon ledger
      const { updatedSettlement, refundAdjustment } = processBnplRefund(settlement, 100.0);
      expect(updatedSettlement.status).toBe('refunded_partially');
      expect(refundAdjustment.refundAmount).toBe(100.0);
      expect(refundAdjustment.salonLedgerDeduction).toBe(100.0);
      expect(refundAdjustment.clientRemainingInstallmentReduction).toBe(100.0);
    });
  });

  describe('Posie Core Logic - F187 (Optional Card Fee Offset / Compliant Surcharging)', () => {
    it('strictly prohibits debit card surcharging, enforces statutory state bans, and caps credit surcharges', () => {
      // 1. Invariant: Debit and prepaid cards are NEVER surcharged
      const debitEval = evaluateCardFeeOffset({
        serviceSubtotal: 100.0,
        tenderType: 'debit_card',
        jurisdictionState: 'US-NY',
        configuredSurchargePercentage: 3.0,
      });
      expect(debitEval.isSurchargeApplicable).toBe(false);
      expect(debitEval.surchargeAmount).toBe(0);
      expect(debitEval.debitCardExclusionEnforced).toBe(true);
      expect(debitEval.regulatoryComplianceNote).toContain('strictly prohibit surcharges on all debit card');

      // 2. Cash and ACH incur 0% fee
      const cashEval = evaluateCardFeeOffset({
        serviceSubtotal: 100.0,
        tenderType: 'cash',
        jurisdictionState: 'US-NY',
      });
      expect(cashEval.isSurchargeApplicable).toBe(false);
      expect(cashEval.finalTotalToCharge).toBe(100.0);

      // 3. Statutory state ban: Connecticut (US-CT) prohibits surcharging
      const ctEval = evaluateCardFeeOffset({
        serviceSubtotal: 100.0,
        tenderType: 'credit_card',
        jurisdictionState: 'US-CT',
        configuredSurchargePercentage: 3.0,
      });
      expect(ctEval.isSurchargeApplicable).toBe(false);
      expect(ctEval.regulatoryComplianceNote).toContain('Conn. Gen. Stat. § 42-133ff');

      // 4. Permitted state (US-NY): Surcharge applied and capped at 3% max
      const nyEval = evaluateCardFeeOffset({
        serviceSubtotal: 150.0,
        tenderType: 'credit_card',
        jurisdictionState: 'US-NY',
        configuredSurchargePercentage: 2.8,
      });
      expect(nyEval.isSurchargeApplicable).toBe(true);
      expect(nyEval.surchargePercentage).toBe(2.8);
      expect(nyEval.surchargeAmount).toBe(4.2);
      expect(nyEval.finalTotalToCharge).toBe(154.2);
      expect(nyEval.lineItemDescription).toContain('Credit Card Processing Offset (2.80%)');
    });
  });

  describe('Posie Core Logic - F188 (Native Discovery Booking Integrations)', () => {
    const catalog: NativeCatalogFeedItem[] = [
      {
        serviceId: 'srv_facial_glow',
        name: 'Hydra-Dew Glass Glow Facial',
        durationMinutes: 60,
        currentPriceUsd: 120.0,
        isActive: true,
        bookableOnline: true,
      },
      {
        serviceId: 'srv_arch_sculpt',
        name: 'Precision Brow Arch Sculpt',
        durationMinutes: 30,
        currentPriceUsd: 55.0,
        isActive: true,
        bookableOnline: true,
      },
      {
        serviceId: 'srv_retired_pkg',
        name: 'Legacy Winter Special',
        durationMinutes: 45,
        currentPriceUsd: 80.0,
        isActive: false,
        bookableOnline: false,
      },
    ];

    it('publishes active bookable feeds, prevents price drift, and executes atomic booking without conflicts', () => {
      // 1. Catalog feed format: filters out inactive/unbookable items
      const feed = formatPartnerCatalogFeed('salon_soho', catalog);
      expect(feed.activeServicesCount).toBe(2);
      expect(feed.feedItems.map((f) => f.serviceId)).toEqual(['srv_facial_glow', 'srv_arch_sculpt']);

      // 2. Reject booking with price mismatch
      const bookingReq: NativePartnerBookingRequest = {
        partnerChannel: 'reserve_with_google',
        partnerBookingReference: 'rwg_ref_9921',
        salonId: 'salon_soho',
        serviceId: 'srv_facial_glow',
        serviceName: 'Hydra-Dew Glass Glow Facial',
        scheduledStartTime: '2026-11-25T14:00:00Z',
        scheduledEndTime: '2026-11-25T15:00:00Z',
        clientInfo: {
          fullName: 'Sloane Peterson',
          email: 'sloane@example.com',
          phone: '+1-555-8833',
        },
        quotedPriceUsd: 100.0, // Mismatch: live price is $120.00
      };

      expect(() => processNativePartnerBooking(bookingReq, catalog, [])).toThrow('Price mismatch: Partner quoted $100');

      // 3. Reject schedule conflict
      const existing = [{ scheduledStartTime: '2026-11-25T14:30:00Z', scheduledEndTime: '2026-11-25T15:30:00Z' }];
      expect(() =>
        processNativePartnerBooking({ ...bookingReq, quotedPriceUsd: 120.0 }, catalog, existing)
      ).toThrow('Schedule conflict');

      // 4. Successful atomic booking
      const confirmed = processNativePartnerBooking({ ...bookingReq, quotedPriceUsd: 120.0 }, catalog, []);
      expect(confirmed.status).toBe('confirmed_atomic');
      expect(confirmed.confirmedPriceUsd).toBe(120.0);
      expect(confirmed.calendarLocked).toBe(true);
      expect(confirmed.attributionTag).toBe('channel_reserve_with_google');
    });
  });

  describe('Posie Core Logic - F189 (Flexible Entry Plans & Acquisition Fees)', () => {
    it('calculates plan usage with zero hidden client convenience fees and recommends timely tier upgrades', () => {
      // 1. Starter Free tier with 25 appointments (within 30 cap) -> $0 base, $0 overage
      const usageWithinCap: SalonPlanUsage = {
        salonId: 'salon_solo_stylist',
        currentTier: 'starter_free',
        billingCycleMonth: '2026-11',
        appointmentsBookedCount: 25,
        marketplaceNetNewClientsCount: 0,
      };

      const billWithin = calculateFlexiblePlanBilling(usageWithinCap);
      expect(billWithin.baseSubscriptionFeeUsd).toBe(0);
      expect(billWithin.overageAppointmentsCount).toBe(0);
      expect(billWithin.totalMonthlyBillingUsd).toBe(0);
      expect(billWithin.checkoutClientSurchargesUsd).toBe(0);
      expect(billWithin.isUpgradeRecommended).toBe(false);

      // 2. Starter Free tier exceeding cap (50 appointments -> 20 overage @ $1.50 = $30 overage) + $400 net-new marketplace (15% = $60)
      const usageOverCap: SalonPlanUsage = {
        ...usageWithinCap,
        appointmentsBookedCount: 50,
        marketplaceNetNewClientsCount: 4,
      };

      const billOver = calculateFlexiblePlanBilling(usageOverCap, 400.0);
      expect(billOver.overageAppointmentsCount).toBe(20);
      expect(billOver.overageFeesUsd).toBe(30.0);
      expect(billOver.marketplaceAcquisitionFeesUsd).toBe(60.0);
      expect(billOver.totalMonthlyBillingUsd).toBe(90.0);
      expect(billOver.isUpgradeRecommended).toBe(true);

      // 3. Invariant: Consumer checkout has zero hidden markups
      const checkoutCheck = verifyConsumerCheckoutFeeIntegrity(120.0, 120.0);
      expect(checkoutCheck.isCompliant).toBe(true);
      expect(checkoutCheck.unexpectedMarkupDetected).toBe(0);

      const feeViolationCheck = verifyConsumerCheckoutFeeIntegrity(120.0, 123.5); // $3.50 hidden markup
      expect(feeViolationCheck.isCompliant).toBe(false);
      expect(feeViolationCheck.unexpectedMarkupDetected).toBe(3.5);
    });
  });

  describe('Posie Core Logic - F190 (Self-Service Subscription Exit)', () => {
    const exitRequest: SubscriptionExitRequest = {
      salonId: 'salon_leaving_studio',
      salonName: 'Leaving Studio',
      action: 'cancel_subscription',
      cancellationReason: 'Consolidating locations',
      confirmedByOwnerEmail: 'owner@leavingstudio.com',
    };

    it('executes 1-click self-service cancellation, guarantees 90-day read-only archive, and produces export manifest', () => {
      const exitSummary = processSelfServiceSubscriptionExit(exitRequest);

      // 1. Cancellation action registered
      expect(exitSummary.effectiveAction).toBe('cancelled');
      expect(exitSummary.immediateChanges.newBookingIntakeStopped).toBe(true);
      expect(exitSummary.immediateChanges.marketingSmsDisabled).toBe(true);

      // 2. 90-day read-only historical guarantee
      expect(exitSummary.historicalAccessGuarantee.readOnlyAccessGranted).toBe(true);
      expect(exitSummary.historicalAccessGuarantee.readOnlyPeriodDays).toBe(90);
      expect(new Date(exitSummary.historicalAccessGuarantee.readOnlyExpiresAt).getTime()).toBeGreaterThan(Date.now());

      // 3. Scheduled permanent purge
      expect(new Date(exitSummary.scheduledPurgeDate).getTime()).toBeGreaterThan(
        new Date(exitSummary.historicalAccessGuarantee.readOnlyExpiresAt).getTime()
      );

      // 4. Export archive manifest
      expect(exitSummary.exportArchiveManifest).toHaveLength(4);
      expect(exitSummary.exportArchiveManifest.map((m) => m.resourceType)).toEqual([
        'clients',
        'appointments',
        'financial_transactions',
        'treatment_notes',
      ]);
      expect(exitSummary.retentionPolicyStatement).toContain('Full client data, appointment history');
    });
  });

  describe('Posie Core Logic - F191 (SMS Marketing Campaigns)', () => {
    it('analyzes SMS segmentation, enforces TCPA quiet hours and opt-in consent, and caps budget', () => {
      // 1. Segmentation: GSM-7 vs Unicode emoji
      const gsmAnalysis = analyzeSmsMessageText('Enjoy 20% off all Hydra-Dew Facials this Thursday! Reply STOP to opt out.');
      expect(gsmAnalysis.encoding).toBe('GSM-7');
      expect(gsmAnalysis.segmentCount).toBe(1);
      expect(gsmAnalysis.hasMandatoryOptOutNotice).toBe(true);

      const unicodeAnalysis = analyzeSmsMessageText('✨ Glowing skin awaits! Book Hydra-Dew Facial today. Text STOP to cancel.');
      expect(unicodeAnalysis.encoding).toBe('UCS-2_Unicode');
      expect(unicodeAnalysis.hasMandatoryOptOutNotice).toBe(true);

      // 2. Reject campaign without mandatory opt-out instructions
      const draftNoOptOut: SmsCampaignDraft = {
        campaignId: 'cmp_spring_01',
        salonId: 'salon_soho',
        campaignName: 'Spring Flash Sale',
        messageText: 'Book now for 20% off all facials!', // Missing STOP
        targetAudience: 'all_opted_in',
        budgetCapUsd: 50.0,
        costPerSegmentUsd: 0.02,
      };
      expect(() => executeSmsMarketingCampaign(draftNoOptOut, [])).toThrow('TCPA Compliance Error');

      // 3. Filter audience: only opted-in recipients receive text
      const audience: SmsRecipientProfile[] = [
        { clientId: 'c1', fullName: 'Alice', phoneNumber: '5551112222', marketingSmsOptIn: true, timezone: 'US/Eastern' },
        { clientId: 'c2', fullName: 'Bob', phoneNumber: '5553334444', marketingSmsOptIn: false, timezone: 'US/Eastern' }, // Opted out
        { clientId: 'c3', fullName: 'Carol', phoneNumber: '5555556666', marketingSmsOptIn: true, timezone: 'US/Eastern' },
      ];

      const validDraft: SmsCampaignDraft = {
        ...draftNoOptOut,
        messageText: 'Exclusive 20% off facial booking! Reply STOP to end.',
      };

      // Dispatched during valid business hours (2:00 PM)
      const successResult = executeSmsMarketingCampaign(validDraft, audience, 14);
      expect(successResult.status).toBe('dispatched');
      expect(successResult.totalEligibleRecipients).toBe(2);
      expect(successResult.excludedNonOptedInCount).toBe(1);
      expect(successResult.totalSegmentsDispatched).toBe(2);

      // Dispatched during quiet hours (11:00 PM = 23)
      const quietHoursResult = executeSmsMarketingCampaign(validDraft, audience, 23);
      expect(quietHoursResult.status).toBe('blocked_quiet_hours');
      expect(quietHoursResult.rejectionReason).toContain('TCPA_QUIET_HOURS_ENFORCED');

      // Budget cap exceeded
      const lowBudgetDraft: SmsCampaignDraft = {
        ...validDraft,
        budgetCapUsd: 0.01, // Less than 2 * 0.02 = $0.04
      };
      const budgetResult = executeSmsMarketingCampaign(lowBudgetDraft, audience, 14);
      expect(budgetResult.status).toBe('blocked_by_budget');
      expect(budgetResult.rejectionReason).toContain('BUDGET_EXCEEDED');
    });
  });

  describe('Posie Core Logic - F192 (Lost Demand Ledger & Turn-Aways)', () => {
    it('captures turn-aways, deduplicates repeated queries, and compiles actionable lost demand reports', () => {
      const entry1 = recordLostDemandEntry({
        salonId: 'salon_soho',
        source: 'walk_in_turnaway',
        requestedServiceId: 'srv_facial',
        requestedServiceName: 'Hydra-Dew Glass Glow Facial',
        catalogPriceUsd: 120.0,
        requestedDate: '2026-11-20',
        requestedTimeWindow: 'afternoon',
        clientIdentifier: 'client_maya_walkin',
        permissionToFollowUp: true,
      });

      // Duplicate search by same client on same date for same service
      const entry2 = recordLostDemandEntry({
        salonId: 'salon_soho',
        source: 'online_search_no_slots',
        requestedServiceId: 'srv_facial',
        requestedServiceName: 'Hydra-Dew Glass Glow Facial',
        catalogPriceUsd: 120.0,
        requestedDate: '2026-11-20',
        requestedTimeWindow: 'afternoon',
        clientIdentifier: 'client_maya_walkin',
        permissionToFollowUp: true,
      });

      // Distinct client search
      const entry3 = recordLostDemandEntry({
        salonId: 'salon_soho',
        source: 'phone_inquiry_turnaway',
        requestedServiceId: 'srv_brow_sculpt',
        requestedServiceName: 'Precision Brow Arch Sculpt',
        catalogPriceUsd: 55.0,
        requestedDate: '2026-11-21',
        requestedTimeWindow: 'morning',
        clientIdentifier: 'client_liam_phone',
        permissionToFollowUp: false,
      });

      const report = generateLostDemandReport('salon_soho', [entry1, entry2, entry3], '2026-11-01', '2026-11-30');

      expect(report.totalTurnAwaysLogged).toBe(3);
      // Deduplicated unique demand instances = 2
      expect(report.deduplicatedUniqueClientsCount).toBe(2);
      expect(report.observedTurnAwayValueUsd).toBe(175.0); // $120 (deduped Maya) + $55 (Liam)
      expect(report.mostRequestedUnmetServices[0].serviceId).toBe('srv_facial');
      expect(report.mostRequestedUnmetServices[0].unmetRequestsCount).toBe(1);
      expect(report.followUpPermittedCount).toBe(1);
    });
  });

  describe('Posie Core Logic - F193 (Leave-By Appointment Constraint)', () => {
    const stages: ServiceStageBreakdown = {
      consultationMinutes: 10,
      handsOnTreatmentMinutes: 45,
      processingMinutes: 15,
      finishingMinutes: 15,
      checkoutMinutes: 5,
      postDepartureCleanupMinutes: 15, // 90 min total client duration, 105 min total staff
    };

    it('validates client departure deadline and reserves staff station cleanup buffer', () => {
      // 1. Feasible: Start 12:00, leave-by 14:00 (requires 90m -> finishes 13:30, 30m buffer)
      const feasibleReq: LeaveByConstraintRequest = {
        serviceId: 'srv_balayage',
        serviceName: 'Balayage Refresh',
        candidateStartTime: '12:00',
        clientMustLeaveBy: '14:00',
        stages,
      };
      const feasibleResult = evaluateLeaveByConstraint(feasibleReq);
      expect(feasibleResult.isFeasible).toBe(true);
      expect(feasibleResult.totalClientDurationMinutes).toBe(90);
      expect(feasibleResult.projectedClientDepartureTime).toBe('13:30');
      expect(feasibleResult.spareBufferMinutesBeforeDeadline).toBe(30);
      expect(feasibleResult.staffStationReleaseTime).toBe('13:45'); // 13:30 + 15m cleanup
      expect(feasibleResult.explanation).toContain('provides 30m cushion');

      // 2. Infeasible: Start 12:00, leave-by 13:15 (requires 90m -> finishes 13:30, exceeds by 15m)
      const infeasibleReq: LeaveByConstraintRequest = {
        ...feasibleReq,
        clientMustLeaveBy: '13:15',
      };
      const infeasibleResult = evaluateLeaveByConstraint(infeasibleReq);
      expect(infeasibleResult.isFeasible).toBe(false);
      expect(infeasibleResult.spareBufferMinutesBeforeDeadline).toBe(-15);
      expect(infeasibleResult.explanation).toContain('exceeds the client\'s strict 13:15 departure deadline');
    });
  });

  describe('Posie Core Logic - F194 (Budget- and Time-Constrained Visit Options)', () => {
    const catalog: CuratedServiceOption[] = [
      {
        serviceId: 'srv_facial_full',
        name: 'Hydra-Dew Glass Glow Facial',
        priceUsd: 120.0,
        durationMinutes: 60,
        category: 'facial',
        description: 'Deep cleansing and hydration infusion',
      },
      {
        serviceId: 'srv_facial_express',
        name: 'Express Glow Mini Facial',
        priceUsd: 65.0,
        durationMinutes: 30,
        category: 'facial',
        description: 'Fast lunchtime cleanse and hydration sweep',
      },
      {
        serviceId: 'srv_addon_led',
        name: 'LED Collagen Light Therapy',
        priceUsd: 35.0,
        durationMinutes: 15,
        category: 'express_add_on',
        description: '15m phototherapy rejuvenation',
      },
      {
        serviceId: 'srv_deluxe_balayage',
        name: 'Full Master Balayage & Glaze',
        priceUsd: 250.0,
        durationMinutes: 150,
        category: 'hair',
        description: 'Complete luxury hair lightening and tone',
      },
    ];

    it('recommends feasible bundles fitting budget and time envelope without arbitrary upsells', () => {
      // Client has $110 budget and 50 minutes max
      const constraints: ClientVisitConstraints = {
        maxBudgetUsd: 110.0,
        maxDurationMinutes: 50,
        preferredCategory: 'facial',
      };

      const result = findBudgetConstrainedOptions(catalog, constraints);
      expect(result.hasFeasibleOptions).toBe(true);

      // Full facial ($120, 60m) and Balayage ($250, 150m) are rejected
      expect(result.matchingBundles.some((b) => b.primaryService.serviceId === 'srv_facial_full')).toBe(false);
      expect(result.matchingBundles.some((b) => b.primaryService.serviceId === 'srv_deluxe_balayage')).toBe(false);

      // Express facial ($65, 30m) and Express + LED ($100, 45m) fit cleanly
      const expressWithLed = result.matchingBundles.find((b) => b.addServices.length > 0);
      expect(expressWithLed).toBeDefined();
      expect(expressWithLed?.totalPriceUsd).toBe(100.0);
      expect(expressWithLed?.totalDurationMinutes).toBe(45);
      expect(expressWithLed?.budgetSpareUsd).toBe(10.0);
      expect(expressWithLed?.timeSpareMinutes).toBe(5);

      // Extremely constrained envelope ($20, 10 min) -> No feasible options, guidance returned
      const impossibleConstraints: ClientVisitConstraints = {
        maxBudgetUsd: 20.0,
        maxDurationMinutes: 10,
      };
      const noFitResult = findBudgetConstrainedOptions(catalog, impossibleConstraints);
      expect(noFitResult.hasFeasibleOptions).toBe(false);
      expect(noFitResult.alternativeGuidance).toContain('No standard services fit');
    });
  });

  describe('Posie Core Logic - F195 (Assisted Completion Without a Smartphone)', () => {
    it('creates assisted phone booking with verbal confirmation, preserves unresolved digital steps, and attaches wet-signed scans', () => {
      // 1. Phone booking requires verbal policy read-back confirmation
      expect(() =>
        createAssistedNonSmartphoneBooking({
          bookingId: 'bk_phone_01',
          salonId: 'salon_soho',
          serviceId: 'srv_facial',
          clientInfo: {
            fullName: 'Eleanor Vance',
            contactPhone: '555-0192',
            hasSmartphoneOrEmail: false,
          },
          channel: 'phone_operator_assisted',
          assistingStaffId: 'staff_reception_claire',
        })
      ).toThrow('mandate verbal read-back confirmation');

      // 2. Successful phone-assisted booking
      const validBooking = createAssistedNonSmartphoneBooking({
        bookingId: 'bk_phone_01',
        salonId: 'salon_soho',
        serviceId: 'srv_facial',
        clientInfo: {
          fullName: 'Eleanor Vance',
          contactPhone: '555-0192',
          hasSmartphoneOrEmail: false,
        },
        channel: 'phone_operator_assisted',
        assistingStaffId: 'staff_reception_claire',
        verbalConfirmation: {
          policyReadBackCompleted: true,
          readBackByStaffId: 'staff_reception_claire',
          readBackTimestamp: '2026-11-20T10:00:00Z',
          cancellationTermsAcknowledged: true,
          totalServicePriceQuotedUsd: 120.0,
        },
      });

      expect(validBooking.status).toBe('assisted_confirmed');
      expect(validBooking.electronicSignatureFabricated).toBe(false);
      expect(validBooking.unresolvedDigitalSteps).toContain('ONLINE_PORTAL_ACCOUNT_UNAVAILABLE');

      // 3. Physical paper wet-signed scan attachment
      const paperBooking = createAssistedNonSmartphoneBooking({
        bookingId: 'bk_paper_02',
        salonId: 'salon_soho',
        serviceId: 'srv_facial',
        clientInfo: {
          fullName: 'Robert Sterling',
          contactPhone: '555-0199',
          hasSmartphoneOrEmail: false,
        },
        channel: 'physical_paper_wet_signed',
        assistingStaffId: 'staff_front_desk_marcus',
      });

      expect(paperBooking.status).toBe('pending_paper_scan');
      expect(paperBooking.unresolvedDigitalSteps).toContain('PHYSICAL_PAPER_SCAN_PENDING_ATTACHMENT');

      const scanAttachment: PaperDocumentAttachment = {
        attachmentId: 'att_scan_882',
        documentType: 'intake_form',
        scannedDocumentUrl: 'https://cdn.posie.app/scans/att_scan_882.pdf',
        scannedAt: '2026-11-20T10:30:00Z',
        uploadedByStaffId: 'staff_front_desk_marcus',
        clientPhysicalSignatureVerified: true,
      };

      const resolvedPaperBooking = attachWetSignedPaperScan(paperBooking, scanAttachment);
      expect(resolvedPaperBooking.status).toBe('assisted_confirmed');
      expect(resolvedPaperBooking.paperAttachment).toBeDefined();
      expect(resolvedPaperBooking.unresolvedDigitalSteps).not.toContain('PHYSICAL_PAPER_SCAN_PENDING_ATTACHMENT');
    });
  });
























