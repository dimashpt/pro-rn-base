import React, { JSX } from 'react';

import { Redirect, Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';

import { Icons } from '@/assets/icons';
import { TabBar } from '@/components';
import { useAuthStore } from '@/store';

export default function TabLayout(): JSX.Element {
  const { status } = useAuthStore();
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  if (status !== 'loggedIn') {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab.home'),
          tabBarIcon: ({ color }) => (
            <Icons.appearance
              color={color}
              width={theme.typography.fontSize.sm}
              height={theme.typography.fontSize.sm}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tab.settings'),
          tabBarIcon: ({ color }) => (
            <Icons.appearance
              color={color}
              width={theme.typography.fontSize.sm}
              height={theme.typography.fontSize.sm}
            />
          ),
        }}
      />
    </Tabs>
  );
}
