/**
 * F181: Collective Purchasing Network
 *
 * Aggregates voluntary purchasing demand across businesses to negotiate supplier terms,
 * ensure net savings survive shipping, waste, and operational handling, and trace batch fulfillment.
 */

export interface PurchasingBatchItem {
  itemId: string;
  name: string;
  sku: string;
  category: 'color' | 'developer' | 'foils' | 'backbar' | 'sanitizer';
  unitPriceRetail: number;
  unitPriceNegotiated: number;
  minimumOrderQuantity: number;
}

export interface SalonOrderIntent {
  salonId: string;
  salonName: string;
  itemId: string;
  quantity: number;
  shippingAddress: string;
}

export interface AggregatedBatchOrder {
  batchId: string;
  item: PurchasingBatchItem;
  totalQuantity: number;
  moqMet: boolean;
  grossSupplierDiscount: number;
  estimatedShipping: number;
  estimatedWasteLoss: number;
  handlingFee: number;
  netSalonSavings: number;
  netSavingsPercentage: number;
  participatingSalonsCount: number;
  status: 'open_accumulating' | 'pooled_moq_met' | 'submitted_to_supplier' | 'dispatched' | 'fulfilled';
  createdAt: string;
}

export interface BatchAllocationResult {
  allocationBatchId: string;
  batchId: string;
  carrierTrackingNumber: string;
  dispatchedAt: string;
  status: 'dispatched';
  allocations: Array<{
    salonId: string;
    salonName: string;
    unitsDispatched: number;
    proRataNetSavings: number;
  }>;
}

/**
 * Aggregates purchasing demand from multiple salons, verifies whether the supplier's MOQ
 * is satisfied, and transparently accounts for freight, waste loss, and handling overhead
 * to guarantee that operational savings survive.
 */
export function createPurchasingBatchOrder(
  batchId: string,
  item: PurchasingBatchItem,
  intents: SalonOrderIntent[],
  handlingFeeRate = 0.05
): AggregatedBatchOrder {
  const matchingIntents = intents.filter((intent) => intent.itemId === item.itemId && intent.quantity > 0);
  const totalQuantity = matchingIntents.reduce((sum, intent) => sum + intent.quantity, 0);
  const moqMet = totalQuantity >= item.minimumOrderQuantity;

  // Pricing calculations
  const totalRetailPrice = totalQuantity * item.unitPriceRetail;
  const totalNegotiatedPrice = totalQuantity * item.unitPriceNegotiated;
  const grossSupplierDiscount = Math.max(0, totalRetailPrice - totalNegotiatedPrice);

  // Operational cost friction (shipping, handling, and waste)
  const estimatedShipping = matchingIntents.length > 0 ? Math.max(25, matchingIntents.length * 8.5) : 0;
  const estimatedWasteLoss = totalQuantity * item.unitPriceNegotiated * 0.02; // 2% breakage/loss reserve
  const handlingFee = grossSupplierDiscount * handlingFeeRate;

  // Net savings surviving operational costs
  const netSalonSavings = Math.max(0, Math.round((grossSupplierDiscount - estimatedShipping - estimatedWasteLoss - handlingFee) * 100) / 100);
  const netSavingsPercentage = totalRetailPrice > 0 ? Math.round((netSalonSavings / totalRetailPrice) * 10000) / 100 : 0;

  return {
    batchId,
    item,
    totalQuantity,
    moqMet,
    grossSupplierDiscount: Math.round(grossSupplierDiscount * 100) / 100,
    estimatedShipping: Math.round(estimatedShipping * 100) / 100,
    estimatedWasteLoss: Math.round(estimatedWasteLoss * 100) / 100,
    handlingFee: Math.round(handlingFee * 100) / 100,
    netSalonSavings,
    netSavingsPercentage,
    participatingSalonsCount: matchingIntents.length,
    status: moqMet ? 'pooled_moq_met' : 'open_accumulating',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Allocates and traces batch fulfillment to participating salons once the supplier
 * dispatches the collective shipment.
 */
export function allocateBatchFulfillment(
  batch: AggregatedBatchOrder,
  intents: SalonOrderIntent[],
  carrierTrackingNumber: string
): BatchAllocationResult {
  if (batch.status === 'open_accumulating') {
    throw new Error('Cannot allocate fulfillment: batch has not satisfied supplier minimum order quantity (MOQ).');
  }

  const matchingIntents = intents.filter((i) => i.itemId === batch.item.itemId && i.quantity > 0);
  const totalQuantity = matchingIntents.reduce((sum, i) => sum + i.quantity, 0);

  const allocations = matchingIntents.map((intent) => {
    const share = totalQuantity > 0 ? intent.quantity / totalQuantity : 0;
    const proRataNetSavings = Math.round(batch.netSalonSavings * share * 100) / 100;

    return {
      salonId: intent.salonId,
      salonName: intent.salonName,
      unitsDispatched: intent.quantity,
      proRataNetSavings,
    };
  });

  return {
    allocationBatchId: `alloc_${batch.batchId}_${Date.now()}`,
    batchId: batch.batchId,
    carrierTrackingNumber,
    dispatchedAt: new Date().toISOString(),
    status: 'dispatched',
    allocations,
  };
}
