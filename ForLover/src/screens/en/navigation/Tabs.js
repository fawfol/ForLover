// src/screens/en/navigation/Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreenEN from '../drawer/HomeScreen'; 
import ChatEN from '../tabs/ChatScreen';
import CallEN from '../tabs/CallScreen';
import GalleryEN from '../tabs/GalleryScreen';
import OtherEN from '../tabs/OtherScreen';

const Tab = createBottomTabNavigator();

export default function TabsEN({ username }) {
  return (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel : false,
      tabBarActiveTintColor: '#aa336a',
      tabBarStyle: {
        height: 60,
        paddingTop: 5,
      },
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'ChatEN':
            iconName = 'chatbubble-ellipses';
            break;
          case 'CallEN':
            iconName = 'call';
            break;
          case 'GalleryEN':
            iconName = 'images';
            break;
          case 'OtherEN':
            iconName = 'ellipsis-horizontal';
            break;
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    >
    <Tab.Screen name="Home" component={HomeScreenEN}/>
    <Tab.Screen name="ChatEN">
      {(props) => <ChatEN {...props} username={username} />}
    </Tab.Screen>
    <Tab.Screen name="CallEN" component={CallEN} />
    <Tab.Screen name="GalleryEN" component={GalleryEN} />
    <Tab.Screen name="OtherEN" component={OtherEN}/>
  </Tab.Navigator>
  );
}
