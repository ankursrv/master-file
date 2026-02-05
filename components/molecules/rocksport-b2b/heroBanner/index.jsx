import React from "react"
import Typography from "../../typography/typography"
import TripDateCard from "@/components/atoms/rocksport-b2b/tripDateCard"
import CustomImage from "../../customImage"

const HeroBanner = () => {
  return (
    <div className="landing-banner relative overflow-hidden">
      <CustomImage
        src="/images/rocksport-b2b-images/banner/banner.webp"
        alt="Students participating in Rocksport In-school Program adventure activities at DPS RK Puram"
        fill
        className="responsive-image-cover"        
      />
      <div className="absolute bottom-0 w-full h-1/2 md:h-full bg-fade-down md:bg-fade-right" />

      <div className="container flex flex-col justify-end h-full relative z-10">
        <div className="w-full md:w-[589px]">
          <Typography variant="h1" className="text-white uppercase text-shadow-soft" font="secondary">
            <span className="text-theme-primary">Rocksport In-school Program</span><br className="md:hidden" /><span className="hidden md:inline"> </span>with DPS RK Puram
          </Typography>
          <TripDateCard />
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
