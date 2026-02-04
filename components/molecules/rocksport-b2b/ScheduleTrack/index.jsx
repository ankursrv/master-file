import React from "react"
import Typography from "../../typography/typography"

const ScheduleTrack = ({data=[]}) => {
  return (
    <>
      <div className="bg-baby-powder px-6 py-5 lg:p-8 rounded-lg">
        <Typography variant="p" className="text-xl font-bold border-b border-black/[12%] pb-6 mb-6">
          Schedule
        </Typography>
        <ul>
          {data.map((item, index) => (
            <li key={index} className="text-dreamless-sleep text-sm opacity-80 mb-3 last:mb-0 flex gap-1">
              <span className="block min-w-16">{item.time}</span>
              <span>{item.schedule}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ScheduleTrack
