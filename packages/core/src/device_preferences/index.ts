import { z } from 'zod';

/**
 * F067 — Local Device Preferences & Accessibility
 *
 * Implements persistent accessibility preferences per device and user profile,
 * supporting larger typography, high contrast, reduced motion, and clear focus indicators.
 *
 * Invariants (R04, UX):
 * 1. Booking and checkout must be fully operable via keyboard and simple taps (no drag-only or memory puzzles).
 * 2. Accessibility preferences generate standard CSS variable overrides and HTML data attributes.
 */

export const TextSizePreferenceSchema = z.enum(['default', 'large', 'extra_large']);
export type TextSizePreference = z.infer<typeof TextSizePreferenceSchema>;

export const ContrastPreferenceSchema = z.enum(['standard', 'high_contrast']);
export type ContrastPreference = z.infer<typeof ContrastPreferenceSchema>;

export const FocusRingPreferenceSchema = z.enum(['standard', 'high_visibility']);
export type FocusRingPreference = z.infer<typeof FocusRingPreferenceSchema>;

export const DevicePreferencesSchema = z.object({
  deviceId: z.string().min(1),
  textSize: TextSizePreferenceSchema.default('default'),
  contrastMode: ContrastPreferenceSchema.default('standard'),
  reducedMotion: z.boolean().default(false),
  focusRingStyle: FocusRingPreferenceSchema.default('standard'),
  hapticFeedbackEnabled: z.boolean().default(true),
  screenReaderOptimized: z.boolean().default(false),
  updatedAt: z.string().datetime(),
});
export type DevicePreferences = z.infer<typeof DevicePreferencesSchema>;

/**
 * Generates CSS variable style rules and root attributes to apply accessibility preferences.
 */
export function generateAccessibilityStyles(prefs: DevicePreferences): {
  cssVariables: Record<string, string>;
  dataAttributes: Record<string, string>;
  htmlClassNames: string[];
} {
  const cssVariables: Record<string, string> = {};
  const dataAttributes: Record<string, string> = {
    'data-text-size': prefs.textSize,
    'data-contrast': prefs.contrastMode,
    'data-reduced-motion': String(prefs.reducedMotion),
    'data-focus-ring': prefs.focusRingStyle,
  };
  const htmlClassNames: string[] = [];

  // Text Scaling
  if (prefs.textSize === 'large') {
    cssVariables['--posie-font-scale'] = '1.15';
    cssVariables['--posie-base-font-size'] = '18px';
    htmlClassNames.push('posie-text-large');
  } else if (prefs.textSize === 'extra_large') {
    cssVariables['--posie-font-scale'] = '1.30';
    cssVariables['--posie-base-font-size'] = '20px';
    htmlClassNames.push('posie-text-xl');
  } else {
    cssVariables['--posie-font-scale'] = '1.0';
    cssVariables['--posie-base-font-size'] = '16px';
  }

  // High Contrast
  if (prefs.contrastMode === 'high_contrast') {
    cssVariables['--color-primary'] = '#0F1A12';
    cssVariables['--color-text'] = '#000000';
    cssVariables['--color-border'] = '#000000';
    cssVariables['--color-background'] = '#FFFFFF';
    htmlClassNames.push('posie-high-contrast');
  }

  // Reduced Motion
  if (prefs.reducedMotion) {
    cssVariables['--posie-transition-duration'] = '0ms';
    cssVariables['--posie-animation-duration'] = '0ms';
    htmlClassNames.push('posie-reduce-motion');
  }

  // Focus Ring
  if (prefs.focusRingStyle === 'high_visibility') {
    cssVariables['--posie-focus-outline'] = '3px solid #2B5797';
    cssVariables['--posie-focus-offset'] = '3px';
    htmlClassNames.push('posie-high-vis-focus');
  }

  return { cssVariables, dataAttributes, htmlClassNames };
}

/**
 * Initializes or updates device accessibility preferences.
 */
export function setDevicePreferences(
  deviceId: string,
  updates: Partial<Omit<DevicePreferences, 'deviceId' | 'updatedAt'>>,
  existing?: DevicePreferences
): DevicePreferences {
  const base: DevicePreferences = existing ?? {
    deviceId,
    textSize: 'default',
    contrastMode: 'standard',
    reducedMotion: false,
    focusRingStyle: 'standard',
    hapticFeedbackEnabled: true,
    screenReaderOptimized: false,
    updatedAt: new Date().toISOString(),
  };

  return DevicePreferencesSchema.parse({
    ...base,
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}
