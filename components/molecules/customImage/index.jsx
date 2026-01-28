import Image from "next/image"
import React from "react"

const CustomImage = ({
  src,
  width,
  height,
  alt,
  className,
}) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt ? alt : "not found"}
      className={className}
      loading="eager"
    />
  )
}

export default CustomImage
