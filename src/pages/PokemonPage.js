import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllPokemon } from '../features/pokemon/pokemonSlice.js';
import { NavBar } from '../components/NavBar/NavBar.js'

export function PokemonPage() {
  const { number } = useParams();
  const {name, url, imageUrl} = useSelector(selectAllPokemon)[number];
  
  useEffect(() => {
    // console.log(name);
  })

  return (
    <div>
      <NavBar />
      <h1>{number}</h1>
      <h2>This is the pokemon page</h2>
    </div>
  )
}