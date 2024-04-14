// import { initializeApp, getApps, FirebaseApp } from "firebase/app";
// import { getFirestore, Firestore, addDoc, getDocs, collection } from "firebase/firestore";
// import {
//     getAuth,
//     Auth,
//     signInWithEmailAndPassword,
//     signOut,
//     onAuthStateChanged,
//     User,
//     createUserWithEmailAndPassword,
// } from "firebase/auth";
// import firebase from "firebase/compat/app";
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_APIKEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECTID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
//   appId: process.env.NEXT_PUBLIC_APPID
// };

// const app = initializeApp(firebaseConfig);

// let firebaseApp: FirebaseApp;
// let auth: Auth;
// let firestore: Firestore;
// let user: User | null = null;

// if (typeof window !== "undefined" && !getApps().length) {
//     firebaseApp = initializeApp(firebaseConfig);
//     firebase.initializeApp(firebaseConfig);
//     auth = getAuth();
//     onAuthStateChanged(auth, (userData) => {
//         user = userData;
//     })
// }

// firebaseApp = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
// auth = getAuth();
// onAuthStateChanged(auth, (userData) => {
//     user = userData;
// })

// export const signup = async(email: string, password: string) => {
//     try {
//         const auth = getAuth()
//         await createUserWithEmailAndPassword(auth, email, password);
//     } catch(error) {
//         return error;
//     }
// }

// export const signin = async(email: string, password: string) => {
//     try {
//         let userCredentials = await signInWithEmailAndPassword(auth, email, password);
//         user = userCredentials.user;
//         return user;
//     } catch(error) {
//         return error;
//     }
// }

// export const signout = async() => {
//     try {
//         await signOut(auth);
//     } catch(error) {
//         return error;
//     }
// }

// export { firebaseApp, auth, user };

// const d = firebase.firestore();

// export const addUser = async(name: string, email: string) => {
//     const userRef = d.collection('users').doc(user?.uid);
//     userRef.set({
//         name: name,
//         email: email,
//     });
// }
"use client"
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

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
const auth = getAuth(app);
const firestore = getFirestore(app);

// Sign up function
export const signup = async (email, password) => {
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

// Add user to Firestore
export const addUser = async (email: string, username: string) => {
  try {
    console.log(email, username);
    const myCollection = collection(firestore, 'users');
    const myDocumentData = {
        email: email,
        icon: "",
        username: username,
    };
    const newDocRef = await addDoc(myCollection, myDocumentData);
    console.log({newDocRef});
  } catch (error) {
    console.error("Add user error:", error);
    throw error;
  }
};

export const addPost = async (pp: string, summary: string, title: string, url: string, userid: string, username: string) => {
    try {
    //   console.log(email, username);
      const docRef = await addDoc(collection(firestore, "posts"), {
        pp: pp,
        summary: summary,
        title: title,
        url: url,
        userid: userid,
        username: username
      });
      console.log({docRef});
    } catch (error) {
      console.error("Add user error:", error);
      throw error;
    }
  };

// Listen for auth state changes
export const listenForAuthChanges = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// Exporting instances
export { auth, firestore };
