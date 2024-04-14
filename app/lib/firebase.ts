"use client"
import { initializeApp, getApps, getApp, FirebaseApp, } from "firebase/app";
import { Firestore, getFirestore, addDoc, getDocs, collection } from "firebase/firestore";
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
let username: string = '';

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
export const signup = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log({res})
    username = name;
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
  const data: any = [];
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
export const setProfileIcon = async (file: File) => {
  const storageRef = ref(storage, `users/${user?.uid}`);
  await uploadBytes(storageRef, file);
}

export const getProfileIcon = async () => {
  const storageRef = ref(storage, `users/${user?.uid}`);
  const url = await getDownloadURL(storageRef);
  return url;
}

export const getUserIcon = async(userid: string) => {
  const storageRef = ref(storage, `users/${userid}`);
  const url = await getDownloadURL(storageRef);
  return url;
}

export const addPost = async (pp: string, summary: string, title: string, url: string) => {
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
