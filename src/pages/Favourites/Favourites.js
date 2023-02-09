import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, fetchPokemonTypesAsync, selectAllPokemon } from '../../features/pokemon/pokemonSlice';
import { selectFavourites } from '../../features/favourites/favouritesSlice.js';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer';

export function Favourites() {

  const allPokemon = useSelector(selectAllPokemon);
  const favourites = useSelector(selectFavourites);
  const favouritePokemon = allPokemon;


  return (
    <div>
      <NavBar />
      <h1>Hello World!</h1>
      <h2>This is the favourites page</h2>
    </div>
  )
}