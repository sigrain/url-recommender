"use client"
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import firebase from "firebase/compat/app"

import "firebase/compat/firestore"
// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
};
let user: User | null = null;
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

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

export const getFYPContent = async () => {
  const data = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, "posts"));
    querySnapshot.forEach((doc) => {
      // Push the document data along with its ID into the array
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log(data)
    return data; // This will be an array of objects
  } catch (error) {
    console.error("Error getting documents: ", error);
    return []; // Return an empty array in case of error
  }
};
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export const getUserData = async () => {
  try {
    const data = await getFYPContent();
    console.log(user?.uid)
    const userPost = data.filter((post) => post.userid === user?.uid)
    return userPost
  } catch (error) {
    console.error(error)
  }
};


// const firestoreDB = initializeFirestore(firebaseApp, {
//     experimentalForceLongPolling: true, // this line
//     useFetchStreams: false, // and this line
//   })

// Add user to Firestore
export const addUser = async (email: string, username: string) => {
  await addDoc(collection(firestore, 'users'), {
    email: email,
    username: username
  })
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
/*
export const listenForAuthChanges = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
*/

// Exporting instances
export { auth, firestore };
