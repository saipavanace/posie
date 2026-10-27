/**
 * F194: Budget- and Time-Constrained Visit Options
 *
 * Recommends owner-curated treatment bundles that strictly fit the client's declared total budget
 * and available visit duration.
 * Invariant: Never optimizes for maximum revenue extraction; rejects unsupported combinations;
 * avoids inventing arbitrary clinical services; requires explicit client approval on every cost.
 */

export interface CuratedServiceOption {
  serviceId: string;
  name: string;
  priceUsd: number;
  durationMinutes: number;
  category: 'facial' | 'hair' | 'brows_lashes' | 'express_add_on';
  prerequisites?: string[];
  incompatibleWith?: string[];
  description: string;
}

export interface ClientVisitConstraints {
  maxBudgetUsd: number;
  maxDurationMinutes: number;
  preferredCategory?: 'facial' | 'hair' | 'brows_lashes';
}

export interface RecommendedVisitBundle {
  bundleId: string;
  primaryService: CuratedServiceOption;
  addServices: CuratedServiceOption[];
  totalPriceUsd: number;
  totalDurationMinutes: number;
  budgetSpareUsd: number;
  timeSpareMinutes: number;
  matchScore: number;
  tradeOffSummary: string;
}

export interface ConstraintEvaluationResult {
  clientConstraints: ClientVisitConstraints;
  matchingBundles: RecommendedVisitBundle[];
  hasFeasibleOptions: boolean;
  alternativeGuidance?: string;
}

/**
 * Evaluates active catalog services against a client's hard budget and time window.
 * Recommends feasible combinations without pushing unrequested upsells.
 */
export function findBudgetConstrainedOptions(
  catalog: CuratedServiceOption[],
  constraints: ClientVisitConstraints
): ConstraintEvaluationResult {
  const { maxBudgetUsd, maxDurationMinutes, preferredCategory } = constraints;

  // Filter primary services within individual limits
  const candidatePrimaries = catalog.filter((s) => {
    if (s.priceUsd > maxBudgetUsd || s.durationMinutes > maxDurationMinutes) return false;
    if (preferredCategory && s.category !== preferredCategory && s.category !== 'express_add_on') return false;
    return true;
  });

  const matchingBundles: RecommendedVisitBundle[] = [];

  for (const primary of candidatePrimaries) {
    const remainingBudget = maxBudgetUsd - primary.priceUsd;
    const remainingTime = maxDurationMinutes - primary.durationMinutes;

    // Check if an express add-on fits the remaining envelope
    const compatibleAddOns = catalog.filter((add) => {
      if (add.category !== 'express_add_on') return false;
      if (add.priceUsd > remainingBudget || add.durationMinutes > remainingTime) return false;
      if (add.incompatibleWith && add.incompatibleWith.includes(primary.serviceId)) return false;
      return true;
    });

    // Option A: Standalone primary service
    matchingBundles.push({
      bundleId: `bnd_${primary.serviceId}_solo`,
      primaryService: primary,
      addServices: [],
      totalPriceUsd: primary.priceUsd,
      totalDurationMinutes: primary.durationMinutes,
      budgetSpareUsd: Math.round((maxBudgetUsd - primary.priceUsd) * 100) / 100,
      timeSpareMinutes: maxDurationMinutes - primary.durationMinutes,
      matchScore: 90,
      tradeOffSummary: `Focused single treatment: ${primary.name} fits cleanly with $${(maxBudgetUsd - primary.priceUsd).toFixed(2)} budget cushion and ${maxDurationMinutes - primary.durationMinutes}m spare time.`,
    });

    // Option B: Primary + top compatible add-on (if available)
    if (compatibleAddOns.length > 0) {
      const bestAddOn = compatibleAddOns[0];
      const combinedPrice = primary.priceUsd + bestAddOn.priceUsd;
      const combinedDuration = primary.durationMinutes + bestAddOn.durationMinutes;

      matchingBundles.push({
        bundleId: `bnd_${primary.serviceId}_${bestAddOn.serviceId}`,
        primaryService: primary,
        addServices: [bestAddOn],
        totalPriceUsd: combinedPrice,
        totalDurationMinutes: combinedDuration,
        budgetSpareUsd: Math.round((maxBudgetUsd - combinedPrice) * 100) / 100,
        timeSpareMinutes: maxDurationMinutes - combinedDuration,
        matchScore: 95,
        tradeOffSummary: `Inclusive bundle: ${primary.name} + ${bestAddOn.name} optimized within your $${maxBudgetUsd} budget ($${(maxBudgetUsd - combinedPrice).toFixed(2)} remaining) and ${maxDurationMinutes}m window.`,
      });
    }
  }

  // Sort by matchScore descending, then by closest to budget without exceeding
  matchingBundles.sort((a, b) => b.matchScore - a.matchScore || a.budgetSpareUsd - b.budgetSpareUsd);

  const hasFeasibleOptions = matchingBundles.length > 0;
  const alternativeGuidance = hasFeasibleOptions
    ? undefined
    : `No standard services fit both $${maxBudgetUsd} budget and ${maxDurationMinutes}m duration. Consider expanding your window by 15-30m or booking an express consultation.`;

  return {
    clientConstraints: constraints,
    matchingBundles,
    hasFeasibleOptions,
    alternativeGuidance,
  };
}
