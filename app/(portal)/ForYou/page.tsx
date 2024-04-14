"use client"
import React,{useEffect, useState} from 'react';
import CardComponent from 'app/components/CardComponent';
import { getFYPContent } from 'app/lib/firebase';
const ForYou = () => {
  const [contents, setContents] = useState();
  useEffect(()=> {
    const getposts = async() => {
      const post = await getFYPContent()
      setContents(post);
    }
    getposts();
  }
  ,[])
  return (
    <div className="flex flex-wrap m-auto justify-center p-10 gap-6">
      {contents && contents.map((content)=>{ return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <CardComponent email={content.email} url={content.url} summary={content.summary} title={content.title} />
        </div>
      )
      })}
    </div>
  );
};

export default ForYou;
