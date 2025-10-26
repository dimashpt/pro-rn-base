import React, { useEffect, useRef } from 'react';
import { Animated, DimensionValue, ViewStyle } from 'react-native';

import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
  animationSpeed?: number; // Duration in milliseconds
}

export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
  animationSpeed = 1500,
}: SkeletonProps): React.ReactElement {
  const { theme } = useUnistyles();
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(
    function startPulseAnimation(): () => void {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.8,
            duration: animationSpeed / 2,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.3,
            duration: animationSpeed / 2,
            useNativeDriver: true,
          }),
        ]),
      );

      pulseAnimation.start();

      return function stopAnimation(): void {
        pulseAnimation.stop();
      };
    },
    [pulseAnim, animationSpeed],
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.colors.background.subtle,
          opacity: pulseAnim,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create(() => ({
  container: {
    overflow: 'hidden',
  },
}));
