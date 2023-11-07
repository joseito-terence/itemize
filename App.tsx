/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { BottomTabsParamList, RootStackParamList } from './types';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import AddItem from './src/screens/AddItem';
import Item from './src/screens/Item';
import Camera from './src/screens/Camera';
import CreateItem from './src/screens/CreateItem';
import ColorSchemeProvider from './src/components/ColorScheme';
import { useAuthUser } from './src/hooks';
import CreateStorage from './src/screens/CreateStorage';
import Storages from './src/screens/Storages';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator<BottomTabsParamList>();

function App(): JSX.Element {
  const user = useAuthUser();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#fff',
  };

  return (
    <View style={backgroundStyle} className="flex-1">
      <ColorSchemeProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
            </>
          ) : (
            <>
              <Stack.Screen name="BottomTabs" component={BottomTabs} />
              <Stack.Screen name="Item" component={Item} />
              <Stack.Screen name="Camera" component={Camera} />
              <Stack.Screen name="CreateItem" component={CreateItem} />
              <Stack.Screen name="CreateStorage" component={CreateStorage} />
            </>
          )}
        </Stack.Navigator>
      </ColorSchemeProvider>
    </View>
  );
}

export default App;

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: 'home' }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ tabBarIcon: 'magnify' }}
      />
      <Tab.Screen
        name="AddItem"
        component={AddItem}
        options={{ tabBarIcon: 'camera-plus-outline', title: 'Add Item' }}
      />
      <Tab.Screen
        name="Storages"
        component={Storages}
        options={{ tabBarIcon: 'package-variant' }}
      />
    </Tab.Navigator>
  );
};
