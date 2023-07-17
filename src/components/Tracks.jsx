import React from 'react'

function Tracks(props) {
  return (
    <>
    {props.data.length > 0 && (
        <div className='flex flex-col w-full gap-4 overflow-scroll'>
          {props.data.map((track, index) => (
            <div className='flex flex-row justify-between px-4' key={track.id}>
                <div className='flex flex-row gap-4'>
                <img src={track.album.images[2].url} className='h-[64px] w-[64px] rounded-lg' alt='Album Art' />
                <div className='flex flex-col'>
                    <span className='font-extrabold'>
                        {track.name}
                    </span>
                    <div>
                    {track.artists.map((artist, artistIndex) => (
                        <span key={artist.id}>
                        {artist.name}
                        {artistIndex !== track.artists.length - 1 && ", "}
                        </span>
                    ))}
                    </div>
                </div>
              </div>
                <button onClick={() => props.handleClick(track.id)}>{props.buttonText}</button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Tracks