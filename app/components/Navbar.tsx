import React from 'react';
import { Avatar, Button, Input } from "@nextui-org/react";
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider } from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation'; // Updated import for useRouter
import CustomAvatar from './CustomAvatar';
import FitScreenIcon from '@mui/icons-material/FitScreen';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname(); // Updated for correct usage
    console.log(pathname);

    return (
        <div className="p-4 min-h-20 w-full border-b-2 border-gray-200 bg-white shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
                <FitScreenIcon className="text-3xl " />
                <ul className="flex list-none gap-2">
                    <li>
                        <Button variant="flat" className="capitalize" color={pathname === "/ForYou" ? "default" : "foreground"} onClick={() => router.push('/ForYou')}>For You</Button>
                    </li>
                    <Divider orientation="vertical" />
                    <li>
                        <Button variant="flat" className="capitalize" color={pathname === "/Explore" ? "default" : "foreground"} onClick={() => router.push('/Explore')}>Explore</Button>
                    </li>
                    <Divider orientation="vertical" />
                    <li>
                        <Button variant="flat" className="capitalize" color={pathname === "/Save" ? "default" : "foreground"} onClick={() => router.push('/Save')}>Save</Button>
                    </li>
                </ul>
            </div>
            <div className="flex-1 px-4">
            <Input type="email" variant="bordered"  placeholder="Search" color="default" startContent={<SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
            </div>
            <div className="flex items-center gap-4">
                <CustomAvatar />
            </div>
        </div>
    );
};

export default Navbar;
