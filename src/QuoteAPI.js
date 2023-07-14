import React, { useEffect } from 'react';

function NewQuote({ setString }) {
  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch('https://api.quotable.io/quotes/random')
      .then((res) => res.json())
      .then((data) => {
        const quote = data.content;
        setString(quote);
      })
      .catch((er) => {
        console.log('error fetching quote: ', er);
      });
  };

  return null; // or return some JSX if needed
}

export default NewQuote;