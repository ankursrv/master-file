import Image from "next/image"
import React from "react"

const SuperPower = () => {
  return (
    <div className="bg-white px-4 rounded-full h-9 flex items-center justify-center gap-2 absolute top-3 left-3">
      <div className="size-6">
        <Image 
        src="/images/supercoin-icon2.svg"
        width={1000}
        height={1000}
        alt="not found"
        className="w-full h-full object-cover"
        />
      </div>
      <span className="text-orange-400 font-bold block text-sm">SuperHeart</span>
    </div>
  )
}

export default SuperPower
