import { z } from 'zod';

export const PackageSessionRedemptionRecordSchema = z.object({
  redemptionId: z.string(),
  packageId: z.string(),
  appointmentId: z.string(),
  serviceName: z.string(),
  practitionerName: z.string(),
  consumedAt: z.string().datetime(),
});
export type PackageSessionRedemptionRecord = z.infer<typeof PackageSessionRedemptionRecordSchema>;

export const PackageSeriesEntitlementSchema = z.object({
  packageId: z.string(),
  tenantId: z.string(),
  clientId: z.string(),
  clientName: z.string(),
  seriesName: z.string(),
  eligibleServiceId: z.string(),
  totalUnitsPurchased: z.number().int().positive(),
  unitsConsumed: z.number().int().nonnegative().default(0),
  unitsRemaining: z.number().int().nonnegative(),
  unitPriceCents: z.number().positive(),
  totalPricePaidCents: z.number().positive(),
  redemptions: z.array(PackageSessionRedemptionRecordSchema).default([]),
  status: z.enum(['active', 'exhausted', 'partially_refunded_closed', 'transferred', 'expired']).default('active'),
  expiresAt: z.string().datetime().optional(),
  purchasedAt: z.string().datetime(),
  closedAt: z.string().datetime().optional(),
});
export type PackageSeriesEntitlement = z.infer<typeof PackageSeriesEntitlementSchema>;

/**
 * Purchases and initializes a new service package series entitlement.
 */
export function issuePackageSeriesEntitlement(params: {
  tenantId: string;
  clientId: string;
  clientName: string;
  seriesName: string;
  eligibleServiceId: string;
  totalUnits: number;
  totalPricePaidCents: number;
  validityMonths?: number;
  currentTime?: string;
}): PackageSeriesEntitlement {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const packageId = `pkg_${Math.random().toString(36).substring(2, 9)}`;
  const unitPriceCents = Math.round(params.totalPricePaidCents / params.totalUnits);

  let expiresAt: string | undefined;
  if (params.validityMonths && params.validityMonths > 0) {
    const exp = new Date(now.getTime());
    exp.setMonth(exp.getMonth() + params.validityMonths);
    expiresAt = exp.toISOString();
  }

  return {
    packageId,
    tenantId: params.tenantId,
    clientId: params.clientId,
    clientName: params.clientName,
    seriesName: params.seriesName,
    eligibleServiceId: params.eligibleServiceId,
    totalUnitsPurchased: params.totalUnits,
    unitsConsumed: 0,
    unitsRemaining: params.totalUnits,
    unitPriceCents,
    totalPricePaidCents: params.totalPricePaidCents,
    redemptions: [],
    status: 'active',
    expiresAt,
    purchasedAt: now.toISOString(),
  };
}

/**
 * Consumes one session entitlement against a completed appointment.
 * Invariant: Prevents negative session balances.
 */
export function consumePackageSession(params: {
  packageSeries: PackageSeriesEntitlement;
  appointmentId: string;
  serviceName: string;
  practitionerName: string;
  currentTime?: string;
}): PackageSeriesEntitlement {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  if (params.packageSeries.status !== 'active') {
    throw new Error(`Package series is not active (current status: ${params.packageSeries.status}).`);
  }

  if (params.packageSeries.unitsRemaining <= 0) {
    throw new Error(`All ${params.packageSeries.totalUnitsPurchased} sessions of this series have been consumed.`);
  }

  if (params.packageSeries.expiresAt && new Date(params.packageSeries.expiresAt).getTime() <= now.getTime()) {
    throw new Error('This package series entitlement has expired.');
  }

  const newConsumed = params.packageSeries.unitsConsumed + 1;
  const newRemaining = params.packageSeries.unitsRemaining - 1;

  const redemption: PackageSessionRedemptionRecord = {
    redemptionId: `red_${Math.random().toString(36).substring(2, 9)}`,
    packageId: params.packageSeries.packageId,
    appointmentId: params.appointmentId,
    serviceName: params.serviceName,
    practitionerName: params.practitionerName,
    consumedAt: now.toISOString(),
  };

  return {
    ...params.packageSeries,
    unitsConsumed: newConsumed,
    unitsRemaining: newRemaining,
    redemptions: [...params.packageSeries.redemptions, redemption],
    status: newRemaining === 0 ? 'exhausted' : 'active',
    closedAt: newRemaining === 0 ? now.toISOString() : undefined,
  };
}

/**
 * Partially refunds an active package series.
 * Invariant: "A refund cannot leave already consumed sessions available again."
 * Refunds unconsumed sessions, revokes remaining units to 0, and permanently closes the series.
 */
export function refundRemainingPackageSessions(params: {
  packageSeries: PackageSeriesEntitlement;
  reason: string;
  currentTime?: string;
}): {
  updatedPackageSeries: PackageSeriesEntitlement;
  refundedUnitsCount: number;
  refundAmountCents: number;
  auditNotice: string;
} {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  if (params.packageSeries.unitsRemaining <= 0) {
    throw new Error('No unconsumed sessions remaining to refund.');
  }

  const refundedUnitsCount = params.packageSeries.unitsRemaining;
  const refundAmountCents = refundedUnitsCount * params.packageSeries.unitPriceCents;

  const updatedPackageSeries: PackageSeriesEntitlement = {
    ...params.packageSeries,
    unitsRemaining: 0, // Invariant: Immediately revoke remaining units!
    status: 'partially_refunded_closed',
    closedAt: now.toISOString(),
  };

  const auditNotice =
    `Package Refund Completed: ${refundedUnitsCount} unconsumed sessions refunded for $${(refundAmountCents / 100).toFixed(2)}. The ${params.packageSeries.unitsConsumed} previously consumed sessions remain permanently recognized and locked; remaining entitlement units revoked.`;

  return {
    updatedPackageSeries,
    refundedUnitsCount,
    refundAmountCents,
    auditNotice,
  };
}
