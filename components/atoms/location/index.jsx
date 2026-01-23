import React from "react"
import Icons from "../icons"
import { cn } from "@/lib/utils"

const Location = ({
  city,
  day,
  dotted = true,
  devided,
  icon1,
  icon2,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-1 text-gray-600 text-sm mt-1", className)}>
      <p className="flex items-center gap-2">
        {icon1 && <Icons.Location />}
        {city}
      </p>
      {dotted ?
        <>
          {day &&
            <svg viewBox="0 0 6 6" aria-hidden="true" className="dotted size-1">
              <circle r="3" cx="3" cy="3"></circle>
            </svg>}
        </>
        :
        devided && <span className="w-[1px] h-3 mx-1 bg-green-800" />
      }
      <p className="flex items-center gap-2">
        {icon2 && <Icons.duration />}
        {day}
      </p>
    </div>
  )
}

export default Location
