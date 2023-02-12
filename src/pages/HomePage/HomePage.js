import React, { useEffect } from 'react';
import { MyButton } from '../../components/MyButton';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, fetchPokemonDataAsync, addFilter, removeFilter, selectAllPokemon, selectFilteredPokemon, selectFilters, selectStatus } from '../../features/pokemon/pokemonSlice';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer';

export function HomePage() {
  const dispatch = useDispatch();

  const allPokemon = useSelector(selectAllPokemon);
  const status = useSelector(selectStatus);
  const filters = useSelector(selectFilters);

  // dispatch(fetchAllPokemonAsync());

  if (status !== "idle") {
    dispatch(fetchAllPokemonAsync());
    dispatch(fetchPokemonDataAsync());
  }

  useEffect(() => {
    dispatch(addFilter({"property": "types", "value": "water"}))
  },[])

  // useEffect(() => {
  //   dispatch(fetchAllPokemonAsync());
  //   // console.log(allPokemon);
  // },[allPokemon])

  // console.log(allPokemon);

  return (
    <div>
      <NavBar />
      <h1>Hello World!</h1>
      <h2>This is the home page</h2>
      {status === "loading" && <h4>Data loading...</h4>}
      {status === "idle" && <PokemonFlexContainer allPokemon={allPokemon} />}
    </div>
  )
}