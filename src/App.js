import React, { useState, useEffect } from 'react';
import './App.css';
import Digit from './components/digit/Digit';
import Ampm from './components/ampm/Ampm';
import DateInfo from './components/date/Date';

function App() {

  const [time, setTime] = useState({})
  const [wordArray, setWordArray] = useState([])

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
      if (data.hours <= 9) data.hours = `0${data.hours}`
      if (data.minutes <= 9) data.minutes = `0${data.minutes}`
      if (data.seconds <= 9) data.seconds = `0${data.seconds}`
  
      data.hours = data.hours.toString()
      data.minutes = data.minutes.toString()
      data.seconds = data.seconds.toString()
  
      let numberString = (data.hours + data.minutes + data.seconds)
      let workingWordArray = []
      let numbers = ['zero','one','two','three','four','five','six','seven','eight','nine'];
  
      for (let i=0; i<numberString.length; i++){
        workingWordArray.push(numbers[numberString[i]])
      }
      setWordArray(workingWordArray)
    }
  }, [time])


  return (
    <div className="clock">
      <DateInfo month={time.month} day={time.date} year={time.year}/>
      <div className="time">
        <Digit number={wordArray[0]}/>
        <Digit number={wordArray[1]}/>
        <div className="colon">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <Digit number={wordArray[2]}/>
        <Digit number={wordArray[3]}/>
        <div className="colon">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <Digit number={wordArray[4]}/>
        <Digit number={wordArray[5]}/>
        <Ampm ampm={time.ampm}/>
      </div>
    </div>
  );
}

export default App;