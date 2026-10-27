import { z } from 'zod';
import { RetailProduct, recordStockMovement, StockMovementRecord } from '../inventory';

export const PurchaseOrderStatusSchema = z.enum([
  'draft',
  'approved',
  'sent_to_supplier',
  'partially_received',
  'fully_received',
  'canceled',
]);

export type PurchaseOrderStatus = z.infer<typeof PurchaseOrderStatusSchema>;

export const PurchaseOrderLineItemSchema = z.object({
  id: z.string(),
  sku: z.string().min(1, 'SKU is required'),
  productName: z.string().min(1, 'Product name is required'),
  quantityOrdered: z.number().int().positive(),
  unitCostCents: z.number().int().nonnegative(),
  totalCostCents: z.number().int().nonnegative(),
  quantityReceived: z.number().int().nonnegative().default(0),
  quantityOutstanding: z.number().int().nonnegative(),
  substitutedSku: z.string().optional(),
  lotNumber: z.string().optional(),
});

export type PurchaseOrderLineItem = z.infer<typeof PurchaseOrderLineItemSchema>;

export const PurchaseOrderSchema = z.object({
  id: z.string().uuid(),
  poNumber: z.string().min(1),
  supplierName: z.string().min(1, 'Supplier name is required'),
  supplierEmail: z.string().email().optional(),
  buyerStaffId: z.string().uuid(),
  status: PurchaseOrderStatusSchema.default('draft'),
  lineItems: z.array(PurchaseOrderLineItemSchema).min(1, 'At least one item is required'),
  totalCostCents: z.number().int().nonnegative(),
  approvedAt: z.string().datetime().optional(),
  transmittedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type PurchaseOrder = z.infer<typeof PurchaseOrderSchema>;

/**
 * Creates a draft purchase order for inventory replenishment.
 */
export function createPurchaseOrder(params: {
  id?: string;
  poNumber?: string;
  supplierName: string;
  supplierEmail?: string;
  buyerStaffId: string;
  items: Array<{
    sku: string;
    productName: string;
    quantityOrdered: number;
    unitCostCents: number;
  }>;
}): PurchaseOrder {
  const now = new Date().toISOString();
  const lineItems: PurchaseOrderLineItem[] = params.items.map((item, idx) => {
    const total = item.quantityOrdered * item.unitCostCents;
    return {
      id: `po-item-${idx + 1}`,
      sku: item.sku,
      productName: item.productName,
      quantityOrdered: item.quantityOrdered,
      unitCostCents: item.unitCostCents,
      totalCostCents: total,
      quantityReceived: 0,
      quantityOutstanding: item.quantityOrdered,
    };
  });

  const totalCost = lineItems.reduce((acc, curr) => acc + curr.totalCostCents, 0);

  return PurchaseOrderSchema.parse({
    id: params.id || '60606060-0000-0000-0000-000000000047',
    poNumber: params.poNumber || `PO-${Date.now().toString().slice(-6)}`,
    supplierName: params.supplierName,
    supplierEmail: params.supplierEmail,
    buyerStaffId: params.buyerStaffId,
    status: 'draft',
    lineItems,
    totalCostCents: totalCost,
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Approves a purchase order.
 * INVARIANT (Doc D21): Approval and transmission to vendor remain distinct states.
 */
export function approvePurchaseOrder(
  po: PurchaseOrder,
  approverStaffId: string
): PurchaseOrder {
  const now = new Date().toISOString();
  return PurchaseOrderSchema.parse({
    ...po,
    buyerStaffId: approverStaffId,
    status: 'approved',
    approvedAt: now,
    updatedAt: now,
  });
}

/**
 * Records receipt of a vendor shipment (supporting full or partial delivery).
 * INVARIANT: Missing or substituted items remain explicitly visible after partial delivery.
 * Automatically records received inventory into the stock movement ledger.
 */
export function receivePurchaseOrderShipment(params: {
  purchaseOrder: PurchaseOrder;
  receiptItems: Array<{
    sku: string;
    quantityReceived: number;
    lotNumber?: string;
    substitutedSku?: string;
  }>;
  inventoryProducts: Map<string, RetailProduct>;
  receivingStaffId: string;
}): {
  updatedPurchaseOrder: PurchaseOrder;
  stockMovements: StockMovementRecord[];
  updatedProducts: Map<string, RetailProduct>;
} {
  const now = new Date().toISOString();
  const movements: StockMovementRecord[] = [];
  const updatedProducts = new Map<string, RetailProduct>(params.inventoryProducts);

  const receiptMap = new Map(
    params.receiptItems.map((r) => [r.sku, r])
  );

  const updatedLineItems = params.purchaseOrder.lineItems.map((item) => {
    const received = receiptMap.get(item.sku);
    if (!received) return item;

    const newReceivedTotal = item.quantityReceived + received.quantityReceived;
    const newOutstanding = Math.max(0, item.quantityOrdered - newReceivedTotal);

    // Update product inventory if matching product exists in inventory
    const existingProduct = updatedProducts.get(item.sku);
    if (existingProduct) {
      const { updatedProduct, movement } = recordStockMovement(existingProduct, {
        movementType: 'received_purchase',
        quantityDelta: received.quantityReceived,
        authorizedStaffId: params.receivingStaffId,
        reason: `PO Receipt ${params.purchaseOrder.poNumber}${
          received.lotNumber ? ` (Lot: ${received.lotNumber})` : ''
        }`,
        referenceId: params.purchaseOrder.poNumber,
      });

      movements.push(movement);
      updatedProducts.set(item.sku, updatedProduct);
    }

    return {
      ...item,
      quantityReceived: newReceivedTotal,
      quantityOutstanding: newOutstanding,
      lotNumber: received.lotNumber || item.lotNumber,
      substitutedSku: received.substitutedSku || item.substitutedSku,
    };
  });

  const totalOutstanding = updatedLineItems.reduce(
    (acc, curr) => acc + curr.quantityOutstanding,
    0
  );

  const status: PurchaseOrderStatus =
    totalOutstanding === 0 ? 'fully_received' : 'partially_received';

  const updatedPurchaseOrder = PurchaseOrderSchema.parse({
    ...params.purchaseOrder,
    status,
    lineItems: updatedLineItems,
    updatedAt: now,
  });

  return {
    updatedPurchaseOrder,
    stockMovements: movements,
    updatedProducts,
  };
}
