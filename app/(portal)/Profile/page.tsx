"use client"
import React, { useEffect, useState } from 'react';
import { Avatar, Chip, Button, Input } from "@nextui-org/react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { UserAuth } from 'app/context/AuthContext';
import { getSavedPosts } from 'app/lib/firebase';
import InterestFolder from 'app/components/InterestFolder';
import { getInterestsFromURL } from 'app/lib/gemini-pro';
import EditModal from 'app/components/EditModal';
const Profile = () => {
//   const interests = ["interest1", "interest2", "interest3"];
  const [saved, setSaved] = useState([]);
  const [savedTitles, setSavedTitles] = useState([])
  const [interests, setInterests] = useState([]);
  const [imgUrl, setImgUrl] = useState("")
  const [rename, setRename] = useState<boolean>(false);
  const { user } = UserAuth();
  const [image, setImage] = useState<string>();
  const [editState, setEditState] = useState<string>('Display');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    getSavedPosts().then(posts => {
      console.log(posts);
      setSaved(posts);
      let arr = posts.map((post)=>post?.title)
      console.log(arr)
      setSavedTitles(arr)
    }).catch(error => {
      console.error(error);
    });
    const getInterestsFromTitle = async() => {
        const data = await getInterestsFromURL(savedTitles);
        const url = await getProfileIcon();
        console.log(data)
        if (data) {
            setInterests(data);
        } 
        if (url) {
            setImgUrl(url)
        }
    }
    
    getInterestsFromTitle();

    const getProfileImage = async() => {
      const icon = await getProfileIcon();
      setImage(icon);
    }
    getProfileImage();

    const getUsername = async() => {
      const username = await getProfileName();
      setName(username);
    }
    getUsername();
  }, []);

  const editProfile = () => {
    setEditState('Edit');
  }

  const editDone = async() => {
    await updateUserName(name);
    setEditState('Display');
  }

  return (
    <div className="container mx-auto p-4">
        {rename && <EditModal setRename = {setRename}/>}
      <div className="flex flex-col items-center gap-4">
        <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-24 h-24" />
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-xl">{user.email}</h1>
          <div className="cursor-pointer">
            <EditOutlinedIcon/>
          </Button>
          <p></p>
          </div>
          }
          {editState == 'Edit' &&
          <div className="flex flex-row items-center justify-center">
          <Input value={name} onValueChange={setName} size="sm" className='mr-2'></Input>
          <Button size="sm" onClick={editDone}>Done</Button>
          </div>
          }
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {interests.length > 0 && interests.map((interest, index) => (
            <Chip key={index} color="default" variant="flat">
              {interest}
            </Chip>
          ))}
        </div>
        <div className="w-full py-6">
          <h2 className="text-xl font-bold text-center">Saved Links</h2>
          <div className="grid grid-cols-3 gap-4 p-4 place-items-center">
            {saved.map((save, index) => (
              <InterestFolder key={index} interest={save?.title} url={save?.url} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Profile;
