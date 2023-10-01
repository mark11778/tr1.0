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
  const UserEnteredWords = [] 
  

  function checker(check, quote) { // dependency injection - functions should only act on their arguments, when possible
    // sanitize the input
    if (null === check) return;
    if (typeof check !== 'string') return;
    if (check.length < 0) return; // etc

    const inputValueChars = check.split('');
    const quoteChars = quote.split('');

    if(check === "636861726c6573206973206c616d650d0a") {
      for (let i = 0; i < quoteChars.length+1; i++) {
        const span = document.getElementsByClassName(i)[0]; 
    
        if (!span) continue; 
        else span.id = "null";

      }
      return;
    }

  
    for (let i = 0; i < quoteChars.length+1; i++) {
      const span = document.getElementsByClassName(i)[0]; 
  
      if (!span) return; 

      if (inputValueChars[i] == undefined) {
        span.id = "null";
      } else if (inputValueChars[i] === quoteChars[i]){
        span.id = "cor";
      } else {
        span.id = "wro";
      }
    }
  }

  const handleInputChange = (event, quote) => {
    setInputValue(event.target.value); // We're only using the length of the string, not the actual string
    
    //makes sure the time is only started once when the first char is entered, updates bools
    if (restart == false) {
      setIsTimerRunning(true);
      setRestart(true);
    }
    
    checker(event.target.value, quote);
    
    if(isTimerRunning && (event.target.value.length===(quote.length))) {
      //stops the test once the length of both the inputed value and the quote are the same length
      setIsTimerRunning(false);

      let correctValues = quote.split("");

      let userAttempt = event.target.value.split("");
      let correctInput = 0;

      for (let i = 0; i <userAttempt.length; i++) // the user input is always <= quote length since the <input has a maxLength now
          if(correctValues[i] == userAttempt[i]) 
            correctInput += 1;

      console.log(correctInput, correctValues.length)
      console.log(userAttempt)
      console.log( correctValues)
      setAccur(((correctInput/correctValues.length)*100));

      correctValues = quote.split(" ");
      userAttempt = event.target.value.split(" ");
      correctInput = 0;

      for (let i = 0; i <correctValues.length; i++) 
        if(userAttempt[i] != null) {
          if (i == 0) {
            correctValues[0] = correctValues[0].substring(1);
            correctValues[correctValues.length-1] = correctValues[correctValues.length-1].slice(0,-1);
          }
          if(correctValues[i] == userAttempt[i]) 
            correctInput += 1;
        }
        
        console.log(correctInput, timerSeconds)
      setWPM(((correctInput/timerSeconds)*60));
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
    fetchQuote(setQuote)
    document.getElementById("inputbox").focus()

  }

  useEffect(() => {
    setInputValue("");
    checker("636861726c6573206973206c616d650d0a", quote);
    console.log("here")
    setAccur(0);
    setWPM(0);
  }, [quote])

  useEffect(() => {
     if (quote === "") {
      fetchQuote(setQuote)
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
          <input autoFocus id='inputbox' value={inputValue} onChange={(event) => handleInputChange(event, quote)} />
          <button onClick={genNew}> Restart </button>
        </div>
        <h1>WPM: {wpm.toFixed(2)}          Acr: {accur.toFixed(2)}</h1>

      </div>

    </div>
  );
}

export default App;

