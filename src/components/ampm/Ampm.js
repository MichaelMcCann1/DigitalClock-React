import React from 'react'
import "./ampm.css"

export default function Ampm({ampm}) {
  return (
    <div className="ampm">
      <p className={ampm === "AM" ? "AM active" : "AM"}>AM</p>
      <p className={ampm === "PM" ? "PM active" : "PM"}>PM</p>
    </div>
  )
}