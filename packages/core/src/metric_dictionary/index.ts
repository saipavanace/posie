/**
 * F112 — Metric Dictionary and Governed Data Model
 *
 * Defines canonical studio metrics (gross sales, net service revenue, retail revenue,
 * tips collected, deferred gift card liability, rebooking rate, average ticket value)
 * with source lineage and data freshness timestamps.
 *
 * Basis: Foundation; analytics chapter
 * Key Invariant:
 * Single Source of Truth: All reporting views (executive dashboard, practitioner pay stub,
 * accounting journal sync) evaluate the exact same metric formulas with source lineage,
 * eliminating metric divergence across screens.
 */

export type MetricKey =
  | 'gross_sales'
  | 'net_service_revenue'
  | 'net_retail_revenue'
  | 'tips_collected'
  | 'sales_tax_collected'
  | 'deferred_gift_card_liability'
  | 'rebooking_rate_percentage'
  | 'average_ticket_value_usd';

export interface MetricDefinition {
  key: MetricKey;
  displayName: string;
  category: 'financial' | 'operations' | 'client_behavior';
  formulaDescription: string;
  underlyingAccounts: string[];
  unit: 'usd' | 'percentage' | 'count';
}

export interface MetricValue {
  metricKey: MetricKey;
  displayName: string;
  value: number;
  formattedValue: string;
  unit: 'usd' | 'percentage' | 'count';
  sourceLineage: string[];
  freshnessTimestampUTC: string;
  dataRange: {
    startDate: string;
    endDate: string;
  };
}

export interface TransactionDataSet {
  serviceSalesCents: number;
  serviceDiscountsCents: number;
  serviceRefundsCents: number;
  retailSalesCents: number;
  retailRefundsCents: number;
  tipsCollectedCents: number;
  salesTaxCollectedCents: number;
  giftCardsSoldCents: number;
  giftCardsRedeemedCents: number;
  completedAppointmentsCount: number;
  rebookedAppointmentsCount: number; // Rebooked within 60 days
}

export const CANONICAL_METRIC_DICTIONARY: Record<MetricKey, MetricDefinition> = {
  gross_sales: {
    key: 'gross_sales',
    displayName: 'Gross Studio Sales',
    category: 'financial',
    formulaDescription: 'Gross services + retail sales + gift cards sold before discounts or refunds',
    underlyingAccounts: ['4000', '4100', '2100'],
    unit: 'usd',
  },
  net_service_revenue: {
    key: 'net_service_revenue',
    displayName: 'Net Service Revenue',
    category: 'financial',
    formulaDescription: 'Gross service sales minus service discounts and service refunds',
    underlyingAccounts: ['4000'],
    unit: 'usd',
  },
  net_retail_revenue: {
    key: 'net_retail_revenue',
    displayName: 'Net Retail Boutique Revenue',
    category: 'financial',
    formulaDescription: 'Gross retail sales minus retail returns/refunds',
    underlyingAccounts: ['4100'],
    unit: 'usd',
  },
  tips_collected: {
    key: 'tips_collected',
    displayName: 'Staff Gratuity / Tips Collected',
    category: 'financial',
    formulaDescription: '100% pass-through client tips payable to providers and assistants',
    underlyingAccounts: ['2300'],
    unit: 'usd',
  },
  sales_tax_collected: {
    key: 'sales_tax_collected',
    displayName: 'Sales Tax Payable',
    category: 'financial',
    formulaDescription: 'Statutory sales tax collected from clients on taxable retail and services',
    underlyingAccounts: ['2200'],
    unit: 'usd',
  },
  deferred_gift_card_liability: {
    key: 'deferred_gift_card_liability',
    displayName: 'Deferred Gift Card Liability Delta',
    category: 'financial',
    formulaDescription: 'Gift cards sold (unearned liability) minus gift cards redeemed for services/retail',
    underlyingAccounts: ['2100'],
    unit: 'usd',
  },
  rebooking_rate_percentage: {
    key: 'rebooking_rate_percentage',
    displayName: 'Client 60-Day Rebooking Rate',
    category: 'client_behavior',
    formulaDescription: '(Completed visits with next appointment booked within 60 days) / (Total completed visits) * 100',
    underlyingAccounts: ['appointments_table'],
    unit: 'percentage',
  },
  average_ticket_value_usd: {
    key: 'average_ticket_value_usd',
    displayName: 'Average Ticket Value (ATV)',
    category: 'operations',
    formulaDescription: '(Net service revenue + net retail revenue) / (Completed appointments count)',
    underlyingAccounts: ['4000', '4100', 'appointments_table'],
    unit: 'usd',
  },
};

/**
 * Computes governed studio metrics with verifiable source lineage and freshness timestamps.
 */
export function computeGovernedMetrics(
  data: TransactionDataSet,
  dateRange: { startDate: string; endDate: string }
): Record<MetricKey, MetricValue> {
  const now = new Date().toISOString();

  // 1. Net Service Revenue
  const netServiceUSD = (data.serviceSalesCents - data.serviceDiscountsCents - data.serviceRefundsCents) / 100;

  // 2. Net Retail Revenue
  const netRetailUSD = (data.retailSalesCents - data.retailRefundsCents) / 100;

  // 3. Gross Sales
  const grossSalesUSD = (data.serviceSalesCents + data.retailSalesCents + data.giftCardsSoldCents) / 100;

  // 4. Tips Collected
  const tipsUSD = data.tipsCollectedCents / 100;

  // 5. Sales Tax Collected
  const salesTaxUSD = data.salesTaxCollectedCents / 100;

  // 6. Gift Card Liability Delta
  const giftCardDeltaUSD = (data.giftCardsSoldCents - data.giftCardsRedeemedCents) / 100;

  // 7. Rebooking Rate Percentage
  const rebookingRate =
    data.completedAppointmentsCount > 0
      ? Number(((data.rebookedAppointmentsCount / data.completedAppointmentsCount) * 100).toFixed(1))
      : 0;

  // 8. Average Ticket Value (ATV)
  const atvUSD =
    data.completedAppointmentsCount > 0
      ? Number(((netServiceUSD + netRetailUSD) / data.completedAppointmentsCount).toFixed(2))
      : 0;

  const result: Partial<Record<MetricKey, MetricValue>> = {};

  const metricsMap: Array<{ key: MetricKey; value: number; formatted: string }> = [
    { key: 'gross_sales', value: grossSalesUSD, formatted: `$${grossSalesUSD.toFixed(2)}` },
    { key: 'net_service_revenue', value: netServiceUSD, formatted: `$${netServiceUSD.toFixed(2)}` },
    { key: 'net_retail_revenue', value: netRetailUSD, formatted: `$${netRetailUSD.toFixed(2)}` },
    { key: 'tips_collected', value: tipsUSD, formatted: `$${tipsUSD.toFixed(2)}` },
    { key: 'sales_tax_collected', value: salesTaxUSD, formatted: `$${salesTaxUSD.toFixed(2)}` },
    { key: 'deferred_gift_card_liability', value: giftCardDeltaUSD, formatted: `$${giftCardDeltaUSD.toFixed(2)}` },
    { key: 'rebooking_rate_percentage', value: rebookingRate, formatted: `${rebookingRate.toFixed(1)}%` },
    { key: 'average_ticket_value_usd', value: atvUSD, formatted: `$${atvUSD.toFixed(2)}` },
  ];

  for (const item of metricsMap) {
    const def = CANONICAL_METRIC_DICTIONARY[item.key];
    result[item.key] = {
      metricKey: item.key,
      displayName: def.displayName,
      value: item.value,
      formattedValue: item.formatted,
      unit: def.unit,
      sourceLineage: def.underlyingAccounts,
      freshnessTimestampUTC: now,
      dataRange: dateRange,
    };
  }

  return result as Record<MetricKey, MetricValue>;
}
