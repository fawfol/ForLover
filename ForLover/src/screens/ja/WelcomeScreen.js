import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

export default function WelcomeJA({ navigation }) {
  const [username, setUsername] = useState('');

  const handleStart = () => {
    // Validate username length
    if (username.trim().length < 4) {
      Alert.alert('エラー', 'お名前は3文字以上で入力してください。'); // Error: Please enter your name with at least 4 characters.
      return;
    }
    if (username.trim().length > 20) {
      Alert.alert('エラー', 'お名前は15文字以内で入力してください。'); // Error: Please enter your name within 20 characters.
      return;
    }

    if (!username.trim()) {
      Alert.alert('エラー', 'お名前を入力してください。'); // Error: Please enter your name.
      return;
    }

    navigation.replace('MainJA', { username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💖 フォー・ラバー 💖</Text>
      <Text style={styles.subtitle}>ふたりの魂とひとつの愛のために</Text>

      {/* Username Input */}
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="お名前を入力してください"
        textAlign="center"
        placeholderTextColor="#999"
        style={styles.input}
        maxLength={20}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#00a86b' }]}
          onPress={handleStart}
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
    fontSize: 33,
    fontWeight: 'bold',
    color: '#aa336a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '70%', // Matches button width
    paddingVertical: 10,
    fontSize: 18,
    color: '#333',
    backgroundColor: 'white', // White background
    borderBottomWidth: 2,
    borderBottomColor: '#FF69B4',
    marginBottom: 20,
    borderRadius: 5, // A slight rounding for the input field
    paddingHorizontal: 10, // Add some horizontal padding for text
  },
  buttonContainer: {
    marginTop: 40,
    width: '70%', // Buttons' container width
    alignItems: 'center',
  },
  button: {
    width: '100%', // Buttons take full width of their container
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
