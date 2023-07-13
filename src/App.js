import React, { useState, useEffect } from 'react';
import Timer from './Timer';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsTimerRunning(true);
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
      <div>Please type this as fast as you can.</div>
      <input id='inputbox' value={inputValue} onChange={handleInputChange} />
      <Timer isRunning={isTimerRunning} onSecondsChange={handleSecondsChange} />
      <div>Timer Seconds: {timerSeconds}</div>
    </div>
  );
}

export default App;

