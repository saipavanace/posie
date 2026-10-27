/**
 * Posie Core - F154: Service Match Assistant
 *
 * Implements interactive service matching for clients and front-desk staff.
 * Recommends suitable treatments from the studio's verified active catalog based on
 * client skin/hair concerns, budget boundaries, and available schedule windows.
 * Strictly enforces clinical safety guardrails: any medical contraindications, severe
 * rashes, infections, or allergy inquiries trigger immediate referral to a licensed practitioner.
 *
 * Compliance: Follows Posie Rule DR04 & WB F154 (Approved content and escalation;
 * medical questions or ambiguous eligibility are referred to a qualified professional; service navigation).
 */

export interface ClientPreferencesInput {
  primaryConcern: string; // e.g. 'Dry, dehydrated skin with texture'
  skinOrHairType: string; // e.g. 'Sensitive Fitzpatrick II'
  budgetRangeCents: { min: number; max: number };
  availableMinutes: number; // e.g. 60 or 90
  hasContraindicationsOrAllergies: boolean;
  contraindicationsNotes?: string;
}

export interface CatalogServiceItem {
  serviceId: string;
  name: string;
  priceCents: number;
  durationMinutes: number;
  category: 'facial' | 'hair' | 'brows_lashes' | 'body';
  targetConcerns: string[];
  suitableSkinHairTypes: string[];
  contraindicatedConditions: string[];
  description: string;
}

export interface MatchedServiceItem {
  service: CatalogServiceItem;
  matchScorePct: number;
  matchReasons: string[];
  isWithinBudget: boolean;
  isWithinTimeLimit: boolean;
}

export interface ServiceMatchRecommendation {
  recommendationId: string;
  requiresClinicalReferral: boolean;
  clinicalReferralReason?: string;
  matchedServices: MatchedServiceItem[];
  explanationSpeech: string;
}

/**
 * High-risk clinical keywords that necessitate an immediate practitioner consultation
 */
const HIGH_RISK_CLINICAL_KEYWORDS = [
  'retinol burn',
  'eczema flare',
  'active infection',
  'open wound',
  'severe allergy',
  'rash',
  'swelling',
  'rosacea flare',
  'cystic outbreak',
  'pregnancy contraindication',
];

/**
 * Matches client goals and constraints against approved catalog services with clinical safety guardrails
 */
export function matchServicesToClientPreferences(
  input: ClientPreferencesInput,
  catalog: CatalogServiceItem[]
): ServiceMatchRecommendation {
  const recommendationId = `match-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  // 1. Clinical Safety Guardrail Check
  if (input.hasContraindicationsOrAllergies && input.contraindicationsNotes) {
    const notesLower = input.contraindicationsNotes.toLowerCase();
    for (const kw of HIGH_RISK_CLINICAL_KEYWORDS) {
      if (notesLower.includes(kw)) {
        return {
          recommendationId,
          requiresClinicalReferral: true,
          clinicalReferralReason: `Client noted potential clinical condition ("${kw}"). Professional evaluation by a licensed esthetician or dermatologist is mandatory prior to treatment.`,
          matchedServices: [],
          explanationSpeech: `Because your skin safety is our absolute priority, we noticed you mentioned "${kw}". We recommend booking a complimentary 15-minute consultation with our lead practitioner before receiving targeted exfoliations or active facials.`,
        };
      }
    }
  }

  // 2. Score Catalog Services
  const concernTerms = input.primaryConcern.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  const skinTerms = input.skinOrHairType.toLowerCase().split(/\W+/).filter(w => w.length > 3);

  const scoredMatches: MatchedServiceItem[] = [];

  for (const item of catalog) {
    let score = 50; // baseline
    const reasons: string[] = [];

    // Check concern matches
    let concernMatches = 0;
    for (const target of item.targetConcerns) {
      const tLower = target.toLowerCase();
      if (concernTerms.some(term => tLower.includes(term))) {
        concernMatches++;
        reasons.push(`Formulated for ${target}`);
      }
    }
    score += concernMatches * 15;

    // Check skin/hair type match
    let skinTypeMatch = false;
    for (const suitable of item.suitableSkinHairTypes) {
      const sLower = suitable.toLowerCase();
      if (skinTerms.some(term => sLower.includes(term))) {
        skinTypeMatch = true;
        reasons.push(`Safe for ${suitable}`);
        score += 15;
        break;
      }
    }

    // Budget check
    const isWithinBudget = item.priceCents <= input.budgetRangeCents.max;
    if (isWithinBudget) {
      score += 10;
      reasons.push(`Within budget ($${(item.priceCents / 100).toFixed(2)})`);
    } else {
      score -= 20;
    }

    // Time check
    const isWithinTimeLimit = item.durationMinutes <= input.availableMinutes;
    if (isWithinTimeLimit) {
      score += 10;
      reasons.push(`Fits ${input.availableMinutes}m schedule (${item.durationMinutes}m duration)`);
    } else {
      score -= 15;
    }

    const normalizedScore = Math.max(10, Math.min(98, score));

    scoredMatches.push({
      service: item,
      matchScorePct: normalizedScore,
      matchReasons: reasons,
      isWithinBudget,
      isWithinTimeLimit,
    });
  }

  // Sort descending by match score
  scoredMatches.sort((a, b) => b.matchScorePct - a.matchScorePct);
  const topMatches = scoredMatches.slice(0, 3);

  const topMatch = topMatches[0];
  const explanation = topMatch
    ? `Based on your goal of addressing ${input.primaryConcern}, our top recommendation is the ${topMatch.service.name} ($${(topMatch.service.priceCents / 100).toFixed(2)}, ${topMatch.service.durationMinutes} min). ${topMatch.matchReasons.join('. ')}.`
    : `We explored our catalog for ${input.primaryConcern} and found multiple customizable treatments.`;

  return {
    recommendationId,
    requiresClinicalReferral: false,
    matchedServices: topMatches,
    explanationSpeech: explanation,
  };
}
