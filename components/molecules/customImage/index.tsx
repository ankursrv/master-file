import React from "react";
import Image, { ImageProps } from "next/image";

interface CustomImageProps extends Omit<ImageProps, "alt"> {
  src: string;
  alt?: string;
  priority?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  ...props
}) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt || ""}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      {...props}
    />
  );
};

export default CustomImage;
