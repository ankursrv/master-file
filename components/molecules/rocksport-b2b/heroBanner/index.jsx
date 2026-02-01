import React from "react"
import Typography from "../../typography/typography"
import TripDateCard from "@/components/atoms/rocksport-b2b/tripDateCard"

const HeroBanner = () => {
  return (
    <div className="landing-banner">
      <div className="container flex flex-col justify-end h-full">
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
