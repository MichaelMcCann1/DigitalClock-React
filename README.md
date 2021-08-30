# DigitClock-React

I created a digital clock using ReactJS. This project is the same as the digital clock I made [here with vanilla JavaScript](https://github.com/MichaelMcCann1/DigitalClock). The functionality between the two are the same except this one is made with React. Please refer to the other repository for a more in-depth explination on how the code works. 


<img src="https://github.com/MichaelMcCann1/DigitalClock/blob/main/DigitalClockScreenshot.png" height="300px">



## Code Explination

Two state variables are used to keep track of the data. The first is `time` which keeps track of all the time data. The second is `wordArray` which keeps track of what I call a "Word Array" (see my other post for more info).

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

### Create Word Array

The Word Array is created by using another useEffect hook. The dependency array depends on the `time` variable. The function to create the Word Array is the same is in the vanilla JS version. 

``` javascript 
useEffect(() => {
  let workingWordArray = createWordArray()
  setWordArray(workingWordArray)
  }, [time])
```

### JSX Markup

The JSX markup that is returned by App.js is shown below. There are three React components that are used. The first is `DateInfo` which displays the date by using the passed in month, day, and year props. The second is `Digit` which is contains the line segments needed to create a digit on the clock. The appropriate word form of a number is passed in as a prop to each Digit component. And finally there is `Ampm` which displays whether it is Am or PM by using the passed in ampm prop. 

``` JSX
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
```

### Digit Component

The digit component consists of all the line segments needed to create a digit on the clock. The only prop that is passed to this component is the word form of the number that the digit needs to display. For instance, if 4 needed to be displayed then 'four' would be passed in as a prop. This prop is called 'number' inside the component.

To color in the appropriate line segments a ternary operator is used. The code below shows the markup for one of the line segments in the Digit component. If the number prop is included in the list of numbers for the line segment then the class of "active" is added. Otherwise it keeps the appropriate class to describe which line segment it is.  The CSS then changes the color of any line segment with a class of "active" to red.

``` JSX
<div className={"zero two three five six seven eight nine".includes(number) ? "top active" : "top"}></div>
```
