import { baseColors } from './tokens/colors';
import { elevation } from './tokens/elevation';
import { radius } from './tokens/radius';
import { spacing } from './tokens/spacing';
import { typography } from './tokens/typography';

// Utility type that preserves structure but allows different values
type ThemeStructure<T> = {
  [K in keyof T]: T[K] extends object
    ? ThemeStructure<T[K]>
    : T[K] extends string
      ? string
      : T[K];
};

const misc = {
  spacing,
  radius,
  typography,
  elevation,

  opacity: {
    disabled: 0.38,
    hover: 0.08,
    focus: 0.12,
    selected: 0.12,
    pressed: 0.12,
    dragged: 0.16,
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    skipLink: 1070,
    toast: 1080,
    tooltip: 1090,
  },
} as const;

export const light = {
  colors: {
    base: baseColors,
    // ---------- Background ----------
    background: {
      default: baseColors.SLATE_50,
      subtle: baseColors.SLATE_100,
      elevated: baseColors.WHITE,
      overlay: baseColors.BLACK + 'CC',
      hover: baseColors.SLATE_100,
      active: baseColors.SLATE_200,
      disabled: baseColors.SLATE_100,
      brand: baseColors.BRAND_500,
      brandLight: baseColors.BRAND_50,

      // Feedback
      error: baseColors.DANGER_500,
      errorLight: baseColors.DANGER_50,
      success: baseColors.SUCCESS_500,
      successLight: baseColors.SUCCESS_50,
      warning: baseColors.WARNING_500,
      warningLight: baseColors.WARNING_50,
    },

    // ---------- Text ----------
    text: {
      body: baseColors.SLATE_900,
      placeholder: baseColors.SLATE_400,
      secondary: baseColors.SLATE_600,
      inverted: baseColors.SLATE_50,
      disabled: baseColors.SLATE_400,
      brand: baseColors.BRAND_500,
      success: baseColors.SUCCESS_500,
      error: baseColors.DANGER_500,
      warning: baseColors.WARNING_500,
      light: baseColors.WHITE,
      dark: baseColors.SLATE_900,
    },

    // ---------- Border ----------
    border: {
      light: baseColors.WHITE,
      default: baseColors.SLATE_200,
      strong: baseColors.SLATE_300,
      brand: baseColors.BRAND_500,
      success: baseColors.SUCCESS_500,
      error: baseColors.DANGER_500,
      warning: baseColors.WARNING_500,
    },

    // ---------- Elevation colors ----------
    elevation: {
      level0: baseColors.TRANSPARENT,
      level1: baseColors.SLATE_50,
      level2: baseColors.SLATE_100,
      level3: baseColors.SLATE_200,
      level4: baseColors.SLATE_300,
      level5: baseColors.SLATE_400,
    },
  },

  ...misc,
} as const;

export const dark: ThemeStructure<typeof light> = {
  colors: {
    base: baseColors,
    // ---------- Background ----------
    background: {
      default: baseColors.SLATE_900,
      subtle: baseColors.SLATE_900,
      elevated: baseColors.SLATE_800,
      overlay: baseColors.BLACK + 'CC',
      hover: baseColors.SLATE_700,
      active: baseColors.SLATE_600,
      disabled: baseColors.SLATE_600,
      brand: baseColors.BRAND_500,
      brandLight: baseColors.BRAND_900,

      // Feedback
      error: baseColors.DANGER_500,
      errorLight: baseColors.DANGER_900,
      success: baseColors.SUCCESS_500,
      successLight: baseColors.SUCCESS_900,
      warning: baseColors.WARNING_500,
      warningLight: baseColors.WARNING_900,
    },

    // ---------- Text ----------
    text: {
      body: baseColors.SLATE_50,
      placeholder: baseColors.SLATE_600,
      secondary: baseColors.SLATE_400,
      inverted: baseColors.SLATE_900,
      disabled: baseColors.SLATE_500,
      brand: baseColors.BRAND_400,
      success: baseColors.SUCCESS_400,
      error: baseColors.DANGER_400,
      warning: baseColors.WARNING_400,
      light: baseColors.WHITE,
      dark: baseColors.SLATE_900,
    },

    // ---------- Border ----------
    border: {
      light: baseColors.WHITE,
      default: baseColors.SLATE_700,
      strong: baseColors.SLATE_600,
      brand: baseColors.BRAND_500,
      success: baseColors.SUCCESS_500,
      error: baseColors.DANGER_500,
      warning: baseColors.WARNING_500,
    },

    // ---------- Elevation colors ----------
    elevation: {
      level0: baseColors.TRANSPARENT,
      level1: baseColors.SLATE_900,
      level2: baseColors.SLATE_800,
      level3: baseColors.SLATE_700,
      level4: baseColors.SLATE_600,
      level5: baseColors.SLATE_500,
    },
  },

  ...misc,
} as const;

export const appThemes = { light, dark };
