# DigitClock-React

**Live Link to Project: https://mm-digitalclock-react.web.app/**

I created a digital clock using ReactJS. This project is the same as the digital clock I made [here with vanilla JavaScript](https://github.com/MichaelMcCann1/DigitalClock). The functionality between the two are the same except this one is made with React. Please refer to the other repository for a more in-depth explanation on how the code works. 


<img src="https://github.com/MichaelMcCann1/DigitalClock/blob/main/DigitalClockScreenshot.png" height="300px">



## Code Explination

Two state variables are used to keep track of the data. The first is `time` which keeps track of all the time data. The second is `timeArray` which stores the current time where each digit is an element in an array. For example the time of 5:12:09 would produce a timeArray of `[0,5,1,2,0,9]`

``` javascript
const [time, setTime] = useState({})
const [wordArray, setWordArray] = useState([])
```

### Get Data
To get the `time` data the `useEffect` hook is used. The dependency array is empty which means that it will only run once on the initial render. Inside the function there is a setInterval method that runs every 200ms. This is where all the data is received from the `Date` object. The UseEffect hook returns the `clearInterval()` method. This prevents a new interval being created every time the component updates.

``` javascript
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
```

### Create Time Array

The Time Array is created by using another useEffect hook. The dependency array depends on the `time` variable. To create the array the values of the hours, minutes, and seconds are added to the placeholder variable `workingTimeArray`. 

* If the value is a single digit (less than 10) then a zero is added first. Then the value is added to the array.
``` javascript 
if (data.hours <= 9) {
      workingTimeArray.push(0)
      workingTimeArray.push(data.hours)
}
```

* If the number is two digits then the first digit is selected by using the floor method of the Math object. The value is divided by 10 to make it a single digit decimal number (e.g 34/10 = 3.4) and then the floor function is used to round it down to a whole number (e.g Math.floor(3.4) = 3). The result will always be the first digit of the initial two-digit number `workingTimeArray.push(Math.floor(data.hours/10))`.

* To get the second digit the modulo operator (%) is used. Any number modulo 10 will always result in the last digit of the number `workingTimeArray.push(data.hours%10)`. 

The resulting `workingTimeArray` is then used to update `timeArray` with `setTimeArray(workingTimeArray)`

``` javascript 
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
```

### JSX Markup

The JSX markup that is returned by App.js is shown below. There are three React components that are used. The first is `DateInfo` which displays the date by using the passed in month, day, and year props. The second is `Digit` which is contains the line segments needed to create a digit on the clock. The appropriate number is passed in as a prop to each Digit component. And finally there is `Ampm` which displays whether it is Am or PM by using the passed in ampm prop. 

``` JSX
return (
    <div className="clock">
      <DateInfo month={time.month} day={time.date} year={time.year}/>
      <div className="time">
        <Digit number={timeArray[0]}/>
        <Digit number={timeArray[1]}/>
        <div className="colon">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <Digit number={timeArray[2]}/>
        <Digit number={timedArray[3]}/>
        <div className="colon">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <Digit number={timedArray[4]}/>
        <Digit number={timeArray[5]}/>
        <Ampm ampm={time.ampm}/>
      </div>
    </div>
  );
```

### Digit Component

The digit component consists of all the line segments needed to create a digit on the clock. The only prop that is passed to this component is the number that the digit needs to display. This prop is called 'number' inside the component.

To color in the appropriate line segments a ternary operator is used. The code below shows the markup for one of the line segments in the Digit component. If the number prop is included in the list of numbers for the line segment then the class of "active" is added. Otherwise it keeps the appropriate class to describe which line segment it is.  The CSS then changes the color of any line segment with a class of "active" to red.

``` JSX
<div className={[0,2,3,5,6,7,8,9].includes(number) ? "top active" : "top"}></div>
```
