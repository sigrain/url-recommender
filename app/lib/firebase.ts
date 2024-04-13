import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
    getAuth,
    Auth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBcjZBb4cQtq8IeCYPhoQHAzwA1WBQPSyI",
  authDomain: "url-recommender.firebaseapp.com",
  projectId: "url-recommender",
  storageBucket: "url-recommender.appspot.com",
  messagingSenderId: "564275718901",
  appId: "1:564275718901:web:96725935a85ece30f5b3bc"
};

const app = initializeApp(firebaseConfig);

let firebaseApp: FirebaseApp;
let auth: Auth;
let user: User | null = null;

if (typeof window !== "undefined" && !getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    auth = getAuth();
    onAuthStateChanged(auth, (userData) => {
        user = userData;
    })
}

export const signup = async(email: string, password: string) => {
    try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password);
    } catch(error) {
        return error;
    }
}

export const signin = async(email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
        return error;
    }
}