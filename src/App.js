import React, { useState, useEffect } from 'react';
import Timer from './Timer';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [string, setString] = useState("Please type this as fast as you can.");
  const [wpm, setWPM] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log((event.target.value==string))
    setIsTimerRunning(true);
    if(event.target.value===string) {
      setIsTimerRunning(false);
      const arr = string.split(" ");
      setWPM(((arr.length/timerSeconds)*60))
      setString={setString}
    }
    console.log(isTimerRunning);
  };

  const handleSecondsChange = (seconds) => {
    if (seconds !== timerSeconds) {
      setTimerSeconds(seconds);
      // Do something with the seconds value
      
    }
  };

  // useEffect(() => {
  //   console.log(inputValue);
  // }, [inputValue]);


  return (
    <div>
      <div>{string}</div>
      <input id='inputbox' value={inputValue} onChange={handleInputChange} />
      <Timer isRunning={isTimerRunning} onSecondsChange={handleSecondsChange} />
      <h1>WPM: {wpm}</h1>
      
    </div>
  );
}

export default App;

