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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID
};

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;
let user: User | null = null;

if (typeof window !== "undefined" && !getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  auth = getAuth();
  onAuthStateChanged(auth, (userData) => {
    user = userData;
  })
}

export const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return error;
    }
}

export const signin = (email: string, password: string) => {
    const auth = getAuth(firebaseApp);
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user = userCredential.user;
        // alert( 'ログインOK!' );
        console.log( user );
      })
      .catch((error) => {
        console.log(error);
      });
    return user;

    /*
    try {
      const auth = getAuth();
      let userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      user = userCredential.user
      return user;
    } catch (error) {
      return error;
    }
    */
}

export const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      return error;
    }
}

export { firebaseApp, auth, firestore, user };

const db = getFirestore();
const d = firebase.firestore();
const storage = getStorage();

export const addUser = async (name: string, email: string) => {
  const userRef = d.collection('users').doc(user?.uid);
  userRef.set({
    name: name,
    email: email,
  });
}

export const setProfileIcon = async (file: File) => {
  const storageRef = ref(storage, `users/${user?.uid}`);
  await uploadBytes(storageRef, file);
}

export const getProfileIcon = async () => {
  const storageRef = ref(storage, `users/${user?.uid}`);
  const url = getDownloadURL(storageRef);
  return url;
}

export const getUserIcon = async (user?: string) => {
  const storageRef = ref(storage, `users/${user}`);
  const url = getDownloadURL(storageRef);
  return url;
}

export const uploadPhoto = async (id: string, file: File, title: string) => {
    const storageRef = ref(storage, `images/${id}`);
    await uploadBytes(storageRef, file);

    const postRef = d.collection('posts').doc(id);
    const url = await getImage(id);
    const icon = await getUserIcon(user?.uid);
    const username = await getUserName(user?.uid);
    postRef.set({
      url: url,
      title: title,
      user: user?.uid,
      username: username,
      icon: icon,
    });
}

export const getUserName = async(uid?: string) => {
  const userRef = d.collection('users').doc(uid);
  const userDoc = await userRef.get();
  const username = userDoc.data()?.name;
  return username;
}

export const getUserEmail = async() => {
  const userRef = d.collection('users').doc(user?.uid);
  const userDoc = await userRef.get();
  const username = userDoc.data()?.email;
  return username;
}

export const getPosts = async() => {
  const postRef = collection(db, 'posts');
  const querySnapshot = await getDocs(postRef);
  const postArray: any = [];
  querySnapshot.docs.map((doc) => {
    postArray.push({
      id: doc.id,
      url: doc.data().url,
      title: doc.data().title,
      user: doc.data().user,
      username: doc.data().username,
      icon: doc.data().icon,
    })
  });
  return postArray;
}

export const getImage = async(id: string) => {
  const storageRef = ref(storage, `images/${id}`);
  const url = getDownloadURL(storageRef);
  return url;
}