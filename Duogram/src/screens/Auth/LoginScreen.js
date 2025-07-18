//Duogram/src/screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Enter email and password');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace('Pair');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        Alert.alert('Login Failed', "User does not exist. Please sign up first.");
      } else if (err.code === 'auth/wrong-password') {
        Alert.alert('Login Failed', 'Incorrect password.');
      } else {
        Alert.alert('Login Error', err.message);
      }
    }
  };

  // Handle signup
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Enter email and password to sign up.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace('Pair');
      Alert.alert('Sign Up Success', 'Account created and logged in!');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        Alert.alert('Sign Up Error', 'That email is already in use.');
      } else if (err.code === 'auth/invalid-email') {
        Alert.alert('Sign Up Error', 'That email address is invalid.');
      } else if (err.code === 'auth/weak-password') {
        Alert.alert('Sign Up Error', 'Password should be at least 6 characters.');
      } else {
        Alert.alert('Sign Up Error', err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Duogram</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 36, fontWeight: 'bold', alignSelf: 'center', marginBottom: 40 },
  input: { borderWidth: 1, borderColor: '#aaa', borderRadius: 8, padding: 12, marginBottom: 16 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', flex: 1, marginHorizontal: 4 },
  signupButton: { backgroundColor: '#34C759' },
  buttonText: { color: '#fff', fontSize: 16 },
});
