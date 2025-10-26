import React, { JSX } from 'react';

import { StyleSheet } from 'react-native-unistyles';

import { Container, Text } from '@/components';

export default function StackExampleScreen(): JSX.Element {
  return (
    <Container style={styles.container}>
      <Text>Stack Example</Text>
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
