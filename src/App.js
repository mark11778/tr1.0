import React, { useState, useEffect } from 'react';
import Timer from './Timer';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [restart, setRestart] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [string, setString] = useState("");
  const [wpm, setWPM] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

    //makes sure the time is only started once when the first char is entered, updates bools
    if (restart == false) {
      setIsTimerRunning(true);
      setRestart(true);
    }

    //stops the test once the length of both the inputed value and the quote are the same length
    if(isTimerRunning && (event.target.value.length===(JSON.stringify(string).length)-6)) {
      setIsTimerRunning(false);
      let arr = JSON.stringify(string).split(" ");
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

  //updates the seconds being displayed when the useEffect in the timer files calls this function
  const handleSecondsChange = (seconds) => {
    if (seconds !== timerSeconds) {
      setTimerSeconds(seconds);
    }
  };

  // move this to another file, make sure it returns a stirng in the right format
  const fetchQuote = () => {
    fetch('https://api.quotable.io/quotes/random')
      .then((res) => res.json())
      .then((data) => setString(data.map(item => JSON.stringify(item.content))))
      .catch((er) => {
        console.log('error fetching quote: ', er);
      });
  };

  const genNew = () => {
    setRestart(false);
    setIsTimerRunning(false);
    setInputValue("");
    //this call is redundant with the useEffect method below
    fetchQuote();
  }

  useEffect(() => {
    if (string == "") {
      fetchQuote();
    }
  }, [string]);


  return (
    <div>
      <div>{string}</div>
      <input id='inputbox' value={inputValue} onChange={handleInputChange} />
      <button onClick={genNew}> Restart </button>
      <Timer isRunning={isTimerRunning} onSecondsChange={handleSecondsChange} restart={restart} />
      <h1>WPM: {wpm}</h1>
      
    </div>
  );
}

export default App;

