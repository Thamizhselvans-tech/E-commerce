import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvONskDB7EyQWuVJQfUthkrsUqkpEkswo",
  authDomain: "commerce-5f6f1.firebaseapp.com",
  projectId: "commerce-5f6f1",
  storageBucket: "commerce-5f6f1.firebasestorage.app",
  messagingSenderId: "317218575730",
  appId: "1:317218575730:web:de3f8a8476ade3c2c2b9eb",
  measurementId: "G-X0W97SD8LF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
export default app;
