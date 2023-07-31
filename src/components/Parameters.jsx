import React, {useState, useEffect} from 'react'
import { Listbox } from '@headlessui/react'
import params from '../params.json'
import Seeds from './Seeds';
import {FaArrowsAltV, FaGlobeAmericas, FaCheck, FaBatteryQuarter, FaBatteryFull, FaMicrophoneAlt, FaGuitar} from 'react-icons/fa'
import {BsSoundwave} from 'react-icons/bs'
import {FaPerson,FaPersonCircleMinus} from 'react-icons/fa6'
import {CgPiano} from 'react-icons/cg'
import {IoFootsteps} from 'react-icons/io5'

function Parameters(props) {
  const [selectedOption, setSelectedOption] = useState('none');
  const [selectedValue, setSelectedValue] = useState(3);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(55);

  const options = ['none', 'popularity', 'energy', 'danceability', 'acousticness', 'instrumentalness']

  const icons = {
    "popularity": {"min": <FaPerson/>, "max": <FaGlobeAmericas/>},
    "energy": {"min": <FaBatteryQuarter/>, "max": <FaBatteryFull/>},
    "danceability": {"min": <FaPersonCircleMinus/>, "max": <IoFootsteps/>},
    "acousticness": {"min": <BsSoundwave/>, "max": <FaGuitar/>},
    "instrumentalness": {"min": <FaMicrophoneAlt/>, "max": <CgPiano/>}
  }

    const handleBarChange = (event) => {
          const selectedOptionParams = params[selectedOption];
          const selectedSliderValue = parseInt(event.target.value);
          setSelectedValue(selectedSliderValue);
          setMinValue(selectedOptionParams[selectedSliderValue-1]); 
          setMaxValue(selectedOptionParams[selectedSliderValue]); 
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
      setMinValue(selectedOptionParams[2]); 
      setMaxValue(selectedOptionParams[3]); 
    }
  }, [selectedOption])

  return (
    <div className='flex flex-col w-screen lg:w-[30vw] lg:h-screen h-fit lg:px-0 md:px-10 px-6 lg:mb-0 mb-2'>
      <h1 className='font-extrabold lg:text-lg mb-2 text-slate-600 dark:text-slate-100 text-xl'>
        <span className='text-2xl font-black pe-2 text-green-400'>Step 2</span>
        Set Your Inputs
      </h1>        
      <div className='flex flex-col h-3/4 justify-between lg:gap-0 gap-4'>
        
        <Seeds seeds={props.seeds} token={props.token} removeSeed={props.removeSeed}/>
        
        <div className='relative flex flex-col shadow-lg rounded-3xl lg:h-[43%] p-4 bg-white gap-2 dark:bg-slate-700 h-72'>
            <h2 className='font-extrabold text-slate-600 dark:text-slate-100'>Select A Parameter</h2>
            <div className='flex flex-col items-center justify-between h-5/6'>
            <Listbox value={selectedOption} onChange={setSelectedOption}>
              
              <Listbox.Button
              className='flex flex-row justify-between items-center relative w-full cursor-default rounded-lg bg-slate-100 py-2 pl-3 pr-3 
              text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 
              focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
              focus-visible:ring-offset-orange-300 text-sm shadow-md hover:opacity-75 font-semibold text-slate-600 mb-4 dark:bg-slate-600 dark:text-slate-200'>
                {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
              <FaArrowsAltV
                className="h-4 w-4"
              />
              </Listbox.Button>
              
              <Listbox.Options className="absolute mt-11 h-[62%] max-h-56 w-[calc(100%-2rem)] overflow-auto rounded-lg bg-slate-100
              font-semibold shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm z-10 dark:bg-slate-600">
                {options.map((option) => (
                  <Listbox.Option
                    key={options.indexOf(option)}
                    value={option}
                    className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-4 ${
                      active ? 'bg-green-100 text-green-400 font-extrabold dark:bg-green-400 dark:text-slate-100' : 'text-slate-600 dark:text-slate-200'
                    }`
                  }
                  >
                      {option === selectedOption ?                     
                      <div className='flex flex-row items-center gap-1 text-green-400 font-extrabold dark:text-slate-100'>
                        <FaCheck/>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </div> : 
                      <div className='flex flex-row items-center gap-1'>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </div>
                      }

                  </Listbox.Option>
                ))}
              </Listbox.Options>
           
            </Listbox>
            
              {selectedOption !== 'none' ? 
                  <div className='flex flex-row justify-center w-full gap-4 dark:bg-transparent' data-theme='slider'>
                    
                    <div className='flex justify-center items-end h-1/2'>
                      {selectedValue === 1 ? 
                      <div className='text-green-400 text-2xl'>{icons[selectedOption].min}</div> :
                      <div className='text-slate-400 dark:text-slate-200 text-2xl'>{icons[selectedOption].min}</div>
                      }     
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
                      <div className="w-full flex justify-between text-xs px-2.5 font-black text-slate-300 mt-1">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                      </div>
                    </div>
                    
                    <div className='flex justify-center items-end h-1/2 pt-6'>
                      {selectedValue === 5 ? 
                      <div className='text-green-400 text-2xl'>{icons[selectedOption].max}</div> :
                      <div className='text-slate-400 dark:text-slate-200 text-2xl'>{icons[selectedOption].max}</div>
                      }
                    </div>
                  
                  </div> :
              <h1 className='text-slate-600 font-semibold text-center dark:text-slate-200'>Get Default Recommendations (No Parameters Selected)</h1>}
              {selectedOption === 'none' ?<div className='h-1/6'></div> : 
              <h1 className='text-sm text-slate-600 font-semibold text-center px-4 py-2 rounded-xl shadow-md bg-slate-100 dark:bg-slate-600 dark:text-slate-200'>
                {selectedOption !== 'none' && (params[selectedOption]['description'])}
                </h1>}
              </div>
        </div>
        </div>
    </div>
  );
}
  

export default Parameters