import React, { useRef } from 'react';

function Tracks(props) {

  return (
    <>
      {props.data.length > 0 ? (
        <div className="flex flex-col object-contain w-full gap-4 pt-6 h-full overflow-scroll">
          {props.data.map((track, index) => (
            <div className="flex flex-row justify-between px-2 items-center" key={track.id}>
              <div className="flex flex-row w-3/4 me-2">
                <img src={track.album.images[2].url} className="h-[48px] w-[48px] rounded-lg me-4" alt="Album Art" />
                <div className="flex flex-col w-2/3">
                  <span className="font-extrabold truncate overflow-hidden">{track.name}</span>
                  <div className='truncate'>
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
              <button onClick={() => props.handleClick(track.id)}>{props.buttonText}</button> :
              <p>Added</p>
              )}

              {props.isSeeds && (props.seeds.includes(track.id) ?
              <button onClick={() => props.handleClick(track.id)}>{props.buttonText}</button> :
              <p>Removing...</p>
              )}
            </div>
          ))}
        </div>
      ):
      <div className="flex flex-col object-contain w-full gap-4 pt-6 h-full overflow-scroll bg-slate-300 rounded-xl">

      </div>
    }
    </>
  );
}

export default Tracks;
