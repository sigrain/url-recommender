"use client"
import React,{useState} from "react";
import { useRouter } from 'next/navigation';
import {Input, Button} from "@nextui-org/react";
import { signup, addUser } from "../../lib/firebase";
import ErrorModal from "app/components/ErrorModal";
export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<boolean>(false)
    const router = useRouter();

    async function handleSignUp() {
        try {
            await signup(email ?? "", password ?? "");
            await addUser(email ?? "", username ?? "");
        } catch(error) {
            console.log(error);
            setError(true);
            setEmail("")
            setPassword("")
            setUsername("")
        }
    }

    function handleSignIn() {
        router.push('./signin');
    }

    return (
<main className="flex items-center justify-center h-screen bg-gray-100">
{error && <ErrorModal message="Sign Up error" />}
  <div className="w-full max-w-md p-8 space-y-6 rounded-xl bg-white shadow-xl">
    <h1 className="text-4xl font-extrabold text-center text-gray-800">Welcome!</h1>
    <div className="space-y-4">
      <Input type="name" label="Username" value={username} onValueChange={setUsername} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      <Input type="email" label="Email" value={email} onValueChange={setEmail} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      <Input type="password" label="Password" value={password} onValueChange={setPassword} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      <Button className="w-full py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300" onClick={handleSignUp}>Sign Up</Button>
      <p className="text-center text-gray-600">Already have an account?</p>
      <Button className="w-full py-3 text-gray-900 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300" onClick={handleSignIn}>Sign In</Button>
    </div>
    <p className="text-xs text-center text-gray-500">By signing up, you agree to our Terms and Conditions.</p>
  </div>
</main>

    )
}