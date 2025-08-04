import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyDQCXyC61pj_BpTuHDVCwBFVQiUOYxGGv8",
    authDomain: "hw-15-804f0.firebaseapp.com",
    projectId: "hw-15-804f0",
    storageBucket: "hw-15-804f0.firebasestorage.app",
    messagingSenderId: "3709709812",
    appId: "1:3709709812:web:75c2384da16c3a79eedda1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
