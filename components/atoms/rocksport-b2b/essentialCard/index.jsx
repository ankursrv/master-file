import React from "react"
import CustomImage from "@/components/molecules/customImage"
import Typography from "@/components/molecules/typography/typography"
import { cn } from "@/lib/utils"

const EssentialCard = ({
  title,
  items,
  imageSrc,
  bgColor = "bg-black",
  imagePosition
}) => {
  return (
    <div className={cn("relative overflow-hidden min-h-[500px] lg:min-h-[600px] p-8 lg:p-12 flex flex-col", bgColor)}>
      <Typography
        variant="h2"
        font="secondary"
        className="uppercase text-white mb-8"
      >
        {title}
      </Typography>

      <div className="grid grid-cols-2 gap-4 lg:gap-6 relative z-10">
        {items.map((item) => (
          <span key={item.id} className="text-white/70 lg:text-lg !leading-none">
            {item.id}. {item.text}
          </span>
        ))}
      </div>

      <div className={cn(imagePosition ? "absolute -bottom-36" : "absolute bottom-0", "left-0 right-0 w-full")}>
        <CustomImage
          src={imageSrc}
          width={1000}
          height={600}
          alt={`${title} image`}
          className="responsive-image-cover"
        />
      </div>
    </div>
  )
}

export default EssentialCard