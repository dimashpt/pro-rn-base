import { JSX } from 'react';

import { Stack } from 'expo-router';

const SCREEN_NAMES = ['(guarded)', '(unguarded)'];

export default function StackLayout(): JSX.Element {
  return (
    <Stack>
      {SCREEN_NAMES.map((screenName) => (
        <Stack.Screen
          key={screenName}
          name={screenName}
          options={{ headerShown: false }}
        />
      ))}
    </Stack>
  );
}
