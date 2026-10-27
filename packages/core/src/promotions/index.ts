import { z } from 'zod';

export const DiscountTypeSchema = z.enum(['percentage', 'fixed_cents']);
export type DiscountType = z.infer<typeof DiscountTypeSchema>;

export const PromotionCouponSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(2).max(25),
  title: z.string().min(1),
  discountType: DiscountTypeSchema,
  discountValue: z.number().positive(),
  minSubtotalCents: z.number().int().nonnegative().default(0),
  /** Maximum discount cap to safeguard owner margins against unexpected losses */
  maxDiscountCents: z.number().int().nonnegative().optional(),
  applicableServiceIds: z.array(z.string().uuid()).default([]),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  totalRedemptionLimit: z.number().int().positive().optional(),
  currentRedemptionsCount: z.number().int().nonnegative().default(0),
  canStackWithOtherCoupons: z.boolean().default(false),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime(),
});

export type PromotionCoupon = z.infer<typeof PromotionCouponSchema>;

export interface PromotionApplicationResult {
  isApplied: boolean;
  code: string;
  originalSubtotalCents: number;
  discountCents: number;
  finalPriceCents: number;
  breakdownMessage: string;
  rejectionReason?: string;
}

/**
 * Creates a promotion coupon with margin protection rules.
 */
export function createPromotionCoupon(params: {
  id?: string;
  code: string;
  title: string;
  discountType: DiscountType;
  discountValue: number;
  minSubtotalCents?: number;
  maxDiscountCents?: number;
  applicableServiceIds?: string[];
  validFrom?: string;
  validDaysDuration?: number;
  totalRedemptionLimit?: number;
  canStackWithOtherCoupons?: boolean;
}): PromotionCoupon {
  const now = new Date();
  const validFrom = params.validFrom || now.toISOString();
  const validUntilDate = new Date(validFrom);
  validUntilDate.setDate(validUntilDate.getDate() + (params.validDaysDuration ?? 30));

  return PromotionCouponSchema.parse({
    id: params.id || '30303030-3030-3030-3030-303030303052',
    code: params.code.trim().toUpperCase(),
    title: params.title,
    discountType: params.discountType,
    discountValue: params.discountValue,
    minSubtotalCents: params.minSubtotalCents ?? 0,
    maxDiscountCents: params.maxDiscountCents,
    applicableServiceIds: params.applicableServiceIds || [],
    validFrom,
    validUntil: validUntilDate.toISOString(),
    totalRedemptionLimit: params.totalRedemptionLimit,
    currentRedemptionsCount: 0,
    canStackWithOtherCoupons: params.canStackWithOtherCoupons ?? false,
    isActive: true,
    createdAt: now.toISOString(),
  });
}

/**
 * Evaluates and applies a promotion code to a service ticket.
 * INVARIANT: Mutually exclusive discounts NEVER stack silently.
 * INVARIANT: Respects owner margin limits (cannot drive price below owner margin floor).
 */
export function applyPromotionCode(params: {
  coupon: PromotionCoupon;
  serviceId: string;
  subtotalCents: number;
  currentlyAppliedCoupons?: PromotionCoupon[];
  ownerMarginFloorCents?: number; // minimum price below which services cannot be sold
  evaluationDate?: string;
}): PromotionApplicationResult {
  const date = params.evaluationDate ? new Date(params.evaluationDate) : new Date();
  const { coupon, subtotalCents, serviceId } = params;

  // 1. Active status check
  if (!coupon.isActive) {
    return {
      isApplied: false,
      code: coupon.code,
      originalSubtotalCents: subtotalCents,
      discountCents: 0,
      finalPriceCents: subtotalCents,
      breakdownMessage: 'Coupon is inactive.',
      rejectionReason: 'Coupon is no longer active.',
    };
  }

  // 2. Date validity check
  if (date < new Date(coupon.validFrom) || date > new Date(coupon.validUntil)) {
    return {
      isApplied: false,
      code: coupon.code,
      originalSubtotalCents: subtotalCents,
      discountCents: 0,
      finalPriceCents: subtotalCents,
      breakdownMessage: 'Coupon expired or not yet valid.',
      rejectionReason: `Coupon valid between ${new Date(coupon.validFrom).toLocaleDateString()} and ${new Date(
        coupon.validUntil
      ).toLocaleDateString()}.`,
    };
  }

  // 3. Redemption limit check
  if (
    coupon.totalRedemptionLimit !== undefined &&
    coupon.currentRedemptionsCount >= coupon.totalRedemptionLimit
  ) {
    return {
      isApplied: false,
      code: coupon.code,
      originalSubtotalCents: subtotalCents,
      discountCents: 0,
      finalPriceCents: subtotalCents,
      breakdownMessage: 'Redemption limit reached.',
      rejectionReason: 'Maximum campaign redemptions reached.',
    };
  }

  // 4. Minimum spend check
  if (subtotalCents < coupon.minSubtotalCents) {
    return {
      isApplied: false,
      code: coupon.code,
      originalSubtotalCents: subtotalCents,
      discountCents: 0,
      finalPriceCents: subtotalCents,
      breakdownMessage: 'Minimum spend not met.',
      rejectionReason: `Subtotal of $${(subtotalCents / 100).toFixed(
        2
      )} is below minimum requirement of $${(coupon.minSubtotalCents / 100).toFixed(2)}.`,
    };
  }

  // 5. Service applicability check
  if (
    coupon.applicableServiceIds.length > 0 &&
    !coupon.applicableServiceIds.includes(serviceId)
  ) {
    return {
      isApplied: false,
      code: coupon.code,
      originalSubtotalCents: subtotalCents,
      discountCents: 0,
      finalPriceCents: subtotalCents,
      breakdownMessage: 'Service not eligible for this coupon.',
      rejectionReason: 'This promo code does not apply to the selected service.',
    };
  }

  // 6. Anti-Stacking Invariant
  const existingCoupons = params.currentlyAppliedCoupons || [];
  if (existingCoupons.length > 0) {
    const allowsStacking =
      coupon.canStackWithOtherCoupons &&
      existingCoupons.every((c) => c.canStackWithOtherCoupons);

    if (!allowsStacking) {
      return {
        isApplied: false,
        code: coupon.code,
        originalSubtotalCents: subtotalCents,
        discountCents: 0,
        finalPriceCents: subtotalCents,
        breakdownMessage: 'Discounts do not stack.',
        rejectionReason:
          'This promotion cannot be combined with existing promotions. Please choose one.',
      };
    }
  }

  // 7. Calculate raw discount
  let rawDiscount = 0;
  if (coupon.discountType === 'percentage') {
    rawDiscount = Math.round(subtotalCents * (coupon.discountValue / 100));
  } else {
    rawDiscount = Math.round(coupon.discountValue);
  }

  // Apply maximum discount cap
  if (coupon.maxDiscountCents !== undefined) {
    rawDiscount = Math.min(rawDiscount, coupon.maxDiscountCents);
  }

  // 8. Margin Floor Safeguard
  const floor = params.ownerMarginFloorCents ?? 0;
  const maxAllowableDiscount = Math.max(0, subtotalCents - floor);
  const effectiveDiscount = Math.min(rawDiscount, maxAllowableDiscount);
  const finalPrice = subtotalCents - effectiveDiscount;

  return {
    isApplied: true,
    code: coupon.code,
    originalSubtotalCents: subtotalCents,
    discountCents: effectiveDiscount,
    finalPriceCents: finalPrice,
    breakdownMessage: `Applied ${coupon.code}: -$${(effectiveDiscount / 100).toFixed(
      2
    )} (${coupon.title})`,
  };
}
