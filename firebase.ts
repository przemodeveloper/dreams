import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "dreams-a672f.firebaseapp.com",
  projectId: "dreams-a672f",
  storageBucket: "dreams-a672f.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const STORAGE_BUCKET_URL = "gs://dreams-a672f.firebasestorage.app";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app, STORAGE_BUCKET_URL);

export { db, storage };

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
