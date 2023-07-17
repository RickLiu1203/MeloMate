import React, { useState, useEffect } from 'react';
import Seeds from './Seeds';
import Tracks from './Tracks';

function Search(props) {
  const [trackName, setTrackName] = useState('');
  const [trackResults, setTrackResults] = useState([]);

  useEffect(() => {
    const delay = 750; // Delay in milliseconds

    const timeoutId = setTimeout(() => {
      if (trackName.trim() !== '') {
        fetch(`http://localhost:5001/search?track_name=${trackName}&token=${props.token}`)
          .then(res => res.json())
          .then(trackResults => {
            setTrackResults(trackResults);
            console.log(trackResults);
          })
          .catch(error => {
            console.error('Error fetching track results:', error);
          });
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [trackName, props.token]);

  return (
    <>
    <h1>Step 1: Select Your Tracks</h1>
    <div className='flex flex-col items-center bg-slate-400 h-auto w-5/6 py-4'>
        <input
            type="text"
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)}
            placeholder="Search for a track..."
            className='w-full px-4 mb-4'
        />
        <Tracks data={trackResults} handleClick={props.addSeed} 
            buttonText={'Add'} seeds={props.seeds} 
            clickText={'Added'} isSeeded={false}/>
    </div>
    <h2>Selected Tracks</h2>
    <Seeds seeds={props.seeds} token={props.token} removeSeed={props.removeSeed}/>
    </>
  );
}

export default Search;
