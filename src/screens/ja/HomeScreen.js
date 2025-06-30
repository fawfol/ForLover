import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeJA() {
  const daysTogether = 9; // replace with real data later

  return (
    <View style={styles.container}>
      <Text style={styles.header}>今日</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>一緒にいた日数</Text>
        <Text style={styles.cardNumber}>{daysTogether} 日</Text>
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
