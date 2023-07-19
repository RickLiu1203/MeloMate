import React, {useState, useEffect} from 'react'
import params from '../params.json'
import Seeds from './Seeds';

function Parameters(props) {
    const [selectedOption, setSelectedOption] = useState('none');
    const [selectedValue, setSelectedValue] = useState(1);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(55);
  
    const handleListChange = (event) => {
        setSelectedOption(event.target.value);
        if(selectedOption !== 'none'){
            const selectedOptionParams = params[event.target.value];
            setSelectedValue(1);
            setMinValue(selectedOptionParams[0].max); 
            setMaxValue(selectedOptionParams[1].max); 
        }
      };
  
      const handleBarChange = (event) => {
            const selectedOptionParams = params[selectedOption];
            const selectedSliderValue = parseInt(event.target.value);
            setSelectedValue(selectedSliderValue);
            setMinValue(selectedOptionParams[selectedSliderValue-1].max); 
            setMaxValue(selectedOptionParams[selectedSliderValue].max); 
      };
  
    useEffect(() => {
        if(selectedOption === 'none'){
            props.addParams('');
        } else{
            props.addParams(`&min_${selectedOption}=${minValue}&max_${selectedOption}=${maxValue}`);
        }
    }, [minValue, maxValue, selectedOption]);
  
    return (
      <div className='flex flex-col w-screen lg:w-[30vw] lg:h-screen'>
        <h1 className='font-extrabold text-lg mb-2'>
          <span className='text-2xl font-black pe-2 text-green-400'>Step 2</span>
          Set Your Inputs
        </h1>        
        <div className='flex flex-col h-3/4 justify-between'>
          <Seeds seeds={props.seeds} token={props.token} removeSeed={props.removeSeed}/>
          <div className='flex flex-col shadow-lg rounded-3xl h-[43%] p-4 bg-white'>
              <h2 className='font-extrabold'>Select A Parameter (Optional)</h2>
              <select value={selectedOption} onChange={handleListChange} className='px-0'>
                  <option value='none'>None</option>
                  <option value='popularity'>Popularity</option>
                  <option value='energy'>Energy</option>
                  <option value='valence'>Positivity</option>
                  <option value='acousticness'>Acousticness</option>
                  <option value='instrumentalness'>Instrumentalness</option>
              </select>
              {selectedOption !== 'none' ? <input
                  type='range'
                  min={1}
                  max={5}
                  value={selectedValue}
                  onChange={handleBarChange}
            /> :
            <h1>Default Recommendations (No Parameters Selected)</h1>}
          </div>
          </div>
      </div>
    );
  }
  

export default Parameters