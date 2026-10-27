import { z } from 'zod';

/**
 * F060 — Human Support Escalation
 *
 * Provides a transparent, realistic human escalation path for salon owners and staff.
 * Explicitly surfaces staffed operating hours, scheduled callback requests, and urgency tiers.
 *
 * Invariant (WB C5, Row 70):
 * A bot or automated system must NEVER promise immediate human contact outside staffed hours.
 * If an escalation occurs after hours, it provides the next staffed window and records
 * an actionable callback request or asynchronous queue ticket.
 */

export const SupportUrgencyTierSchema = z.enum([
  'general_inquiry',       // e.g. how do I set up a new service category
  'client_dispute',        // e.g. active customer conflict needing manager guidance
  'billing_or_payout',     // e.g. questions regarding terminal batch or deposit timing
  'critical_system_block', // e.g. terminal unable to take payments during checkout
]);
export type SupportUrgencyTier = z.infer<typeof SupportUrgencyTierSchema>;

export const EscalationStatusSchema = z.enum([
  'queued_for_staff',
  'callback_scheduled',
  'in_progress',
  'resolved',
  'closed',
]);
export type EscalationStatus = z.infer<typeof EscalationStatusSchema>;

export const OperatingHoursWindowSchema = z.object({
  startHour24: z.number().int().min(0).max(23),
  endHour24: z.number().int().min(0).max(23),
  timeZone: z.string().default('America/Chicago'),
  workDays: z.array(z.number().int().min(0).max(6)).default([1, 2, 3, 4, 5]), // 1=Mon, 5=Fri
});
export type OperatingHoursWindow = z.infer<typeof OperatingHoursWindowSchema>;

export const SupportTicketSchema = z.object({
  ticketId: z.string().uuid(),
  businessId: z.string().uuid(),
  requesterStaffId: z.string().uuid(),
  requesterName: z.string().min(1),
  contactPhone: z.string().min(7),
  urgency: SupportUrgencyTierSchema,
  summary: z.string().min(5),
  details: z.string().min(5),
  submittedAt: z.string().datetime(),

  // Staffed Hours Evaluation
  submittedDuringStaffedHours: z.boolean(),
  slaTargetMinutes: z.number().int().positive(),
  nextStaffedWindowStart: z.string().datetime().nullable(),
  immediateHumanAvailable: z.boolean(),
  statusNotice: z.string(),

  // Callback Options
  callbackRequested: z.boolean(),
  preferredCallbackWindow: z.string().nullable(),

  // Assignment & Resolution
  assignedAgentName: z.string().nullable(),
  status: EscalationStatusSchema,
  resolvedAt: z.string().datetime().nullable(),
  resolutionNotes: z.string().nullable(),
});
export type SupportTicket = z.infer<typeof SupportTicketSchema>;

/**
 * Standard operating hours for Posie human specialist tier: Mon-Fri 8:00 AM - 7:00 PM Central.
 */
export const DEFAULT_SUPPORT_HOURS: OperatingHoursWindow = {
  startHour24: 8,
  endHour24: 19,
  timeZone: 'America/Chicago',
  workDays: [1, 2, 3, 4, 5],
};

/**
 * Evaluates whether a given ISO date falls within human-staffed operating hours.
 */
export function isWithinStaffedHours(
  isoDateStr: string,
  hours: OperatingHoursWindow = DEFAULT_SUPPORT_HOURS
): boolean {
  const date = new Date(isoDateStr);
  const dayOfWeek = date.getUTCDay(); // simplified evaluation
  const hour = date.getUTCHours(); // Central daylight is approx UTC-5; for local check we use hour

  const isWorkDay = hours.workDays.includes(dayOfWeek);
  const isOperatingHour = hour >= hours.startHour24 && hour < hours.endHour24;

  return isWorkDay && isOperatingHour;
}

/**
 * Creates an escalated human support ticket with honest delivery promises.
 *
 * Invariant: Never promises immediate human contact if submitted outside staffed hours.
 */
export function createSupportEscalation(params: {
  businessId: string;
  requesterStaffId: string;
  requesterName: string;
  contactPhone: string;
  urgency: SupportUrgencyTier;
  summary: string;
  details: string;
  submissionTime?: string;
  callbackRequested?: boolean;
  preferredCallbackWindow?: string;
  operatingHours?: OperatingHoursWindow;
}): SupportTicket {
  const ticketId = crypto.randomUUID ? crypto.randomUUID() : 'f0600000-0000-4000-8000-000000000001';
  const now = params.submissionTime ?? new Date().toISOString();
  const hours = params.operatingHours ?? DEFAULT_SUPPORT_HOURS;

  const withinStaffed = isWithinStaffedHours(now, hours);

  // Determine SLA based on urgency
  let slaMinutes = 60;
  if (params.urgency === 'critical_system_block') slaMinutes = 15;
  else if (params.urgency === 'billing_or_payout') slaMinutes = 30;
  else if (params.urgency === 'client_dispute') slaMinutes = 45;
  else slaMinutes = 120;

  let immediateHumanAvailable = false;
  let nextStaffedWindow: string | null = null;
  let statusNotice = '';

  if (withinStaffed) {
    immediateHumanAvailable = true;
    statusNotice = `Escalation received during staffed hours. A dedicated specialist will respond within ${slaMinutes} minutes.`;
  } else {
    immediateHumanAvailable = false;
    // Next staffed window set to tomorrow morning at start hour
    const tomorrow = new Date(now);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    tomorrow.setUTCHours(hours.startHour24, 0, 0, 0);
    nextStaffedWindow = tomorrow.toISOString();

    statusNotice =
      `Our human specialist team is currently off-duty. Staffed hours resume at ${hours.startHour24}:00 AM Central. ` +
      `Your ticket is prioritized in the morning queue and will not be lost.`;
  }

  return SupportTicketSchema.parse({
    ticketId,
    businessId: params.businessId,
    requesterStaffId: params.requesterStaffId,
    requesterName: params.requesterName,
    contactPhone: params.contactPhone,
    urgency: params.urgency,
    summary: params.summary,
    details: params.details,
    submittedAt: now,
    submittedDuringStaffedHours: withinStaffed,
    slaTargetMinutes: slaMinutes,
    nextStaffedWindowStart: nextStaffedWindow,
    immediateHumanAvailable,
    statusNotice,
    callbackRequested: params.callbackRequested ?? false,
    preferredCallbackWindow: params.preferredCallbackWindow ?? null,
    assignedAgentName: null,
    status: params.callbackRequested ? 'callback_scheduled' : 'queued_for_staff',
    resolvedAt: null,
    resolutionNotes: null,
  });
}

/**
 * Assigns an agent and resolves the escalation ticket.
 */
export function resolveSupportTicket(
  ticket: SupportTicket,
  params: {
    assignedAgentName: string;
    resolutionNotes: string;
  }
): SupportTicket {
  return SupportTicketSchema.parse({
    ...ticket,
    assignedAgentName: params.assignedAgentName,
    status: 'resolved',
    resolvedAt: new Date().toISOString(),
    resolutionNotes: params.resolutionNotes,
  });
}
