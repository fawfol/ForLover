// src/screens/en/navigation/Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreenJA from '../drawer/HomeScreen'; 
import ChatJA from '../tabs/ChatScreen';
import CallJA from '../tabs/CallScreen';
import GalleryJA from '../tabs/GalleryScreen';
import OtherJA from '../tabs/OtherScreen';

const Tab = createBottomTabNavigator();

export default function TabsJA({ username }) {
  return (
  <Tab.Navigator
    initialRouteName="ホーム"
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
          case 'ホーム':
            iconName = 'home';
            break;
          case 'ChatJA':
            iconName = 'chatbubble-ellipses';
            break;
          case 'CallJA':
            iconName = 'call';
            break;
          case 'GalleryJA':
            iconName = 'images';
            break;
          case 'OtherJA':
            iconName = 'ellipsis-horizontal';
            break;
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    >
    <Tab.Screen name="ホーム" component={HomeScreenJA}/>
    <Tab.Screen name="ChatJA" options={{ title: 'チャット' }}>
      {(props) => <ChatJA {...props} username={username} />}
    </Tab.Screen>
    <Tab.Screen
      name="CallJA"
      component={CallJA}
      options={{ title: '通話' }}
    />
    <Tab.Screen
      name="GalleryJA"
      component={GalleryJA}
      options={{ title: 'ギャラリー' }}
    />
    <Tab.Screen
      name="OtherJA"
      component={OtherJA}
      options={{ title: 'その他' }}
    />

    </Tab.Navigator>
  );
}
