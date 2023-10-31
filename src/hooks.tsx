import React from 'react';
import Animated, { AnimateProps } from 'react-native-reanimated';

export function withAnimated<T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.ComponentClass<AnimateProps<T>, any> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithAnimated extends React.Component<T, any> {
    static displayName = `WithAnimated(${displayName})`;

    render(): React.ReactNode {
      return <WrappedComponent {...this.props} />;
    }
  }
  return Animated.createAnimatedComponent(WithAnimated);
}

export function useDisclose() {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, open, close, toggle };
}
