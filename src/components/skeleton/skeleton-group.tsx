import React from 'react';
import { View, ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native-unistyles';

import { Skeleton, SkeletonProps } from './skeleton';

export interface SkeletonGroupProps {
  items: SkeletonProps[];
  spacing?: number;
  style?: ViewStyle;
}

export function SkeletonGroup({
  items,
  spacing = 8,
  style,
}: SkeletonGroupProps): React.ReactElement {
  return (
    <View style={style}>
      {items.map((item, index) => (
        <View key={index}>
          <Skeleton {...item} />
          {index < items.length - 1 && (
            <View style={[styles.spacer, { height: spacing }]} />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  spacer: {
    // Empty style object for consistency
  },
}));

export default SkeletonGroup;
