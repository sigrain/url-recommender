"use client"
import React,{useState} from "react";
import { useRouter } from 'next/navigation';
import {Input, Button} from "@nextui-org/react";
import { signin } from "../../lib/firebase";
import { UserAuth } from "app/context/AuthContext";
import ErrorModal from "app/components/ErrorModal";
export default function SignIn() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = useState<boolean>(false)
    const router = useRouter();
    const {user, setUser} = UserAuth()
    function handleSignUp() {
        router.push('./signup');
    }

    async function handleSignIn() {
        try {
            setError(false);
            const userCreds = await signin(email, password);
            setUser(userCreds);
            await console.log(userCreds)
            router.push('/ForYou');
        } catch(error) {
            console.log(error);
            setError(true);
            setEmail("")
            setPassword("")
        }
    }
    return (
<main className="flex items-center justify-center h-screen bg-gray-100">
    {error && <ErrorModal message="Login error" />}
  <div className="w-full max-w-md p-8 space-y-6 rounded-xl bg-white shadow-xl">
    <h1 className="text-4xl font-extrabold text-center text-gray-800">Welcome Back!</h1>
    <p className="text-center text-gray-600">Sign in to continue to your account.</p>
    <div className="space-y-4">
      <Input type="email" label="Email" value={email} onValueChange={setEmail} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      <Input type="password" label="Password" value={password} onValueChange={setPassword} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      <Button className="w-full py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300" onClick={handleSignIn}>Sign In</Button>
      <p className="text-center text-gray-600">Don't have an account?</p>
      <Button className="w-full py-3 text-gray-900 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300" onClick={handleSignUp}>Sign Up</Button>
    </div>
    <p className="text-xs text-center text-gray-500">By signing in, you agree to our Terms and Conditions.</p>
  </div>
</main>



    )
}


// import React, { useState } from "react";
// import { useRouter } from 'next/navigation';
// import { Input, Button } from "@nextui-org/react";
// import { signin } from "../../lib/firebase";
// import { UserAuth } from "app/context/AuthContext";
// import ErrorModal from "app/components/ErrorModal";

// export default function SignIn() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(false);
//     const router = useRouter();
//     const { setUser } = UserAuth();
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Call this function to close the modal
//     const closeModal = () => setIsModalOpen(false);

//     function handleSignUp() {
//         router.push('./signup');
//     }

//     async function handleSignIn() {
//         try {
//             setError(false);
//             const userCreds = await signin(email, password);
//             setUser(userCreds);
//             console.log(userCreds);
//             router.push('/ForYou');
//         } catch (error) {
//             console.error(error);
//             setError(true);
//             setIsModalOpen(true);
//         }
//     }

//     return (
//         <main className="flex items-center justify-center h-screen bg-gray-100">
//             {error && <ErrorModal message="An error occurred during sign in. Please try again." isOpen={isModalOpen} onClose={closeModal} />}
//             {/* Rest of your code */}
//             <div className="w-full max-w-md p-8 space-y-6 rounded-xl bg-white shadow-xl">
//                 <h1 className="text-4xl font-extrabold text-center text-gray-800">Welcome Back!</h1>
//                 <p className="text-center text-gray-600">Sign in to continue to your account.</p>
//                 <div className="space-y-4">
//                 <Input type="email" label="Email" value={email} onValueChange={setEmail} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
//                 <Input type="password" label="Password" value={password} onValueChange={setPassword} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
//                 <Button className="w-full py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300" onClick={handleSignIn}>Sign In</Button>
//                 <p className="text-center text-gray-600">Don't have an account?</p>
//                 <Button className="w-full py-3 text-gray-900 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300" onClick={handleSignUp}>Sign Up</Button>
//                 </div>
//                 <p className="text-xs text-center text-gray-500">By signing in, you agree to our Terms and Conditions.</p>
//             </div>
//         </main>
//     );
// }
