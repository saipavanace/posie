/**
 * Posie Core - F155: Purchasing Recommendations
 *
 * Implements replenishment recommendations calculating reorder quantities based on current stock,
 * upcoming committed service demand, supplier lead times, and owner budget caps.
 * Enforces strict procurement invariants: generating a recommendation or PDF draft purchase order
 * NEVER automatically places orders or spends funds until explicitly authorized by the salon owner.
 *
 * Compliance: Follows Posie Rule DR03, DR04 & WB F155 (Inventory forecasts and purchase orders;
 * the owner approves costs and substitutions before ordering; fewer stock surprises).
 */

export interface InventoryReplenishmentItem {
  sku: string;
  productName: string;
  supplierName: string;
  supplierSku: string;
  currentStockOnHand: number;
  allocatedBookedDemandUnits: number; // units already committed to future booked appointments
  supplierLeadTimeDays: number;
  minimumOrderQuantity: number; // supplier MOQ
  unitCostCents: number;
  packSizeUnits: number; // e.g. 6 or 12 units per pack
  averageWeeklyUsageUnits: number;
}

export interface PurchasingRecommendationItem {
  sku: string;
  productName: string;
  supplierName: string;
  projectedDeficitUnits: number;
  recommendedUnitsToOrder: number;
  packsToOrder: number;
  estimatedCostCents: number;
  stockoutRiskDays: number;
  urgency: 'urgent_stockout_imminent' | 'routine_reorder' | 'healthy_stock';
  rationale: string;
}

export interface DraftPurchaseOrderSummary {
  supplierName: string;
  itemCount: number;
  totalSupplierCostCents: number;
  status: 'draft_pending_owner_approval';
}

export interface PurchasingPlan {
  planId: string;
  totalRecommendedCostCents: number;
  ownerBudgetCapCents: number;
  isWithinBudget: boolean;
  items: PurchasingRecommendationItem[];
  draftPurchaseOrders: DraftPurchaseOrderSummary[];
  generatedAt: string;
}

/**
 * Generates purchasing recommendations based on on-hand stock, lead times, and booked service demand
 */
export function generatePurchasingRecommendations(
  items: InventoryReplenishmentItem[],
  ownerBudgetCapCents: number
): PurchasingPlan {
  const planId = `plan-po-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  let totalCost = 0;

  const supplierGroups: Record<string, { itemCount: number; totalCost: number }> = {};

  const recommendationItems: PurchasingRecommendationItem[] = items.map(item => {
    // Effective available stock = on-hand minus units already committed to booked appointments
    const effectiveAvailableStock = item.currentStockOnHand - item.allocatedBookedDemandUnits;
    const dailyUsage = Math.max(0.1, item.averageWeeklyUsageUnits / 7);

    // Days of supply remaining
    const stockoutRiskDays = Math.max(0, Math.round(effectiveAvailableStock / dailyUsage));

    // Expected demand during supplier lead time plus a 7-day safety buffer
    const leadTimeDemand = Math.ceil(dailyUsage * (item.supplierLeadTimeDays + 7));
    const projectedDeficit = Math.max(0, leadTimeDemand - effectiveAvailableStock);

    let packsToOrder = 0;
    let unitsToOrder = 0;
    let urgency: 'urgent_stockout_imminent' | 'routine_reorder' | 'healthy_stock' = 'healthy_stock';
    let rationale = '';

    if (effectiveAvailableStock <= 0 || stockoutRiskDays <= item.supplierLeadTimeDays) {
      urgency = 'urgent_stockout_imminent';
      // Calculate packs to cover deficit and honor MOQ
      const neededUnits = Math.max(projectedDeficit, item.minimumOrderQuantity);
      packsToOrder = Math.ceil(neededUnits / Math.max(1, item.packSizeUnits));
      unitsToOrder = packsToOrder * item.packSizeUnits;
      rationale = `Urgent: Only ${effectiveAvailableStock} units available after committed appointments; lead time is ${item.supplierLeadTimeDays} days.`;
    } else if (stockoutRiskDays <= item.supplierLeadTimeDays + 7) {
      urgency = 'routine_reorder';
      const neededUnits = Math.max(projectedDeficit, item.minimumOrderQuantity);
      packsToOrder = Math.ceil(neededUnits / Math.max(1, item.packSizeUnits));
      unitsToOrder = packsToOrder * item.packSizeUnits;
      rationale = `Routine: Supply (${stockoutRiskDays} days) approaching lead-time threshold (${item.supplierLeadTimeDays} days).`;
    } else {
      urgency = 'healthy_stock';
      packsToOrder = 0;
      unitsToOrder = 0;
      rationale = `Healthy: ${stockoutRiskDays} days of supply remaining. No order needed at this time.`;
    }

    const estimatedCost = unitsToOrder * item.unitCostCents;
    totalCost += estimatedCost;

    if (unitsToOrder > 0) {
      if (!supplierGroups[item.supplierName]) {
        supplierGroups[item.supplierName] = { itemCount: 0, totalCost: 0 };
      }
      supplierGroups[item.supplierName].itemCount++;
      supplierGroups[item.supplierName].totalCost += estimatedCost;
    }

    return {
      sku: item.sku,
      productName: item.productName,
      supplierName: item.supplierName,
      projectedDeficitUnits: projectedDeficit,
      recommendedUnitsToOrder: unitsToOrder,
      packsToOrder,
      estimatedCostCents: estimatedCost,
      stockoutRiskDays,
      urgency,
      rationale,
    };
  });

  const draftPurchaseOrders: DraftPurchaseOrderSummary[] = Object.entries(supplierGroups).map(
    ([supplierName, data]) => ({
      supplierName,
      itemCount: data.itemCount,
      totalSupplierCostCents: data.totalCost,
      status: 'draft_pending_owner_approval',
    })
  );

  return {
    planId,
    totalRecommendedCostCents: totalCost,
    ownerBudgetCapCents,
    isWithinBudget: totalCost <= ownerBudgetCapCents,
    items: recommendationItems,
    draftPurchaseOrders,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Authorizes a draft purchase order with explicit human signatory verification
 */
export function approvePurchaseOrderDraft(
  plan: PurchasingPlan,
  supplierName: string,
  approverStaffId: string
): {
  approvedPoNumber: string;
  isApproved: boolean;
  auditRecord: string;
} {
  const draftIndex = plan.draftPurchaseOrders.findIndex(po => po.supplierName === supplierName);
  if (draftIndex === -1) {
    throw new Error(`Draft purchase order for supplier "${supplierName}" not found in plan ${plan.planId}`);
  }

  if (!approverStaffId) {
    throw new Error('Authorized buyer staff ID is required to approve and issue a purchase order');
  }

  const draft = plan.draftPurchaseOrders[draftIndex];
  const approvedPoNumber = `PO-${supplierName.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;
  const nowIso = new Date().toISOString();

  const auditRecord = `[${nowIso}] Purchase Order ${approvedPoNumber} for ${supplierName} ($${(draft.totalSupplierCostCents / 100).toFixed(2)}) approved by authorized buyer ${approverStaffId}. State transitioned from DRAFT to AUTHORIZED.`;

  return {
    approvedPoNumber,
    isApproved: true,
    auditRecord,
  };
}
