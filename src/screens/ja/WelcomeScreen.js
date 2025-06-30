// src/screens/ja/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function WelcomeJA({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💖 フォー・ラバー 💖</Text>
      <Text style={styles.subtitle}>ふたりの魂とひとつの愛のために</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#00a86b' }]}
          onPress={() => navigation.replace('MainJA')}
        >
          <Text style={styles.buttonText}>スタート</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#aa336a', marginTop: 20 }]}
          onPress={() => navigation.replace('WelcomeEN')}
        >
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECC5C0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#aa336a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 40,
    width: '70%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
