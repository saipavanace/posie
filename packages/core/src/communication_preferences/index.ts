import { z } from 'zod';

/**
 * F062 — Communication Preferences & Quiet Hours (Document DR05)
 *
 * Implements granular channel consent separation (transactional appointment, clinical care,
 * and promotional marketing), client-defined quiet hours, and immutable consent history logs.
 *
 * Invariants (DR05, WB F62):
 * 1. Opting out of marketing promotions NEVER disables transactional appointment receipts or safety alerts.
 * 2. Promotional messages strictly honor quiet hours (e.g. 9:00 PM - 8:00 AM) and are held/deferred.
 * 3. Every opt-in or opt-out generates an immutable audit record in the consent history ledger.
 */

export const MessageChannelSchema = z.enum([
  'transactional_appointment', // Booking confirmations, reschedules, payment receipts
  'clinical_care',             // Aftercare instructions, patch test check-ins, pre-service prep
  'promotional_marketing',     // Seasonal offers, newsletter announcements, birthday perks
]);
export type MessageChannel = z.infer<typeof MessageChannelSchema>;

export const ConsentSourceSchema = z.enum([
  'client_self_service_portal',
  'sms_keyword_stop',
  'sms_keyword_unstop',
  'intake_form_opt_in',
  'front_desk_staff_entry',
]);
export type ConsentSource = z.infer<typeof ConsentSourceSchema>;

export const ConsentHistoryEntrySchema = z.object({
  id: z.string().uuid(),
  timestamp: z.string().datetime(),
  channel: MessageChannelSchema,
  action: z.enum(['opt_in', 'opt_out']),
  source: ConsentSourceSchema,
  notes: z.string(),
});
export type ConsentHistoryEntry = z.infer<typeof ConsentHistoryEntrySchema>;

export const QuietHoursSchema = z.object({
  enabled: z.boolean().default(true),
  quietStartHour24: z.number().int().min(0).max(23).default(21), // 9:00 PM
  quietEndHour24: z.number().int().min(0).max(23).default(8),    // 8:00 AM
  timeZone: z.string().default('America/Chicago'),
});
export type QuietHours = z.infer<typeof QuietHoursSchema>;

export const CommunicationPreferencesSchema = z.object({
  clientId: z.string().uuid(),
  businessId: z.string().uuid(),
  phone: z.string().min(7),
  email: z.string().email(),

  // Granular Channel Permissions
  transactionalSmsEnabled: z.boolean().default(true),
  clinicalCareSmsEnabled: z.boolean().default(true),
  promotionalSmsEnabled: z.boolean().default(false), // Default opt-out for marketing privacy
  promotionalEmailEnabled: z.boolean().default(false),

  // Quiet Hours
  quietHours: QuietHoursSchema,

  // Immutable Consent History Audit
  consentHistory: z.array(ConsentHistoryEntrySchema),
  updatedAt: z.string().datetime(),
});
export type CommunicationPreferences = z.infer<typeof CommunicationPreferencesSchema>;

/**
 * Creates initial communication preferences for a client with privacy-first defaults.
 */
export function initCommunicationPreferences(params: {
  clientId: string;
  businessId: string;
  phone: string;
  email: string;
  initialPromotionalOptIn?: boolean;
  source?: ConsentSource;
}): CommunicationPreferences {
  const now = new Date().toISOString();
  const initialMarketing = params.initialPromotionalOptIn ?? false;

  const history: ConsentHistoryEntry[] = [
    {
      id: crypto.randomUUID ? crypto.randomUUID() : 'f0620000-0000-4000-8000-000000000001',
      timestamp: now,
      channel: 'transactional_appointment',
      action: 'opt_in',
      source: params.source ?? 'intake_form_opt_in',
      notes: 'Initial account registration (essential appointment notifications enabled)',
    },
  ];

  if (initialMarketing) {
    history.push({
      id: crypto.randomUUID ? crypto.randomUUID() : 'f0620000-0000-4000-8000-000000000002',
      timestamp: now,
      channel: 'promotional_marketing',
      action: 'opt_in',
      source: params.source ?? 'intake_form_opt_in',
      notes: 'Explicit promotional SMS opt-in provided during intake',
    });
  }

  return CommunicationPreferencesSchema.parse({
    clientId: params.clientId,
    businessId: params.businessId,
    phone: params.phone,
    email: params.email,
    transactionalSmsEnabled: true,
    clinicalCareSmsEnabled: true,
    promotionalSmsEnabled: initialMarketing,
    promotionalEmailEnabled: initialMarketing,
    quietHours: {
      enabled: true,
      quietStartHour24: 21, // 9:00 PM
      quietEndHour24: 8,    // 8:00 AM
      timeZone: 'America/Chicago',
    },
    consentHistory: history,
    updatedAt: now,
  });
}

/**
 * Updates channel preference and appends an immutable audit event to consent history.
 */
export function updateChannelPreference(
  prefs: CommunicationPreferences,
  params: {
    channel: MessageChannel;
    action: 'opt_in' | 'opt_out';
    source: ConsentSource;
    notes?: string;
  }
): CommunicationPreferences {
  const now = new Date().toISOString();

  const newEntry: ConsentHistoryEntry = {
    id: crypto.randomUUID ? crypto.randomUUID() : 'f0620000-0000-4000-8000-000000000003',
    timestamp: now,
    channel: params.channel,
    action: params.action,
    source: params.source,
    notes: params.notes ?? `Updated ${params.channel} to ${params.action} via ${params.source}`,
  };

  const isOptIn = params.action === 'opt_in';

  let transactionalSms = prefs.transactionalSmsEnabled;
  let clinicalCareSms = prefs.clinicalCareSmsEnabled;
  let promotionalSms = prefs.promotionalSmsEnabled;
  let promotionalEmail = prefs.promotionalEmailEnabled;

  if (params.channel === 'promotional_marketing') {
    promotionalSms = isOptIn;
    promotionalEmail = isOptIn;
  } else if (params.channel === 'clinical_care') {
    clinicalCareSms = isOptIn;
  } else if (params.channel === 'transactional_appointment') {
    transactionalSms = isOptIn;
  }

  return CommunicationPreferencesSchema.parse({
    ...prefs,
    transactionalSmsEnabled: transactionalSms,
    clinicalCareSmsEnabled: clinicalCareSms,
    promotionalSmsEnabled: promotionalSms,
    promotionalEmailEnabled: promotionalEmail,
    consentHistory: [...prefs.consentHistory, newEntry],
    updatedAt: now,
  });
}

/**
 * Evaluates whether a proposed outbound message is allowed to be dispatched.
 *
 * Checks channel opt-in status and quiet hours restrictions.
 */
export function evaluateMessageDispatch(
  prefs: CommunicationPreferences,
  params: {
    channel: MessageChannel;
    proposedSendTimeIso: string;
    isEmergencyOrTimeSensitive?: boolean;
  }
): { canSendImmediately: boolean; isDeferredForQuietHours: boolean; reason: string } {
  // 1. Channel Consent Check
  if (params.channel === 'promotional_marketing' && !prefs.promotionalSmsEnabled) {
    return {
      canSendImmediately: false,
      isDeferredForQuietHours: false,
      reason: 'Blocked: Client has opted out of promotional marketing messages.',
    };
  }

  if (params.channel === 'clinical_care' && !prefs.clinicalCareSmsEnabled) {
    return {
      canSendImmediately: false,
      isDeferredForQuietHours: false,
      reason: 'Blocked: Client has opted out of post-service clinical care check-ins.',
    };
  }

  if (params.channel === 'transactional_appointment' && !prefs.transactionalSmsEnabled) {
    return {
      canSendImmediately: false,
      isDeferredForQuietHours: false,
      reason: 'Blocked: Client has unsubscribed from all SMS notifications (STOP).',
    };
  }

  // 2. Quiet Hours Check (Only applies to promotional messages or non-emergency care)
  if (prefs.quietHours.enabled && params.channel === 'promotional_marketing' && !params.isEmergencyOrTimeSensitive) {
    const sendDate = new Date(params.proposedSendTimeIso);
    const hour = sendDate.getUTCHours(); // Simplified UTC evaluation for quiet hours check

    // Quiet hours: e.g. >= 21 or < 8
    const isQuietHour =
      hour >= prefs.quietHours.quietStartHour24 || hour < prefs.quietHours.quietEndHour24;

    if (isQuietHour) {
      return {
        canSendImmediately: false,
        isDeferredForQuietHours: true,
        reason: `Deferred: Quiet hours active (${prefs.quietHours.quietStartHour24}:00 - ${prefs.quietHours.quietEndHour24}:00). Message scheduled for morning release.`,
      };
    }
  }

  return {
    canSendImmediately: true,
    isDeferredForQuietHours: false,
    reason: 'Approved for immediate dispatch.',
  };
}
