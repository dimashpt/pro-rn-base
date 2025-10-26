import React, { JSX, useEffect } from 'react';
import { View } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Clickable } from '../clickable';
import { Text } from '../text';

interface TabItemProps {
  route: BottomTabBarProps['state']['routes'][0];
  isFocused: boolean;
  descriptors: BottomTabBarProps['descriptors'];
  navigation: BottomTabBarProps['navigation'];
}

const TabItem = ({
  route,
  isFocused,
  descriptors,
  navigation,
}: TabItemProps): JSX.Element => {
  const { theme } = useUnistyles();
  const { options } = descriptors[route.key];
  const opacityValue = useSharedValue(0.5);
  const scaleValue = useSharedValue(1);

  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel.toString()
      : options.title !== undefined
        ? options.title.toString()
        : route.name;

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacityValue.value,
    transform: [{ scale: scaleValue.value }],
  }));

  useEffect(() => {
    opacityValue.value = withTiming(isFocused ? 1 : 0.5, {
      duration: 300,
    });
    scaleValue.value = withTiming(isFocused ? 1 : 0.8, {
      duration: 300,
    });
  }, [isFocused]); // Dependency ensures updates happen only when focus changes

  const onPress = (): void => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  function renderIcon(): React.ReactNode {
    if (options.tabBarIcon) {
      return options.tabBarIcon!({
        focused: isFocused,
        color: isFocused
          ? theme.colors.text.inverted
          : theme.colors.text.secondary,
        size: 20,
      });
    }
    return null;
  }

  return (
    <Clickable key={route.key} onPress={onPress} style={styles.touchableTab}>
      <View style={styles.tab}>
        {isFocused ? (
          <Animated.View style={[styles.activeIconWrapper, animatedStyle]}>
            {renderIcon()}
          </Animated.View>
        ) : null}
        {renderIcon()}
        <Text
          variant={isFocused ? 'labelS' : 'bodyXS'}
          type={isFocused ? 'brand' : 'secondary'}
        >
          {label}
        </Text>
      </View>
    </Clickable>
  );
};

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): JSX.Element => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, bottom ? { paddingBottom: bottom } : {}]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <TabItem
            key={route.key}
            route={route}
            isFocused={isFocused}
            descriptors={descriptors}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colors.background.elevated,
    borderTopStartRadius: theme.radius.xl,
    borderTopEndRadius: theme.radius.xl,
    bottom: 0,
    left: 0,
    right: 0,
    ...theme.elevation.level3,
  },
  activeIconWrapper: {
    position: 'absolute',
    borderRadius: theme.radius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    top: -20,
    width: 50,
    height: 50,
    backgroundColor: theme.colors.background.brand,
    zIndex: 10,
  },
  touchableTab: {
    borderRadius: theme.radius['3xl'],
    overflow: 'visible',
  },
  tab: {
    flex: 1,
    borderRadius: theme.radius['3xl'],
    alignItems: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    position: 'relative',
  },
  updateButtonContainer: {
    position: 'absolute',
    zIndex: 1000,
    right: '5%',
    ...theme.elevation.level2,
  },
  updateButton: {
    borderRadius: theme.radius['3xl'],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.brand,
    height: 50,
    minWidth: 50,
    paddingHorizontal: 16,
    gap: theme.spacing.xs,
  },
  loaderContainer: {
    position: 'absolute',
    flexDirection: 'row',
    borderRadius: theme.radius['3xl'],
    alignItems: 'center',
    padding: theme.spacing.xs,
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.background.brand,
    zIndex: 1000,
    top: -15,
    right: 15,
  },
}));
