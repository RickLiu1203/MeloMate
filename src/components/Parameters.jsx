import React, {useState, useEffect} from 'react'
import { Listbox } from '@headlessui/react'
import params from '../params.json'
import Seeds from './Seeds';
import {FaArrowsAltV, FaGlobeAmericas} from 'react-icons/fa'
import {BsFire} from 'react-icons/bs'
import {FaPerson} from 'react-icons/fa6'

function Parameters(props) {
  const [selectedOption, setSelectedOption] = useState('none');
  const [selectedValue, setSelectedValue] = useState(3);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(55);

  const options = ['none', 'popularity', 'energy', 'valence', 'acousticness', 'instrumentalness']

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

  useEffect(() => {
    if(selectedOption !== 'none'){
      const selectedOptionParams = params[selectedOption];
      setSelectedValue(3);
      setMinValue(selectedOptionParams[2].max); 
      setMaxValue(selectedOptionParams[3].max); 
    }
  }, [selectedOption])

  return (
    <div className='flex flex-col w-screen lg:w-[30vw] lg:h-screen'>
      <h1 className='font-extrabold text-lg mb-2 text-slate-600'>
        <span className='text-2xl font-black pe-2 text-green-400'>Step 2</span>
        Set Your Inputs
      </h1>        
      <div className='flex flex-col h-3/4 justify-between'>
        <Seeds seeds={props.seeds} token={props.token} removeSeed={props.removeSeed}/>
        
        <div className='relative flex flex-col shadow-lg rounded-3xl h-[43%] p-4 bg-white gap-2'>
            <h2 className='font-extrabold text-slate-600'>Select A Parameter</h2>
            <div className='flex flex-col items-center justify-between h-5/6'>
            <Listbox value={selectedOption} onChange={setSelectedOption}>
              <Listbox.Button
              className='flex flex-row justify-between items-center relative w-full cursor-default rounded-lg bg-slate-100 py-2 pl-3 pr-3 
              text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 
              focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
              focus-visible:ring-offset-orange-300 sm:text-sm shadow-md hover:opacity-75 font-semibold text-slate-600 mb-4'>
                {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
              <FaArrowsAltV
                className="h-4 w-4"
              />
              </Listbox.Button>
              
              <Listbox.Options className="absolute mt-11 h-[62%] w-[calc(100%-2rem)] overflow-auto rounded-lg bg-slate-100
              font-semibold shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                {options.map((option) => (
                  <Listbox.Option
                    key={options.indexOf(option)}
                    value={option}
                    className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-4 ${
                      active ? 'bg-green-100 text-green-500 font-extrabold' : 'text-slate-600'
                    }`
                  }
                  >
                    
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
            
              {selectedOption !== 'none' ? 
                  <div className='flex flex-row justify-center w-full gap-4' data-theme='slider'>
                    <div className='flex justify-center items-end h-1/2'>
                      <FaPerson className='text-slate-400 text-2xl'/>
                    </div>
                    <div className='flex flex-col w-3/4'>
                      <input
                          type='range'
                          min={1}
                          max={5}
                          value={selectedValue}
                          onChange={handleBarChange}
                          className='range range-primary'
                      />
                      <div className="w-full flex justify-between text-xs px-2.5 font-bold text-slate-300 mt-1">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                      </div>
                    </div>
                    <div className='flex justify-center items-end h-1/2 pt-6'>
                      <FaGlobeAmericas className='text-slate-400 text-2xl'/>
                    </div>
                  </div> :
              <h1 className='text-slate-600 font-semibold text-center'>Get Default Recommendations (No Parameters Selected)</h1>}
              {selectedOption === 'none' ?<div className='h-1/6'></div> : <h1 className='text-sm text-slate-600 font-semibold text-center px-4 py-2 rounded-xl shadow-md bg-slate-100'>{selectedOption !== 'none' && (params[selectedOption]['description'])}</h1>}
              </div>
        </div>
        </div>
    </div>
  );
}
  

export default Parameters