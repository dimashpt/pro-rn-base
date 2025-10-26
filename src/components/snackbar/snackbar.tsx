import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import * as Haptics from 'expo-haptics';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Text } from '../text';

export type SnackbarType = 'error' | 'success' | 'info';

interface SnackbarProps {
  visible: boolean;
  message: string;
  type?: SnackbarType;
  duration?: number;
  onDismiss?: () => void;

  isStacked?: boolean;
  stackIndex?: number;
}

// Smooth animation durations
export const ENTER_DURATION = 400;
export const EXIT_DURATION = 200;
export const STACK_DURATION = 250;

// Easing curves for natural motion
const enterEasing = Easing.out(Easing.cubic);
const exitEasing = Easing.in(Easing.cubic);
const stackEasing = Easing.inOut(Easing.quad);

// Circular Progress Component
interface CircularProgressProps {
  progress: SharedValue<number>;
  size: number;
  strokeWidth: number;
  color: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size,
  strokeWidth,
  color,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, 0],
    );

    return {
      strokeDashoffset,
    };
  });

  return (
    <Svg width={size} height={size} style={{ position: 'absolute' }}>
      {/* Background circle */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={0.2}
        fill="transparent"
      />
      {/* Progress circle */}
      <AnimatedCircle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeLinecap="round"
        fill="transparent"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        animatedProps={animatedProps}
      />
    </Svg>
  );
};

// Create animated Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  message,
  type = 'info',
  duration = 4000,
  onDismiss,

  isStacked = false,
  stackIndex = 0,
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(-120);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);
  const gestureTranslateY = useSharedValue(0);
  const progressValue = useSharedValue(0);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const autoDismissTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const progressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme } = useUnistyles();

  const getSnackbarStyle = (): {
    backgroundColor: string;
    iconColor: string;
  } => {
    switch (type) {
      case 'error':
        return {
          backgroundColor: theme.colors.background.error,
          iconColor: theme.colors.text.light,
        };
      case 'success':
        return {
          backgroundColor: theme.colors.background.success,
          iconColor: theme.colors.text.light,
        };
      case 'info':
      default:
        return {
          backgroundColor: theme.colors.background.brandLight,
          iconColor: theme.colors.text.light,
        };
    }
  };

  const { backgroundColor } = getSnackbarStyle();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value + gestureTranslateY.value },
        { translateX: translateX.value },
        { scale: scale.value },
      ],
    };
  });

  const startAutoDismiss = (): void => {
    if (duration > 0) {
      // Start progress animation
      progressValue.value = withTiming(1, {
        duration: duration,
        easing: Easing.linear,
      });

      autoDismissTimeoutRef.current = setTimeout(() => {
        handleDismiss();
      }, duration);
    }
  };

  const clearAutoDismiss = (): void => {
    if (autoDismissTimeoutRef.current) {
      clearTimeout(autoDismissTimeoutRef.current);
      autoDismissTimeoutRef.current = null;
    }
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
      progressTimeoutRef.current = null;
    }
    // Reset progress
    progressValue.value = 0;
  };

  const handleDismiss = (): void => {
    if (isExiting) return; // Prevent multiple dismiss calls
    setIsExiting(true);
    onDismiss?.();
  };

  const showSnackbar = (): void => {
    setHasBeenVisible(true);
    setIsExiting(false);
    setShouldRender(true);

    // Add haptic feedback based on snackbar type
    switch (type) {
      case 'error':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      case 'success':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'info':
      default:
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
    }

    // Smooth entrance animation with coordinated opacity, scale, and translateY
    opacity.value = withTiming(1, {
      duration: ENTER_DURATION,
      easing: enterEasing,
    });

    translateY.value = withTiming(0, {
      duration: ENTER_DURATION,
      easing: enterEasing,
    });

    // Calculate initial scale based on stacking
    const targetScale = isStacked ? 1 - stackIndex * 0.04 : 1;
    scale.value = withSequence(
      withTiming(targetScale * 1.02, {
        duration: ENTER_DURATION * 0.7,
        easing: enterEasing,
      }),
      withTiming(targetScale, {
        duration: ENTER_DURATION * 0.3,
        easing: Easing.out(Easing.quad),
      }),
    );

    // Start auto-dismiss with a slight delay to account for animation
    if (duration > 0) {
      setTimeout(() => startAutoDismiss(), ENTER_DURATION);
    }
  };

  const hideSnackbar = (): void => {
    clearAutoDismiss();

    // Smooth exit animation
    opacity.value = withTiming(0, {
      duration: EXIT_DURATION,
      easing: exitEasing,
    });

    translateY.value = withTiming(-120, {
      duration: EXIT_DURATION,
      easing: exitEasing,
    });

    scale.value = withTiming(0.9, {
      duration: EXIT_DURATION,
      easing: exitEasing,
    });

    // Reset gesture translation
    gestureTranslateY.value = withTiming(0, {
      duration: EXIT_DURATION,
      easing: exitEasing,
    });

    // Reset progress
    progressValue.value = withTiming(0, {
      duration: EXIT_DURATION,
      easing: exitEasing,
    });

    // Reset state after animation completes
    setTimeout(() => {
      setShouldRender(false);
      setHasBeenVisible(false);
      setIsExiting(false);
    }, EXIT_DURATION);
  };

  // Update stack position smoothly
  const updateStackPosition = (): void => {
    if (!hasBeenVisible || isExiting) return;

    const targetScale = isStacked ? 1 - stackIndex * 0.04 : 1;
    const targetY = isStacked ? stackIndex * 2 : 0; // Subtle vertical offset for depth

    scale.value = withTiming(targetScale, {
      duration: STACK_DURATION,
      easing: stackEasing,
    });

    translateY.value = withTiming(targetY, {
      duration: STACK_DURATION,
      easing: stackEasing,
    });
  };

  useEffect(() => {
    if (visible && !isExiting) {
      showSnackbar();
    } else if (!visible) {
      hideSnackbar();
    }

    return () => {
      clearAutoDismiss();
    };
  }, [visible]);

  // Smooth stack position updates
  useEffect(() => {
    updateStackPosition();
  }, [stackIndex, isStacked]);

  // Modern gesture handler for swipe up to dismiss
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      'worklet';
      const { translationY } = event;

      // Only allow upward swipes (negative translationY)
      if (translationY < 0) {
        gestureTranslateY.value = translationY;

        // Add subtle opacity fade during swipe
        const progress = Math.min(Math.abs(translationY) / 100, 1);
        opacity.value = 1 - progress * 0.3;
      }
    })
    .onEnd((event) => {
      'worklet';
      const { translationY, velocityY } = event;

      // Dismiss thresholds: swipe up at least 50px or fast upward velocity
      const shouldDismiss =
        (translationY < -50 && velocityY < -500) ||
        translationY < -80 ||
        velocityY < -1000;

      if (shouldDismiss) {
        // Trigger haptic feedback for gesture dismiss
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        runOnJS(handleDismiss)();
      } else {
        // Spring back to original position
        gestureTranslateY.value = withTiming(0, {
          duration: 200,
          easing: Easing.out(Easing.quad),
        });
        opacity.value = withTiming(1, {
          duration: 200,
          easing: Easing.out(Easing.quad),
        });
      }
    })
    .enabled(!isStacked || stackIndex === 0); // Only enable gesture for top snackbar

  // Don't render if should not render
  if (!shouldRender) {
    return null;
  }

  // Improved stacking with better spacing and z-index management
  const stackOffset = 8; // Reduced for subtler stacking effect
  const baseTop = insets.top;

  const containerStyle = isStacked
    ? [
        styles.stackedContainer,
        {
          top: baseTop + stackIndex * stackOffset,
          zIndex: 1000 - stackIndex,
        },
        animatedStyle,
      ]
    : [
        styles.container,
        {
          top: baseTop,
          zIndex: 1000,
        },
        animatedStyle,
      ];

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[containerStyle, { backgroundColor }]}
        pointerEvents={isStacked && stackIndex > 0 ? 'none' : 'auto'}
      >
        <View style={styles.content}>
          <View style={styles.progressContainer}>
            <CircularProgress
              progress={progressValue}
              size={24}
              strokeWidth={2}
              color={theme.colors.text.light}
            />
          </View>
          <Text
            variant="labelS"
            type="light"
            style={styles.message}
            numberOfLines={4}
          >
            {message}
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    ...theme.elevation.level3,
  },
  stackedContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    ...theme.elevation.level4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: theme.spacing.lg,
  },
  icon: {
    marginRight: theme.spacing.md,
  },
  message: {
    flex: 1,
    lineHeight: 20,
    marginRight: theme.spacing.md,
  },
  closeButton: {
    padding: theme.spacing.xs,
    marginRight: -theme.spacing.xs,
  },
  progressContainer: {
    position: 'relative',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
}));

export default Snackbar;
