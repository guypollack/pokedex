import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, fetchPokemonTypesAsync, selectAllPokemon } from '../../features/pokemon/pokemonSlice';
import { selectFavourites } from '../../features/favourites/favouritesSlice.js';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer';

export function Favourites() {

  const allPokemon = useSelector(selectAllPokemon);
  const favourites = useSelector(selectFavourites);
  // const firstTenArray = Object.entries(allPokemon).slice(0,10);
  // console.log(firstTenArray);
  // const favouritePokemonArray = Object.entries(allPokemon).filter(([key, value]) => favourites.includes(key));
  
  // the square brackets around [key, value] are destructuring assignment,
  // i.e. it is calling each of the two-element entries in the array a pair of key and value,
  // which allows us to refer to each one as desired
  // console.log(favouritePokemonArray);
  
  const favouritePokemon = Object.fromEntries(Object.entries(allPokemon).filter(([key, value]) => favourites.includes(key)));


  return (
    <div>
      <NavBar />
      <h1>Hello World!</h1>
      <h2>This is the favourites page</h2>
      {favourites.length === 0 && <h3>You don't have any favourites yet!</h3>}
      <PokemonFlexContainer allPokemon={favouritePokemon}/>
    </div>
  )
}