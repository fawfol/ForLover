// src/screens/en/navigation/Tabs.js

import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreenEN from '../drawer/HomeScreen';
import ChatEN from '../tabs/ChatScreen';
import CallEN from '../tabs/CallScreen';
import GalleryEN from '../tabs/GalleryScreen';
import OtherEN from '../tabs/OtherScreen';

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

export default function TabsEN({ username }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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

          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreenEN} />
      <Tab.Screen name="ChatEN">
        {(props) => <ChatEN {...props} username={username} />}
      </Tab.Screen>
      <Tab.Screen name="CallEN" component={CallEN} />
      <Tab.Screen name="GalleryEN" component={GalleryEN} />
      <Tab.Screen name="OtherEN" component={OtherEN} />
    </Tab.Navigator>
  );
}
// src/screens/en/navigation/Tabs.js

import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreenEN from '../drawer/HomeScreen';
import ChatEN from '../tabs/ChatScreen';
import CallEN from '../tabs/CallScreen';
import GalleryEN from '../tabs/GalleryScreen';
import OtherEN from '../tabs/OtherScreen';

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

export default function TabsEN({ username }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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

          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreenEN} />
      <Tab.Screen name="ChatEN">
        {(props) => <ChatEN {...props} username={username} />}
      </Tab.Screen>
      <Tab.Screen name="CallEN" component={CallEN} />
      <Tab.Screen name="GalleryEN" component={GalleryEN} />
      <Tab.Screen name="OtherEN" component={OtherEN} />
    </Tab.Navigator>
  );
}
