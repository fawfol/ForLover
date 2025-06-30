import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeJA from './src/screens/ja/WelcomeScreen';
import WelcomeEN from './src/screens/en/WelcomeScreen';
import HomeJA from './src/screens/ja/HomeScreen';
import HomeEN from './src/screens/en/HomeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabsJA() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeJA" component={HomeJA} />
    </Tab.Navigator>
  );
}

function MainTabsEN() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeEN" component={HomeEN} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeJA" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeJA" component={WelcomeJA} />
        <Stack.Screen name="WelcomeEN" component={WelcomeEN} />
        <Stack.Screen name="MainJA" component={MainTabsJA} />
        <Stack.Screen name="MainEN" component={MainTabsEN} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
