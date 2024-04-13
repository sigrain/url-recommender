import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
const CardComponent = () => {
  return (
    <div>
      <Card className="max-w-350">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
          </div>
        </div>
        <Button
         
          color="default"
          radius="full"
          size="sm"
          // variant={isFollowed ? "bordered" : "solid"}
          // onPress={() => setIsFollowed(!isFollowed)}
        >
          Save
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-6 text-small text-default-400">
        <p>
          https://nextui.org/docs/components/card
        </p>
        <span className="pt-2">
        NextUI's Card component offers versatile card designs for web applications, featuring customizable content layouts, images, and text. It supports various interactions like hover effects and click actions. The component provides flexibility in styling, allowing developers to create visually appealing and interactive cards to enhance user experiences in web development projects.
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </CardBody>
      {/* <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter> */}
    </Card>
    </div>
  )
}

export default CardComponent
