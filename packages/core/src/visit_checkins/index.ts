import { z } from 'zod';

/**
 * F063 — Visit Progress Check-ins
 *
 * Allows clients to submit optional post-service healing self-reports and photos between visits.
 * Routes concerns directly to the treating practitioner.
 *
 * Invariants (Row 10, WB T):
 * 1. Disclaimers: Self-reports and photos are observational check-ins, NOT clinical medical diagnoses.
 * 2. Urgent symptoms (blistering, severe swelling, throbbing pain) automatically surface approved medical escalation guidance.
 * 3. Client reports are saved as attributed client communications, never silently converted into signed practitioner chart findings.
 */

export const ProgressComfortLevelSchema = z.enum([
  'glowing_and_comfortable',
  'mild_expected_dryness_or_redness',
  'moderate_tightness_or_flaking',
  'concerning_pain_or_irritation',
  'severe_reaction',
]);
export type ProgressComfortLevel = z.infer<typeof ProgressComfortLevelSchema>;

export const CheckinUrgencyTriageSchema = z.enum(['routine_healing', 'practitioner_attention_needed', 'urgent_medical_escalation']);
export type CheckinUrgencyTriage = z.infer<typeof CheckinUrgencyTriageSchema>;

export const CheckinStatusSchema = z.enum([
  'submitted_pending_review',
  'reviewed_reassured',
  'follow_up_scheduled',
  'clinically_escalated',
]);
export type CheckinStatus = z.infer<typeof CheckinStatusSchema>;

export const CheckinPhotoAttachmentSchema = z.object({
  photoId: z.string().uuid(),
  photoUrl: z.string().url(),
  caption: z.string().optional(),
  uploadedAt: z.string().datetime(),
});
export type CheckinPhotoAttachment = z.infer<typeof CheckinPhotoAttachmentSchema>;

export const VisitProgressCheckinRecordSchema = z.object({
  checkinId: z.string().uuid(),
  businessId: z.string().uuid(),
  clientId: z.string().uuid(),
  clientName: z.string().min(1),
  appointmentId: z.string().uuid(),
  serviceName: z.string().min(1),
  practitionerStaffId: z.string().uuid(),
  practitionerName: z.string().min(1),

  // Client Observation
  daysSinceService: z.number().int().nonnegative(),
  comfortLevel: ProgressComfortLevelSchema,
  clientReportNotes: z.string().min(3),
  photos: z.array(CheckinPhotoAttachmentSchema),
  submittedAt: z.string().datetime(),

  // Triage & Mandatory Disclaimers
  triageLevel: CheckinUrgencyTriageSchema,
  urgentMedicalDisclaimer: z.string().nullable(),
  nonDiagnosticNotice: z.string(),

  // Practitioner Action
  status: CheckinStatusSchema,
  reviewedAt: z.string().datetime().nullable(),
  practitionerAdviceNotes: z.string().nullable(),
});
export type VisitProgressCheckinRecord = z.infer<typeof VisitProgressCheckinRecordSchema>;

export const NON_DIAGNOSTIC_LEGAL_NOTICE =
  'Notice: Post-service progress check-ins are self-reported observational updates to assist your beauty specialist ' +
  'with your treatment journey. They do not constitute formal medical diagnoses or prescriptions. ' +
  'If you experience acute swelling, difficulty breathing, or severe signs of infection, seek emergency medical care immediately.';

export const URGENT_MEDICAL_ESCALATION_TEXT =
  'IMPORTANT SAFETY GUIDANCE: Based on your report of severe reaction or intense pain, please stop applying all active ' +
  'skincare products immediately and contact your primary healthcare provider or local urgent care. ' +
  'Your specialist has also been alerted with top priority.';

/**
 * Creates a client visit progress self-report with automatic symptom triage.
 */
export function submitVisitProgressCheckin(params: {
  businessId: string;
  clientId: string;
  clientName: string;
  appointmentId: string;
  serviceName: string;
  practitionerStaffId: string;
  practitionerName: string;
  daysSinceService: number;
  comfortLevel: ProgressComfortLevel;
  clientReportNotes: string;
  photos?: CheckinPhotoAttachment[];
}): VisitProgressCheckinRecord {
  const checkinId = crypto.randomUUID ? crypto.randomUUID() : 'f0630000-0000-4000-8000-000000000001';
  const now = new Date().toISOString();

  let triageLevel: CheckinUrgencyTriage = 'routine_healing';
  let urgentNotice: string | null = null;

  if (params.comfortLevel === 'severe_reaction') {
    triageLevel = 'urgent_medical_escalation';
    urgentNotice = URGENT_MEDICAL_ESCALATION_TEXT;
  } else if (params.comfortLevel === 'concerning_pain_or_irritation') {
    triageLevel = 'practitioner_attention_needed';
  }

  return VisitProgressCheckinRecordSchema.parse({
    checkinId,
    businessId: params.businessId,
    clientId: params.clientId,
    clientName: params.clientName,
    appointmentId: params.appointmentId,
    serviceName: params.serviceName,
    practitionerStaffId: params.practitionerStaffId,
    practitionerName: params.practitionerName,
    daysSinceService: params.daysSinceService,
    comfortLevel: params.comfortLevel,
    clientReportNotes: params.clientReportNotes,
    photos: params.photos ?? [],
    submittedAt: now,
    triageLevel,
    urgentMedicalDisclaimer: urgentNotice,
    nonDiagnosticNotice: NON_DIAGNOSTIC_LEGAL_NOTICE,
    status: triageLevel === 'urgent_medical_escalation' ? 'clinically_escalated' : 'submitted_pending_review',
    reviewedAt: null,
    practitionerAdviceNotes: null,
  });
}

/**
 * Practitioner responds to client check-in with advice or schedules follow-up.
 */
export function reviewVisitProgressCheckin(
  checkin: VisitProgressCheckinRecord,
  params: {
    practitionerAdviceNotes: string;
    scheduleFollowUp?: boolean;
  }
): VisitProgressCheckinRecord {
  return VisitProgressCheckinRecordSchema.parse({
    ...checkin,
    status: params.scheduleFollowUp ? 'follow_up_scheduled' : 'reviewed_reassured',
    reviewedAt: new Date().toISOString(),
    practitionerAdviceNotes: params.practitionerAdviceNotes,
  });
}
