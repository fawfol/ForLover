//Duogram/src/screens/Auth/PairScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../../firebase';

const db = getFirestore();

function generatePairCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

export default function PairScreen({ navigation }) {
  const [pairCode, setPairCode] = useState('');
  const [myCode, setMyCode] = useState('');

  //generate and store a new code
  async function handleGenerateCode() {
    const code = generatePairCode();
    const user = auth.currentUser;
    try {
      await setDoc(doc(db, 'pairs', code), { user1: user.uid, user2: '' });
      //optional code in  user profile
      await setDoc(doc(db, 'users', user.uid), { pairCode: code }, { merge: true });
      setMyCode(code);
      Alert.alert('Share this code with your partner!', code);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  }

  //join partner with code
  async function handleJoin() {
  const user = auth.currentUser;
  if (!pairCode.trim()) {
    Alert.alert('Error', 'Please enter a code');
    return;
  }
  try {
    const codeDoc = doc(db, 'pairs', pairCode.trim().toUpperCase());
    const snap = await getDoc(codeDoc);
    if (!snap.exists()) {
      Alert.alert('Invalid Code', 'No such code found.');
      return;
    }
    const { user1, user2 } = snap.data();

    // ADD THIS CHECK!
    if (user1 === user.uid) {
      Alert.alert('Cannot Pair', 'You cannot pair with your own code.');
      return;
    }

    if (user2) {
      Alert.alert('Code In Use', 'This code already has two users.');
      return;
    }
    await updateDoc(codeDoc, { user2: user.uid });
    await setDoc(doc(db, 'users', user.uid), { pairCode: pairCode.trim().toUpperCase() }, { merge: true });
    Alert.alert('Paired!', 'You are now connected.');
    navigation.replace('Main');
  } catch (err) {
    Alert.alert('Error', err.message);
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect Your Duogram</Text>
      <TouchableOpacity style={styles.button} onPress={handleGenerateCode}>
        <Text style={styles.buttonText}>Generate My Pairing Code</Text>
      </TouchableOpacity>
      {myCode ? (
        <Text style={styles.myCodeText}>Your Code: {myCode}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Enter partner's code"
        value={pairCode}
        autoCapitalize="characters"
        onChangeText={setPairCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleJoin}>
        <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, marginBottom: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  myCodeText: { fontSize: 22, color: '#007AFF', fontWeight: 'bold', textAlign: 'center', marginVertical: 8 },
  input: { borderWidth: 1, borderColor: '#aaa', borderRadius: 8, padding: 12, marginBottom: 16 }
});
