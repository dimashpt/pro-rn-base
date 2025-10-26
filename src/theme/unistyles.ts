import { StyleSheet } from 'react-native-unistyles';

import { useAppStore } from '@/store/app-store';
import { appThemes } from './themes';
import { breakpoints } from './tokens/breakpoints';

const settings = {
  initialTheme: () => {
    return useAppStore.getState().theme === 'dark' ? 'dark' : 'light';
  },
};

StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings,
});
