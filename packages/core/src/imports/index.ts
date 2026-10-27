import { z } from 'zod';
import { ServiceSchema } from '../catalog';

export const CsvRowErrorSchema = z.object({
  rowNumber: z.number().int().positive(),
  field: z.string(),
  reason: z.string(),
});

export const CatalogImportResultSchema = z.object({
  totalRows: z.number().int().nonnegative(),
  validRows: z.array(z.any()),
  errors: z.array(CsvRowErrorSchema),
  isValid: z.boolean(),
});

export type CsvRowError = z.infer<typeof CsvRowErrorSchema>;
export type CatalogImportResult = z.infer<typeof CatalogImportResultSchema>;

export const CATALOG_CSV_HEADER = 'name,category_id,price_in_cents,duration_minutes,description,prep';

/**
 * Validates a CSV string against catalog schemas.
 * Invariant (F016): Staged imports parse invalid rows without altering or corrupting valid live records.
 */
export function validateCatalogCsv(csvContent: string): CatalogImportResult {
  const lines = csvContent.trim().split('\n');
  if (lines.length <= 1) {
    return {
      totalRows: 0,
      validRows: [],
      errors: [{ rowNumber: 1, field: 'file', reason: 'CSV file is empty or missing data rows.' }],
      isValid: false,
    };
  }

  const validRows: any[] = [];
  const errors: CsvRowError[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].trim();
    if (!row) continue;

    const parts = row.split(',').map((p) => p.trim());
    if (parts.length < 5) {
      errors.push({
        rowNumber: i + 1,
        field: 'row',
        reason: 'Missing required columns (name, category_id, price_in_cents, duration_minutes, description).',
      });
      continue;
    }

    const [name, categoryId, priceStr, durationStr, description, prep] = parts;
    const price = parseInt(priceStr, 10);
    const duration = parseInt(durationStr, 10);

    if (isNaN(price) || price < 0) {
      errors.push({
        rowNumber: i + 1,
        field: 'price_in_cents',
        reason: 'Price must be a valid non-negative integer number of cents.',
      });
      continue;
    }

    if (isNaN(duration) || duration <= 0) {
      errors.push({
        rowNumber: i + 1,
        field: 'duration_minutes',
        reason: 'Duration must be a positive integer in minutes.',
      });
      continue;
    }

    validRows.push({
      id: crypto.randomUUID(),
      categoryId: categoryId || crypto.randomUUID(),
      name,
      clientDescription: description,
      preparationInstructions: prep || undefined,
      basePriceInCents: price,
      baseDurationMinutes: duration,
      active: true,
      addons: [],
      practitionerOverrides: [],
      version: 1,
    });
  }

  return {
    totalRows: lines.length - 1,
    validRows,
    errors,
    isValid: errors.length === 0,
  };
}
