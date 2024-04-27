"use client"
import React,{useEffect, useState} from 'react';
import axios from 'axios'
import axiosRetry from 'axios-retry';
import CardComponent from 'app/components/CardComponent';
import { getFYPContent, getUserData } from 'app/lib/firebase';
import AddUrlCard from 'app/components/AddUrlCard';
import { UserAuth } from 'app/context/AuthContext';
import { Input } from '@nextui-org/react';

const ForYou = () => {
  const [contents, setContents] = useState<any>();
  const [URL, setURL] = useState<any>();

  const { newURL, setNewURL, getURLTitleSummary, urlTitle, urlSummary, saveNewPost } = UserAuth();

  const axiosInstance = axios.create();
  axiosRetry(axiosInstance, {
    retries: 3, // Number of retry attempts
    retryDelay: axiosRetry.exponentialDelay, // Exponential back-off delay
  });
  
  const fetchSimilarResults = async (url: string) => {
    console.log(url);
    const options = {
      method: 'POST',
      url: 'https://api.exa.ai/findSimilar',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-api-key': '1992ccb7-671d-407e-853f-9c45b79be686'
      },
      data: {
        contents: { text: { maxCharacters: 200, includeHtmlTags: false } },
        url: url,
        numResults: 5
      }
    };
  
    try {
      const response = await axiosInstance.request(options);
      console.log(response.data);
      return response.data; // Return the data if needed
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const userPost = await getUserData();
      console.log(userPost)
      if (Array.isArray(userPost)) {
        const similarResults = await fetchSimilarResults("https://www.freecodecamp.org/news/greedy-algorithms/");
        console.log(similarResults);
        // Call getURLTitleSummary for each similar URL
        const contentResults = await Promise.all(similarResults.results.map(async (similarUrl: any) => {
          return {
            email: "magic@mail.com", // Placeholder email
            url: similarUrl.url,
            title: similarUrl.title,
            summary: similarUrl.text
          };
        }));
  
      //   // Wait for all content promises to resolve and flatten the results
        const flattenedContentResults = contentResults.flat(2);
        console.log(flattenedContentResults);
        setContents(flattenedContentResults);
      }
  
      // Fetch FYP content and update the state
      const post = await getFYPContent();

      if (Array.isArray(post)) {
        console.log(post)
        setContents(prevContents => [...prevContents, ...post]);
      }
    };
  
    getPosts();
  }, []);
  
  return (
    <div>
    <div className="flex justify-center items-center mt-20 mb-10">
      <AddUrlCard newURL={newURL} setNewURL={setNewURL} getURLTitleSummary={getURLTitleSummary} urlTitle={urlTitle} urlSummary={urlSummary} saveNewPost={saveNewPost} />
    </div>
    <div className="flex justify-center items-center mt-20 mb-10">
      <Input value={URL} onValueChange={setURL} />
    </div>
    <div className="flex flex-wrap m-auto justify-center p-10 gap-6">
{Array.isArray(contents) && contents.map((content) => {
  // Ensure that content.doc exists and has an id property\\
  console.log(content)
  const postId = content.id;
  console.log(postId)
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4" key={postId}>
      <CardComponent
        postId={postId}
        email={content.email || 'default-email@mail.com'}
        url={content.url}
        summary={content.summary}
        title={content.title}
        userid={content.userid}
      />
    </div>
  );
})}
    </div>
    </div>
  );
};

export default ForYou;
