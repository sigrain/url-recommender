import React from 'react';
import { Button } from "@nextui-org/react";

export default function InterestFolder({interest}) {
    // Define the new background image URL
    const bgImageUrl = "https://images.pexels.com/photos/18114939/pexels-photo-18114939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

    return (
        <div>
            {/* <h1 className="mt-20 mb-10 text-3xl font-semibold flex justify-center">Are you looking for</h1> */}
            <main className="flex justify-center">
                <div className="content-center">
                    <Button className="ml-3 mt-3 w-80 h-48 bg-center brightness-95" style={{ backgroundImage: `url(${bgImageUrl})` }}>
                        <h1 className="text-xl text-white font-semibold">{interest}</h1>
                    </Button>
                </div>
            </main>
        </div>
    );
}
