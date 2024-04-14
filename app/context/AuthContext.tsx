import React, { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "node_modules/next/navigation";
import { auth, addPost } from "./../lib/firebase";
import {getDataFromURL} from "../lib/gemini-pro"
type AuthContextType = User | null | undefined;

const AuthContext = createContext<{ 
    user: AuthContextType, 
    loading: boolean, 
    newURL: string, 
    setNewURL: React.Dispatch<React.SetStateAction<string>>,
    getURLTitleSummary: () => void,
    urlTitle: string,
    urlSummary: string,
    saveNewPost: () => void,
    setUser: React.Dispatch<any>,
    logOut: () => void
  }>({
    user: null,
    loading: true,
    newURL: "",
    setNewURL: () => {}, // Provide a no-op function as the default value
    getURLTitleSummary: () => {},
    urlTitle: "",
    urlSummary: "",
    saveNewPost: () => {},
    setUser: () => {},
    logOut: () => {}
  });

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthContextType>(null);
  const [loading, setLoading] = useState(true);
  const [newURL, setNewURL] = useState<string>("");
  const [urlTitle, setURLTitle] = useState<string>("")
  const [urlSummary, setURLSummary] = useState<string>("")
  const router = useRouter()
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
        console.log(user)
        unsubscribe()
    };
}, []);

const getURLTitleSummary = async () => {
    try {
        console.log("called")
        const {title, summary} = await getDataFromURL(newURL)  
        setURLTitle(title)
        setURLSummary(summary)
        // await addPost("", summary, title, newURL, user.uid, user.displayName)
        // setNewURL("");
    } catch (error) {
        console.log(error)       
    }
}

const saveNewPost = async () => {
    try {
        console.log(urlSummary, urlTitle, newURL, user.uid, user.email)
        await addPost("", urlSummary, urlTitle, newURL)
        setURLSummary("");
        setURLTitle("")
        setNewURL("")
    } catch (error) {
        console.log(error)
    }
}

const logOut = () => {
    try {
        setUser(null)
        setLoading(true)
        router.push("/signin");
    } catch (error) {
        console.log(error)
    }
}

  return (
    <AuthContext.Provider value={{ user, setUser, loading, newURL, setNewURL, getURLTitleSummary, urlTitle, urlSummary, saveNewPost, logOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
    console.log(useContext(AuthContext));
    return useContext(AuthContext);
};

interface Props {
  children: ReactNode;
}

export default AuthContextProvider;
