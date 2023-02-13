import React, { useEffect } from 'react';
import { MyButton } from '../../components/MyButton';
import { FilterButton } from '../../components/FilterButton/FilterButton';
import { SeeMoreButton } from '../../components/SeeMoreButton/SeeMoreButton';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, fetchPokemonDataAsync, setBounds, makeVisible, addFilter, removeFilter, selectAllPokemon, selectVisiblePokemon, selectFilteredPokemon, selectFilters, selectStatus, selectAllPokemonFetched, selectDataFetched, selectLBound, selectUBound } from '../../features/pokemon/pokemonSlice';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer';

export function HomePage() {
  const dispatch = useDispatch();

  const allPokemon = useSelector(selectAllPokemon);
  const visiblePokemon = useSelector(selectVisiblePokemon);
  const status = useSelector(selectStatus);
  const allPokemonFetched = useSelector(selectAllPokemonFetched);
  const dataFetched = useSelector(selectDataFetched);
  const filters = useSelector(selectFilters);
  const filteredPokemon = useSelector(selectFilteredPokemon);
  const lBound = useSelector(selectLBound);
  const uBound = useSelector(selectUBound);
  

  // dispatch(fetchAllPokemonAsync());

  useEffect(() => {
    if (!allPokemonFetched) {
      // console.log("A");
      dispatch(fetchAllPokemonAsync());
      // dispatch(makeVisible({"start": lBound, "end": uBound}));
      // dispatch(fetchPokemonDataAsync());
    }
  },[allPokemonFetched])
  

  useEffect(() => {
    if (allPokemonFetched) {
      // console.log("B");
      dispatch(makeVisible({"start": lBound, "end": uBound}));
      dispatch(fetchPokemonDataAsync({"start": lBound, "end": uBound}));
    }
  },[allPokemonFetched, lBound, uBound])

  useEffect(() => {
    // dispatch(addFilter({"property": "types", "value": "water"}))
    // dispatch(addFilter({"property": "types", "value": "fire"}));
    // dispatch(addFilter({"property": "types", "value": "flying"}));
  },[])

  useEffect(() => {
    if (allPokemonFetched && dataFetched) {
      if (Object.keys(filteredPokemon).length < 50 && uBound < 1009) {
        dispatch(setBounds({"lBound": lBound + 100, "uBound": uBound + 100}));
      }
    }
  },[filteredPokemon])

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
      <FilterButton property="types" value="water" />
      <FilterButton property="types" value="fire" />
      <FilterButton property="types" value="flying" />
      {(!allPokemonFetched || !dataFetched) && <h4>Data loading...</h4>}
      {allPokemonFetched && dataFetched && <h4>Showing results for Pokémon numbers 1 to {uBound - 1}</h4>}
      {allPokemonFetched && dataFetched &&<h4>{Object.keys(filteredPokemon).length} results found</h4>}
      {Object.keys(filteredPokemon).length === 0 && <h3>No results found!</h3>}
      {allPokemonFetched && dataFetched && <PokemonFlexContainer allPokemon={filteredPokemon} />}
      <SeeMoreButton />
    </div>
  )
}