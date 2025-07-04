// src/screens/en/navigation/Tabs.js

import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreenJA from '../drawer/HomeScreen';
import ChatJA from '../tabs/ChatScreen';
import CallJA from '../tabs/CallScreen';
import GalleryJA from '../tabs/GalleryScreen';
import OtherJA from '../tabs/OtherScreen';

const Tab = createBottomTabNavigator();

// Custom Tab Bar with version label
function CustomTabBar(props) {
  return (
    <View style={{ position: 'relative' }}>
      {/* Version Text in Bottom-Left Corner */}
      <Text style={{
        position: 'absolute',
        bottom: 5,
        paddingLeft : 20,
        left: 12,
        fontSize: 10,
        color: '#888',
        zIndex: 1,
      }}>
        version : 1.0
      </Text>
      
      <Text style={{
        position: 'absolute',
        bottom: 5,
        paddingRight : 20,
        right: 12,
        fontSize: 10,
        color: '#888',
        zIndex: 1,
      }}>
        Updated : 2025-07-04
      </Text>

      {/* Render Default Tab Bar */}
      <BottomTabBar {...props} />
    </View>
  );
}

export default function TabsJA({ username }) {
  return (
    <Tab.Navigator
      initialRouteName="ホーム"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#aa336a',
        tabBarStyle: {
          height: 60,
          paddingTop: 0,
        },
        tabBarIcon: ({ color }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
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

          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreenJA} />
      <Tab.Screen name="ChatJA">
        {(props) => <ChatJA {...props} username={username} />}
      </Tab.Screen>
      <Tab.Screen name="CallJA" component={CallJA} />
      <Tab.Screen name="GalleryJA" component={GalleryJA} />
      <Tab.Screen name="OtherJA" component={OtherJA} />
    </Tab.Navigator>
  );
}
