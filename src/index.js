import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


function App() {
  const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setWildPokemon] = useState([]);

  useEffect (() => {
    encounterWildPokemon()  // eslint-disable-next-line 
  }, [])

  const pokeId = () => {
    const min = Math.ceil(1)
    const max = Math.floor(151)
    return Math.floor(Math.random() * (max-min + 1 )) + min
  }

  const encounterWildPokemon = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/'+ pokeId())
      .then(response => {
        setWildPokemon(response.data);
      })
  }

  const catchPokemon = (pokemon) => {
    setPokedex(state => {
      const monExists = (state.filter(p => pokemon.id === p.id).length > 0);

      if(!monExists) {
       state = [...state, pokemon]
       state.sort(function(a, b){
         return a.id - b.id
               })
      }
      return state;
    });
    encounterWildPokemon();
  }

  const releasePokemon = id => { // eslint-disable-next-line
    setPokedex(state => state.filter(p => p.id != id)) 
  }



  return (
    <div className='app-wrapper'>

  <header>

  </header>
  <h2>Wild Encounter</h2>

<div className='wild-pokemon'>
    <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"} alt={wildPokemon.name} className = "sprite"/>
    <h2>{wildPokemon.name}</h2>
    <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH</button>
  </div>
 
  <section className='pokedex'>
    <h2>Pokedex</h2>

   
   
 
<div class='card'>
      {pokedex.map(pokemon => (
        <div class='pokemon' key={pokemon.id}>
          
      <img class="card-img-top"src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} alt={pokemon.name} className = "sprite"/>
   <h3 class="card-header">{pokemon.name}</h3>
   <button className='remove' onClick={() => releasePokemon(pokemon.id)}>&times;</button>
   </div>
      ))}
</div> 


   </section>
  

    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));