import React, { forwardRef } from 'react';
import { TextProps as RNTextProps } from 'react-native';

import Animated, { AnimatedProps } from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';

import { appThemes, typography } from '@/theme';
import { Skeleton, SkeletonProps } from '../skeleton';

export type TextVariant = keyof typeof typography.variants;
export type TextType = keyof typeof appThemes.light.colors.text;

export interface TextProps extends Omit<AnimatedProps<RNTextProps>, 'style'> {
  loading?: boolean;
  skeletonProps?: SkeletonProps;
  variant?: TextVariant;
  type?: TextType;
  style?: RNTextProps['style'];
}

export const Text = forwardRef<
  React.ElementRef<typeof Animated.Text>,
  TextProps
>(
  (
    { loading, skeletonProps, variant = 'bodyM', type = 'body', ...props },
    _ref,
  ): React.ReactNode => {
    const { theme } = useUnistyles();
    // Return skeleton when loading is true
    if (loading) {
      return <SkeletonText skeletonProps={skeletonProps} variant={variant} />;
    }

    return (
      <Animated.Text
        {...props}
        style={[
          typography.variants[variant],
          { color: theme.colors.text[type] },
          props.style,
        ]}
      />
    );
  },
);

const SkeletonText = ({
  skeletonProps,
  variant,
}: {
  skeletonProps?: SkeletonProps;
  variant?: TextVariant;
}): React.ReactNode => {
  const getSkeletonDimensions = (): {
    width: number;
    height: number;
  } => {
    // Default dimensions based on text variant
    // Using fixed pixel widths to prevent overflow in flex containers
    const variantDimensions: Record<string, { width: number; height: number }> =
      {
        bold: { width: 120, height: 16 },
        labelXS: { width: 60, height: 10 },
        labelS: { width: 80, height: 14 },
        labelM: { width: 100, height: 18 },
        labelL: { width: 120, height: 20 },
        labelXL: { width: 140, height: 24 },
        bodyXXS: { width: 80, height: 12 },
        bodyXS: { width: 100, height: 14 },
        bodyS: { width: 120, height: 18 },
        bodyM: { width: 140, height: 20 },
        bodyL: { width: 160, height: 24 },
        bodyXL: { width: 180, height: 28 },
        headingXS: { width: 140, height: 28 },
        headingS: { width: 160, height: 32 },
        headingM: { width: 180, height: 36 },
        headingL: { width: 200, height: 42 },
        headingXL: { width: 220, height: 54 },
        displayS: { width: 200, height: 60 },
        displayM: { width: 240, height: 78 },
        displayL: { width: 280, height: 90 },
        displayXL: { width: 320, height: 100 },
      };

    return variant && variantDimensions[variant as string]
      ? variantDimensions[variant as string]
      : { width: 120, height: 16 }; // Default fallback with fixed width
  };

  const defaultDimensions = getSkeletonDimensions();

  return (
    <Skeleton
      width={defaultDimensions.width}
      height={defaultDimensions.height}
      style={{
        // Ensure skeleton doesn't overflow in flex containers
        maxWidth: '100%',
        flexShrink: 1,
        ...skeletonProps?.style,
      }}
      {...skeletonProps}
    />
  );
};
