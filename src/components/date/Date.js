import React from 'react'
import "./date.css"

export default function DateInfo({month, day, year}) {
  return (
    <div className="date">
      <div className="month">
        <p>{month}</p>
      </div>
      <div className="day">
        <p>{day}</p>
      </div>
      <div className="year">
        <p>{year}</p>
      </div>
    </div>
  )
}