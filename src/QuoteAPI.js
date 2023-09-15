import React, { useState } from 'react';

function NewQuote({ getQuote, setGetQuote }) {
  const fetchQuote = () => {
    fetch('https://api.quotable.io/quotes/random')
      .then((res) => res.json())
      .then((data) => {
        setGetQuote(false)
        console.log("here")
        setQuote(data.map(item => JSON.stringify(item.content)));
      })
      .catch((er) => {
        console.log('error fetching quote: ', er);
      });
  };

  const [quote, setQuote] = useState(fetchQuote)

  return quote;// or return some JSX if needed
}

export default NewQuote;