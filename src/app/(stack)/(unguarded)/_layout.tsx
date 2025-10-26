import { JSX } from 'react';

import { Stack } from 'expo-router';

const SCREEN_NAMES = ['(auth)'];

export default function UnguardLayout(): JSX.Element {
  return (
    <Stack>
      {SCREEN_NAMES.map((screenName) => (
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
