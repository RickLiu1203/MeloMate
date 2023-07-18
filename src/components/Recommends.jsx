import React, { useState, useEffect } from 'react'
import Tracks from './Tracks';

function Recommends(props) {
    const [recommends, setRecommends] = useState({});
    const getRecommends = () => {
        if(props.seeds){
            fetch(`http://localhost:5001/recommendations?tracks=${props.seeds.join(',')}&token=${props.token}`)
            .then(res => res.json())
            .then(recommends => {
              setRecommends(recommends);
              console.log(recommends)
            })
            .catch(error => {
              console.error('Error fetching track results:', error);
            });
        }
    };

  return (
    <div className='flex flex-col justify-start w-screen items-start px-16'>
        <h1>Step 3: Get Your Recommendations</h1>
        <div className='flex flex-col items-center h-auto py-8 px-4 shadow-2xl w-full rounded-3xl'>
        {recommends.tracks && (   
            <Tracks data={recommends.tracks} handleClick={''} 
            buttonText={''} seeds={props.seeds} 
            clickText={''} isRecommend={true} token={props.token}/>) 
        }
        </div>
        <button onClick={() => getRecommends()} className={'pb-8'}>recommend</button>
    </div>
  )
}

export default Recommends