"use client"
import React from "react";
import Image from "next/image";
import ForYou from "./(portal)/ForYou/page";
import Navbar from "./components/Navbar";
import { useRouter } from "node_modules/next/router";
// import {NextUIProvider} from "@nextui-org/react";
import AuthContextProvider from "./context/AuthContext";
import { UserAuth } from "./context/AuthContext";
// import {useAuthState} from 'react-firebase-hooks/auth'
// import {auth} from '@/app/firebase/config'
export default function Home() {
  const router = useRouter()
  const {user} = UserAuth();
  // const [user] = useAuthState(auth);
  // console.log(user)
  if (user === null) {
    router.push("/signin")
  }
  return (
      <AuthContextProvider>
        <Navbar/>
        <ForYou />
      </AuthContextProvider>
  );
}
