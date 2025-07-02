// src/screens/en/tabs/CallScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Tab Screens (JA)
// Tab Screens
import ChatJA from '../tabs/ChatScreen';
import CallJA from '../tabs/CallScreen';
import GalleryJA from '../tabs/GalleryScreen';
import OtherJA from '../tabs/OtherScreen';


export default function CallEN() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📞 Call Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: '600' },
});
