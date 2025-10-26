import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import * as Fonts from '@expo-google-fonts/plus-jakarta-sans';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Animated from 'react-native-reanimated';

import { NetworkStatusBar } from '@/components';

import '@/locales'; // Import i18n configuration

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useNetworkActivityDevTools } from '@rozenite/network-activity-plugin';
import { usePerformanceMonitorDevTools } from '@rozenite/performance-monitor-plugin';
import { useTanStackQueryDevTools } from '@rozenite/tanstack-query-plugin';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';

import { SnackbarProvider } from '@/components';
import { SplashComponent } from '@/components/splash';
import { initExceptionHandler } from '@/lib/exception-handler';
import { queryClient } from '@/lib/react-query';
import i18n from '@/locales';
import { useAppStore } from '@/store';

// Initialize Exception Handler
initExceptionHandler();

// Prevent auto hide splash screen
SplashScreen.preventAutoHideAsync();

const { useFonts, __metadata__, ...fonts } = Fonts;

export default function RootLayout(): React.ReactNode {
  const { theme: userTheme, language } = useAppStore();
  const { theme } = useUnistyles();
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts(fonts);

  const [splashFinished, setSplashFinished] = useState(false);
  const [showMainApp, setShowMainApp] = useState(false);

  useNetworkActivityDevTools();
  usePerformanceMonitorDevTools();
  useTanStackQueryDevTools(queryClient);

  useEffect(() => {
    i18n.changeLanguage(language);
    dayjs.locale(language);
    dayjs.extend(require('dayjs/plugin/customParseFormat'));

    setTimeout(() => {
      handleSplashAnimationFinish();
    }, 3_000);
  }, []);

  // Wire UnistylesRuntime to darkMode
  useEffect(() => {
    if (userTheme === 'system') {
      UnistylesRuntime.setAdaptiveThemes(true);
    } else {
      UnistylesRuntime.setAdaptiveThemes(false);
      UnistylesRuntime.setTheme(userTheme);
    }

    UnistylesRuntime.setRootViewBackgroundColor(
      theme.colors.background.default,
    );
  }, [userTheme, colorScheme, theme]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Handle splash screen animation finish with fade transition
  const handleSplashAnimationFinish = (): void => {
    setSplashFinished(true);
    setShowMainApp(true);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <BottomSheetModalProvider>
            <StatusBar style={userTheme === 'dark' ? 'light' : 'dark'} />
            <SnackbarProvider>
              {/* Splash Screen */}
              <Animated.View
                style={styles.splashScreenContainer(splashFinished)}
                pointerEvents={splashFinished ? 'none' : 'auto'}
              >
                <SplashComponent />
              </Animated.View>

              {/* Main App */}
              {showMainApp && (
                <Animated.View style={styles.mainAppContainer(splashFinished)}>
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(stack)"
                      options={{ headerShown: false }}
                    />
                  </Stack>
                  <NetworkStatusBar />
                </Animated.View>
              )}
            </SnackbarProvider>
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splashScreenContainer: (splashFinished: boolean) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    transitionProperty: 'opacity',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-out',
    opacity: splashFinished ? 0 : 1,
  }),
  mainAppContainer: (splashFinished: boolean) => ({
    flex: 1,
    transitionProperty: 'opacity',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in',
    opacity: splashFinished ? 1 : 0,
  }),
});
