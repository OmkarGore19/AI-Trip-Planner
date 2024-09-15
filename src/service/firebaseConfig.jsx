// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tourificai-ai-trip-planner.firebaseapp.com",
  projectId: "tourificai-ai-trip-planner",
  storageBucket: "tourificai-ai-trip-planner.appspot.com",
  messagingSenderId: "13111820832",
  appId: "1:13111820832:web:9db663db8d696e62b5f245",
  measurementId: "G-DP16BDXHJG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
