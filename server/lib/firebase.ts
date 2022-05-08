// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyBkJTyZjOkAAixxiPeGwhl2VRFdYKgbU",
  authDomain: "nuxt3-wuzzle.firebaseapp.com",
  projectId: "nuxt3-wuzzle",
  storageBucket: "nuxt3-wuzzle.appspot.com",
  messagingSenderId: "910623923226",
  appId: "1:910623923226:web:debf4803e2403dfc4805a3",
  measurementId: "G-608DQX026W",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const firestoreDb = getFirestore(firebaseApp);
