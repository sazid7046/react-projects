import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newtours = tours.filter(tour => tour.id !== id);
    setTours(newtours)
  }

  const fetchTours = async () =>{
    setLoading(true);
    try{
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    }catch (err){
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTours();
  }, []);

  if(loading){
    return(
      <main>
        <Loading/>
      </main>
    )
  }
  if(tours.length === 0){
    return(
      <main>
        <h2>No tours left</h2>
        <button onClick={fetchTours}>refresh</button>
      </main>
    )
  }
  return(
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  )
}

export default App
