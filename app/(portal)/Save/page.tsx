import React from 'react';
import { Button } from "@nextui-org/react";
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import AddUrlCard from 'app/components/AddUrlCard';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
const Save = () => {
  return (
    <div>
        <div className="ml-6 flex flex-row gap-3 p-10 items-center">
            <Button isIconOnly aria-label="Exit" color="foreground" >
            <ArrowBackTwoToneIcon />
            </Button>
            <h1 className="w-1/3 text-2xl">Save a Link</h1>
        </div>  
        <div className="flex justify-center items-center">
            <AddUrlCard />
        </div>

    </div>

  );
};

export default Save;
