"use client"
import React, { useState, useEffect } from 'react';
import InterestFolder from 'app/components/InterestFolder';
import '@fontsource/inter'; // Ensure you have the font installed

const Explore = () => {
  const [date, setDate] = useState<string>();

  useEffect(() => {
    const today: Date = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateString: string = today.toLocaleDateString('en-GB', options);
    setDate(dateString);
  }, []);

  const trends = ["trending1", "trending2", "trending3", "trending4", "trending5", "trending6"];

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="text-center p-5">
        <h1 className="text-xl font-inter">{date}</h1>
        <h1 className="text-5xl font-inter font-bold">See what's trending</h1>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5 p-5">
        {trends.map((trend, index) => (
          <InterestFolder key={index} interest={trend} />
        ))}
      </div>
    </div>
  );
};

export default Explore;