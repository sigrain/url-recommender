// import React from 'react'
// import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
// const CardComponent = ({email, url, summary, title}) => {
//   return (
//     <div>
//       <Card className="max-w-350">
//       <CardHeader className="justify-between">
//         <div className="flex gap-5">
//           <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
//           <div className="flex flex-col gap-1 items-start justify-center">
//             <h4 className="text-small font-semibold leading-none text-default-600">{email}</h4>
//             <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
//           </div>
//         </div>
//         <Button    
//           color="default"
//           radius="full"
//           size="sm"
//         >
//           Save
//         </Button>
//       </CardHeader>
//       <CardBody className="px-3 py-6 text-small text-default-400">
//         <p>
//           {url}
//         </p>
//         <span className="pt-2">
//         {title}
//           <span className="py-2" aria-label="computer" role="img">
//             {summary}
//           </span>
//         </span>
//       </CardBody>
//     </Card>
//     </div>
//   )
// }

// export default CardComponent
"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Avatar, Button } from "@nextui-org/react";

const CardComponent = ({ email, url, summary, title }) => {
  const [showMore, setShowMore] = useState(false);

  const summaryWords = summary.split(' ');
  const summaryPreview = summaryWords.slice(0, 30).join(' ') + (summaryWords.length > 30 ? '...' : '');

  return (
    <div>
      <Card className="max-w-350 bg-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader className="justify-between bg-white">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">{email}</h4>
              <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
            </div>
          </div>
          <Button auto flat rounded color="default" size="sm">
            Save
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-6">
          {/* <h1 className="text-lg leading-normal text-default-400">
            <a href={url} className="text-default-500 hover:text-default-600">{url}</a>
          </h1> */}
          <h1 className="text-xl font-bold leading-tight text-default-900 my-4">
          <a href={url} className="text-black-500 hover:text-default-600">{title}</a>
          </h1>
          <h1 className="text-normal leading-snug text-default-500">
            {showMore ? summary : summaryPreview}
            {summaryWords.length > 30 && (
              <a href={url} className="text-default-500 hover:text-default-600 ml-2 cursor-pointer" onClick={(e) => {
                e.preventDefault();
                setShowMore(!showMore);
              }}>
                {showMore ? 'Show Less' : 'See More'}
              </a>
            )}
          </h1>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardComponent;
