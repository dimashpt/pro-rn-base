import { Dimensions, PixelRatio, Platform } from 'react-native';

/**
 * Scales a given size to the device's screen density.
 * @param size - The size to scale.
 * @returns The scaled size.
 * @example
 * normalize(10) // 30 (on a device with a screen density of 3)
 */
export function normalize(size: number): number {
  const { width } = Dimensions.get('window');
  const scale = width / 320;

  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
