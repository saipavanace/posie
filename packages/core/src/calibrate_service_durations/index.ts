/**
 * F197: Calibrate Service Durations from Actual Stages
 *
 * Captures optional actual hands-on, processing, and finishing stage durations,
 * proposing conservative duration and buffer updates for a service/provider after sufficient comparable observations.
 * Invariant: Provider approves all changes; does not infer protected attributes or turn delays into public staff rankings;
 * reverts to merchant-set default durations when sample size is sparse.
 */

export interface ObservedStageDuration {
  visitId: string;
  providerId: string;
  serviceId: string;
  handsOnMinutes: number;
  processingMinutes: number;
  finishingMinutes: number;
  totalActualMinutes: number;
  recordedAt: string;
}

export interface DurationCalibrationProposal {
  proposalId: string;
  serviceId: string;
  providerId: string;
  sampleSize: number;
  isSampleSizeSufficient: boolean; // Needs at least 5 comparable visits
  currentCatalogDurationMinutes: number;
  observedMedianMinutes: number;
  proposedCalibratedDurationMinutes: number;
  proposedBufferMinutes: number;
  varianceExplanation: string;
  requiresProviderApproval: true;
  status: 'proposed' | 'approved_by_provider' | 'rejected_retained_default';
}

/**
 * Calculates median from an array of numbers.
 */
function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : Math.round(((sorted[mid - 1] + sorted[mid]) / 2) * 10) / 10;
}

/**
 * Evaluates observed appointment stage durations and proposes conservative calendar buffer calibrations.
 * Invariant: Enforces a minimum sample size of 5 comparable visits before proposing changes;
 * does not generate punitive staff rankings; requires explicit practitioner review.
 */
export function proposeDurationCalibration(
  serviceId: string,
  providerId: string,
  currentCatalogDuration: number,
  observations: ObservedStageDuration[],
  minSampleSize = 5
): DurationCalibrationProposal {
  const proposalId = `calib_${serviceId}_${providerId}_${Date.now()}`;
  const matching = observations.filter((o) => o.serviceId === serviceId && o.providerId === providerId);

  if (matching.length < minSampleSize) {
    return {
      proposalId,
      serviceId,
      providerId,
      sampleSize: matching.length,
      isSampleSizeSufficient: false,
      currentCatalogDurationMinutes: currentCatalogDuration,
      observedMedianMinutes: matching.length > 0 ? median(matching.map((o) => o.totalActualMinutes)) : currentCatalogDuration,
      proposedCalibratedDurationMinutes: currentCatalogDuration,
      proposedBufferMinutes: 10,
      varianceExplanation: `INSUFFICIENT_DATA: Observed ${matching.length} visits (threshold: ${minSampleSize}). Maintaining merchant catalog default of ${currentCatalogDuration}m to prevent duration distortion.`,
      requiresProviderApproval: true,
      status: 'rejected_retained_default',
    };
  }

  const actualTotals = matching.map((o) => o.totalActualMinutes);
  const observedMedian = median(actualTotals);

  // Conservative adjustment: if observed median exceeds catalog duration, propose adjusted duration + 10m buffer
  const delta = observedMedian - currentCatalogDuration;
  let proposedCalibratedDuration = currentCatalogDuration;
  let proposedBuffer = 10;

  if (delta > 5) {
    proposedCalibratedDuration = Math.ceil(observedMedian / 5) * 5; // Round to nearest 5 min
    proposedBuffer = 15;
  } else if (delta < -10) {
    proposedCalibratedDuration = Math.max(15, Math.floor(observedMedian / 5) * 5);
    proposedBuffer = 10;
  }

  const varianceExplanation =
    delta > 0
      ? `Observed ${matching.length} visits with median duration of ${observedMedian}m (+${delta}m over ${currentCatalogDuration}m catalog baseline). Recommending ${proposedCalibratedDuration}m service duration with ${proposedBuffer}m buffer.`
      : `Observed ${matching.length} visits with median duration of ${observedMedian}m (${Math.abs(delta)}m under catalog baseline). Calibrated duration ${proposedCalibratedDuration}m with ${proposedBuffer}m buffer.`;

  return {
    proposalId,
    serviceId,
    providerId,
    sampleSize: matching.length,
    isSampleSizeSufficient: true,
    currentCatalogDurationMinutes: currentCatalogDuration,
    observedMedianMinutes: observedMedian,
    proposedCalibratedDurationMinutes: proposedCalibratedDuration,
    proposedBufferMinutes: proposedBuffer,
    varianceExplanation,
    requiresProviderApproval: true,
    status: 'proposed',
  };
}

/**
 * Practitioner approval handler for applying proposed calibrated duration to live booking rules.
 */
export function applyCalibrationDecision(
  proposal: DurationCalibrationProposal,
  approved: boolean,
  providerSignature: string
): DurationCalibrationProposal {
  if (!providerSignature) {
    throw new Error('Provider signature required to apply or reject duration calibration.');
  }

  return {
    ...proposal,
    status: approved ? 'approved_by_provider' : 'rejected_retained_default',
  };
}
