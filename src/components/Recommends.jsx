import React, { useState, useEffect } from 'react'
import Tracks from './Tracks';

function Recommends(props) {
    const [recommends, setRecommends] = useState([]);
    const [click, setClick] = useState(false)

    const getRecommends = () => {
        if(props.seeds.length > 0){
            console.log(props.params)
            fetch(`http://localhost:5001/recommendations?tracks=${props.seeds.join(',')}&token=${props.token}&params=${encodeURIComponent(props.params)}`)
            .then(res => res.json())
            .then(recommends => {
              setRecommends(recommends.tracks);
              setClick(true);
              console.log(recommends)
            })
            .catch(error => {
              console.error('Error fetching track results:', error);
            });
        }
    };

  return (
    <div className='flex flex-col w-screen lg:w-[30vw] lg:h-screen h-auto lg:px-0 md:px-10 px-6 lg:mb-0 mb-8'>
        <h1 className='font-extrabold lg:text-lg w-full mb-2 text-slate-600 dark:text-slate-100 text-xl'> 
          <span className='text-2xl font-black pe-2 text-green-400'>Step 3</span> 
          Get Recommendations
        </h1>
        <div className='flex flex-col items-center justify-between lg:h-3/4 p-4 shadow-lg w-full rounded-3xl gap-2 bg-white dark:bg-slate-700 h-96'>
          <Tracks data={recommends} handleClick={click} 
          text={'Recommendations'} seeds={props.seeds} 
          clickText={''} isRecommend={true} isSeeds={false}
          isSearch={false} token={props.token}/>
          <button onClick={() => getRecommends()} 
          className='bg-green-400 py-2 px-4 text-sm rounded-full font-bold hover:opacity-80 text-white self-start justify-self-end h-10 mt-2 shadow-md'>
            Get New Recommendations
          </button> 
        </div>
    </div>
  )
}

export default Recommends