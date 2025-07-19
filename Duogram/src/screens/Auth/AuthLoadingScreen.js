//Duogram/src/screens/Auth/AuthLoadingScreen.js
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { auth } from '../../firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    try {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().pairCode) {
          navigation.replace('Main');
        } else {
          navigation.replace('Pair');
        }
      } else {
        navigation.replace('Login');
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      navigation.replace('Login'); // fallback
    }
  });

  return unsubscribe;
}, []);


  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}
