import React from 'react';
import CardComponent from 'app/components/CardComponent';

const ForYou = () => {
  return (
    <div className="flex flex-wrap m-auto justify-center p-10 gap-6">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <CardComponent />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <CardComponent />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <CardComponent />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <CardComponent />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <CardComponent />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <CardComponent />
      </div>
    </div>
  );
};

export default ForYou;
