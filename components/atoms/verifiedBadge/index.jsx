import CustomImage from "@/components/molecules/customImage"
import { cn } from "@/lib/utils"
import React from "react"

const VerifiedBadge = ({
  position = "bottom-right",
  className,
  size,
  verified,
}) => {
  const positionClasses = {
    "top-left" : "absolute top-0 left-0",
    "top-right" : "absolute top-0 right-0",
    "bottom-left" : "absolute bottom-0 left-0",
    "bottom-right": "absolute bottom-0 right-0",
  }
  return (
    <div className={cn(
      "flex items-center justify-center w-fit gap-2 px-3 py-1 bg-[#016a55aa]",
      positionClasses[position],
      className ? className : "rounded-tl-2xl"
    )}>
      <div className={cn("size-7", size)}>
        <CustomImage
          src="/images/icon/rocksport.svg"
          width={1000}
          height={1000}
          className="responsive-image-contain"
        />
      </div>
      <span className="text-white">{verified}</span>
    </div>
  )
}

export default VerifiedBadge
