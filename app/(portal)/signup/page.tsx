"use client"
import React from "react";
import { useRouter } from 'next/navigation';
import {Input, Button} from "@nextui-org/react";
import { signup } from "@/app/lib/firebase";

export default function SignUp() {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const router = useRouter();

    async function handleSignUp() {
        try {
            await signup(email ?? "", password ?? "");
        } catch(error) {
            console.log(error);
        }
    }

    function handleSignIn() {
        router.push('./signin');
    }

    return (
        <main className="p-10 flex h-full">
            <div className='w-screen flex justify-center items-center'>
            <div className='basis-1/3'>
            <p className="mt-20"></p>
            <h1 className="mb-5 text-3xl font-extrabold">Welcome!</h1>
            <p className="mb-5"></p>
            <Input type="name" label="username" value={username} onValueChange={setUsername} />
            <p className="mb-3"></p>
            <Input type="email" label="email" value={email} onValueChange={setEmail} />
            <p className="mb-3"></p>
            <Input type="password" label="password" value={password} onValueChange={setPassword} />
            <p className="mb-7"></p>
            <Button className="w-full p-2 border mb-5" color="primary" onClick={handleSignUp}>SignUp</Button>
            <Button className="w-full p-2 border mb-5" color="default" onClick={handleSignIn}>SignIn</Button>
            </div>
            </div>
        </main>
    )
}