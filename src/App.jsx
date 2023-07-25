import { useState, useEffect } from 'react';
import Search from './components/search';
import Recommends from './components/Recommends';
import Parameters from './components/Parameters';
import {FaGithub, FaMusic, FaMoon, FaSun} from 'react-icons/fa'

function App() {
  const [data, setData] = useState([{}])
  const [token, setToken] = useState('')

  const [seeds, setSeeds] = useState([])

  const [paramString, setParamString] = useState('')

  const [dark, setDark] = useState(false)

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth >= 1000 && screenWidth <= 1030) {
      document.body.scrollTop = 0;
    }
  }, [screenWidth]);

  const addParams = (params) => {
    setParamString(params)
  }

  const addSeed = (seed) => {
    if (seeds.length < 5){
      setSeeds(prevArray => [...prevArray, seed])
    }
  };

  const removeSeed = (seedId) => {
    setSeeds(prevSeeds => prevSeeds.filter(seeds => seeds !== seedId));
  };

  const toggleDark = () => {
    setDark(!dark)
  }
  
  useEffect(() => {
    console.log(paramString);
  }, [paramString]);

  useEffect(() => {
    fetch("http://localhost:5001/token")
      .then(res => res.text())
      .then(token => {
        setToken(token);
      })
      .catch(error => {
        console.error('Error fetching token:', error);
      });
  }, []);


  return (
    <html className={dark ? 'dark' : ''}>
      <div className='lg:fixed lg:h-screen bg-slate-100 dark:bg-slate-800 lg:overflow-hidden w-screen pb-6'>
        <div className='h-[8vh] lg:grid lg:grid-flow-col w-screen lg:pt-10 pt-12 lg:justify-center lg:gap-6 lg:px-0 md:px-10 px-6 flex flex-row justify-between lg:mb-8'>
            <div className='flex flex-row items-center lg:w-[30vw] text-slate-700 dark:text-slate-100 w-auto'>
              <h1 className='lg:text-4xl font-black me-2 sm:text-3xl text-2xl'>MeloMate </h1>
              <FaMusic className='md:text-2xl text-xl'/>
            </div>
            <div className='flex flex-col lg:w-[30vw]'>
              
            </div>
            <div className='flex flex-row lg:w-[30vw] lg:justify-end items-center gap-2 w-auto'> 
              <button className='sm:w-11 sm:h-11 bg-white rounded-full flex justify-center items-center shadow-lg hover:opacity-75 dark:bg-slate-600 h-9 w-9'
              onClick={toggleDark}>

                {dark ? 
                <FaSun className='sm:text-2xl text-slate-600 dark:text-slate-100 text-xl'/> :
                <FaMoon className='sm:text-2xl text-slate-600 dark:text-slate-100 text-xl'/>}

              </button>
              <a href='https://github.com/RickLiu1203/MeloMate' 
              target='_blank' className='flex sm:w-11 sm:h-11 justify-center items-center bg-white rounded-full shadow-lg hover:opacity-75 dark:bg-slate-600 w-9 h-9'> 
                <FaGithub className='sm:w-8 sm:h-8 text-slate-600 dark:text-slate-100 w-6 h-6'/>
              </a>
            </div>
        </div>
        <div className='grid lg:grid-flow-col w-screen lg:h-screen justify-center gap-6 overflow-hidden lg:pt-[1vh] pt-10 h-fit grid-flow-row'>
            <Search token={token} addSeed={addSeed} removeSeed={removeSeed} seeds={seeds}/>
            <Parameters addParams={addParams} removeSeed={removeSeed} seeds={seeds} token={token}/>
            <Recommends seeds={seeds} token={token} params={paramString}/>
        </div>
      </div>
    </html>
  );
}

export default App;
