import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomDrawer from './CustomDrawer';
import TabsEN from './Tabs'; 
import AccountScreenEN from '../drawer/AccountScreen';
import ProfileScreenEN from '../drawer/ProfileScreen';
import SettingsScreenEN from '../drawer/SettingsScreen';
import AboutScreenEN from '../drawer/AboutScreen';
import WelcomeScreenEN from '../../en/WelcomeScreen';

import { theme } from '../../../constants/theme';

const Drawer = createDrawerNavigator();

export default function DrawerWithTabsEN({ route }) {
  const { username } = route.params || {};
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={({ navigation, route }) => {
        const isTabs = route.name === 'Tabs';

        const navState = navigation.getState();
        const tabsRoute = navState.routes?.find(r => r.name === 'Tabs');
        const currentTabName = 
          tabsRoute?.state?.routeNames?.[tabsRoute.state.index] || 'Home';

        const headerLeft = () => {
          if (isTabs) {
            return (
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: theme.font.headerSize,
                  color: theme.colors.primary,
                  fontWeight: theme.font.headerWeight,
                }}
              >
                {currentTabName.replace('EN', '')}
              </Text>
            );
          } else {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 20,
                    color: 'black',
                    fontWeight: theme.font.headerWeight,
                  }}
                >
                  &lt; Home
                </Text>
              </TouchableOpacity>
            );
          }
        };

        const headerTitle = isTabs ? '' : route.name;

        return {
          drawerPosition: 'right',
          drawerStyle: {
            width: 220,
          },
          headerTintColor: theme.colors.primary,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: theme.font.headerSize,
            fontWeight: theme.font.headerWeight,
            color: theme.colors.primary,
          },
          headerLeft,
          headerTitle,
          headerRight: () => (
            <Ionicons
              name="menu"
              size={35}
              paddingTop ={5}
              color={theme.colors.primary}
              style={{ marginRight: 15 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        };
      }}
    >
      <Drawer.Screen
        name="Tabs"
        options={{
          title: '',
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="apps" size={size} color={color} />
          ),
        }}
      >
       {(props) => <TabsEN {...props} username={username} />}
      </Drawer.Screen>

      <Drawer.Screen
        name="Account"
        component={AccountScreenEN}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreenEN}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreenEN}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreenEN}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout/Login"
        component={WelcomeScreenEN}
      />

    </Drawer.Navigator>
  );
}
