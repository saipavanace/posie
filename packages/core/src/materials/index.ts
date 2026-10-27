import { z } from 'zod';
import { Service } from '../catalog';
import { BrandKit } from '../brand';

export const PrintablePriceMenuSchema = z.object({
  id: z.string().uuid(),
  businessName: z.string(),
  generatedAt: z.string().datetime(),
  versionTag: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      priceFormatted: z.string(),
      durationFormatted: z.string(),
      description: z.string(),
      prep: z.string().optional(),
    })
  ),
});

export type PrintablePriceMenu = z.infer<typeof PrintablePriceMenuSchema>;

/**
 * Compiles a printable price menu snapshot directly from live catalog and brand tokens.
 * Invariant (F006 / BR08): Printed prices strictly match the live catalog at generation time
 * and preserve an immutable generation timestamp and snapshot version.
 */
export function generatePrintableMenu(
  brand: BrandKit,
  services: Service[]
): PrintablePriceMenu {
  const activeServices = services.filter((s) => s.active);

  return {
    id: crypto.randomUUID(),
    businessName: brand.businessName,
    generatedAt: new Date().toISOString(),
    versionTag: `v${brand.version}.${activeServices.length}`,
    items: activeServices.map((s) => ({
      name: s.name,
      priceFormatted: `$${(s.basePriceInCents / 100).toFixed(2)}`,
      durationFormatted: `${s.baseDurationMinutes} mins`,
      description: s.clientDescription,
      prep: s.preparationInstructions,
    })),
  };
}

/**
 * Renders a high-resolution, print-ready HTML sheet for physical studio takeaway or desk displays.
 */
export function renderPrintableMenuHtml(menu: PrintablePriceMenu): string {
  const itemsHtml = menu.items
    .map(
      (item) => `
      <div class="menu-item" style="margin-bottom: 22px; padding-bottom: 14px; border-bottom: 1px dashed #E5E0D8;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
          <h4 style="font-family: 'Newsreader', serif; font-size: 1.25rem; color: #2C3E30; margin: 0;">${item.name}</h4>
          <span style="font-weight: 700; font-size: 1.1rem; color: #2C3E30;">${item.priceFormatted}</span>
        </div>
        <p style="font-size: 0.88rem; color: #68736B; margin: 0 0 4px;">${item.description}</p>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #8A9A86;">
          <span>Duration: ${item.durationFormatted}</span>
          ${item.prep ? `<span><em>Prep: ${item.prep}</em></span>` : ''}
        </div>
      </div>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${menu.businessName} — Price Menu</title>
  <style>
    @page { size: letter; margin: 1in; }
    body { font-family: 'Manrope', -apple-system, sans-serif; background: #FAF8F5; color: #1E2620; margin: 0; padding: 40px; }
    .header { text-align: center; margin-bottom: 36px; }
    .header h1 { font-family: 'Newsreader', serif; font-size: 2.4rem; color: #2C3E30; margin-bottom: 6px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${menu.businessName}</h1>
    <p style="color: #68736B; font-size: 0.9rem;">Treatment & Care Menu • Generated ${new Date(menu.generatedAt).toLocaleDateString()}</p>
  </div>
  <div class="menu-list">
    ${itemsHtml}
  </div>
</body>
</html>
  `.trim();
}
