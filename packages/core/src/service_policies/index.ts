import { z } from 'zod';

export const ServiceSpecificPolicySchema = z.object({
  serviceId: z.string().uuid(),
  depositPercentage: z.number().min(0).max(100),
  cancellationWindowHours: z.number().int().positive(),
  preparationInstructions: z.string(),
  requiredWaiverCategory: z.enum(['none', 'chemical_peel_waiver', 'lash_adhesive_waiver', 'dermaplaning_waiver']).default('none'),
  lateCancelFeePercentage: z.number().min(0).max(100).default(50),
});

export type ServiceSpecificPolicy = z.infer<typeof ServiceSpecificPolicySchema>;

/**
 * Resolves the effective booking and cancellation policy for a specific service.
 * Invariant (F026 / WB U21): High-prep services (e.g. chemical peels) can require tailored deposit %
 * and advance cancellation notice without forcing an inflexible studio-wide rule across quick visits.
 */
export function resolveEffectiveServicePolicy(
  servicePolicy?: ServiceSpecificPolicy,
  studioDefault = { depositPercentage: 20, cancellationWindowHours: 24, lateCancelFeePercentage: 50 }
): {
  depositPercentage: number;
  cancellationWindowHours: number;
  lateCancelFeePercentage: number;
  preparationInstructions?: string;
  requiredWaiverCategory: string;
} {
  if (!servicePolicy) {
    return {
      depositPercentage: studioDefault.depositPercentage,
      cancellationWindowHours: studioDefault.cancellationWindowHours,
      lateCancelFeePercentage: studioDefault.lateCancelFeePercentage,
      requiredWaiverCategory: 'none',
    };
  }

  return {
    depositPercentage: servicePolicy.depositPercentage,
    cancellationWindowHours: servicePolicy.cancellationWindowHours,
    lateCancelFeePercentage: servicePolicy.lateCancelFeePercentage,
    preparationInstructions: servicePolicy.preparationInstructions,
    requiredWaiverCategory: servicePolicy.requiredWaiverCategory,
  };
}
