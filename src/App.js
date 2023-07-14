import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import NewQuote from './QuoteAPI';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [string, setString] = useState("");
  const [wpm, setWPM] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsTimerRunning(true);
    console.log(JSON.stringify(string).length, event.target.value.length)
    if(isTimerRunning && (event.target.value.length===(JSON.stringify(string).length)-6)) {
      setIsTimerRunning(false);
      let arr = JSON.stringify(string).split(" ");
      setWPM(((arr.length/timerSeconds)*60))
    }
    console.log(isTimerRunning);
  };

  const handleSecondsChange = (seconds) => {
    if (seconds !== timerSeconds) {
      setTimerSeconds(seconds);
      console.log(string);
    }
  };

  const fetchQuote = () => {
    fetch('https://api.quotable.io/quotes/random')
      .then((res) => res.json())
      .then((data) => setString(data.map(item => JSON.stringify(item.content))))
      .catch((er) => {
        console.log('error fetching quote: ', er);
      });
  };

  useEffect(() => {
    if (string == "") {
      fetchQuote();
    }
  }, [string]);


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

