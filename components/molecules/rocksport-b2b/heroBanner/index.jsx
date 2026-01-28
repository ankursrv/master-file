import React from "react"
import Typography from "../../typography/typography"
import TripDateCard from "@/components/atoms/rocksport-b2b/tripDateCard"

const HeroBanner = () => {
  return (
    <div className="landing-banner">
      <div className="container flex flex-col justify-end h-full">
       <div className="w-[589px]">
          <Typography variant="h1" className="text-white text-shadow-soft" font="secondary">
            <span className="text-theme-primary">Rocksport In-school</span> with DPS RK Puram
          </Typography>
          <TripDateCard />
       </div>
      </div>
    </div>
  )
}

export default HeroBanner
