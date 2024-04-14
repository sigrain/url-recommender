import React from 'react';
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import '@fontsource/inter'; // Ensure you have the font installed

const AddUrlCard = ({ newURL, setNewURL, getURLTitleSummary, urlTitle, urlSummary, saveNewPost }) => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-3/4 p-6 shadow-md"
      css={{ p: '$6', mw: '400px' }}
    >
      <CardBody>
        <div className="flex flex-col space-y-4">
           <Input value={newURL} onValueChange={setNewURL} type="email" variant="bordered"  placeholder="URL" color="default" endContent={
                     <Button isIconOnly aria-label="Exit" color="foreground" onClick={getURLTitleSummary} >
                     <ArrowForwardTwoToneIcon /> 
                     </Button>
            }/>
          
          {urlTitle && (
            <div className="animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-800">Title:</h3>
              <p className="text-gray-600">{urlTitle}</p>
            </div>
          )}
          {urlSummary && (
            <div className="animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-800">Summary:</h3>
              <p className="text-gray-600">{urlSummary}</p>
            </div>
          )}
          <Button
            shadow
            color="gradient"
            onClick={saveNewPost}
            className="self-end mt-4"
          >
            Save
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default AddUrlCard;
