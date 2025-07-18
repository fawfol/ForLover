//Duogram/src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Tabs/HomeScreen';
import ChatScreen from '../screens/Tabs/ChatScreen';
import PhotosScreen from '../screens/Tabs/PhotosScreen';
import VideoCallScreen from '../screens/Tabs/VideoCallScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      // screenOptions={{ ...tabBarOptions }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Photos" component={PhotosScreen} />
      <Tab.Screen name="VideoCall" component={VideoCallScreen} options={{ title: "Video Call" }}/>
    </Tab.Navigator>
  );
}
