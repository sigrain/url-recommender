import React from 'react'
import CardComponent from 'app/components/CardComponent'
const ForYou = () => {
  return (
    <div className="flex flex-1 flex-row m-auto justify-center p-10 gap-6 flex-wrap">
      <div className="w-1/4">
        <CardComponent />
      </div>
      <div className="w-1/4">
        <CardComponent />
      </div>
      <div className="w-1/4">
        <CardComponent />
      </div>
      <div className="w-1/4">
        <CardComponent />
      </div>
      <div className="w-1/4">
        <CardComponent />
      </div>
      <div className="w-1/4">
        <CardComponent />
      </div>
    </div>
  )
}

export default ForYou
