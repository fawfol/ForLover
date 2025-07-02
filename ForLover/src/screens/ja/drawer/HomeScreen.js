import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
// Tab Screens (JA)
// Tab Screens
import ChatJA from '../tabs/ChatScreen';
import CallJA from '../tabs/CallScreen';
import GalleryJA from '../tabs/GalleryScreen';
import OtherJA from '../tabs/OtherScreen';


export default function HomeJA() {
  const Tab = createBottomTabNavigator();
  const daysTogether = 9; // replace with real data later

  return (
    <View style={styles.container}>
      <Text style={styles.header}>イベント</Text>
      <View style={styles.card}>
      <Text style={styles.cardNumber}>{daysTogether} 日</Text>
        <Text style={styles.cardTitle}>一緒にいた日数</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
        ラブちゃんが本当に大好きです。もし彼女がこの世にいなかったら、私の世界はきっと暗くて灰色のままでしょう</Text>
      </View>
      {/* Additional cards can go here */}
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9E6EC' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#aa336a', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: { fontSize: 18, color: '#777' },
  cardNumber: { fontSize: 48, fontWeight: 'bold', color: '#aa336a' },
});
