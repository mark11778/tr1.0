// Cursor.js
import React, { useState, useEffect } from 'react';
import './Cursor.css';

function Cursor({ input }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500); // Adjust the blinking speed as needed

    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <span id='cursorPos'>{input}</span>
      <span
        className={`cursor ${isVisible ? 'visible' : ''}`}
      >
        &nbsp;
      </span>
    </div>
  );
}

export default Cursor;
