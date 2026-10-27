import { z } from 'zod';

export const InquiryStatusSchema = z.enum(['received', 'under_review', 'converted_to_booking', 'declined']);
export type InquiryStatus = z.infer<typeof InquiryStatusSchema>;

export const ConsultationInquirySchema = z.object({
  id: z.string().uuid(),
  clientName: z.string().min(1),
  clientPhone: z.string().min(7),
  clientEmail: z.string().email(),
  inquiryDetails: z.string().min(1, 'Please describe your treatment goals or questions.'),
  inspirationPhotoUrls: z.array(z.string().url()).default([]),
  preferredTargetDays: z.array(z.string()).default([]),
  status: InquiryStatusSchema.default('received'),
  assignedStaffId: z.string().uuid().optional(),
  assignedStaffName: z.string().optional(),
  responseDeadlineUtc: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export type ConsultationInquiry = z.infer<typeof ConsultationInquirySchema>;

/**
 * Creates and queues a client consultation inquiry before committing calendar slots.
 * Invariant (F034): Consultation requests carry an assigned owner, target response SLA (e.g. 24h),
 * and conversion status tracking without prematurely locking tentative slots on the public schedule.
 */
export function createConsultationInquiry(
  clientName: string,
  clientPhone: string,
  clientEmail: string,
  inquiryDetails: string,
  inspirationPhotoUrls: string[] = [],
  slaHours: number = 24
): ConsultationInquiry {
  const now = new Date();
  const deadline = new Date(now.getTime() + slaHours * 60 * 60 * 1000).toISOString();

  return {
    id: crypto.randomUUID(),
    clientName,
    clientPhone,
    clientEmail,
    inquiryDetails,
    inspirationPhotoUrls,
    preferredTargetDays: ['Thursday', 'Friday'],
    status: 'received',
    responseDeadlineUtc: deadline,
    createdAt: now.toISOString(),
  };
}
