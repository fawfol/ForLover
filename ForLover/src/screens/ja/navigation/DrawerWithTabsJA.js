import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomDrawer from './CustomDrawer';
import TabsJA from './Tabs'; 
import AccountScreenJA from '../drawer/AccountScreen';
import ProfileScreenJA from '../drawer/ProfileScreen';
import SettingsScreenJA from '../drawer/SettingsScreen';
import AboutScreenJA from '../drawer/AboutScreen';
import WelcomeScreenJA from '../../ja/WelcomeScreen';

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
          tabsRoute?.state?.routes?.[tabsRoute.state.index]?.name || 'ホーム';

          let displayName = currentTabName;
          if (displayName === 'ChatJA') displayName = 'チャット';
          else if (displayName === 'CallJA') displayName = '通話';
          else if (displayName === 'GalleryJA') displayName = 'ギャラリー';
          else if (displayName === 'OtherJA') displayName = 'その他';

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
                {displayName.replace('JA', '')}
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
                  &lt;ホーム
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
            fontSize:25,
            fontWeight: theme.font.headerWeight,
            color: theme.colors.primary,
          },
          headerLeft,
          headerTitle,
          headerRight: () => (
            <Ionicons
              name="menu"
              size={24}
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
        component={TabsJA}
        options={{
          title: '',
          drawerItemStyle: { display: 'none' },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="apps" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="アカウント"
        component={AccountScreenJA}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="プロフィール"
        component={ProfileScreenJA}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="設定"
        component={SettingsScreenJA}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="概要"
        component={AboutScreenJA}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout/Login"
        component={WelcomeScreenJA}
      />

    </Drawer.Navigator>
  );
}
