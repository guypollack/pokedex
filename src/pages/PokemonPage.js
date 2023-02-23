import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, selectAllPokemonFetched ,selectAllPokemon } from '../features/pokemon/pokemonSlice.js';
import { NavBar } from '../components/NavBar/NavBar.js'

export function PokemonPage() {
  const dispatch = useDispatch();
  const { number } = useParams();
  const allPokemonFetched = useSelector(selectAllPokemonFetched);
  // const {name, url, imageUrl} = useSelector(selectAllPokemon)[number];
  let name;
  let url;
  let imageUrl;
  
  useEffect(() => {
    if (!allPokemonFetched) {
      dispatch(fetchAllPokemonAsync());
    }
  },[allPokemonFetched])


  return (
    <div>
      <NavBar />
      {/* <h1>{name}</h1> */}
      <div className="pokemon-data-container">
        {/* <img src={imageUrl}></img> */}
      </div>
    </div>
  )
}