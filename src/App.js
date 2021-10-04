import React, { useState, useEffect } from 'react';
import './App.css';
import Digit from './components/digit/Digit';
import Ampm from './components/ampm/Ampm';
import DateInfo from './components/date/Date';

function App() {

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const [time, setTime] = useState({})
  const [timeArray, setTimeArray] = useState([])

  useEffect(() => {
    const clockInterval = setInterval(() => {
      let date = new Date();
      let data = {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
      };

      let months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
      data.month = months[data.month];

      data.hours < 12 ? data.ampm = 'AM' : data.ampm = "PM";
      if (data.hours !== 12) data.hours = data.hours % 12;
      if (data.hours === 0) data.hours = 12;

      setTime(data)
    }, 200);

    return () => {
      clearInterval(clockInterval)
    };
    
  }, [])

  useEffect(() => {
    let data = time
    if (Object.keys(data).length !== 0) {
      let workingTimeArray = []
      if (data.hours <= 9) {
        workingTimeArray.push(0)
        workingTimeArray.push(data.hours)
      } else {
        workingTimeArray.push(Math.floor(data.hours/10))
        workingTimeArray.push(data.hours%10)
      }
      
      if (data.minutes <= 9) {
        workingTimeArray.push(0)
        workingTimeArray.push(data.minutes)
      } else {
        workingTimeArray.push(Math.floor(data.minutes/10))
        workingTimeArray.push(data.minutes%10)
      }

      if (data.seconds <= 9) {
        workingTimeArray.push(0)
        workingTimeArray.push(data.seconds)
      } else {
        workingTimeArray.push(Math.floor(data.seconds/10))
        workingTimeArray.push(data.seconds%10)
      }
      setTimeArray(workingTimeArray)
    }
  }, [time])


  return (
    <div className="clock">
      <a className="githubLink" href="https://github.com/MichaelMcCann1/DigitalClock-React"><img src="Images/GitHub.svg"></img></a>
      <DateInfo month={time.month} day={time.date} year={time.year}/>
      <div className="time">
        <Digit number={timeArray[0]}/>
        <Digit number={timeArray[1]}/>
        <div className="colon">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <Digit number={timeArray[2]}/>
        <Digit number={timeArray[3]}/>
        <div className="colon">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <Digit number={timeArray[4]}/>
        <Digit number={timeArray[5]}/>
        <Ampm ampm={time.ampm}/>
      </div>
    </div>
  );
}

export default App;