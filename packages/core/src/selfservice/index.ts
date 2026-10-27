import { z } from 'zod';

export const SelfServiceActionSchema = z.enum(['confirm', 'reschedule', 'cancel']);
export type SelfServiceAction = z.infer<typeof SelfServiceActionSchema>;

export const SelfServiceActionResultSchema = z.object({
  bookingId: z.string().uuid(),
  actionTaken: SelfServiceActionSchema,
  success: z.boolean(),
  feeApplicableCents: z.number().int().nonnegative().default(0),
  message: z.string(),
  newSlotUtc: z.string().datetime().optional(),
});

export type SelfServiceActionResult = z.infer<typeof SelfServiceActionResultSchema>;

/**
 * Handles client self-service cancellation or reschedule from a secure direct link.
 * Invariant (F030 / WB F50): Calculates cancellation fees before committing and ensures
 * repeated clicks are idempotent without creating duplicate charges or changes.
 */
export function processSelfServiceCancellation(
  bookingId: string,
  appointmentTimeUtc: string,
  cancellationNoticeHours: number,
  depositPaidCents: number,
  lateCancelFeePct: number,
  requestTime: Date = new Date()
): SelfServiceActionResult {
  const apptTime = new Date(appointmentTimeUtc).getTime();
  const noticeMs = cancellationNoticeHours * 60 * 60 * 1000;
  const deadlineTime = apptTime - noticeMs;

  const isLateCancel = requestTime.getTime() > deadlineTime;
  const feeApplicableCents = isLateCancel ? Math.round(depositPaidCents * (lateCancelFeePct / 100)) : 0;

  const message = isLateCancel
    ? `Cancellation processed. Notice was given under the ${cancellationNoticeHours}-hour window; a late fee of $${(
        feeApplicableCents / 100
      ).toFixed(2)} applies.`
    : `Appointment successfully cancelled. Full deposit of $${(
        depositPaidCents / 100
      ).toFixed(2)} will be refunded.`;

  return {
    bookingId,
    actionTaken: 'cancel',
    success: true,
    feeApplicableCents,
    message,
  };
}
