import Location from "@/components/atoms/location"
import VerifiedBadge from "@/components/atoms/verifiedBadge"
import Wishlist from "@/components/atoms/wishlist"
import SuperPower from "@/components/molecules/superPower"
import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"

const BaseCard = ({
  cardStyle,
  borderColor,
  baseImage,
  imageContainerStyle,
  rounded,
  supercoin,
  superPower,
  children,
  cardEdges,
  verified,
  wishlist,
}) => {
  return (
    <div
      className={cn(
        "border overflow-hidden relative",
        cardEdges ? "p-4" : "p-0",
        borderColor ? borderColor : "border-gray-400",
        cardStyle,
        rounded ? rounded : "rounded-xl",
        supercoin && "flex flex-col"
      )}>
      {/* Image Section  */}
      <div className="relative">
        <div className={cn(imageContainerStyle ? imageContainerStyle : "aspect-[4/3] h-[222px]")}>
          <Image
            src={baseImage}
            width={400}
            height={400}
            alt="not found"
            className="responsive-image-cover"
          />
        </div>

        {/* Super Power  */}
        {superPower && <SuperPower />}
        {wishlist && <Wishlist />}
        {verified && 
          <VerifiedBadge verified={verified} />
        }
      </div>

      {/* Card Content  */}
      <div className={cn("flex-grow flex-col justify-between flex",
        cardEdges ? "p-0 mt-4" : "p-4"
      )}>
        {children}
      </div>
      {supercoin &&
        <div className={cn("bg-green-800 flex items-center justify-center gap-2 h-[33px]",
          cardEdges ? "-mx-4 -mb-4 mt-4" : ""
        )}>
          <Image
            src="/images/supercoin-icon2.webp"
            width={16}
            height={16}
            alt="not found"
          />
          <span className="text-white text-center block">Supercoin</span>
        </div>}
    </div>
  )
}

const ActivityCard = ({
  title,
  city,
  day,
  ...props
}) => (
  <BaseCard {...props}>
    <div className="">
      <p className="text-lg font-semibold line-clamp-2 text-ellipsis">{title}</p>
    </div>
    <Location
      city={city}
      day={day}
    />
    {/* Pricing  */}
    <div className="flex items-center justify-between mt-3">
      <div>
        <p className="font-semibold text-lg">₹ 1,000</p>
        <p className="text-gray-400 text-sm">Per Person Onwards</p>
      </div>      
      <button className="bg-orange-600 text-white rounded-full px-5 py-2 font-semibold border border-orange-600 hover:bg-white hover:text-orange-600 transition-all duration-300">Discover</button>
    </div>
  </BaseCard>
)

const OnlyTitle = (props) => (
  <BaseCard {...props}>
    <p>This Card is Show Only Title </p>
  </BaseCard>
)

const LocationAndDuration = ({
  city,
  day,
  ...props
}) => (
  <BaseCard {...props}>
    <Location
      city={city}
      day={day}
    />
  </BaseCard>
)

const Card = ({ variant = "activityCard", ...props }) => {
  switch (variant) {
    case "activityCard":
      return <ActivityCard {...props} />
    case "onlyTitle":
      return <OnlyTitle {...props} />
    case "locationAndDuration":
      return <LocationAndDuration {...props} />
    default:
      return null
  }
}

export default Card
