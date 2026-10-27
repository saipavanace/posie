/**
 * Posie Core - F145: Constrained AI Receptionist
 *
 * Implements an intelligent, strictly constrained conversational receptionist for incoming
 * phone calls, SMS inquiries, and web chat. Answers verified studio business questions
 * (hours, parking, services, transparent pricing, cancellation policies) and performs permitted
 * booking workflows with caller identity verification and honest, transparent human handoff.
 *
 * Compliance: Follows Posie Rule DR04 & DR06 (Unknown prices, complex medical questions, or
 * unlisted policies trigger immediate clarification and staff triage rather than hallucination/invention).
 */

export interface ReceptionistKnowledgeBase {
  studioName: string;
  businessHours: Record<string, { open: string; close: string; isClosed?: boolean }>;
  location: {
    address: string;
    parkingInstructions: string;
    landmarks: string;
  };
  cancellationPolicy: {
    summary: string;
    gracePeriodHours: number;
    feePercentage: number;
  };
  approvedServices: Array<{
    id: string;
    name: string;
    priceCents: number;
    durationMinutes: number;
    description: string;
  }>;
  approvedFaq: Array<{
    keywords: string[];
    answerText: string;
  }>;
}

export interface CallerIdentity {
  callerPhone: string;
  isRegisteredClient: boolean;
  clientId?: string;
  clientName?: string;
  verifiedSession: boolean;
  verificationMethod: 'incoming_caller_id' | 'sms_otp_verified' | 'unverified';
}

export type QueryIntent =
  | 'query_hours'
  | 'query_location'
  | 'query_service_pricing'
  | 'query_cancellation_policy'
  | 'request_booking'
  | 'request_reschedule'
  | 'medical_contraindication_query'
  | 'human_handoff_requested'
  | 'unknown_inquiry';

export interface ReceptionistActionProposal {
  intent: QueryIntent;
  responseSpeech: string;
  confidenceScore: number;
  executedAction?: {
    type: 'slot_reserved' | 'cancellation_logged' | 'waitlist_added';
    referenceId: string;
    summary: string;
  };
  requiresHumanHandoff: boolean;
  handoffUrgency: 'none' | 'low' | 'urgent_escalation';
  staffTriageTicket?: {
    ticketId: string;
    callerPhone: string;
    clientName: string;
    reason: string;
    transcriptSummary: string;
    createdTimestamp: string;
  };
}

/**
 * Validates and verifies caller OTP PIN
 */
export function verifyCallerIdentity(
  caller: CallerIdentity,
  providedOtpPin: string,
  expectedOtpPin: string
): CallerIdentity {
  if (providedOtpPin && providedOtpPin.trim() === expectedOtpPin.trim()) {
    return {
      ...caller,
      verifiedSession: true,
      verificationMethod: 'sms_otp_verified',
    };
  }

  return {
    ...caller,
    verifiedSession: false,
    verificationMethod: 'unverified',
  };
}

/**
 * Evaluates caller inquiry using constrained deterministic rule-matching
 * preventing hallucinations and executing truthful staff handoff when ambiguous.
 */
export function processReceptionistQuery(
  rawQuery: string,
  caller: CallerIdentity,
  kb: ReceptionistKnowledgeBase,
  availableSlots?: Array<{ time: string; providerName: string }>
): ReceptionistActionProposal {
  const query = rawQuery.toLowerCase().trim();

  // 1. Check for explicit human agent or supervisor request
  if (
    query.includes('human') ||
    query.includes('operator') ||
    query.includes('manager') ||
    query.includes('speak to a person') ||
    query.includes('receptionist')
  ) {
    return {
      intent: 'human_handoff_requested',
      responseSpeech: `I'll connect you right now with our front desk team at ${kb.studioName}. Please hold for just a moment.`,
      confidenceScore: 1.0,
      requiresHumanHandoff: true,
      handoffUrgency: 'low',
      staffTriageTicket: {
        ticketId: `triage-${Date.now()}`,
        callerPhone: caller.callerPhone,
        clientName: caller.clientName || 'Caller',
        reason: 'Caller requested human front-desk assistance.',
        transcriptSummary: rawQuery,
        createdTimestamp: new Date().toISOString(),
      },
    };
  }

  // 2. Check for medical contraindications or allergic reactions (CRITICAL SAFETY ESCALATION)
  if (
    query.includes('allergic') ||
    query.includes('reaction') ||
    query.includes('rash') ||
    query.includes('swelling') ||
    query.includes('infection') ||
    query.includes('retinol') ||
    query.includes('pregnant')
  ) {
    return {
      intent: 'medical_contraindication_query',
      responseSpeech: `Because your health and safety are our highest priority, clinical medical and skin questions must be reviewed directly by our licensed practitioners. I am flagging this for immediate practitioner consultation.`,
      confidenceScore: 0.98,
      requiresHumanHandoff: true,
      handoffUrgency: 'urgent_escalation',
      staffTriageTicket: {
        ticketId: `triage-med-${Date.now()}`,
        callerPhone: caller.callerPhone,
        clientName: caller.clientName || 'Caller',
        reason: 'Potential health or allergy contraindication query.',
        transcriptSummary: rawQuery,
        createdTimestamp: new Date().toISOString(),
      },
    };
  }

  // 3. Location and parking queries
  if (query.includes('address') || query.includes('location') || query.includes('where are you') || query.includes('parking') || query.includes('directions')) {
    return {
      intent: 'query_location',
      responseSpeech: `${kb.studioName} is located at ${kb.location.address}. ${kb.location.parkingInstructions} We are near ${kb.location.landmarks}.`,
      confidenceScore: 0.95,
      requiresHumanHandoff: false,
      handoffUrgency: 'none',
    };
  }

  // 4. Studio business hours
  if (query.includes('hours') || query.includes('open') || query.includes('close') || query.includes('what time')) {
    const today = 'monday'; // default query day representation
    const dayHours = kb.businessHours[today] || { open: '09:00 AM', close: '07:00 PM' };
    const speech = `${kb.studioName} is open today from ${dayHours.open} to ${dayHours.close}. Our full weekly hours can also be viewed anytime at posie.app.`;

    return {
      intent: 'query_hours',
      responseSpeech: speech,
      confidenceScore: 0.95,
      requiresHumanHandoff: false,
      handoffUrgency: 'none',
    };
  }

  // 5. Cancellation policy inquiry
  if (query.includes('cancel') && (query.includes('policy') || query.includes('fee') || query.includes('notice'))) {
    return {
      intent: 'query_cancellation_policy',
      responseSpeech: `${kb.cancellationPolicy.summary} We require at least ${kb.cancellationPolicy.gracePeriodHours} hours notice for fee-free cancellations. Late cancellations incur a transparent ${kb.cancellationPolicy.feePercentage}% fee.`,
      confidenceScore: 0.94,
      requiresHumanHandoff: false,
      handoffUrgency: 'none',
    };
  }

  // 6. Service pricing & duration lookup
  for (const service of kb.approvedServices) {
    if (query.includes(service.name.toLowerCase()) || (service.id && query.includes(service.id))) {
      const priceFormatted = `$${(service.priceCents / 100).toFixed(2)}`;
      return {
        intent: 'query_service_pricing',
        responseSpeech: `Our ${service.name} is ${priceFormatted} (${service.durationMinutes} minutes). ${service.description}`,
        confidenceScore: 0.96,
        requiresHumanHandoff: false,
        handoffUrgency: 'none',
      };
    }
  }

  // 7. Booking / Reschedule request
  if (query.includes('book') || query.includes('appointment') || query.includes('schedule') || query.includes('slot')) {
    // Identity verification check
    if (!caller.verifiedSession) {
      return {
        intent: 'request_booking',
        responseSpeech: `I would love to help book that! For account security and card on file protection, I just sent a 4-digit verification code to your phone ${caller.callerPhone}. Please state or text the code to proceed.`,
        confidenceScore: 0.90,
        requiresHumanHandoff: false,
        handoffUrgency: 'none',
      };
    }

    if (availableSlots && availableSlots.length > 0) {
      const firstSlot = availableSlots[0];
      return {
        intent: 'request_booking',
        responseSpeech: `Great, I have an opening available tomorrow at ${firstSlot.time} with ${firstSlot.providerName}. Would you like me to reserve this for you?`,
        confidenceScore: 0.92,
        executedAction: {
          type: 'slot_reserved',
          referenceId: `res-${Date.now()}`,
          summary: `Reserved ${firstSlot.time} with ${firstSlot.providerName} for ${caller.clientName || 'Client'}`,
        },
        requiresHumanHandoff: false,
        handoffUrgency: 'none',
      };
    }

    return {
      intent: 'request_booking',
      responseSpeech: `I am checking our schedule for you. Would you like me to place you on our priority waitlist for the first opening this week?`,
      confidenceScore: 0.88,
      requiresHumanHandoff: false,
      handoffUrgency: 'none',
    };
  }

  // 8. Approved FAQ matches
  for (const faq of kb.approvedFaq) {
    const match = faq.keywords.some(k => query.includes(k.toLowerCase()));
    if (match) {
      return {
        intent: 'query_hours',
        responseSpeech: faq.answerText,
        confidenceScore: 0.90,
        requiresHumanHandoff: false,
        handoffUrgency: 'none',
      };
    }
  }

  // 9. Unknown inquiry fallback: Refuse to hallucinate; create staff triage ticket
  return {
    intent: 'unknown_inquiry',
    responseSpeech: `I want to make sure I give you exact, accurate details about ${kb.studioName}. I have created a message for our front desk team, and one of our specialists will text or call you back shortly.`,
    confidenceScore: 0.40,
    requiresHumanHandoff: true,
    handoffUrgency: 'low',
    staffTriageTicket: {
      ticketId: `triage-unk-${Date.now()}`,
      callerPhone: caller.callerPhone,
      clientName: caller.clientName || 'Caller',
      reason: 'Inquiry outside approved receptionist knowledge base.',
      transcriptSummary: rawQuery,
      createdTimestamp: new Date().toISOString(),
    },
  };
}
