import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Clickable } from '../clickable';
import { Text, TextProps } from '../text';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  text?: string;
  textProps?: TextProps;
  onPress?: () => void;
  variant?: 'filled' | 'outlined' | 'ghost';
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  text,
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  textProps,
  onPress,
  style,
  ...props
}: ButtonProps): React.JSX.Element {
  const isDisabled = disabled || loading;
  const { theme } = useUnistyles();

  // Animation shared values
  const disabledValue = useSharedValue(isDisabled ? 1 : 0);

  // Update disabled animation when disabled state changes
  useEffect(() => {
    disabledValue.value = withTiming(isDisabled ? 1 : 0, {
      duration: isDisabled ? 200 : 300, // 200ms exit, 300ms enter
    });
  }, [isDisabled, disabledValue]);

  // Calculate colors outside of animated callbacks
  const backgroundColorMap: Record<string, string> = {
    primary: theme.colors.background.brand,
    secondary: theme.colors.background.subtle,
    danger: theme.colors.background.error,
    warning: theme.colors.background.warning,
    success: theme.colors.background.success,
  };

  const borderColorMap: Record<string, string> = {
    primary: theme.colors.border.brand,
    secondary: theme.colors.border.default,
    danger: theme.colors.border.error,
    warning: theme.colors.border.warning,
    success: theme.colors.border.success,
  };

  const textColorMap: Record<string, string> = {
    primary: theme.colors.text.brand,
    secondary: theme.colors.text.secondary,
    danger: theme.colors.text.error,
    warning: theme.colors.text.warning,
    success: theme.colors.text.success,
  };

  const enabledBackgroundColor =
    variant === 'filled'
      ? backgroundColorMap[color] || backgroundColorMap.primary
      : 'transparent';
  const enabledBorderColor =
    variant === 'outlined'
      ? borderColorMap[color] || borderColorMap.primary
      : 'transparent';
  const enabledTextColor =
    variant === 'filled'
      ? theme.colors.text.light
      : textColorMap[color] || textColorMap.primary;

  // Animated styles
  const animatedButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      disabledValue.value,
      [0, 1],
      [enabledBackgroundColor, theme.colors.background.disabled],
    );

    const borderColor = interpolateColor(
      disabledValue.value,
      [0, 1],
      [enabledBorderColor, theme.colors.background.disabled],
    );

    return {
      backgroundColor,
      borderColor,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      disabledValue.value,
      [0, 1],
      [enabledTextColor, theme.colors.text.disabled],
    );

    return {
      color: textColor,
    };
  });

  const buttonStyle = [styles.base, styles[`variant_${variant}`], style];

  const textStyle = [styles[`text_${variant}`]];

  const textVariant =
    size === 'small' ? 'labelM' : size === 'medium' ? 'labelL' : 'labelXL';

  return (
    <Clickable
      {...props}
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      style={[buttonStyle, animatedButtonStyle]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'filled'
              ? theme.colors.text.disabled
              : textColorMap[color] || textColorMap.primary
          }
          style={styles.loader}
        />
      ) : (
        // Text button with optional prefix/suffix icons
        <>
          {text && (
            <Text
              variant={textVariant}
              style={[textStyle, animatedTextStyle]}
              {...textProps}
            >
              {text}
            </Text>
          )}
        </>
      )}
    </Clickable>
  );
}

const styles = StyleSheet.create((theme) => ({
  base: {
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },

  // Variant styles - Filled
  variant_filled: {
    borderWidth: 0,
  },

  // Variant styles - Outlined
  variant_outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },

  // Variant styles - Ghost
  variant_ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  // Text styles (base styles, colors are handled by animations)
  text_filled: {},
  text_outlined: {},
  text_ghost: {},

  loader: {
    marginHorizontal: 8,
  },
}));
