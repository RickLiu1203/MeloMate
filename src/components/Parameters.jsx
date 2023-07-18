import React, {useState} from 'react'

function Parameters() {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedValue, setSelectedValue] = useState(0);

    const [scale, setScale] = useState(0);
    const [offset, setOffset] = useState(0);

    const handleListChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleBarChange = (event) => {
        setSelectedValue(parseInt(event.target.value));
      };

    return (
        <div className='flex flex-col justify-start items-start w-screen px-8'>
            <h1>Step 2: Set A Parameter</h1>
            <div className='flex flex-col items-center h-auto py-8 px-4 shadow-2xl w-5/6 rounded-3xl'>
            
                <select value={selectedOption} onChange={handleListChange}>
                    <option value='popularity'>Popularity</option>
                    <option value='energy'>Energy</option>
                    <option value='valence'>Positivity</option>
                    <option value='acousticness'>Acousticness</option>
                    <option value='instrumentalness'>Instrumentalness</option>
                </select>
                <input
                type="range"
                min={0}
                max={100}
                step={20}
                value={selectedValue}
                onChange={handleBarChange}
                />
                <p>Selected value: {selectedValue}</p>
            </div>
        </div>
    )
}

export default Parameters