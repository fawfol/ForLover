//Duogram/src/firebase/index.js
import { initializeApp } from "firebase/app";
import { 
  getReactNativePersistence, 
  initializeAuth 
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your existing config
const firebaseConfig = {
  apiKey: "AIzaSyDnm_yTE9KiOpH4xBvMMuO5ZpUP1kfL5W0",
  authDomain: "forlover-d052e.firebaseapp.com",
  databaseURL: "https://forlover-d052e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "forlover-d052e",
  storageBucket: "forlover-d052e.appspot.com",
  messagingSenderId: "531415723520",
  appId: "1:531415723520:web:ecad234633f25bd4b8f2e5"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
