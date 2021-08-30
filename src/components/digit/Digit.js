import React from 'react'
import "./digit.css"

export default function Digit({number}) {
  return (
    <div className="digit">
      <div className={"zero two three five six seven eight nine".includes(number) ? "top active" : "top"}></div>
      <div className={"zero one two three four seven eight nine".includes(number) ? "topRight active" : "topRight"}></div>
      <div className={"zero one three four five six seven eight nine".includes(number) ? "bottomRight active" : "bottomRight"}></div>
      <div className={"zero two six eight".includes(number) ? "bottomLeft active" : "bottomLeft"}></div>
      <div className={"zero four five six eight nine".includes(number) ? "topLeft active" : "topLeft"}></div>
      <div className={"two three four five six eight nine".includes(number) ? "middle active" : "middle"}></div>
      <div className={"two zero three five six eight".includes(number) ? "bottom active" : "bottom"}></div>
    </div>
  )
}