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
    <div className='flex flex-col items-center bg-slate-400 h-auto w-5/6 py-4'>
      <Tracks data={seedResults.tracks} handleClick={props.removeSeed} 
            buttonText={'Remove'} seeds={props.seeds} 
            clickText={'Removing...'} isRecommend={false} token={''}/>
    </div>
  );
}

export default Seeds;
