// Substitua os valores pelas credenciais do seu projeto Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYqzhdEYSIRcmk-GVgGo74HfmHJEvcoto",
  authDomain: "logger-grito-c0517.firebaseapp.com",
  projectId: "logger-grito-c0517",
  storageBucket: "logger-grito-c0517.firebasestorage.app",
  messagingSenderId: "331414921933",
  appId: "1:331414921933:web:03797a55004c668ab77f84"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
