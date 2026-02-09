"use client"
import CustomImage from "@/components/molecules/customImage"
import { cn } from "@/lib/utils"
import React, { useState } from "react"

const Wishlist = ({
  position = "top-right"
}) => {
  const [wishlist, setWishlist] = useState(false)
  const positionClasses = {
    "top-left": "absolute top-3 left-3",
    "top-right": "absolute top-3 right-3",
    "bottom-left": "absolute bottom-3 left-3",
    "center": "absolute top-1/2 -transform-1/2 left-1/2"
  }

  return (
    <div
      className={cn("bg-white size-8 flex items-center justify-center rounded-full",
        positionClasses[position])}
    >
      <button className="size-6" onClick={() => setWishlist(!wishlist)}>
        <CustomImage
          src={wishlist ? "/images/icon/heart-icon-fill.webp" : "/images/icon/heart-icon.webp"}
          width={1000}
          height={1000}
        />
      </button>
    </div>
  )
}

export default Wishlist
