/**
 * Posie Core Engine - Distributor and Scale Integrations (F163)
 *
 * Implements precision smart-scale hardware integrations for backbar product dispensing
 * (hair color, developer, toner, chemical treatments) and distributor catalog feeds.
 *
 * Domain Invariant (Basis: Expansion (X); PART OPS, WB F163, Rule F163, Table 81, D21):
 * Weighed dispensing connects to supported hardware to accurately track gram-level
 * usage and real-time service costing. Hardware disconnects or feed dropouts preserve
 * graceful manual entry fallback and never fabricate or guess stock counts. Supplier
 * inventory updates adjust product costs, while PO creation strictly requires explicit
 * authorized buyer approval before placing orders.
 */

export interface WeighedComponent {
  sku: string;
  productName: string;
  category: 'color' | 'developer' | 'lightener' | 'toner' | 'treatment_additive';
  targetWeightGrams: number;
  actualWeightGrams: number;
  costPerGram: number;
}

export interface WeighedDispensingRecord {
  dispensingId: string;
  appointmentId: string;
  practitionerId: string;
  deviceId?: string;
  scaleModel?: string;
  source: 'hardware_scale' | 'manual_entry_fallback';
  components: WeighedComponent[];
  totalTargetGrams: number;
  totalActualGrams: number;
  totalProductCost: number;
  recordedAt: string;
}

export interface FormulaTargetSpec {
  formulaName: string;
  targetComponents: Array<{
    sku: string;
    productName: string;
    category: WeighedComponent['category'];
    targetWeightGrams: number;
    costPerGram: number;
  }>;
}

export interface ServiceCostingSummary {
  formulaName: string;
  totalTargetGrams: number;
  totalActualGrams: number;
  varianceGrams: number;
  variancePercentage: number;
  baselineCost: number;
  actualCost: number;
  costVariance: number;
  isOverDispensed: boolean;
  wasteWarning?: string;
}

export interface LocalInventorySku {
  sku: string;
  name: string;
  distributorId: string;
  costPerUnit: number;
  stockOnHand: number;
  lastSyncedAt: string;
}

export interface DistributorFeedItem {
  sku: string;
  name: string;
  wholesalePrice: number;
  availableStock: number;
  inStock: boolean;
}

export interface DistributorFeedPayload {
  distributorId: string;
  distributorName: string;
  items: DistributorFeedItem[];
  timestamp: string;
}

export interface InventoryFeedSyncResult {
  updatedCount: number;
  unmatchedCount: number;
  connectionState: 'connected' | 'offline_fallback';
  skus: LocalInventorySku[];
  message: string;
}

/**
 * Records a precision scale dispensing event from smart hardware or manual fallback.
 */
export function recordDispensedProductWeighing(input: {
  dispensingId: string;
  appointmentId: string;
  practitionerId: string;
  deviceId?: string;
  scaleModel?: string;
  source: 'hardware_scale' | 'manual_entry_fallback';
  components: WeighedComponent[];
}): WeighedDispensingRecord {
  if (!input.components || input.components.length === 0) {
    throw new Error('At least one formula component must be measured.');
  }

  let totalTarget = 0;
  let totalActual = 0;
  let totalCost = 0;

  for (const c of input.components) {
    if (c.actualWeightGrams < 0) {
      throw new Error(`Component weight cannot be negative for SKU ${c.sku}`);
    }
    totalTarget += c.targetWeightGrams;
    totalActual += c.actualWeightGrams;
    totalCost += c.actualWeightGrams * c.costPerGram;
  }

  return {
    dispensingId: input.dispensingId,
    appointmentId: input.appointmentId,
    practitionerId: input.practitionerId,
    deviceId: input.deviceId,
    scaleModel: input.scaleModel,
    source: input.source,
    components: input.components,
    totalTargetGrams: Math.round(totalTarget * 10) / 10,
    totalActualGrams: Math.round(totalActual * 10) / 10,
    totalProductCost: Math.round(totalCost * 100) / 100,
    recordedAt: new Date().toISOString(),
  };
}

/**
 * Reconciles actual dispensed grams against target formula specifications to quantify
 * cost variances, product waste, and exact service margins.
 */
export function reconcileServiceColorCosting(
  formulaTarget: FormulaTargetSpec,
  dispensedRecord: WeighedDispensingRecord
): ServiceCostingSummary {
  let baselineCost = 0;
  let totalTarget = 0;

  for (const target of formulaTarget.targetComponents) {
    totalTarget += target.targetWeightGrams;
    baselineCost += target.targetWeightGrams * target.costPerGram;
  }

  const actualGrams = dispensedRecord.totalActualGrams;
  const actualCost = dispensedRecord.totalProductCost;
  const varianceGrams = Math.round((actualGrams - totalTarget) * 10) / 10;
  const variancePercentage = totalTarget > 0 ? Math.round(((actualGrams - totalTarget) / totalTarget) * 100) : 0;
  const costVariance = Math.round((actualCost - baselineCost) * 100) / 100;
  const isOverDispensed = varianceGrams > 2.0; // Over 2 grams excess considered over-dispensed

  let wasteWarning: string | undefined = undefined;
  if (isOverDispensed && variancePercentage >= 15) {
    wasteWarning = `Dispensed weight exceeds formula target by ${variancePercentage}% (+${varianceGrams}g, +$${costVariance.toFixed(2)}). Backbar margin reduced.`;
  }

  return {
    formulaName: formulaTarget.formulaName,
    totalTargetGrams: Math.round(totalTarget * 10) / 10,
    totalActualGrams: actualGrams,
    varianceGrams,
    variancePercentage,
    baselineCost: Math.round(baselineCost * 100) / 100,
    actualCost,
    costVariance,
    isOverDispensed,
    wasteWarning,
  };
}

/**
 * Synchronizes local inventory SKUs against distributor catalog feeds.
 * If offline, preserves previous verified counts without fabricating inventory.
 */
export function syncDistributorCatalogFeed(
  feed: DistributorFeedPayload,
  currentSkus: LocalInventorySku[],
  connectionStatus: 'connected' | 'offline'
): InventoryFeedSyncResult {
  if (connectionStatus === 'offline') {
    return {
      updatedCount: 0,
      unmatchedCount: 0,
      connectionState: 'offline_fallback',
      skus: currentSkus,
      message: 'Distributor feed offline. Preserving existing inventory counts without fabrication.',
    };
  }

  let updatedCount = 0;
  let unmatchedCount = 0;
  const updatedSkus = currentSkus.map((existing) => {
    const feedItem = feed.items.find((item) => item.sku === existing.sku);
    if (feedItem) {
      updatedCount++;
      return {
        ...existing,
        costPerUnit: feedItem.wholesalePrice,
        lastSyncedAt: feed.timestamp,
      };
    }
    return existing;
  });

  // Count items in feed that don't exist locally
  for (const item of feed.items) {
    if (!currentSkus.some((s) => s.sku === item.sku)) {
      unmatchedCount++;
    }
  }

  return {
    updatedCount,
    unmatchedCount,
    connectionState: 'connected',
    skus: updatedSkus,
    message: `Synchronized ${updatedCount} distributor items successfully.`,
  };
}
