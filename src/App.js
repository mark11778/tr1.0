import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import NewQuote from './QuoteAPI';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [restart, setRestart] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [getQuote, setGetQuote] = useState(true);
  const quote = " "
  const [wpm, setWPM] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (restart == false) {
      setIsTimerRunning(true);
      setRestart(true);
    }
    
    if(isTimerRunning && (event.target.value.length===(JSON.stringify(quote).length)-6)) {
      setIsTimerRunning(false);
      let arr = JSON.stringify(quote).split(" ");
      let arr2 = event.target.value.split(" ");
      let cnt = 0;
      for (let i = 0; i <arr.length; i++) 
        if(arr2[i] != null) 
          if(arr[i] == arr2[i]) 
            cnt += 1;
            else console.log(arr[i],arr2[i])
          
      setWPM(((cnt/timerSeconds)*60));
      console.log(cnt, arr.length);
    }
  };

  const handleSecondsChange = (seconds) => {
    if (seconds !== timerSeconds) {
      setTimerSeconds(seconds);
    }
  };

  const genNew = () => {
    setRestart(false);
    setIsTimerRunning(false);
    setInputValue("");
  }

  return (
    <div>
      <NewQuote getQuote={getQuote} setGetQuote={setGetQuote}/>
      <input id='inputbox' value={inputValue} onChange={handleInputChange} />
      <button onClick={genNew}> Restart </button>
      <Timer isRunning={isTimerRunning} onSecondsChange={handleSecondsChange} restart={restart} />
      <h1>WPM: {wpm}</h1>
    </div>
  );
}

export default App;

