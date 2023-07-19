import React, { useState, useEffect } from 'react';
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
    <div className='flex flex-col w-screen lg:w-[30vw] lg:h-screen'>
      <h1 className='font-extrabold text-2xl'>Step 1: Search For Tracks</h1>
      <div className='flex flex-col items-center justify-between h-3/4 py-4 px-4 shadow-xl rounded-3xl gap-2'>
        <input
                type="text"
                value={trackName}
                onChange={(e) => setTrackName(e.target.value)}
                placeholder="Search for a track..."
                className='w-full p-2 px-4 bg-slate-100 rounded-full mt-4 h-10'
            />
            <Tracks data={trackResults} handleClick={props.addSeed} 
                buttonText={'Add'} seeds={props.seeds} 
                clickText={'Added'} isRecommend={false} isSearch={true}
                isSeeds={false} token={''}/>
      </div>
    </div>
  );
}

export default Search;
