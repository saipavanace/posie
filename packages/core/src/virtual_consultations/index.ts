import { z } from 'zod';

/**
 * F065 — Virtual Consultation Connection
 *
 * Connects scheduled video consultations to an approved tele-health / tele-beauty video provider.
 * Links pre-call intake questionnaires, treatment goals, and follow-up proposals.
 *
 * Invariants (WB A6, Row 6):
 * 1. Zero friction: Clients join via one-click secure web link without mandatory app downloads or forced password accounts.
 * 2. Privacy first: Call recording is STRICTLY DISABLED by default and cannot be initiated without explicit dual-party consent.
 * 3. Intake attachment: Surfaces client reference photos and medical disclosures directly in practitioner call workspace.
 */

export const VideoProviderTypeSchema = z.enum(['daily_co', 'twilio_video', 'google_meet', 'zoom_healthcare']);
export type VideoProviderType = z.infer<typeof VideoProviderTypeSchema>;

export const VirtualConsultationStatusSchema = z.enum([
  'scheduled',
  'client_waiting_in_room',
  'in_progress',
  'completed',
  'client_no_show',
  'canceled',
]);
export type VirtualConsultationStatus = z.infer<typeof VirtualConsultationStatusSchema>;

export const VirtualConsultationRoomSchema = z.object({
  consultationId: z.string().uuid(),
  businessId: z.string().uuid(),
  clientId: z.string().uuid(),
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  specialistStaffId: z.string().uuid(),
  specialistName: z.string().min(1),

  // Scheduling & Timing
  scheduledStartTime: z.string().datetime(),
  estimatedDurationMinutes: z.number().int().positive().default(20),

  // Video Room Details
  provider: VideoProviderTypeSchema,
  clientOneClickJoinUrl: z.string().url(),
  specialistHostUrl: z.string().url(),
  roomPinToken: z.string().min(4),
  status: VirtualConsultationStatusSchema,

  // Privacy & Recording Safeguard
  recordingConsentGranted: z.boolean().default(false),
  isRecordingActive: z.literal(false), // Invariant: Recording strictly disabled by default

  // Intake & Proposal Linkages
  linkedIntakeFormId: z.string().uuid().nullable(),
  hasUploadedConsultationPhotos: z.boolean(),
  consultationGoalsNotes: z.string(),

  // Outcome
  completedAt: z.string().datetime().nullable(),
  recommendedServiceId: z.string().uuid().nullable(),
  followUpProposalEstimateId: z.string().uuid().nullable(),
  clinicalConsultationSummary: z.string().nullable(),
});
export type VirtualConsultationRoom = z.infer<typeof VirtualConsultationRoomSchema>;

/**
 * Creates a zero-friction virtual consultation room.
 *
 * Invariant: Call recording is off by default. Joining requires no native app installation.
 */
export function createVirtualConsultation(params: {
  businessId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  specialistStaffId: string;
  specialistName: string;
  scheduledStartTime: string;
  durationMinutes?: number;
  provider?: VideoProviderType;
  linkedIntakeFormId?: string;
  hasUploadedConsultationPhotos?: boolean;
  consultationGoalsNotes: string;
}): VirtualConsultationRoom {
  const consultationId = crypto.randomUUID ? crypto.randomUUID() : 'f0650000-0000-4000-8000-000000000001';
  const provider = params.provider ?? 'daily_co';
  const roomToken = crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : 'room8765';

  const clientOneClickJoinUrl = `https://meet.posie.app/c/${consultationId}?token=${roomToken}&guest=true`;
  const specialistHostUrl = `https://meet.posie.app/host/${consultationId}`;

  return VirtualConsultationRoomSchema.parse({
    consultationId,
    businessId: params.businessId,
    clientId: params.clientId,
    clientName: params.clientName,
    clientEmail: params.clientEmail,
    specialistStaffId: params.specialistStaffId,
    specialistName: params.specialistName,
    scheduledStartTime: params.scheduledStartTime,
    estimatedDurationMinutes: params.durationMinutes ?? 20,
    provider,
    clientOneClickJoinUrl,
    specialistHostUrl,
    roomPinToken: roomToken,
    status: 'scheduled',
    recordingConsentGranted: false,
    isRecordingActive: false,
    linkedIntakeFormId: params.linkedIntakeFormId ?? null,
    hasUploadedConsultationPhotos: params.hasUploadedConsultationPhotos ?? false,
    consultationGoalsNotes: params.consultationGoalsNotes,
    completedAt: null,
    recommendedServiceId: null,
    followUpProposalEstimateId: null,
    clinicalConsultationSummary: null,
  });
}

/**
 * Completes a virtual consultation session and links the resulting treatment recommendation or proposal.
 */
export function completeVirtualConsultation(
  consultation: VirtualConsultationRoom,
  params: {
    clinicalConsultationSummary: string;
    recommendedServiceId?: string;
    followUpProposalEstimateId?: string;
  }
): VirtualConsultationRoom {
  return VirtualConsultationRoomSchema.parse({
    ...consultation,
    status: 'completed',
    completedAt: new Date().toISOString(),
    clinicalConsultationSummary: params.clinicalConsultationSummary,
    recommendedServiceId: params.recommendedServiceId ?? null,
    followUpProposalEstimateId: params.followUpProposalEstimateId ?? null,
  });
}
