import React, { useState, useEffect } from 'react';
import Tracks from './Tracks';


function Seeds(props) {
  const [seedResults, setSeedResults] = useState({ tracks: [] });

  useEffect(() => {
    if (props.seeds.length > 0) {
      fetch(`http://localhost:5001/tracks?tracks=${props.seeds.join(',')}&token=${props.token}`)
        .then(res => res.json())
        .then(seeds => {
          setSeedResults(seeds);
        })
        .catch(error => {
          console.error('Error fetching track results:', error);
        });
    } else {
        setSeedResults({ tracks: [] })
    }
  }, [props.seeds]);

  return (
    <div className='flex flex-col items-start h-[55%] w-full p-4 rounded-3xl shadow-lg gap-2 bg-white'>
      <h2 className='font-extrabold'>Selected Tracks {props.seeds.length === 5 ? <span className='text-red-500'>({5 - props.seeds.length} Remaining)</span> : (<span>({5 - props.seeds.length} Remaining)</span>)}</h2>
      <Tracks data={seedResults.tracks} handleClick={props.removeSeed} 
            buttonText={'Remove'} seeds={props.seeds} 
            clickText={'Removing...'} isRecommend={false} isSeeds={true}
            isSearch={false} token={''}/>
    </div>
  );
}

export default Seeds;
