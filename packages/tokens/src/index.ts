import palette from './palette.json';

export type BrandColors = typeof palette.colors;
export type Typography = typeof palette.typography;
export type VoiceAndTone = typeof palette.voiceAndTone;

export const brandTokens = palette;

/**
 * Generates CSS Variables string from the single-source-of-truth palette.
 * Injects directly into Web :root or Tailwind theme.
 */
export function generateCssVariables(): string {
  const { colors } = palette;
  return `
    :root {
      --color-primary: ${colors.primary.default};
      --color-primary-hover: ${colors.primary.hover};
      --color-primary-light: ${colors.primary.light};
      
      --color-secondary: ${colors.secondary.default};
      --color-secondary-hover: ${colors.secondary.hover};
      --color-secondary-light: ${colors.secondary.light};
      
      --color-tertiary: ${colors.tertiary.default};
      --color-tertiary-hover: ${colors.tertiary.hover};
      --color-tertiary-light: ${colors.tertiary.light};
      
      --color-bg: ${colors.neutral.background};
      --color-card: ${colors.neutral.card};
      --color-muted: ${colors.neutral.muted};
      --color-border: ${colors.neutral.border};
      --color-text: ${colors.neutral.text};
      --color-text-muted: ${colors.neutral.textMuted};

      --color-error: ${colors.feedback.error};
      --color-success: ${colors.feedback.success};
      --color-warning: ${colors.feedback.warning};

      --font-headline: ${palette.typography.headline.family};
      --font-body: ${palette.typography.body.family};
    }
  `.trim();
}

/**
 * Posie Placeholder Emblem Logo (Floral botanical geometry)
 * Clean, lightweight SVG string for rendering across web and mobile.
 */
export const POSIE_LOGO_SVG = `
<svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="posie-emblem">
    <circle cx="20" cy="20" r="14" fill="#2C3E30" />
    <path d="M20 10C21.5 14 24 18 20 23C16 18 18.5 14 20 10Z" fill="#C67D6E" />
    <path d="M20 23C24 21.5 28 24 23 28C18 24 21.5 21.5 20 23Z" fill="#8A9A86" />
    <circle cx="20" cy="20" r="3" fill="#FAF8F5" />
    <text x="44" y="27" font-family="Newsreader, serif" font-size="22" font-weight="600" fill="#2C3E30" letter-spacing="1">posie</text>
  </g>
</svg>
`.trim();
