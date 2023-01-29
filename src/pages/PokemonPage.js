import React from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../components/NavBar.js'

export function PokemonPage() {
  const { pokemonName } = useParams();
  return (
    <div>
      <NavBar />
      <h1>{pokemonName}</h1>
      <h2>This is the pokemon page</h2>
    </div>
  )
}