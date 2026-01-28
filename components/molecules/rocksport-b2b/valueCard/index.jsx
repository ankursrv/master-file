import React from "react"
import CustomImage from "../../customImage"
import Typography from "../../typography/typography"
import { cn } from "@/lib/utils"

const ValueCard = ({
  data,
  className
}) => {
  return (
    <section className={cn(!className ? "grid lg:grid-cols-3 gap-10 mt-[60px]" : className)}>
      {data.map((item, index) => (
        <div key={index} className="bg-white-crest border border-dark-tone-ink/20 rounded-xl p-6 flex flex-col gap-6 items-center text-center">
          <div className="size-[72px] bg-sea-nettle flex items-center justify-center rounded-full">
            <CustomImage
              src={item.image}
              width={1000}
              height={1000}
              alt="gain icon"
              className="size-9"
            />
          </div>
          <div>
            <Typography variant="h4">
              {item.title}
            </Typography>
            <Typography variant="p" className="text-dark-tone-ink/80 font-normal mt-5">
              {item.description}
            </Typography>
          </div>
        </div>
      ))}
    </section>
  )
}

export default ValueCard
