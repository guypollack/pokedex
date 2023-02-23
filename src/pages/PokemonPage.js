import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, selectAllPokemonFetched, selectAllPokemon, selectPokemonPageDataFetched, selectPokemonPageData, fetchPokemonDataByIndexAsync } from '../features/pokemon/pokemonSlice.js';
import { NavBar } from '../components/NavBar/NavBar.js'

export function PokemonPage() {
  const dispatch = useDispatch();
  const { number } = useParams();
  const allPokemonFetched = useSelector(selectAllPokemonFetched);
  const pokemonPageDataFetched = useSelector(selectPokemonPageDataFetched);
  const pokemonPageData = useSelector(selectPokemonPageData);
  // const {name, url, imageUrl} = useSelector(selectAllPokemon)[number];
  const { name, types, height, weight } = pokemonPageData;
  const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + number + ".png";
  
  // useEffect(() => {
  //   if (!allPokemonFetched) {
  //     dispatch(fetchAllPokemonAsync());
  //   }
  // },[allPokemonFetched])

  useEffect(() => {
    if (!pokemonPageDataFetched) {
      dispatch(fetchPokemonDataByIndexAsync(number));
    }
  },[pokemonPageDataFetched]);

  // consider deleting if statement because data is loading fast
  if (!pokemonPageDataFetched) {
    return (
      <div>
        <NavBar />
        <h3>Data is loading...</h3>
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <h1>{name}</h1>
      <div className="pokemon-data-container">
        <img src={imageUrl}></img>
        <h3>Type: {types.toString()}</h3>
        <h3>Height: {height}m</h3>
        <h3>Weight: {weight}kg</h3>
      </div>
    </div>
  )
}