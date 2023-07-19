import { useState, useEffect } from 'react';
import Search from './components/search';
import Recommends from './components/Recommends';
import Parameters from './components/Parameters';
import {FaGithub} from 'react-icons/fa'

function App() {
  const [data, setData] = useState([{}])
  const [token, setToken] = useState('')

  const [seeds, setSeeds] = useState([])

  const [paramString, setParamString] = useState('')

  const addParams = (params) => {
    setParamString(params)
    console.log(paramString)
  }

  const addSeed = (seed) => {
    if (seeds.length < 5){
      setSeeds(prevArray => [...prevArray, seed])
    }
  };

  const removeSeed = (seedId) => {
    setSeeds(prevSeeds => prevSeeds.filter(seeds => seeds !== seedId));
  };
  

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
      <div className='overflow-hidden h-screen'>
        <div className='grid grid-flow-col w-screen h-20 pt-6 justify-center gap-6 overflow-hidden'>
            <div className='flex flex-col w-screen lg:w-[30vw]'>
              <h1 className='text-4xl font-black'>MeloMate</h1>
            </div>
            <div className='flex flex-col w-screen lg:w-[30vw]'>
              
            </div>
            <div className='flex flex-col w-screen lg:w-[30vw] items-end'> 
              <a href={'https://github.com/RickLiu1203/MeloMate'} 
              target={'_blank'} className='flex w-8 h-8 justify-center items-center'> 
                <FaGithub className='w-8 h-8 hover:opacity-60'/>
              </a>
            </div>
        </div>
        <div className='grid grid-flow-col w-screen h-screen pt-12 justify-center gap-6 overflow-hidden'>
            <Search token={token} addSeed={addSeed} removeSeed={removeSeed} seeds={seeds}/>
            <Parameters addParams={addParams} removeSeed={removeSeed} seeds={seeds} token={token}/>
            <Recommends seeds={seeds} token={token} params={paramString}/>
        </div>
      </div>
  );
}

export default App;
