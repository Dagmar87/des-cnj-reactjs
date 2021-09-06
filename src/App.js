import React, { useEffect, useState } from 'react';
import styles from './App.module.css'; 
import chuck from './chuck.png';

function App() {
  const [numJokes, setNumJokes] = useState(5);
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    fetch(`https://api.icndb.com/jokes/random/${numJokes}`)
    .then(resp => resp.json())
    .then(json => displayJokes(json))
    .catch(err => console.log(err)) 
  }, [numJokes]);

  const displayJokes = (data) => {
    setJokes(data.value)
  };

  const updateNumJokes = (evt) => {
    setNumJokes(parseInt(evt.target.value, 10));
  };

  const getContent = () => {
    return jokes.map((j, i) => {
      return <p key={j.id} dangerouslySetInnerHTML={{__html: `${i+1} ${j.joke}`}}></p>
    });
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Chuck Norris Jokes</h1>
        <img src={chuck} alt="" />  
      </header>
      <main>
        <div className={styles.num_jokes}>Select number of jokes</div>
        <select onChange={updateNumJokes}>
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
        </select>
        {
          getContent()         
        }
      </main>
    </div>
  );
}

export default App;
