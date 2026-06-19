import React from "react";

interface ScheduleItem {
  time: string;
  schedule: string;
}

interface ScheduleTrackProps {
  data?: ScheduleItem[];
}

const ScheduleTrack = ({ data = [] }: ScheduleTrackProps) => {
  return (
    <div className="bg-light px-4 py-5 lg:p-8 rounded-lg">
      <p className="text-xl font-bold border-b border-dark-50 pb-6 mb-6">
        Schedule
      </p>

      <ul className="space-y-5">
        {data.map((item, index) => (
          <li
            key={index}
            className="text-dreamless-sleep text-sm opacity-80 flex gap-1"
          >
            <span className="block min-w-16">{item.time}</span>
            <p>{item.schedule}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleTrack;
