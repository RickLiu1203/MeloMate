import React, { useState, useEffect } from 'react';
import Tracks from './Tracks';

interface SeedsProps {
  token: string;
  seeds: string[];
  removeSeed: (seedId: string) => void;
}

interface SeedResults {
  tracks: any[];
}

const Seeds: React.FC<SeedsProps> = (props) => {
  const [seedResults, setSeedResults] = useState<SeedResults>({ tracks: [] });

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
        setSeedResults({ tracks: [] });
    }
  }, [props.seeds, props.token]);

  return (
    <div className='flex flex-col items-start lg:h-[55%] w-full p-4 rounded-3xl shadow-lg gap-2 bg-white dark:bg-slate-700 h-80'>
      <h2 className='font-extrabold text-slate-600 dark:text-slate-100'>
        Selected Tracks {props.seeds.length === 5 ? <span className='text-red-500'>({5 - props.seeds.length} Remaining)</span> : (<span>({5 - props.seeds.length} Remaining)</span>)}
      </h2>
      <Tracks 
        data={seedResults.tracks} 
        handleClick={props.removeSeed} 
        text={'Your Selected Tracks'} 
        seeds={props.seeds} 
        clickText={'Removing...'} 
        isRecommend={false} 
        isSeeds={true}
        isSearch={false} 
        token={''}
      />
    </div>
  );
};

export default Seeds;
