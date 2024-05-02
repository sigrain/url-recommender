import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardBody, Avatar, Button } from "@nextui-org/react";
import { getUserIcon, savePost } from 'app/lib/firebase';
import "./animation.css"
const CardComponent = ({ postId, email, url, summary, title, userid }) => {
  const [showMore, setShowMore] = useState(false);
  const [image, setImage] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const setUserIcon = async () => {
      const iconUrl = await getUserIcon(userid);
      setImage(iconUrl);
    };

    setUserIcon();
  }, [userid]);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          cardRef.current.classList.add('fadeInUp');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSave = () => {
    if (postId) {
      savePost(postId);
    }
    setIsSaved(true);
  };

  const summaryWords = summary.split(' ');
  const summaryPreview = summaryWords.slice(0, 30).join(' ') + (summaryWords.length > 30 ? '...' : '');

  return (
    <div ref={cardRef} className="flex flex-col h-full w-full p-4">
      <Card className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
        <CardHeader className="bg-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar isBordered radius="full" size="md" src={image} />
            <div className="flex flex-col">
              <h4 className="text-sm font-semibold">{email}</h4>
              <h5 className="text-xs text-gray-500">@zoeylang</h5>
            </div>
          </div>
          <Button auto flat rounded color="default" size="sm" onClick={handleSave}>
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </CardHeader>
        <CardBody className="flex-grow p-4">
          <h1 className="text-xl font-bold mb-4 cursor-pointer">
            <a href={url} className="text-black hover:text-blue-500 transition duration-300">{title}</a>
          </h1>
          <p className="text-base text-gray-700">
            {showMore ? summary : summaryPreview}
            {summaryWords.length > 30 && (
              <span className="text-blue-500 hover:underline ml-2 cursor-pointer" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show Less' : 'See More'}
              </span>
            )}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardComponent;
