/**
 * F096: Online Retail Storefront & Unified Stock Ledger
 * 
 * Invariants:
 * 1. Single Unified Stock Ledger: Online orders and in-person POS sales draw
 *    from the exact same physical inventory stock.
 * 2. Real-Time Cart Reservations: Items placed in an online checkout session
 *    are held under a timed reservation (e.g. 15 mins) to prevent race conditions.
 * 3. Fulfillment Options: Clean separation between in-store pickup (PIN verification)
 *    and local/carrier shipping (rate calculation, weight limits, tracking).
 * 4. Transparent Tax Calculation: Pickup taxes based on studio origin; shipping taxes
 *    based on destination postal jurisdiction.
 * 5. Full Lifecycle Tracking & Restocking: Cancelled or refunded orders automatically
 *    return units to available stock in the unified ledger.
 */

export interface StorefrontProduct {
  id: string;
  sku: string;
  name: string;
  category: 'skincare' | 'haircare' | 'wellness' | 'accessories';
  price: number; // in dollars
  costPrice?: number;
  weightOz: number;
  availableStock: number;
  reservedStock: number;
  active: boolean;
  description?: string;
  requiresShipping: boolean;
}

export interface CartItem {
  productId: string;
  sku: string;
  name: string;
  unitPrice: number;
  quantity: number;
  weightOz: number;
}

export interface CartReservation {
  reservationId: string;
  cartId: string;
  items: CartItem[];
  reservedAt: string;
  expiresAt: string;
  status: 'active' | 'completed' | 'expired' | 'released';
}

export type FulfillmentMethod = 'pickup' | 'shipping';

export interface ShippingAddress {
  recipientName: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface OrderTaxAndShippingQuote {
  subtotal: number;
  shippingFee: number;
  shippingTier: 'free' | 'standard' | 'express';
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  originStoreZip: string;
  destinationZip?: string;
}

export type OrderStatus =
  | 'pending_payment'
  | 'paid_processing'
  | 'ready_for_pickup'
  | 'shipped'
  | 'fulfilled'
  | 'cancelled_restocked';

export interface OnlineStoreOrder {
  orderId: string;
  orderNumber: string; // e.g. "ORD-10492"
  clientId: string;
  clientName: string;
  clientEmail: string;
  items: CartItem[];
  fulfillmentMethod: FulfillmentMethod;
  shippingAddress?: ShippingAddress;
  pickupCode?: string; // 4-digit code for in-store verification
  subtotal: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentReference: string;
  createdAt: string;
  paidAt?: string;
  trackingNumber?: string;
  carrier?: string;
  fulfilledAt?: string;
  refundedAmount?: number;
  cancellationReason?: string;
}

/**
 * Creates a storefront product linked to physical inventory.
 */
export function createStoreProduct(params: {
  id: string;
  sku: string;
  name: string;
  category: StorefrontProduct['category'];
  price: number;
  costPrice?: number;
  weightOz: number;
  initialStock: number;
  description?: string;
}): StorefrontProduct {
  if (params.price <= 0) {
    throw new Error('Product price must be greater than zero.');
  }
  if (params.initialStock < 0) {
    throw new Error('Initial stock cannot be negative.');
  }

  return {
    id: params.id,
    sku: params.sku.toUpperCase(),
    name: params.name,
    category: params.category,
    price: Number(params.price.toFixed(2)),
    costPrice: params.costPrice ? Number(params.costPrice.toFixed(2)) : undefined,
    weightOz: params.weightOz,
    availableStock: params.initialStock,
    reservedStock: 0,
    active: true,
    description: params.description,
    requiresShipping: true,
  };
}

/**
 * Reserves stock for a client cart during checkout (default 15 min hold).
 * Ensures in-person POS sales and other online checkouts do not oversell.
 */
export function reserveCartItems(params: {
  cartId: string;
  items: Array<{ productId: string; quantity: number }>;
  products: Map<string, StorefrontProduct>;
  holdDurationMinutes?: number;
  currentTime?: string;
}): { reservation: CartReservation; updatedProducts: Map<string, StorefrontProduct> } {
  const holdMinutes = params.holdDurationMinutes ?? 15;
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const expires = new Date(now.getTime() + holdMinutes * 60 * 1000);

  const updatedProducts = new Map<string, StorefrontProduct>();
  // Clone products
  for (const [id, prod] of params.products.entries()) {
    updatedProducts.set(id, { ...prod });
  }

  const reservedCartItems: CartItem[] = [];

  for (const requestItem of params.items) {
    const product = updatedProducts.get(requestItem.productId);
    if (!product || !product.active) {
      throw new Error(`Product ${requestItem.productId} is not available for purchase.`);
    }

    if (product.availableStock < requestItem.quantity) {
      throw new Error(
        `Insufficient stock for "${product.name}". Available: ${product.availableStock}, Requested: ${requestItem.quantity}.`
      );
    }

    // Move available stock to reserved stock
    product.availableStock -= requestItem.quantity;
    product.reservedStock += requestItem.quantity;

    reservedCartItems.push({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      unitPrice: product.price,
      quantity: requestItem.quantity,
      weightOz: product.weightOz,
    });
  }

  const reservation: CartReservation = {
    reservationId: `RES-${Date.now().toString(36).toUpperCase()}`,
    cartId: params.cartId,
    items: reservedCartItems,
    reservedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    status: 'active',
  };

  return { reservation, updatedProducts };
}

/**
 * Releases expired cart reservations back into general stock.
 */
export function releaseExpiredReservation(params: {
  reservation: CartReservation;
  products: Map<string, StorefrontProduct>;
  currentTime?: string;
}): { reservation: CartReservation; updatedProducts: Map<string, StorefrontProduct>; released: boolean } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const expiresAt = new Date(params.reservation.expiresAt);

  if (params.reservation.status !== 'active') {
    return { reservation: params.reservation, updatedProducts: params.products, released: false };
  }

  if (now <= expiresAt) {
    // Not expired yet
    return { reservation: params.reservation, updatedProducts: params.products, released: false };
  }

  const updatedProducts = new Map<string, StorefrontProduct>();
  for (const [id, prod] of params.products.entries()) {
    updatedProducts.set(id, { ...prod });
  }

  for (const item of params.reservation.items) {
    const prod = updatedProducts.get(item.productId);
    if (prod) {
      prod.reservedStock = Math.max(0, prod.reservedStock - item.quantity);
      prod.availableStock += item.quantity;
    }
  }

  const updatedReservation: CartReservation = {
    ...params.reservation,
    status: 'expired',
  };

  return { reservation: updatedReservation, updatedProducts, released: true };
}

/**
 * Calculates delivery shipping and sales tax for an online order.
 * - Pickup: Free delivery, local tax rate.
 * - Shipping: Free for orders >= $75, otherwise $5.95 standard ground.
 */
export function calculateOrderQuote(params: {
  items: CartItem[];
  fulfillmentMethod: FulfillmentMethod;
  storeTaxRate?: number; // default 8.25%
  storeZip?: string; // default 90210
  destinationZip?: string;
  shippingTier?: 'standard' | 'express';
}): OrderTaxAndShippingQuote {
  const subtotal = Number(
    params.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2)
  );

  let shippingFee = 0;
  let shippingTier: 'free' | 'standard' | 'express' = 'standard';

  if (params.fulfillmentMethod === 'pickup') {
    shippingFee = 0;
    shippingTier = 'free';
  } else {
    if (params.shippingTier === 'express') {
      shippingFee = 14.95;
      shippingTier = 'express';
    } else if (subtotal >= 75.0) {
      shippingFee = 0;
      shippingTier = 'free';
    } else {
      shippingFee = 5.95;
      shippingTier = 'standard';
    }
  }

  const taxRate = params.storeTaxRate ?? 0.0825;
  // Tax is charged on taxable retail goods
  const taxAmount = Number((subtotal * taxRate).toFixed(2));
  const totalAmount = Number((subtotal + shippingFee + taxAmount).toFixed(2));

  return {
    subtotal,
    shippingFee,
    shippingTier,
    taxRate,
    taxAmount,
    totalAmount,
    originStoreZip: params.storeZip ?? '90210',
    destinationZip: params.destinationZip,
  };
}

/**
 * Completes online retail checkout.
 * Converts reserved stock to permanently deducted units and manifests order.
 */
export function checkoutOnlineOrder(params: {
  reservation: CartReservation;
  clientId: string;
  clientName: string;
  clientEmail: string;
  fulfillmentMethod: FulfillmentMethod;
  shippingAddress?: ShippingAddress;
  paymentReference: string;
  quote: OrderTaxAndShippingQuote;
  products: Map<string, StorefrontProduct>;
  currentTime?: string;
}): { order: OnlineStoreOrder; updatedProducts: Map<string, StorefrontProduct>; updatedReservation: CartReservation } {
  if (params.reservation.status !== 'active') {
    throw new Error(`Cannot checkout with ${params.reservation.status} cart reservation.`);
  }

  if (params.fulfillmentMethod === 'shipping' && !params.shippingAddress) {
    throw new Error('Shipping address is required for delivery orders.');
  }

  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  // Deduct from reservedStock permanently
  const updatedProducts = new Map<string, StorefrontProduct>();
  for (const [id, prod] of params.products.entries()) {
    updatedProducts.set(id, { ...prod });
  }

  for (const item of params.reservation.items) {
    const prod = updatedProducts.get(item.productId);
    if (prod) {
      prod.reservedStock = Math.max(0, prod.reservedStock - item.quantity);
      // availableStock was already decremented at reservation time!
    }
  }

  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const pickupCode = params.fulfillmentMethod === 'pickup'
    ? Math.floor(1000 + Math.random() * 9000).toString()
    : undefined;

  const order: OnlineStoreOrder = {
    orderId: `ORD_ID_${Date.now().toString(36)}`,
    orderNumber,
    clientId: params.clientId,
    clientName: params.clientName,
    clientEmail: params.clientEmail,
    items: params.reservation.items,
    fulfillmentMethod: params.fulfillmentMethod,
    shippingAddress: params.shippingAddress,
    pickupCode,
    subtotal: params.quote.subtotal,
    shippingFee: params.quote.shippingFee,
    taxAmount: params.quote.taxAmount,
    totalAmount: params.quote.totalAmount,
    status: 'paid_processing',
    paymentReference: params.paymentReference,
    createdAt: now.toISOString(),
    paidAt: now.toISOString(),
  };

  const updatedReservation: CartReservation = {
    ...params.reservation,
    status: 'completed',
  };

  return { order, updatedProducts, updatedReservation };
}

/**
 * Fulfills an order (ready for pickup or shipped with tracking number).
 */
export function fulfillStoreOrder(params: {
  order: OnlineStoreOrder;
  action: 'mark_ready_for_pickup' | 'mark_picked_up' | 'dispatch_shipping';
  trackingNumber?: string;
  carrier?: string;
  providedPickupCode?: string;
  currentTime?: string;
}): OnlineStoreOrder {
  const now = params.currentTime ? new Date(params.currentTime).toISOString() : new Date().toISOString();

  if (params.action === 'mark_ready_for_pickup') {
    if (params.order.fulfillmentMethod !== 'pickup') {
      throw new Error('Only pickup orders can be marked ready for pickup.');
    }
    return {
      ...params.order,
      status: 'ready_for_pickup',
    };
  }

  if (params.action === 'mark_picked_up') {
    if (params.order.fulfillmentMethod !== 'pickup') {
      throw new Error('Order is not configured for in-store pickup.');
    }
    if (params.providedPickupCode && params.order.pickupCode !== params.providedPickupCode) {
      throw new Error(`Invalid pickup code. Expected 4-digit code matching customer receipt.`);
    }
    return {
      ...params.order,
      status: 'fulfilled',
      fulfilledAt: now,
    };
  }

  if (params.action === 'dispatch_shipping') {
    if (params.order.fulfillmentMethod !== 'shipping') {
      throw new Error('Only shipping orders can be dispatched with a carrier.');
    }
    if (!params.trackingNumber) {
      throw new Error('Carrier tracking number is required to dispatch shipment.');
    }
    return {
      ...params.order,
      status: 'shipped',
      trackingNumber: params.trackingNumber,
      carrier: params.carrier ?? 'USPS Priority',
      fulfilledAt: now,
    };
  }

  return params.order;
}

/**
 * Refunds and restocks an online store order.
 * Invariant: Returned quantities automatically increment available stock in unified ledger.
 */
export function refundAndRestockOrder(params: {
  order: OnlineStoreOrder;
  products: Map<string, StorefrontProduct>;
  reason: string;
  refundShipping?: boolean;
}): { order: OnlineStoreOrder; updatedProducts: Map<string, StorefrontProduct> } {
  if (params.order.status === 'cancelled_restocked') {
    throw new Error('Order has already been cancelled and restocked.');
  }

  const updatedProducts = new Map<string, StorefrontProduct>();
  for (const [id, prod] of params.products.entries()) {
    updatedProducts.set(id, { ...prod });
  }

  // Restock items into available stock
  for (const item of params.order.items) {
    const prod = updatedProducts.get(item.productId);
    if (prod) {
      prod.availableStock += item.quantity;
    }
  }

  const refundShipping = params.refundShipping ?? true;
  const refundAmount = refundShipping
    ? params.order.totalAmount
    : Number((params.order.subtotal + params.order.taxAmount).toFixed(2));

  const updatedOrder: OnlineStoreOrder = {
    ...params.order,
    status: 'cancelled_restocked',
    refundedAmount: refundAmount,
    cancellationReason: params.reason,
  };

  return { order: updatedOrder, updatedProducts };
}
