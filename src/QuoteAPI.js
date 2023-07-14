import React, {useState} from 'react';

function NewQuote({ setString }) {

    useEffect(() => {
        fetchQuote();
      }, []);

    const fetchQuote = () => {
    fetch('https://api.quotable.io/quotes/random')
        .then(res => res.json())
        .then(data => {
            const quoe = data.content;
            setSelectionRange(quote);
        })
        .catch(er => {
            console.log('error fetching quote: ', er);
        });
    };

}

export default NewQuote;