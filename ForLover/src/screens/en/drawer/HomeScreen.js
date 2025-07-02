import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// Tab Screens (JA)
// Tab Screens
import ChatEN from '../tabs/ChatScreen';
import CallEN from '../tabs/CallScreen';
import GalleryEN from '../tabs/GalleryScreen';
import OtherEN from '../tabs/OtherScreen';


export default function HomeEN() {
  const Tab = createBottomTabNavigator();
  const daysTogether = 9; // replace with real data later

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Events</Text>
      <View style={styles.card}>

      <Text style={styles.cardNumber}>{daysTogether} </Text>
      <Text style={styles.cardTitle}>Days Together</Text>
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
  container: { flex: 1, padding: 20, backgroundColor: '#ECC5C0' },
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
