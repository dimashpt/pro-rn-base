import React, { JSX, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { scheduleOnRN } from 'react-native-worklets';

import { useNetworkStatus } from '@/hooks';
import { Text } from '../text';

export function NetworkStatusBar(): JSX.Element | null {
  const { t } = useTranslation();
  const network = useNetworkStatus();
  const { theme, rt } = useUnistyles();
  const [isVisible, setIsVisible] = useState(true);
  const [wasConnected, setWasConnected] = useState(network.isConnected);
  const heightAnim = useSharedValue(0);
  const message = network.isConnected
    ? t('network.back_online')
    : t('network.no_connection');

  useEffect(() => {
    // Always show when disconnected
    if (!network.isConnected) {
      setIsVisible(true);
      heightAnim.value = withTiming(1, { duration: 300 });
    }
    // Handle transition from disconnected to connected
    else if (network.isConnected && !wasConnected) {
      setIsVisible(true);
      heightAnim.value = withTiming(1, { duration: 300 });

      // Hide after 3 seconds when coming back online
      const timer = setTimeout(() => {
        heightAnim.value = withTiming(0, { duration: 300 }, () => {
          scheduleOnRN(setIsVisible, false);
        });
      }, 3000);

      return () => clearTimeout(timer);
    }

    // Update the previous state
    setWasConnected(network.isConnected);
  }, [network.isConnected, wasConnected, heightAnim]);

  const animatedStyle = useAnimatedStyle(() => {
    const animatedPaddingTop = heightAnim.value * theme.spacing.sm;
    const animatedPaddingBottom =
      heightAnim.value * (rt.insets.bottom + theme.spacing.sm);

    return {
      height: heightAnim.value * (30 + rt.insets.bottom + theme.spacing.sm),
      paddingTop: animatedPaddingTop,
      paddingBottom: animatedPaddingBottom,
      overflow: 'hidden',
    };
  });

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.container(network.isConnected), animatedStyle]}
    >
      <Text variant="bodyS" type="light">
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: (isConnected: boolean) => ({
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isConnected
      ? theme.colors.text.brand
      : theme.colors.text.secondary,
  }),
}));
