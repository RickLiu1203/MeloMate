import React, { useRef } from 'react';
import {FaCheck, FaTimes, FaTrash, FaPlus} from 'react-icons/fa'

function Tracks(props) {

  return (
    <>
      {props.data.length > 0 ? (
        <div className="flex flex-col object-contain w-full gap-4 py-4 h-auto overflow-scroll bg-slate-100 rounded-xl box-border shadow-md text-slate-600 dark:bg-slate-600 dark:text-slate-200">
          {props.data.map((track, index) => (
            <div className="flex flex-row justify-between px-4 items-center" key={track.id}>
              <div className="flex flex-row w-3/4 me-2">
                <img src={track.album.images[2].url} className="md:h-[44px] md:w-[44px] rounded-lg me-4 h-[38px] w-[38px]" alt="Album Art" />
                <div className="flex flex-col w-2/3 overflow-hidden">
                  <span className="font-bold truncate overflow-hidden md:text-base text-sm">
                    {track.name}
                  </span>
                  <div className='truncate md:text-sm text-xs font-semibold'>
                    {track.artists.map((artist, artistIndex) => (
                      <span key={artist.id}>
                        {artist.name}
                        {artistIndex !== track.artists.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {props.isRecommend && (
                <a href={track.external_urls.spotify} target={'_blank'}>
                  <img src={'/Spotify_Icon_RGB_Green.png'} className='w-8 h-8 hover:opacity-70'/>
                </a>
              )}

              {props.isSearch && (!props.seeds.includes(track.id) ?
                <button onClick={() => props.handleClick(track.id)}
                className='flex items-center justify-center bg-green-400 rounded-full text-white text-lg font-medium hover:opacity-75 w-11 h-7'>
                  <FaPlus/>
                </button> :
                <p className='flex items-center justify-center border-solid border-green-400 border-2 rounded-full py-1 px-3 text-green-400 font-medium w-11 h-7'>
                  <FaCheck/>
                </p>
              )}

              {props.isSeeds && (props.seeds.includes(track.id) ?
              <button onClick={() => props.handleClick(track.id)}
              className='flex justify-center items-center bg-red-500 rounded-full text-white text-xl font-medium hover:opacity-75 w-11 h-7'>
                <FaTimes/>
              </button> :
              <p className='flex flex-row items-center justify-center border-solid border-red-500 border-2 rounded-full text-red-500 font-medium w-11 h-7'>
                <FaTrash/>
              </p>
              )}
            </div>
          ))}
        </div>
      ):
      <div className="flex flex-col items-center justify-center w-full gap-4 pt-6 h-full overflow-scroll bg-slate-100 rounded-xl px-4 shadow-md dark:bg-slate-600">
        {!(props.isRecommend && (props.handleClick === true)) ? 
        <h1 className='text-center text-xl font-medium text-slate-300 dark:text-slate-200'>
          {props.text}&nbsp;Will Show Up Here
        </h1> : 
        <h1 className='text-center text-xl font-medium text-slate-300'>
          No Recommendations Found<br/>(Try Selecting New Parameters)
        </h1>}
      </div>
    }
    </>
  );
}

export default Tracks;
