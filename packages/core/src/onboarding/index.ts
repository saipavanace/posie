import { z } from 'zod';

export const SetupStepKeySchema = z.enum([
  'business_details',
  'operating_hours',
  'first_service',
  'booking_policy',
  'payout_onboarding',
]);

export type SetupStepKey = z.infer<typeof SetupStepKeySchema>;

export const SetupStepSchema = z.object({
  key: SetupStepKeySchema,
  label: z.string(),
  description: z.string(),
  completed: z.boolean().default(false),
  blockerCode: z.string().optional(),
});

export const GuidedSetupStatusSchema = z.object({
  businessId: z.string().uuid(),
  steps: z.array(SetupStepSchema),
  isBookingReady: z.boolean().default(false),
  completedAt: z.string().datetime().optional(),
});

export type SetupStep = z.infer<typeof SetupStepSchema>;
export type GuidedSetupStatus = z.infer<typeof GuidedSetupStatusSchema>;

export const INITIAL_SETUP_STEPS: SetupStep[] = [
  {
    key: 'business_details',
    label: 'Studio Identity & Brand',
    description: 'Set your studio name, logo, contact phone, and aesthetic accent color.',
    completed: true, // F001 complete
  },
  {
    key: 'operating_hours',
    label: 'Working Hours & Location',
    description: 'Set your bookable calendar days, opening hours, and client arrival instructions.',
    completed: true,
  },
  {
    key: 'first_service',
    label: 'Add At Least One Service',
    description: 'Create your first treatment with client-friendly description, duration, and price.',
    completed: true, // F002 complete
  },
  {
    key: 'booking_policy',
    label: 'Set Booking & Cancellation Policy',
    description: 'Define your hold deposit percentage and cancellation refund window.',
    completed: true, // F004 complete
  },
  {
    key: 'payout_onboarding',
    label: 'Connect Payout Bank Account',
    description: 'Link your bank via Stripe Connect to receive daily deposits.',
    completed: false,
    blockerCode: 'PAYOUT_ACCOUNT_NOT_LINKED',
  },
];

/**
 * Evaluates setup completeness and readiness to receive real bookings.
 * Invariant (F011): Shows exactly what still prevents taking a booking without guessing.
 */
export function evaluateBookingReadiness(steps: SetupStep[]): {
  isBookingReady: boolean;
  unresolvedBlockers: string[];
  progressPercentage: number;
} {
  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercentage = Math.round((completedCount / steps.length) * 100);

  // Essential steps required before receiving public bookings
  const blockers: string[] = [];
  const serviceStep = steps.find((s) => s.key === 'first_service');
  if (!serviceStep?.completed) {
    blockers.push('Must configure at least one active service.');
  }

  const policyStep = steps.find((s) => s.key === 'booking_policy');
  if (!policyStep?.completed) {
    blockers.push('Must define booking policies.');
  }

  return {
    isBookingReady: blockers.length === 0,
    unresolvedBlockers: blockers,
    progressPercentage,
  };
}
