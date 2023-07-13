import React, { useEffect, useState } from 'react';

function Timer({ isRunning, onSecondsChange }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId = null;

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



