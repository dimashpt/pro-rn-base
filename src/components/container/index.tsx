import React, { ComponentProps, forwardRef, ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';

interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface KeyboardAwareScrollViewProps
  extends ComponentProps<typeof KeyboardAwareScrollView> {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const ContainerComponent = ({
  children,
  style,
}: ContainerProps): React.ReactElement => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const ContainerScroll = forwardRef<ScrollView, KeyboardAwareScrollViewProps>(
  ({ children, contentContainerStyle, ...props }, ref) => {
    return (
      <KeyboardAwareScrollView
        ref={ref}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        {...props}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  },
);

// Compound component
export const Container = Object.assign(ContainerComponent, {
  Scroll: ContainerScroll,
});

const styles = StyleSheet.create(({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background.elevated,
  },
  contentContainer: {
    flexGrow: 1,
  },
}));
