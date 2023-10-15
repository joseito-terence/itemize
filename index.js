/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

function Main() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
