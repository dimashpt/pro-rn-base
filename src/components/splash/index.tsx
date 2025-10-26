import React, { JSX } from 'react';

import { StyleSheet } from 'react-native-unistyles';

import { Container, Text } from '@/components';

export function SplashComponent(): JSX.Element {
  return (
    <Container style={styles.container}>
      <Text>Splash Screen</Text>
    </Container>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
