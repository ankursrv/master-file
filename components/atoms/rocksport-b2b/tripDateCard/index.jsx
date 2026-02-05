import Icons from "@/components/atoms/icons"
import { Button } from "@/components/atoms/rocksport-b2b/button"
import Typography from "@/components/molecules/typography/typography"
import React from "react"

const TripDateCard = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 backdrop-blur-[14px] mt-8 md:mt-6 border border-white/20 rounded-md w-full gap-4 md:gap-0">
      <div className="flex flex-row md:flex-col items-start md:gap-4">
        <div className="flex items-center gap-4 ld:gap-2">
          <Icons.CalenderIcon />
          <Typography variant="p" className="md:text-2xl font-semibold text-white whitespace-nowrap">
            TRIP DATE 
          </Typography>
        </div>
         <span className="inline-block sm:hidden mx-6px text-white">:</span>
        <Typography variant="h3" className=" text-white" font="secondary">
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
