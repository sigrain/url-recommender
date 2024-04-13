"use client"
import { useRouter } from "next/navigation"
import { UserAuth } from "../context/AuthContext"
import { useEffect } from 'react'
import Navbar from "../components/Navbar"
import React from 'react';
import AuthContextProvider from "../context/AuthContext"
export default function HomescreenLayout({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const { user, loading } = UserAuth();
    console.log(user, loading)
    useEffect(() => {
        if (!loading && user == null) {
            router.push('/signin');
        }
    }, [user, loading]);
    // if (user === null) {
    //     return null; // Or a loading indicator if preferred
    // }
    // Log the user state for debugging
    console.log(user);

    // Render the layout only if the user is not null
    return (
        <AuthContextProvider>
            <div>
                <Navbar />
                {children}
            </div>            
        </AuthContextProvider>

    );
}
