import { z } from 'zod';

export const StockMovementTypeSchema = z.enum([
  'received_purchase',
  'retail_sale',
  'client_return',
  'stocktake_adjustment',
  'approved_shrinkage',
  'professional_backbar_use',
]);

export type StockMovementType = z.infer<typeof StockMovementTypeSchema>;

export const RetailProductSchema = z.object({
  id: z.string().uuid(),
  sku: z.string().min(1, 'SKU is required'),
  barcode: z.string().optional(),
  productName: z.string().min(1, 'Product name is required'),
  variantName: z.string().optional(),
  brand: z.string().optional(),
  retailPriceCents: z.number().int().nonnegative(),
  costPriceCents: z.number().int().nonnegative(),
  onHandQuantity: z.number().int().nonnegative().default(0),
  reservedQuantity: z.number().int().nonnegative().default(0),
  sellableQuantity: z.number().int().nonnegative().default(0),
  reorderThreshold: z.number().int().nonnegative().default(5),
  isLowStock: z.boolean().default(false),
  isActive: z.boolean().default(true),
  updatedAt: z.string().datetime(),
});

export type RetailProduct = z.infer<typeof RetailProductSchema>;

export const StockMovementRecordSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  sku: z.string(),
  movementType: StockMovementTypeSchema,
  quantityDelta: z.number().int(),
  previousOnHand: z.number().int().nonnegative(),
  resultingOnHand: z.number().int().nonnegative(),
  authorizedStaffId: z.string().uuid(),
  reason: z.string().min(1, 'Movement reason is required'),
  referenceId: z.string().optional(),
  timestamp: z.string().datetime(),
});

export type StockMovementRecord = z.infer<typeof StockMovementRecordSchema>;

/**
 * Registers a new retail product in the inventory catalog.
 */
export function registerRetailProduct(params: {
  id?: string;
  sku: string;
  barcode?: string;
  productName: string;
  variantName?: string;
  brand?: string;
  retailPriceCents: number;
  costPriceCents: number;
  initialStock?: number;
  reorderThreshold?: number;
}): { product: RetailProduct; initialMovement?: StockMovementRecord } {
  const now = new Date().toISOString();
  const initialQty = params.initialStock ?? 0;
  const reorder = params.reorderThreshold ?? 5;
  const productId = params.id || '40404040-0000-0000-0000-000000000046';

  const product = RetailProductSchema.parse({
    id: productId,
    sku: params.sku,
    barcode: params.barcode,
    productName: params.productName,
    variantName: params.variantName,
    brand: params.brand,
    retailPriceCents: params.retailPriceCents,
    costPriceCents: params.costPriceCents,
    onHandQuantity: initialQty,
    reservedQuantity: 0,
    sellableQuantity: initialQty,
    reorderThreshold: reorder,
    isLowStock: initialQty <= reorder,
    isActive: true,
    updatedAt: now,
  });

  return { product };
}

/**
 * Records a traceable stock movement in the inventory ledger.
 * INVARIANT: Stock counts are NEVER silently overwritten; every delta generates an immutable ledger entry.
 * INVARIANT: Sales cannot drive sellable stock below zero.
 */
export function recordStockMovement(
  product: RetailProduct,
  params: {
    movementId?: string;
    movementType: StockMovementType;
    quantityDelta: number; // positive for receipt/return, negative for sale/usage/shrinkage
    authorizedStaffId: string;
    reason: string;
    referenceId?: string;
  }
): { updatedProduct: RetailProduct; movement: StockMovementRecord } {
  const prevOnHand = product.onHandQuantity;
  const resultingOnHand = prevOnHand + params.quantityDelta;

  if (resultingOnHand < 0) {
    throw new Error(
      `Cannot record stock movement: insufficient inventory on hand for SKU ${product.sku} (current: ${prevOnHand}, delta: ${params.quantityDelta})`
    );
  }

  const resultingSellable = Math.max(0, resultingOnHand - product.reservedQuantity);
  const now = new Date().toISOString();

  const movement = StockMovementRecordSchema.parse({
    id: params.movementId || '50505050-0000-0000-0000-000000000046',
    productId: product.id,
    sku: product.sku,
    movementType: params.movementType,
    quantityDelta: params.quantityDelta,
    previousOnHand: prevOnHand,
    resultingOnHand,
    authorizedStaffId: params.authorizedStaffId,
    reason: params.reason,
    referenceId: params.referenceId,
    timestamp: now,
  });

  const updatedProduct = RetailProductSchema.parse({
    ...product,
    onHandQuantity: resultingOnHand,
    sellableQuantity: resultingSellable,
    isLowStock: resultingSellable <= product.reorderThreshold,
    updatedAt: now,
  });

  return { updatedProduct, movement };
}

/**
 * Reserves stock for an upcoming appointment or pending order.
 */
export function reserveProductStock(
  product: RetailProduct,
  quantityToReserve: number
): RetailProduct {
  if (product.sellableQuantity < quantityToReserve) {
    throw new Error(
      `Insufficient sellable quantity to reserve (${product.sellableQuantity} available, ${quantityToReserve} requested).`
    );
  }

  const newReserved = product.reservedQuantity + quantityToReserve;
  const newSellable = product.onHandQuantity - newReserved;

  return RetailProductSchema.parse({
    ...product,
    reservedQuantity: newReserved,
    sellableQuantity: newSellable,
    isLowStock: newSellable <= product.reorderThreshold,
    updatedAt: new Date().toISOString(),
  });
}
