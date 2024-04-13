import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, addDoc, getDocs, collection } from "firebase/firestore";
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
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
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
        let userCredentials = await signInWithEmailAndPassword(auth, email, password);
        user = userCredentials.user;
    } catch(error) {
        return error;
    }
}

export const signout = async() => {
    try {
        await signOut(auth);
    } catch(error) {
        return error;
    }
}

export { firebaseApp, auth, user };

const d = firebase.firestore();

export const addUser = async(name: string, email: string) => {
    const userRef = d.collection('users').doc(user?.uid);
    userRef.set({
        name: name,
        email: email,
    });
}