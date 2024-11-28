// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Para acceder a Firestore
import { getAnalytics } from "firebase/analytics"; // Si necesitas Analytics

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAx49QtNpem3X_IyHzj32FFwHxv-rcj8Hs",
  authDomain: "tp-base-de-datos-ed03a.firebaseapp.com",
  projectId: "tp-base-de-datos-ed03a",
  storageBucket: "tp-base-de-datos-ed03a.firebasestorage.app",
  messagingSenderId: "371729057693",
  appId: "1:371729057693:web:3387fb5b10b1d0044b5174",
  measurementId: "G-HK649RTX24"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);

// Inicialización de Firestore y Analytics
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };