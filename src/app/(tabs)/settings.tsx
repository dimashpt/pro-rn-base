import React, { JSX } from 'react';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { Button, Container, Text } from '@/components';
import { useAppStore, useAuthStore } from '@/store';

export default function HomeScreen(): JSX.Element {
  const { t } = useTranslation();
  const { language, setLanguage, theme, setTheme } = useAppStore();
  const { logout } = useAuthStore();

  function toggleLanguage(): void {
    setLanguage(language === 'en' ? 'id' : 'en');
  }

  function toggleTheme(): void {
    if (theme === 'system') return setTheme('light');

    if (theme === 'light') return setTheme('dark');

    setTheme('system');
  }

  return (
    <Container style={styles.container}>
      <Text>{t('tab.settings')}</Text>
      <Button
        text={`Change language to ${language === 'en' ? 'Indonesian' : 'English'}`}
        onPress={toggleLanguage}
      />
      <Button
        variant="outlined"
        text={`Change theme to ${theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'follow system'}`}
        onPress={toggleTheme}
      />
      <Button text="Logout" variant="ghost" color="danger" onPress={logout} />
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background.default,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
}));
