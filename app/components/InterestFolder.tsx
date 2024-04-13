import React, { useEffect, useRef } from 'react';
import { Card, CardFooter, Image } from "@nextui-org/react";
import autoAnimate from '@formkit/auto-animate';

const InterestFolder = ({ interest }) => {
  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) {
      autoAnimate(footerRef.current);
    }
  }, []);

  return (
    <Card isFooterBlurred radius="lg" className="border-none w-full md:w-1/3 lg:max-h-300px"> {/* Responsive width and max height */}
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={"60%"}
        src="https://images.pexels.com/photos/16694237/pexels-photo-16694237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        width={"100%"}
        css={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }} // Zoom effect on hover
      />
      <CardFooter
        ref={footerRef}
        css={{
          position: "absolute",
          bottom: 0,
          zIndex: 1,
          width: "100%",
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(5px)",
          transition: "background 0.3s, color 0.3s ease-in-out",
          "@smMax": {
            background: "rgba(0, 0, 0, 0.7)",
            padding: "1rem", // Increased padding for smaller screens
          },
          "&:hover": {
            background: "rgba(0, 0, 0, 0.7)",
          },
          "@media(min-width: 1281px)": {
            maxHeight: "300px", // Max height for larger screens
          },
        }}
      >
        <p
          css={{
            color: "$white",
            fontSize: "$tiny",
            textAlign: "center",
            padding: "$4",
            transition: "color 0.3s ease-in-out",
            "@smMax": {
              fontSize: "$base",
            },
            "&:hover": {
              color: "$yellow500", // Highlight text on hover
            },
            "@media(min-width: 1281px)": {
              fontSize: "$lg", // Larger font size for desktop
            },
          }}
        >
          {interest}
        </p>
      </CardFooter>
    </Card>
  )
}

export default InterestFolder;
