import { z } from 'zod';

export const ClientMarketingConsentSchema = z.enum(['opted_in', 'opted_out']);
export type ClientMarketingConsent = z.infer<typeof ClientMarketingConsentSchema>;

export const ClientSegmentProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  completedVisitsCount: z.number().int().nonnegative(),
  lastVisitDate: z.string().datetime().optional(),
  daysSinceLastVisit: z.number().int().nonnegative().optional(),
  hasActivePackageBalance: z.boolean().default(false),
  lifetimeSpendCents: z.number().int().nonnegative().default(0),
  marketingConsent: ClientMarketingConsentSchema,
});

export type ClientSegmentProfile = z.infer<typeof ClientSegmentProfileSchema>;

export const SegmentRuleTypeSchema = z.enum([
  'first_visit_completed',
  'active_package_holders',
  'due_for_return',
  'vip_high_spenders',
  'all_opted_in',
]);

export type SegmentRuleType = z.infer<typeof SegmentRuleTypeSchema>;

export const ClientSegmentSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  ruleType: SegmentRuleTypeSchema,
  minSpendCents: z.number().int().nonnegative().optional(),
  lapsedDaysThreshold: z.number().int().positive().optional(),
  requireMarketingConsent: z.boolean().default(true),
});

export type ClientSegment = z.infer<typeof ClientSegmentSchema>;

export interface SegmentEvaluationResult {
  segmentId: string;
  totalEvaluated: number;
  includedClients: ClientSegmentProfile[];
  excludedClients: Array<{
    clientId: string;
    clientName: string;
    email: string;
    exclusionReason: string;
  }>;
}

/**
 * Evaluates a client segment and provides transparent inclusion and exclusion reasons.
 * INVARIANT (WB F21): Never hides why a client was excluded; users can inspect the exact metrics.
 */
export function evaluateClientSegment(
  segment: ClientSegment,
  clients: ClientSegmentProfile[]
): SegmentEvaluationResult {
  const included: ClientSegmentProfile[] = [];
  const excluded: SegmentEvaluationResult['excludedClients'] = [];

  for (const client of clients) {
    // Check consent first if segment requires it
    if (segment.requireMarketingConsent && client.marketingConsent === 'opted_out') {
      excluded.push({
        clientId: client.id,
        clientName: client.name,
        email: client.email,
        exclusionReason: 'Opted out of marketing communications',
      });
      continue;
    }

    let isEligible = false;
    let reason = '';

    switch (segment.ruleType) {
      case 'first_visit_completed':
        if (client.completedVisitsCount === 1) {
          isEligible = true;
        } else if (client.completedVisitsCount === 0) {
          reason = 'No completed visits on file (0 visits)';
        } else {
          reason = `Repeat client with ${client.completedVisitsCount} completed visits (first visit filter requires exactly 1)`;
        }
        break;

      case 'active_package_holders':
        if (client.hasActivePackageBalance) {
          isEligible = true;
        } else {
          reason = 'No active prepaid package or series balance';
        }
        break;

      case 'due_for_return': {
        const threshold = segment.lapsedDaysThreshold || 42; // default 6 weeks
        const days = client.daysSinceLastVisit ?? 0;
        if (client.completedVisitsCount > 0 && days >= threshold) {
          isEligible = true;
        } else if (client.completedVisitsCount === 0) {
          reason = 'Client has never visited yet';
        } else {
          reason = `Visited ${days} days ago (below ${threshold}-day return threshold)`;
        }
        break;
      }

      case 'vip_high_spenders': {
        const minSpend = segment.minSpendCents || 50000; // $500 default
        if (client.lifetimeSpendCents >= minSpend) {
          isEligible = true;
        } else {
          reason = `Lifetime spend of $${(client.lifetimeSpendCents / 100).toFixed(
            2
          )} is below $${(minSpend / 100).toFixed(2)} threshold`;
        }
        break;
      }

      case 'all_opted_in':
        isEligible = true;
        break;
    }

    if (isEligible) {
      included.push(client);
    } else {
      excluded.push({
        clientId: client.id,
        clientName: client.name,
        email: client.email,
        exclusionReason: reason,
      });
    }
  }

  return {
    segmentId: segment.id,
    totalEvaluated: clients.length,
    includedClients: included,
    excludedClients: excluded,
  };
}
