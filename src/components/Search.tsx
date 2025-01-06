import React, { useState, useEffect } from 'react';
import Tracks from './Tracks';

interface SearchProps {
  token: string;
  addSeed: (seed: string) => void;
  seeds: string[];
}

const Search: React.FC<SearchProps> = (props) => {
  const [trackName, setTrackName] = useState<string>('');
  const [trackResults, setTrackResults] = useState<any[]>([]);

  useEffect(() => {
    const delay = 750;

    const timeoutId = setTimeout(() => {
      if (trackName.trim() !== '') {
        fetch(`http://localhost:5001/search?track_name=${trackName}&token=${props.token}`)
          .then(res => res.json())
          .then(trackResults => {
            setTrackResults(trackResults);
          })
          .catch(error => {
            console.error('Error fetching track results:', error);
          });
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [trackName, props.token]);

  return (
    <div className='flex flex-col w-screen lg:w-[30vw] lg:h-screen lg:px-0 md:px-10 h-auto px-6 lg:mb-0 mb-2'>
      <h1 className='font-extrabold text-xl mb-2 text-slate-600 dark:text-slate-100'>
        <span className='text-2xl font-black pe-2 text-green-400'>Step 1</span>
         Search For Tracks
      </h1>
      <div className='flex flex-col items-center justify-start lg:h-3/4 py-4 px-4 shadow-lg rounded-3xl gap-4 bg-white dark:bg-slate-700 h-96'>
        <input
                type="text"
                value={trackName}
                onChange={(e) => setTrackName(e.target.value)}
                placeholder="Search for a Track..."
                className='w-full p-2 px-4 bg-slate-100 rounded-full h-10 placeholder-slate-300 drop-shadow-md font-semibold
                 text-slate-600 outline-none dark:bg-slate-600 dark:text-slate-200 md:text-base text-sm'
            />
            <Tracks 
                data={trackResults} 
                handleClick={props.addSeed} 
                text={'Search Results'} 
                seeds={props.seeds} 
                clickText={'Added'} 
                isRecommend={false} 
                isSearch={true}
                isSeeds={false} 
                token={''}/>
      </div>
    </div>
  );
};

export default Search;
