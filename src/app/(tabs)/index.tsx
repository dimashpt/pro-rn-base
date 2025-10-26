import React, { JSX } from 'react';

import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native-unistyles';

import { Button, Container, Text } from '@/components';

export default function HomeScreen(): JSX.Element {
  const navigation = useRouter();

  function onPress(): void {
    navigation.navigate('/stack-example');
  }

  return (
    <Container style={styles.container}>
      <Text>Home</Text>
      <Button text="To Example Stack Screen" onPress={onPress} />
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
