import * as Notifications from 'expo-notifications';
import { createMMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { initializeAuthInterceptors } from '@/lib/axios';
import { LoginResponse } from '@/services/auth/types';
import { UserInfo } from '@/services/user/types';
import { generateEncryptionKey } from '@/utils/security';

// Create an MMKV instance
export const storage = createMMKV({
  id: 'auth-store',
  encryptionKey: generateEncryptionKey('auth_store_enc_key'),
});

type AuthStatus = 'firstLogin' | 'loggedIn' | 'loggedOut';

type TokenType = {
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  status: AuthStatus;
  token: TokenType | null;
  user: UserInfo | null;
  pushNotificationToken: string | null;
};

type AuthActions = {
  setUser: (user: UserInfo) => void;
  setToken: (credentials: LoginResponse) => void;
  setStatus: (status: AuthStatus) => void;
  logout: () => Promise<void>;
  setPushNotificationToken: (token: AuthState['pushNotificationToken']) => void;
};

const initialState: AuthState = {
  status: 'loggedOut',
  token: null,
  user: null,
  pushNotificationToken: null,
};

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUser: (user) => {
        set((state) => ({
          ...state,
          user,
        }));
      },
      setToken: (credentials) => {
        set((state) => ({
          ...state,
          token: {
            accessToken: credentials.access_token,
            refreshToken: credentials.refresh_token,
          },
        }));
      },
      setStatus: (status) => set({ status }),
      logout: async () => {
        Notifications.setBadgeCountAsync(0);

        if (get().pushNotificationToken) {
          Notifications.cancelAllScheduledNotificationsAsync();
          Notifications.unregisterForNotificationsAsync();
        }

        set(initialState);
      },
      setPushNotificationToken: (token: AuthState['pushNotificationToken']) => {
        set((state) => ({
          ...state,
          pushNotificationToken: token,
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (name: string) => {
          const value = storage.getString(name);
          return value ?? null;
        },
        setItem: (name: string, value: string) => {
          storage.set(name, value);
        },
        removeItem: (name: string) => {
          storage.remove(name);
        },
      })),
      version: 0,
      migrate: (persistedState) => persistedState || initialState,
    },
  ),
);

// Initialize auth interceptors after store creation
async function refreshTokenFn(): Promise<LoginResponse> {
  const { token } = useAuthStore.getState();
  if (!token?.refreshToken) {
    throw new Error('No refresh token available');
  }

  // Import auth service directly to avoid cycles
  const { refreshToken: refreshTokenService } = await import('@/services/auth');
  const refreshedData = await refreshTokenService();

  // Update tokens in the auth store
  useAuthStore.getState().setToken(refreshedData);

  return refreshedData;
}

initializeAuthInterceptors(() => {
  const { token, logout } = useAuthStore.getState();
  return { token, logout };
}, refreshTokenFn);
