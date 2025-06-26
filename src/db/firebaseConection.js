import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDv43zm8FeLAXV0fbEXU_n0Wry6vCfXznQ",
    authDomain: "cotizaciones-contagramm.firebaseapp.com",
    projectId: "cotizaciones-contagramm",
    storageBucket: "cotizaciones-contagramm.firebasestorage.app",
    messagingSenderId: "379018820011",
    appId: "1:379018820011:web:bc3fa257a6a33a3453faee",
    measurementId: "G-0TBGVX16ZH"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };