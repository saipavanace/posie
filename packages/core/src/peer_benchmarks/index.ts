/**
 * F182: Privacy Preserving Peer Benchmarks
 *
 * Offers opt-in aggregated comparisons by business type, maturity, and metro tier,
 * strictly enforcing k-anonymity minimum cell sizes and automatic suppression to eliminate inference risk.
 */

export interface SalonBenchmarkMetrics {
  rebookRatePct: number;
  retailToServiceRatioPct: number;
  clientRetention90DayPct: number;
  revPerHourChair: number;
}

export interface SalonBenchmarkProfile {
  salonId: string;
  salonName: string;
  businessType: 'hair_salon' | 'nail_bar' | 'medspa' | 'wellness_studio';
  maturityTier: 'startup_1yr' | 'growth_2_4yr' | 'mature_5yr_plus';
  metroTier: 'tier_1_major' | 'tier_2_metro' | 'tier_3_regional';
  optInBenchmarking: boolean;
  metrics: SalonBenchmarkMetrics;
}

export interface BenchmarkCohortQuery {
  businessType: 'hair_salon' | 'nail_bar' | 'medspa' | 'wellness_studio';
  maturityTier?: 'startup_1yr' | 'growth_2_4yr' | 'mature_5yr_plus';
  metroTier?: 'tier_1_major' | 'tier_2_metro' | 'tier_3_regional';
}

export interface BenchmarkDistribution {
  metricKey: keyof SalonBenchmarkMetrics;
  sampleSize: number;
  p25: number;
  median: number;
  p75: number;
}

export interface BenchmarkReport {
  query: BenchmarkCohortQuery;
  totalEligibleParticipants: number;
  qualifyingCohortSize: number;
  isSuppressed: boolean;
  suppressionReason?: string;
  minimumCellSizeThreshold: number;
  generatedAt: string;
  distributions?: Record<keyof SalonBenchmarkMetrics, BenchmarkDistribution>;
}

/**
 * Calculates median and percentile values from an array of numbers.
 */
function calculatePercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  if (lower === upper) return sorted[lower];
  return Math.round((sorted[lower] * (1 - weight) + sorted[upper] * weight) * 100) / 100;
}

/**
 * Generates an aggregated peer benchmark report while strictly enforcing privacy protection.
 * If the qualifying consenting cohort has fewer than minCellSize independent businesses,
 * the entire benchmark is suppressed to prevent inferring individual salon metrics.
 */
export function generatePeerBenchmarkReport(
  participants: SalonBenchmarkProfile[],
  query: BenchmarkCohortQuery,
  minCellSize = 10
): BenchmarkReport {
  // Filter only participants that explicitly gave opt-in consent
  const consentingSalons = participants.filter((p) => p.optInBenchmarking);

  // Match against query filters
  const cohort = consentingSalons.filter((p) => {
    if (p.businessType !== query.businessType) return false;
    if (query.maturityTier && p.maturityTier !== query.maturityTier) return false;
    if (query.metroTier && p.metroTier !== query.metroTier) return false;
    return true;
  });

  const generatedAt = new Date().toISOString();

  // Strict inference check: enforce k-anonymity cell size
  if (cohort.length < minCellSize) {
    return {
      query,
      totalEligibleParticipants: consentingSalons.length,
      qualifyingCohortSize: cohort.length,
      isSuppressed: true,
      suppressionReason: `INSUFFICIENT_CELL_SIZE_K_ANONYMITY: Cohort has ${cohort.length} consenting businesses, which is below the minimum threshold of ${minCellSize}. Data suppressed to prevent individual inference risk.`,
      minimumCellSizeThreshold: minCellSize,
      generatedAt,
    };
  }

  // Calculate non-identifying distribution percentiles for all key metrics
  const metricKeys: Array<keyof SalonBenchmarkMetrics> = [
    'rebookRatePct',
    'retailToServiceRatioPct',
    'clientRetention90DayPct',
    'revPerHourChair',
  ];

  const distributions = {} as Record<keyof SalonBenchmarkMetrics, BenchmarkDistribution>;

  for (const key of metricKeys) {
    const rawValues = cohort.map((s) => s.metrics[key]);
    distributions[key] = {
      metricKey: key,
      sampleSize: cohort.length,
      p25: calculatePercentile(rawValues, 25),
      median: calculatePercentile(rawValues, 50),
      p75: calculatePercentile(rawValues, 75),
    };
  }

  return {
    query,
    totalEligibleParticipants: consentingSalons.length,
    qualifyingCohortSize: cohort.length,
    isSuppressed: false,
    minimumCellSizeThreshold: minCellSize,
    generatedAt,
    distributions,
  };
}
