// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG2Zr3kA8_d8CwGu-Ad5F-KgS3sL-wFO0",
  authDomain: "prepwise-112b8.firebaseapp.com",
  projectId: "prepwise-112b8",
  storageBucket: "prepwise-112b8.firebasestorage.app",
  messagingSenderId: "1069109000300",
  appId: "1:1069109000300:web:27d703bd36319581894049",
  measurementId: "G-2D6ZY4XPZF"
};

// Initialize Firebase
const app =!getApps.length? initializeApp(firebaseConfig):getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);