"use client"

import { initializeApp, getApps, getApp, FirebaseApp, } from "firebase/app";
import { Firestore, getFirestore, addDoc, getDocs, collection, doc, updateDoc, arrayUnion, getDoc  } from "firebase/firestore";
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, StorageReference, listAll } from "firebase/storage";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';


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

const d = firebase.firestore();

// Add user to Firestore
export const addUser = async (email: string, username: string) => {
  const userRef = d.collection('users').doc(user?.uid);
  userRef.set({
    username: username,
    email: email,
    saved: []
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

export const getProfileName = async () => {
  const userRef = d.collection('users').doc(user?.uid);
  const doc = await userRef.get();
  return doc.data()?.username;
}

export const getUserIcon = async(userid: string) => {
  const storageRef = ref(storage, `users/${userid}`);
  const url = await getDownloadURL(storageRef);
  return url;
}

// export const editUsername = async() => {

// }

export const addPost = async (pp: string, summary: string, title: string, url: string) => {
    try {
    //   console.log(email, username);
      const docRef = await addDoc(collection(firestore, "posts"), {
        pp: pp,
        summary: summary,
        title: title,
        url: url,
        userid: user?.uid,
        username: user?.email
      });
      console.log({docRef});
    } catch (error) {
      console.error("Add post error:", error);
      throw error;
    }
  };

  export const savePost = async (postId: string) => {
    try {
      // Ensure that userId is defined and not null
      const myDocRef = doc(db, 'users', user?.uid); // Correctly reference the user's document
      await updateDoc(myDocRef, {
        saved: arrayUnion(postId) // Use arrayUnion to append to the 'saved' array
      });
    } catch (error) {
      console.error("Save post error:", error);
      throw error;
    }
  };

  export const getSavedPostIDs = async () => {
    try {
      if (!user?.uid) {
        throw new Error('User ID is undefined');
      }
      const myDocRef = doc(db, 'users', user?.uid);
      const docSnap = await getDoc(myDocRef);
  
      if (docSnap.exists()) {
        console.log("Saved posts:", docSnap.data().saved);
        return docSnap.data().saved; // This will return the 'saved' attribute
      } else {
        console.log("No such document!");
        return []; // Return an empty array if the document does not exist
      }
    } catch (error) {
      console.error("Error getting saved posts:", error);
      throw error;
    }
  };
  
  export const getPostById = async (postId) => {
    try {
      if (!postId) {
        throw new Error('Post ID is undefined');
      }
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);
  
      if (postSnap.exists()) {
        console.log("Post data:", postSnap.data());
        return postSnap.data(); // This will return the post data
      } else {
        console.log("No such post!");
        return null; // Return null if the post does not exist
      }
    } catch (error) {
      console.error("Error getting post:", error);
      throw error;
    }
  };

  export const getSavedPosts = async () => {
    let data = [];
    try {
      const savedPostsId = await getSavedPostIDs(); // Call the correct function to get the IDs
      const postsPromises = savedPostsId.map(async (postId) => {
        return getPostById(postId); // Make sure to return the promise
      });
      data = await Promise.all(postsPromises); // Wait for all promises to resolve
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error getting saved posts:", error);
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
