/**
 * F124 — Product Use Per Service & Fractional Backbar Tracking
 *
 * Implements fractional backbar unit tracking, formula versioning, digital scale
 * measured dispense vs estimated defaults, and residual bowl waste reporting.
 *
 * KEY INVARIANT (Basis: B; R06, R07, Mangomint, Fractional Stock):
 * Unit Conversion Truth & Estimated Use Transparency.
 * Units convert consistently across metric (ml, g) and US customary (fl oz, oz).
 * Any usage not weighed on a verified scale is explicitly stamped `estimated_formula_default`
 * rather than falsely claiming physical measurement. Residual waste is tracked distinctly
 * from consumed volume to protect true service contribution margins.
 */

export type ProductMeasurementUnit = 'ml' | 'fl_oz' | 'g' | 'oz' | 'pumps' | 'drops';

export type MeasurementSource = 'measured_scale' | 'measured_cylinder' | 'estimated_formula_default';

export interface BackbarIngredientUse {
  productId: string;
  productName: string;
  lotNumber?: string;
  quantity: number;
  unit: ProductMeasurementUnit;
  /** Direct cost per base unit in cents (e.g., 9 cents per ml) */
  costPerBaseUnitCents: number;
  measurementSource: MeasurementSource;
  /** Amount discarded or remaining in mixing bowl */
  wasteQuantity?: number;
}

export interface ServiceFormulaRecord {
  id: string;
  appointmentId: string;
  serviceId: string;
  practitionerId: string;
  formulaVersion: number;
  formulaName: string;
  createdAtUtc: string;
  ingredients: BackbarIngredientUse[];
  notes?: string;
}

export interface BackbarUsageSummary {
  formulaId: string;
  appointmentId: string;
  totalConsumedCostCents: number;
  totalWasteCostCents: number;
  grossBackbarCostCents: number;
  hasUnmeasuredEstimates: boolean;
  unmeasuredIngredientCount: number;
  itemizedBreakdown: Array<{
    productId: string;
    productName: string;
    normalizedMlOrGrams: number;
    normalizedUnit: 'ml' | 'g';
    consumedCostCents: number;
    wasteCostCents: number;
    isEstimated: boolean;
  }>;
}

/**
 * Standard unit conversions to base metric units (ml for liquid, grams for mass).
 */
export function convertToBaseUnit(
  quantity: number,
  unit: ProductMeasurementUnit
): { normalizedValue: number; normalizedUnit: 'ml' | 'g' } {
  switch (unit) {
    case 'fl_oz':
      return { normalizedValue: Math.round(quantity * 29.5735 * 100) / 100, normalizedUnit: 'ml' };
    case 'pumps':
      // Standard beauty pump is ~1.5 ml
      return { normalizedValue: Math.round(quantity * 1.5 * 100) / 100, normalizedUnit: 'ml' };
    case 'drops':
      // Standard drop is ~0.05 ml
      return { normalizedValue: Math.round(quantity * 0.05 * 100) / 100, normalizedUnit: 'ml' };
    case 'oz':
      return { normalizedValue: Math.round(quantity * 28.3495 * 100) / 100, normalizedUnit: 'g' };
    case 'g':
      return { normalizedValue: quantity, normalizedUnit: 'g' };
    case 'ml':
    default:
      return { normalizedValue: quantity, normalizedUnit: 'ml' };
  }
}

/**
 * Computes backbar consumption and waste costs with explicit estimation flags.
 */
export function computeBackbarUsageSummary(formula: ServiceFormulaRecord): BackbarUsageSummary {
  let totalConsumedCostCents = 0;
  let totalWasteCostCents = 0;
  let unmeasuredIngredientCount = 0;

  const itemizedBreakdown = formula.ingredients.map((ing) => {
    const { normalizedValue, normalizedUnit } = convertToBaseUnit(ing.quantity, ing.unit);
    const isEstimated = ing.measurementSource === 'estimated_formula_default';

    if (isEstimated) {
      unmeasuredIngredientCount++;
    }

    const consumedCostCents = Math.round(normalizedValue * ing.costPerBaseUnitCents);
    let wasteCostCents = 0;

    if (ing.wasteQuantity && ing.wasteQuantity > 0) {
      const { normalizedValue: wasteNormalized } = convertToBaseUnit(ing.wasteQuantity, ing.unit);
      wasteCostCents = Math.round(wasteNormalized * ing.costPerBaseUnitCents);
    }

    totalConsumedCostCents += consumedCostCents;
    totalWasteCostCents += wasteCostCents;

    return {
      productId: ing.productId,
      productName: ing.productName,
      normalizedMlOrGrams: normalizedValue,
      normalizedUnit,
      consumedCostCents,
      wasteCostCents,
      isEstimated,
    };
  });

  return {
    formulaId: formula.id,
    appointmentId: formula.appointmentId,
    totalConsumedCostCents,
    totalWasteCostCents,
    grossBackbarCostCents: totalConsumedCostCents + totalWasteCostCents,
    hasUnmeasuredEstimates: unmeasuredIngredientCount > 0,
    unmeasuredIngredientCount,
    itemizedBreakdown,
  };
}
