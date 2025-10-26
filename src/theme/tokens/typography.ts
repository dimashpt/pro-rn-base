import { normalize } from '@/utils/ui';

/**
 * Typography tokens derived from PlusJakartaSans assets and existing font sizes
 * Based on Material Design 3 typography scale
 */

export const fontSize = {
  xxs: normalize(8),
  xs: normalize(10),
  sm: normalize(12),
  base: normalize(14),
  lg: normalize(16),
  xl: normalize(18),
  xxl: normalize(20),
  xxxl: normalize(24),
  huge: normalize(28),
  mega: normalize(36),
  jumbo: normalize(46),
  giga: normalize(48),
  ultra: normalize(56),
  titan: normalize(72),
} as const;

export const lineHeight = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 28,
  xl: 28,
  '2xl': 32,
  '3xl': 36,
  '4xl': 40,
  '5xl': 44,
  '6xl': 56,
} as const;

export const letterSpacing = {
  tight: -0.25,
  normal: 0,
  wide: 0.15,
} as const;

export const fontFamily = {
  extraLight: 'PlusJakartaSans_200ExtraLight',
  light: 'PlusJakartaSans_300Light',
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
} as const;

export const fontWeight = {
  extraLight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
} as const;

export const typography = {
  lineHeight,
  fontSize,
  fontWeight,
  letterSpacing,
  fontFamily,
  variants: {
    labelXS: {
      fontFamily: fontFamily.semiBold,
      fontWeight: fontWeight.semiBold,
      fontSize: fontSize.xxs,
      letterSpacing: 0.1,
    },
    labelS: {
      fontFamily: fontFamily.semiBold,
      fontWeight: fontWeight.semiBold,
      fontSize: fontSize.xs,
      letterSpacing: 0.1,
    },
    labelM: {
      fontFamily: fontFamily.semiBold,
      fontWeight: fontWeight.semiBold,
      fontSize: fontSize.sm,
      letterSpacing: 0.1,
    },
    labelL: {
      fontFamily: fontFamily.semiBold,
      fontWeight: fontWeight.semiBold,
      fontSize: fontSize.base,
    },
    labelXL: {
      fontFamily: fontFamily.semiBold,
      fontWeight: fontWeight.semiBold,
      fontSize: fontSize.lg,
    },
    bodyXXS: {
      fontFamily: fontFamily.regular,
      fontWeight: fontWeight.normal,
      fontSize: fontSize.xxs,
    },
    bodyXS: {
      fontFamily: fontFamily.regular,
      fontWeight: fontWeight.normal,
      fontSize: fontSize.xs,
    },
    bodyS: {
      fontFamily: fontFamily.regular,
      fontWeight: fontWeight.normal,
      fontSize: fontSize.sm,
    },
    bodyM: {
      fontFamily: fontFamily.regular,
      fontWeight: fontWeight.normal,
      fontSize: fontSize.base,
    },
    bodyL: {
      fontFamily: fontFamily.regular,
      fontWeight: fontWeight.normal,
      fontSize: fontSize.lg,
      letterSpacing: 0,
    },
    bodyXL: {
      fontFamily: fontFamily.regular,
      fontWeight: fontWeight.normal,
      fontSize: fontSize.xl,
    },
    headingXS: {
      fontFamily: fontFamily.semiBold,
      fontWeight: fontWeight.semiBold,
      fontSize: fontSize.xl,
    },
    headingS: {
      fontFamily: fontFamily.semiBold,
      fontWeight: fontWeight.semiBold,
      fontSize: fontSize.xxl,
    },
    headingM: {
      fontFamily: fontFamily.semiBold,
      fontWeight: fontWeight.semiBold,
      fontSize: fontSize.xxxl,
    },
    headingL: {
      fontFamily: fontFamily.semiBold,
      fontWeight: fontWeight.semiBold,
      fontSize: fontSize.huge,
    },
    headingXL: {
      fontFamily: fontFamily.semiBold,
      fontWeight: fontWeight.semiBold,
      fontSize: fontSize.mega,
    },
    displayS: {
      fontFamily: fontFamily.bold,
      fontWeight: fontWeight.bold,
      fontSize: fontSize.giga,
    },
    displayM: {
      fontFamily: fontFamily.bold,
      fontWeight: fontWeight.bold,
      fontSize: fontSize.ultra,
    },
    displayL: {
      fontFamily: fontFamily.bold,
      fontWeight: fontWeight.bold,
      fontSize: fontSize.jumbo,
    },
    displayXL: {
      fontFamily: fontFamily.bold,
      fontWeight: fontWeight.bold,
      fontSize: fontSize.titan,
    },
  },
} as const;
