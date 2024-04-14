"use client"
import React, { useState, useEffect } from 'react';
import { Avatar, Button, Input } from "@nextui-org/react";
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider } from "@nextui-org/react";
import { UserAuth } from 'app/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation'; // Updated import for useRouter
import CustomAvatar from './CustomAvatar';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { getFYPContent } from 'app/lib/firebase';
import { Search } from './Search';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname(); // Updated for correct usage
    const {logOut} = UserAuth();
    console.log(pathname);

    const [showItems, setShowItems] = useState<any>([]);
    const [screen, setScreen] = useState('Home');
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            const data = await getFYPContent();
            setPosts(data);
        }

        fetchData();
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const result = posts.filter((item) => {
            return item.title.toLowerCase().match(e.target.value.toLowerCase());
        });
        setShowItems(result);
        setScreen('Search');
    }

    return (
        <div>
        <div className="p-4 min-h-20 w-full border-b-2 border-gray-200 bg-white shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
                <FitScreenIcon className="text-3xl cursor-pointer" onClick={()=>router.push('/ForYou')} />
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
            <Input type="email" variant="bordered"  placeholder="Search" color="default" startContent={<SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} onChange={handleSearch} />
            </div>
            <div className="flex items-center gap-4">
                <CustomAvatar logOut={logOut} />
            </div>
        </div>
            <div>
                {screen === 'Search' && <Search posts={showItems}/>}
            </div>
        </div>
    );
};
