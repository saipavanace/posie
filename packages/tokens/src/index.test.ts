import { describe, it, expect } from 'vitest';
import { brandTokens, generateCssVariables, POSIE_LOGO_SVG } from './index';
import palette from './palette.json';

describe('Design Tokens Package', () => {
  it('should export the Sage & Linen Atelier palette correctly', () => {
    expect(brandTokens.colors.primary.default).toBe('#2C3E30');
    expect(brandTokens.colors.secondary.default).toBe('#8A9A86');
    expect(brandTokens.colors.tertiary.default).toBe('#C67D6E');
    expect(brandTokens.colors.neutral.background).toBe('#FAF8F5');
  });

  it('should export the correct typography pairings', () => {
    expect(palette.typography.headline.family).toContain('Newsreader');
    expect(palette.typography.body.family).toContain('Manrope');
  });

  it('should generate valid CSS variables matching the palette', () => {
    const cssVars = generateCssVariables();
    expect(cssVars).toContain('--color-primary: #2C3E30');
    expect(cssVars).toContain('--color-secondary: #8A9A86');
    expect(cssVars).toContain('--color-tertiary: #C67D6E');
    expect(cssVars).toContain('--color-bg: #FAF8F5');
  });

  it('should provide the Posie logo SVG emblem', () => {
    expect(POSIE_LOGO_SVG).toContain('<svg');
    expect(POSIE_LOGO_SVG).toContain('posie');
    expect(POSIE_LOGO_SVG).toContain('#2C3E30');
  });
});
