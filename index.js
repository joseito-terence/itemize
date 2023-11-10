/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import {
  PaperProvider,
  adaptNavigationTheme,
  MD3LightTheme,
  MD3DarkTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { useAppSelector } from './src/redux/hooks';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

function Main() {
  return (
    <Provider store={store}>
      <Providers>
        <App />
      </Providers>
    </Provider>
  );
}

const Providers = ({ children }) => {
  const isDark = useAppSelector(state => state.theme.isDark);
  let theme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>{children}</NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

AppRegistry.registerComponent(appName, () => Main);
