"use client"
import React, { useRef } from "react";
import { useState, ChangeEvent } from "react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { validateImage } from "image-validator";
import { useRouter } from 'next/navigation';
import { setProfileIcon } from "../../lib/firebase";
import { Avatar } from "@nextui-org/react";
import { getProfileName } from "../../lib/firebase";

export default function SetProfile() {
    const route = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

    let selectedFile: any = null;

    const validateFile = async (file: File) => {
        // Add your validation logic here
        return true;
    };

    const handleImageSelect = async () => {
        const files = fileInputRef.current?.files;
        if (files && files[0]) {
            selectedFile = files[0];

            if (await validateFile(selectedFile)) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                    setProfileIcon(selectedFile);
                    setErrorMsg(null);
                };

                reader.readAsDataURL(selectedFile);
            } else {
                setErrorMsg('Invalid file type.');
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleUpload = async() => {
        await setProfileIcon(selectedFile);
        route.push('/ForYou');
    }

    return (
        <main className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 rounded-xl bg-white shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800">Profile Image</h1>
        <div className="flex justify-center items-center">
        {imagePreview && <Avatar isBordered radius="full" showFallback src={imagePreview} className="w-20 h-20 text-large justify-center" />}
        {!imagePreview && <Avatar isBordered radius="full" showFallback src='https://images.unsplash.com/broken' className="w-20 h-20 text-large justify-center" />}
        </div>
        <div className="space-y-4">
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          <Button className="w-full py-3 text-gray-900 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none" onClick={handleClick}>Select profile image</Button>
          {errorMsg && <div>{errorMsg}</div>}
          <Button className="w-full py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none" onClick={handleUpload}>Upload</Button>
        </div>
        <p className="text-xs text-center text-gray-500">By signing in, you agree to our Terms and Conditions.</p>
        </div>
        </main>
    );
}