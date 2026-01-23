import React from "react"

const Location = ({ city, day }) => {
  return (
    <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
      <p>{city}</p>
      { day &&
        <span>
          <svg viewBox="0 0 6 6" aria-hidden="true" className="dotted size-1">
            <circle r="3" cx="3" cy="3"></circle>
          </svg>
        </span>}
      <p>{day}</p>
    </div>
  )
}

export default Location
