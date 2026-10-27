'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@posie/ui';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Globe,
  Search,
  MessageCircleQuestion,
  Send,
  Upload,
  ArrowRight,
  FileText,
  FileCheck2,
  Printer,
  Download,
  PhoneCall,
  HeartPulse,
  Lock,
  Sun,
  Moon,
  MapPin,
  Pencil,
  Eye,
  CalendarCheck,
  BadgeCheck,
  Calculator,
  Receipt,
  Package,
  CheckCheck,
  Truck,
  Mail,
  Users,
  Filter,
  Star,
  UserCheck,
  UserX,
  Gift,
  Tag,
  Percent,
  Share2,
  Timer,
  DollarSign,
  Paperclip,
  AlertTriangle,
  Database,
  Coins,
  MessageSquareWarning,
  Check,
  Headphones,
  CreditCard,
  BellOff,
  Activity,
  Camera,
  Video,
  Type,
  Wallet,
  Briefcase,
  Languages,
  RotateCcw,
  Phone,
  Shield,
  Scale,
  ShoppingBag,
  Target,
  Layers,
  Archive,
  Smartphone,
} from 'lucide-react';

// Brand Information
const brandData = {
  name: 'Posie',
  tagline: 'Glow up without the headache.',
};

// Services
const services = [
  {
    id: 's1',
    name: 'Hydra-Dew Glass Glow Facial',
    tag: 'Fan Favorite',
    price: 120,
    duration: 60,
    description: 'Double cleanse, fruit enzyme sweep, and ultra-drenching hyaluronic infusion.',
  },
  {
    id: 's2',
    name: 'Fluff & Define Brow Sculpt',
    tag: 'Quick Refresh',
    price: 55,
    duration: 35,
    description: 'Custom tinting and precision shaping that makes your natural arches pop.',
  },
];

export default function PosieStudioPage() {
  const [selectedService, setSelectedService] = useState<string>('s1');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // F054 Shift Cancellation Guard State
  const [shiftCancelAttempted, setShiftCancelAttempted] = useState(false);

  // F055 Time Clock State
  const [clockedIn, setClockedIn] = useState(true);
  const [correctionRequested, setCorrectionRequested] = useState(false);

  // F056 Expense Duplicate State
  const [duplicateWarningShown, setDuplicateWarningShown] = useState(false);

  // F057 Structured Data Export State
  const [exportTriggered, setExportTriggered] = useState(false);

  // F058 Daily Close Workspace State
  const [actualCashInput, setActualCashInput] = useState<number>(320);
  const [blockingTicketResolved, setBlockingTicketResolved] = useState(false);
  const [explainedNote, setExplainedNote] = useState('Missing $18 verified as cash change miscount during noon rush.');
  const [dailyCloseFinalized, setDailyCloseFinalized] = useState(false);

  // F059 Complaint & Redo State
  const [complaintStep, setComplaintStep] = useState<'intake' | 'redo_scheduled' | 'resolved'>('intake');

  // F060 Support Escalation State
  const [supportSubmittedAfterHours, setSupportSubmittedAfterHours] = useState(false);
  const [callbackBooked, setCallbackBooked] = useState(false);

  // F061 Billing & Usage Preview State
  const [smsUsageCount, setSmsUsageCount] = useState(5500);

  // F062 Communication Preferences State
  const [promoSmsOptIn, setPromoSmsOptIn] = useState(false);
  const [quietHoursSimulatedNight, setQuietHoursSimulatedNight] = useState(false);

  // F063 Visit Progress Check-in State
  const [checkinComfort, setCheckinComfort] = useState<'routine' | 'severe'>('routine');
  const [checkinReviewed, setCheckinReviewed] = useState(false);

  // F064 Consent-Aware Portfolio State (D12)
  const [mediaGrantRevoked, setMediaGrantRevoked] = useState(false);
  const [anonymitySelection, setAnonymitySelection] = useState<'eyes_obscured' | 'full_face'>('eyes_obscured');

  // F065 Virtual Consultation State (WB A6)
  const [consultRoomCreated, setConsultRoomCreated] = useState(false);
  const [consultCompleted, setConsultCompleted] = useState(false);

  // F066 Arrival & Private Waiting Queue State
  const [clientArrivedState, setClientArrivedState] = useState<'idle' | 'arrived' | 'reversed' | 'in_chair'>('idle');

  // F067 Local Device Preferences State
  const [textSizeSelection, setTextSizeSelection] = useState<'default' | 'large' | 'extra_large'>('default');
  const [contrastSelection, setContrastSelection] = useState<'standard' | 'high_contrast'>('standard');

  // F068 Client Balances & Entitlement State
  const [redeemedSessionCount, setRedeemedSessionCount] = useState(1);

  // F069 Staff Documents & Commission State
  const [staffRelationship, setStaffRelationship] = useState<'w2_employee' | 'booth_or_chair_renter'>('booth_or_chair_renter');
  const [statementApproved, setStatementApproved] = useState(false);

  // F070 International Language State
  const [selectedLocale, setSelectedLocale] = useState<'en-US' | 'es-US' | 'fr-CA' | 'vi-US' | 'ko-US'>('es-US');

  // F071 Rebooking at Checkout State
  const [rebookingChoice, setRebookingChoice] = useState<'pending' | 'booked' | 'sms_reminder' | 'declined'>('pending');

  // F072 Telephony Portability State
  const [loaGenerated, setLoaGenerated] = useState(false);

  // F073 Tenant RBAC State
  const [selectedRole, setSelectedRole] = useState<'salon_owner' | 'studio_manager' | 'service_provider' | 'front_desk_coordinator'>('front_desk_coordinator');
  const [staffMemberDeactivated, setStaffMemberDeactivated] = useState(false);

  // F074 Financial Ledger Idempotency State
  const [checkoutClickCount, setCheckoutClickCount] = useState(0);

  // F075 Reliable Booking Engine State
  const [bookingHoldState, setBookingHoldState] = useState<'none' | 'held' | 'collision_blocked' | 'confirmed'>('none');
  const [provisionalLinkActive, setProvisionalLinkActive] = useState(false);
  const [provisionalConfirmed, setProvisionalConfirmed] = useState(false);

  // F076 Room & Equipment Scheduling State
  const [roomScheduleAttempt, setRoomScheduleAttempt] = useState<'idle' | 'conflict_blocked' | 'booked_clean'>('idle');

  // F077 Processing & Finishing Intervals State
  const [gapServiceFitted, setGapServiceFitted] = useState(false);
  const [gapStationTheftAttempted, setGapStationTheftAttempted] = useState(false);

  // F078 Multi-Practitioner State
  const [multiApptDelayed, setMultiApptDelayed] = useState(false);

  // F079 Group & Family Booking State
  const [groupPrivacyTarget, setGroupPrivacyTarget] = useState<'none' | 'adult_friend' | 'minor_child'>('none');

  // F080 Classes & Workshops State
  const [workshopSeatsConfirmed, setWorkshopSeatsConfirmed] = useState<string[]>(['Emily W.']);
  const [workshopWaitlist, setWorkshopWaitlist] = useState<string[]>([]);

  // F081 Waitlist Offers State
  const [waitlistOfferState, setWaitlistOfferState] = useState<'idle' | 'offered_claire' | 'expired_advanced_diana' | 'claimed_diana'>('idle');

  // F082 Cancellation Recovery State
  const [cancellationRecoveryChoice, setCancellationRecoveryChoice] = useState<'none' | 'earlier_move' | 'standby_vip'>('none');

  // F083 Calendar Sync State
  const [calendarSyncAction, setCalendarSyncAction] = useState<'idle' | 'loop_prevented' | 'silent_delete_blocked'>('idle');

  // F084 Deposits State
  const [depositCancelScenario, setDepositCancelScenario] = useState<'none' | 'timely' | 'late'>('none');

  // F085 Unified Checkout State
  const [splitTenderStage, setSplitTenderStage] = useState<'initial' | 'gift_applied' | 'fully_paid'>('initial');

  // F086 Terminal Payment State
  const [terminalSessionState, setTerminalSessionState] = useState<'idle' | 'interrupted' | 'recovered_success' | 'recovered_safe_retry'>('idle');

  // F087 Refunds State
  const [refundStage, setRefundStage] = useState<'initial' | 'refunded_cream' | 'over_refund_blocked'>('initial');

  // F088 No-Show Collection State
  const [noShowCaseState, setNoShowCaseState] = useState<'idle' | 'declined_link_sent' | 'manager_waived'>('idle');

  // F089 Dispute Workspace State
  const [disputePacketAssembled, setDisputePacketAssembled] = useState(false);
  const [disputeUrgencyMode, setDisputeUrgencyMode] = useState<'standard' | 'urgent'>('standard');

  // F090 Payout Tracker State
  const [payoutConfirmedAch, setPayoutConfirmedAch] = useState(false);

  // F091 Gift Card Liability State
  const [giftCardRedeemedAmount, setGiftCardRedeemedAmount] = useState(0);

  // F092 Package Series State
  const [packageRefundState, setPackageRefundState] = useState<'active_2_used' | 'partially_refunded'>('active_2_used');

  // F093 Membership Lifecycle State
  const [membershipStatus, setMembershipStatus] = useState<'active' | 'paused' | 'cancelled_preview' | 'cancelled'>('active');
  const [bankedCredits, setBankedCredits] = useState<number>(3);

  // F094 Tip Allocation State
  const [tipSplitActive, setTipSplitActive] = useState<boolean>(true);
  const [tipRefundChoice, setTipRefundChoice] = useState<'none' | 'retain_staff' | 'clawback_staff' | 'salon_absorbed'>('none');

  // F095 Loyalty Ledger State
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(450);
  const [loyaltyTier, setLoyaltyTier] = useState<'Silver Radiance' | 'Gold VIP'>('Silver Radiance');
  const [loyaltyClawbackTriggered, setLoyaltyClawbackTriggered] = useState<boolean>(false);

  // F096 Online Storefront State
  const [storeStockCleanser, setStoreStockCleanser] = useState<number>(10);
  const [storeReservedCleanser, setStoreReservedCleanser] = useState<number>(0);
  const [storeOrderStatus, setStoreOrderStatus] = useState<'browsing' | 'reserved' | 'paid_processing' | 'ready_for_pickup' | 'cancelled_restocked'>('browsing');
  const [storeFulfillmentMethod, setStoreFulfillmentMethod] = useState<'pickup' | 'shipping'>('pickup');

  // F097 Commission Statement State
  const [commissionStatementStatus, setCommissionStatementStatus] = useState<'estimated' | 'manager_approved'>('estimated');
  const [hasForwardAdjustment, setHasForwardAdjustment] = useState<boolean>(false);

  // F098 Time Off & Coverage State
  const [timeOffStatus, setTimeOffStatus] = useState<'submitted' | 'approved' | 'rejected'>('submitted');
  const [timeOffConflict1Resolved, setTimeOffConflict1Resolved] = useState<boolean>(false);
  const [timeOffConflict2Resolved, setTimeOffConflict2Resolved] = useState<boolean>(false);
  const [timeOffApprovalBlockedWarning, setTimeOffApprovalBlockedWarning] = useState<boolean>(false);

  // F099 Accounting Integration State
  const [accountingPlatform, setAccountingPlatform] = useState<'quickbooks_online' | 'xero'>('quickbooks_online');
  const [accountingSyncStatus, setAccountingSyncStatus] = useState<'pending' | 'synced'>('pending');
  const [accountingIdempotencyTriggered, setAccountingIdempotencyTriggered] = useState<boolean>(false);

  // F100 Electronic Signatures State
  const [esignDocumentStatus, setEsignDocumentStatus] = useState<'issued' | 'signed' | 'superseded'>('issued');
  const [esignPaymentSeparationChecked, setEsignPaymentSeparationChecked] = useState<boolean>(true);
  const [esignTamperCheckPassed, setEsignTamperCheckPassed] = useState<boolean | null>(null);

  // F101 Chart Amendments State
  const [chartAmendmentDevAdded, setChartAmendmentDevAdded] = useState<boolean>(false);
  const [chartRoleDev, setChartRoleDev] = useState<'esthetician' | 'front_desk'>('esthetician');

  // F102 Before & After Photo State
  const [photoAngleDev, setPhotoAngleDev] = useState<'frontal' | 'left_45' | 'right_45'>('frontal');
  const [photoConsentMarketingDev, setPhotoConsentMarketingDev] = useState<boolean>(true);

  // F103 Client Deduplication State
  const [dedupMergeExecuted, setDedupMergeExecuted] = useState<boolean>(false);
  const [dedupUnmerged, setDedupUnmerged] = useState<boolean>(false);

  // F104 Migration Mapping State
  const [migrationPlatform, setMigrationPlatform] = useState<'glossgenius' | 'vagaro' | 'boulevard'>('glossgenius');

  // F105 Migration Rehearsal & Cutover State
  const [cutoverBlockedByObligation, setCutoverBlockedByObligation] = useState<boolean>(false);
  const [cutoverCertificateIssued, setCutoverCertificateIssued] = useState<boolean>(false);

  // F106 Brand Propagation State
  const [brandStagedTheme, setBrandStagedTheme] = useState<'Sage & Linen' | 'Rose Terracotta' | 'Noir Atelier'>('Sage & Linen');
  const [brandPublishedStatus, setBrandPublishedStatus] = useState<'live' | 'staged_preview' | 'rolled_back'>('live');

  // F107 Visit Hub & Express Flow State
  const [hubStepDev, setHubStepDev] = useState<'intake' | 'consent' | 'deposit' | 'confirmed' | 'self_checkout'>('intake');
  const [hubDeclineSimulated, setHubDeclineSimulated] = useState<boolean>(false);

  // F108 Automation Recipes State
  const [automationRecipePaused, setAutomationRecipePaused] = useState<boolean>(false);
  const [automationRehearsalShown, setAutomationRehearsalShown] = useState<boolean>(true);

  // F109 Unified Inbox State
  const [inboxChannelDev, setInboxChannelDev] = useState<'sms' | 'email'>('sms');
  const [inboxDeliveryStateDev, setInboxDeliveryStateDev] = useState<'delivered' | 'failed'>('delivered');
  const [inboxTimelineSavedDev, setInboxTimelineSavedDev] = useState<boolean>(false);

  // F110 Calling & Voicemail State
  const [telephonyCallSimulated, setTelephonyCallSimulated] = useState<boolean>(false);
  const [telephonyRecordingConsentDev, setTelephonyRecordingConsentDev] = useState<boolean>(true);
  const [telephonyAfterHoursRoute, setTelephonyAfterHoursRoute] = useState<boolean>(false);

  // F111 Message Consent State
  const [consentMarketingDevRevoked, setConsentMarketingDevRevoked] = useState<boolean>(false);
  const [consentBudgetCapReached, setConsentBudgetCapReached] = useState<boolean>(false);

  // F112 Metric Dictionary State
  const [metricLineageInspectOpen, setMetricLineageInspectOpen] = useState<boolean>(false);

  // F113 Role Dashboard State
  const [dashboardRoleDev, setDashboardRoleDev] = useState<'owner' | 'practitioner'>('owner');

  // F114 Cohort Retention State
  const [cohortFilterImmature, setCohortFilterImmature] = useState<boolean>(false);

  // F115 Service Contribution State
  const [contributionBackbarMapped, setContributionBackbarMapped] = useState<boolean>(true);

  // F116 Acquisition Attribution State
  const [attributionSource, setAttributionSource] = useState<'direct_link' | 'legacy_client_import' | 'consumer_marketplace'>('direct_link');
  const [attributionDisputeFiled, setAttributionDisputeFiled] = useState<boolean>(false);

  // F117 Booking Analytics State
  const [funnelDropStage, setFunnelDropStage] = useState<'none' | 'deposit_authorized'>('none');

  // F118 Operational Reliability State
  const [reliabilityDegraded, setReliabilityDegraded] = useState<boolean>(false);
  const [ambiguousPaymentResolved, setAmbiguousPaymentResolved] = useState<boolean>(false);

  // F119 Exit Archive State
  const [archiveDownloaded, setArchiveDownloaded] = useState<boolean>(false);

  // F120 Workday Device Parity State
  const [activeViewportMode, setActiveViewportMode] = useState<'phone' | 'tablet' | 'desktop'>('phone');

  // F121 Unified Search State
  const [searchUserRole, setSearchUserRole] = useState<'owner' | 'receptionist'>('owner');
  const [searchQueryText, setSearchQueryText] = useState<string>('peel');

  // F122 Emergency Day View State
  const [emergencyOutageActive, setEmergencyOutageActive] = useState<boolean>(false);
  const [emergencyActionQueued, setEmergencyActionQueued] = useState<boolean>(false);

  // F123 Public API & Webhooks State
  const [webhookTestDispatched, setWebhookTestDispatched] = useState<boolean>(false);

  // F124 Fractional Backbar State
  const [backbarMeasuredMode, setBackbarMeasuredMode] = useState<boolean>(true);

  // F125 Lot Expiry & Stock Forecast State
  const [lotPaoSimulated, setLotPaoSimulated] = useState<boolean>(false);

  // F126 Service Readiness State
  const [readinessOverridden, setReadinessOverridden] = useState<boolean>(false);

  // F127 Business Anomaly State
  const [anomalySampleLow, setAnomalySampleLow] = useState<boolean>(false);

  // F128 Guardian & Authorized Payer State
  const [selectedRelationshipRole, setSelectedRelationshipRole] = useState<'client' | 'guardian' | 'authorized_payer'>('authorized_payer');

  // F129 Documented Care Summaries State
  const [careSummaryApproved, setCareSummaryApproved] = useState<boolean>(false);

  // F130 Assisted Support Sessions State
  const [supportSessionActive, setSupportSessionActive] = useState<boolean>(true);

  // F131 Payroll Ready Exports State
  const [payrollPeriodLocked, setPayrollPeriodLocked] = useState<boolean>(true);

  // F132 Tax Configuration State
  const [taxRuleServicesExempt, setTaxRuleServicesExempt] = useState<boolean>(true);

  // F133 Integration Connection Center State
  const [integrationQboDegraded, setIntegrationQboDegraded] = useState<boolean>(false);

  // F134 Consequential Approvals State
  const [consequentialChangeApproved, setConsequentialChangeApproved] = useState<boolean>(false);

  // F135 Supported Wallet Payment Methods State
  const [activeClientPlatform, setActiveClientPlatform] = useState<'ios_safari' | 'android_chrome'>('ios_safari');

  // F136 Waitlist Priorities State
  const [waitlistOfferClaimed, setWaitlistOfferClaimed] = useState<boolean>(false);

  // F137 OCR Intake Assistance State
  const [ocrSensitiveVerified, setOcrSensitiveVerified] = useState<boolean>(false);

  // F138 Branded Mobile App State
  const [mobileBiometricsAuthed, setMobileBiometricsAuthed] = useState<boolean>(true);

  // F139 Multi-Location Operations State
  const [selectedEnterpriseLocation, setSelectedEnterpriseLocation] = useState<'all' | 'beverly' | 'soho'>('all');

  // F140 Booth Renter Merchant State
  const [renterSplitSimulated, setRenterSplitSimulated] = useState<boolean>(true);

  // F141 Embedded Payroll State
  const [payrollSubmittedToPartner, setPayrollSubmittedToPartner] = useState<boolean>(false);
  const [payrollCorrectionActive, setPayrollCorrectionActive] = useState<boolean>(false);

  // F142 Offline Operational Changes State
  const [offlineSimulatedMode, setOfflineSimulatedMode] = useState<boolean>(false);
  const [offlineActionQueued, setOfflineActionQueued] = useState<boolean>(true);
  const [offlineConflictResolved, setOfflineConflictResolved] = useState<boolean>(false);

  // F143 Schedule Optimization State
  const [scheduleOptimizationApplied, setScheduleOptimizationApplied] = useState<boolean>(false);
  const [practitionerFridayOff, setPractitionerFridayOff] = useState<boolean>(true);

  // F144 Mobile Service Routes State
  const [mobileTrafficAlertSent, setMobileTrafficAlertSent] = useState<boolean>(false);
  const [mobileDistanceInputMiles, setMobileDistanceInputMiles] = useState<number>(22);

  // F145 Constrained AI Receptionist State
  const [receptionistCallerVerified, setReceptionistCallerVerified] = useState<boolean>(false);
  const [receptionistSafetyEscalation, setReceptionistSafetyEscalation] = useState<boolean>(false);

  // F146 Reliable Booking Across Channels State
  const [crossChannelActive, setCrossChannelActive] = useState<'voice' | 'sms' | 'web'>('web');
  const [crossChannelRescheduleCount, setCrossChannelRescheduleCount] = useState<number>(1);

  // F147 Screen-Aware Assistant State
  const [assistantRole, setAssistantRole] = useState<'front_desk' | 'owner'>('owner');
  const [assistantDiscountConfirmed, setAssistantDiscountConfirmed] = useState<boolean>(false);

  // F148 Dictation Notes State
  const [dictationFlagsResolved, setDictationFlagsResolved] = useState<boolean>(false);
  const [dictationSigned, setDictationSigned] = useState<boolean>(false);

  // F149 Governed Data Queries State
  const [governedQueryMetric, setGovernedQueryMetric] = useState<'contribution_margin' | 'rebooking_rate'>('contribution_margin');

  // F150 Forecast Demand & Staffing State
  const [forecastHorizon, setForecastHorizon] = useState<'30_days' | '7_days_cold_start'>('30_days');

  // F151 What-If Business Planning State
  const [whatIfActiveScenario, setWhatIfActiveScenario] = useState<'four_day_week' | 'discount_volume'>('four_day_week');

  // F152 Measured Growth Experiments State
  const [experimentStatus, setExperimentStatus] = useState<'running' | 'statistically_significant'>('statistically_significant');

  // F153 Cancellation Policy Simulator State
  const [simulatedPolicyType, setSimulatedPolicyType] = useState<'moderate_30' | 'extreme_100'>('moderate_30');

  // F154 Service Match Assistant State
  const [matchClinicalGuardrailTriggered, setMatchClinicalGuardrailTriggered] = useState<boolean>(false);

  // F155 Purchasing Recommendations State
  const [poDraftApproved, setPoDraftApproved] = useState<boolean>(false);

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 80px' }}>
      {/* Dev Mode Navigation Banner */}
      <div
        style={{
          background: 'var(--color-primary)',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          fontSize: '0.9rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>🧪</span>
          <strong>Posie Developer Feature Lab &amp; Regression Matrix (F001 – F155)</strong>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href="/"
            style={{
              color: '#FFFFFF',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '6px 14px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            ← Client Booking Site (/)
          </a>
          <a
            href="/admin"
            style={{
              color: '#FFFFFF',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '6px 14px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            💈 Studio OS Dashboard (/admin)
          </a>
        </div>
      </div>

      {/* Brand Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAF8F5',
            }}
          >
            <Sparkles size={22} color="var(--color-tertiary)" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.1rem', letterSpacing: '-0.5px', color: 'var(--color-primary)' }}>
              {brandData.name}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{brandData.tagline}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Badge variant="sage">Studio Open</Badge>
          <Badge variant="muted">Austin, TX</Badge>
        </div>
      </header>

      {/* Hero Service Selector */}
      <section style={{ marginBottom: '36px' }}>
        <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
          Book Your Treatment
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {services.map((svc) => (
            <Card
              key={svc.id}
              onClick={() => setSelectedService(svc.id)}
              style={{
                cursor: 'pointer',
                borderColor: selectedService === svc.id ? 'var(--color-secondary)' : 'var(--color-border)',
                backgroundColor: selectedService === svc.id ? 'var(--color-secondary-light)' : '#FFFFFF',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Badge variant="rose">{svc.tag}</Badge>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <Clock size={14} />
                  <span>{svc.duration} min</span>
                </div>
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '6px' }}>{svc.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '12px' }}>{svc.description}</p>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                ${svc.price}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* F054: Team Shifts & Availability Guard */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 054: Team Shifts & Client Commitment Guard
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Thursday Roster</Badge>
              <Badge variant="muted">09:00 – 17:00</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Working shifts and coverage requests are maintained independently. Staff schedule changes cannot silently drop client appointments.
          </p>

          <div style={{ background: '#FAF8F5', borderRadius: '8px', padding: '14px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong>Chloe V. (Lead Aesthetician)</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Austin Flagship • Room 1</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text)' }}>
              • <strong>Skills:</strong> Chemical Peels, Dermaplaning, Ultrasonic Extractions<br />
              • <strong>Bookings on Shift:</strong> 2 confirmed clients (Jessica Day at 10:00 AM, Cece Parekh at 02:00 PM)
            </div>
          </div>

          {shiftCancelAttempted ? (
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B36B5C', fontWeight: 600, marginBottom: '6px' }}>
                <AlertTriangle size={16} />
                <span>Shift Cancellation Blocked (Safety Invariant)</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text)' }}>
                Cannot cancel this shift: <strong>2 client appointments</strong> are currently booked with Chloe. Reassign to another aesthetician or contact clients to reschedule before releasing this shift.
              </p>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShiftCancelAttempted(true)}
            >
              Simulate Staff Shift Cancellation
            </Button>
          )}
        </Card>
      </section>

      {/* F055: Time Clock & Manager Approvals */}
      <section style={{ marginBottom: '36px' }}>
        <Card style={{ backgroundColor: '#FAF8F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Timer size={18} color="var(--color-secondary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 055: Time Clock & Manager Approvals
              </strong>
            </div>
            <Badge variant="sage">Active Shift • 7.5 Paid Hours</Badge>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Capture clock-ins, unpaid meal breaks, and staff correction requests with verifiable manager approval logs for payroll reconciliation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: '#FFF', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Clock In</span>
              <strong style={{ fontSize: '0.85rem' }}>09:00 AM (Verified Tablet)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Meal Break</span>
              <strong style={{ fontSize: '0.85rem' }}>1:00 PM – 1:30 PM (30m Unpaid)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Payable Time</span>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-secondary)' }}>450 mins (7.5 hrs)</strong>
            </div>
          </div>

          {correctionRequested ? (
            <div style={{ background: 'var(--color-secondary-light)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <strong>✓ Time Correction Request Submitted:</strong> "Adjust clock-in to 08:45 AM (prepped treatment room)." Manager notified for payroll sign-off.
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCorrectionRequested(true)}
            >
              <Pencil size={12} style={{ marginRight: '6px' }} /> Request Time Clock Correction
            </Button>
          )}
        </Card>
      </section>

      {/* F056: Expense & Receipt Capture with Duplicate Detection */}
      <section style={{ marginBottom: '36px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Receipt size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                Feature 056: Expense & Receipt Capture with Duplicate Detection
              </strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">$145.00 Recorded</Badge>
              <Badge variant="muted">Receipt PDF Attached</Badge>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Categorize backbar supplies and retail shipments. Built-in heuristics detect potential duplicate receipts before recording.
          </p>

          <div style={{ background: '#FAF8F5', borderRadius: '8px', padding: '14px', border: '1px solid var(--color-border)', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong>SalonCentric Austin — Backbar Supplies</strong>
              <strong style={{ color: 'var(--color-primary)' }}>$145.00</strong>
            </div>
            <p style={{ margin: '0 0 10px 0', fontSize: '0.82rem', color: 'var(--color-text)' }}>
              Purpose: Ultrasonic conductive gel, disposable headbands & esthetician gauze rolls (Paid via Business Card • Nov 02).
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              📎 <a href="#" style={{ color: 'var(--color-secondary)' }}>View Attached Receipt (receipt-145.pdf)</a> • <em>Bookkeeping tracking only (does not constitute formal CPA advice).</em>
            </div>
          </div>

          {duplicateWarningShown ? (
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '12px 14px', borderRadius: '8px', fontSize: '0.84rem' }}>
              <strong style={{ color: '#B36B5C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={15} /> Potential Duplicate Detected:
              </strong>
              <p style={{ margin: '4px 0 0', color: 'var(--color-text)' }}>
                An identical expense of $145.00 at "SalonCentric Austin" was already submitted within the last 48 hours. Please verify you are not double-submitting this receipt.
              </p>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDuplicateWarningShown(true)}
            >
              Simulate Submitting Duplicate Receipt
            </Button>
          )}
        </Card>
      </section>

      {/* F057: Structured Data Export & Freedom to Leave Workspace */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Data Export & Freedom-to-Leave Archive (F057)
              </h3>
            </div>
            <Badge variant="sage">Zero Lock-In Guarantee</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Your client relationships, treatment histories, and financial balances belong strictly to you. Export complete standard CSV and JSON bundles anytime with verified cryptographic checksums and open data dictionaries.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>142</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Clients & Contacts</div>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>389</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Completed Visits</div>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>$1,450</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Gift Card Balances</div>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>100%</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Signed Consents</div>
            </div>
          </div>

          {exportTriggered ? (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3A523A', fontWeight: 600, marginBottom: '6px' }}>
                <CheckCircle2 size={16} /> Export Bundle Generated Successfully
              </div>
              <div style={{ color: 'var(--color-text)', marginBottom: '8px' }}>
                Archive <code>posie-exit-pack.zip</code> (SHA256: <code>a7f84c19...</code>) includes <code>contacts.csv</code>, <code>services.csv</code>, <code>appointments.csv</code>, <code>balances.csv</code>, and complete field schema specifications.
              </div>
              <Badge variant="sage">Download Ready (No Expiration)</Badge>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setExportTriggered(true)}>
              <Download size={14} style={{ marginRight: '6px' }} /> Generate Complete Business Exit Pack (ZIP)
            </Button>
          )}
        </Card>
      </section>

      {/* F058: Daily Close & Till Reconciliation Workspace */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Coins size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Daily Close & Cash Drawer Reconciler (F058)
              </h3>
            </div>
            <Badge variant={dailyCloseFinalized ? 'sage' : 'muted'}>
              {dailyCloseFinalized ? 'Till Closed & Reconciled' : 'Close In Progress'}
            </Badge>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Opening Float</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>$200.00</div>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Cash Sales</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#3A523A' }}>+$150.00</div>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Paid-Out (Petty Cash Milk)</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#B36B5C' }}>-$12.00</div>
            </div>
            <div style={{ border: '1px solid var(--color-primary)', padding: '12px', borderRadius: '8px', background: '#F9FAF8' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>Expected Cash in Till</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>$338.00</div>
            </div>
          </div>

          {/* Exceptions Check */}
          {!blockingTicketResolved ? (
            <div style={{ background: '#FFF9F2', border: '1px solid #E2A76F', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8A531C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={15} /> 1 Blocking Exception: Chloe Bennett (Unpaid ticket $95.00)
                </span>
                <Button size="sm" variant="outline" onClick={() => setBlockingTicketResolved(true)}>
                  Resolve & Settle Ticket
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#3A523A', marginBottom: '16px' }}>
              ✓ All salon tickets and card tips settled. Ready for till count verification.
            </div>
          )}

          {/* Actual Cash Count & Variance Note */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Counted Drawer Cash:</span>
              <input
                type="number"
                value={actualCashInput}
                onChange={(e) => setActualCashInput(Number(e.target.value))}
                style={{ width: '90px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CCC', fontSize: '0.9rem' }}
              />
            </div>
            <span style={{ fontSize: '0.85rem', color: actualCashInput === 338 ? '#3A523A' : '#B36B5C', fontWeight: 600 }}>
              Variance: {actualCashInput - 338 === 0 ? '$0.00 (Balanced)' : `-$${(338 - actualCashInput).toFixed(2)} (Short)`}
            </span>
          </div>

          {actualCashInput !== 338 && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                Required Explanation Note for Discrepancy (Minimum 5 characters):
              </label>
              <input
                type="text"
                value={explainedNote}
                onChange={(e) => setExplainedNote(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #D5CECE', fontSize: '0.85rem' }}
              />
            </div>
          )}

          {dailyCloseFinalized ? (
            <div style={{ background: '#F4F7F4', padding: '12px', borderRadius: '8px', color: '#3A523A', fontSize: '0.85rem', fontWeight: 600 }}>
              ✓ Daily Close Finalized by Elena Rostova. Register locked and card batch sent to processor.
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              disabled={!blockingTicketResolved || (actualCashInput !== 338 && explainedNote.length < 5)}
              onClick={() => setDailyCloseFinalized(true)}
            >
              Sign Off & Lock Daily Close
            </Button>
          )}
        </Card>
      </section>

      {/* F059: Client Complaint & Redo Resolution (Document D18) */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquareWarning size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Client Dispute Resolution & Redo Tracker (F059 / D18)
              </h3>
            </div>
            <Badge variant={complaintStep === 'resolved' ? 'sage' : 'rose'}>
              Status: {complaintStep === 'intake' ? 'Under Review' : complaintStep === 'redo_scheduled' ? 'Redo Scheduled' : 'Resolved'}
            </Badge>
          </div>

          <div style={{ background: '#FAF8F5', padding: '14px', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
              <span>Client: <strong>Sophia Turner</strong> (Visit: Full Platinum Balayage)</span>
              <Badge variant="muted">Original Verbatim Report (Immutable)</Badge>
            </div>
            <p style={{ margin: '6px 0 0', fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--color-text)' }}>
              "Toner turned out noticeably brassier than reference photo consulted at chair."
            </p>
          </div>

          <div style={{ fontSize: '0.85rem', marginBottom: '16px', color: 'var(--color-text-muted)' }}>
            <strong>Factual Chronology Log:</strong>
            <ul style={{ margin: '6px 0 0', paddingLeft: '20px', lineHeight: 1.6 }}>
              <li>10:15 AM: Concern received via phone; client photos uploaded.</li>
              <li>11:30 AM: Lead colorist Elena Rostova reviewed consultation formulation notes.</li>
              {complaintStep !== 'intake' && (
                <li>1:00 PM: Complimentary 45-minute tone correction appointment booked for Friday 10:00 AM.</li>
              )}
              {complaintStep === 'resolved' && (
                <li>Friday 10:45 AM: Redo completed. Violet-ash toner achieved exact desired shade; client happy.</li>
              )}
            </ul>
          </div>

          {complaintStep === 'intake' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setComplaintStep('redo_scheduled')}
            >
              Schedule Complimentary Redo (Attach Recovery Costs)
            </Button>
          )}

          {complaintStep === 'redo_scheduled' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#F8F9F8', padding: '12px', borderRadius: '8px', fontSize: '0.84rem' }}>
                <strong>Service Recovery Investment:</strong> Materials ($24.00) + Labor ($45.00) = <strong>$69.00</strong> (100% complimentary to client).
              </div>
              <div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setComplaintStep('resolved')}
                >
                  <Check size={14} style={{ marginRight: '6px' }} /> Owner Sign-Off & Close Case
                </Button>
              </div>
            </div>
          )}

          {complaintStep === 'resolved' && (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#3A523A' }}>
              ✓ Case resolved and closed with owner sign-off. Factual chronology preserved without deleting the original concern.
            </div>
          )}
        </Card>
      </section>

      {/* F060: Human Support Escalation Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Headphones size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Human Support Escalation & Staffed Hours (F060)
              </h3>
            </div>
            <Badge variant="sage">Staffed Hours: Mon-Fri 8 AM - 7 PM CT</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            No endless robot loops or unkept 24/7 promises. When you need a human, you get genuine transparency: verified SLAs during open hours and guaranteed morning priority callbacks when off-duty.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <Button
              variant={!supportSubmittedAfterHours ? 'primary' : 'outline'}
              size="sm"
              onClick={() => { setSupportSubmittedAfterHours(false); setCallbackBooked(false); }}
            >
              Simulate Day Shift (Staffed Hours)
            </Button>
            <Button
              variant={supportSubmittedAfterHours ? 'primary' : 'outline'}
              size="sm"
              onClick={() => { setSupportSubmittedAfterHours(true); setCallbackBooked(false); }}
            >
              Simulate Night Shift (After Hours: 10:30 PM)
            </Button>
          </div>

          {!supportSubmittedAfterHours ? (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3A523A', fontWeight: 600, marginBottom: '4px' }}>
                <CheckCircle2 size={16} /> Urgent Escalation Active — 15 Minute Response SLA
              </div>
              <div style={{ color: 'var(--color-text)' }}>
                Dedicated specialist <strong>Marcus</strong> is reviewing terminal network logs for your checkout station. Expected callback or live chat connect: &lt; 15 mins.
              </div>
            </div>
          ) : (
            <div style={{ background: '#FFF9F5', border: '1px solid #E2A76F', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B36B5C', fontWeight: 600, marginBottom: '6px' }}>
                <AlertCircle size={16} /> Human Specialists Currently Off-Duty
              </div>
              <p style={{ margin: '0 0 10px', color: 'var(--color-text)' }}>
                Our team is off-duty until 8:00 AM Central tomorrow. We do not use automated bots to fake live replies.
              </p>
              {callbackBooked ? (
                <Badge variant="sage">✓ Priority Morning Callback Reserved: Thursday 9:00 AM</Badge>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setCallbackBooked(true)}>
                  Schedule Guaranteed Morning Callback (9:00 AM)
                </Button>
              )}
            </div>
          )}
        </Card>
      </section>

      {/* F061: Usage & Bill Preview Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Live Usage & Upcoming Invoice Preview (F061)
              </h3>
            </div>
            <Badge variant="sage">Billing Cycle: Nov 1 – Nov 30</Badge>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Fixed Plan (Studio Team + 1 Seat + Terminal)</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>$114.00</div>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Metered SMS ({smsUsageCount.toLocaleString()} segments)</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: smsUsageCount >= 5000 ? '#B36B5C' : 'var(--color-primary)' }}>
                ${(smsUsageCount * 0.02).toFixed(2)}
              </div>
            </div>
            <div style={{ border: '1px solid var(--color-primary)', padding: '12px', borderRadius: '8px', background: '#F9FAF8' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>Estimated Next Invoice</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                ${((114 + smsUsageCount * 0.02) * 1.0825).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Spend Cap Protection Alert */}
          {smsUsageCount * 0.02 >= 100 ? (
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '12px 14px', borderRadius: '8px', fontSize: '0.84rem', marginBottom: '16px' }}>
              <strong style={{ color: '#B36B5C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={15} /> 100% Variable Spend Cap Reached ($100.00):
              </strong>
              <p style={{ margin: '4px 0 0', color: 'var(--color-text)' }}>
                Optional promotional SMS broadcasts are paused to protect against unexpected credit charges. Transactional booking confirmations remain fully active.
              </p>
            </div>
          ) : (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#3A523A', marginBottom: '16px' }}>
              ✓ Usage is within your $100.00 monthly variable safety limit.
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>Simulate SMS Broadcast Volume:</span>
            <Button size="sm" variant="outline" onClick={() => setSmsUsageCount(3500)}>
              Normal (3,500 msgs / $70)
            </Button>
            <Button size="sm" variant="outline" onClick={() => setSmsUsageCount(5500)}>
              Peak Campaign (5,500 msgs / $110 - Cap Alert)
            </Button>
          </div>
        </Card>
      </section>

      {/* F062: Communication Preferences & Quiet Hours Showcase (Document DR05) */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BellOff size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Communication Channels & Quiet Hours (F062 / DR05)
              </h3>
            </div>
            <Badge variant="sage">Quiet Hours: 9 PM – 8 AM</Badge>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #E8E5E0', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '0.86rem' }}>Transactional Appointments</strong>
                <Badge variant="sage">Always On</Badge>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Booking receipts and urgent calendar reschedules. Cannot be disabled without full STOP.
              </p>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #E8E5E0', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '0.86rem' }}>Clinical Care Reminders</strong>
                <Badge variant="sage">Active</Badge>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Post-peel aftercare instructions and patch test check-in prompts.
              </p>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #E8E5E0', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '0.86rem' }}>Promotional & Perks</strong>
                <Badge variant={promoSmsOptIn ? 'sage' : 'muted'}>
                  {promoSmsOptIn ? 'Opted In' : 'Opted Out'}
                </Badge>
              </div>
              <div style={{ marginTop: '8px' }}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPromoSmsOptIn(!promoSmsOptIn)}
                >
                  {promoSmsOptIn ? 'Turn Off Marketing SMS' : 'Opt-In to Glow Perks'}
                </Button>
              </div>
            </div>
          </div>

          {/* Quiet Hours Evaluation Simulation */}
          <div style={{ borderTop: '1px solid #E8E5E0', paddingTop: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>Outbound Dispatch Verification:</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setQuietHoursSimulatedNight(!quietHoursSimulatedNight)}
              >
                {quietHoursSimulatedNight ? 'Simulate Send at 2:00 PM (Day)' : 'Simulate Send at 11:00 PM (Night)'}
              </Button>
            </div>

            {quietHoursSimulatedNight ? (
              <div style={{ background: '#FFF9F5', border: '1px solid #E2A76F', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#8A531C' }}>
                🌙 <strong>Night Hour Detected (11:00 PM):</strong> Promotional deals are strictly deferred until 8:00 AM to respect client sleep. Urgent booking confirmations still deliver instantly.
              </div>
            ) : (
              <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#3A523A' }}>
                ☀️ <strong>Day Hour (2:00 PM):</strong> Clear to send immediately to consented recipients.
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* F063: Visit Progress Check-ins Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Between-Visit Healing Check-ins (F063)
              </h3>
            </div>
            <Badge variant="sage">Observational Self-Report</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
            Clients can upload healing photos and share comfort updates after peels, lashes, or microneedling. Concerns route straight to their treating specialist with automatic safety triage.
          </p>

          <div style={{ background: '#FAF8F5', padding: '12px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#735A42', marginBottom: '16px' }}>
            <strong>Legal & Clinical Safeguard:</strong> Check-ins are self-reported client observations to guide care; they do not constitute formal medical diagnoses. Urgent symptoms trigger immediate clinical escalation advice.
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <Button
              size="sm"
              variant={checkinComfort === 'routine' ? 'primary' : 'outline'}
              onClick={() => { setCheckinComfort('routine'); setCheckinReviewed(false); }}
            >
              Day 3: Routine Mild Flaking (Normal)
            </Button>
            <Button
              size="sm"
              variant={checkinComfort === 'severe' ? 'primary' : 'outline'}
              onClick={() => { setCheckinComfort('severe'); setCheckinReviewed(false); }}
            >
              Day 1: Severe Reaction (Safety Alert)
            </Button>
          </div>

          {checkinComfort === 'routine' ? (
            <div style={{ background: '#F8F9F8', padding: '14px', borderRadius: '8px', border: '1px solid #E8E5E0', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Report from <strong>Hailey Morgan</strong> (Jessner Peel, Day 3)</span>
                <Badge variant="sage">Triage: Routine Healing</Badge>
              </div>
              <p style={{ fontStyle: 'italic', margin: '4px 0 10px', color: 'var(--color-text)' }}>
                "Skin is flaking gently around mouth; applying prescribed barrier balm twice daily."
              </p>
              {checkinReviewed ? (
                <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 12px', borderRadius: '6px', color: '#3A523A' }}>
                  ✓ Specialist Elena Rostova reviewed: "Flaking is right on track for day 3. Keep skin hydrated and resist peeling flakes manually."
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setCheckinReviewed(true)}>
                  Send Specialist Reassurance Note
                </Button>
              )}
            </div>
          ) : (
            <div style={{ background: '#FFF5F2', border: '1px solid #D9826C', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: '#A14E3B' }}>Urgent Clinical Escalation Triggered</span>
                <Badge variant="rose">Triage: Urgent Medical</Badge>
              </div>
              <p style={{ color: 'var(--color-text)', margin: '0 0 10px' }}>
                <strong>SAFETY INSTRUCTION:</strong> Client reported intense burning and localized blistering. Immediate guidance displayed: pause all active products, apply cold compress, and seek urgent medical evaluation if swelling spreads. Treating specialist alerted via urgent notification.
              </p>
            </div>
          )}
        </Card>
      </section>

      {/* F064: Consent-Aware Portfolio Publishing (Document D12) Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Camera size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Consent-Aware Portfolio Publishing (F064 / D12)
              </h3>
            </div>
            <Badge variant="sage">Document D12 Standard</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Treatment consent never grants automatic public marketing rights. Clients hold granular control over whether before/after photos appear on Instagram, the studio website, or remain strictly in private clinical charts.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Authorized Channels</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
                {mediaGrantRevoked ? 'None (Revoked)' : 'Website Portfolio & Instagram'}
              </div>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Facial Anonymity Scope</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
                {anonymitySelection === 'eyes_obscured' ? 'Eyes Obscured / Cropped' : 'Full Face Revealed'}
              </div>
            </div>
            <div style={{ border: '1px solid var(--color-primary)', padding: '12px', borderRadius: '8px', background: '#F9FAF8' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>Live Digital Status</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: mediaGrantRevoked ? '#B36B5C' : 'var(--color-primary)', marginTop: '4px' }}>
                {mediaGrantRevoked ? 'Removed from All Owned Platforms' : 'Actively Published (Consented)'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {!mediaGrantRevoked ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setMediaGrantRevoked(true)}
              >
                Simulate Client Revoking Public Marketing Consent
              </Button>
            ) : (
              <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#3A523A' }}>
                ✓ Marketing rights revoked. Photo unlinked from website & social feeds. Private clinical charting record preserved intact.
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* F065: Virtual Consultation Connection (WB A6) Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Virtual Video Consultation Room (F065 / WB A6)
              </h3>
            </div>
            <Badge variant="sage">Zero-App Frictionless Join</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Clients connect to video consultations directly in their browser without downloading third-party software or creating passwords. Call recording is strictly off by default to protect client confidentiality.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <strong style={{ fontSize: '0.92rem' }}>Bridal Skin Prep Virtual Consult</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Specialist: Elena Rostova • Client: Sienna Miller</div>
              </div>
              <Badge variant="muted">Recording Strictly OFF</Badge>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Linked Intake: <code>3 Reference Photos Attached</code> • Focus: Acne Scarring & Hydration
            </div>
          </div>

          {!consultCompleted ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setConsultRoomCreated(true)}
              >
                Join One-Click Video Room (Browser Link)
              </Button>
              {consultRoomCreated && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setConsultCompleted(true)}
                >
                  Complete Call & Generate Treatment Plan
                </Button>
              )}
            </div>
          ) : (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#3A523A' }}>
              ✓ Consultation completed. Recommended plan: <em>"3-step gentle mandelic peel series"</em> linked directly to client proposal estimate.
            </div>
          )}
        </Card>
      </section>

      {/* F066: Arrival and Private Waiting Room Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Accessible Arrival & Private Waiting Queue (F066)
              </h3>
            </div>
            <Badge variant="sage">Privacy-Preserving Queue</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Clients check in with a single tap. The public salon display shows only sanitized tokens (e.g. "Maya L."), strictly shielding full names, phone numbers, and private VIP member notes.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            {clientArrivedState === 'idle' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setClientArrivedState('arrived')}
              >
                Simulate Client Arrival Tap: "I've Arrived"
              </Button>
            )}

            {clientArrivedState === 'arrived' && (
              <>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setClientArrivedState('in_chair')}
                >
                  Call Client to Station ("In Chair")
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setClientArrivedState('reversed')}
                >
                  Reverse Accidental Check-in
                </Button>
              </>
            )}

            {(clientArrivedState === 'in_chair' || clientArrivedState === 'reversed') && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setClientArrivedState('idle')}
              >
                Reset Queue Simulation
              </Button>
            )}
          </div>

          {clientArrivedState === 'arrived' && (
            <div style={{ background: '#F8F9F8', border: '1px solid #738A73', padding: '14px', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Private Queue Item: Maya L. (Token #14)</span>
                <Badge variant="sage">Arrived (Est. Wait: 5 mins)</Badge>
              </div>
              <p style={{ margin: '0 0 6px', color: 'var(--color-text)' }}>
                Treatment: <strong>Hydra-Dew Glass Glow Facial</strong> with specialist Elena Rostova.
              </p>
              <div style={{ fontSize: '0.78rem', color: '#8A531C', background: '#FFF9F2', padding: '6px 10px', borderRadius: '4px' }}>
                🔒 <strong>Private Staff Alert:</strong> VIP Client (Prefers cucumber infused water). Hidden from public screens.
              </div>
            </div>
          )}

          {clientArrivedState === 'in_chair' && (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#3A523A' }}>
              ✓ Client seated in <strong>Treatment Room 2</strong>. Service timer started.
            </div>
          )}

          {clientArrivedState === 'reversed' && (
            <div style={{ background: '#FAF8F5', border: '1px solid #E2A76F', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#735A42' }}>
              Accidental check-in reversed back to "Scheduled". Appointment preserved without dropping from calendar.
            </div>
          )}
        </Card>
      </section>

      {/* F067: Local Device Preferences & Accessibility Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card style={{
          fontSize: textSizeSelection === 'large' ? '1.08rem' : textSizeSelection === 'extra_large' ? '1.2rem' : '0.95rem',
          border: contrastSelection === 'high_contrast' ? '2px solid #000000' : '1px solid var(--color-border)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Type size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Device Preferences & Universal Accessibility (F067)
              </h3>
            </div>
            <Badge variant="sage">WCAG AAA Ready</Badge>
          </div>

          <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Zero drag-only or memory puzzle interactions. Complete reservations and checkout using high contrast, enlarged touch targets, and full keyboard focus accessibility.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Text Size:</span>
              <Button
                size="sm"
                variant={textSizeSelection === 'default' ? 'primary' : 'outline'}
                onClick={() => setTextSizeSelection('default')}
              >
                Default
              </Button>
              <Button
                size="sm"
                variant={textSizeSelection === 'large' ? 'primary' : 'outline'}
                onClick={() => setTextSizeSelection('large')}
              >
                Large (+15%)
              </Button>
              <Button
                size="sm"
                variant={textSizeSelection === 'extra_large' ? 'primary' : 'outline'}
                onClick={() => setTextSizeSelection('extra_large')}
              >
                XL (+30%)
              </Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Contrast:</span>
              <Button
                size="sm"
                variant={contrastSelection === 'standard' ? 'primary' : 'outline'}
                onClick={() => setContrastSelection('standard')}
              >
                Standard
              </Button>
              <Button
                size="sm"
                variant={contrastSelection === 'high_contrast' ? 'primary' : 'outline'}
                onClick={() => setContrastSelection('high_contrast')}
              >
                High Contrast
              </Button>
            </div>
          </div>

          <div style={{ background: contrastSelection === 'high_contrast' ? '#FFFFFF' : '#FAF8F5', border: '1px solid #CCC', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: contrastSelection === 'high_contrast' ? '#000000' : 'var(--color-primary)' }}>
              Accessibility Preview Card
            </div>
            <div style={{ color: contrastSelection === 'high_contrast' ? '#000000' : 'var(--color-text)' }}>
              Buttons feature high-visibility 3px focus rings and reduced-motion transitions.
            </div>
          </div>
        </Card>
      </section>

      {/* F068: Client Credit & Balance Explanations Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wallet size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Transparent Client Credit & Balances (F068 / D15 / D17)
              </h3>
            </div>
            <Badge variant="sage">Document D17 Certified</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            No mysterious expired funds or confusing math. Every package session, gift card dollar, and monthly credit is written out in warm, plain English with a complete redemption ledger.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
            <div style={{ background: '#FAF8F5', border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>HydraFacial 3-Pack Series</strong>
                <Badge variant="sage">{3 - redeemedSessionCount} of 3 Left</Badge>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text)', margin: '4px 0 8px' }}>
                "You have {3 - redeemedSessionCount} of 3 sessions remaining (${(3 - redeemedSessionCount) * 100}.00 value), valid through Oct 15, 2027."
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Last used: Oct 20, 2026 at Checkout (#33333333)
              </div>
            </div>

            <div style={{ background: '#FAF8F5', border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>Mother's Day Gift Card</strong>
                <Badge variant="sage">$75.00 Available</Badge>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text)', margin: '4px 0 8px' }}>
                "You have $75.00 spendable store credit from your Mother's Day pampering gift card, with no expiration date."
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Protected Code: <code>GIFT-****-9842</code> (Secret masked)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              size="sm"
              variant="outline"
              disabled={redeemedSessionCount >= 3}
              onClick={() => setRedeemedSessionCount(redeemedSessionCount + 1)}
            >
              Simulate Redeeming 1 Package Session at Checkout
            </Button>
            {redeemedSessionCount > 1 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setRedeemedSessionCount(1)}
              >
                Reset Balance
              </Button>
            )}
          </div>
        </Card>
      </section>

      {/* F069: Staff Document Generation (Documents D19, D20) Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Staff Document & Commission Generation (F069 / D19 / D20)
              </h3>
            </div>
            <Badge variant="sage">Document D19/D20 Certified</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Protects your team with legally accurate relationship boundaries. W-2 employees receive statutory terms; independent booth renters keep their own merchant accounts and separate client data ownership.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <Button
              size="sm"
              variant={staffRelationship === 'booth_or_chair_renter' ? 'primary' : 'outline'}
              onClick={() => setStaffRelationship('booth_or_chair_renter')}
            >
              Independent Booth Renter (1099)
            </Button>
            <Button
              size="sm"
              variant={staffRelationship === 'w2_employee' ? 'primary' : 'outline'}
              onClick={() => setStaffRelationship('w2_employee')}
            >
              W-2 Studio Employee
            </Button>
          </div>

          <div style={{ background: '#FAF8F5', border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <strong>Onboarding Agreement Terms (Camila Rodriguez)</strong>
              <Badge variant="sage">
                {staffRelationship === 'booth_or_chair_renter' ? '$275/week Chair Rent' : 'Hourly Base + 50% Commission'}
              </Badge>
            </div>
            <p style={{ fontStyle: 'italic', margin: '4px 0 0', color: 'var(--color-text)' }}>
              {staffRelationship === 'booth_or_chair_renter'
                ? 'Independent Business Notice: As a booth renter, you operate your own business, maintain your own merchant credentials, and own your client list. Posie does not merge your commercial records into the salon.'
                : 'Employee Relationship Notice: As an employee, you receive statutory protections, workers compensation, and employer payroll tax withholdings as defined under state law.'}
            </p>
          </div>

          {/* D20 Commission Statement Breakdown */}
          <div style={{ border: '1px solid #E8E5E0', borderRadius: '8px', padding: '14px', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Commission & Gratuity Statement (Oct 15 – Oct 31)</span>
              <Badge variant={statementApproved ? 'sage' : 'muted'}>
                {statementApproved ? 'Manager Approved' : 'Estimated Draft'}
              </Badge>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', fontSize: '0.82rem', marginBottom: '12px' }}>
              <div>Services (50%): <strong>$40.00</strong></div>
              <div>Retail (15%): <strong>$3.60</strong></div>
              <div>Tips (100%): <strong>$20.00</strong></div>
              <div>Total Payable: <strong style={{ color: 'var(--color-primary)' }}>$63.60</strong></div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: '0 0 10px' }}>
              Notice: Reflects internal earnings detail report and does not substitute for a statutory payroll pay stub.
            </p>
            {!statementApproved ? (
              <Button size="sm" variant="outline" onClick={() => setStatementApproved(true)}>
                Manager Sign-Off & Approve for Payroll
              </Button>
            ) : (
              <span style={{ fontSize: '0.82rem', color: '#3A523A', fontWeight: 600 }}>
                ✓ Approved by Elena Rostova (General Manager) on {new Date().toLocaleDateString()}
              </span>
            )}
          </div>
        </Card>
      </section>

      {/* F070: International Language Presentation (Documents DR08, DR09) Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Languages size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                International Language Presentation (F070 / DR08 / DR09)
              </h3>
            </div>
            <Badge variant="sage">Counsel & Clinician Certified</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Welcomes diverse clients in their preferred language while strictly guaranteeing that translations never alter service pricing or entitlements. Currencies are never inferred from browser locale.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <Button
              size="sm"
              variant={selectedLocale === 'en-US' ? 'primary' : 'outline'}
              onClick={() => setSelectedLocale('en-US')}
            >
              English (en-US)
            </Button>
            <Button
              size="sm"
              variant={selectedLocale === 'es-US' ? 'primary' : 'outline'}
              onClick={() => setSelectedLocale('es-US')}
            >
              Español (es-US)
            </Button>
            <Button
              size="sm"
              variant={selectedLocale === 'fr-CA' ? 'primary' : 'outline'}
              onClick={() => setSelectedLocale('fr-CA')}
            >
              Français (fr-CA)
            </Button>
            <Button
              size="sm"
              variant={selectedLocale === 'vi-US' ? 'primary' : 'outline'}
              onClick={() => setSelectedLocale('vi-US')}
            >
              Tiếng Việt (vi-US)
            </Button>
            <Button
              size="sm"
              variant={selectedLocale === 'ko-US' ? 'primary' : 'outline'}
              onClick={() => setSelectedLocale('ko-US')}
            >
              한국어 (ko-US)
            </Button>
          </div>

          <div style={{ background: '#FAF8F5', border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                {selectedLocale === 'es-US' && 'Facial Hidratante Efecto Vidrio Glow'}
                {selectedLocale === 'en-US' && 'Hydra-Dew Glass Glow Facial'}
                {selectedLocale === 'fr-CA' && 'Soin Facial Hydra-Rosée Éclat Sublime'}
                {selectedLocale === 'vi-US' && 'Liệu Trình Chăm Sóc Da Căng Bóng Hydra-Dew'}
                {selectedLocale === 'ko-US' && '하이드라 듀 물광 페이셜 케어'}
              </strong>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  $120.00 USD
                </span>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Catalog Currency Preserved</div>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--color-text)', margin: '0 0 10px', lineHeight: 1.5 }}>
              {selectedLocale === 'es-US' && 'Doble limpieza profunda, exfoliación enzimática de frutas e infusión ultra hidratante de ácido hialurónico.'}
              {selectedLocale === 'en-US' && 'Double cleanse, fruit enzyme sweep, and ultra-drenching hyaluronic infusion.'}
              {selectedLocale === 'fr-CA' && 'Double nettoyage en profondeur, balayage enzymatique de fruits et infusion ultra-hydratante d\'acide hyaluronique.'}
              {selectedLocale === 'vi-US' && 'Làm sạch kép, tẩy tế bào chết enzyme trái cây và truyền tinh chất hyaluronic cấp ẩm sâu.'}
              {selectedLocale === 'ko-US' && '딥 듀얼 클렌징, 천연 과일 효소 각질 케어 및 히알루론산 수분 집중 충전.'}
            </p>

            <div style={{ fontSize: '0.78rem', color: '#3A523A', background: '#F4F7F4', padding: '8px 12px', borderRadius: '6px' }}>
              ✓ <strong>DR09 Legal Invariant:</strong> Client-signed consent records permanently store exact rendered language (<code>{selectedLocale}</code>) and certified translation wording.
            </div>
          </div>
        </Card>
      </section>

      {/* F071: Rebooking at Checkout Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RotateCcw size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Smart Rebooking at Checkout (F071)
              </h3>
            </div>
            <Badge variant="sage">Zero-Pressure Flow</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Thoughtfully suggests the ideal return cadence based on treatment biology, offering convenient slots while fully respecting the client's freedom to defer.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong>Recommended Return: Fluff & Define Brow Sculpt</strong>
              <Badge variant="muted">4-Week Cadence (Nov 29, 2026)</Badge>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text)', margin: '0 0 10px' }}>
              "Brow shaping and tinting look crispest with a 4-week maintenance cadence to catch your natural growth cycle."
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ border: '1px solid var(--color-primary)', padding: '10px 14px', borderRadius: '8px', background: '#FFFFFF', fontSize: '0.84rem' }}>
                <div>Thu, Nov 29 • <strong>10:00 AM</strong></div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>with Elena Rostova</span>
              </div>
              <div style={{ border: '1px solid #CCC', padding: '10px 14px', borderRadius: '8px', background: '#FFFFFF', fontSize: '0.84rem' }}>
                <div>Fri, Nov 30 • <strong>2:30 PM</strong></div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>with Elena Rostova</span>
              </div>
            </div>
          </div>

          {rebookingChoice === 'pending' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setRebookingChoice('booked')}
              >
                Reserve Thu Nov 29 (10:00 AM)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setRebookingChoice('sms_reminder')}
              >
                Remind Me via Text 1 Week Before
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setRebookingChoice('declined')}
              >
                I'll Book Later Online
              </Button>
            </div>
          )}

          {rebookingChoice === 'booked' && (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#3A523A' }}>
              ✓ <strong>Appointment Reserved:</strong> Thursday, Nov 29 at 10:00 AM with Elena Rostova. Added to your studio schedule!
            </div>
          )}

          {rebookingChoice === 'sms_reminder' && (
            <div style={{ background: '#FAF8F5', border: '1px solid #738A73', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--color-primary)' }}>
              ✓ <strong>Friendly Reminder Set:</strong> We'll text you on Nov 22 with one-tap booking links so you never miss your maintenance window.
            </div>
          )}

          {rebookingChoice === 'declined' && (
            <div style={{ background: '#FAFAFA', border: '1px solid #CCC', padding: '12px 14px', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              No problem! Your receipt has been sent and your booking link is always available whenever you're ready.
            </div>
          )}
        </Card>
      </section>

      {/* F072: Customer Owned Business Phone Line & Portability Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Customer-Owned Business Line & Portability (F072 / WB U19)
              </h3>
            </div>
            <Badge variant="sage">Zero Telephony Lock-In</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Your business number belongs to you, not your software platform. Send client SMS broadcasts from an authorized local line, and take your number with you anytime with an instant Letter of Authorization (LOA).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Registered Studio Line</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>(512) 555-0199</div>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>A2P 10DLC Brand Status</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#3A523A' }}>Verified & Active</div>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Carrier Account ID</span>
              <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>POSIE-TEL-11111111</div>
            </div>
          </div>

          {!loaGenerated ? (
            <Button size="sm" variant="outline" onClick={() => setLoaGenerated(true)}>
              Generate Official Carrier Port-Out Letter (LOA)
            </Button>
          ) : (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px 14px', borderRadius: '8px', fontSize: '0.84rem' }}>
              <div style={{ fontWeight: 600, color: '#3A523A', marginBottom: '4px' }}>
                ✓ Official Carrier Letter of Authorization (LOA) Generated
              </div>
              <p style={{ margin: '0 0 6px', color: 'var(--color-text)' }}>
                Billing Tel: <code>+15125550199</code> • PIN: <code>8492</code> • Target: Any Telephony Carrier (Twilio, Verizon, AT&T). Zero exit penalty.
              </p>
              <Badge variant="sage">Port-Out Authorization Ready</Badge>
            </div>
          )}
        </Card>
      </section>

      {/* F073: Tenant Identity & Access Control (Document DR07) Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Tenant Security & Least-Privilege Firewall (F073 / DR07)
              </h3>
            </div>
            <Badge variant="sage">DR07 Recipient Firewall</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Strict multi-tenant boundaries separate salon businesses, locations, and staff roles. Front-desk team members can check in clients but are firewalled from sensitive medical SOAP notes and owner bank payouts.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, alignSelf: 'center', marginRight: '6px' }}>Simulate Active Role:</span>
            <Button
              size="sm"
              variant={selectedRole === 'front_desk_coordinator' ? 'primary' : 'outline'}
              onClick={() => setSelectedRole('front_desk_coordinator')}
            >
              Front Desk Coordinator
            </Button>
            <Button
              size="sm"
              variant={selectedRole === 'service_provider' ? 'primary' : 'outline'}
              onClick={() => setSelectedRole('service_provider')}
            >
              Service Provider (Specialist)
            </Button>
            <Button
              size="sm"
              variant={selectedRole === 'salon_owner' ? 'primary' : 'outline'}
              onClick={() => setSelectedRole('salon_owner')}
            >
              Salon Owner
            </Button>
          </div>

          {/* Permission Firewall Matrix */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '16px' }}>
            <div style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #E8E5E0', background: '#FAFAFA', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Reception Arrival Queue:</span>
              <div style={{ fontWeight: 600, color: '#3A523A' }}>✓ Allowed for all roles</div>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #E8E5E0', background: selectedRole === 'front_desk_coordinator' ? '#FFF5F2' : '#FAFAFA', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Clinical SOAP Treatment Notes:</span>
              <div style={{ fontWeight: 600, color: selectedRole === 'front_desk_coordinator' ? '#B36B5C' : '#3A523A' }}>
                {selectedRole === 'front_desk_coordinator' ? '🔒 Blocked (DR07 Firewall)' : '✓ Authorized'}
              </div>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #E8E5E0', background: selectedRole !== 'salon_owner' ? '#FFF5F2' : '#FAFAFA', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Bank Account & Payouts:</span>
              <div style={{ fontWeight: 600, color: selectedRole !== 'salon_owner' ? '#B36B5C' : '#3A523A' }}>
                {selectedRole === 'salon_owner' ? '✓ Authorized (Owner Only)' : '🔒 Blocked'}
              </div>
            </div>
          </div>

          {/* Session Revocation Simulator */}
          <div style={{ borderTop: '1px solid #E8E5E0', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Staff Departure Protocol: Deactivating a team member instantly revokes all active session tokens.
            </span>
            {!staffMemberDeactivated ? (
              <Button size="sm" variant="outline" onClick={() => setStaffMemberDeactivated(true)}>
                Simulate Instant Session Revocation
              </Button>
            ) : (
              <span style={{ fontSize: '0.82rem', color: '#B36B5C', fontWeight: 600 }}>
                ✓ Account deactivated. All active bearer tokens revoked immediately.
              </span>
            )}
          </div>
        </Card>
      </section>

      {/* F074: Financial Ledger & Idempotent Checkout Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Financial Ledger & Idempotency Safeguard (F074 / D14 / D15 / D17)
              </h3>
            </div>
            <Badge variant="sage">Double-Entry Ledger</Badge>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Double charges from flaky Wi-Fi or rapid button clicks are mathematically prevented via cryptographic idempotency keys. Every transaction reconciles gross customer payments, processor fees, and bank deposits.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Gross Charged (Service $120 + Tip $20)</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>$140.00</div>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Processing Fee (2.6% + 10¢)</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#B36B5C' }}>-$3.74</div>
            </div>
            <div style={{ border: '1px solid var(--color-primary)', padding: '12px', borderRadius: '8px', background: '#F9FAF8' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>Net Bank Payout Deposit</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>$136.26</div>
            </div>
          </div>

          {/* Idempotency Demonstration */}
          <div style={{ background: '#FAF8F5', border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.88rem' }}>Checkout Action (Idempotency Key: <code>key_checkout_8829</code>)</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Total Payment Executions Attempted: <strong>{checkoutClickCount}</strong>
                </div>
              </div>
              <Button
                size="sm"
                variant={checkoutClickCount === 0 ? 'primary' : 'outline'}
                onClick={() => setCheckoutClickCount(checkoutClickCount + 1)}
              >
                {checkoutClickCount === 0 ? 'Execute Checkout Payment ($140.00)' : 'Simulate Network Retry (Double Click)'}
              </Button>
            </div>
          </div>

          {checkoutClickCount === 1 && (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ Payment executed once: Transaction ID <code>f074...0001</code> created with 3 balanced double-entry ledger lines.
            </div>
          )}

          {checkoutClickCount > 1 && (
            <div style={{ background: '#FFF9F2', border: '1px solid #E2A76F', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#8A531C' }}>
              🛡️ <strong>Idempotency Guard Activated:</strong> Request retry recognized existing transaction <code>f074...0001</code>. Returned confirmed receipt without charging card a second time. Zero duplicate transactions created!
            </div>
          )}
        </Card>
      </section>

      {/* F075: Reliable Booking Engine Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Reliable Booking Engine (F075)
              </h3>
            </div>
            <Badge variant="sage">Guest Checkout • Atomic Slot Lock</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Clients book effortlessly as guests with zero forced apps or account passwords. Temporary 10-minute slot holds atomically protect selected times from concurrent collisions. Staff can also text one-click express booking links to lock cards securely.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Box 1: Guest Checkout & Atomic Hold */}
            <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                1. Guest Atomic Slot Lock
              </h4>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text)', marginBottom: '12px', background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid #EEE' }}>
                <div><strong>Selected Time:</strong> Today at 2:00 PM (90m Balayage)</div>
                <div><strong>Practitioner:</strong> Maya Lin (Master Colorist)</div>
                <div><strong>Status:</strong> {bookingHoldState === 'none' ? 'Open' : bookingHoldState === 'held' ? 'Held for checkout (9:45 remaining)' : bookingHoldState === 'confirmed' ? 'Confirmed Appointment' : 'Collision Blocked'}</div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {bookingHoldState === 'none' && (
                  <Button size="sm" variant="primary" onClick={() => setBookingHoldState('held')}>
                    Hold 2:00 PM Slot (10m TTL)
                  </Button>
                )}
                {bookingHoldState === 'held' && (
                  <>
                    <Button size="sm" variant="primary" onClick={() => setBookingHoldState('confirmed')}>
                      Confirm (No App or Account Needed)
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setBookingHoldState('collision_blocked')}>
                      Simulate Concurrent Double-Booker
                    </Button>
                  </>
                )}
                {(bookingHoldState === 'confirmed' || bookingHoldState === 'collision_blocked') && (
                  <Button size="sm" variant="outline" onClick={() => setBookingHoldState('none')}>
                    Reset Slot Demo
                  </Button>
                )}
              </div>

              {bookingHoldState === 'collision_blocked' && (
                <div style={{ marginTop: '10px', background: '#FFF7F5', border: '1px solid #C67D6E', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', color: '#B36B5C' }}>
                  ⚠️ <strong>Collision Prevented:</strong> A second client attempted to book 2:00 PM while Maya Lin was held in your cart. Second client was offered the next available opening at 3:45 PM.
                </div>
              )}
              {bookingHoldState === 'confirmed' && (
                <div style={{ marginTop: '10px', background: '#F4F7F4', border: '1px solid #738A73', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', color: '#3A523A' }}>
                  ✓ <strong>Booking Confirmed:</strong> Token committed atomically into the salon master schedule.
                </div>
              )}
            </div>

            {/* Box 2: Express Provisional Pro Link */}
            <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                2. Express Staff Provisional Link
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '0 0 12px' }}>
                When booking over the phone, staff create a tentative slot. The client gets a secure text link to approve the time and add their card hold without reading card numbers aloud.
              </p>

              {!provisionalLinkActive ? (
                <Button size="sm" variant="outline" onClick={() => { setProvisionalLinkActive(true); setProvisionalConfirmed(false); }}>
                  Generate Express Link for Client
                </Button>
              ) : !provisionalConfirmed ? (
                <div style={{ background: '#FFF', border: '1px solid #DDD', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                    🔗 <code>posie.com/express/exp_99a82f3</code>
                  </div>
                  <Button size="sm" variant="primary" onClick={() => setProvisionalConfirmed(true)}>
                    Client Clicks Link & Approves Card Hold
                  </Button>
                </div>
              ) : (
                <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', color: '#3A523A' }}>
                  ✓ <strong>Express Reservation Locked:</strong> Client confirmed time zone & card hold in 1 click. Zero phone friction.
                </div>
              )}
            </div>
          </div>
        </Card>
      </section>

      {/* F076: Room & Equipment Scheduling Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Room & Equipment Scheduling (F076)
              </h3>
            </div>
            <Badge variant="sage">Sanitization Buffers • Conflict Defense</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Reserve exclusive treatment suites, chairs, and specialized laser devices alongside practitioners. Mandatory disinfection turnarounds are automatically locked into each resource's schedule.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.88rem' }}>Esthetics Suite A</strong>
                <Badge variant="sage">15m Sanitization</Badge>
              </div>
              <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>Booked: 2:00 PM – 3:00 PM (+15m cleanup until 3:15 PM)</span>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.88rem' }}>IPL Photofacial Laser</strong>
                <Badge variant="sage">20m Sanitization</Badge>
              </div>
              <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>Reserved: 2:00 PM – 3:00 PM (+20m sterilization until 3:20 PM)</span>
            </div>
            <div style={{ border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.88rem' }}>Styling Chair 04</strong>
                <Badge variant="muted">10m Reset</Badge>
              </div>
              <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>Available starting 3:30 PM</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Test Resource Invariant:</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRoomScheduleAttempt('conflict_blocked')}
            >
              Attempt Booking at 3:10 PM (During Disinfection Buffer)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRoomScheduleAttempt('booked_clean')}
            >
              Attempt Booking at 3:25 PM (After Buffer)
            </Button>
          </div>

          {roomScheduleAttempt === 'conflict_blocked' && (
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#B36B5C' }}>
              🚫 <strong>Resource Conflict Blocked:</strong> Cannot reserve IPL Photofacial Laser at 3:10 PM. Device is currently undergoing mandatory 20-minute sterilization cleanup until 3:20 PM.
            </div>
          )}

          {roomScheduleAttempt === 'booked_clean' && (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Resource Reserved:</strong> 3:25 PM slot successfully reserved. Disinfection window for previous client is 100% complete.
            </div>
          )}
        </Card>
      </section>

      {/* F077: Processing & Finishing Intervals Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Processing & Finishing Intervals (F077)
              </h3>
            </div>
            <Badge variant="sage">Multi-Segment • Double-Booking Defense</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Model hands-on application, chemical processing gaps, and finishing blowout steps. Processing gaps free up practitioner hands to take quick secondary services without releasing the primary client's occupied styling chair!
          </p>

          {/* Visual Timeline of Segments */}
          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '16px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '0.92rem', color: 'var(--color-primary)' }}>
              Primary Client Appointment: Signature Balayage (10:00 AM – 12:00 PM)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '45fr 40fr 35fr', gap: '8px', textAlign: 'center', fontSize: '0.78rem' }}>
              <div style={{ background: '#E8ECE6', border: '1px solid #A2B59F', padding: '10px', borderRadius: '6px' }}>
                <strong>10:00 – 10:45 AM (45m)</strong>
                <div>Hands-On Foils</div>
                <Badge variant="sage" style={{ marginTop: '4px' }}>Stylist Busy • Chair 04</Badge>
              </div>
              <div style={{ background: '#FFF9F2', border: '1px solid #E2A76F', padding: '10px', borderRadius: '6px' }}>
                <strong>10:45 – 11:25 AM (40m)</strong>
                <div>Processing / Color Dwell</div>
                <Badge variant="rose" style={{ marginTop: '4px' }}>Stylist Free • Chair 04 Occupied</Badge>
              </div>
              <div style={{ background: '#E8ECE6', border: '1px solid #A2B59F', padding: '10px', borderRadius: '6px' }}>
                <strong>11:25 – 12:00 PM (35m)</strong>
                <div>Rinse, Gloss & Blowout</div>
                <Badge variant="sage" style={{ marginTop: '4px' }}>Stylist Busy • Chair 04</Badge>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Test Gap Scheduling:</span>
            <Button
              size="sm"
              variant={gapServiceFitted ? 'primary' : 'outline'}
              onClick={() => { setGapServiceFitted(true); setGapStationTheftAttempted(false); }}
            >
              Fit 25m Express Dry Cut (10:50 – 11:15 AM) in Chair 05
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setGapStationTheftAttempted(true); setGapServiceFitted(false); }}
            >
              Attempt Secondary Booking in Primary Chair 04
            </Button>
          </div>

          {gapServiceFitted && (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Gap Service Successfully Scheduled:</strong> Stylist Maya Lin will cut secondary client in Station 05 from 10:50 to 11:15 AM, ending 10 minutes before the 11:25 AM balayage finishing step begins.
            </div>
          )}

          {gapStationTheftAttempted && (
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#B36B5C' }}>
              🚫 <strong>Station Collision Prevented:</strong> Although the stylist is freed during color processing, Chair 04 remains physically occupied by the balayage client. Secondary bookings must use another station!
            </div>
          )}
        </Card>
      </section>

      {/* F078: Multi-Practitioner Appointments Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Multi-Practitioner Appointments & Visit Itinerary (F078 / D02)
              </h3>
            </div>
            <Badge variant="sage">Sequential Services • Ripple Impact</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Coordinate sequential treatments across certified practitioners with structured handoff notes. If an earlier segment runs late, Posie analyzes downstream schedule collisions before notifying staff.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                Chloe's Glow Afternoon Itinerary (Document D02)
              </strong>
              <Badge variant="sage">{multiApptDelayed ? 'Version 2 (Revised)' : 'Version 1 (Confirmed)'}</Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Segment 1 (Master Colorist)</span>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Maya Lin — Balayage</div>
                <div style={{ fontSize: '0.8rem', color: multiApptDelayed ? '#B36B5C' : 'var(--color-text)' }}>
                  {multiApptDelayed ? '1:00 PM – 2:50 PM (20m Lift Delay)' : '1:00 PM – 2:30 PM (90 mins)'}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#6A7D6A', marginTop: '4px' }}>
                  💬 Handoff: "Scalp slightly sensitive, avoid hot water rinse."
                </div>
              </div>

              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Segment 2 (Keratin Lash Certified)</span>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Sarah Jenkins — Keratin Lash Lift</div>
                <div style={{ fontSize: '0.8rem', color: multiApptDelayed ? '#B36B5C' : 'var(--color-text)' }}>
                  {multiApptDelayed ? 'Projected: 2:50 PM – 3:35 PM' : 'Scheduled: 2:30 PM – 3:15 PM (45 mins)'}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Sarah's next client arrives at 3:30 PM
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Test Delay Ripple Engine:</span>
            <Button
              size="sm"
              variant={multiApptDelayed ? 'primary' : 'outline'}
              onClick={() => setMultiApptDelayed(!multiApptDelayed)}
            >
              {multiApptDelayed ? 'Reset to On-Time Schedule' : 'Simulate 20m Delay on Maya\'s Foils'}
            </Button>
          </div>

          {multiApptDelayed && (
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#B36B5C' }}>
              ⚠️ <strong>Downstream Cascade Warning:</strong> Extending Maya's service pushes Sarah's end time to 3:35 PM, colliding by 5 minutes with Sarah's next booked appointment at 3:30 PM. Studio coordinator alerted to adjust buffer before notifying client.
            </div>
          )}
        </Card>
      </section>

      {/* F079: Group and Family Booking Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartPulse size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Group & Family Booking (F079 / Document D22)
              </h3>
            </div>
            <Badge variant="sage">Bridal / Group Proposals • Privacy Firewall</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Book parties and bridal groups with combined or itemized checkout. Legal invariant: organizers and guardians do not automatically gain access to other adult guests' confidential medical and intake records.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                Lauren's Bridal Party (Day-Of Packet D22)
              </strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Subtotal: $455.00 • 30% Deposit Paid ($136.50) • Due: $318.50
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Organizer / Bride</span>
                <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>Lauren Hayes</div>
                <div style={{ fontSize: '0.78rem' }}>Bridal Updo ($220)</div>
              </div>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Adult Guest / MOH</span>
                <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>Brianna Smith</div>
                <div style={{ fontSize: '0.78rem' }}>Hollywood Waves ($150)</div>
              </div>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Minor Child (Daughter)</span>
                <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>Lily Hayes</div>
                <div style={{ fontSize: '0.78rem' }}>Youth Soft Curls ($85)</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Test Privacy Firewall:</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setGroupPrivacyTarget('adult_friend')}
            >
              Organizer Requests Adult Guest's (Brianna) Health Notes
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setGroupPrivacyTarget('minor_child')}
            >
              Organizer Requests Minor Child's (Lily) Allergy Notes
            </Button>
          </div>

          {groupPrivacyTarget === 'adult_friend' && (
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#B36B5C' }}>
              🔒 <strong>Medical Privacy Firewall Triggered:</strong> Brianna is a legal adult. Her confidential pregnancy & allergy disclosures are firewalled from the bridal party packet and viewable only by her treating specialist.
            </div>
          )}

          {groupPrivacyTarget === 'minor_child' && (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Authorized Legal Guardian Access:</strong> Lauren is Lily's verified guardian. Record revealed: "Severe peanut allergy; ensure styling products are 100% nut-oil free."
            </div>
          )}
        </Card>
      </section>

      {/* F080: Classes and Workshops Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarCheck size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Classes & Workshops (F080)
              </h3>
            </div>
            <Badge variant="sage">Seat Roster • Waitlist Auto-Promotion</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Host group masterclasses and wellness workshops. Invariant: The final seat is sold strictly once during concurrent checkout, and cancellations automatically promote waitlisted guests.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                  Gua Sha & Lymphatic Drainage Masterclass ($65.00)
                </strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Instructor: Maya Lin • Studio Room B • Nov 25 at 6:00 PM
                </div>
              </div>
              <Badge variant={workshopSeatsConfirmed.length >= 2 ? 'rose' : 'sage'}>
                {workshopSeatsConfirmed.length}/2 Seats Confirmed
              </Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Confirmed Attendee Roster</span>
                <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: '0.82rem' }}>
                  {workshopSeatsConfirmed.map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                  {workshopSeatsConfirmed.length === 0 && <li style={{ color: '#999' }}>No seats filled</li>}
                </ul>
              </div>

              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Waitlist Queue</span>
                <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: '0.82rem' }}>
                  {workshopWaitlist.map((name, i) => (
                    <li key={i}>{name} (Priority #{i + 1})</li>
                  ))}
                  {workshopWaitlist.length === 0 && <li style={{ color: '#999' }}>Waitlist empty</li>}
                </ul>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {workshopSeatsConfirmed.length < 2 && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setWorkshopSeatsConfirmed([...workshopSeatsConfirmed, 'Hannah A.'])}
              >
                Book Final Seat (Hannah A.)
              </Button>
            )}

            {workshopSeatsConfirmed.length >= 2 && workshopWaitlist.length === 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setWorkshopWaitlist(['Claire R.'])}
              >
                Simulate Concurrent Checkout (Claire R. to Waitlist)
              </Button>
            )}

            {workshopSeatsConfirmed.includes('Emily W.') && workshopWaitlist.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setWorkshopSeatsConfirmed(workshopSeatsConfirmed.filter((n) => n !== 'Emily W.').concat('Claire R.'));
                  setWorkshopWaitlist([]);
                }}
              >
                Emily W. Cancels Seat (Auto-Promote Claire R.)
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setWorkshopSeatsConfirmed(['Emily W.']);
                setWorkshopWaitlist([]);
              }}
            >
              Reset Workshop Demo
            </Button>
          </div>
        </Card>
      </section>

      {/* F081: Timed Waitlist Offers Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Timed Waitlist Offers (F081)
              </h3>
            </div>
            <Badge variant="sage">Preference Matching • 15m Exclusive Claim</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Match newly opened slots to waitlisted guests based on service, provider, day, and time preference. Dispatches an exclusive 15-minute claim offer. If expired, the slot safely advances to the next guest without race conditions.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                Opened Slot: Thursday Nov 20 at 2:00 PM (Custom Bespoke Facial with Maya Lin)
              </strong>
              <Badge variant="muted">Waitlist Priority Order</Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.86rem' }}>1. Claire Redfield (Priority #1)</strong>
                  <Badge variant={waitlistOfferState === 'offered_claire' ? 'rose' : 'muted'}>
                    {waitlistOfferState === 'offered_claire' ? 'Offer Active (14:12 TTL)' : waitlistOfferState === 'expired_advanced_diana' || waitlistOfferState === 'claimed_diana' ? 'Expired' : 'Queued'}
                  </Badge>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Requested: Thursdays / Afternoons • On waitlist since Nov 1
                </div>
              </div>

              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.86rem' }}>2. Diana Prince (Priority #2)</strong>
                  <Badge variant={waitlistOfferState === 'expired_advanced_diana' ? 'rose' : waitlistOfferState === 'claimed_diana' ? 'sage' : 'muted'}>
                    {waitlistOfferState === 'claimed_diana' ? 'Claimed & Confirmed!' : waitlistOfferState === 'expired_advanced_diana' ? 'Offer Active (15:00 TTL)' : 'Next in Queue'}
                  </Badge>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Requested: Thursdays / Afternoons • On waitlist since Nov 2
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {waitlistOfferState === 'idle' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setWaitlistOfferState('offered_claire')}
              >
                Send 15m Timed Offer to Claire (1st in line)
              </Button>
            )}

            {waitlistOfferState === 'offered_claire' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setWaitlistOfferState('expired_advanced_diana')}
              >
                Simulate 15m Expiry & Auto-Advance to Diana
              </Button>
            )}

            {waitlistOfferState === 'expired_advanced_diana' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setWaitlistOfferState('claimed_diana')}
              >
                Diana Claims Slot (Atomic Hold Token Confirmed)
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => setWaitlistOfferState('idle')}
            >
              Reset Waitlist Offer Demo
            </Button>
          </div>

          {waitlistOfferState === 'claimed_diana' && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Atomic Claim Success:</strong> Diana Prince claimed the Thursday 2:00 PM slot with token <code>clm_92b8...</code>. Waitlist offer dispatch closed; zero risk of double-booking.
            </div>
          )}
        </Card>
      </section>

      {/* F082: Cancellation Recovery Queue Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RotateCcw size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Cancellation Recovery Queue (F082)
              </h3>
            </div>
            <Badge variant="sage">Revenue Integrity • Standby Fill</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Rapidly fill unexpected openings with compatible waitlist requests, earlier-move requests, and voluntary standby VIPs. Invariant: Recovery revenue strictly distinguishes genuine incremental revenue from moved existing appointments.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: '#B36B5C' }}>
                  Cancelled Appointment: Signature Balayage ($220.00)
                </strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Today at 2:00 PM (120 mins) • Specialist: Maya Lin
                </div>
              </div>
              <Badge variant="rose">2 Hours to Recover</Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Option A: Earlier-Move Request</span>
                <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>Jessica Alba (VIP)</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Currently booked next Friday Nov 28. Wants to move up sooner.
                </div>
                <Button
                  size="sm"
                  variant={cancellationRecoveryChoice === 'earlier_move' ? 'primary' : 'outline'}
                  style={{ marginTop: '8px' }}
                  onClick={() => setCancellationRecoveryChoice('earlier_move')}
                >
                  Fill via Earlier-Move
                </Button>
              </div>

              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Option B: Standby VIP Client</span>
                <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>Gigi Hadid (VIP Standby)</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  On-call standby client. Has NO future appointment booked.
                </div>
                <Button
                  size="sm"
                  variant={cancellationRecoveryChoice === 'standby_vip' ? 'primary' : 'outline'}
                  style={{ marginTop: '8px' }}
                  onClick={() => setCancellationRecoveryChoice('standby_vip')}
                >
                  Fill via Standby VIP
                </Button>
              </div>
            </div>
          </div>

          {cancellationRecoveryChoice === 'earlier_move' && (
            <div style={{ background: '#FFF9F2', border: '1px solid #E2A76F', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#8A531C' }}>
              🔄 <strong>Reschedule Volume ($220.00):</strong> Slot saved, but Jessica's booking was moved from next Friday. Strict accounting categorizes this as shifted appointment volume, NOT net-new incremental revenue.
            </div>
          )}

          {cancellationRecoveryChoice === 'standby_vip' && (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              💰 <strong>True Incremental Recovery ($220.00):</strong> Gigi had no prior booking. This fill successfully protected studio revenue and created 100% net-new revenue!
            </div>
          )}
        </Card>
      </section>

      {/* F083: Two-Way Calendar Sync Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Two-Way Google & Outlook Calendar Sync (F083)
              </h3>
            </div>
            <Badge variant="sage">Ping-Pong Loop Defense • Deletion Guard</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Synchronize personal Google or Outlook schedules with Posie. Blocks client bookings during personal busy times while strictly defending paid salon appointments from silent external deletions.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ fontSize: '0.88rem' }}>Connected Account: maya.stylist@gmail.com (Google Calendar)</strong>
              <Badge variant="sage">Active Two-Way Sync</Badge>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Target: Chloe Bennett ($140 Paid Balayage Appointment at 2:00 PM)
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCalendarSyncAction('loop_prevented')}
            >
              Test Sync Loop Defense (Ingest Posie Reflection)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCalendarSyncAction('silent_delete_blocked')}
            >
              Attempt Deleting Paid Appointment in Google Calendar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCalendarSyncAction('idle')}
            >
              Reset
            </Button>
          </div>

          {calendarSyncAction === 'loop_prevented' && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              🛡️ <strong>Sync Ping-Pong Loop Suppressed:</strong> Incoming Google event was identified as a Posie-originated reflection (prefix <code>posie_sync_...</code>). Ignored automatically to prevent duplicate echo loops.
            </div>
          )}

          {calendarSyncAction === 'silent_delete_blocked' && (
            <div style={{ marginTop: '12px', background: '#FFF7F5', border: '1px solid #C67D6E', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#B36B5C' }}>
              🚫 <strong>Silent Deletion Blocked:</strong> An external calendar deletion request was received for Chloe Bennett's 2:00 PM booking. Deletion was rejected because this appointment is financial/paid. Cancellations must be performed within Posie to enforce cancellation policy terms and refund logic.
            </div>
          )}
        </Card>
      </section>

      {/* F084: Deposits and Preauthorizations Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Coins size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Deposits & Preauthorizations (F084 / Document D05)
              </h3>
            </div>
            <Badge variant="sage">Policy Snapshot • 7-Day Auth Expiry Defense</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Collect booking deposits and credit card preauthorizations with transparent cancellation rules. Document D05 permanently attaches the agreed policy version to the reservation.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                  Hailey's Custom Bespoke Facial ($200.00 Total)
                </strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  $50.00 Captured Deposit Paid • $150.00 Balance Due at Visit
                </div>
              </div>
              <Badge variant="sage">Policy D05: 24h Cutoff</Badge>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: '4px 0 0' }}>
              Cancellations with ≥24 hours notice receive a 100% refund. Cancellations within 24 hours forfeit deposit.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant={depositCancelScenario === 'timely' ? 'primary' : 'outline'}
              onClick={() => setDepositCancelScenario('timely')}
            >
              Simulate 48h Notice Cancellation (Full Refund)
            </Button>
            <Button
              size="sm"
              variant={depositCancelScenario === 'late' ? 'primary' : 'outline'}
              onClick={() => setDepositCancelScenario('late')}
            >
              Simulate 4h Notice Cancellation (Deposit Forfeited)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setDepositCancelScenario('none')}
            >
              Reset
            </Button>
          </div>

          {depositCancelScenario === 'timely' && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Timely Cancellation Honored:</strong> 48 hours notice provided (policy requirement: 24h). Full $50.00 deposit automatically refunded to client's card.
            </div>
          )}

          {depositCancelScenario === 'late' && (
            <div style={{ marginTop: '12px', background: '#FFF7F5', border: '1px solid #C67D6E', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#B36B5C' }}>
              ⚠️ <strong>Late Notice Forfeit:</strong> Only 4 hours notice provided before appointment. Full $50.00 deposit retained as late cancellation compensation per Document D05 terms.
            </div>
          )}
        </Card>
      </section>

      {/* F085: Unified Checkout & Split Tender Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Receipt size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Unified Checkout & Split Tender (F085 / D14, D15)
              </h3>
            </div>
            <Badge variant="sage">Services + Retail + Split Tenders + Zero-Balance Tip</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Combine services, taxable retail products, and staff tips in one itemized ticket. Split payment seamlessly across gift cards, cash, and client-phone hosted checkout links.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                Selena Gomez — Ticket #TKT-8902
              </strong>
              <Badge variant={splitTenderStage === 'fully_paid' ? 'sage' : 'muted'}>
                {splitTenderStage === 'fully_paid' ? 'Fully Paid' : splitTenderStage === 'gift_applied' ? 'Partially Paid' : 'Open Ticket'}
              </Badge>
            </div>

            <div style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Hydra-Dew Glass Glow Facial</span>
                <strong>$120.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Hyaluronic Botanical Mist (Retail Product)</span>
                <strong>$40.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                <span>Sales Tax (8.875% on retail)</span>
                <span>$3.55</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6A7D6A' }}>
                <span>Gratuity for Maya Lin</span>
                <span>+$25.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #DDD', marginTop: '6px', paddingTop: '6px', fontWeight: 700 }}>
                <span>Gross Total Due</span>
                <span>$188.55</span>
              </div>
            </div>

            <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px', marginTop: '10px', fontSize: '0.8rem' }}>
              <div><strong>Paid to Date:</strong> ${splitTenderStage === 'fully_paid' ? '188.55' : splitTenderStage === 'gift_applied' ? '50.00' : '0.00'}</div>
              <div><strong>Remaining Balance:</strong> ${splitTenderStage === 'fully_paid' ? '0.00' : splitTenderStage === 'gift_applied' ? '138.55' : '188.55'}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {splitTenderStage === 'initial' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setSplitTenderStage('gift_applied')}
              >
                Apply $50.00 Birthday Gift Card
              </Button>
            )}

            {splitTenderStage === 'gift_applied' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setSplitTenderStage('fully_paid')}
              >
                Client Pays Remaining $138.55 via Hosted Phone Link
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => setSplitTenderStage('initial')}
            >
              Reset Checkout Demo
            </Button>
          </div>

          {splitTenderStage === 'fully_paid' && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Ticket Settled (Document D15 Receipt):</strong> Tender 1: $50.00 Gift Card (ID #gift_bday_50) • Tender 2: $138.55 Credit Card (Hosted client self-checkout). Staff never touched the customer's credit card.
            </div>
          )}
        </Card>
      </section>

      {/* F086: Tap to Pay and Certified Terminals Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Tap to Pay & Certified Terminals (F086)
              </h3>
            </div>
            <Badge variant="sage">Smart Terminals • Network Drop Recovery</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Integrate certified countertop smart terminals and Tap to Pay on iPhone. Invariant: If a network drop or reader timeout occurs mid-transaction, Posie resolves the actual gateway state before allowing a retry, preventing duplicate charges.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.88rem' }}>Front Desk WisePOS E Terminal</strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Serial: WP-9921-X • Battery: 92% • Firmware: v2.4.1
                </div>
              </div>
              <Badge variant="sage">Online & Paired</Badge>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTerminalSessionState('interrupted')}
            >
              Simulate Wi-Fi Drop Mid-Tap
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={terminalSessionState !== 'interrupted'}
              onClick={() => setTerminalSessionState('recovered_success')}
            >
              Gateway Confirms Charge Succeeded
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={terminalSessionState !== 'interrupted'}
              onClick={() => setTerminalSessionState('recovered_safe_retry')}
            >
              Gateway Confirms Charge Failed
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTerminalSessionState('idle')}
            >
              Reset Terminal Demo
            </Button>
          </div>

          {terminalSessionState === 'interrupted' && (
            <div style={{ marginTop: '12px', background: '#FFF9F2', border: '1px solid #E2A76F', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#8A531C' }}>
              ⏳ <strong>Interrupted Processing Detected:</strong> Wi-Fi dropped while reader was communicating with card chip. Retrying payment is temporarily locked while querying gateway to prevent double-charging customer.
            </div>
          )}

          {terminalSessionState === 'recovered_success' && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              🛡️ <strong>Double-Charge Prevented:</strong> Gateway verified the $120.00 charge actually executed (Charge ID <code>ch_recovered_8899</code>). Receipt generated cleanly without re-swiping the customer's card!
            </div>
          )}

          {terminalSessionState === 'recovered_safe_retry' && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Safe to Retry:</strong> Gateway verified zero charges were created. Terminal reader safely unlocked for cashier to re-tap card.
            </div>
          )}
        </Card>
      </section>

      {/* F087: Refunds & Exchanges Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RotateCcw size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Refunds, Exchanges & Inventory Restock (F087 / D15)
              </h3>
            </div>
            <Badge variant="sage">Reconciled Balances • Restock Ledger</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Process full or partial refunds with immutable reason histories. Invariant: Refund states reconcile against the original charge to strictly prevent over-refunding, and retail product returns automatically manifest back into the inventory ledger.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                Kendall Jenner — Sale #TKT-8811 ($180.00 Original Charge)
              </strong>
              <Badge variant="sage">
                {refundStage === 'initial' ? '$180.00 Eligible Balance' : '$120.00 Eligible Balance'}
              </Badge>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              <div>• Bespoke Facial: $120.00 (Service)</div>
              <div>• Nourishing Barrier Cream: $60.00 (Retail Product)</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {refundStage === 'initial' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setRefundStage('refunded_cream')}
              >
                Refund $60.00 Cream & Restock Unopened Bottle to Retail Inventory
              </Button>
            )}

            {refundStage === 'refunded_cream' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setRefundStage('over_refund_blocked')}
              >
                Attempt Excess Refund ($150.00 on $120.00 Balance)
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => setRefundStage('initial')}
            >
              Reset Refund Demo
            </Button>
          </div>

          {refundStage === 'refunded_cream' && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Partial Refund Executed (Document D15):</strong> $60.00 refunded to card under reason "medical_contraindication". Retail inventory manifest updated (+1 unit Barrier Cream returned to stock). Remaining ticket refund cap: $120.00.
            </div>
          )}

          {refundStage === 'over_refund_blocked' && (
            <div style={{ marginTop: '12px', background: '#FFF7F5', border: '1px solid #C67D6E', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#B36B5C' }}>
              🚫 <strong>Over-Refund Blocked:</strong> Cannot refund $150.00. Only $120.00 is remaining after prior retail refund of $60.00. Ledger prevents staff from refunding more than the client originally paid.
            </div>
          )}
        </Card>
      </section>

      {/* F088: No-Show Collection Workflow Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserX size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                No-Show Collection & Fee Recovery (F088 / D05)
              </h3>
            </div>
            <Badge variant="sage">Truth-in-Vaulting • Gentle Recovery Links</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Apply the agreed cancellation policy when a client misses an appointment. Invariant: Saved cards are never represented as 100% guaranteed funds; if a card declines, Posie initiates honest recovery links and fair manager waivers.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: '#B36B5C' }}>
                  Bella Hadid — Missed Appointment (Hydra-Dew Facial)
                </strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Agreed Document D05 Terms: $50.00 Stipulated No-Show Fee
                </div>
              </div>
              <Badge variant={noShowCaseState === 'declined_link_sent' ? 'rose' : noShowCaseState === 'manager_waived' ? 'sage' : 'muted'}>
                {noShowCaseState === 'declined_link_sent' ? 'Card Declined • Recovery Sent' : noShowCaseState === 'manager_waived' ? 'Fee Waived as Courtesy' : 'Eligible for Charge'}
              </Badge>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setNoShowCaseState('declined_link_sent')}
            >
              Simulate Card-on-File Decline (Insufficient Funds)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setNoShowCaseState('manager_waived')}
            >
              Manager Courtesy Waiver (Emergency Call)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setNoShowCaseState('idle')}
            >
              Reset
            </Button>
          </div>

          {noShowCaseState === 'declined_link_sent' && (
            <div style={{ marginTop: '12px', background: '#FFF9F2', border: '1px solid #E2A76F', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#8A531C' }}>
              📱 <strong>Honest Decline Handling:</strong> Client's card declined with code <code>insufficient_funds</code>. Rather than leaving the owner in the dark, Posie texted Bella a gentle self-service settlement link (<code>posie.com/settle/rec_92a1</code>) and flagged her profile to settle before rebooking.
            </div>
          )}

          {noShowCaseState === 'manager_waived' && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Manager Waiver Recorded:</strong> Maya Lin waived the fee under audit reason: "Client called with documented sudden hospital admission." Client profile restrictions immediately lifted.
            </div>
          )}
        </Card>
      </section>

      {/* F089: Dispute Evidence Workspace Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Dispute & Chargeback Evidence Workspace (F089 / D05, D15, D18)
              </h3>
            </div>
            <Badge variant="sage">5-Point Defense Packet • Deadline Countdown</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            When a client disputes a bank charge, Posie automatically compiles signed intake forms, cancellation policies, SOAP notes, and receipts into a bulletproof defense packet.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: '#B36B5C' }}>
                  Bank Chargeback Alert: $140.00 Disputed (Olivia Rodrigo)
                </strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Reason Category: Service not recognized / unprovided
                </div>
              </div>
              <Badge variant={disputeUrgencyMode === 'urgent' ? 'rose' : 'sage'}>
                {disputeUrgencyMode === 'urgent' ? 'URGENT: 24h Remaining' : '3 Days Remaining'}
              </Badge>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant={disputePacketAssembled ? 'outline' : 'primary'}
              onClick={() => setDisputePacketAssembled(true)}
            >
              Assemble 5-Point Cryptographic Defense Packet
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setDisputeUrgencyMode(disputeUrgencyMode === 'standard' ? 'urgent' : 'standard')}
            >
              Toggle 24h Deadline Urgency
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setDisputePacketAssembled(false); setDisputeUrgencyMode('standard'); }}
            >
              Reset
            </Button>
          </div>

          {disputePacketAssembled && (
            <div style={{ marginTop: '14px', background: '#F9FAF8', border: '1px solid #738A73', padding: '14px', borderRadius: '8px', fontSize: '0.82rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: '8px' }}>
                ✓ Audit-Ready Dispute Bundle Generated:
              </div>
              <ul style={{ margin: '0 0 10px', paddingLeft: '18px', color: 'var(--color-text)', lineHeight: '1.6' }}>
                <li><strong>1. Policy Acceptance:</strong> Document D05 agreed Nov 1 (Client IP logged).</li>
                <li><strong>2. Signed Consent:</strong> Aesthetic Consent Form (SHA-256: <code>7f83...069</code>).</li>
                <li><strong>3. Service Delivery:</strong> Specialist Chloe Bennett SOAP chart signed Nov 15 at 3:05 PM.</li>
                <li><strong>4. Document D15 Receipt:</strong> Visa 4242 terminal chip authorization #rcpt_8821.</li>
                <li><strong>5. SMS Communication Log:</strong> Two-way confirmation reply ("C") verified Nov 14.</li>
              </ul>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', borderTop: '1px solid #DDD', paddingTop: '6px' }}>
                ⚖️ <strong>Truth-in-Defense Assurance:</strong> Bundle compiled with cryptographic verification. Submission complies with Visa/Mastercard rules; issuing bank retains final arbitration ruling.
              </div>
            </div>
          )}
        </Card>
      </section>

      {/* F090: Payout and Hold Tracker Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wallet size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Payout & Risk Hold Tracker (F090)
              </h3>
            </div>
            <Badge variant="sage">Available vs. Held Funds • ACH Settlement Verification</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Transparent financial transparency explaining pending, cleared, and reserved funds. Invariant: Predicted payout arrival dates are strictly distinguished from bank-confirmed settlements.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '14px' }}>
            <div style={{ background: '#FAFAFA', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Available for Payout</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)' }}>$1,250.00</div>
              <span style={{ fontSize: '0.72rem', color: '#6A7D6A' }}>Cleared & ready to transfer</span>
            </div>
            <div style={{ background: '#FAFAFA', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Pending Batch (1-Day)</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>$450.00</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Card batch processing</span>
            </div>
            <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.74rem', color: '#B36B5C' }}>Reserved Risk Hold</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#B36B5C' }}>$500.00</div>
              <span style={{ fontSize: '0.72rem', color: '#B36B5C' }}>Owner ID Verification required</span>
            </div>
          </div>

          <div style={{ border: '1px solid #E8E5E0', padding: '14px', borderRadius: '8px', background: '#FFF', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Batch #PO-8819 ($1,250.00 to Chase Bank ...9012)</strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  {payoutConfirmedAch ? 'Confirmed Settled • ACH Trace: ACH-20261122-889912' : 'Status: Predicted in Transit (Est. Arrival: Nov 22)'}
                </div>
              </div>
              <Badge variant={payoutConfirmedAch ? 'sage' : 'muted'}>
                {payoutConfirmedAch ? 'Confirmed Bank Settlement' : 'Predicted in Transit'}
              </Badge>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant={payoutConfirmedAch ? 'outline' : 'primary'}
              onClick={() => setPayoutConfirmedAch(!payoutConfirmedAch)}
            >
              {payoutConfirmedAch ? 'Revert to In-Transit State' : 'Confirm Bank ACH Settlement (#ACH-20261122-889912)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F091: Gift Card Liability Ledger Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Gift size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Gift Card Liability Ledger (F091 / Document D17)
              </h3>
            </div>
            <Badge variant="sage">GAAP Deferred Liability • Live Balance Lookup</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Sell and redeem stored value with strict GAAP accounting. Invariant: Selling a gift card records an unearned liability, never counting face value as earned service revenue until actually redeemed!
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                  Certificate: GIFT-****-4242 (Purchased by Gwyneth Paltrow)
                </strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Recipient: Dakota Johnson • Valid 5 Years
                </div>
              </div>
              <Badge variant="sage">
                ${(150 - giftCardRedeemedAmount).toFixed(2)} Liability Remaining
              </Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Account 2100 (Unearned Liability)</span>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>${(150 - giftCardRedeemedAmount).toFixed(2)}</div>
              </div>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Account 4000 (Earned Service Revenue)</span>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-primary)' }}>${giftCardRedeemedAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {giftCardRedeemedAmount === 0 ? (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setGiftCardRedeemedAmount(60)}
              >
                Dakota Redeems $60.00 for Express Facial
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setGiftCardRedeemedAmount(0)}
              >
                Reset Gift Card Balance ($150.00)
              </Button>
            )}
          </div>

          {giftCardRedeemedAmount > 0 && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Redemption Movement Recorded:</strong> $60.00 deducted from Deferred Liability and recognized as Earned Revenue on Ticket #TKT-DAKOTA-1. Masked card balance updated to $90.00.
            </div>
          )}
        </Card>
      </section>

      {/* F092: Package & Series Entitlements Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Package & Series Entitlements (F092 / D13, D16)
              </h3>
            </div>
            <Badge variant="sage">Session Counter • Partial Refund Revocation</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Manage multi-session treatment packages. Invariant: A refund cannot leave consumed sessions available again; refunding unconsumed sessions revokes remaining units and locks consumed visits.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                  Zendaya — HydraFacial 5-Series Radiance Pass ($500.00 Total)
                </strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Unit Value: $100.00 per session • Purchased Nov 1
                </div>
              </div>
              <Badge variant={packageRefundState === 'partially_refunded' ? 'rose' : 'sage'}>
                {packageRefundState === 'partially_refunded' ? 'Partially Refunded & Closed' : 'Active Pass (3 Sessions Remaining)'}
              </Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', textAlign: 'center', fontSize: '0.78rem', marginTop: '10px' }}>
              <div style={{ background: '#E8ECE6', border: '1px solid #A2B59F', padding: '8px', borderRadius: '4px' }}>
                Session 1<br /><strong>Used (Nov 5)</strong>
              </div>
              <div style={{ background: '#E8ECE6', border: '1px solid #A2B59F', padding: '8px', borderRadius: '4px' }}>
                Session 2<br /><strong>Used (Nov 12)</strong>
              </div>
              <div style={{ background: packageRefundState === 'partially_refunded' ? '#FFF7F5' : '#FFF', border: packageRefundState === 'partially_refunded' ? '1px solid #C67D6E' : '1px solid #E8E5E0', padding: '8px', borderRadius: '4px' }}>
                Session 3<br /><strong>{packageRefundState === 'partially_refunded' ? 'Refunded' : 'Available'}</strong>
              </div>
              <div style={{ background: packageRefundState === 'partially_refunded' ? '#FFF7F5' : '#FFF', border: packageRefundState === 'partially_refunded' ? '1px solid #C67D6E' : '1px solid #E8E5E0', padding: '8px', borderRadius: '4px' }}>
                Session 4<br /><strong>{packageRefundState === 'partially_refunded' ? 'Refunded' : 'Available'}</strong>
              </div>
              <div style={{ background: packageRefundState === 'partially_refunded' ? '#FFF7F5' : '#FFF', border: packageRefundState === 'partially_refunded' ? '1px solid #C67D6E' : '1px solid #E8E5E0', padding: '8px', borderRadius: '4px' }}>
                Session 5<br /><strong>{packageRefundState === 'partially_refunded' ? 'Refunded' : 'Available'}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {packageRefundState === 'active_2_used' ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPackageRefundState('partially_refunded')}
              >
                Client Relocating: Refund 3 Remaining Sessions ($300.00)
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPackageRefundState('active_2_used')}
              >
                Reset Package Series Demo
              </Button>
            )}
          </div>

          {packageRefundState === 'partially_refunded' && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Partial Package Refund Reconciled:</strong> $300.00 refunded for the 3 unused sessions. Invariant enforced: Remaining units revoked to 0, pass marked closed, and the 2 previously consumed sessions remain permanently recognized with zero negative balance.
            </div>
          )}
        </Card>
      </section>

      {/* F093: Membership Lifecycle Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartPulse size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Membership Lifecycle & Transparent Cancellation Preview (F093 / Document D16)
              </h3>
            </div>
            <Badge variant="sage">Document D16 Terms • Banked Credit Retention • Grace Period Dunning</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Subscribers never forfeit earned credits in surprise cancellation traps. Clear 60-day pause protections and transparent pre-cancellation previews show precisely which credits remain redeemable before terminating.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '0.94rem', color: 'var(--color-primary)' }}>
                  Zendaya — Radiance VIP Club ($75.00 / month)
                </strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Subscription ID: SUB-9941 • Renews Monthly on the 15th
                </div>
              </div>
              <Badge variant={membershipStatus === 'active' ? 'sage' : membershipStatus === 'paused' ? 'muted' : 'rose'}>
                {membershipStatus === 'active' ? 'Active Subscription' : membershipStatus === 'paused' ? 'Paused (Resumes Jan 15)' : 'Cancellation Pending'}
              </Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.82rem', marginTop: '10px' }}>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Banked Facial Credits</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>{bankedCredits} Sessions</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>$225.00 accrued retail value</div>
              </div>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Retail Discount Perk</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>15% Off In-Store</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Applies to all boutique products</div>
              </div>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Next Scheduled Charge</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>{membershipStatus === 'paused' ? 'Paused ($0)' : '$75.00 (Nov 15)'}</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Auto-retry dunning with 7-day grace</div>
              </div>
            </div>
          </div>

          {membershipStatus === 'cancelled_preview' && (
            <div style={{ border: '1px solid #E5C3B8', background: '#FFF9F7', padding: '14px', borderRadius: '8px', marginBottom: '14px' }}>
              <strong style={{ fontSize: '0.88rem', color: '#8F4A3E', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <AlertTriangle size={16} /> Transparent Cancellation Preview (Document D16 Standard)
              </strong>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: '#555', lineHeight: '1.5' }}>
                <li><strong>Banked Credits Protected:</strong> Your {bankedCredits} unused credits ($225.00 value) remain 100% redeemable for 90 days after cancellation.</li>
                <li><strong>Charges Avoided:</strong> You will avoid $150.00 in scheduled billing over the next 60 days.</li>
                <li><strong>Zero Surprise Penalties:</strong> No cancellation fee or lock-in fee will ever be applied to your card.</li>
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {membershipStatus === 'active' && (
              <>
                <Button size="sm" variant="outline" onClick={() => setMembershipStatus('paused')}>
                  Pause Membership (60 Days)
                </Button>
                <Button size="sm" variant="outline" onClick={() => setMembershipStatus('cancelled_preview')}>
                  Preview Cancellation Impact
                </Button>
              </>
            )}
            {membershipStatus === 'paused' && (
              <Button size="sm" variant="outline" onClick={() => setMembershipStatus('active')}>
                Resume Active Billing ($75/mo)
              </Button>
            )}
            {membershipStatus === 'cancelled_preview' && (
              <>
                <Button size="sm" variant="primary" onClick={() => setMembershipStatus('cancelled')}>
                  Confirm Cancellation (Retain 3 Credits)
                </Button>
                <Button size="sm" variant="outline" onClick={() => setMembershipStatus('active')}>
                  Keep My Membership
                </Button>
              </>
            )}
            {membershipStatus === 'cancelled' && (
              <Button size="sm" variant="outline" onClick={() => setMembershipStatus('active')}>
                Re-enroll in Radiance VIP Club
              </Button>
            )}
          </div>

          {membershipStatus === 'cancelled' && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Cancellation Finalized:</strong> Future billing stopped immediately. Invariant enforced: Client retains {bankedCredits} banked credits with an explicit 90-day redemption grace period per Document D16 terms.
            </div>
          )}
        </Card>
      </section>

      {/* F094: Tipping Across Checkout Types & Provider Allocation Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Coins size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Multi-Provider Tip Allocation & Safe Refund Choices (F094)
              </h3>
            </div>
            <Badge variant="sage">Zero-Balance Voucher Tipping • Specialist/Assistant Split • 3-Way Refund Policy</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Supports tipping on zero-balance package vouchers, custom percentage splits between lead specialists and assistants, and explicit staff protection during service refund decisions.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                  Split Service Visit: Balayage + Toner & Silk Blowout ($240.00 Base)
                </strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Total Gratuity Added: $40.00 (Customer Paid via Card)
                </div>
              </div>
              <Badge variant="muted">Split Tender Tip Pool</Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem' }}>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '6px' }}>
                <strong style={{ color: 'var(--color-primary)' }}>Maya — Lead Colorist (75% Split)</strong>
                <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>Service: Balayage Highlights ($180.00)</div>
                <div style={{ marginTop: '8px', fontSize: '1rem', fontWeight: 'bold', color: '#2B5329' }}>
                  Tip Share: $30.00
                </div>
              </div>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '6px' }}>
                <strong style={{ color: 'var(--color-primary)' }}>Jen — Color Assistant (25% Split)</strong>
                <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>Service: Toner & Blowout ($60.00)</div>
                <div style={{ marginTop: '8px', fontSize: '1rem', fontWeight: 'bold', color: '#2B5329' }}>
                  Tip Share: $10.00
                </div>
              </div>
            </div>
          </div>

          <div style={{ border: '1px solid #E5E0D8', padding: '14px', borderRadius: '8px', background: '#FFFDF9', marginBottom: '14px' }}>
            <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
              Service Redo/Refund Workflow: How Should the $40.00 Gratuity Be Handled?
            </strong>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button
                size="sm"
                variant={tipRefundChoice === 'retain_staff' ? 'primary' : 'outline'}
                onClick={() => setTipRefundChoice('retain_staff')}
              >
                1. Retain Tip for Staff (Refund $240 Service Only)
              </Button>
              <Button
                size="sm"
                variant={tipRefundChoice === 'clawback_staff' ? 'primary' : 'outline'}
                onClick={() => setTipRefundChoice('clawback_staff')}
              >
                2. Clawback from Payroll (Refund $280 Total to Client)
              </Button>
              <Button
                size="sm"
                variant={tipRefundChoice === 'salon_absorbed' ? 'primary' : 'outline'}
                onClick={() => setTipRefundChoice('salon_absorbed')}
              >
                3. Salon Absorbs as Goodwill (Staff Keeps $40, Salon Refunds $280)
              </Button>
            </div>

            {tipRefundChoice === 'retain_staff' && (
              <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#3A523A', background: '#F4F7F4', padding: '8px 12px', borderRadius: '6px' }}>
                ✓ <strong>Staff Protected:</strong> Client receives $240.00 service refund. Maya ($30) and Jen ($10) keep their earned tips for their dedicated time.
              </div>
            )}
            {tipRefundChoice === 'clawback_staff' && (
              <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#8F4A3E', background: '#FFF9F7', padding: '8px 12px', borderRadius: '6px' }}>
                ⚠ <strong>Payroll Adjustment:</strong> Client receives $280.00 total refund. $30.00 clawback debited from Maya and $10.00 clawback debited from Jen's next payroll batch.
              </div>
            )}
            {tipRefundChoice === 'salon_absorbed' && (
              <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#445D78', background: '#F0F4F8', padding: '8px 12px', borderRadius: '6px' }}>
                ★ <strong>Salon Goodwill Resolution:</strong> Client receives $280.00 refund. Salon absorbs the $40.00 cost under operational customer retention; Maya and Jen retain their full tips.
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* F095: Loyalty Balance Ledger Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Loyalty Balance Ledger & Rewards (F095)
              </h3>
            </div>
            <Badge variant="sage">Append-Only Ledger • Tier Elevation • Anti-Retroactive Guarantee</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Track client rewards across services and retail purchases. Point accrual rules are strictly version-controlled so retroactive rule edits never silently diminish previously earned points.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <strong style={{ fontSize: '0.94rem', color: 'var(--color-primary)' }}>
                  Zendaya — Posie Radiance Rewards
                </strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Current Tier: <strong>{loyaltyTier}</strong> (Earn Rate: 1 pt per $1.00 spent)
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', display: 'block' }}>Available Balance</span>
                <strong style={{ fontSize: '1.4rem', color: 'var(--color-primary)' }}>{loyaltyPoints} pts</strong>
              </div>
            </div>

            <div style={{ background: '#EAE6DF', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
              <div
                style={{
                  width: `${Math.min(100, (loyaltyPoints / 500) * 100)}%`,
                  background: loyaltyPoints >= 500 ? '#738A73' : '#C4A482',
                  height: '100%',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
              <span>Silver Radiance (0 - 499 pts)</span>
              <span>{loyaltyPoints >= 500 ? 'Gold VIP Unlocked (500+ pts) ★' : `${500 - loyaltyPoints} pts to Gold VIP`}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const next = loyaltyPoints + 140;
                setLoyaltyPoints(next);
                if (next >= 500) setLoyaltyTier('Gold VIP');
              }}
            >
              Checkout Visit ($100 Facial + $40 Serum = +140 pts)
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={loyaltyPoints < 200}
              onClick={() => {
                setLoyaltyPoints(Math.max(0, loyaltyPoints - 200));
              }}
            >
              Redeem 200 pts ($15 Off Ticket)
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={loyaltyClawbackTriggered}
              onClick={() => {
                setLoyaltyPoints(Math.max(0, loyaltyPoints - 40));
                setLoyaltyClawbackTriggered(true);
              }}
            >
              Return Serum Product (-40 pts Clawback)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setLoyaltyPoints(450);
                setLoyaltyTier('Silver Radiance');
                setLoyaltyClawbackTriggered(false);
              }}
            >
              Reset Points Ledger
            </Button>
          </div>

          <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
            ✓ <strong>Immutable Rule Guard:</strong> Rule changes (e.g. promotional 2x multipliers or standard rule adjustments) are tagged with unique rule versions. Previously banked points remain 100% immune from silent retroactive recalculation.
          </div>
        </Card>
      </section>

      {/* F096: Online Retail Storefront & Unified Stock Ledger Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Online Retail Storefront & Unified Stock Ledger (F096)
              </h3>
            </div>
            <Badge variant="sage">Unified Physical Stock • 15-Min Cart Hold • Pickup PIN & Carrier Shipping</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Sell boutique skincare and retail items online and in-person from one unified stock ledger. Features timed cart reservations to prevent overselling and clean pickup vs. shipping options.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '0.94rem', color: 'var(--color-primary)' }}>
                  Barrier Gentle Cleanser (SKU: CLN-001)
                </strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Unit Price: $32.00 • In-Person POS & Online Storefront Synced
                </div>
              </div>
              <Badge variant={storeOrderStatus === 'cancelled_restocked' ? 'muted' : storeOrderStatus === 'ready_for_pickup' ? 'sage' : 'muted'}>
                {storeOrderStatus === 'browsing'
                  ? 'In Stock'
                  : storeOrderStatus === 'reserved'
                  ? 'Cart Hold (Expires 15m)'
                  : storeOrderStatus === 'ready_for_pickup'
                  ? 'Ready for In-Store Pickup'
                  : storeOrderStatus === 'paid_processing'
                  ? 'Paid & Processing'
                  : 'Order Cancelled & Restocked'}
              </Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.82rem', marginTop: '10px' }}>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Available Physical Stock</span>
                <strong style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>{storeStockCleanser} Units</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Ready for POS walk-in or online cart</div>
              </div>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Reserved Cart Stock</span>
                <strong style={{ fontSize: '1.2rem', color: storeReservedCleanser > 0 ? '#B36B5C' : 'var(--color-primary)' }}>
                  {storeReservedCleanser} Units
                </strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Protected against double-purchase</div>
              </div>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Fulfillment Method</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                  {storeFulfillmentMethod === 'pickup' ? 'Studio Pickup (Free)' : 'Ground Shipping ($5.95)'}
                </strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {storeFulfillmentMethod === 'pickup' ? '4-Digit Claim PIN required' : 'Free delivery over $75'}
                </div>
              </div>
            </div>
          </div>

          {storeOrderStatus === 'ready_for_pickup' && (
            <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px 16px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#2B5329' }}>Order #ORD-77291 Confirmed: Ready for Studio Pickup</strong>
                  <div style={{ color: '#4A6B48', marginTop: '2px' }}>Show this PIN at the front desk when picking up your cleanser.</div>
                </div>
                <div style={{ background: '#FFF', border: '2px solid #738A73', padding: '6px 14px', borderRadius: '6px', fontWeight: 'bold', fontSize: '1.2rem', color: '#2B5329', letterSpacing: '2px' }}>
                  PIN: 5912
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {storeOrderStatus === 'browsing' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setStoreStockCleanser(storeStockCleanser - 1);
                    setStoreReservedCleanser(storeReservedCleanser + 1);
                    setStoreOrderStatus('reserved');
                  }}
                >
                  Hold 1 Unit in Online Cart (15-Min Timer)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setStoreFulfillmentMethod(storeFulfillmentMethod === 'pickup' ? 'shipping' : 'pickup')}
                >
                  Toggle Fulfillment: {storeFulfillmentMethod === 'pickup' ? 'Switch to Shipping' : 'Switch to Studio Pickup'}
                </Button>
              </>
            )}

            {storeOrderStatus === 'reserved' && (
              <>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setStoreReservedCleanser(0);
                    setStoreOrderStatus(storeFulfillmentMethod === 'pickup' ? 'ready_for_pickup' : 'paid_processing');
                  }}
                >
                  Simulate Online Checkout ($34.64 Total)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Release expired or cancelled reservation
                    setStoreStockCleanser(storeStockCleanser + 1);
                    setStoreReservedCleanser(0);
                    setStoreOrderStatus('browsing');
                  }}
                >
                  Release Cart Hold (Return to General Stock)
                </Button>
              </>
            )}

            {(storeOrderStatus === 'ready_for_pickup' || storeOrderStatus === 'paid_processing') && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setStoreStockCleanser(storeStockCleanser + 1);
                  setStoreOrderStatus('cancelled_restocked');
                }}
              >
                Client Cancellation: Refund & Restock Cleanser (+1 Stock)
              </Button>
            )}

            {storeOrderStatus === 'cancelled_restocked' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setStoreStockCleanser(10);
                  setStoreReservedCleanser(0);
                  setStoreOrderStatus('browsing');
                }}
              >
                Reset Storefront Demo
              </Button>
            )}
          </div>

          <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
            ✓ <strong>Unified Ledger Defense:</strong> Online cart holds and completed sales draw from the exact same physical stock ledger as in-studio POS transactions, preventing accidental overselling of high-demand retail items.
          </div>
        </Card>
      </section>

      {/* F097: Commission Calculation Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Commission Calculation & Staff Earnings Statements (F097 / Document D20)
              </h3>
            </div>
            <Badge variant="sage">Tiered Rates • 100% Tip Pass-Through • Non-Statutory D20 Statement</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Calculates tiered service commissions and retail product percentages. Approved payroll statements are permanently locked against edits; subsequent client refunds generate transparent forward adjustments in the next open pay period.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '0.94rem', color: 'var(--color-primary)' }}>
                  Sophia Loren — Senior Esthetician (Period: Oct 16 – Oct 31, 2026)
                </strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Statement ID: STMT-OCT-2026-01 • Rule: Tier 1 (45%), Tier 2 (55% over $1k), Retail (10%)
                </div>
              </div>
              <Badge variant={commissionStatementStatus === 'manager_approved' ? 'sage' : 'muted'}>
                {commissionStatementStatus === 'manager_approved' ? 'Manager Approved & Locked' : 'Open Period Live Estimate'}
              </Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.82rem', marginTop: '10px' }}>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Service Commission</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>$135.00</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>45% of $300.00 service gross</div>
              </div>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Retail Commission</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>$5.00</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>10% of $50.00 retail products</div>
              </div>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Gratuities (100% Pass)</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>$60.00</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Passed directly without salon cuts</div>
              </div>
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Net Earnings</span>
                <strong style={{ fontSize: '1.1rem', color: '#2B5329' }}>
                  {hasForwardAdjustment ? '$146.00' : '$200.00'}
                </strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {hasForwardAdjustment ? 'Includes -$54.00 forward clawback' : 'Gross payable before statutory taxes'}
                </div>
              </div>
            </div>
          </div>

          {hasForwardAdjustment && (
            <div style={{ border: '1px solid #E5C3B8', background: '#FFF9F7', padding: '12px 16px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.82rem' }}>
              <strong style={{ color: '#8F4A3E', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <AlertTriangle size={16} /> Prior-Period Forward Adjustment Linked (Document D20 Standard)
              </strong>
              <div style={{ color: '#555', lineHeight: '1.5' }}>
                Client requested redo refund on HydraFacial ($120.00 service). <strong>Approved statement STMT-OCT-2026-01 was NOT rewritten.</strong> Instead, a -$54.00 commission adjustment was cleanly attached to the next open period (PAY-2026-11-A).
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {commissionStatementStatus === 'estimated' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setCommissionStatementStatus('manager_approved')}
              >
                Manager Sign & Lock Statement (Audrey, Director)
              </Button>
            )}

            {commissionStatementStatus === 'manager_approved' && !hasForwardAdjustment && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setHasForwardAdjustment(true)}
              >
                Simulate Post-Pay Client Refund: Apply Forward Adjustment (-$54.00)
              </Button>
            )}

            {(commissionStatementStatus === 'manager_approved' || hasForwardAdjustment) && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setCommissionStatementStatus('estimated');
                  setHasForwardAdjustment(false);
                }}
              >
                Reset Commission Statement Demo
              </Button>
            )}
          </div>

          <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
            ✓ <strong>Payroll Defense Invariant:</strong> Once a pay period statement is approved by management, historical records are immutable. Post-approval refunds generate linked adjustments in subsequent open pay periods.
          </div>
        </Card>
      </section>

      {/* F098: Time Off & Coverage Planning Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarCheck size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Time Off & Client Coverage Planning (F098)
              </h3>
            </div>
            <Badge variant="sage">Commitment Defense • Certified Coverage Matching • Hard Calendar Blocking</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Approve staff absence requests with pre-approval conflict impact reports. Prohibits silent drops or moves of client appointments and requires qualified staff matching or proactive rescheduling outreach.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '0.94rem', color: 'var(--color-primary)' }}>
                  Maya — Lead Esthetician (3-Day Wellness Vacation: Nov 10 – Nov 12)
                </strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Request ID: REQ-PTO-01 • Paid Time Off (PTO)
                </div>
              </div>
              <Badge variant={timeOffStatus === 'approved' ? 'sage' : 'muted'}>
                {timeOffStatus === 'approved' ? 'Approved & Calendar Locked' : 'Pending Owner Review'}
              </Badge>
            </div>

            <div style={{ border: '1px solid #E5E0D8', borderRadius: '6px', padding: '12px', background: '#FFF', marginTop: '10px' }}>
              <strong style={{ fontSize: '0.86rem', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                Conflict Impact Report: 2 Conflicting Bookings ($300.00 Revenue at Risk)
              </strong>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
                <div style={{ border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px', background: timeOffConflict1Resolved ? '#F4F7F4' : '#FFFDF9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>Chloe Bennett — $120.00</strong>
                    <Badge variant={timeOffConflict1Resolved ? 'sage' : 'rose'}>
                      {timeOffConflict1Resolved ? 'Coverage Assigned' : 'Unassigned Conflict'}
                    </Badge>
                  </div>
                  <div style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Service: Hydra-Dew Facial (Nov 10, 2:00 PM)
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    {timeOffConflict1Resolved ? (
                      <span style={{ color: '#2B5329', fontWeight: 'bold' }}>✓ Reassigned to Jen (Licensed Esthetician)</span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setTimeOffConflict1Resolved(true);
                          setTimeOffApprovalBlockedWarning(false);
                        }}
                      >
                        Reassign to Jen (Qualified Coverage)
                      </Button>
                    )}
                  </div>
                </div>

                <div style={{ border: '1px solid #E8E5E0', padding: '10px', borderRadius: '6px', background: timeOffConflict2Resolved ? '#F4F7F4' : '#FFFDF9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>Hailey Bieber — $180.00</strong>
                    <Badge variant={timeOffConflict2Resolved ? 'sage' : 'rose'}>
                      {timeOffConflict2Resolved ? 'Reschedule Queued' : 'Unassigned Conflict'}
                    </Badge>
                  </div>
                  <div style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Service: Chemical Peel (Nov 11, 11:00 AM)
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    {timeOffConflict2Resolved ? (
                      <span style={{ color: '#2B5329', fontWeight: 'bold' }}>✓ Queued for VIP Reschedule Outreach</span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setTimeOffConflict2Resolved(true);
                          setTimeOffApprovalBlockedWarning(false);
                        }}
                      >
                        Queue for Proactive Reschedule Call
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {timeOffApprovalBlockedWarning && (
            <div style={{ border: '1px solid #C67D6E', background: '#FFF7F5', padding: '12px 16px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.84rem', color: '#8F4A3E' }}>
              <strong>⚠ Owner Approval Blocked:</strong> Cannot approve absence request while client appointments are unassigned. Client commitments cannot be silently dropped. Please assign coverage or schedule client outreach before approving.
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {timeOffStatus === 'submitted' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  if (!timeOffConflict1Resolved || !timeOffConflict2Resolved) {
                    setTimeOffApprovalBlockedWarning(true);
                  } else {
                    setTimeOffStatus('approved');
                    setTimeOffApprovalBlockedWarning(false);
                  }
                }}
              >
                Approve Absence Request & Lock Calendar
              </Button>
            )}

            {timeOffStatus === 'approved' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setTimeOffStatus('submitted');
                  setTimeOffConflict1Resolved(false);
                  setTimeOffConflict2Resolved(false);
                  setTimeOffApprovalBlockedWarning(false);
                }}
              >
                Reset Time Off & Coverage Demo
              </Button>
            )}
          </div>

          {timeOffStatus === 'approved' && (
            <div style={{ marginTop: '12px', background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Absence Approved & Calendar Hard-Locked:</strong> All client commitments safely resolved. Maya's schedule is locked against online booking and walk-in assignment for Nov 10 – Nov 12.
            </div>
          )}
        </Card>
      </section>

      {/* F099: Accounting Integration Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Accounting Integration & Reconciled Journal Sync (F099)
              </h3>
            </div>
            <Badge variant="sage">QuickBooks & Xero • Double-Entry Balance • Idempotent Retries</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Map services, boutique retail, gift card liabilities, sales taxes, gratuities, and clearing deposits into balanced double-entry journal entries. Sync retries never duplicate entries.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '0.94rem', color: 'var(--color-primary)' }}>
                  Daily Close Batch: DAILY-SALES-1027 ({accountingPlatform === 'quickbooks_online' ? 'QuickBooks Online' : 'Xero'})
                </strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Idempotency Key: IDEMP-2026-10-27-DAILY • Double-Entry Reconciled
                </div>
              </div>
              <Badge variant={accountingSyncStatus === 'synced' ? 'sage' : 'muted'}>
                {accountingSyncStatus === 'synced' ? 'Synced: QBO-JE-894102' : 'Pending Remote Sync'}
              </Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem', marginTop: '10px' }}>
              {/* Debits */}
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '6px' }}>
                <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                  Debits (Assets & Expenses) — $360.63
                </strong>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>1050 Undeposited Clearing Funds:</span>
                  <strong>$350.18</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>6050 Merchant Processing Fee Expense:</span>
                  <strong>$10.45</strong>
                </div>
              </div>

              {/* Credits */}
              <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '6px' }}>
                <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                  Credits (Revenues & Liabilities) — $360.63
                </strong>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>4000 Service Revenue:</span>
                  <strong>$200.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>4100 Retail Product Sales:</span>
                  <strong>$50.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>2100 Deferred Revenue (Gift Cards):</span>
                  <strong>$50.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>2200 Sales Tax Payable:</span>
                  <strong>$20.63</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>2300 Tips / Gratuities Payable:</span>
                  <strong>$40.00</strong>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '10px', fontSize: '0.78rem', color: '#2B5329', background: '#F4F7F4', padding: '6px 12px', borderRadius: '4px' }}>
              ✓ <strong>Double-Entry Invariant Verified:</strong> Total Debits ($360.63) === Total Credits ($360.63). Gift card sales are isolated under Liability Account 2100 rather than recognized prematurely as sales.
            </div>
          </div>

          {accountingIdempotencyTriggered && (
            <div style={{ border: '1px solid #738A73', background: '#F4F7F4', padding: '10px 14px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.82rem', color: '#3A523A' }}>
              ✓ <strong>Idempotent Protection Enforced:</strong> Idempotency key <code>IDEMP-2026-10-27-DAILY</code> was detected by the accounting engine. Remote batch QBO-JE-894102 was recognized; zero duplicate journal entries were created.
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {accountingSyncStatus === 'pending' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  setAccountingSyncStatus('synced');
                  setAccountingIdempotencyTriggered(false);
                }}
              >
                Sync Batch to QuickBooks Online
              </Button>
            )}

            {accountingSyncStatus === 'synced' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAccountingIdempotencyTriggered(true)}
              >
                Test Idempotent Retry (Simulate Duplicate Webhook)
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setAccountingSyncStatus('pending');
                setAccountingIdempotencyTriggered(false);
                setAccountingPlatform(accountingPlatform === 'quickbooks_online' ? 'xero' : 'quickbooks_online');
              }}
            >
              Toggle Platform ({accountingPlatform === 'quickbooks_online' ? 'Switch to Xero' : 'Switch to QuickBooks'})
            </Button>
          </div>
        </Card>
      </section>

      {/* F100: Versioned Electronic Signatures Showcase */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck2 size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Versioned Electronic Signatures & Cryptographic Evidence (F100)
              </h3>
            </div>
            <Badge variant="sage">Rules BR05, DR04, DR05, DR10 • SHA-256 Digest • Consent vs. Payment Separation</Badge>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Signatures are mathematically bound to an exact document snapshot. If terms or scope change, historical signed artifacts are permanently preserved and a new version is issued.
          </p>

          <div style={{ border: '1px solid #E8E5E0', padding: '16px', borderRadius: '8px', background: '#FAFAFA', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '0.94rem', color: 'var(--color-primary)' }}>
                  Chemical Peel & Retinoid Protocol Consent ({esignDocumentStatus === 'superseded' ? 'Version 1.0 (Superseded)' : 'Version 1.0 (Active)'})
                </strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontFamily: 'monospace', marginTop: '2px' }}>
                  SHA-256 Digest: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                </div>
              </div>
              <Badge variant={esignDocumentStatus === 'signed' ? 'sage' : esignDocumentStatus === 'superseded' ? 'muted' : 'rose'}>
                {esignDocumentStatus === 'signed'
                  ? 'Signed & Cryptographically Sealed'
                  : esignDocumentStatus === 'superseded'
                  ? 'Superseded (Historical Preserved)'
                  : 'Awaiting E-Signature'}
              </Badge>
            </div>

            <div style={{ background: '#FFF', border: '1px solid #E8E5E0', padding: '12px', borderRadius: '6px', fontSize: '0.82rem', color: '#555', lineHeight: '1.5', marginBottom: '12px' }}>
              &ldquo;Client agrees to patch test protocols and informs practitioner of active retinoid use. Posie Atelier reserves the right to postpone treatment if skin barrier is compromised.&rdquo;
            </div>

            {/* Invariant DR05 Checkbox */}
            <div style={{ border: '1px solid #E5E0D8', background: '#FFFDF9', padding: '10px 12px', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={esignPaymentSeparationChecked}
                  onChange={(e) => setEsignPaymentSeparationChecked(e.target.checked)}
                  style={{ marginTop: '2px' }}
                />
                <span style={{ color: 'var(--color-primary)' }}>
                  <strong>Rule DR05 Compliance:</strong> I understand that signing this consent form confirms treatment acknowledgment only and does NOT authorize any payment card charges. Payment is processed separately at checkout.
                </span>
              </label>
            </div>

            {esignDocumentStatus === 'signed' && (
              <div style={{ border: '1px solid #A2B59F', background: '#F4F7F4', padding: '12px', borderRadius: '6px', fontSize: '0.82rem' }}>
                <strong style={{ color: '#2B5329', display: 'block', marginBottom: '4px' }}>
                  ✓ Cryptographic Audit Certificate Attached (Rule DR10)
                </strong>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', color: '#3A523A', fontSize: '0.78rem' }}>
                  <div>Signer: <strong>Zendaya Coleman (Client)</strong></div>
                  <div>IP Address: <strong>192.168.1.100</strong></div>
                  <div>Timestamp: <strong>2026-10-27 14:30:00 UTC</strong></div>
                  <div>Device: <strong>Mobile Safari / iOS 17</strong></div>
                  <div>Signature Mode: <strong>Drawn Vector Verified</strong></div>
                  <div>Evidence ID: <strong>EVID-OCT27-991A</strong></div>
                </div>
              </div>
            )}
          </div>

          {esignTamperCheckPassed !== null && (
            <div style={{ marginTop: '10px', background: esignTamperCheckPassed ? '#F4F7F4' : '#FFF7F5', border: esignTamperCheckPassed ? '1px solid #738A73' : '1px solid #C67D6E', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: esignTamperCheckPassed ? '#3A523A' : '#8F4A3E', marginBottom: '12px' }}>
              {esignTamperCheckPassed
                ? '✓ Cryptographic Integrity Verified: Calculated content hash matches the signed signature digest with zero data alterations.'
                : '⚠ Tamper Alarm: Document content does not match the signed digest! Document integrity has been compromised.'}
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {esignDocumentStatus === 'issued' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  if (!esignPaymentSeparationChecked) {
                    alert('Rule DR05 requires acknowledging separation of consent and payment!');
                    return;
                  }
                  setEsignDocumentStatus('signed');
                  setEsignTamperCheckPassed(true);
                }}
              >
                Sign Consent as Zendaya Coleman
              </Button>
            )}

            {esignDocumentStatus === 'signed' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEsignTamperCheckPassed(true)}
                >
                  Verify Cryptographic Tamper Seal
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEsignDocumentStatus('superseded');
                    setEsignTamperCheckPassed(null);
                  }}
                >
                  Practitioner Issues v2.0 Amendment (Rule DR04)
                </Button>
              </>
            )}

            {esignDocumentStatus === 'superseded' && (
              <div style={{ width: '100%' }}>
                <div style={{ background: '#FFF9F7', border: '1px solid #E5C3B8', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#8F4A3E', marginBottom: '10px' }}>
                  ✓ <strong>Rule DR04 Enforced:</strong> Version 1.0 historical artifact is locked and preserved in audit records. Version 2.0 draft has been spawned with updated medical precautions requiring fresh client acceptance.
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEsignDocumentStatus('issued');
                    setEsignTamperCheckPassed(null);
                    setEsignPaymentSeparationChecked(true);
                  }}
                >
                  Reset E-Signature Showcase
                </Button>
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* F101: Private Records & Chart Amendments */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartPulse size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Private Records &amp; Chart Amendments (F101)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={chartAmendmentDevAdded ? 'rose' : 'sage'}>
                {chartAmendmentDevAdded ? 'Addendum AMD-01 Appended' : 'Signed Note (DR04 Locked)'}
              </Badge>
              <Badge variant="muted">Retention: 7-Year Statutory</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Enforces strict role-based charting privacy firewalls (Rule DR07), append-only addenda preserving historical entries verbatim (Rule DR04), and statutory retention tracking.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '0.94rem', color: 'var(--color-primary)' }}>
                SOAP Chart #CH-89412 — Zendaya Coleman (Esthetician: Maya Lin)
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Signed: Oct 20, 2026 15:45 UTC</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.6, marginBottom: '10px' }}>
              <div><strong>Subjective:</strong> Client reports mild barrier fatigue after transcontinental flight.</div>
              <div><strong>Objective:</strong> Minor T-zone erythema; stratum corneum slightly dehydrated. Cleared for enzyme peel.</div>
              <div><strong>Assessment:</strong> Barrier intact; responded well to chamomile botanical calm infusion.</div>
              <div><strong>Plan:</strong> Prescribed Barrier Restore Ceramide Cream nightly. SPF 50 daily.</div>
            </div>

            {chartAmendmentDevAdded && (
              <div style={{ background: '#FFF9F7', border: '1px solid #E5C3B8', borderRadius: '6px', padding: '10px 14px', fontSize: '0.8rem', marginTop: '10px' }}>
                <strong style={{ color: '#8F4A3E', display: 'block', marginBottom: '4px' }}>
                  ✓ Addendum AMD-01 Appended (Oct 20, 2026 18:30 UTC — Author: Maya Lin)
                </strong>
                <div style={{ color: '#555' }}>
                  <strong>Reason:</strong> Late entry — Client texted 2h post-visit noting slight cheek warmth.<br />
                  <strong>Clinical note:</strong> Advised chilled rosewater compress. Flush resolved completely in 15 mins. Original note preserved verbatim.
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {!chartAmendmentDevAdded ? (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setChartAmendmentDevAdded(true)}
              >
                Append Late Entry Addendum (Rule DR04)
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setChartAmendmentDevAdded(false)}
              >
                Reset Note
              </Button>
            )}

            <button
              onClick={() => setChartRoleDev(chartRoleDev === 'esthetician' ? 'front_desk' : 'esthetician')}
              style={{
                background: 'none',
                border: '1px solid var(--color-border)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
              }}
            >
              Simulate Role: <strong>{chartRoleDev === 'esthetician' ? 'Licensed Esthetician (Access OK)' : 'Front Desk / Marketing (Rule DR07 Blocked)'}</strong>
            </button>
          </div>

          {chartRoleDev === 'front_desk' && (
            <div style={{ marginTop: '10px', background: '#FFF7F5', border: '1px solid #C67D6E', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#8F4A3E' }}>
              ⚠ <strong>Rule DR07 Privacy Firewall:</strong> Non-clinical staff roles cannot view or edit private medical SOAP charts.
            </div>
          )}
        </Card>
      </section>

      {/* F102: Standardized Before and After Photos */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Camera size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Standardized Before &amp; After Clinical Photos (F102)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={photoConsentMarketingDev ? 'sage' : 'muted'}>
                {photoConsentMarketingDev ? 'Marketing Consent: Active (Doc D12)' : 'Marketing Revoked (Internal Only)'}
              </Badge>
              <Badge variant="sage">Angle: {photoAngleDev}</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Standardizes capture angles, discloses lighting differences exceeding 500K to prevent misleading marketing claims, and enforces strict two-tier marketing consent firewalls.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)' }}>Baseline Photo (Oct 20)</strong>
                <span style={{ fontSize: '0.74rem', background: '#EAE6DF', padding: '2px 6px', borderRadius: '4px' }}>SHA-256 Digest Bound</span>
              </div>
              <div style={{ height: '90px', background: '#F2EFE9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', color: '#777' }}>
                📷 Raw Capture • 3200K Tungsten • 18&quot; Distance
              </div>
            </div>

            <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)' }}>Post-Peel Photo (Oct 27)</strong>
                <span style={{ fontSize: '0.74rem', background: '#EAE6DF', padding: '2px 6px', borderRadius: '4px' }}>SHA-256 Digest Bound</span>
              </div>
              <div style={{ height: '90px', background: '#F2EFE9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', color: '#777' }}>
                📷 Raw Capture • 5000K Daylight LED • 18&quot; Distance
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '10px 14px', borderRadius: '6px', fontSize: '0.8rem', color: '#555', marginBottom: '12px' }}>
            ⚠ <strong>Lighting Delta Disclosed (&gt;500K):</strong> Baseline was captured under 3200K vs follow-up under 5000K (1800K difference). System automatically discloses this variance on all client-facing progress cards to prevent deceptive aesthetic marketing.
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['frontal', 'left_45', 'right_45'] as const).map((angle) => (
              <Button
                key={angle}
                size="sm"
                variant={photoAngleDev === angle ? 'primary' : 'outline'}
                onClick={() => setPhotoAngleDev(angle)}
              >
                {angle === 'frontal' ? 'Frontal Angle' : angle === 'left_45' ? 'Left 45° Angle' : 'Right 45° Angle'}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline"
              onClick={() => setPhotoConsentMarketingDev(!photoConsentMarketingDev)}
            >
              Toggle Document D12 Marketing Consent
            </Button>
          </div>
        </Card>
      </section>

      {/* F103: Client Deduplication & Reversible Merge */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Client Deduplication &amp; Reversible Merge (F103)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={dedupMergeExecuted ? (dedupUnmerged ? 'muted' : 'sage') : 'rose'}>
                {dedupMergeExecuted ? (dedupUnmerged ? 'Profiles Unmerged (Restored)' : 'Merged: Zendaya Coleman') : 'Duplicate Flagged'}
              </Badge>
              <Badge variant="muted">Shared Household Defense Active</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Intelligently flags potential duplicate profiles, protects family members sharing phone numbers from destructive auto-merges, and supports reversible merges via pre-merge audit snapshots.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.82rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px' }}>
                <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>Profile A (Primary)</strong>
                <div>Name: <strong>Zendaya Coleman</strong></div>
                <div>Phone: <strong>(310) 555-0199</strong></div>
                <div>Email: zendaya@example.com</div>
                <div>Visits: 14 completed • Points: 450</div>
              </div>

              <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px' }}>
                <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>Profile B (Candidate)</strong>
                <div>Name: <strong>Claire Coleman (Mother)</strong></div>
                <div>Phone: <strong>(310) 555-0199 (Shared Phone)</strong></div>
                <div>Email: claire.c@example.com</div>
                <div>Visits: 3 completed • Points: 75</div>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '10px 14px', borderRadius: '6px', fontSize: '0.8rem', color: '#555' }}>
              🛡 <strong>Shared Household Contact Defense:</strong> Detected identical phone number with different first names. System blocks automated merge to prevent conflating mother and daughter medical charts. Requires explicit practitioner review.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {!dedupMergeExecuted ? (
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  setDedupMergeExecuted(true);
                  setDedupUnmerged(false);
                }}
              >
                Execute Reversible Merge (Captures Pre-Merge Snapshot)
              </Button>
            ) : !dedupUnmerged ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setDedupUnmerged(true)}
              >
                <RotateCcw size={14} style={{ marginRight: '6px' }} />
                Unmerge Profiles (Restore Pre-Merge State DR04)
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setDedupMergeExecuted(false);
                  setDedupUnmerged(false);
                }}
              >
                Reset Deduplication Test
              </Button>
            )}
          </div>
        </Card>
      </section>

      {/* F104: Historical Migration Mapping & Provenance Archive */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Historical Migration Mapping &amp; Provenance Archive (F104)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Source: {migrationPlatform.toUpperCase()}</Badge>
              <Badge variant="muted">Provenance Archive: Zero Data Loss</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Staging multi-platform imports (GlossGenius, Vagaro, Boulevard) with column mapping and an immutable provenance archive ensuring unmapped legacy formulas, notes, and custom fields are never discarded.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px', fontSize: '0.82rem', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <strong>Mapped Columns:</strong>
                <div style={{ color: '#2B5329', marginTop: '4px' }}>✓ Client Name → client_name</div>
                <div style={{ color: '#2B5329' }}>✓ Client Phone → phone_number</div>
                <div style={{ color: '#2B5329' }}>✓ Total Spend → lifetime_spend</div>
              </div>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <strong>Provenance Archive (F104):</strong>
                <div style={{ color: '#8F4A3E', marginTop: '4px' }}>📦 legacy_hair_formula</div>
                <div style={{ color: '#8F4A3E' }}>📦 vagaro_vip_tier_2023</div>
                <div style={{ color: '#8F4A3E' }}>📦 custom_skin_sensitivities</div>
              </div>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <strong>Validation Status:</strong>
                <div style={{ color: '#2B5329', marginTop: '4px' }}>✓ 248 Valid Rows</div>
                <div style={{ color: '#B36B5C' }}>⚠ 2 Rows with Missing Phone</div>
                <div style={{ color: '#555' }}>Preserved in raw archive</div>
              </div>
            </div>

            <div style={{ color: '#555' }}>
              <strong>Rule:</strong> Any column not mapped to standard Posie schema is stored in <code>provenanceArchive</code> with platform name, column header, and raw value, preserving historical record integrity.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['glossgenius', 'vagaro', 'boulevard'] as const).map((plat) => (
              <Button
                key={plat}
                size="sm"
                variant={migrationPlatform === plat ? 'primary' : 'outline'}
                onClick={() => setMigrationPlatform(plat)}
              >
                Adapter: {plat === 'glossgenius' ? 'GlossGenius' : plat === 'vagaro' ? 'Vagaro' : 'Boulevard'}
              </Button>
            ))}
          </div>
        </Card>
      </section>

      {/* F105: Migration Rehearsal & Live Cutover */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Migration Rehearsal &amp; Live Cutover (F105)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={cutoverCertificateIssued ? 'sage' : (cutoverBlockedByObligation ? 'rose' : 'muted')}>
                {cutoverCertificateIssued ? 'Certificate #CUTOVER-CERT-2026-01' : (cutoverBlockedByObligation ? 'Cutover Blocked: Active Liability' : 'Rehearsal Ready')}
              </Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Dry-run reconciliation engine verifying opening financial balances, active customer obligations, and sample audit records before issuing a legally binding cutover certificate.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.82rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div>Total Legacy Clients:</div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>1,420</strong>
              </div>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div>Gift Card Liability Reconciled:</div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>$4,250.00</strong>
              </div>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div>Active Package Passes:</div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>68 Active</strong>
              </div>
            </div>

            {cutoverBlockedByObligation ? (
              <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#8F4A3E' }}>
                ⚠ <strong>Cutover Blocked (F105 Invariant):</strong> Found 3 rows with active gift card liabilities unmapped to ledger accounts. All active customer obligations must be reconciled or approved under interim redemption workflow before live cutover.
              </div>
            ) : cutoverCertificateIssued ? (
              <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A' }}>
                ✓ <strong>Cutover Certificate Issued:</strong> Opening balances verified. SHA-256 seal: <code>9b8a...42c1</code>. Live cutover approved for Sunday 11:59 PM.
              </div>
            ) : (
              <div style={{ fontSize: '0.82rem', color: '#555' }}>
                Ready to execute pre-cutover verification dry run.
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                setCutoverBlockedByObligation(false);
                setCutoverCertificateIssued(true);
              }}
            >
              Verify Reconciliation &amp; Issue Cutover Certificate
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setCutoverBlockedByObligation(true);
                setCutoverCertificateIssued(false);
              }}
            >
              Simulate Unmapped Active Obligation (Trigger Block)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setCutoverBlockedByObligation(false);
                setCutoverCertificateIssued(false);
              }}
            >
              Reset Cutover State
            </Button>
          </div>
        </Card>
      </section>

      {/* F106: Brand Changes Across Surfaces & Historical Lock */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Brand Changes Across Surfaces &amp; Historical Lock (F106)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={brandPublishedStatus === 'live' ? 'sage' : (brandPublishedStatus === 'staged_preview' ? 'rose' : 'muted')}>
                {brandPublishedStatus === 'live' ? 'Theme: ' + brandStagedTheme + ' (Live)' : (brandPublishedStatus === 'staged_preview' ? 'Draft Staged Preview' : 'Rolled Back')}
              </Badge>
              <Badge variant="muted">Historical Lock: Rules BR05 / DR04</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Stages brand revisions across booking sites, POS terminals, and customer portals with one-click rollback, while locking previously issued invoices and receipts against retroactive theme changes.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.82rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px' }}>
                <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '6px' }}>
                  Live Client Surface Preview
                </strong>
                <div style={{ fontSize: '0.8rem', color: '#555', marginBottom: '6px' }}>
                  Active Palette: <strong>{brandStagedTheme}</strong><br />
                  Surfaces Updated: Online Booking, POS Terminal, SMS Notifications.
                </div>
                <div style={{ height: '24px', background: brandStagedTheme === 'Sage & Linen' ? '#2D3E2F' : brandStagedTheme === 'Rose Terracotta' ? '#B36B5C' : '#1A1A1A', borderRadius: '4px', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.74rem' }}>
                  Brand Primary Token: {brandStagedTheme === 'Sage & Linen' ? '#2D3E2F (Sage)' : brandStagedTheme === 'Rose Terracotta' ? '#B36B5C (Terracotta)' : '#1A1A1A (Noir)'}
                </div>
              </div>

              <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px' }}>
                <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '6px' }}>
                  Previously Issued Invoice #INV-2024-001 (Locked)
                </strong>
                <div style={{ fontSize: '0.8rem', color: '#555', marginBottom: '6px' }}>
                  Issued: Nov 15, 2024 to Zendaya Coleman ($140.00)<br />
                  Baked Palette: <strong>Original Sage &amp; Linen</strong>
                </div>
                <div style={{ background: '#F8F6F2', border: '1px solid #EAE6DF', padding: '6px 8px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
                  🔒 <strong>Rules BR05 &amp; DR04 Invariant:</strong> Changing studio theme does NOT modify past issued receipts. Original tokens and legal entity details remain permanent.
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant={brandStagedTheme === 'Sage & Linen' ? 'primary' : 'outline'}
              onClick={() => {
                setBrandStagedTheme('Sage & Linen');
                setBrandPublishedStatus('live');
              }}
            >
              Apply Sage &amp; Linen (Default)
            </Button>
            <Button
              size="sm"
              variant={brandStagedTheme === 'Rose Terracotta' ? 'primary' : 'outline'}
              onClick={() => {
                setBrandStagedTheme('Rose Terracotta');
                setBrandPublishedStatus('live');
              }}
            >
              Apply Rose Terracotta
            </Button>
            <Button
              size="sm"
              variant={brandStagedTheme === 'Noir Atelier' ? 'primary' : 'outline'}
              onClick={() => {
                setBrandStagedTheme('Noir Atelier');
                setBrandPublishedStatus('live');
              }}
            >
              Apply Noir Atelier
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setBrandStagedTheme('Sage & Linen');
                setBrandPublishedStatus('rolled_back');
              }}
            >
              <RotateCcw size={14} style={{ marginRight: '6px' }} />
              1-Click Rollback to Previous Revision
            </Button>
          </div>
        </Card>
      </section>

      {/* F107: One Link for a Complete Visit & Express Flow */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                One Link for a Complete Visit &amp; Express Flow (F107)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={hubStepDev === 'confirmed' ? 'sage' : (hubDeclineSimulated ? 'rose' : 'muted')}>
                {hubStepDev === 'confirmed' ? 'Booking Confirmed ✓' : (hubDeclineSimulated ? 'Card Declined (Forms Preserved)' : 'Step: ' + hubStepDev.toUpperCase())}
              </Badge>
              <Badge variant="muted">Link: posie.com/v/vtok_8941</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Combines treatment selection, medical intake, signed consents, deposits, itineraries, and phone self-checkout into a single branded, resumable link.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            {/* Step Progress Tracker */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '14px', borderBottom: '1px solid #EAE6DF', paddingBottom: '10px' }}>
              <span style={{ color: '#2B5329', fontWeight: 600 }}>1. Service ✓</span>
              <span style={{ color: hubStepDev !== 'intake' ? '#2B5329' : 'var(--color-primary)', fontWeight: 600 }}>2. Health Intake {hubStepDev !== 'intake' ? '✓' : ''}</span>
              <span style={{ color: ['consent', 'deposit', 'confirmed', 'self_checkout'].includes(hubStepDev) ? '#2B5329' : '#888', fontWeight: 600 }}>3. E-Consent (DR05)</span>
              <span style={{ color: ['deposit', 'confirmed', 'self_checkout'].includes(hubStepDev) ? '#2B5329' : '#888', fontWeight: 600 }}>4. Deposit Card</span>
              <span style={{ color: hubStepDev === 'confirmed' ? '#2B5329' : '#888', fontWeight: 600 }}>5. Itinerary</span>
            </div>

            {hubDeclineSimulated ? (
              <div style={{ background: '#FFF7F5', border: '1px solid #C67D6E', padding: '12px', borderRadius: '6px', fontSize: '0.82rem', color: '#8F4A3E', marginBottom: '10px' }}>
                ⚠ <strong>Payment Authorization Failed (F107 Invariant):</strong> Card ending in 0002 was declined. Notice: Completed health questionnaires and signed consents remain permanently saved. Client can provide an alternate card without re-filling forms.
              </div>
            ) : hubStepDev === 'confirmed' ? (
              <div style={{ background: '#F4F7F4', border: '1px solid #738A73', padding: '12px', borderRadius: '6px', fontSize: '0.82rem', color: '#3A523A', marginBottom: '10px' }}>
                ✓ <strong>Visit Confirmed:</strong> Hydra-Dew Glass Facial on Sunday at 2:00 PM with Maya Lin. $50 deposit vaulted. Itinerary and arrival guidance available.
              </div>
            ) : hubStepDev === 'self_checkout' ? (
              <div style={{ background: '#FFF', border: '1px solid var(--color-border)', padding: '12px', borderRadius: '6px', fontSize: '0.82rem' }}>
                <strong>Client Phone Self-Checkout (No staff card contact):</strong>
                <div style={{ marginTop: '4px', color: '#555' }}>
                  Service Total: $150.00 • Gratuity: $30.00 (20%) • Paid via Apple Pay (Card •••• 8811). Aftercare unlocked.
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.82rem', color: '#555' }}>
                Active Session: <strong>Zendaya Coleman</strong> • Service: Hydra-Dew Facial ($150) with Maya Lin. Resumable link valid for 7 days.
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant={hubStepDev === 'intake' ? 'primary' : 'outline'}
              onClick={() => {
                setHubStepDev('consent');
                setHubDeclineSimulated(false);
              }}
            >
              1. Submit Health Intake
            </Button>
            <Button
              size="sm"
              variant={hubStepDev === 'consent' ? 'primary' : 'outline'}
              onClick={() => {
                setHubStepDev('deposit');
                setHubDeclineSimulated(false);
              }}
            >
              2. Sign E-Consent (Rule DR05)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setHubDeclineSimulated(true)}
            >
              Simulate Card Decline
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                setHubStepDev('confirmed');
                setHubDeclineSimulated(false);
              }}
            >
              3. Authorize Deposit &amp; Confirm
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setHubStepDev('self_checkout');
                setHubDeclineSimulated(false);
              }}
            >
              4. Client Self-Checkout on Phone
            </Button>
          </div>
        </Card>
      </section>

      {/* F108: Automation Recipes with Previews & Safe Dry-Run */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Automation Recipes with Previews &amp; Safe Dry-Run (F108)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={automationRecipePaused ? 'rose' : 'sage'}>
                {automationRecipePaused ? 'Emergency Paused' : 'Recipe Active: Review Request'}
              </Badge>
              <Badge variant="muted">Cost: $0.02 / SMS</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Rehearses automation recipes against historical client cohorts with quiet hours compliance, opt-out suppression, and transparent messaging cost estimations before activation.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.82rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div>Audience Evaluated:</div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>142 Clients</strong>
              </div>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div>Eligible to Receive:</div>
                <strong style={{ fontSize: '1.1rem', color: '#2B5329' }}>18 Recipient(s)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div>Safely Excluded:</div>
                <strong style={{ fontSize: '1.1rem', color: '#8F4A3E' }}>124 Excluded</strong>
              </div>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div>Estimated Campaign Cost:</div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>$0.36 USD</strong>
              </div>
            </div>

            <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px', fontSize: '0.8rem', color: '#555', marginBottom: '10px' }}>
              <strong>Dry-Run Exclusion Breakdown:</strong>
              <div style={{ marginTop: '4px' }}>
                • <strong>82 Excluded:</strong> Frequency capped (already received studio message within 14 days)<br />
                • <strong>38 Excluded:</strong> Marketing consent not granted (Rule F064 compliance)<br />
                • <strong>4 Excluded:</strong> Local client timezone currently in quiet hours (9 PM - 8 AM)
              </div>
            </div>

            <div style={{ background: '#F8F6F2', border: '1px solid #EAE6DF', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', color: '#444' }}>
              💬 <strong>Sample Rendered Message:</strong> &ldquo;Hi Zendaya, thank you for visiting Posie Atelier today! If you enjoyed your treatment with Maya, we’d love your quick review: posie.com/review/beverlyhills&rdquo;
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant={automationRecipePaused ? 'primary' : 'outline'}
              onClick={() => setAutomationRecipePaused(!automationRecipePaused)}
            >
              {automationRecipePaused ? 'Resume Automation Recipe' : '1-Click Emergency Pause'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAutomationRehearsalShown(!automationRehearsalShown)}
            >
              Re-run Rehearsal Preview (Dry Run)
            </Button>
          </div>
        </Card>
      </section>

      {/* F109: Unified Client Communication Inbox & Portability */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Unified Client Communication Inbox &amp; Portability (F109)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={inboxDeliveryStateDev === 'delivered' ? 'sage' : 'rose'}>
                {inboxDeliveryStateDev === 'delivered' ? 'Carrier Status: Delivered ✓' : 'Carrier Status: Failed (Unreachable)'}
              </Badge>
              <Badge variant="muted">Line: (310) 555-7674</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Consolidates authorized two-way SMS, email, and web chat. Protects staff phone privacy with studio business numbers, and strictly firewalls text replies from masquerading as signed clinical notes.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            {/* Thread Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #EAE6DF', paddingBottom: '8px' }}>
              <div>
                <strong>Zendaya Coleman</strong> • Assigned to: <strong>Maya Lin</strong>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>VIP Gold • 14 Visits • $1,450 Spend • Allergies: Retin-A</div>
              </div>
              <span style={{ fontSize: '0.76rem', color: '#2B5329' }}>● Maya Lin active in thread</span>
            </div>

            {/* Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
              <div style={{ alignSelf: 'flex-end', background: 'var(--color-primary)', color: '#FFF', padding: '10px 14px', borderRadius: '12px 12px 2px 12px', maxWidth: '75%', fontSize: '0.82rem' }}>
                <div>Hi Zendaya! Looking forward to your Hydra-Dew Facial tomorrow at 2:00 PM. Please arrive 5 minutes early!</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', textAlign: 'right' }}>Sent via Posie Line (310) 555-7674 • 10:15 AM</div>
              </div>

              <div style={{ alignSelf: 'flex-start', background: '#FFF', border: '1px solid var(--color-border)', padding: '10px 14px', borderRadius: '12px 12px 12px 2px', maxWidth: '75%', fontSize: '0.82rem' }}>
                <div>Thank you Maya! My skin barrier feels a little dry after my flight, can we add extra hyaluronic infusion?</div>
                <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '4px' }}>Received via SMS • 10:22 AM</div>
              </div>
            </div>

            {inboxTimelineSavedDev && (
              <div style={{ background: '#FFF9F7', border: '1px solid #E5C3B8', padding: '10px 14px', borderRadius: '6px', fontSize: '0.8rem', color: '#8F4A3E', marginBottom: '10px' }}>
                ✓ <strong>Attributed Communication Record Saved (Rule F101 Firewall):</strong> Saved to Zendaya&apos;s administrative profile. Notice: This communication cannot and does not overwrite official SOAP clinical charting records without licensed practitioner examination.
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setInboxTimelineSavedDev(!inboxTimelineSavedDev)}
            >
              {inboxTimelineSavedDev ? 'Unlink from Timeline' : 'Save Text to Client Timeline (Rule F101)'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setInboxDeliveryStateDev(inboxDeliveryStateDev === 'delivered' ? 'failed' : 'delivered')}
            >
              Toggle Carrier Webhook Status ({inboxDeliveryStateDev === 'delivered' ? 'Simulate Carrier Fail' : 'Set Delivered'})
            </Button>
          </div>
        </Card>
      </section>

      {/* F110: Business Calling, Voicemail & Staff Routing */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Business Calling, Voicemail &amp; Staff Routing (F110)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={telephonyAfterHoursRoute ? 'rose' : 'sage'}>
                {telephonyAfterHoursRoute ? 'After-Hours: Voicemail' : 'Operating Hours: Ringing Staff'}
              </Badge>
              <Badge variant={telephonyRecordingConsentDev ? 'sage' : 'muted'}>
                {telephonyRecordingConsentDev ? 'Recording: Consented (Rule U19)' : 'Unrecorded Call'}
              </Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Provides business calling, automated caller ID profile matching, voicemail-to-text AI transcription, and compliant two-party call recording consent controls.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.82rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>
                  Caller ID Match (Inbound Call)
                </strong>
                <div>Caller: <strong>Zendaya Coleman</strong> ((310) 555-0199)</div>
                <div>Status: <strong>Gold VIP Member</strong></div>
                <div>Upcoming: <strong>Hydra-Dew Facial (Nov 01 2:00 PM)</strong></div>
              </div>

              <div style={{ background: '#FFF', padding: '12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>
                  Telephony Compliance &amp; Routing
                </strong>
                <div>Hours: <strong>Mon–Sat 9:00 AM – 7:00 PM PT</strong></div>
                <div>Routing: <strong>{telephonyAfterHoursRoute ? 'Studio Voicemail Box' : 'Front Desk Ring Group'}</strong></div>
                <div>Disclosure: <strong>&ldquo;This call may be recorded...&rdquo;</strong></div>
              </div>
            </div>

            {telephonyAfterHoursRoute && (
              <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '12px', borderRadius: '6px', fontSize: '0.82rem', color: '#555', marginBottom: '10px' }}>
                🎙 <strong>Automated Voicemail Transcript (#TASK-VM-421):</strong>
                <p style={{ fontStyle: 'italic', margin: '4px 0 6px', color: '#333' }}>
                  &ldquo;Hi, this is Zendaya. I wanted to see if Maya has any openings this Saturday for a quick brow sculpt. Thank you!&rdquo;
                </p>
                <div style={{ fontSize: '0.74rem', color: '#777' }}>
                  ✓ Follow-up task assigned to Front Desk • Scheduled callback for Mon 9:00 AM.
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant={telephonyAfterHoursRoute ? 'primary' : 'outline'}
              onClick={() => setTelephonyAfterHoursRoute(!telephonyAfterHoursRoute)}
            >
              Toggle Operating Hours ({telephonyAfterHoursRoute ? 'Switch to Daytime 2 PM' : 'Switch to Sunday Night 10 PM'})
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTelephonyRecordingConsentDev(!telephonyRecordingConsentDev)}
            >
              Toggle Recording Consent (Rule U19: {telephonyRecordingConsentDev ? 'Active' : 'Unrecorded'})
            </Button>
          </div>
        </Card>
      </section>

      {/* F111: Message Consent & Delivery System */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Message Consent &amp; Delivery System (F111)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={consentMarketingDevRevoked ? 'rose' : (consentBudgetCapReached ? 'muted' : 'sage')}>
                {consentMarketingDevRevoked ? 'Marketing Opted-Out (STOP)' : (consentBudgetCapReached ? 'SMS Spend Cap Reached ($20.00)' : 'All Consent Active')}
              </Badge>
              <Badge variant="muted">Rule DR05 / DR10</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Enforces purpose-specific consent (transactional vs. marketing vs. clinical). Revoking promotional consent instantly suppresses future campaign blasts across all automations while preserving critical appointment itineraries.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.82rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <strong>Transactional Booking SMS:</strong>
                <p style={{ color: '#555', margin: '4px 0' }}>&ldquo;Your appointment is confirmed for Sunday at 2:00 PM.&rdquo;</p>
                <div style={{ color: '#2B5329', fontWeight: 600 }}>✓ Allowed (Critical Notification Preserved)</div>
              </div>

              <div style={{ background: '#FFF', padding: '12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <strong>Promotional Marketing SMS:</strong>
                <p style={{ color: '#555', margin: '4px 0' }}>&ldquo;Enjoy $25 off our seasonal radiance facial this week!&rdquo;</p>
                {consentMarketingDevRevoked ? (
                  <div style={{ color: '#8F4A3E', fontWeight: 600 }}>🚫 Suppressed: Client Revoked Marketing (Rule DR05)</div>
                ) : consentBudgetCapReached ? (
                  <div style={{ color: '#B36B5C', fontWeight: 600 }}>⏸ Suppressed: Studio Monthly Budget Cap Reached ($20.00)</div>
                ) : (
                  <div style={{ color: '#2B5329', fontWeight: 600 }}>✓ Allowed (Active Consent &amp; Budget OK)</div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant={consentMarketingDevRevoked ? 'primary' : 'outline'}
              onClick={() => {
                setConsentMarketingDevRevoked(!consentMarketingDevRevoked);
                setConsentBudgetCapReached(false);
              }}
            >
              {consentMarketingDevRevoked ? 'Re-grant Marketing Consent' : 'Simulate Client "STOP" Text (Revoke Marketing)'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setConsentBudgetCapReached(!consentBudgetCapReached);
                setConsentMarketingDevRevoked(false);
              }}
            >
              {consentBudgetCapReached ? 'Reset Studio SMS Budget' : 'Simulate Spend Cap Reached ($20/mo)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F112: Metric Dictionary and Governed Data Model */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Metric Dictionary &amp; Governed Data Model (F112)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Single Source of Truth</Badge>
              <Badge variant="muted">Lineage: Accounts 4000/4100/2100/2300</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Canonical metric formulas shared identically across dashboards, payroll statements, and QuickBooks journals to permanently eliminate metric divergence.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.82rem', marginBottom: '14px' }}>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div>Net Service Revenue:</div>
              <strong style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>$170.00</strong>
              <div style={{ fontSize: '0.72rem', color: '#777', marginTop: '2px' }}>Account 4000 (Gross $200 - $30 refunds/disc)</div>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div>Net Retail Revenue:</div>
              <strong style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>$45.00</strong>
              <div style={{ fontSize: '0.72rem', color: '#777', marginTop: '2px' }}>Account 4100 ($50 - $5 returns)</div>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div>Average Ticket Value:</div>
              <strong style={{ fontSize: '1.2rem', color: '#2B5329' }}>$107.50</strong>
              <div style={{ fontSize: '0.72rem', color: '#777', marginTop: '2px' }}>($170 + $45) / 2 visits</div>
            </div>
            <div style={{ background: '#FAF8F5', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div>60-Day Rebooking Rate:</div>
              <strong style={{ fontSize: '1.2rem', color: '#2B5329' }}>50.0%</strong>
              <div style={{ fontSize: '0.72rem', color: '#777', marginTop: '2px' }}>1 of 2 clients rebooked</div>
            </div>
          </div>

          {metricLineageInspectOpen && (
            <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px', fontSize: '0.8rem', color: '#555', marginBottom: '14px' }}>
              <strong>Verifiable Metric Lineage &amp; Freshness:</strong>
              <div style={{ marginTop: '4px' }}>
                • <code>net_service_revenue</code> → Account 4000 (Freshness: Verified Live UTC)<br />
                • <code>tips_collected</code> → Account 2300 (100% Pass-Through)<br />
                • <code>deferred_gift_card_liability</code> → Account 2100 (Liability Delta: +$30.00)
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMetricLineageInspectOpen(!metricLineageInspectOpen)}
            >
              {metricLineageInspectOpen ? 'Hide Metric Lineage' : 'Inspect Source Lineage & Freshness'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F113: Role-Based Dashboards & Renter Privacy Firewall */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Role-Based Dashboards &amp; Renter Privacy Firewall (F113)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={dashboardRoleDev === 'owner' ? 'sage' : 'muted'}>
                Viewing Mode: {dashboardRoleDev === 'owner' ? 'Studio Owner (Full P&L)' : 'Commission Practitioner (Maya Lin)'}
              </Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Enforces strict privacy firewalls so booth renters and practitioners cannot snoop on studio net profit or another colleague&apos;s earnings. Surfaces private non-punitive goals without toxic public rankings.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            {dashboardRoleDev === 'owner' ? (
              <div>
                <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                  Owner / General Manager Overview (Full Studio P&amp;L)
                </strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.82rem', marginBottom: '10px' }}>
                  <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                    <div>Gross Studio Sales:</div>
                    <strong>$10,000.00</strong>
                  </div>
                  <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                    <div>Labor Cost (40.0%):</div>
                    <strong>$4,000.00</strong>
                  </div>
                  <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                    <div>Net Operating Margin:</div>
                    <strong style={{ color: '#2B5329' }}>$3,500.00</strong>
                  </div>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#666' }}>
                  Staff Summaries visible: Maya Lin ($3,200), Chloe Vance ($2,800).
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ color: 'var(--color-primary)' }}>
                    Maya Lin — Personal Practitioner Cockpit
                  </strong>
                  <span style={{ fontSize: '0.76rem', color: '#2B5329', fontWeight: 600 }}>
                    🔒 Studio P&amp;L &amp; Other Staff Earnings Firewalled
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.82rem', marginBottom: '10px' }}>
                  <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                    <div>My Personal Service Sales:</div>
                    <strong>$3,200.00</strong>
                  </div>
                  <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                    <div>My Pass-Through Tips:</div>
                    <strong style={{ color: '#2B5329' }}>$680.00</strong>
                  </div>
                  <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                    <div>Personal Weekly Goal:</div>
                    <strong>106.7% Achieved</strong> ($3,000 goal)
                  </div>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#666' }}>
                  Growth trend: +12% vs last month. Chloe&apos;s earnings and studio profit are strictly inaccessible.
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={dashboardRoleDev === 'owner' ? 'outline' : 'primary'}
              onClick={() => setDashboardRoleDev(dashboardRoleDev === 'owner' ? 'practitioner' : 'owner')}
            >
              Switch Role: {dashboardRoleDev === 'owner' ? 'Simulate Practitioner (Maya Lin)' : 'Simulate Studio Owner'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F114: Retention and Return Cohorts */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Retention and Return Cohorts (F114)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Cohort: Nov 2024 (66.7% Retained)</Badge>
              <Badge variant="muted">Same-Day Filter Active</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Segments repeat visits by monthly acquisition cohort. Filters out same-day add-on visits to prevent inflated retention figures, and highlights cadence-overdue lapsed clients.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.82rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div>Cohort Acquired:</div>
                <strong>3 Clients (Nov 2024)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div>Distinct Return Visits:</div>
                <strong style={{ color: '#2B5329' }}>2 Returned (66.7%)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div>Repeat Revenue:</div>
                <strong>$205.00</strong>
              </div>
              <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div>Average Return Cadence:</div>
                <strong>29 Days</strong>
              </div>
            </div>

            <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px', fontSize: '0.8rem', color: '#555' }}>
              <strong>Cadence Lapsed Analysis:</strong>
              <div style={{ marginTop: '4px' }}>
                • <strong>Zendaya Coleman:</strong> Last visit 12 days ago (Cadence: 28 days) → <span style={{ color: '#2B5329', fontWeight: 600 }}>On Track</span><br />
                • <strong>Lapsed Guest:</strong> Last visit 87 days ago (Cadence: 28 days) → <span style={{ color: '#8F4A3E', fontWeight: 600 }}>Overdue by 59 Days (Queued for Win-Back Flow)</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* F115: Service Contribution Analysis */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Service Contribution Analysis (F115)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={contributionBackbarMapped ? 'sage' : 'rose'}>
                {contributionBackbarMapped ? 'Meets Floor: $56.50 (37.7%)' : 'Missing Cost Warning: Backbar Unmapped'}
              </Badge>
              <Badge variant="muted">Rule R06 / R07</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Calculates unit-level contribution margin by subtracting direct backbar materials, practitioner compensation, and merchant fees from gross service revenue.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                Hydra-Dew Glass Facial (Retail: $150.00)
              </strong>
              <span style={{ fontSize: '0.82rem', color: '#2B5329', fontWeight: 600 }}>
                Net Contribution Margin: {contributionBackbarMapped ? '$56.50 (37.7%)' : '$82.50 (Estimate - Missing Backbar)'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '10px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Labor Commission:</div>
                <strong>-$67.50 (45%)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Backbar Supplies:</div>
                <strong>{contributionBackbarMapped ? '-$12.00 (Serums)' : '⚠ Unmapped'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Merchant Fee:</div>
                <strong>-$4.00 (2.6%)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Room &amp; Linens:</div>
                <strong>-$10.00</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              ⚖ <strong>Rule R06 Invariant:</strong> Operational estimate only. Reflects unit contribution margin (Revenue less direct costs) and does not constitute GAAP-audited CPA net studio profit.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setContributionBackbarMapped(!contributionBackbarMapped)}
            >
              Toggle Backbar Recipe ({contributionBackbarMapped ? 'Simulate Unmapped Supplies' : 'Map Backbar Serums'})
            </Button>
          </div>
        </Card>
      </section>

      {/* F116: Acquisition Attribution Records & Marketplace Defense */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Acquisition Attribution Records &amp; Marketplace Defense (F116)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={attributionSource === 'consumer_marketplace' && !attributionDisputeFiled ? 'rose' : 'sage'}>
                {attributionSource === 'direct_link'
                  ? 'Direct Pro Link: 0% Fee'
                  : attributionSource === 'legacy_client_import'
                  ? 'Legacy Client Import: 0% Fee'
                  : attributionDisputeFiled
                  ? 'Dispute Approved: 0% Fee'
                  : 'Marketplace Discovery: 20% Fee'}
              </Badge>
              <Badge variant="muted">WB C9 Defense</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Protects studios from unfair platform commissions by guaranteeing 0% fees for direct links and legacy clients, with auditable dispute overrides.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                Client Attribution: Harper Vance (Visit #1)
              </strong>
              <span style={{ fontSize: '0.82rem', color: attributionSource === 'consumer_marketplace' && !attributionDisputeFiled ? '#8F4A3E' : '#2B5329', fontWeight: 600 }}>
                {attributionSource === 'consumer_marketplace' && !attributionDisputeFiled ? 'Acquisition Commission: $30.00 (20%)' : 'Acquisition Commission: $0.00 (0%)'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '10px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Attribution Origin:</div>
                <strong style={{ textTransform: 'capitalize' }}>{attributionSource.replace(/_/g, ' ')}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Protected Policy:</div>
                <strong>{attributionSource !== 'consumer_marketplace' ? 'Immune from Platform Tax' : 'Marketplace Terms'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Dispute Audit Trail:</div>
                <strong>{attributionDisputeFiled ? 'Overridden by Owner (Reason Stamped)' : 'None Needed'}</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🛡 <strong>WB C9 Invariant:</strong> Existing clients brought to Posie by the studio via direct links or CSV import are permanently immune to marketplace fees. All dispute overrides are stamped with immutable owner rationale.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant={attributionSource === 'direct_link' ? 'primary' : 'outline'}
              onClick={() => { setAttributionSource('direct_link'); setAttributionDisputeFiled(false); }}
            >
              Direct Link (0% Fee)
            </Button>
            <Button
              size="sm"
              variant={attributionSource === 'legacy_client_import' ? 'primary' : 'outline'}
              onClick={() => { setAttributionSource('legacy_client_import'); setAttributionDisputeFiled(false); }}
            >
              Legacy Import (0% Fee)
            </Button>
            <Button
              size="sm"
              variant={attributionSource === 'consumer_marketplace' ? 'primary' : 'outline'}
              onClick={() => setAttributionSource('consumer_marketplace')}
            >
              Consumer Marketplace (20% Fee)
            </Button>
            {attributionSource === 'consumer_marketplace' && (
              <Button
                size="sm"
                variant={attributionDisputeFiled ? 'outline' : 'primary'}
                onClick={() => setAttributionDisputeFiled(!attributionDisputeFiled)}
              >
                {attributionDisputeFiled ? 'Remove Dispute' : 'Dispute & Override Fee (Rule F116)'}
              </Button>
            )}
          </div>
        </Card>
      </section>

      {/* F117: Booking & Product Conversion Analytics */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Booking &amp; Product Conversion Funnel (F117)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={funnelDropStage === 'deposit_authorized' ? 'rose' : 'sage'}>
                {funnelDropStage === 'deposit_authorized' ? 'Stage Drop Alert: Deposit (-33.3%)' : 'Funnel Health: 44.4% Conversion'}
              </Badge>
              <Badge variant="muted">Rule DR10 Idempotent</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Granular conversion analysis across the 6 booking milestones with idempotent event deduplication to eliminate inflated top-of-funnel noise.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', fontSize: '0.75rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div style={{ color: '#888' }}>1. View Service</div>
                <strong>180 Sessions</strong>
                <div style={{ color: '#2B5329', fontSize: '0.7rem' }}>Top of Funnel</div>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div style={{ color: '#888' }}>2. Pick Slot</div>
                <strong>170 (94.4%)</strong>
                <div style={{ color: '#888', fontSize: '0.7rem' }}>-5.6% Drop</div>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div style={{ color: '#888' }}>3. Intake Form</div>
                <strong>150 (88.2%)</strong>
                <div style={{ color: '#888', fontSize: '0.7rem' }}>-11.8% Drop</div>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div style={{ color: '#888' }}>4. Sign Consent</div>
                <strong>140 (93.3%)</strong>
                <div style={{ color: '#888', fontSize: '0.7rem' }}>-6.7% Drop</div>
              </div>
              <div style={{ background: funnelDropStage === 'deposit_authorized' ? '#FFF5F3' : '#FFF', padding: '8px', borderRadius: '4px', border: funnelDropStage === 'deposit_authorized' ? '1px solid #E5C3B8' : '1px solid var(--color-border)', textAlign: 'center' }}>
                <div style={{ color: '#888' }}>5. Auth Deposit</div>
                <strong>120 (85.7%)</strong>
                <div style={{ color: funnelDropStage === 'deposit_authorized' ? '#8F4A3E' : '#888', fontSize: '0.7rem' }}>
                  {funnelDropStage === 'deposit_authorized' ? '⚠ High Friction' : '-14.3% Drop'}
                </div>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div style={{ color: '#888' }}>6. Confirmed</div>
                <strong>80 (66.7%)</strong>
                <div style={{ color: '#2B5329', fontSize: '0.7rem' }}>44.4% Overall</div>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              📊 <strong>Rule DR10 Invariant:</strong> Client navigations, accidental back-clicks, and reloads within the same session are deduplicated by (sessionId, milestone). Drop-offs exceeding 30% trigger UX optimization recommendations.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setFunnelDropStage(funnelDropStage === 'deposit_authorized' ? 'none' : 'deposit_authorized')}
            >
              {funnelDropStage === 'deposit_authorized' ? 'Reset Funnel Simulation' : 'Simulate Deposit Drop-Off Alert'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F118: Operational Reliability Dashboard & Incident Recovery */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Operational Reliability &amp; Incident Recovery (F118)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={reliabilityDegraded ? 'rose' : 'sage'}>
                {reliabilityDegraded ? 'Hardware Timeout (Degraded)' : 'Subsystems: 100% Operational'}
              </Badge>
              <Badge variant="muted">WB C6 Reliability</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Subsystem operational monitoring, graceful offline read-only degradation, and ambiguous payment reconciliation to prevent double charges.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Stripe WisePOS E:</div>
                <strong style={{ color: reliabilityDegraded ? '#8F4A3E' : '#2B5329' }}>
                  {reliabilityDegraded ? '⚠ Latency Spike (1,400ms)' : '● Healthy (142ms)'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Twilio A2P SMS:</div>
                <strong style={{ color: '#2B5329' }}>● Healthy (99.98%)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Scheduler Engine:</div>
                <strong style={{ color: '#2B5329' }}>● Active (0 lag)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Offline Storage:</div>
                <strong style={{ color: '#2B5329' }}>Cached &amp; Sync Ready</strong>
              </div>
            </div>

            <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary)' }}>
                  Ambiguous In-Flight POS Transaction: $150.00
                </strong>
                <Badge variant={ambiguousPaymentResolved ? 'sage' : 'muted'}>
                  {ambiguousPaymentResolved ? 'Gateway Verified: Paid' : 'Ambiguous Terminal Status'}
                </Badge>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#555' }}>
                {ambiguousPaymentResolved
                  ? 'PaymentIntent pi_8832 succeeded at Stripe gateway. Terminal transaction marked paid without double charging client.'
                  : 'Terminal connection dropped during customer chip dip. Protocol holds transaction and queries gateway status before prompting for retry.'}
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🔒 <strong>WB C6 Invariant:</strong> Posie strictly prohibits blind terminal retries during network timeouts. All ambiguous payment intents query gateway truth first, preventing duplicate card authorizations.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setReliabilityDegraded(!reliabilityDegraded)}
            >
              Toggle Hardware Degraded State ({reliabilityDegraded ? 'Simulate Normal' : 'Simulate Timeout'})
            </Button>
            <Button
              size="sm"
              variant={ambiguousPaymentResolved ? 'outline' : 'primary'}
              onClick={() => setAmbiguousPaymentResolved(!ambiguousPaymentResolved)}
            >
              {ambiguousPaymentResolved ? 'Reset Payment Incident' : 'Reconcile Ambiguous Payment (WB C6)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F119: Complete Exit Archive & Freedom to Leave */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Archive size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Complete Exit Archive &amp; Freedom to Leave (F119)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={archiveDownloaded ? 'sage' : 'muted'}>
                {archiveDownloaded ? 'Archive Verified (SHA-256 Digest)' : 'Extortion Fee: $0.00 Guaranteed'}
              </Badge>
              <Badge variant="muted">Rule DR06 Freedom</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            100% self-service, instant studio data export with zero fees, offline standalone index.html viewer, and SHA-256 cryptographic manifest.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Standard CSVs:</div>
                <strong>Clients, Visits, Inventory</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Liabilities Ledger:</div>
                <strong>Gift Cards &amp; Packages</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Offline Viewer:</div>
                <strong>index.html (No lock-in)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Integrity Manifest:</div>
                <strong>SHA-256 Checksums</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🕊 <strong>Rule DR06 Invariant:</strong> Posie guarantees total data portability with $0 fees and zero vendor lock-in. The studio can view complete past history forever via the included offline index.html without an active subscription.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={archiveDownloaded ? 'outline' : 'primary'}
              onClick={() => setArchiveDownloaded(!archiveDownloaded)}
            >
              {archiveDownloaded ? 'Regenerate Archive' : 'Download Complete $0 Exit Archive (Rule DR06)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F120: Phone, Tablet, and Desktop Parity */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Smartphone size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Phone, Tablet &amp; Desktop Workday Parity (F120)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Workday Parity: 100% (5/5 Tasks)</Badge>
              <Badge variant="muted">WCAG 2.1 AA / WB F60</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Guarantees solo practitioners can run 100% of their workday from any mobile browser with ergonomic touch targets and bottom sheet drawers.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Active Viewport Simulation: {activeViewportMode.toUpperCase()} ({activeViewportMode === 'phone' ? '390px' : activeViewportMode === 'tablet' ? '768px' : '1440px'})
              </strong>
              <span style={{ fontSize: '0.8rem', color: '#2B5329', fontWeight: 600 }}>
                Min Touch Area: ≥ 44x44px Passed
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', fontSize: '0.75rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div>Calendar Booking</div>
                <strong style={{ color: '#2B5329' }}>✓ 100% Mobile</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div>SOAP Note Charting</div>
                <strong style={{ color: '#2B5329' }}>✓ 100% Mobile</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div>Clinical Photos</div>
                <strong style={{ color: '#2B5329' }}>✓ Camera API</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div>Payment Checkout</div>
                <strong style={{ color: '#2B5329' }}>✓ Tap to Pay</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <div>Client Messages</div>
                <strong style={{ color: '#2B5329' }}>✓ Two-Way SMS</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              📱 <strong>Rule DR08 &amp; WB F60 Invariant:</strong> A solo practitioner is never forced onto a desktop computer. All clinical, financial, and scheduling operations adapt seamlessly to phone viewports with mobile bottom sheet drawers and touch targets ≥ 44px.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={activeViewportMode === 'phone' ? 'primary' : 'outline'}
              onClick={() => setActiveViewportMode('phone')}
            >
              Phone Viewport (390px)
            </Button>
            <Button
              size="sm"
              variant={activeViewportMode === 'tablet' ? 'primary' : 'outline'}
              onClick={() => setActiveViewportMode('tablet')}
            >
              Tablet Viewport (768px)
            </Button>
            <Button
              size="sm"
              variant={activeViewportMode === 'desktop' ? 'primary' : 'outline'}
              onClick={() => setActiveViewportMode('desktop')}
            >
              Desktop Viewport (1440px)
            </Button>
          </div>
        </Card>
      </section>

      {/* F121: Unified Search & Role-Safe Commands */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Unified Search &amp; Role-Safe Commands (F121)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={searchUserRole === 'owner' ? 'sage' : 'rose'}>
                {searchUserRole === 'owner' ? 'Owner Mode: Full Clinical Finding' : 'Staff Mode: Snippet Redacted (Rule F121)'}
              </Badge>
              <Badge variant="muted">WB F60 Omni-Search</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Global search across clients, appointments, and charts. Enforces strict privacy so search never leaks restricted notes through snippets.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Active Search Query: &quot;{searchQueryText}&quot; (User Role: {searchUserRole.toUpperCase()})
              </strong>
              <Badge variant={searchUserRole === 'owner' ? 'sage' : 'muted'}>
                {searchUserRole === 'owner' ? 'Unrestricted Practitioner Access' : 'Redacted Staff View'}
              </Badge>
            </div>

            <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                  SOAP Note: Chemical Peel (Maya Lin)
                </strong>
                <span style={{ fontSize: '0.75rem', color: '#888' }}>Dr. Evelyn Reed • 2026-10-14</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: searchUserRole === 'owner' ? '#333' : '#8F4A3E', fontStyle: searchUserRole === 'owner' ? 'normal' : 'italic' }}>
                {searchUserRole === 'owner'
                  ? 'Clinical finding: Stage 2 erythema and sensitive dermis. Prescribed soothing serum.'
                  : '[Restricted Clinical / Financial Record Redacted]'}
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🔍 <strong>Rule F121 Invariant:</strong> Search never reveals a restricted note through its snippet. Front desk receptionists and staff see redacted placeholders, while independent booth renters are firewalled from viewing another practitioner&apos;s charts.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={searchUserRole === 'owner' ? 'primary' : 'outline'}
              onClick={() => setSearchUserRole(searchUserRole === 'owner' ? 'receptionist' : 'owner')}
            >
              Toggle Search Role ({searchUserRole === 'owner' ? 'Switch to Receptionist (Redacted)' : 'Switch to Owner (Full Access)'})
            </Button>
          </div>
        </Card>
      </section>

      {/* F122: Emergency Day View & Outage Recovery */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Emergency Day View &amp; Outage Recovery (F122)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={emergencyOutageActive ? 'rose' : 'sage'}>
                {emergencyOutageActive ? 'Outage Active: Emergency Read-Only Mode' : 'Online: Day View Synced'}
              </Badge>
              <Badge variant="muted">WB C6 Outage Protocol</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Encrypted local storage cache for today&apos;s appointments and clinical allergy alerts during internet outages.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Network State:</div>
                <strong style={{ color: emergencyOutageActive ? '#8F4A3E' : '#2B5329' }}>
                  {emergencyOutageActive ? '● Cloud Offline' : '● Online Synced'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Local Cache Age:</div>
                <strong>Cached 14m ago</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Digest Integrity:</div>
                <strong style={{ color: '#2B5329' }}>sha256_e814a0f2</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Safety Alerts:</div>
                <strong style={{ color: '#8F4A3E' }}>2 Allergies Cached</strong>
              </div>
            </div>

            {emergencyActionQueued && (
              <div style={{ background: '#FFF5F3', border: '1px solid #E5C3B8', borderRadius: '6px', padding: '10px 14px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#8F4A3E' }}>
                    Queued Action: Cash Received ($120.00 for Chloe Bennett)
                  </strong>
                  <Badge variant="rose">offline_unconfirmed_queued</Badge>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>
                  WB C6 Invariant: This action was recorded offline. It is not confirmed until the studio reconnects and cloud sync verifies the ledger.
                </div>
              </div>
            )}

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🔒 <strong>WB C6 Invariant:</strong> No offline payment or appointment change is implied to be confirmed. Practitioners access read-only safety data during outages, while offline transactions are strictly queued for reconciliation.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={emergencyOutageActive ? 'outline' : 'primary'}
              onClick={() => setEmergencyOutageActive(!emergencyOutageActive)}
            >
              {emergencyOutageActive ? 'Restore Cloud Connection' : 'Simulate Internet Outage'}
            </Button>
            <Button
              size="sm"
              variant={emergencyActionQueued ? 'outline' : 'primary'}
              onClick={() => setEmergencyActionQueued(!emergencyActionQueued)}
            >
              {emergencyActionQueued ? 'Clear Queued Action' : 'Queue Offline Action (Rule WB C6)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F123: Public API & Webhooks */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Public API &amp; Webhooks (F123)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={webhookTestDispatched ? 'sage' : 'muted'}>
                {webhookTestDispatched ? 'Webhook Dispatched (Idempotent)' : 'API Engine Ready (v2026-10-01)'}
              </Badge>
              <Badge variant="muted">WB F67 Integrations</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Permission-scoped developer tokens, HMAC-SHA256 signature verification, and exponential backoff webhook delivery.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Token Scopes:</div>
                <strong style={{ color: '#2B5329' }}>appointments:read, clients:read</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Signature Protocol:</div>
                <strong>HMAC-SHA256 (v1)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Backoff Schedule:</div>
                <strong>10s, 60s, 5m, 30m</strong>
              </div>
            </div>

            {webhookTestDispatched && (
              <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '10px', marginBottom: '10px', fontFamily: 'monospace', fontSize: '0.76rem', color: '#333' }}>
                <div>&gt; POST https://partner-app.example.com/webhooks</div>
                <div>&gt; X-Posie-Signature: t=173000,v1=9a3f2b1c</div>
                <div>&gt; Idempotency-Key: posie_idemp_evt_7841_99</div>
                <div>&gt; Payload: &#123; &quot;eventType&quot;: &quot;appointment.booked&quot;, &quot;appointmentId&quot;: &quot;appt_99&quot; &#125;</div>
              </div>
            )}

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              ⚡ <strong>WB F67 Invariant:</strong> Duplicate or out-of-order deliveries can be handled safely by integration partners. Every webhook carries a unique idempotency key, API version tag, and HMAC signature.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={webhookTestDispatched ? 'outline' : 'primary'}
              onClick={() => setWebhookTestDispatched(!webhookTestDispatched)}
            >
              {webhookTestDispatched ? 'Reset Webhook Test' : 'Dispatch Idempotent Webhook Event (WB F67)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F124: Product Use Per Service & Fractional Backbar */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Product Use Per Service &amp; Fractional Backbar (F124)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={backbarMeasuredMode ? 'sage' : 'rose'}>
                {backbarMeasuredMode ? 'Dispense Mode: Measured on Scale (15ml)' : 'Dispense Mode: Estimated Formula Default (15ml)'}
              </Badge>
              <Badge variant="muted">Rules R06 / R07</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Tracks fractional backbar units, formula revisions, and bowl waste with explicit labeling for unmeasured estimates.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Formula Mix: Custom Glycolic Radiance Mix v2
              </strong>
              <span style={{ fontSize: '0.82rem', color: '#2B5329', fontWeight: 600 }}>
                Total Backbar Cost: $3.36 (Consumed: $3.00, Waste: $0.36)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Glycolic 30% Solution:</div>
                <strong>15 ml ($1.80) + 3 ml waste</strong>
                <div style={{ fontSize: '0.7rem', color: backbarMeasuredMode ? '#2B5329' : '#8F4A3E' }}>
                  {backbarMeasuredMode ? 'Scale Measured' : 'Estimated Default'}
                </div>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Botanical Soothing Drops:</div>
                <strong>4 pumps (6 ml, $1.20)</strong>
                <div style={{ fontSize: '0.7rem', color: '#888' }}>Standard 1.5ml/pump</div>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Waste Tracking:</div>
                <strong>3 ml Bowl Excess ($0.36)</strong>
                <div style={{ fontSize: '0.7rem', color: '#2B5329' }}>Direct Margin Impact</div>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              ⚖ <strong>Rule R06/R07 Invariant:</strong> Units convert consistently across metric (ml, g) and US customary (fl oz, oz). Any dispense not verified on a physical scale is explicitly stamped estimated_formula_default rather than falsely claiming measured precision.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setBackbarMeasuredMode(!backbarMeasuredMode)}
            >
              Toggle Measurement Mode ({backbarMeasuredMode ? 'Switch to Estimated Formula Default' : 'Switch to Digital Scale Measured'})
            </Button>
          </div>
        </Card>
      </section>

      {/* F125: Lots Expiry and Stock Forecasts */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Lots Expiry &amp; Stock Forecasts (F125)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={lotPaoSimulated ? 'rose' : 'sage'}>
                {lotPaoSimulated ? 'Definite Shortage Alert: -3 Vials' : 'Stock Forecast: Adequate for 7 Days'}
              </Badge>
              <Badge variant="muted">WB F46 / F150</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Tracks batch/lot numbers, Period After Opening (PAO) degradation, and forecasts definite appointment stock shortages.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Lot LOT-2026-A (Fresh):</div>
                <strong style={{ color: '#2B5329' }}>5 Vials (Exp: Dec 2027)</strong>
                <div style={{ fontSize: '0.7rem', color: '#2B5329' }}>Healthy &amp; Unexpired</div>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Lot LOT-2025-X (PAO Violated):</div>
                <strong style={{ color: '#8F4A3E' }}>4 Vials (Opened &gt;6mo ago)</strong>
                <div style={{ fontSize: '0.7rem', color: '#8F4A3E' }}>Quarantined from Clinical Use</div>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Committed Bookings (7 Days):</div>
                <strong style={{ color: lotPaoSimulated ? '#8F4A3E' : '#2B5329' }}>
                  {lotPaoSimulated ? '8 Vials Committed (-3 Shortage)' : '4 Vials Committed (Adequate)'}
                </strong>
                <div style={{ fontSize: '0.7rem', color: '#888' }}>Appointment Commitments</div>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              📦 <strong>WB F46 Invariant:</strong> Stock alerts strictly distinguish definite shortages (confirmed bookings with strict SKU requirements exceeding available unexpired stock) from speculative estimates with unknown usage rates.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={lotPaoSimulated ? 'outline' : 'primary'}
              onClick={() => setLotPaoSimulated(!lotPaoSimulated)}
            >
              {lotPaoSimulated ? 'Reset Stock Simulation' : 'Simulate Strict Booking Demand & Definite Shortage'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F126: Service Readiness Rules */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Service Readiness Rules (F126)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={readinessOverridden ? 'sage' : 'rose'}>
                {readinessOverridden ? 'Ready: Overridden by Dr. Reed' : 'Blocked: Missing Patch Test (Rule F126)'}
              </Badge>
              <Badge variant="muted">Gingr Pattern / WB F42</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Multi-factor clinical readiness verifying intake forms, patch tests, and staff certifications before appointment check-in.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Appointment: Level 2 Chemical Peel (Gemma Chan)
              </strong>
              <span style={{ fontSize: '0.8rem', color: readinessOverridden ? '#2B5329' : '#8F4A3E', fontWeight: 600 }}>
                {readinessOverridden ? 'Clear for Treatment (Documented Override)' : 'Safety Hold: Action Required'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Facial Intake Form:</div>
                <strong style={{ color: '#2B5329' }}>✓ Satisfied (Updated)</strong>
              </div>
              <div style={{ background: readinessOverridden ? '#FFF' : '#FFF5F3', padding: '8px', borderRadius: '4px', border: readinessOverridden ? '1px solid var(--color-border)' : '1px solid #E5C3B8' }}>
                <div>Patch Test (14 Days):</div>
                <strong style={{ color: readinessOverridden ? '#2B5329' : '#8F4A3E' }}>
                  {readinessOverridden ? '✓ Overridden (Dr. Reed)' : '⚠ Missing / Required'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Peel Certification:</div>
                <strong style={{ color: '#2B5329' }}>✓ Staff Certified</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              📋 <strong>WB F42 Invariant:</strong> Missing information routes to review rather than an automated diagnosis. The software never makes automated medical disqualifications; missing items require practitioner review and a documented override reason.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={readinessOverridden ? 'outline' : 'primary'}
              onClick={() => setReadinessOverridden(!readinessOverridden)}
            >
              {readinessOverridden ? 'Reset Patch Test Requirement' : 'Document Practitioner Readiness Override (Rule F126)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F127: Business Anomaly Explanations */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Business Anomaly Explanations (F127)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={anomalySampleLow ? 'muted' : 'rose'}>
                {anomalySampleLow ? 'Alert Suppressed (Sample: 3/15)' : 'High Severity: Booking Drop -50%'}
              </Badge>
              <Badge variant="muted">WB F58 Governance</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Flags unusual booking drops and payment declines with source records and suppression for low sample sizes.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Observed Sample Size:</div>
                <strong style={{ color: anomalySampleLow ? '#8F4A3E' : '#2B5329' }}>
                  {anomalySampleLow ? '3 Visits (Min 15 Required)' : '50 Visits (Statistically Significant)'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Alert Decision:</div>
                <strong>{anomalySampleLow ? 'Suppressed (Rule F127)' : 'Active High Priority Alert'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Actionable Check:</div>
                <strong>{anomalySampleLow ? 'Continue baseline monitoring' : 'Review direct website connection'}</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              📊 <strong>WB F58 Invariant:</strong> Governed metrics and historical baselines. Low sample sizes automatically suppress overconfident alerts to prevent small-business panic and notification fatigue.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAnomalySampleLow(!anomalySampleLow)}
            >
              Toggle Sample Size ({anomalySampleLow ? 'Simulate 50 Baseline Visits (Active Alert)' : 'Simulate 3 Baseline Visits (Suppressed)'})
            </Button>
          </div>
        </Card>
      </section>

      {/* F128: Guardian and Authorized Payer Roles */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Guardian &amp; Authorized Payer Roles (F128)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={selectedRelationshipRole === 'authorized_payer' ? 'rose' : 'sage'}>
                {selectedRelationshipRole === 'authorized_payer'
                  ? 'Payer Mode: Billing Only (Notes Firewalled)'
                  : selectedRelationshipRole === 'guardian'
                  ? 'Guardian Mode: Full Medical Consent'
                  : 'Client Mode: Adult Record Access'}
              </Badge>
              <Badge variant="muted">Rule DR04 Privacy</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Separates the client receiving treatment, authorized legal guardians, and third-party payers with strict privacy firewalls.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Appointment: Zoe Kravitz (Minor, Age 14) • Evaluating Role: {selectedRelationshipRole.toUpperCase()}
              </strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Billing Invoice:</div>
                <strong style={{ color: '#2B5329' }}>✓ Viewable</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Clinical SOAP Notes:</div>
                <strong style={{ color: selectedRelationshipRole === 'authorized_payer' ? '#8F4A3E' : '#2B5329' }}>
                  {selectedRelationshipRole === 'authorized_payer' ? '❌ Strictly Firewalled' : '✓ Permitted'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Clinical Photos:</div>
                <strong style={{ color: selectedRelationshipRole === 'authorized_payer' ? '#8F4A3E' : '#2B5329' }}>
                  {selectedRelationshipRole === 'authorized_payer' ? '❌ Strictly Firewalled' : '✓ Permitted'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Sign Medical Consent:</div>
                <strong style={{ color: selectedRelationshipRole === 'guardian' ? '#2B5329' : '#8F4A3E' }}>
                  {selectedRelationshipRole === 'guardian' ? '✓ Legal Guardian Sign' : '❌ Minor / Payer Barred'}
                </strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🛡 <strong>Rule DR04 &amp; WB F128 Invariant:</strong> Paying for an appointment alone never grants access to private notes or images. Third-party payers receive billing invoices ONLY.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={selectedRelationshipRole === 'authorized_payer' ? 'primary' : 'outline'}
              onClick={() => setSelectedRelationshipRole('authorized_payer')}
            >
              Role: Third-Party Payer (Jason)
            </Button>
            <Button
              size="sm"
              variant={selectedRelationshipRole === 'guardian' ? 'primary' : 'outline'}
              onClick={() => setSelectedRelationshipRole('guardian')}
            >
              Role: Legal Guardian (Lisa)
            </Button>
            <Button
              size="sm"
              variant={selectedRelationshipRole === 'client' ? 'primary' : 'outline'}
              onClick={() => setSelectedRelationshipRole('client')}
            >
              Role: Client (Zoe, Minor)
            </Button>
          </div>
        </Card>
      </section>

      {/* F129: Documented Care Summaries */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck2 size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Documented Care Summaries (F129)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={careSummaryApproved ? 'sage' : 'muted'}>
                {careSummaryApproved ? 'Approved & Signed by Dr. Reed' : 'Unfinalized Clinical Draft'}
              </Badge>
              <Badge variant="muted">Gingr Report Cards</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Aesthetic visit report cards with approved products, factual observations, home-care steps, and consented photography.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Care Packet: Hydra-Dew Glass Facial (Zendaya Coleman)
              </strong>
              <Badge variant={careSummaryApproved ? 'sage' : 'rose'}>
                {careSummaryApproved ? 'Ready for Client Portal' : 'Draft: Approval Required'}
              </Badge>
            </div>

            <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '12px', fontSize: '0.82rem', marginBottom: '10px' }}>
              <div><strong>Practitioner Observations:</strong> Skin presented with surface dehydration. Applied hyaluronic infusion with positive calm response.</div>
              <div style={{ marginTop: '6px' }}><strong>Products:</strong> Hydra-Infusion Ampoule (Treatment), Barrier Recovery Cream (Home-care).</div>
              <div style={{ marginTop: '6px' }}><strong>Consented Photos:</strong> 1 Post-treatment cheek photo included (1 unreleased pore photo excluded).</div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              ✨ <strong>WB F129 Invariant:</strong> Staff approve the summary and can trace every statement to its source. AI/dictation drafts remain unfinalized until approved and signed by the responsible practitioner.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={careSummaryApproved ? 'outline' : 'primary'}
              onClick={() => setCareSummaryApproved(!careSummaryApproved)}
            >
              {careSummaryApproved ? 'Revert to Draft' : 'Sign & Approve Care Summary (Dr. Reed)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F130: Assisted Support Sessions */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Headphones size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Assisted Support Sessions &amp; Secret Shielding (F130)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={supportSessionActive ? 'sage' : 'rose'}>
                {supportSessionActive ? 'Support Session Active: 60m (Secrets Shielded)' : 'Session Revoked by Studio Owner'}
              </Badge>
              <Badge variant="muted">WB F60 Privacy</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Time-bounded, scoped support delegation allowing engineers to troubleshoot while strictly masking payment secrets and health records.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Credit Card PAN:</div>
                <strong style={{ color: '#2B5329' }}>•••• •••• •••• 1111</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Card CVC / API Key:</div>
                <strong style={{ color: '#2B5329' }}>••• / [REDACTED]</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Clinical SOAP Notes:</div>
                <strong style={{ color: '#2B5329' }}>[Health Record Hidden]</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Staff Compensation:</div>
                <strong style={{ color: '#2B5329' }}>[Pay Hidden]</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🔒 <strong>WB F60 Invariant:</strong> Support cannot see payment secrets or private records outside the granted scope. Sessions are hard-capped at 2 hours and feature an instant 1-click owner kill switch.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={supportSessionActive ? 'outline' : 'primary'}
              onClick={() => setSupportSessionActive(!supportSessionActive)}
            >
              {supportSessionActive ? 'Execute Owner Kill Switch (Revoke Session)' : 'Grant Temporary Support Session (60m)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F131: Payroll Ready Exports */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Payroll Ready Exports (F131)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={payrollPeriodLocked ? 'sage' : 'muted'}>
                {payrollPeriodLocked ? 'Status: Period Locked (Audit Enforced)' : 'Status: Open / Unlocked (Draft Run)'}
              </Badge>
              <Badge variant="muted">WB F55 Gusto / ADP</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Compiles verified hours, service commissions, tip splits, and forward clawbacks into standardized payroll files.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Pay Period: 2026-10-01 to 2026-10-15 (Beverly Hills Atelier)
              </strong>
              <span style={{ fontSize: '0.82rem', color: '#2B5329', fontWeight: 600 }}>
                Total Gross Payroll: $2,660.00
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Hourly Base Wages:</div>
                <strong>$1,600.00 (72 hrs)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Total Commissions:</div>
                <strong>$810.00 (Service + Retail)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Client Gratuity Tips:</div>
                <strong>$300.00 (100% Payout)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Forward Adjustments:</div>
                <strong style={{ color: '#8F4A3E' }}>-$50.00 (Clawback)</strong>
              </div>
            </div>

            <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '10px', fontSize: '0.78rem', marginBottom: '10px' }}>
              <div>• <strong>Sienna Woods (EMP-001):</strong> 32 hrs ($800) + $510 comm + $180 tips - $50 adj = <strong>$1,440.00 Gross</strong></div>
              <div style={{ marginTop: '4px' }}>• <strong>Chloe Bennett (UNMAPPED):</strong> 40 hrs ($800) + $300 comm + $120 tips = <strong>$1,220.00 Gross</strong> <span style={{ color: '#8F4A3E' }}>(⚠ Exception: Missing Tax ID)</span></div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              💼 <strong>WB F55 Invariant:</strong> Every amount ties to a service, time record or approved correction. Approved periods are locked against backdated tampering; subsequent adjustments flow to the next open period.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={payrollPeriodLocked ? 'outline' : 'primary'}
              onClick={() => setPayrollPeriodLocked(!payrollPeriodLocked)}
            >
              {payrollPeriodLocked ? 'Unlock Period (Allow Time Edits)' : 'Lock Period & Export Gusto/ADP CSV (Rule F131)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F132: Tax and Receipt Configuration */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Receipt size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Tax &amp; Receipt Configuration (F132)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={taxRuleServicesExempt ? 'sage' : 'muted'}>
                {taxRuleServicesExempt ? 'CA Rule: Services Exempt, Retail 9.5%' : 'Rule: Services & Retail Taxable'}
              </Badge>
              <Badge variant="muted">Account 2200 Liability</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Location-based effective-dated sales tax with category taxability rules and strict revenue/liability separation.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Ticket: Facial ($150) + Serum ($50) + Tip ($30)
              </strong>
              <span style={{ fontSize: '0.82rem', color: '#2B5329', fontWeight: 600 }}>
                Grand Total: {taxRuleServicesExempt ? '$234.75' : '$249.00'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Taxable Subtotal:</div>
                <strong>{taxRuleServicesExempt ? '$50.00 (Retail)' : '$200.00'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Exempt Subtotal:</div>
                <strong>{taxRuleServicesExempt ? '$180.00 (Service/Tip)' : '$30.00 (Tip)'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Sales Tax (9.5%):</div>
                <strong style={{ color: '#2B5329' }}>{taxRuleServicesExempt ? '$4.75' : '$19.00'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Ledger Account:</div>
                <strong>Acct 2200 (Liability)</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🧾 <strong>Rule F132 Invariant:</strong> Tax liability collected is held strictly in Liability Account 2200 and never co-mingled with business operating revenue. Tax rules are effective-dated to preserve historical receipt integrity.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTaxRuleServicesExempt(!taxRuleServicesExempt)}
            >
              Toggle Service Tax Exemption ({taxRuleServicesExempt ? 'Simulate All Items Taxable' : 'Set Beauty Services Exempt (CA Default)'})
            </Button>
          </div>
        </Card>
      </section>

      {/* F133: Integration Connection Center */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Share2 size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Integration Connection Center (F133)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={integrationQboDegraded ? 'rose' : 'sage'}>
                {integrationQboDegraded ? 'Alert: QuickBooks Disconnected (Data Lagging)' : 'All Integrations Healthy (5/5)'}
              </Badge>
              <Badge variant="muted">WB F67 Health</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Central cockpit tracking external integration connection states and warning what data is delayed during disconnections.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>QuickBooks Online:</div>
                <strong style={{ color: integrationQboDegraded ? '#8F4A3E' : '#2B5329' }}>
                  {integrationQboDegraded ? '⚠ Token Expired' : '● Connected'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Stripe WisePOS E:</div>
                <strong style={{ color: '#2B5329' }}>● Connected</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Twilio A2P SMS:</div>
                <strong style={{ color: '#2B5329' }}>● Operational</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Google Calendar:</div>
                <strong style={{ color: '#2B5329' }}>● Active Sync</strong>
              </div>
            </div>

            {integrationQboDegraded && (
              <div style={{ background: '#FFF5F3', border: '1px solid #E5C3B8', borderRadius: '6px', padding: '10px 14px', marginBottom: '10px', fontSize: '0.8rem', color: '#8F4A3E' }}>
                <strong>Delayed Data Impact:</strong> Daily sales journal entries and sales tax liability accounts are lagging in QuickBooks. Historical reports in Posie remain unaffected.
              </div>
            )}

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🔌 <strong>WB F67 Invariant:</strong> A disconnected integration shows what data may be delayed. The system explicitly discloses affected external dashboards rather than failing silently.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={integrationQboDegraded ? 'primary' : 'outline'}
              onClick={() => setIntegrationQboDegraded(!integrationQboDegraded)}
            >
              {integrationQboDegraded ? 'Refresh QuickBooks OAuth Token' : 'Simulate QBO Token Expiration'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F134: Approvals for Consequential Changes */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Approvals for Consequential Changes (F134)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={consequentialChangeApproved ? 'sage' : 'rose'}>
                {consequentialChangeApproved ? 'Approved by Dr. Evelyn Reed' : 'Pending Multi-Party Approval'}
              </Badge>
              <Badge variant="muted">SEC / LEG Governance</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Blast-radius preview engine and approval gates for bulk SMS broadcasts, large refunds, and data exports.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Proposed Change: VIP Holiday Flash SMS Broadcast
              </strong>
              <Badge variant="rose">High Risk Blast-Radius</Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Affected Recipients:</div>
                <strong style={{ color: '#8F4A3E' }}>450 Active Clients</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Estimated Carrier Fee:</div>
                <strong>$22.50 USD</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Quiet Hours Check:</div>
                <strong style={{ color: '#2B5329' }}>✓ Compliant (2:00 PM)</strong>
              </div>
            </div>

            <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '10px', fontSize: '0.8rem', marginBottom: '10px' }}>
              {consequentialChangeApproved
                ? 'Approval Rationale: "Approved within Q4 marketing carrier budget and complies with quiet hours." (Signed by Dr. Evelyn Reed)'
                : 'Pending Sign-Off: Action blocked until an authorized manager reviews blast radius and signs documented rationale.'}
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🛡 <strong>Rule F134 Invariant:</strong> Approvers see the exact affected records and any cost before accepting. Consequential studio modifications require immutable recorded rationale.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={consequentialChangeApproved ? 'outline' : 'primary'}
              onClick={() => setConsequentialChangeApproved(!consequentialChangeApproved)}
            >
              {consequentialChangeApproved ? 'Revoke Approval' : 'Review & Approve Consequential Change (Dr. Reed)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F135: Supported Wallet and Online Payment Methods */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wallet size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Supported Wallet &amp; Online Payment Methods (F135)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">
                {activeClientPlatform === 'ios_safari' ? 'Recommended: Apple Pay' : 'Recommended: Google Pay'}
              </Badge>
              <Badge variant="muted">PCI DSS SAQ A / WB F30</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Digital wallet integration (Apple Pay, Google Pay, Link, BNPL) with device detection and transparent fees.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Client Platform Simulation: {activeClientPlatform === 'ios_safari' ? 'Apple iPhone (Safari 18)' : 'Google Pixel (Android / Chrome)'}
              </strong>
              <span style={{ fontSize: '0.8rem', color: '#2B5329', fontWeight: 600 }}>
                PCI DSS SAQ A (Zero Raw Card Exposure)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Apple Pay:</div>
                <strong style={{ color: activeClientPlatform === 'ios_safari' ? '#2B5329' : '#888' }}>
                  {activeClientPlatform === 'ios_safari' ? '✓ Available (2.9% + 30¢)' : '❌ Not on Android'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Google Pay:</div>
                <strong style={{ color: '#2B5329' }}>
                  ✓ Available (2.9% + 30¢)
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Link by Stripe:</div>
                <strong style={{ color: '#2B5329' }}>✓ 1-Click Saved Card</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Klarna / Afterpay:</div>
                <strong style={{ color: '#2B5329' }}>✓ Pay in 4 (5.9% + 30¢)</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              💳 <strong>WB F30 Invariant:</strong> Supported methods and fees are disclosed per country and device. Credentials flow through hosted fields without touching Posie servers (PCI SAQ A).
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={activeClientPlatform === 'ios_safari' ? 'primary' : 'outline'}
              onClick={() => setActiveClientPlatform('ios_safari')}
            >
              Simulate iOS Safari (Apple Pay Primary)
            </Button>
            <Button
              size="sm"
              variant={activeClientPlatform === 'android_chrome' ? 'primary' : 'outline'}
              onClick={() => setActiveClientPlatform('android_chrome')}
            >
              Simulate Android Chrome (Google Pay Primary)
            </Button>
          </div>
        </Card>
      </section>

      {/* F136: Transparent Waitlist Priorities */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Transparent Waitlist Priorities (F136)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={waitlistOfferClaimed ? 'sage' : 'muted'}>
                {waitlistOfferClaimed ? 'Slot Confirmed: Anne Hathaway' : 'Exclusive Timed Claim: 14m Remaining'}
              </Badge>
              <Badge variant="muted">WB F81 Fair Recovery</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Matches cancellation openings to waitlist clients using objective criteria (duration fit, practitioner, and notice requirements).
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Cancellation Opening: 60m at 2:00 PM with Dr. Evelyn Reed (4h notice)
              </strong>
              <Badge variant={waitlistOfferClaimed ? 'sage' : 'rose'}>
                {waitlistOfferClaimed ? 'Booked & Removed from Waitlist' : '15m Anti-Collusion Lock'}
              </Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>#1 Rank: Anne Hathaway</div>
                <strong style={{ color: '#2B5329' }}>✓ Exact 60m Fit &amp; 2h Notice</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Filtered: Zendaya Coleman</div>
                <strong style={{ color: '#8F4A3E' }}>Inadequate Notice (12h Req)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Anti-Double-Booking:</div>
                <strong style={{ color: '#2B5329' }}>1-to-1 Exclusive Offer</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              ⚖ <strong>WB F81 Invariant:</strong> Prioritization never uses inferred health, wealth or protected characteristics. Ranking is determined strictly by declared notice windows, duration fit, and waitlist seniority.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={waitlistOfferClaimed ? 'outline' : 'primary'}
              onClick={() => setWaitlistOfferClaimed(!waitlistOfferClaimed)}
            >
              {waitlistOfferClaimed ? 'Re-open Timed Claim Window' : 'Claim Exclusive Timed Offer (Rule F136)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F137: Intake and Note OCR Assistance */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Intake &amp; Note OCR Assistance (F137)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={ocrSensitiveVerified ? 'sage' : 'rose'}>
                {ocrSensitiveVerified ? 'Status: 100% Verified & Committed' : 'Triage Required: 2 Unverified Fields'}
              </Badge>
              <Badge variant="muted">WB F148 Human-in-Loop</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Scanned document digitization with confidence scoring, triage flags, and mandatory human verification for clinical fields.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Scanned Intake Questionnaire: Maya Lin (scan_01.jpg)
              </strong>
              <span style={{ fontSize: '0.8rem', color: ocrSensitiveVerified ? '#2B5329' : '#8F4A3E', fontWeight: 600 }}>
                {ocrSensitiveVerified ? 'Official Health Record Committed' : 'Uncommitted Draft (Triage Active)'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Client Full Name:</div>
                <strong>Maya Lin (98% Conf) ✓</strong>
              </div>
              <div style={{ background: ocrSensitiveVerified ? '#FFF' : '#FFF5F3', padding: '8px', borderRadius: '4px', border: ocrSensitiveVerified ? '1px solid var(--color-border)' : '1px solid #E5C3B8' }}>
                <div>Allergies &amp; Retin-A:</div>
                <strong style={{ color: ocrSensitiveVerified ? '#2B5329' : '#8F4A3E' }}>
                  {ocrSensitiveVerified ? 'Retin-A 0.05% (Verified)' : '72% Conf (⚠ Human Triage)'}
                </strong>
              </div>
              <div style={{ background: ocrSensitiveVerified ? '#FFF' : '#FFF5F3', padding: '8px', borderRadius: '4px', border: ocrSensitiveVerified ? '1px solid var(--color-border)' : '1px solid #E5C3B8' }}>
                <div>Past Chemical Peels:</div>
                <strong style={{ color: ocrSensitiveVerified ? '#2B5329' : '#8F4A3E' }}>
                  {ocrSensitiveVerified ? 'TCA 10% 2025 (Verified)' : '88% Conf (⚠ Human Triage)'}
                </strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🔍 <strong>WB F148 Invariant:</strong> A human confirms identity and sensitive fields before they become records. AI and OCR outputs remain uncommitted drafts until explicitly approved by a practitioner.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={ocrSensitiveVerified ? 'outline' : 'primary'}
              onClick={() => setOcrSensitiveVerified(!ocrSensitiveVerified)}
            >
              {ocrSensitiveVerified ? 'Revert to Raw OCR Draft' : 'Human Verify & Commit Clinical Record (Rule F137)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F138: Business Branded Mobile App */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Smartphone size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Business Branded Mobile App (F138)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">
                {mobileBiometricsAuthed ? 'Face ID / Touch ID Authenticated' : 'Guest / Pin Authentication'}
              </Badge>
              <Badge variant="muted">WB F62 Branded Native</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Dedicated client mobile app with studio visual branding, push notification itineraries, and complete data freedom.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>App Bundle ID:</div>
                <strong style={{ fontSize: '0.75rem' }}>com.posie.beverly</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Custom Domain:</div>
                <strong style={{ fontSize: '0.75rem' }}>book.posieatelier.com</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Push Channels:</div>
                <strong style={{ color: '#2B5329' }}>Reminders, Aftercare</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Data Export Fee:</div>
                <strong style={{ color: '#2B5329' }}>$0.00 (Rule DR06)</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              📱 <strong>WB F62 Invariant:</strong> Each supported app receives security updates and has an exit plan. Clients enjoy a seamless branded experience matching web booking with zero platform extortion fees.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMobileBiometricsAuthed(!mobileBiometricsAuthed)}
            >
              Toggle Biometric Authentication ({mobileBiometricsAuthed ? 'Simulate Passcode PIN' : 'Simulate Face ID'})
            </Button>
          </div>
        </Card>
      </section>

      {/* F139: Multi Location Operations */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Multi-Location Operations &amp; Enterprise Reach (F139)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Consolidated Enterprise: 5 Unique Clients</Badge>
              <Badge variant="muted">WB F59 Enterprise</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Coordinates multi-atelier groups with cross-location entitlements and deduplicated client reach reporting.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Total Gross Revenue:</div>
                <strong style={{ color: '#2B5329' }}>$22,300.00</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Total Appointments:</div>
                <strong>90 Visits (2 Locations)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Deduplicated Clients:</div>
                <strong style={{ color: '#2B5329' }}>5 Unique (No Double Count)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Cross-Visit Rate:</div>
                <strong>28.6% Shared Reach</strong>
              </div>
            </div>

            <div style={{ background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '10px', fontSize: '0.8rem', marginBottom: '10px' }}>
              <div>• <strong>Beverly Hills Atelier:</strong> $12,500.00 (50 visits, 4 unique clients) • Tax: 9.5%</div>
              <div style={{ marginTop: '4px' }}>• <strong>Soho Manhattan Studio:</strong> $9,800.00 (40 visits, 3 unique clients) • Tax: 8.875%</div>
              <div style={{ marginTop: '4px', color: '#2B5329' }}>• <strong>Cross-Location Perk:</strong> Gift Card #GC-100 redeemed at both Beverly Hills and Soho seamlessly.</div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🏢 <strong>WB F59 Invariant:</strong> Location consolidation avoids double-counting shared clients. Reporting deduplicates multi-location visitors while physical locations retain municipal tax and lease autonomy.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={selectedEnterpriseLocation === 'all' ? 'primary' : 'outline'}
              onClick={() => setSelectedEnterpriseLocation('all')}
            >
              Enterprise Consolidated View
            </Button>
            <Button
              size="sm"
              variant={selectedEnterpriseLocation === 'beverly' ? 'primary' : 'outline'}
              onClick={() => setSelectedEnterpriseLocation('beverly')}
            >
              Beverly Hills Atelier
            </Button>
            <Button
              size="sm"
              variant={selectedEnterpriseLocation === 'soho' ? 'primary' : 'outline'}
              onClick={() => setSelectedEnterpriseLocation('soho')}
            >
              Soho Manhattan Studio
            </Button>
          </div>
        </Card>
      </section>

      {/* F140: Booth Renter Merchant Separation */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Coins size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Booth Renter Merchant Separation (F140)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Destination Split: $165.00 Direct to Renter</Badge>
              <Badge variant="muted">Stripe Custom Connect / WB F37</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Independent merchant architecture for 1099 booth renters with direct bank payouts and firewalled client lists.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Renter: Sienna Woods Esthetics LLC (acct_renter_99182)
              </strong>
              <span style={{ fontSize: '0.82rem', color: '#2B5329', fontWeight: 600 }}>
                Zero Co-Mingling Verified
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Total Client Paid:</div>
                <strong>$180.00 ($150 + $30 tip)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Salon Facility Fee (10%):</div>
                <strong>-$15.00 (Salon Revenue)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Renter Direct Net Transfer:</div>
                <strong style={{ color: '#2B5329' }}>$165.00 (To Renter Bank)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Client Data Ownership:</div>
                <strong style={{ color: '#2B5329' }}>Firewalled from Owner</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🔒 <strong>WB F37 Invariant:</strong> Shared checkout does not mix legal ownership or bank balances. Funds route directly to the independent contractor's bank account, and client books belong exclusively to the booth renter.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={renterSplitSimulated ? 'primary' : 'outline'}
              onClick={() => setRenterSplitSimulated(!renterSplitSimulated)}
            >
              Verify Destination Stripe Split (WB F37)
            </Button>
          </div>
        </Card>
      </section>

      {/* F141: Embedded Payroll */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Embedded Payroll &amp; Multi-Provider Sync (F141)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={payrollSubmittedToPartner ? 'sage' : 'muted'}>
                {payrollSubmittedToPartner ? 'Submitted to Gusto Embedded' : 'Draft Preview'}
              </Badge>
              <Badge variant="muted">WB F55 R05 / Rule F141</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Direct embedded payroll execution through approved partners with tax withholdings, tip sync, and accountable human signatory audit trails.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Pay Period: Oct 15 – Oct 31, 2026 (Partner: Gusto Embedded / Check HQ)
              </strong>
              <span style={{ fontSize: '0.82rem', color: payrollCorrectionActive ? '#A65B32' : '#2B5329', fontWeight: 600 }}>
                {payrollCorrectionActive ? '⚠️ Filing Exception Flagged (Correction Audited)' : 'Compliant Filing Prepared'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Total Gross Earnings:</div>
                <strong>{payrollCorrectionActive ? '$4,450.00' : '$4,350.00'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Statutory Withholdings:</div>
                <strong>-$553.00 (FICA + State/Fed)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Employer FICA Match:</div>
                <strong>$153.00 (7.65% W-2)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Net Direct Deposit:</div>
                <strong style={{ color: '#2B5329' }}>{payrollCorrectionActive ? '$3,897.00' : '$3,797.00'}</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              ⚖️ <strong>WB F55 Invariant:</strong> Provider-ready export precedes embedded payroll; direct filings mandate a named human authorizer (Elena Rostova, IP 192.168.1.42). Retroactive adjustments flag exceptions for automated partner re-sync.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={payrollSubmittedToPartner ? 'primary' : 'outline'}
              onClick={() => setPayrollSubmittedToPartner(!payrollSubmittedToPartner)}
            >
              {payrollSubmittedToPartner ? 'Re-open Draft Run' : 'Authorize & Submit to Gusto (Rule F141)'}
            </Button>
            <Button
              size="sm"
              variant={payrollCorrectionActive ? 'outline' : 'secondary'}
              onClick={() => setPayrollCorrectionActive(!payrollCorrectionActive)}
            >
              {payrollCorrectionActive ? 'Clear Correction' : 'Simulate Retroactive Tip Correction (+$100)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F142: Offline Operational Changes */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Offline Operational Changes &amp; Outage Continuity (F142)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={offlineSimulatedMode ? 'rose' : 'sage'}>
                {offlineSimulatedMode ? 'Network Offline (Local Queue)' : 'Connected (Synced)'}
              </Badge>
              <Badge variant="muted">WB F60 / Rule F142</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Local-first operational queuing during connectivity outages with zero double-billing and staff-mediated conflict triage upon reconnection.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Device: iPad Atelier Front Desk (ipad_frontdesk_01)
              </strong>
              <span style={{ fontSize: '0.82rem', color: offlineConflictResolved ? '#2B5329' : '#A65B32', fontWeight: 600 }}>
                {offlineConflictResolved ? 'All Actions Reconciled' : '1 Remote Conflict Flagged'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Client Check-in:</div>
                <strong style={{ color: '#2B5329' }}>Chloe Dupont (Synced OK)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Deferred Payment Capture:</div>
                <strong style={{ color: '#2B5329' }}>$125.00 Tokenized (No Double Charge)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Remote Cancellation Conflict:</div>
                <strong style={{ color: offlineConflictResolved ? '#2B5329' : '#A65B32' }}>
                  {offlineConflictResolved ? 'Discarded by Staff (No Charge)' : 'Devon Smith (Cancelled Online)'}
                </strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🛡️ <strong>Rule DR06 Invariant:</strong> Reconnection cannot double-charge or silently overwrite client bookings. Unsafe actions (refunds, calendar wipes) are hard-blocked offline.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={offlineSimulatedMode ? 'primary' : 'outline'}
              onClick={() => setOfflineSimulatedMode(!offlineSimulatedMode)}
            >
              {offlineSimulatedMode ? 'Restore Network Connection' : 'Simulate Atelier Wi-Fi Outage'}
            </Button>
            <Button
              size="sm"
              variant={offlineConflictResolved ? 'outline' : 'secondary'}
              onClick={() => setOfflineConflictResolved(!offlineConflictResolved)}
            >
              {offlineConflictResolved ? 'Re-open Conflict' : 'Resolve Conflict via Staff Triage (Rule F142)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F143: Schedule Optimization */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Schedule Optimization &amp; Better Working Week (F143)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={scheduleOptimizationApplied ? 'sage' : 'muted'}>
                {scheduleOptimizationApplied ? 'Compact Schedule (Friday Off Achieved)' : 'Baseline Schedule'}
              </Badge>
              <Badge variant="muted">WB F20 / Rule F143</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Intelligent schedule compacting that eliminates awkward dead zones and secures practitioner lifestyle goals while monitoring contribution floors.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Target Quality-of-Life: Fridays Off | Weekly Contribution Floor: $1,500.00
              </strong>
              <span style={{ fontSize: '0.82rem', color: '#2B5329', fontWeight: 600 }}>
                {scheduleOptimizationApplied ? 'Zero Fragmented Dead Gaps' : '20 min Dead Gap Detected'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Dead Gap Compacting:</div>
                <strong style={{ color: scheduleOptimizationApplied ? '#2B5329' : '#A65B32' }}>
                  {scheduleOptimizationApplied ? 'Shifted +20m (11:15 AM)' : '20 min Gap (11:15-11:35)'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Friday Consolidation:</div>
                <strong style={{ color: '#2B5329' }}>
                  {scheduleOptimizationApplied ? 'Moved to Thursday 3:30 PM' : '1 Flexible Appt on Friday'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Total Time Saved:</div>
                <strong style={{ color: '#2B5329' }}>{scheduleOptimizationApplied ? '80 Minutes Compacted' : '0 Minutes'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Disruption Risk:</div>
                <strong style={{ color: '#2B5329' }}>Low (Client Pre-Flex Consented)</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              ✨ <strong>Rule DR03 Invariant:</strong> Schedule suggestions expose transparent tradeoffs and mandate practitioner approval. Never silently moves client bookings without consent.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={scheduleOptimizationApplied ? 'primary' : 'outline'}
              onClick={() => setScheduleOptimizationApplied(!scheduleOptimizationApplied)}
            >
              {scheduleOptimizationApplied ? 'Revert to Baseline Schedule' : 'Apply Optimization Plan (WB F20)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F144: Mobile Service Routes */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Mobile Service Routes &amp; Travel Fee Automation (F144)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Itinerary: 2 Stops ($870.00 Total)</Badge>
              <Badge variant="muted">WB F44 / D22</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Travel time coordination, tiered mileage pricing, setup/teardown buffers, and automated late-arrival updates for mobile practitioners.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Provider: Daniela Cruz | Base Atelier: 100 Maiden Lane, San Francisco
              </strong>
              <span style={{ fontSize: '0.82rem', color: mobileTrafficAlertSent ? '#A65B32' : '#2B5329', fontWeight: 600 }}>
                {mobileTrafficAlertSent ? '⚠️ Traffic Alert Dispatched (+15m)' : 'On-Time Schedule'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Stop 1 (Bridal Party):</div>
                <strong>5 mi ($30 flat dispatch fee)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Stop 2 (In-Home Facial):</div>
                <strong>18 mi ($46 fee: $30 + 8mi @ $2)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Setup / Pack Buffers:</div>
                <strong>15m Setup + 15m Sanitation</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Client ETA Notification:</div>
                <strong style={{ color: mobileTrafficAlertSent ? '#A65B32' : '#2B5329' }}>
                  {mobileTrafficAlertSent ? 'Updated to 8:15 AM (SMS Sent)' : '8:00 AM (Confirmed)'}
                </strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🚗 <strong>WB F44 Invariant:</strong> Route estimates cannot override client commitments without approval. Delays exceeding 5m automatically dispatch transparent, polite arrival window updates.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={mobileTrafficAlertSent ? 'outline' : 'primary'}
              onClick={() => setMobileTrafficAlertSent(!mobileTrafficAlertSent)}
            >
              {mobileTrafficAlertSent ? 'Reset Traffic Status' : 'Simulate Traffic Delay Alert (+15m SMS)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F145: Constrained AI Receptionist */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PhoneCall size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Constrained AI Receptionist &amp; Verified Handoff (F145)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={receptionistSafetyEscalation ? 'rose' : 'sage'}>
                {receptionistSafetyEscalation ? 'Urgent Clinical Triage' : 'Knowledge Base Constrained'}
              </Badge>
              <Badge variant="muted">WB F64 / SQUIRE / Rule F145</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Deterministic phone and SMS conversational assistant strictly bounded by approved studio policies, caller OTP verification, and truthful human handoff.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Caller: Hannah Vance (415-555-8811) | Studio: Posie Maison San Francisco
              </strong>
              <span style={{ fontSize: '0.82rem', color: receptionistCallerVerified ? '#2B5329' : '#666', fontWeight: 600 }}>
                {receptionistCallerVerified ? 'Identity Verified (SMS OTP)' : 'Unverified Caller Session'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Verified Catalog Pricing:</div>
                <strong style={{ color: '#2B5329' }}>Signature Facial ($195.00 / 60m)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Booking Permissions Gate:</div>
                <strong style={{ color: receptionistCallerVerified ? '#2B5329' : '#A65B32' }}>
                  {receptionistCallerVerified ? 'Slot Reserved: Tomorrow 2:00 PM' : 'Blocked (Requires OTP PIN)'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Safety Escalation Triage:</div>
                <strong style={{ color: receptionistSafetyEscalation ? '#A65B32' : '#2B5329' }}>
                  {receptionistSafetyEscalation ? 'Allergy Query Flagged to Staff' : 'Zero Hallucinations Guarded'}
                </strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🛡️ <strong>Rule DR04 &amp; DR06 Invariant:</strong> The AI receptionist never guesses or invents pricing. Clinical questions (retinol allergies, medical reactions) immediately escalate to front-desk staff with an unedited transcript.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={receptionistCallerVerified ? 'primary' : 'outline'}
              onClick={() => setReceptionistCallerVerified(!receptionistCallerVerified)}
            >
              {receptionistCallerVerified ? 'Revoke Verification' : 'Verify Caller Phone via OTP (PIN 4921)'}
            </Button>
            <Button
              size="sm"
              variant={receptionistSafetyEscalation ? 'outline' : 'secondary'}
              onClick={() => setReceptionistSafetyEscalation(!receptionistSafetyEscalation)}
            >
              {receptionistSafetyEscalation ? 'Clear Safety Flag' : 'Simulate Medical Allergy Query (Safety Handoff)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F146: Reliable Booking Across Channels */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RotateCcw size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Reliable Booking Across Channels (F146)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Channel: {crossChannelActive.toUpperCase()}</Badge>
              <Badge variant="muted">WB F64 / Rule F146</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Unified omnichannel booking orchestration preserving reservation identity across Voice AI, interactive SMS, and Web without phantom bookings.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Active Reservation: res_sara_99120 | Client: Sara Kensington (415-555-7722)
              </strong>
              <span style={{ fontSize: '0.82rem', color: '#2B5329', fontWeight: 600 }}>
                Zero Duplicate Bookings Verified
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Originating Channel:</div>
                <strong style={{ color: '#2B5329' }}>Voice AI (Inquiry Hold)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Handoff Confirmation:</div>
                <strong style={{ color: '#2B5329' }}>SMS Secure Link (Confirmed)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Web Reschedule Sync:</div>
                <strong style={{ color: '#2B5329' }}>Rescheduled to 4:30 PM</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Action Audit Receipts:</div>
                <strong>3 Immutable Receipts Logged</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🔁 <strong>WB F64 Invariant:</strong> Shared action tools and confirmation rules. Channel switching does not create another booking; every state change generates an authorized audit receipt.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={crossChannelActive === 'voice' ? 'primary' : 'outline'}
              onClick={() => setCrossChannelActive('voice')}
            >
              Voice AI Hold
            </Button>
            <Button
              size="sm"
              variant={crossChannelActive === 'sms' ? 'primary' : 'outline'}
              onClick={() => setCrossChannelActive('sms')}
            >
              SMS Handoff Confirmation
            </Button>
            <Button
              size="sm"
              variant={crossChannelActive === 'web' ? 'primary' : 'outline'}
              onClick={() => setCrossChannelActive('web')}
            >
              Web Portal Reschedule (Rule F146)
            </Button>
          </div>
        </Card>
      </section>

      {/* F147: Screen-Aware Assistant */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Screen-Aware Assistant &amp; Consequential Diffs (F147)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={assistantRole === 'owner' ? 'sage' : 'muted'}>
                Role: {assistantRole === 'owner' ? 'Salon Owner' : 'Front Desk (Scoped)'}
              </Badge>
              <Badge variant="muted">WB F65 / Rule F147</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Understands the active screen and record, previews proposed mutations with field-by-field diffs, and strictly enforces role permissions.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Active Screen: Checkout Ticket #tkt_8819 | Client: Julianne Moore
              </strong>
              <span style={{ fontSize: '0.82rem', color: assistantRole === 'front_desk' ? '#A65B32' : '#2B5329', fontWeight: 600 }}>
                {assistantRole === 'front_desk' ? '⚠️ 15% Discount Action Declined (Unauthorized)' : 'Consequential Diff Pending Approval'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Original Ticket Total:</div>
                <strong>$200.00 (Standard Service)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Proposed Consequential Diff:</div>
                <strong style={{ color: assistantDiscountConfirmed ? '#2B5329' : '#A65B32' }}>
                  {assistantDiscountConfirmed ? '-$30.00 Applied ($170.00)' : 'Apply 15% Courtesy Discount'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Human Confirmation Gate:</div>
                <strong style={{ color: assistantDiscountConfirmed ? '#2B5329' : '#666' }}>
                  {assistantDiscountConfirmed ? 'Elena Rostova (Confirmed)' : 'Awaiting Explicit Click'}
                </strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🛡️ <strong>Rule DR03 &amp; DR06 Invariant:</strong> Role-aware context and action logs. Unsupported actions are declined, and consequential financial or medical edits strictly require explicit human operator confirmation.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={assistantRole === 'owner' ? 'primary' : 'outline'}
              onClick={() => {
                const nextRole = assistantRole === 'owner' ? 'front_desk' : 'owner';
                setAssistantRole(nextRole);
                if (nextRole === 'front_desk') setAssistantDiscountConfirmed(false);
              }}
            >
              Switch Role to {assistantRole === 'owner' ? 'Front Desk (Simulate Rejection)' : 'Salon Owner'}
            </Button>
            {assistantRole === 'owner' && (
              <Button
                size="sm"
                variant={assistantDiscountConfirmed ? 'outline' : 'secondary'}
                onClick={() => setAssistantDiscountConfirmed(!assistantDiscountConfirmed)}
              >
                {assistantDiscountConfirmed ? 'Revoke Discount' : 'Confirm Consequential 15% Diff (Rule F147)'}
              </Button>
            )}
          </div>
        </Card>
      </section>

      {/* F148: Draft Notes from Dictation */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Draft Notes from Dictation &amp; Clinical Locking (F148)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={dictationSigned ? 'sage' : dictationFlagsResolved ? 'muted' : 'rose'}>
                {dictationSigned ? 'Practitioner Signed (Locked)' : dictationFlagsResolved ? 'Draft Ready for Sign' : 'Phonetic Triage Flagged'}
              </Badge>
              <Badge variant="muted">WB F66 / Rule F148</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Consented audio dictation converted into structured SOAP chart drafts with phonetic clinical triage flags and licensed practitioner locking.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Provider: Daniela Cruz, LE (Lic #LE-CA-88192) | Consent: Verified on File
              </strong>
              <span style={{ fontSize: '0.82rem', color: dictationFlagsResolved ? '#2B5329' : '#A65B32', fontWeight: 600 }}>
                {dictationFlagsResolved ? 'All Clinical Terms Verified' : '2 Terms Flagged: "erythema", "tretinoin"'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Subjective (0-30s):</div>
                <strong style={{ fontSize: '0.75rem' }}>Mild dehydration after flight</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Objective (30-66s):</div>
                <strong style={{ fontSize: '0.75rem', color: dictationFlagsResolved ? '#2B5329' : '#A65B32' }}>
                  {dictationFlagsResolved ? 'Erythema across cheeks verified' : 'Flagged: "erythema"'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Assessment (66-90s):</div>
                <strong style={{ fontSize: '0.75rem', color: dictationFlagsResolved ? '#2B5329' : '#A65B32' }}>
                  {dictationFlagsResolved ? 'Pause tretinoin for 5d verified' : 'Flagged: "tretinoin"'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Plan (90-120s):</div>
                <strong style={{ fontSize: '0.75rem' }}>Calming hyaluronic infusion</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              📝 <strong>WB F66 Invariant:</strong> The professional reviews and signs; AI drafts stay unfinalized until approved. Uncertain phonetic clinical terms remain flagged to guarantee patient medical chart safety.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={dictationFlagsResolved ? 'primary' : 'outline'}
              onClick={() => {
                setDictationFlagsResolved(!dictationFlagsResolved);
                if (dictationSigned) setDictationSigned(false);
              }}
            >
              {dictationFlagsResolved ? 'Reset Triage Flags' : 'Verify Flagged Terms (Daniela Cruz)'}
            </Button>
            <Button
              size="sm"
              variant={dictationSigned ? 'outline' : 'secondary'}
              disabled={!dictationFlagsResolved}
              onClick={() => setDictationSigned(!dictationSigned)}
            >
              {dictationSigned ? 'Unlock Note (Simulate Amendment)' : 'Sign & Lock Note with License (LE-CA-88192)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F149: Ask Questions of Business Data */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Ask Questions of Business Data (F149)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Governed Metric Engine</Badge>
              <Badge variant="muted">WB F65 / F111 / Rule F149</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Governed natural-language analytics inquiries strictly evaluated against official metric definitions and declared filters with zero hallucinated numbers.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Query: &quot;{governedQueryMetric === 'contribution_margin' ? 'What is our direct contribution margin this month?' : 'What is our rebooking rate at checkout?'}&quot;
              </strong>
              <span style={{ fontSize: '0.82rem', color: governedQueryMetric === 'contribution_margin' ? '#2B5329' : '#A65B32', fontWeight: 600 }}>
                {governedQueryMetric === 'contribution_margin' ? 'Sufficient Data (5 Records)' : '⚠️ Insufficient Data (<5 Records)'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Governed Formula:</div>
                <strong style={{ fontSize: '0.75rem' }}>
                  {governedQueryMetric === 'contribution_margin'
                    ? '(Revenue - Pay - Backbar) / Revenue'
                    : 'Rebooked Checkouts / Total Checkouts'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Computed Result:</div>
                <strong style={{ color: governedQueryMetric === 'contribution_margin' ? '#2B5329' : '#A65B32' }}>
                  {governedQueryMetric === 'contribution_margin' ? '72.0% Contribution Margin' : 'Insufficient Data (Truthful Fallback)'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Reproducible Report Link:</div>
                <strong style={{ color: '#2B5329' }}>/admin/reports?metric={governedQueryMetric}</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              📊 <strong>WB F65 Invariant:</strong> The answer reproduces a saved report or clearly says data are insufficient. Operates without direct unrestricted database access, preventing speculative hallucinations.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={governedQueryMetric === 'contribution_margin' ? 'primary' : 'outline'}
              onClick={() => setGovernedQueryMetric('contribution_margin')}
            >
              Query Contribution Margin (Sufficient Data)
            </Button>
            <Button
              size="sm"
              variant={governedQueryMetric === 'rebooking_rate' ? 'primary' : 'outline'}
              onClick={() => setGovernedQueryMetric('rebooking_rate')}
            >
              Query Rebooking Rate (Demonstrate Insufficient Data)
            </Button>
          </div>
        </Card>
      </section>

      {/* F150: Forecast Demand and Staffing */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarCheck size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Forecast Demand and Staffing (F150)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">Horizon: {forecastHorizon === '30_days' ? '30 Days (4 Weeks)' : '7 Days (Cold Start)'}</Badge>
              <Badge variant="muted">WB F150 / Rule F150</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Empirical demand and staffing forecasting with 80% confidence intervals, cancellation exposure modeling, and graceful degradation for new studios.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Studio Model: {forecastHorizon === '30_days' ? 'Established Atelier (4 Weeks Analyzed)' : 'Cold-Start Studio (1 Week Analyzed)'}
              </strong>
              <span style={{ fontSize: '0.82rem', color: forecastHorizon === '30_days' ? '#2B5329' : '#A65B32', fontWeight: 600 }}>
                {forecastHorizon === '30_days' ? '80% CI: [42 – 56] Appointments/Wk' : '⚠️ Cold Start: Uncertainty Widened (±30%)'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Expected Demand:</div>
                <strong style={{ color: '#2B5329' }}>{forecastHorizon === '30_days' ? '196 Appointments' : '28 Appointments'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Recommended Labor:</div>
                <strong>{forecastHorizon === '30_days' ? '245 Staff Hours' : '35 Staff Hours'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Cancellation Exposure:</div>
                <strong style={{ color: '#A65B32' }}>{forecastHorizon === '30_days' ? '24 Appts ($3,240)' : '3 Appts ($405)'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Capacity Utilization:</div>
                <strong>{forecastHorizon === '30_days' ? '89% (Optimal)' : '78% (Conservative)'}</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              📈 <strong>WB F150 Invariant:</strong> Forecasts are evaluated on future periods with transparent uncertainty bounds and comparisons against simple 4-week moving baselines; new businesses degrade gracefully without false precision.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={forecastHorizon === '30_days' ? 'primary' : 'outline'}
              onClick={() => setForecastHorizon('30_days')}
            >
              Established Studio Forecast (30 Days)
            </Button>
            <Button
              size="sm"
              variant={forecastHorizon === '7_days_cold_start' ? 'primary' : 'outline'}
              onClick={() => setForecastHorizon('7_days_cold_start')}
            >
              Cold-Start Studio Forecast (Degraded Baseline)
            </Button>
          </div>
        </Card>
      </section>

      {/* F151: What-If Business Planning */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                What-If Business Planning &amp; Time-Off Safeguards (F151)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={whatIfActiveScenario === 'four_day_week' ? 'sage' : 'rose'}>
                {whatIfActiveScenario === 'four_day_week' ? 'Contribution Floor Met ($2,840/wk)' : 'Floor Deficit (-$220/wk)'}
              </Badge>
              <Badge variant="muted">WB F151 / Rule F151</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Interactive scenario modeling allowing salon owners to protect lifestyle time off (4-day work week) while safeguarding mandatory contribution floors.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Scenario: {whatIfActiveScenario === 'four_day_week' ? 'Balanced Growth & 4-Day Work Week (+15% Price, 1 Assistant)' : 'Discount Volume Push (-20% Price, High Workload)'}
              </strong>
              <span style={{ fontSize: '0.82rem', color: whatIfActiveScenario === 'four_day_week' ? '#2B5329' : '#A65B32', fontWeight: 600 }}>
                {whatIfActiveScenario === 'four_day_week' ? 'Target Workload Achieved (32h/wk)' : 'Owner Overworked (50h/wk)'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Gross Revenue:</div>
                <strong>{whatIfActiveScenario === 'four_day_week' ? '$6,262.00/wk' : '$5,200.00/wk'}</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Net Contribution:</div>
                <strong style={{ color: whatIfActiveScenario === 'four_day_week' ? '#2B5329' : '#A65B32' }}>
                  {whatIfActiveScenario === 'four_day_week' ? '$2,840.00/wk (Floor: $2.5k)' : '$2,280.00/wk (Floor Failed)'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Owner Hours:</div>
                <strong style={{ color: whatIfActiveScenario === 'four_day_week' ? '#2B5329' : '#A65B32' }}>
                  {whatIfActiveScenario === 'four_day_week' ? '32h (-16h Saved)' : '50h (+2h Added)'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Strategic Verdict:</div>
                <strong style={{ color: whatIfActiveScenario === 'four_day_week' ? '#2B5329' : '#A65B32' }}>
                  {whatIfActiveScenario === 'four_day_week' ? 'Balanced Win' : 'Margin Erosion'}
                </strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              ⚖️ <strong>WB F151 Invariant:</strong> Scenarios use trusted historical costs and explicit owner assumptions. Scenarios never become actual schedules without validation; owner time off is explicitly protected.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={whatIfActiveScenario === 'four_day_week' ? 'primary' : 'outline'}
              onClick={() => setWhatIfActiveScenario('four_day_week')}
            >
              Simulate 4-Day Work Week &amp; Price Adjustment
            </Button>
            <Button
              size="sm"
              variant={whatIfActiveScenario === 'discount_volume' ? 'primary' : 'outline'}
              onClick={() => setWhatIfActiveScenario('discount_volume')}
            >
              Simulate Discount Volume Strategy (Margin Risk)
            </Button>
          </div>
        </Card>
      </section>

      {/* F152: Measured Growth Experiments */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Measured Growth Experiments &amp; Holdouts (F152)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="sage">50% Randomized Holdout Control</Badge>
              <Badge variant="muted">WB F152 / Rule F152</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            A/B and randomized holdout experiment infrastructure measuring true causal conversion uplift against controls while guarding against margin cannibalization.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Test: Off-Peak Thursday 15% Courtesy Incentive | Approved by: Elena Rostova
              </strong>
              <span style={{ fontSize: '0.82rem', color: '#2B5329', fontWeight: 600 }}>
                Causal Uplift Confirmed (+24.0%)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Treatment Conversion:</div>
                <strong style={{ color: '#2B5329' }}>64.0% (16 / 25 completed)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Holdout Control:</div>
                <strong>40.0% (10 / 25 completed)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Incremental Contribution:</div>
                <strong style={{ color: '#2B5329' }}>+$675.00 Net Gain</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Client Opt-Out Rate:</div>
                <strong style={{ color: '#2B5329' }}>4.0% (Balanced with Control)</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🧪 <strong>WB F152 Invariant:</strong> Consent, allocation and outcome events. Results distinguish causal tests from simple before-and-after trends; marketing experiments mandate owner approval.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={experimentStatus === 'statistically_significant' ? 'primary' : 'outline'}
              onClick={() => setExperimentStatus(experimentStatus === 'statistically_significant' ? 'running' : 'statistically_significant')}
            >
              {experimentStatus === 'statistically_significant' ? 'View Ongoing Run' : 'Evaluate Causal Uplift (Rule F152)'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F153: Cancellation Policy Simulator */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Cancellation Policy Simulator &amp; Blast Radius (F153)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={simulatedPolicyType === 'moderate_30' ? 'sage' : 'rose'}>
                {simulatedPolicyType === 'moderate_30' ? 'Net Positive (+$780/mo)' : 'Net Negative Drop (-$650/mo)'}
              </Badge>
              <Badge variant="muted">WB F153 / Rule F153</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Rehearses the financial tradeoffs between upfront booking deposit friction, checkout conversion drops, and recovered funds from uncollectible no-shows.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Proposed: {simulatedPolicyType === 'moderate_30' ? 'Moderate $30 Deposit with 24h Window' : 'Extreme 100% Prepayment with 48h Window'}
              </strong>
              <span style={{ fontSize: '0.82rem', color: simulatedPolicyType === 'moderate_30' ? '#2B5329' : '#A65B32', fontWeight: 600 }}>
                {simulatedPolicyType === 'moderate_30' ? 'Conversion Friction: -3.5%' : 'Conversion Friction: -20.0% (Repels Clients)'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Checkout Conversion:</div>
                <strong style={{ color: simulatedPolicyType === 'moderate_30' ? '#2B5329' : '#A65B32' }}>
                  {simulatedPolicyType === 'moderate_30' ? '71.5% (286 Bookings)' : '55.0% (220 Bookings)'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>No-Show Reduction:</div>
                <strong style={{ color: '#2B5329' }}>
                  {simulatedPolicyType === 'moderate_30' ? '-55% (Down to 7)' : '-70% (Down to 4)'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Recovered Deposit Fees:</div>
                <strong style={{ color: '#2B5329' }}>
                  {simulatedPolicyType === 'moderate_30' ? '+$1,120.00/mo' : '+$1,850.00/mo'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Net Monthly Impact:</div>
                <strong style={{ color: simulatedPolicyType === 'moderate_30' ? '#2B5329' : '#A65B32' }}>
                  {simulatedPolicyType === 'moderate_30' ? '+$780.00 Net Gain' : '-$650.00 Drop in Margin'}
                </strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🛡️ <strong>WB F153 Invariant:</strong> Transparent policy design. Estimates tradeoffs between deposits, conversion, and cancellations before live rollout to avoid sudden turn-aways.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={simulatedPolicyType === 'moderate_30' ? 'primary' : 'outline'}
              onClick={() => setSimulatedPolicyType('moderate_30')}
            >
              Simulate Moderate $30 Deposit Policy
            </Button>
            <Button
              size="sm"
              variant={simulatedPolicyType === 'extreme_100' ? 'primary' : 'outline'}
              onClick={() => setSimulatedPolicyType('extreme_100')}
            >
              Simulate 100% Prepayment Policy (Friction Risk)
            </Button>
          </div>
        </Card>
      </section>

      {/* F154: Service Match Assistant */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartPulse size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Service Match Assistant &amp; Clinical Safety (F154)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={matchClinicalGuardrailTriggered ? 'rose' : 'sage'}>
                {matchClinicalGuardrailTriggered ? 'Clinical Referral Required' : 'Catalog Match Verified (94%)'}
              </Badge>
              <Badge variant="muted">WB F154 / Rule F154</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Interactive treatment navigation matching skin/hair goals and budgets against catalog services, with hard medical contraindication guardrails.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Client Profile: {matchClinicalGuardrailTriggered ? 'Medical Note: Active Retinol Burn / Severe Peeling' : 'Goal: Dehydration, Dullness | Skin: Sensitive Fitzpatrick II'}
              </strong>
              <span style={{ fontSize: '0.82rem', color: matchClinicalGuardrailTriggered ? '#A65B32' : '#2B5329', fontWeight: 600 }}>
                {matchClinicalGuardrailTriggered ? '⚠️ Hard-Stop: Consult Lead Practitioner' : 'Hydra-Dew Glass Glow Facial ($140.00)'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Match Score:</div>
                <strong style={{ color: matchClinicalGuardrailTriggered ? '#A65B32' : '#2B5329' }}>
                  {matchClinicalGuardrailTriggered ? '0% (Referral Triggered)' : '94% (Target Concerns Matched)'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Budget &amp; Schedule Fit:</div>
                <strong>
                  {matchClinicalGuardrailTriggered ? 'N/A (Clinical Prerequisite)' : 'Within Budget ($140 < $180, 60m)'}
                </strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Safety Assessment:</div>
                <strong style={{ color: matchClinicalGuardrailTriggered ? '#A65B32' : '#2B5329' }}>
                  {matchClinicalGuardrailTriggered ? 'Referred: Compl. 15m Consult' : 'Zero Contraindications'}
                </strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              🩺 <strong>WB F154 Invariant:</strong> Medical questions or ambiguous eligibility are immediately referred to a licensed professional rather than offering automated chemical exfoliations.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={matchClinicalGuardrailTriggered ? 'outline' : 'primary'}
              onClick={() => setMatchClinicalGuardrailTriggered(!matchClinicalGuardrailTriggered)}
            >
              {matchClinicalGuardrailTriggered ? 'Reset to Standard Guest Match' : 'Simulate Retinol Allergy / Clinical Referral'}
            </Button>
          </div>
        </Card>
      </section>

      {/* F155: Purchasing Recommendations */}
      <section style={{ marginBottom: '32px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={20} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: 0 }}>
                Purchasing Recommendations &amp; Draft POs (F155)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant={poDraftApproved ? 'sage' : 'muted'}>
                {poDraftApproved ? 'PO Authorized (PO-LUX-88192)' : 'Draft PO Pending Approval ($360.00)'}
              </Badge>
              <Badge variant="muted">WB F155 / Rule F155</Badge>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Demand-driven inventory replenishment calculating reorders from booked appointment commitments, lead times, and owner budget caps.
          </p>

          <div style={{ background: '#FAF8F5', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                Supplier: Luxe Derm Supply | Budget Cap: $500.00 (Plan Total: $360.00)
              </strong>
              <span style={{ fontSize: '0.82rem', color: poDraftApproved ? '#2B5329' : '#A65B32', fontWeight: 600 }}>
                {poDraftApproved ? 'Authorized by Elena Rostova' : 'Urgent Reorder: Hyaluronic Backbar (2 packs)'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.8rem', marginBottom: '12px' }}>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Stock on Hand:</div>
                <strong style={{ color: '#A65B32' }}>2 units (3 Committed)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Supplier Lead Time:</div>
                <strong>7 Days (MOQ: 4 units)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Recommended Order:</div>
                <strong style={{ color: '#2B5329' }}>8 Units (2 packs of 4)</strong>
              </div>
              <div style={{ background: '#FFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <div>Total Cost:</div>
                <strong>$360.00 (Within Budget)</strong>
              </div>
            </div>

            <div style={{ background: '#FFFDF9', border: '1px solid #E5E0D8', padding: '8px 12px', borderRadius: '4px', fontSize: '0.74rem', color: '#666' }}>
              📦 <strong>WB F155 Invariant:</strong> Generating recommendations or draft purchase orders never places orders or spends funds. The owner or authorized buyer explicitly approves costs and terms.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              size="sm"
              variant={poDraftApproved ? 'outline' : 'primary'}
              onClick={() => setPoDraftApproved(!poDraftApproved)}
            >
              {poDraftApproved ? 'Revoke Purchase Order' : 'Authorize & Sign Purchase Order (PO-LUX-88192)'}
            </Button>
          </div>
        </Card>
      </section>

















      {/* Booking Box */}
      <section>
        <Card style={{ border: '2px solid var(--color-primary)', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
            Ready to Reserve Your Visit?
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '20px' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Selected Treatment:</span>
            <strong>{activeServiceObj.name} (${activeServiceObj.price})</strong>
          </div>

          {bookingConfirmed ? (
            <div
              style={{
                backgroundColor: 'var(--color-secondary-light)',
                padding: '16px',
                borderRadius: '12px',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <CheckCircle2 size={24} color="var(--color-primary)" />
              <div>
                <strong>Appointment Snapshot Confirmed!</strong>
                <p style={{ fontSize: '0.85rem' }}>
                  Reserved directly on {brandData.name}'s verified domain.
                </p>
              </div>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => setBookingConfirmed(true)}
            >
              Confirm Reservation (No Account Needed)
            </Button>
          )}
        </Card>
      </section>
    </main>
  );
}
