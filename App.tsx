/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { BottomTabsParamList, RootStackParamList } from './types';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
import Search from './src/screens/Search';
import AddItem from './src/screens/AddItem';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator<BottomTabsParamList>();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#fff',
  };
  return (
    <View style={backgroundStyle} className="flex-1">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      </Stack.Navigator>
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
        name="Settings"
        component={Settings}
        options={{ tabBarIcon: 'cog-outline' }}
      />
    </Tab.Navigator>
  );
};
