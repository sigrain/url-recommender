import React from 'react';
import { Button } from "@nextui-org/react";
import '@fontsource/inter'; // Ensure you have the font installed

export default function InterestFolder({ interest, url }) {
    const bgImageUrl = "https://images.pexels.com/photos/18114939/pexels-photo-18114939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  return (
    <Button
      className="w-full md:w-80 h-48 bg-cover bg-center brightness-95 p-5"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
        <a href={url}>
            <h1 className="text-xl text-white font-inter font-bold">{interest}</h1>
        </a>
    </Button>
  );
}