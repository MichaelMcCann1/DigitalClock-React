import React from 'react'
import "./digit.css"

export default function Digit({number}) {
  return (
    <div className="digit">
      <div className={[0,2,3,5,6,7,8,9].includes(number) ? "top active" : "top"}></div>
      <div className={[0,1,2,3,4,7,8,9].includes(number) ? "topRight active" : "topRight"}></div>
      <div className={[0,1,3,4,5,6,7,8,9].includes(number) ? "bottomRight active" : "bottomRight"}></div>
      <div className={[0,2,6,8].includes(number) ? "bottomLeft active" : "bottomLeft"}></div>
      <div className={[0,4,5,6,8,9].includes(number) ? "topLeft active" : "topLeft"}></div>
      <div className={[2,3,4,5,6,8,9].includes(number) ? "middle active" : "middle"}></div>
      <div className={[0,2,3,5,6,8].includes(number) ? "bottom active" : "bottom"}></div>
    </div>
  )
}