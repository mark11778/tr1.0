import React, { useState, useEffect } from 'react';
import Timer from './Timer';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [restart, setRestart] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [quote, setQuote] = useState("");
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

  const fetchQuote = () => {
    fetch('https://api.quotable.io/quotes/random')
      .then((res) => res.json())
      .then((data) => setQuote(data.map(item => JSON.stringify(item.content))))
      .catch((er) => {
        console.log('error fetching quote: ', er);
      });
  };

  const genNew = () => {
    setRestart(false);
    setIsTimerRunning(false);
    
    fetchQuote();
    setInputValue("");
  }

  useEffect(() => {
    // if (quote == "") {
    //   console.log("here")
      fetchQuote();
    // }
  }, []);


  return (
    <div>
      <div>{quote}</div>
      <input id='inputbox' value={inputValue} onChange={handleInputChange} />
      <button onClick={genNew}> Restart </button>
      <Timer isRunning={isTimerRunning} onSecondsChange={handleSecondsChange} restart={restart} />
      <h1>WPM: {wpm}</h1>
      
    </div>
  );
}

export default App;

