"use client"
import { initializeApp, getApps, getApp, FirebaseApp, } from "firebase/app";
import { Firestore, getFirestore, addDoc, collection } from "firebase/firestore";
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, StorageReference, listAll } from "firebase/storage";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//const auth = getAuth(app);
//const firestore = getFirestore(app);
let user: User | null = null;

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

firebaseApp = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
auth = getAuth();
firestore = getFirestore();
onAuthStateChanged(auth, (userData) => {
  user = userData;
})

// Sign up function
export const signup = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log({res})
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// Sign in function
export const signin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user)
    user = userCredential.user;
    return userCredential.user;
  } catch (error) {
    console.error("Signin error:", error);
    throw error;
  }
};

// Sign out function
export const signout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Signout error:", error);
    throw error;
  }
};

// const firestoreDB = initializeFirestore(firebaseApp, {
//     experimentalForceLongPolling: true, // this line
//     useFetchStreams: false, // and this line
//   })

const d = firebase.firestore();

// Add user to Firestore
export const addUser = async (email: string, username: string) => {
  const userRef = d.collection('users').doc(user?.uid);
  userRef.set({
    username: username,
    email: email
  })
};

const storage = getStorage();

// Add user icon image to Storage
export const addIcon = async (file: File) => {
  const storageRef = ref(storage, `users/${user?.uid}`);
  await uploadBytes(storageRef, file);
}

export const addPost = async (pp: string, summary: string, title: string, url: string, username: string) => {
    try {
    //   console.log(email, username);
      const docRef = await addDoc(collection(firestore, "posts"), {
        pp: pp,
        summary: summary,
        title: title,
        url: url,
        userid: user?.uid,
        username: username
      });
      console.log({docRef});
    } catch (error) {
      console.error("Add user error:", error);
      throw error;
    }
  };

// Listen for auth state changes
/*
export const listenForAuthChanges = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
*/

// Exporting instances
export { auth, firestore };
