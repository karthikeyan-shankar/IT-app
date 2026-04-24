import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_Eeoyrx-tDh2j0QR4zYES7ATuJA0vuDg",
  authDomain: "institrack-51477.firebaseapp.com",
  projectId: "institrack-51477",
  storageBucket: "institrack-51477.firebasestorage.app",
  messagingSenderId: "729188980243",
  appId: "1:729188980243:web:b66d4631fcb335767851e6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
