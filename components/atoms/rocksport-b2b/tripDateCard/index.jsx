import Icons from "@/components/atoms/icons"
import { Button } from "@/components/atoms/rocksport-b2b/button"
import Typography from "@/components/molecules/typography/typography"
import React from "react"

const TripDateCard = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 backdrop-blur-[14px] mt-6 border border-white/20 rounded-md w-full gap-4 md:gap-0">
      <div className="flex flex-row md:flex-col items-start gap-2 md:gap-4">
        <div className="flex items-center gap-2">
          <Icons.CalenderIcon />
          <Typography variant="p" className="text-xl md:text-2xl font-semibold text-white whitespace-nowrap">
            TRIP DATE 
          </Typography>
        </div>
        <Typography variant="h5" className="text-xl md:text-3xl" font="secondary">
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
