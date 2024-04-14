"use client"
import React,{useEffect, useState} from 'react';
import axios from 'axios'
import axiosRetry from 'axios-retry';
import CardComponent from 'app/components/CardComponent';
import { getFYPContent, getUserData } from 'app/lib/firebase';

const ForYou = () => {
  const [contents, setContents] = useState();

  const axiosInstance = axios.create();
  axiosRetry(axiosInstance, {
    retries: 3, // Number of retry attempts
    retryDelay: axiosRetry.exponentialDelay, // Exponential back-off delay
  });
  
  const fetchSimilarResults = async (url) => {
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
        numResults: 10
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
  
      //   // Wait for all content promises to resolve and flatten the results
        const contentResults = await Promise.all(contentPromises);
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
  );
};

export default ForYou;
