import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

export function generateEncryptionKey(storeKey: string): string {
  let key = SecureStore.getItem(storeKey);

  if (!key) {
    // hasilkan kunci acak dengan panjang 32 byte (AES-256)
    key = Array.from(Crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    SecureStore.setItem(storeKey, key);
  }

  return key;
}
