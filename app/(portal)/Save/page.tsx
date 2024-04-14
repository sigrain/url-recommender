"use client"
import React, {useState} from 'react';
import { Button } from "@nextui-org/react";
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import AddUrlCard from 'app/components/AddUrlCard';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useRouter } from 'node_modules/next/navigation';
import { UserAuth } from 'app/context/AuthContext';
const Save = () => {
    const router = useRouter();
    const {newURL, setNewURL, getURLTitleSummary, urlTitle, urlSummary, saveNewPost} = UserAuth();
  return (
    <div>
        <div className="ml-6 flex flex-row gap-3 p-10 items-center">
            <Button isIconOnly aria-label="Exit" color="foreground" onClick={()=>router.push("/ForYou")} >
                <ArrowBackTwoToneIcon />
            </Button>
            <h1 className="w-1/3 text-2xl">Save a Link</h1>
        </div>  
        <div className="flex justify-center items-center">
            <AddUrlCard newURL = {newURL} setNewURL = {setNewURL} getURLTitleSummary = {getURLTitleSummary} urlTitle = {urlTitle} urlSummary = {urlSummary} saveNewPost = {saveNewPost} />
        </div>
    </div>

  );
};

export default Save;
