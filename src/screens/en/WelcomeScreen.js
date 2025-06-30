// src/screens/en/WelcomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WelcomeScreenEN({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💖 ForLover 💖</Text>
      <Text style={styles.subtitle}>Built For Two Souls And One Love.</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Start"
          onPress={() => navigation.replace('MainEN')}
          color="#00a86b"
        />
        <View style={{ marginTop: 20 }}>
          <Button
            title="日本語"
            onPress={() => navigation.replace('WelcomeJA')}
            color="#aa336a"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#aa336a', marginBottom: 10 },
  subtitle: { fontSize: 16, fontStyle: 'italic', textAlign: 'center', marginBottom: 30 },
});
