import { z } from 'zod';

export const ReferralClaimStatusSchema = z.enum([
  'pending_first_visit',
  'qualified_credited',
  'rejected_self_referral',
  'rejected_already_referred',
  'voided_canceled_visit',
]);

export type ReferralClaimStatus = z.infer<typeof ReferralClaimStatusSchema>;

export const ReferralRewardSchema = z.object({
  referrerCreditCents: z.number().int().nonnegative().default(2000), // $20.00
  referredDiscountCents: z.number().int().nonnegative().default(2000), // $20.00 off 1st visit
});

export type ReferralReward = z.infer<typeof ReferralRewardSchema>;

export const ReferralCodeProfileSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  clientPhone: z.string().min(1),
  referralCode: z.string().min(3).max(20),
  shareUrl: z.string().url(),
  totalEarnedCreditsCents: z.number().int().nonnegative().default(0),
  availableCreditsCents: z.number().int().nonnegative().default(0),
  createdAt: z.string().datetime(),
});

export type ReferralCodeProfile = z.infer<typeof ReferralCodeProfileSchema>;

export const ReferralClaimRecordSchema = z.object({
  id: z.string().uuid(),
  referrerClientId: z.string().uuid(),
  referredClientId: z.string().uuid(),
  referredClientName: z.string().min(1),
  referredClientEmail: z.string().email(),
  referredClientPhone: z.string().min(1),
  referralCodeUsed: z.string(),
  appointmentId: z.string().uuid(),
  status: ReferralClaimStatusSchema,
  reward: ReferralRewardSchema,
  rejectionReason: z.string().optional(),
  creditedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ReferralClaimRecord = z.infer<typeof ReferralClaimRecordSchema>;

/**
 * Generates an attributable referral profile for a client.
 */
export function generateClientReferralProfile(params: {
  id?: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  customSlug?: string;
  baseUrl?: string;
}): ReferralCodeProfile {
  const slug =
    params.customSlug ||
    `${params.clientName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase()}-GLOW`;
  const base = params.baseUrl || 'https://glow.posieatelier.com/refer';

  return ReferralCodeProfileSchema.parse({
    id: params.id || '10101010-1010-1010-1010-101010101051',
    clientId: params.clientId,
    clientName: params.clientName,
    clientEmail: params.clientEmail.toLowerCase(),
    clientPhone: params.clientPhone,
    referralCode: slug,
    shareUrl: `${base}?code=${slug}`,
    totalEarnedCreditsCents: 0,
    availableCreditsCents: 0,
    createdAt: new Date().toISOString(),
  });
}

/**
 * Claims a referral during booking of a first appointment.
 * INVARIANT: Self-referrals and duplicate claims are strictly rejected.
 */
export function claimReferralOnBooking(params: {
  claimId?: string;
  referrerProfile: ReferralCodeProfile;
  referredClient: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  appointmentId: string;
  existingClaimsForReferredClient?: ReferralClaimRecord[];
  rewardConfig?: ReferralReward;
}): ReferralClaimRecord {
  const now = new Date().toISOString();
  const reward = params.rewardConfig || {
    referrerCreditCents: 2000,
    referredDiscountCents: 2000,
  };

  // 1. Self-referral check
  const isSelfReferral =
    params.referrerProfile.clientId === params.referredClient.id ||
    params.referrerProfile.clientEmail.toLowerCase() ===
      params.referredClient.email.toLowerCase() ||
    params.referrerProfile.clientPhone === params.referredClient.phone;

  if (isSelfReferral) {
    return ReferralClaimRecordSchema.parse({
      id: params.claimId || '20202020-2020-2020-2020-202020202051',
      referrerClientId: params.referrerProfile.clientId,
      referredClientId: params.referredClient.id,
      referredClientName: params.referredClient.name,
      referredClientEmail: params.referredClient.email,
      referredClientPhone: params.referredClient.phone,
      referralCodeUsed: params.referrerProfile.referralCode,
      appointmentId: params.appointmentId,
      status: 'rejected_self_referral',
      reward,
      rejectionReason: 'Self-referrals are not eligible for referral credits.',
      createdAt: now,
      updatedAt: now,
    });
  }

  // 2. Duplicate referral check
  const alreadyClaimed = (params.existingClaimsForReferredClient || []).some(
    (c) => c.status === 'qualified_credited' || c.status === 'pending_first_visit'
  );

  if (alreadyClaimed) {
    return ReferralClaimRecordSchema.parse({
      id: params.claimId || '20202020-2020-2020-2020-202020202051',
      referrerClientId: params.referrerProfile.clientId,
      referredClientId: params.referredClient.id,
      referredClientName: params.referredClient.name,
      referredClientEmail: params.referredClient.email,
      referredClientPhone: params.referredClient.phone,
      referralCodeUsed: params.referrerProfile.referralCode,
      appointmentId: params.appointmentId,
      status: 'rejected_already_referred',
      reward,
      rejectionReason: 'Client has already been referred previously.',
      createdAt: now,
      updatedAt: now,
    });
  }

  return ReferralClaimRecordSchema.parse({
    id: params.claimId || '20202020-2020-2020-2020-202020202051',
    referrerClientId: params.referrerProfile.clientId,
    referredClientId: params.referredClient.id,
    referredClientName: params.referredClient.name,
    referredClientEmail: params.referredClient.email,
    referredClientPhone: params.referredClient.phone,
    referralCodeUsed: params.referrerProfile.referralCode,
    appointmentId: params.appointmentId,
    status: 'pending_first_visit',
    reward,
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Credits the referral benefit after a qualifying first visit is completed.
 * INVARIANT: Canceled or no-show appointments void the claim; credits only disburse on completion.
 */
export function settleReferralOnVisitOutcome(params: {
  claim: ReferralClaimRecord;
  referrerProfile: ReferralCodeProfile;
  visitOutcome: 'completed' | 'canceled' | 'no_show';
}): {
  updatedClaim: ReferralClaimRecord;
  updatedReferrerProfile: ReferralCodeProfile;
} {
  const now = new Date().toISOString();

  if (params.visitOutcome === 'canceled' || params.visitOutcome === 'no_show') {
    const updatedClaim = ReferralClaimRecordSchema.parse({
      ...params.claim,
      status: 'voided_canceled_visit',
      rejectionReason: `Appointment was ${params.visitOutcome}. Referral benefits voided.`,
      updatedAt: now,
    });
    return { updatedClaim, updatedReferrerProfile: params.referrerProfile };
  }

  if (params.claim.status !== 'pending_first_visit') {
    throw new Error(
      `Cannot settle referral claim with status "${params.claim.status}". Only pending claims can qualify.`
    );
  }

  const updatedClaim = ReferralClaimRecordSchema.parse({
    ...params.claim,
    status: 'qualified_credited',
    creditedAt: now,
    updatedAt: now,
  });

  const creditDelta = params.claim.reward.referrerCreditCents;
  const updatedReferrerProfile = ReferralCodeProfileSchema.parse({
    ...params.referrerProfile,
    totalEarnedCreditsCents: params.referrerProfile.totalEarnedCreditsCents + creditDelta,
    availableCreditsCents: params.referrerProfile.availableCreditsCents + creditDelta,
  });

  return { updatedClaim, updatedReferrerProfile };
}
