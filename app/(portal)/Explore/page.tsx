"use client"
import InterestFolder from 'app/components/InterestFolder';
import React, {useState, useEffect} from 'react'

const Explore = () => {

const [date, setDate] = useState<string>();
useEffect(()=>{
    const today: Date = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateString: string = today.toLocaleDateString('en-GB', options);
    console.log(dateString)
    setDate(dateString)    
},[])
    const trends = ["trending1", "trending2", "trending3", "trending4", "trending5", "trending6"]
  return (
    <div className="flex mt-5 justify-center items-center flex-col">
      <div className="flex-1 items-center p-5">
        <h1 className="text-2xl">{date}</h1>
        <h1 className="text-5xl">See what's trending</h1>
      </div>
      <div className="flex flex-wrap flex-row p-5 justify-center items-center gap-5">
        {trends.map((trend)=>{return(
            <InterestFolder interest = {trend} />
        )})}
        
      </div>
    </div>
  )
}

export default Explore