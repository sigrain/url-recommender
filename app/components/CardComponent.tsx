"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Avatar, Button } from "@nextui-org/react";
import { getUserIcon, savePost } from 'app/lib/firebase';

const CardComponent = ({postId, email, url, summary, title, userid }) => {
  const [showMore, setShowMore] = useState(false);

  const summaryWords = summary.split(' ');
  const summaryPreview = summaryWords.slice(0, 30).join(' ') + (summaryWords.length > 30 ? '...' : '');

  const [image, setImage] = useState<string>();

  const setUserIcon = async() => {
    const url = await getUserIcon(userid);
    setImage(url);
  }

  setUserIcon();

  return (
    <div>
      <Card className="max-w-350 bg-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader className="justify-between bg-white">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src={image} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">{email}</h4>
              <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
            </div>
          </div>
          <Button auto flat rounded color="default" size="sm" onClick={()=>savePost(postId)} >
            Save
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-6">
          {/* <h1 className="text-lg leading-normal text-default-400">
            <a href={url} className="text-default-500 hover:text-default-600">{url}</a>
          </h1> */}
          <h1 className="text-xl font-bold leading-tight text-default-900 my-4">
          <a href={url} className="text-black-500 hover:text-default-600">{title}</a>
          </h1>
          <h1 className="text-normal leading-snug text-default-500">
            {showMore ? summary : summaryPreview}
            {summaryWords.length > 30 && (
              <a href={url} className="text-default-500 hover:text-default-600 ml-2 cursor-pointer" onClick={(e) => {
                e.preventDefault();
                setShowMore(!showMore);
              }}>
                {showMore ? 'Show Less' : 'See More'}
              </a>
            )}
          </h1>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardComponent;
