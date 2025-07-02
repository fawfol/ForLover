// src/screens/en/tabs/GalleryScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GalleryEN() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🖼️ Gallery Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: '600' },
});
