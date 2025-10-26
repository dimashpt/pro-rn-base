import { JSX, useEffect } from 'react';

import { Stack, useRouter } from 'expo-router';

import { useAuthStore } from '@/store';

const SCREENS = ['stack-example'];

export default function GuardLayout(): JSX.Element {
  const { status } = useAuthStore();
  const { replace } = useRouter();

  useEffect(() => {
    if (status !== 'loggedIn') {
      replace('/login');
    }
  }, [status]);

  return (
    <Stack>
      {SCREENS.map((screenName) => (
        <Stack.Screen
          key={screenName}
          name={screenName}
          options={{
            headerShown: false,
          }}
        />
      ))}
    </Stack>
  );
}
