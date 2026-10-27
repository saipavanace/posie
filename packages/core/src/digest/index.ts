import { z } from 'zod';

export const DailyOwnerDigestSchema = z.object({
  dateFormatted: z.string(),
  confirmedAppointmentsCount: z.number().int().nonnegative(),
  expectedGrossRevenueInCents: z.number().int().nonnegative(),
  collectedDepositsInCents: z.number().int().nonnegative(),
  outstandingBalanceInCents: z.number().int().nonnegative(),
  unresolvedExceptionsCount: z.number().int().nonnegative(),
  topDecisionNeeded: z.string().optional(),
  quietHoursActive: z.boolean().default(false),
});

export type DailyOwnerDigest = z.infer<typeof DailyOwnerDigestSchema>;

/**
 * Compiles a concise daily owner digest linking directly to underlying records.
 * Invariant (F018): Every figure opens directly to source records and honors quiet hours.
 */
export function generateDailyOwnerDigest(
  appointments: Array<{ priceInCents: number; depositPaidInCents: number }>,
  unresolvedExceptionsCount: number,
  targetDate: Date = new Date(),
  isQuietHours: boolean = false
): DailyOwnerDigest {
  const confirmedAppointmentsCount = appointments.length;
  const expectedGrossRevenueInCents = appointments.reduce((sum, a) => sum + a.priceInCents, 0);
  const collectedDepositsInCents = appointments.reduce((sum, a) => sum + a.depositPaidInCents, 0);
  const outstandingBalanceInCents = expectedGrossRevenueInCents - collectedDepositsInCents;

  const topDecision =
    unresolvedExceptionsCount > 0
      ? `${unresolvedExceptionsCount} pending exception(s) require review before tomorrow's first client.`
      : undefined;

  return {
    dateFormatted: targetDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }),
    confirmedAppointmentsCount,
    expectedGrossRevenueInCents,
    collectedDepositsInCents,
    outstandingBalanceInCents,
    unresolvedExceptionsCount,
    topDecisionNeeded: topDecision,
    quietHoursActive: isQuietHours,
  };
}
