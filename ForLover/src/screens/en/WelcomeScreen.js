// src/screens/en/WelcomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth'; 

export default function WelcomeEN({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email.trim(), password);
      const username = userCredential.user.displayName || userCredential.user.email;
      navigation.replace('MainEN', { username });
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Login Failed', 'No user found for this email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Login Failed', 'Incorrect password.');
      } else {
        Alert.alert('Login Failed', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'DUOGRAM'}</Text>
      <Text style={styles.subtitle}>{'Share Moments Together'}</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        textAlign="center"
        placeholderTextColor="#999"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        textAlign="center"
        placeholderTextColor="#999"
        style={styles.input}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#00a86b' }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#aa336a', marginTop: 20 }]}
          onPress={() => navigation.replace('WelcomeJA')}
        >
          <Text style={styles.buttonText}>{'日本語'}</Text>
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
    fontSize: 37,
    fontWeight: 'bold',
    color: '#aa336a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 29,
    width: 400,
    textAlign: 'center',
    marginBottom: 30,
    color: '#6666E0',
    fontWeight: '800',
  },
  input: {
    width: '70%',
    paddingVertical: 10,
    fontSize: 18,
    color: '#333',
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#FF69B4',
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
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
