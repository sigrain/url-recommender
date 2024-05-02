"use client"
import React,{useEffect, useState} from 'react';
import axios from 'axios'
import axiosRetry from 'axios-retry';
import CardComponent from 'app/components/CardComponent';
import { getFYPContent, getUserData } from 'app/lib/firebase';
import OtherUsersFeeds from 'app/components/OtherUsersFeeds';
const ForYou = () => {
  const [contents, setContents] = useState([]);
  const [temp, setTemp] = useState([]);
  
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
        'x-api-key': '2efa8ad4-cc2c-46b1-95d0-c340c9763495'
      },
      data: {
        contents: { text: { maxCharacters: 200, includeHtmlTags: false } },
        url: url,
        numResults: 10
      }
    };
  
    try {
      const response = await axiosInstance.request(options);
      return response.data; // Return the data if needed
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const getPosts = async () => {
      try {
        const userPost = await getUserData();
  
        if (Array.isArray(userPost)) {
          // Fetch similar results for each URL and wait for all to complete
          const contentPromises = userPost.map(async (val) => {
            const similarResults = await fetchSimilarResults(val.url);
            // Call getURLTitleSummary for each similar URL
            const tempResults = similarResults.results.map(similarUrl => ({
              email: "magic@mail.com", // Placeholder email
              url: similarUrl.url,
              title: similarUrl.title,
              summary: similarUrl.text,
            }));
  
            setTemp(currentTemp => [...currentTemp, ...tempResults]);
            return tempResults;
          });
  
          // Wait for all content promises to resolve and flatten the results
          // const contentResults = await Promise.all(contentPromises);
          // const flattenedContentResults = contentResults.flat();
          // setContents(flattenedContentResults);
        }
  
        // Fetch FYP content and update the state
        // const post = await getFYPContent();
  
        // if (Array.isArray(post)) {
        //   setContents(prevContents => [...prevContents, ...post]);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    getPosts();
  }, []); // Empty dependency array ensures this runs once on mount
  
  return (
    <div className="flex flex-wrap m-auto justify-center p-10 gap-6">
        {Array.isArray(contents) && temp.map((content) => {
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
      <OtherUsersFeeds />
    </div>
  );
};

export default ForYou;
