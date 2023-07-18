import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay} from '@fortawesome/free-solid-svg-icons';

function Tracks(props) {

  return (
    <>
      {props.data.length > 0 && (
        <div className="flex flex-col w-full gap-4 overflow-scroll">
          {props.data.map((track, index) => (
            <div className="flex flex-row justify-between px-4 items-center" key={track.id}>
              <div className="flex flex-row gap-4">
                <img src={track.album.images[2].url} className="h-[64px] w-[64px] rounded-lg" alt="Album Art" />
                <div className="flex flex-col">
                  <span className="font-extrabold">{track.name}</span>
                  <div>
                    {track.artists.map((artist, artistIndex) => (
                      <span key={artist.id}>
                        {artist.name}
                        {artistIndex !== track.artists.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {props.isRecommend ? (
                <a href={track.external_urls.spotify} target={'_blank'}>
                  <img src={'../../public/Spotify_Icon_RGB_Green.png'} className='w-10 h-10 hover:opacity-70'/>
                </a>
              ) : (
                <button onClick={() => props.handleClick(track.id)}>{props.buttonText}</button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Tracks;
