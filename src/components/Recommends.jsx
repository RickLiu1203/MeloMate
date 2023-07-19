import React, { useState, useEffect } from 'react'
import Tracks from './Tracks';

function Recommends(props) {
    const [recommends, setRecommends] = useState([]);
    const getRecommends = () => {
        if(props.seeds){
            console.log(props.params)
            fetch(`http://localhost:5001/recommendations?tracks=${props.seeds.join(',')}&token=${props.token}&params=${encodeURIComponent(props.params)}`)
            .then(res => res.json())
            .then(recommends => {
              setRecommends(recommends.tracks);
              console.log(recommends)
            })
            .catch(error => {
              console.error('Error fetching track results:', error);
            });
        }
    };

  return (
    <div className='flex flex-col w-screen lg:w-[30vw] lg:h-screen'>
        <h1 className='font-extrabold text-lg w-full'>Step 3: Get Recommendations</h1>
        <div className='flex flex-col items-center h-3/4 p-4 shadow-xl w-full rounded-3xl gap-2'>
          <button onClick={() => getRecommends()} className='bg-green-400 p-2 text-sm rounded-full mt-4 font-bold hover:opacity-80 text-white self-start justify-self-end h-10'>
            Get New Recommendations
          </button> 
          <Tracks data={recommends} handleClick={''} 
          buttonText={''} seeds={props.seeds} 
          clickText={''} isRecommend={true} isSeeds={false}
          isSearch={false} token={props.token}/>
        </div>
    </div>
  )
}

export default Recommends