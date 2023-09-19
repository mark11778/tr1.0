import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import fetchQuote from './QuoteAPI';
import './styles.css';
import Cursor from './Cursor';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [restart, setRestart] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [quote, setQuote] = useState("");
  const [wpm, setWPM] = useState(0);
  const [accur, setAccur] = useState(0);
  

  function checker(check) {
    const inputValueChars = check.split('');
    const quoteChars = quote.split('');
  
    for (let i = 0; i < quoteChars.length+1; i++) {
      const span = document.getElementsByClassName(i)[0]; // Get the specific span element
  
      if (span) {
        if (inputValueChars[i] == undefined) {
          span.id = "null";
        } else if (inputValueChars[i] === quoteChars[i]){
          span.id = "cor";
        } else {
          span.id = "wro";
        }
      }
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    //makes sure the time is only started once when the first char is entered, updates bools
    if (restart == false) {
      setIsTimerRunning(true);
      setRestart(true);
    }
    checker(event.target.value);
    if(isTimerRunning && (event.target.value.length===(JSON.stringify(quote).length)-2)) {
    //stops the test once the length of both the inputed value and the quote are the same length
      setIsTimerRunning(false);
      let arr = JSON.stringify(quote).split("");
      arr.shift();
      arr.pop();
      let arr2 = event.target.value.split("");
      let cnt = 0;
      for (let i = 0; i <arr.length; i++) 
        if(arr2[i] != null) 
          if(arr[i] == arr2[i]) 
            cnt += 1;
          
      setAccur(((cnt/arr.length)*100));
      arr = JSON.stringify(quote).split(" ");
      arr2 = event.target.value.split(" ");
      cnt = 0;

      for (let i = 0; i <arr.length; i++) 
        if(arr2[i] != null) {
          if (i == 0) {
            arr[0] = arr[0].substring(1);
            arr[arr.length-1] = arr[arr.length-1].slice(0,-1);
          }
          if(arr[i] == arr2[i]) 
            cnt += 1;
        }
        
        console.log(cnt, timerSeconds)
      setWPM(((cnt/timerSeconds)*60));
    }
  };

  

  //updates the seconds being displayed when the useEffect in the timer files calls this function
  const handleSecondsChange = (seconds) => {
    if (seconds !== timerSeconds) {
      setTimerSeconds(seconds);
    }
  };

  const genNew = () => {
    setRestart(false);
    setIsTimerRunning(false);
    setInputValue("");
    checker("");
    fetchQuote(setQuote)
    document.getElementById("inputbox").focus()
    setAccur(0);
    setWPM(0);
  }

  useEffect(() => {
     if (quote === "") {
      fetchQuote(setQuote)
      document.getElementById("inputbox").focus()
     }
  }, []);

    // Wrap each character in the quote with <span> elements
    const quoteWithSpans = quote.split('').map((letter, index) => (
      <span key={index} className={index}>
      {letter}     
    </span>
  ));


    return (
      <div>
        <div id="everything">
          <div id="quoteStuff">
            <div id="Quote">
              <Cursor input={quote.slice(0,inputValue.length)} />
              {quoteWithSpans}
            </div>

            <div id="timer">
              <Timer isRunning={isTimerRunning} onSecondsChange={handleSecondsChange} restart={restart} />
            </div>
          </div>



        <div id="inputbar">
          <input id='inputbox' value={inputValue} onChange={handleInputChange} />
          <button onClick={genNew}> Restart </button>
        </div>
        <h1>WPM: {wpm.toFixed(2)}          Acr: {accur.toFixed(2)}</h1>

      </div>

    </div>
  );
}

export default App;

