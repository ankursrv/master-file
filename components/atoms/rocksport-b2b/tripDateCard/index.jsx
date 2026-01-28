import Icons from "@/components/atoms/icons"
import { Button } from "@/components/atoms/rocksport-b2b/button"
import Typography from "@/components/molecules/typography/typography"
import React from "react"

const TripDateCard = () => {
  return (
    <div className="flex items-center justify-between p-6 backdrop-blur-[14px] mt-6 border border-white/20 rounded-md w-full">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <Icons.CalenderIcon />
          <Typography variant="p" className="text-2xl font-semibold text-white">
            TRIP DATE
          </Typography>
        </div>
        <Typography variant="h5" className="" font="secondary">
          15 JAN 2026
        </Typography>
      </div>
      <Button 
      variant="fillPrimary"
      icon={<Icons.arrowRight />}
      >
        Book Now
      </Button>
    </div>
  )
}

export default TripDateCard
