// src/firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx49QtNpem3X_IyHzj32FFwHxv-rcj8Hs",
  authDomain: "tp-base-de-datos-ed03a.firebaseapp.com",
  projectId: "tp-base-de-datos-ed03a",
  storageBucket: "tp-base-de-datos-ed03a.firebasestorage.app",
  messagingSenderId: "371729057693",
  appId: "1:371729057693:web:3387fb5b10b1d0044b5174",
  measurementId: "G-HK649RTX24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export { app };