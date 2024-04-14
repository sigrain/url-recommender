"use client"
import React from "react";
import { useState, ChangeEvent } from "react";
import { Button } from "@nextui-org/react";
import { validateImage } from "image-validator";
import { useRouter } from 'next/navigation';
import { setProfileIcon } from "../../lib/firebase";

export default function SetProfile() {
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const validateFile = async (selectedFile: File): Promise<boolean> => {
        const limitFileSize = 3 * 1024 * 1024;
    
        if (selectedFile.size > limitFileSize) {
          setErrorMsg("File size is too large, please keep it under 3 GB.");
          return false;
        }
    
        const isValidImage = await validateImage(selectedFile);
    
        if (!isValidImage) {
          setErrorMsg("You cannot upload anything other than image files.");
          return false;
        }
    
        return true;
    };

    const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        setErrorMsg(null);
        e.preventDefault();
        const selectedFile = e.target.files?.[0];

        if (selectedFile && (await validateFile(selectedFile))) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setFile(selectedFile);
                setImagePreview(reader.result as string);
                setErrorMsg(null);
            }

            reader.readAsDataURL(selectedFile);
        }
    };

    const uploadImage = () => {
        if (!file) {
            setErrorMsg("File not selected.");
            return;
        }
        
        setProfileIcon(file);

        try {
            router.push('/ForYou');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <main className="p-10 flex h-full">
            <div className='w-screen flex justify-center items-center'>
            <div className='basis-1/3'>
                <form>
                    <input type="file" onChange={handleImageSelect} />
                    <br />
                    <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        setErrorMsg(null);
                    }}
                    />
                    <br />
                </form>
                <p style={{ color: "red" }}>{errorMsg && errorMsg}</p>
                <p className="mb-7"></p>
                <Button color="primary" onPress={uploadImage}>
                  Upload
                </Button>
            </div>
            </div>
        </main>
    )
}