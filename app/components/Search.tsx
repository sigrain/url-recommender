"use client"
import React,{useEffect, useState} from 'react';
import CardComponent from 'app/components/CardComponent';

export function Search(posts: any) {
  const [contents, setContents] = useState([]);
  useEffect(()=> {
    setContents(posts);
  }
  ,[])
  return (
    <div className="flex flex-wrap m-auto justify-center p-10 gap-6">
      {
        contents.map((content)=>{ return (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <CardComponent email={content.email} url={content.url} summary={content.summary} title={content.title} userid={content.userid}/>
            </div>
        )
      })
      }
    </div>
  );
};
