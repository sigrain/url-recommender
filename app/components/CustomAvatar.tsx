import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
const CustomAvatar = () => {
  const [visible, setVisible] = useState(false);
    const router = useRouter();
  const handleDropdown = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <Dropdown placement="bottom-end" visible={visible} onVisibleChange={handleDropdown}>
        <DropdownTrigger>
          <Avatar
            isBordered
            size="lg"
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="settings" onClick={()=> router.push("/Profile")}>
            My Profile
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default CustomAvatar;
