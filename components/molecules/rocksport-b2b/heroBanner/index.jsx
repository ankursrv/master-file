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
        priority
        className="object-cover -z-10"        
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111B8] via-[#111111B8] to-transparent -z-10" />

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
