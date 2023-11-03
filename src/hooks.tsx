import React, { useEffect, useState } from 'react';
import Animated, { AnimateProps } from 'react-native-reanimated';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

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

export function useAuthUser() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    function onAuthStateChanged(_user: any) {
      setUser(_user);
    }
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return user;
}
