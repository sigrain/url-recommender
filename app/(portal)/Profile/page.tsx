"use client"
import React from 'react'
import {Avatar} from "@nextui-org/react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {Chip, Button} from "@nextui-org/react";
import { UserAuth } from 'app/context/AuthContext';
const Profile = () => {
    const interests = ["interest1", "interest2", "interest3"]
    const {user} = UserAuth();
  return (
    <div className="flex flex-col p-10">
        <div className="flex justify-center items-center flex-col gap-5">
            <div>
                <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-25 h-25 text-large" />
            </div>
            <div className="flex flex-row items-center justify-center">
                <h1 className="text-xl">{user.email}</h1>
                <div className="cursor-pointer">
                    <EditOutlinedIcon/>
                </div>
            </div>
            <div className="flex gap-5">
                {interests.map((interest, index) => (
                    <Chip key={index}>
                    {interest}
                    </Chip>
                ))}
            </div>
            <div className="flex-1 justify-center py-10">
                <h1 className="text-2xl font-bold" >Saved Links</h1>
            </div>
        </div>
    </div>
  )
}

export default Profile
