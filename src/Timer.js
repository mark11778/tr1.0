import React, { useEffect, useState } from 'react';

function Timer({ isRunning, onSecondsChange }) {
  const [seconds, setSeconds] = useState(0);

  // this useEffect will execute when the isRunning var is changed 
  useEffect(() => {
    let intervalId = null;

    // if the timer is running the second varible will be updated at an interval of 1000 milliseconds
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);


  /*
  this useEffect hook listens to the second varible for when it changes and updates the second val
  calls the onSecondsChange function in the app file to update the seconds that are being displayed
  */
  useEffect(() => {
    onSecondsChange(seconds);
  }, [seconds, onSecondsChange]);


  return (
    <div>
      <div>{seconds}</div>
    </div>
  );
}

export default Timer;



