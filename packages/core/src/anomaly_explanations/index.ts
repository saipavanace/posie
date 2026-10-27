/**
 * F127 — Business Anomaly Explanations
 *
 * Evaluates operational baselines to detect booking drops, schedule gaps, payment failure surges,
 * and fee rate drifts with root-cause attribution and suggested remediation checks.
 *
 * KEY INVARIANT (Basis: I; Analytics to Action, WB F58, WB F88):
 * Governed Metrics & Low-Sample Suppression.
 * "Low sample sizes and missing data suppress overconfident alerts."
 * If the observation count is below statistical significance thresholds, alerts are
 * automatically suppressed to prevent alarm fatigue and panic over normal small-business variance.
 * Every confirmed anomaly links to raw source records.
 */

export type AnomalyCategory =
  | 'booking_volume_drop'
  | 'schedule_empty_gap'
  | 'payment_failure_spike'
  | 'merchant_fee_drift';

export interface MetricObservation {
  currentValue: number;
  baselineValue: number; // e.g. 4-week moving average
  sampleSize: number;
  minSampleSizeRequired: number;
  unit: string; // '%', 'hours', 'count', '$'
}

export interface BusinessAnomalyAlert {
  id: string;
  category: AnomalyCategory;
  title: string;
  isAlertSuppressed: boolean;
  suppressionReason?: string;
  percentageDeviation: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  rootCauseAttribution: string;
  sourceRecordIds: string[];
  suggestedChecks: string[];
}

export interface AnomalyEvaluationContext {
  studioId: string;
  category: AnomalyCategory;
  observation: MetricObservation;
  sourceRecordIds: string[];
  observedDriverDetails?: string;
}

/**
 * Analyzes operational metrics against historical baselines and suppresses
 * premature alerts when sample sizes are statistically insufficient.
 */
export function evaluateBusinessAnomaly(context: AnomalyEvaluationContext): BusinessAnomalyAlert {
  const { observation, category, sourceRecordIds, observedDriverDetails } = context;
  const id = `anom_${category}_${Date.now()}`;

  // 1. Invariant: Low Sample Size Suppression
  if (observation.sampleSize < observation.minSampleSizeRequired) {
    return {
      id,
      category,
      title: `${category.replace(/_/g, ' ')} (Suppressed)`,
      isAlertSuppressed: true,
      suppressionReason: `Insufficient sample size (${observation.sampleSize}/${observation.minSampleSizeRequired} required). Alert suppressed to prevent false alarm.`,
      percentageDeviation: 0,
      severity: 'low',
      rootCauseAttribution: 'Statistical variance within small sample size window.',
      sourceRecordIds,
      suggestedChecks: ['Continue monitoring baseline as appointment volume accrues.'],
    };
  }

  // 2. Compute Deviation
  const diff = observation.currentValue - observation.baselineValue;
  const percentageDeviation =
    observation.baselineValue !== 0
      ? Math.round((diff / observation.baselineValue) * 100 * 10) / 10
      : 0;

  // 3. Determine Anomaly Classification
  let severity: BusinessAnomalyAlert['severity'] = 'low';
  let title = '';
  let rootCauseAttribution = '';
  const suggestedChecks: string[] = [];

  switch (category) {
    case 'booking_volume_drop':
      title = `Unusual Booking Drop: ${Math.abs(percentageDeviation)}% Below 4-Week Baseline`;
      severity = percentageDeviation <= -30 ? 'high' : 'medium';
      rootCauseAttribution =
        observedDriverDetails ||
        `Bookings dropped to ${observation.currentValue} visits vs baseline of ${observation.baselineValue} visits.`;
      suggestedChecks.push('Review direct booking website status for connectivity drops.');
      suggestedChecks.push('Trigger automated win-back automation recipe to rebook 45-day lapsed clients.');
      break;

    case 'schedule_empty_gap':
      title = `Schedule Gap Surge: ${observation.currentValue} Open Hours Next Week`;
      severity = observation.currentValue >= 15 ? 'high' : 'medium';
      rootCauseAttribution =
        observedDriverDetails ||
        `Open calendar availability exceeds normal studio buffer by ${Math.round(diff)} hours.`;
      suggestedChecks.push('Dispatch targeted SMS broadcast offer for off-peak afternoon slots.');
      suggestedChecks.push('Offer waitlist candidates early access to fill sudden practitioner openings.');
      break;

    case 'payment_failure_spike':
      title = `Terminal & Online Payment Failure Surge: ${observation.currentValue} Declines`;
      severity = observation.currentValue >= 5 ? 'critical' : 'high';
      rootCauseAttribution =
        observedDriverDetails ||
        `Card decline rate spiked to ${observation.currentValue} errors in short window.`;
      suggestedChecks.push('Verify Stripe WisePOS E hardware reader internet connectivity.');
      suggestedChecks.push('Check payment gateway status dashboard for upstream processing incidents.');
      break;

    case 'merchant_fee_drift':
      title = `Effective Merchant Processing Fee Drift: +${percentageDeviation}% Increase`;
      severity = 'medium';
      rootCauseAttribution =
        observedDriverDetails ||
        `Effective fee percentage shifted from ${observation.baselineValue}% to ${observation.currentValue}%.`;
      suggestedChecks.push('Inspect interchange-plus statement for international or corporate card surcharges.');
      break;
  }

  return {
    id,
    category,
    title,
    isAlertSuppressed: false,
    percentageDeviation,
    severity,
    rootCauseAttribution,
    sourceRecordIds,
    suggestedChecks,
  };
}
