import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import i18n from '@/locales';

// Load all supported languages
require('dayjs/locale/en');
require('dayjs/locale/id');

export type ColorScheme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'id';

type AppState = {
  language: Language;
  theme: ColorScheme;
};

type AppActions = {
  setLanguage: (language: Language) => void;
  setTheme: (theme: ColorScheme) => void;
};

type AppStore = AppState & AppActions;

const initialState: AppState = {
  language: 'en',
  theme: 'system',
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,
      setLanguage: (language: Language): void => {
        i18n.changeLanguage(language);
        dayjs.locale(language);
        set({ language: language });
      },
      setTheme: (theme: ColorScheme): void => {
        set({ theme });
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 0,
      migrate: (persistedState) => persistedState || initialState,
    },
  ),
);
