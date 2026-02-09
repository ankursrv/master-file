import Image from "next/image"
import React from "react"

const CustomImage = ({
  src,
  width,
  height,
  alt,
  className,
  priority = false,
  loading = "lazy",
  ...props
}) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt || ""}
      className={className}
      {...(priority ? { priority: true } : { loading })}
      {...props}
    />
  )
}

export default CustomImage