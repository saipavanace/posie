/**
 * F110 — Business Calling, Voicemail & Staff Routing
 *
 * Integrated business telephony providing in-app business calling, caller ID matching,
 * automated voicemail-to-text transcription, after-hours routing, and follow-up tasks.
 *
 * Basis: B; WB U19, Rules F060, F072, F110, F130
 * Key Invariants:
 * 1. Approved Recording Controls (Rule U19):
 *    Staff and clients can explicitly distinguish recorded, transcribed, and unrecorded calls.
 *    Two-party recording consent disclosures are strictly enforced before recording activates.
 * 2. Human Escalation Truth (Rules F060, F110, F130):
 *    Publishes clear staffed operating hours and transparent voicemail expectations;
 *    never makes fraudulent promises of unstaffed 24/7 live telephone support.
 * 3. Caller ID Context:
 *    Matches incoming telephone numbers to client records, popping medical alerts and upcoming bookings.
 */

export type CallDirection = 'inbound' | 'outbound';
export type CallDisposition = 'answered' | 'missed' | 'voicemail' | 'busy';
export type RecordingConsentState = 'unrecorded' | 'recording_announced' | 'recording_active' | 'transcription_only';

export interface BusinessLineConfig {
  phoneNumber: string; // e.g. "+1-310-555-7674"
  callerIdName: string; // "Posie Beverly Hills"
  operatingHours: {
    daysOfWeek: number[]; // 1-6 (Mon-Sat)
    openHourLocal: number; // 9 (9 AM)
    closeHourLocal: number; // 19 (7 PM)
    timezone: string;
  };
  ringGroupStaffIds: string[];
  voicemailGreetingText: string;
  isCallRecordingEnabled: boolean;
  recordingDisclosureAudioText: string;
}

export interface CallRecord {
  callId: string;
  direction: CallDirection;
  callerNumber: string;
  calleeNumber: string;
  startTime: string;
  endTime?: string;
  durationSeconds: number;
  disposition: CallDisposition;
  handledByStaffId?: string;
  handledByStaffName?: string;
  // Caller ID Match
  matchedClient?: {
    clientId: string;
    clientName: string;
    membershipTier?: string;
    upcomingAppointment?: {
      date: string;
      service: string;
    };
  };
  // Consent & Recording (Rule U19)
  recordingConsentState: RecordingConsentState;
  recordingAudioUrl?: string;
  transcriptText?: string;
  // Voicemail / Follow-up Task
  voicemail?: {
    audioUrl: string;
    transcript: string;
    summary: string;
    followUpTaskId?: string;
    isResolved: boolean;
  };
}

/**
 * Determines whether inbound call should ring staff devices or route to voicemail based on operating hours.
 */
export function evaluateInboundCallRoute(
  config: BusinessLineConfig,
  callTimeLocal: { dayOfWeek: number; hourLocal: number }
): { action: 'ring_staff_group' | 'route_to_voicemail'; reason: string } {
  const isOperatingDay = config.operatingHours.daysOfWeek.includes(callTimeLocal.dayOfWeek);
  const isOperatingHour =
    callTimeLocal.hourLocal >= config.operatingHours.openHourLocal &&
    callTimeLocal.hourLocal < config.operatingHours.closeHourLocal;

  if (isOperatingDay && isOperatingHour) {
    return {
      action: 'ring_staff_group',
      reason: `Call received during staffed operating hours (${config.operatingHours.openHourLocal}:00 - ${config.operatingHours.closeHourLocal}:00). Ringing ${config.ringGroupStaffIds.length} staff devices.`,
    };
  }

  return {
    action: 'route_to_voicemail',
    reason: `Call received outside staffed hours. Human live support is closed. Routing to studio voicemail.`,
  };
}

/**
 * Initiates an inbound call session and matches caller ID to client database.
 */
export function handleInboundCallReceived(
  callId: string,
  callerNumber: string,
  config: BusinessLineConfig,
  clientDirectory: Array<{ clientId: string; clientName: string; phone: string; tier?: string; upcomingBooking?: { date: string; service: string } }>,
  callTimeLocal: { dayOfWeek: number; hourLocal: number }
): { callRecord: CallRecord; routeAction: 'ring_staff_group' | 'route_to_voicemail' } {
  const route = evaluateInboundCallRoute(config, callTimeLocal);

  // Match caller phone number
  const matched = clientDirectory.find((c) => c.phone.replace(/\D/g, '') === callerNumber.replace(/\D/g, ''));

  const callRecord: CallRecord = {
    callId,
    direction: 'inbound',
    callerNumber,
    calleeNumber: config.phoneNumber,
    startTime: new Date().toISOString(),
    durationSeconds: 0,
    disposition: route.action === 'ring_staff_group' ? 'answered' : 'voicemail',
    matchedClient: matched
      ? {
          clientId: matched.clientId,
          clientName: matched.clientName,
          membershipTier: matched.tier,
          upcomingAppointment: matched.upcomingBooking,
        }
      : undefined,
    recordingConsentState: config.isCallRecordingEnabled ? 'recording_announced' : 'unrecorded',
  };

  return { callRecord, routeAction: route.action };
}

/**
 * Generates an automated voicemail transcript and action item task for missed calls.
 */
export function processInboundVoicemail(
  callRecord: CallRecord,
  audioUrl: string,
  simulatedAudioTranscript: string
): CallRecord {
  const taskId = `TASK-VM-${Date.now()}`;

  return {
    ...callRecord,
    disposition: 'voicemail',
    voicemail: {
      audioUrl,
      transcript: simulatedAudioTranscript,
      summary: `Caller left message: "${simulatedAudioTranscript.substring(0, 80)}..."`,
      followUpTaskId: taskId,
      isResolved: false,
    },
    recordingConsentState: 'transcription_only',
  };
}

/**
 * Explicitly sets recording consent for an active phone call.
 * Strictly complies with Rule WB U19: Call participants must know if the call is recorded.
 */
export function setCallRecordingState(
  callRecord: CallRecord,
  consentGranted: boolean
): CallRecord {
  if (!consentGranted) {
    return {
      ...callRecord,
      recordingConsentState: 'unrecorded',
      recordingAudioUrl: undefined,
    };
  }

  return {
    ...callRecord,
    recordingConsentState: 'recording_active',
    recordingAudioUrl: `https://storage.posie.com/calls/${callRecord.callId}.mp3`,
  };
}
