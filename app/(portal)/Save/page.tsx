"use client"
import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import AddUrlCard from 'app/components/AddUrlCard';
import { useRouter } from 'node_modules/next/navigation';
import { UserAuth } from 'app/context/AuthContext';

const Save = () => {
    const router = useRouter();
    const { newURL, setNewURL, getURLTitleSummary, urlTitle, urlSummary, saveNewPost } = UserAuth();

    return (
        <div className="font-sans text-gray-800">
            <div className="ml-6 flex flex-row gap-3 p-10 items-center">
                <Button isIconOnly aria-label="Exit" color="foreground" onClick={() => router.push("/ForYou")}>
                    <ArrowBackTwoToneIcon />
                </Button>
                <h1 className="text-4xl font-bold tracking-wide">Save a Link</h1>
            </div>  
            <div className="flex justify-center items-center">
                <AddUrlCard newURL={newURL} setNewURL={setNewURL} getURLTitleSummary={getURLTitleSummary} urlTitle={urlTitle} urlSummary={urlSummary} saveNewPost={saveNewPost} />
            </div>
        </div>
    );
};

export default Save;
