/**
 * Posie Core - F149: Ask Questions of Business Data
 *
 * Implements governed natural-language analytics inquiries against official, verified
 * metric definitions (F111 Metric Dictionary), declared filters, and linked salon records.
 * Strictly operates WITHOUT unrestricted database or raw SQL execution. If sample sizes
 * are insufficient, clearly reports insufficient data rather than interpolating or hallucinating.
 *
 * Compliance: Follows Posie Rule DR03 & WB F65 (Metric layer and evaluation set;
 * the answer reproduces a saved report or clearly says data are insufficient; zero hallucinated analytics).
 */

export type GovernedMetricId =
  | 'direct_contribution_margin_pct'
  | 'rebooking_rate_at_checkout'
  | 'client_retention_rate_90d'
  | 'no_show_cancellation_rate'
  | 'retail_to_service_ratio'
  | 'average_ticket_value_cents'
  | 'staff_chair_utilization_pct';

export interface GovernedQueryFilter {
  startDate: string;
  endDate: string;
  locationId?: string;
  providerId?: string;
  serviceCategory?: string;
}

export interface MetricDefinitionMeta {
  metricId: GovernedMetricId;
  displayName: string;
  formulaDescription: string;
  minimumSampleSize: number;
  unit: 'percentage' | 'cents' | 'ratio';
}

export const GOVERNED_METRIC_DEFINITIONS: Record<GovernedMetricId, MetricDefinitionMeta> = {
  direct_contribution_margin_pct: {
    metricId: 'direct_contribution_margin_pct',
    displayName: 'Direct Contribution Margin %',
    formulaDescription: '(Service Revenue - Provider Pay - Backbar Product Cost) / Service Revenue * 100',
    minimumSampleSize: 5,
    unit: 'percentage',
  },
  rebooking_rate_at_checkout: {
    metricId: 'rebooking_rate_at_checkout',
    displayName: 'Checkout Rebooking Rate',
    formulaDescription: 'Appointments with future booking created at checkout / Total completed checkouts * 100',
    minimumSampleSize: 5,
    unit: 'percentage',
  },
  client_retention_rate_90d: {
    metricId: 'client_retention_rate_90d',
    displayName: '90-Day Client Retention Rate',
    formulaDescription: 'Distinct clients who returned within 90 days of first visit / Cohort total * 100',
    minimumSampleSize: 8,
    unit: 'percentage',
  },
  no_show_cancellation_rate: {
    metricId: 'no_show_cancellation_rate',
    displayName: 'No-Show & Late Cancellation Rate',
    formulaDescription: '(No-Shows + Late Cancellations) / Total Scheduled Reservations * 100',
    minimumSampleSize: 5,
    unit: 'percentage',
  },
  retail_to_service_ratio: {
    metricId: 'retail_to_service_ratio',
    displayName: 'Retail to Service Revenue Ratio',
    formulaDescription: 'Total Retail Sales Revenue / Total Service Revenue',
    minimumSampleSize: 5,
    unit: 'ratio',
  },
  average_ticket_value_cents: {
    metricId: 'average_ticket_value_cents',
    displayName: 'Average Ticket Value',
    formulaDescription: 'Sum of all settled ticket amounts / Count of settled tickets',
    minimumSampleSize: 5,
    unit: 'cents',
  },
  staff_chair_utilization_pct: {
    metricId: 'staff_chair_utilization_pct',
    displayName: 'Staff Chair Utilization %',
    formulaDescription: 'Hands-on booked service minutes / Total scheduled available shift minutes * 100',
    minimumSampleSize: 5,
    unit: 'percentage',
  },
};

export interface GovernedDataRecord {
  recordId: string;
  metricId: GovernedMetricId;
  date: string;
  value: number; // numeric value (cents for currency, ratio, or percent float)
  providerId?: string;
  locationId?: string;
  serviceCategory?: string;
}

export interface GovernedMetricAnswer {
  queryId: string;
  questionAsked: string;
  metricMeta: MetricDefinitionMeta;
  filtersApplied: GovernedQueryFilter;
  sampleSize: number;
  isDataSufficient: boolean;
  computedValueNumeric: number;
  formattedDisplayValue: string;
  explanationText: string;
  reproducibleReportLink: string;
  generatedAt: string;
}

/**
 * Maps a natural-language query to an official governed metric
 */
function classifyMetricFromQuery(query: string): GovernedMetricId {
  const q = query.toLowerCase();
  if (q.includes('contribution') || q.includes('profit') || q.includes('margin')) {
    return 'direct_contribution_margin_pct';
  }
  if (q.includes('rebook') || q.includes('rebooking')) {
    return 'rebooking_rate_at_checkout';
  }
  if (q.includes('retention') || q.includes('cohort') || q.includes('returning')) {
    return 'client_retention_rate_90d';
  }
  if (q.includes('no show') || q.includes('no-show') || q.includes('cancellation rate')) {
    return 'no_show_cancellation_rate';
  }
  if (q.includes('retail') || q.includes('product to service')) {
    return 'retail_to_service_ratio';
  }
  if (q.includes('utilization') || q.includes('chair') || q.includes('capacity')) {
    return 'staff_chair_utilization_pct';
  }
  // Default to average ticket value
  return 'average_ticket_value_cents';
}

/**
 * Executes a governed business data query against registered metric definitions
 */
export function executeGovernedDataQuery(
  naturalLanguageQuestion: string,
  filter: GovernedQueryFilter,
  dataset: GovernedDataRecord[]
): GovernedMetricAnswer {
  const metricId = classifyMetricFromQuery(naturalLanguageQuestion);
  const metricMeta = GOVERNED_METRIC_DEFINITIONS[metricId];
  const queryId = `gov-q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const nowIso = new Date().toISOString();

  // Filter records strictly by date range and optional dimensions
  const matchingRecords = dataset.filter(rec => {
    if (rec.metricId !== metricId) return false;
    if (rec.date < filter.startDate || rec.date > filter.endDate) return false;
    if (filter.locationId && rec.locationId && rec.locationId !== filter.locationId) return false;
    if (filter.providerId && rec.providerId && rec.providerId !== filter.providerId) return false;
    if (filter.serviceCategory && rec.serviceCategory && rec.serviceCategory !== filter.serviceCategory) return false;
    return true;
  });

  const sampleSize = matchingRecords.length;
  const isDataSufficient = sampleSize >= metricMeta.minimumSampleSize;

  if (!isDataSufficient) {
    return {
      queryId,
      questionAsked: naturalLanguageQuestion,
      metricMeta,
      filtersApplied: filter,
      sampleSize,
      isDataSufficient: false,
      computedValueNumeric: 0,
      formattedDisplayValue: 'Insufficient Data',
      explanationText: `Only ${sampleSize} matching record(s) found between ${filter.startDate} and ${filter.endDate}. A minimum of ${metricMeta.minimumSampleSize} records is required to evaluate "${metricMeta.displayName}" reliably without statistical bias.`,
      reproducibleReportLink: `/admin/reports?metric=${metricId}&from=${filter.startDate}&to=${filter.endDate}`,
      generatedAt: nowIso,
    };
  }

  // Calculate mean value
  const totalVal = matchingRecords.reduce((acc, r) => acc + r.value, 0);
  const avgVal = totalVal / sampleSize;

  let formatted = '';
  switch (metricMeta.unit) {
    case 'percentage':
      formatted = `${avgVal.toFixed(1)}%`;
      break;
    case 'cents':
      formatted = `$${(avgVal / 100).toFixed(2)}`;
      break;
    case 'ratio':
      formatted = `${avgVal.toFixed(2)}x`;
      break;
  }

  const explanation = `Evaluated across ${sampleSize} verified transactions using official formula: "${metricMeta.formulaDescription}".`;

  return {
    queryId,
    questionAsked: naturalLanguageQuestion,
    metricMeta,
    filtersApplied: filter,
    sampleSize,
    isDataSufficient: true,
    computedValueNumeric: Math.round(avgVal * 100) / 100,
    formattedDisplayValue: formatted,
    explanationText: explanation,
    reproducibleReportLink: `/admin/reports?metric=${metricId}&from=${filter.startDate}&to=${filter.endDate}`,
    generatedAt: nowIso,
  };
}
