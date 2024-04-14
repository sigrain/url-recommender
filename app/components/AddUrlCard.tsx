"use client"
import React from 'react'
import {Card, CardBody, Input, Button, Slider} from "@nextui-org/react";
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
const AddUrlCard = ({newURL, setNewURL, getURLTitleSummary, urlTitle, urlSummary, saveNewPost}) => {
    return (
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 w-3/4 p-6"
        shadow="sm"
      >
        <CardBody>
          <div className="flex flex-col">
              <div className="flex-1">
                <Input value={newURL} onValueChange={setNewURL} type="email" variant="bordered"  placeholder="URL" color="default" endContent={
                    <Button isIconOnly aria-label="Exit" color="foreground" onClick={getURLTitleSummary} >
                    <ArrowForwardTwoToneIcon /> 
                    </Button>
                } 
                />
              </div>
            {urlTitle.length > 0 && <>
                <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex flex-col w-full items-start justify-start gap-5 mt-5 py-8">
                    <div className="flex-1">
                        <h3>Title: {urlTitle}</h3>
                    </div>
                    <div className="flex-1">
                        <h3>Summary: {urlSummary}</h3>
                    </div>                
                </div>
                </div>
                <div className="flex justify-end items-center w-full">
                    <Button variant="ghost" color="default" onClick={saveNewPost}>
                        Save
                    </Button>
                </div>
            </>}
          </div>
        </CardBody>
      </Card>
    )
}

export default AddUrlCard
