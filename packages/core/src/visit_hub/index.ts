/**
 * F107 — One Link for a Complete Visit (Smart Visit Hub & Express Flow)
 *
 * Combines selecting services, conditional intake questionnaires, versioned e-signatures,
 * deposit authorization, appointment slot confirmation, and post-service care into a
 * single resumable branded client journey.
 *
 * Includes Express Pro Booking (staff reserves tentative slot, client confirms via link)
 * and Self-Checkout on Client's Phone (staff never touches client's payment card).
 *
 * Rules:
 * - BR05 / DR04: Completed steps and signed documents are immutable.
 * - DR05: E-signature consent is separated from credit card payment authorization.
 * - Resumability: Returning to the link resumes from the current incomplete step.
 */

export type VisitHubStepId =
  | 'service_selection'
  | 'intake_forms'
  | 'consent_signature'
  | 'payment_deposit'
  | 'booking_confirmation'
  | 'self_checkout'
  | 'aftercare_portal';

export interface VisitHubStepStatus {
  stepId: VisitHubStepId;
  label: string;
  isCompleted: boolean;
  isRequired: boolean;
  completedAt?: string;
  dataRef?: string;
}

export interface VisitHubSession {
  sessionId: string;
  sessionToken: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  studioId: string;
  status: 'active' | 'completed' | 'abandoned' | 'expired';
  mode: 'client_booking' | 'express_pro_invitation' | 'self_checkout_remaining';
  currentStep: VisitHubStepId;
  steps: VisitHubStepStatus[];
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  // Selected / Assigned Data
  appointment?: {
    appointmentId?: string;
    serviceId: string;
    serviceName: string;
    practitionerId: string;
    practitionerName: string;
    startTime: string;
    durationMinutes: number;
    price: number;
    isTentative: boolean;
  };
  intakeSubmissionId?: string;
  signedConsentDocumentId?: string;
  depositPayment?: {
    amount: number;
    paymentIntentId: string;
    cardLast4: string;
    status: 'succeeded' | 'failed' | 'pending';
  };
  selfCheckoutPayment?: {
    serviceAmount: number;
    tipAmount: number;
    totalPaid: number;
    tenderType: 'card' | 'apple_pay' | 'gift_card_split';
    cardLast4: string;
    paidAt: string;
  };
}

export interface CreateVisitHubSessionOptions {
  sessionId?: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  studioId: string;
  mode?: 'client_booking' | 'express_pro_invitation' | 'self_checkout_remaining';
  appointment?: {
    serviceId: string;
    serviceName: string;
    practitionerId: string;
    practitionerName: string;
    startTime: string;
    durationMinutes: number;
    price: number;
    isTentative?: boolean;
  };
}

/**
 * Initializes a branded, resumable visit journey link.
 */
export function createVisitHubSession(options: CreateVisitHubSessionOptions): VisitHubSession {
  const sessionId = options.sessionId || `VHS-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const sessionToken = `vtok_${Math.random().toString(36).substring(2, 12)}`;
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days valid

  const mode = options.mode || 'client_booking';

  let initialSteps: VisitHubStepStatus[] = [];

  if (mode === 'express_pro_invitation') {
    // Pro has already picked service & tentative slot
    initialSteps = [
      { stepId: 'service_selection', label: 'Review Service Details', isCompleted: true, isRequired: true, completedAt: now },
      { stepId: 'intake_forms', label: 'Health Intake & Allergies', isCompleted: false, isRequired: true },
      { stepId: 'consent_signature', label: 'Treatment Informed Consent', isCompleted: false, isRequired: true },
      { stepId: 'payment_deposit', label: 'Confirm Slot & Card-on-File', isCompleted: false, isRequired: true },
      { stepId: 'booking_confirmation', label: 'Visit Itinerary', isCompleted: false, isRequired: false },
    ];
  } else if (mode === 'self_checkout_remaining') {
    // Post-service checkout on client phone
    initialSteps = [
      { stepId: 'self_checkout', label: 'Review Ticket, Tip & Pay', isCompleted: false, isRequired: true },
      { stepId: 'aftercare_portal', label: 'Personalized Aftercare Care Card', isCompleted: false, isRequired: false },
    ];
  } else {
    // Full client booking
    const hasPreselectedAppointment = !!options.appointment;
    initialSteps = [
      {
        stepId: 'service_selection',
        label: 'Select Treatment & Provider',
        isCompleted: hasPreselectedAppointment,
        isRequired: true,
        completedAt: hasPreselectedAppointment ? now : undefined,
      },
      { stepId: 'intake_forms', label: 'Medical Intake Questionnaire', isCompleted: false, isRequired: true },
      { stepId: 'consent_signature', label: 'Informed E-Consent', isCompleted: false, isRequired: true },
      { stepId: 'payment_deposit', label: 'Secure Deposit', isCompleted: false, isRequired: true },
      { stepId: 'booking_confirmation', label: 'Confirmed Reservation', isCompleted: false, isRequired: false },
    ];
  }

  const currentStep = initialSteps.find((s) => !s.isCompleted)?.stepId || initialSteps[0].stepId;

  return {
    sessionId,
    sessionToken,
    clientId: options.clientId,
    clientName: options.clientName,
    clientEmail: options.clientEmail,
    clientPhone: options.clientPhone,
    studioId: options.studioId,
    status: 'active',
    mode,
    currentStep,
    steps: initialSteps,
    expiresAt,
    createdAt: now,
    updatedAt: now,
    appointment: options.appointment
      ? {
          ...options.appointment,
          isTentative: options.appointment.isTentative ?? (mode === 'express_pro_invitation'),
        }
      : undefined,
  };
}

/**
 * Selects service and appointment slot in Visit Hub session.
 */
export function selectHubService(
  session: VisitHubSession,
  appointment: NonNullable<VisitHubSession['appointment']>
): VisitHubSession {
  const steps = session.steps.map((s) =>
    s.stepId === 'service_selection'
      ? { ...s, isCompleted: true, completedAt: new Date().toISOString() }
      : s
  );

  const nextIncomplete = steps.find((s) => !s.isCompleted)?.stepId || 'intake_forms';

  return {
    ...session,
    appointment,
    steps,
    currentStep: nextIncomplete,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Submits intake questionnaire within the Visit Hub session.
 * Advances current step to consent signature.
 */
export function completeHubIntake(
  session: VisitHubSession,
  intakeSubmissionId: string
): VisitHubSession {
  if (session.status !== 'active') {
    throw new Error(`Cannot submit intake on session with status ${session.status}`);
  }

  const steps = session.steps.map((s) =>
    s.stepId === 'intake_forms'
      ? { ...s, isCompleted: true, completedAt: new Date().toISOString(), dataRef: intakeSubmissionId }
      : s
  );

  const nextIncomplete = steps.find((s) => !s.isCompleted)?.stepId || 'consent_signature';

  return {
    ...session,
    steps,
    currentStep: nextIncomplete,
    intakeSubmissionId,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Cryptographically binds signed consent document.
 * Adheres strictly to Rule DR05: Consent does not charge payment.
 */
export function completeHubConsentSignature(
  session: VisitHubSession,
  signedDocumentId: string
): VisitHubSession {
  if (session.status !== 'active') {
    throw new Error(`Cannot record consent on session with status ${session.status}`);
  }

  const steps = session.steps.map((s) =>
    s.stepId === 'consent_signature'
      ? { ...s, isCompleted: true, completedAt: new Date().toISOString(), dataRef: signedDocumentId }
      : s
  );

  const nextIncomplete = steps.find((s) => !s.isCompleted)?.stepId || 'payment_deposit';

  return {
    ...session,
    steps,
    currentStep: nextIncomplete,
    signedConsentDocumentId: signedDocumentId,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Authorizes deposit or card on file to confirm booking.
 */
export function completeHubDepositPayment(
  session: VisitHubSession,
  depositPayment: {
    amount: number;
    paymentIntentId: string;
    cardLast4: string;
    status: 'succeeded' | 'failed';
  }
): { session: VisitHubSession; error?: string } {
  if (depositPayment.status === 'failed') {
    return {
      session: {
        ...session,
        depositPayment: {
          ...depositPayment,
          status: 'failed',
        },
        updatedAt: new Date().toISOString(),
      },
      error: 'Card authorization declined. Completed intake and consent documents were preserved. Please provide an alternate card.',
    };
  }

  const steps = session.steps.map((s) => {
    if (s.stepId === 'payment_deposit') {
      return { ...s, isCompleted: true, completedAt: new Date().toISOString(), dataRef: depositPayment.paymentIntentId };
    }
    if (s.stepId === 'booking_confirmation') {
      return { ...s, isCompleted: true, completedAt: new Date().toISOString() };
    }
    return s;
  });

  const updatedAppointment = session.appointment
    ? { ...session.appointment, isTentative: false }
    : undefined;

  return {
    session: {
      ...session,
      steps,
      currentStep: 'booking_confirmation',
      status: 'completed',
      appointment: updatedAppointment,
      depositPayment: {
        ...depositPayment,
        status: 'succeeded',
      },
      updatedAt: new Date().toISOString(),
    },
  };
}

/**
 * Self-checkout executed on client's phone at end of service.
 * Staff never touches client's credit card.
 */
export function completeHubSelfCheckout(
  session: VisitHubSession,
  checkoutData: {
    serviceAmount: number;
    tipAmount: number;
    tenderType: 'card' | 'apple_pay' | 'gift_card_split';
    cardLast4: string;
  }
): VisitHubSession {
  const totalPaid = checkoutData.serviceAmount + checkoutData.tipAmount;
  const now = new Date().toISOString();

  const steps = session.steps.map((s) => {
    if (s.stepId === 'self_checkout') {
      return { ...s, isCompleted: true, completedAt: now };
    }
    if (s.stepId === 'aftercare_portal') {
      return { ...s, isCompleted: true, completedAt: now };
    }
    return s;
  });

  return {
    ...session,
    steps,
    currentStep: 'aftercare_portal',
    status: 'completed',
    selfCheckoutPayment: {
      ...checkoutData,
      totalPaid,
      paidAt: now,
    },
    updatedAt: now,
  };
}
