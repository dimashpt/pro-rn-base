import { JSX } from 'react';

import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native-unistyles';

import { Container, Text } from '@/components';
import { Button } from '@/components/button';
import { useAuthStore } from '@/store';

function LoginScreen(): JSX.Element {
  const router = useRouter();
  const { setStatus } = useAuthStore();

  function onLogin(): void {
    setStatus('loggedIn');
    router.replace('/(tabs)');
  }

  return (
    <Container style={styles.container}>
      <Text variant="displayS">Login</Text>
      <Button text="Login" onPress={onLogin} />
    </Container>
  );
}

export default LoginScreen;

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingTop: 0,
    backgroundColor: theme.colors.background.default,
  },
}));
