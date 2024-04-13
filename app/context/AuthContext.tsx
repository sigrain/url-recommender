"use client"
import React, { useContext, createContext, useState, useEffect, ReactNode } from "react";
import {
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { auth } from "./../lib/firebase";
type AuthContextType =  User | null | undefined ;
const AuthContext = createContext<{user: AuthContextType, loading: Boolean}>({user: null, loading: true});

export const AuthContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<AuthContextType>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (currentUser) => {
            console.log("Changed");
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{user, loading}}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
};

export const UserAuth = () => {
    return useContext(AuthContext);
};

interface Props {
    children?: ReactNode
}