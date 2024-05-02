"use client"
import React,{useState, useEffect} from 'react'
import { getFYPContent } from 'app/lib/firebase';
import CardComponent from './CardComponent';
const OtherUsersFeeds = () => {
    const [content, setContent] = useState([]);
    useEffect(()=>{
        const getData = async () => {
            const post = await getFYPContent();
            if (Array.isArray(post)) {
              setContent(post);
            }
        }
        getData()
    }, [])
  return (
      <div className="flex flex-wrap m-auto justify-center p-10 gap-6">
        {Array.isArray(content) && content.map((data) => {
        // Ensure that data.doc exists and has an id property\\
        console.log(data)
        const postId = data.id;
        console.log(postId)
        return (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4" key={postId}>
            <CardComponent
                postId={postId}
                email={data.email || 'default-email@mail.com'}
                url={data.url}
                summary={data.summary}
                title={data.title}
                userid={data.userid}
            />
            </div>
        );
        })}
      </div>
  )
}

export default OtherUsersFeeds
