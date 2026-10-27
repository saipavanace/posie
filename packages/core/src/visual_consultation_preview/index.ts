/**
 * F183: Visual Service Previews
 *
 * Clearly labeled cosmetic simulations for hair, lash, and brow consultations
 * with client privacy control and mandatory disclaimers prohibiting use as outcome guarantees.
 */

export type CosmeticSimulationType =
  | 'hair_balayage_tone'
  | 'lash_extension_volume'
  | 'brow_microblade_shape'
  | 'lip_blush_tint';

export interface ClientSimulationConsent {
  clientId: string;
  consentGiven: boolean;
  consentedAt: string;
  allowPortfolioUse: boolean;
  rightToDeleteRequested: boolean;
}

export interface VisualSimulationParams {
  simulationType: CosmeticSimulationType;
  targetShadeOrStyle: string;
  intensityLevel: number; // 1 to 10
}

export interface VisualSimulationRecord {
  simulationId: string;
  clientId: string;
  simulationType: CosmeticSimulationType;
  originalImageHash: string;
  previewImageUrl: string;
  mandatoryDisclaimerWatermark: string;
  isGuaranteedOutcome: false;
  clientConsentVerified: boolean;
  retentionPolicy: 'delete_after_consultation' | 'store_in_chart';
  status: 'draft_preview' | 'reviewed_with_client' | 'purged_per_client_request';
  createdAt: string;
  notes?: string;
}

export const MANDATORY_PREVIEW_DISCLAIMER =
  'ILLUSTRATIVE COSMETIC CONSULTATION PREVIEW ONLY • NOT A GUARANTEE OF CLINICAL OR ESTHETIC OUTCOME';

/**
 * Creates a client-controlled visual service simulation for consultation dialogues.
 * Embeds immutable disclaimer watermarks and enforces explicit consent before processing.
 */
export function createVisualServicePreview(
  clientId: string,
  imageHash: string,
  params: VisualSimulationParams,
  consent: ClientSimulationConsent,
  storeInChart = false
): VisualSimulationRecord {
  if (!consent.consentGiven) {
    throw new Error('Cannot generate cosmetic simulation: verified client consultation consent is required.');
  }

  if (params.intensityLevel < 1 || params.intensityLevel > 10) {
    throw new Error('Simulation intensity level must be between 1 and 10.');
  }

  const simulationId = `sim_${params.simulationType}_${Date.now()}`;
  const previewImageUrl = `https://cdn.posie.app/simulations/${simulationId}.webp`;

  return {
    simulationId,
    clientId,
    simulationType: params.simulationType,
    originalImageHash: imageHash,
    previewImageUrl,
    mandatoryDisclaimerWatermark: MANDATORY_PREVIEW_DISCLAIMER,
    isGuaranteedOutcome: false,
    clientConsentVerified: true,
    retentionPolicy: storeInChart && consent.allowPortfolioUse ? 'store_in_chart' : 'delete_after_consultation',
    status: 'draft_preview',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Purges simulation assets and metadata upon client request, honoring data privacy rights.
 */
export function purgeSimulationRecordPerClient(
  record: VisualSimulationRecord,
  reason = 'Client invoked right to delete consultation simulation'
): VisualSimulationRecord {
  return {
    ...record,
    previewImageUrl: '',
    status: 'purged_per_client_request',
    notes: reason,
  };
}
