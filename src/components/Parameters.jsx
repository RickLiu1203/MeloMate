import React from 'react'

function Parameters() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };

    return (
        <div className='flex flex-col justify-start items-start w-screen px-8'>
            <h1>Step 2: Set A Parameter</h1>
            <div className='flex flex-col items-center h-auto py-8 px-4 shadow-2xl w-5/6 rounded-3xl'>
            
                <select>
                    <option value='popularity'>Popularity</option>
                    <option value='energy'>Energy</option>
                    <option value='valence'>Positivity</option>
                    <option value='acousticness'>Acousticness</option>
                    <option value='instrumentalness'>Instrumentalness</option>
                    <option value='danceability'>Danceability</option>
                </select>
                <input
                type="range"
                min={0}
                max={100}
                step={20}
                />
            </div>
        </div>
    )
}

export default Parameters