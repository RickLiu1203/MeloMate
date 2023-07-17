import { useState, useEffect } from 'react';
import Search from './components/search';
import Recommends from './components/Recommends';
import Parameters from './components/Parameters';

function App() {

  const [data, setData] = useState([{}])
  const [token, setToken] = useState('')

  const [seeds, setSeeds] = useState([])

  const addSeed = (seed) => {
    if (seeds.length < 5){
      setSeeds(prevArray => [...prevArray, seed])
    }
  };

  const removeSeed = (seedId) => {
    setSeeds(prevSeeds => prevSeeds.filter(seeds => seeds !== seedId));
  };
  

  useEffect(() => {
    console.log(seeds); // Log the updated `seeds` state
  }, [seeds]);

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
   <div className='flex flex-col h-screen items-center gap-3 justify-start pt-8'>
      <Search token={token} addSeed={addSeed} removeSeed={removeSeed} seeds={seeds}/>
      <Parameters />
      <Recommends seeds={seeds} token={token}/>
   </div>
  );
}

export default App;
