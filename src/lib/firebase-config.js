import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqxuDJHmVvHw0BAMaymCvN2AkNpJ39aQw",
  authDomain: "reddit-clone-65881.firebaseapp.com",
  projectId: "reddit-clone-65881",
  storageBucket: "reddit-clone-65881.appspot.com",
  messagingSenderId: "490768746550",
  appId: "1:490768746550:web:27e8d6d1c978daa943b097"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;