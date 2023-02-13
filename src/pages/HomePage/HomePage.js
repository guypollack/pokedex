import React, { useEffect } from 'react';
import { MyButton } from '../../components/MyButton';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, fetchPokemonDataAsync, addFilter, removeFilter, selectAllPokemon, selectVisiblePokemon, selectFilteredPokemon, selectFilters, selectStatus, selectLBound, selectUBound } from '../../features/pokemon/pokemonSlice';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer';

export function HomePage() {
  const dispatch = useDispatch();

  const allPokemon = useSelector(selectAllPokemon);
  const visiblePokemon = useSelector(selectVisiblePokemon);
  const status = useSelector(selectStatus);
  // const filters = useSelector(selectFilters);
  // const filteredPokemon = useSelector(selectFilteredPokemon);
  const lBound = useSelector(selectLBound);
  const uBound = useSelector(selectUBound);
  

  // dispatch(fetchAllPokemonAsync());

  if (status !== "idle") {
    dispatch(fetchAllPokemonAsync());
    dispatch(fetchPokemonDataAsync());
  }

  useEffect(() => {
    dispatch(addFilter({"property": "types", "value": "water"}))
  },[])

  // console.log(filteredPokemon);

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
      {status === "idle" && <PokemonFlexContainer allPokemon={visiblePokemon} />}
    </div>
  )
}