import { useState, useEffect } from 'react';
import Search from './components/search';
import Recommends from './components/Recommends';
import Parameters from './components/Parameters';
import {FaGithub, FaMusic, FaMoon} from 'react-icons/fa'

function App() {
  const [data, setData] = useState([{}])
  const [token, setToken] = useState('')

  const [seeds, setSeeds] = useState([])

  const [paramString, setParamString] = useState('')

  const [dark, setDark] = useState(true)

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
      <div className='h-screen overflow-scroll smh:overflow-hidden bg-slate-100 dark:bg-slate-800'>
        <div className='grid grid-flow-col w-screen pt-10 justify-center gap-6'>
            <div className='flex flex-row items-center  w-screen lg:w-[30vw] text-slate-700 dark:text-slate-100'>
              <h1 className='text-4xl font-black me-2'>MeloMate </h1>
              <FaMusic className='text-2xl'/>
            </div>
            <div className='flex flex-col w-screen lg:w-[30vw]'>
              
            </div>
            <div className='flex flex-row  w-screen lg:w-[30vw] justify-end gap-2'> 
              <button className='w-11 h-11 bg-white rounded-full flex justify-center items-center shadow-lg hover:opacity-75 dark:bg-slate-600'
              onClick={toggleDark}>
                <FaMoon className='text-2xl text-slate-600 dark:text-slate-100'/>
              </button>
              <a href='https://github.com/RickLiu1203/MeloMate' 
              target='_blank' className='flex w-11 h-11 justify-center items-center bg-white rounded-full shadow-lg hover:opacity-75 dark:bg-slate-600'> 
                <FaGithub className='w-8 h-8 text-slate-600 dark:text-slate-100'/>
              </a>
            </div>
        </div>
        <div className='grid grid-flow-col w-screen h-screen justify-center gap-6 overflow-hidden pt-4 smh:pt-10'>
            <Search token={token} addSeed={addSeed} removeSeed={removeSeed} seeds={seeds}/>
            <Parameters addParams={addParams} removeSeed={removeSeed} seeds={seeds} token={token}/>
            <Recommends seeds={seeds} token={token} params={paramString}/>
        </div>
      </div>
    </html>
  );
}

export default App;
