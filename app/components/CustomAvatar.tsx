"use client"
import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { UserAuth } from 'app/context/AuthContext';
import { getProfileIcon } from '../lib/firebase';

const CustomAvatar = ({logOut}) => {
  const [visible, setVisible] = useState(false);
    const router = useRouter();
    const {user} = UserAuth()
  const handleDropdown = () => {
    setVisible(!visible);
  };

  const [image, setImage] = useState<string>();

  const getProfileImage = async() => {
    const icon = await getProfileIcon();
    setImage(icon);
  }

  getProfileImage();

  return (
    <div>
      <Dropdown placement="bottom-end" visible={visible} onVisibleChange={handleDropdown}>
        <DropdownTrigger>
          <Avatar
            isBordered
            size="lg"
            as="button"
            className="transition-transform"
            src={image}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
          <DropdownItem key="settings" onClick={()=> router.push("/Profile")}>
            My Profile
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={logOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default CustomAvatar;
