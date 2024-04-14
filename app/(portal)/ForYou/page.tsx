"use client"
import React,{useEffect, useState} from 'react';
import axios from 'axios'
import CardComponent from 'app/components/CardComponent';
import { getFYPContent, getUserData } from 'app/lib/firebase';
import { UserAuth } from 'app/context/AuthContext';
const ForYou = () => {
  const [contents, setContents] = useState();
  const {getURLTitleSummary} = UserAuth();
  const fetchSimilarResults = async (url: string) => {
    const options = {
      method: 'POST',
      url: 'https://api.exa.ai/findSimilar',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-api-key': 'ca14a4fe-0bf5-4272-81e0-04f47b846904'
      },
      data: {
        contents: {text: {maxCharacters: 200, includeHtmlTags: false}},
        url: url,
        numResults: 10
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data; // Return the data if needed
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const userPost = await getUserData();
      if (Array.isArray(userPost)) {
        // Fetch similar results for each URL and wait for all to complete
        const contentPromises = userPost.map(async (val) => {
          const similarResults = await fetchSimilarResults(val.url);
          // Call getURLTitleSummary for each similar URL
          return Promise.all(similarResults.results.map(async (similarUrl) => {
            return {
              email: "magic@mail.com", // Placeholder email
              url: similarUrl.url,
              title: similarUrl.title,
              summary: similarUrl.text
            };
          }));
        });
  
        // Wait for all content promises to resolve and flatten the results
        const contentResults = await Promise.all(contentPromises);
        const flattenedContentResults = contentResults.flat(2);
        console.log(flattenedContentResults);
        setContents(flattenedContentResults);
      }
  
      // Fetch FYP content and update the state
      const post = await getFYPContent();
      // Ensure post is an array before setting state
      if (Array.isArray(post)) {
        setContents(prevContents => [...prevContents, ...post]);
      }
    };
  
    getPosts();
  }, []);
  
  
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
