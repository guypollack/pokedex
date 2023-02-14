import React, { useEffect } from 'react';
import { MyButton } from '../../components/MyButton';
import { FilterButton } from '../../components/FilterButton/FilterButton';
import { SeeMoreButton } from '../../components/SeeMoreButton/SeeMoreButton';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, fetchPokemonDataAsync, setBounds, makeVisible, addFilter, removeFilter, selectAllPokemon, selectVisiblePokemon, selectFilteredPokemon, selectFilteredPokemon2, selectIsFiltering, selectFilters, selectFilterMessage, selectStatus, selectAllPokemonFetched, selectDataFetched, selectLBound, selectUBound, selectReload, filterPokemonAsync } from '../../features/pokemon/pokemonSlice';
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
  const filteredPokemon2 = useSelector(selectFilteredPokemon2);
  const isFiltering = useSelector(selectIsFiltering);
  const lBound = useSelector(selectLBound);
  const uBound = useSelector(selectUBound);
  const reload = useSelector(selectReload);
  const filterMessage = useSelector(selectFilterMessage);
  

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
      // alert("B");
      // console.log("B");
      dispatch(makeVisible({"start": lBound, "end": uBound}));
      // dispatch(filterPokemonAsync());
      dispatch(fetchPokemonDataAsync({"start": lBound, "end": uBound}));
    }
  },[allPokemonFetched, lBound, uBound, filters])

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
    console.log(filteredPokemon);
  },[filteredPokemon])


  // const areFiltersApplied = Object.values(filters).every(value => value.length === 0);
  // const doFilteredPokemonEqualsVisiblePokemon = Object.keys(filteredPokemon).length === Object.keys(visiblePokemon).length && Object.entries(filteredPokemon).every(([key, value]) => visiblePokemon[key] === value);

  function areFilteredPokemonDefault() {
    const noFiltersApplied = Object.values(filters).every(value => value.length === 0);
    const filteredPokemonEqualsVisiblePokemon = Object.keys(filteredPokemon).length === Object.keys(visiblePokemon).length && Object.entries(filteredPokemon).every(([key, value]) => visiblePokemon[key] === value);
    // alert(Object.keys(filteredPokemon).length);
    if (noFiltersApplied) {
      return false;
    } else {
      return filteredPokemonEqualsVisiblePokemon;
    }
  }

  const noFiltersApplied = Object.values(filters).every(value => value.length === 0);
  const filteredPokemonEqualsVisiblePokemon = Object.keys(filteredPokemon).length === Object.keys(visiblePokemon).length && Object.entries(filteredPokemon).every(([key, value]) => visiblePokemon[key] === value);


  useEffect(() => {
    if (!isFiltering) {
      if (filteredPokemon[Object.keys(filteredPokemon)[Object.keys(filteredPokemon).length-1]]) {
        // alert(filteredPokemon[Object.keys(filteredPokemon)[Object.keys(filteredPokemon).length-1]].name)
        // alert(visiblePokemon[Object.keys(visiblePokemon)[Object.keys(visiblePokemon).length-1]].name)
        // alert("A");
        // alert(Object.keys(filteredPokemon).length === Object.keys(visiblePokemon).length && Object.entries(filteredPokemon).every(([key, value]) => visiblePokemon[key] === value))
        // alert("B");
        // alert(Object.values(filters).every(value => value.length === 0));
      } 
    }
  },[isFiltering])

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
      <FilterButton property="generations" value="2" />
      <FilterButton property="generations" value="3" />
      {/* <h3>allPokemonFetched: {allPokemonFetched.toString()}</h3>
      <h3>isFiltering: {isFiltering.toString()}</h3>
      <h3>noFiltersApplied: {noFiltersApplied.toString()}</h3>
      <h3>filteredPokemonEqualsVisiblePokemon: {filteredPokemonEqualsVisiblePokemon.toString()}</h3>
      <h3>areFilteredPokemonDefault: {areFilteredPokemonDefault().toString()}</h3>
      <h3>reload: {reload.toString()}</h3> */}
      {/* {(!allPokemonFetched || isFiltering) && <h4>Data loading...</h4>} */}
      {(!allPokemonFetched) && <h4>Data loading...</h4>}
      {/* {isFiltering && <h4>{filterMessage}</h4>} */}
      {allPokemonFetched && dataFetched && <h4>Showing results for Pokémon numbers 1 to {uBound - 1}</h4>}
      {allPokemonFetched && dataFetched &&  <h4>{Object.keys(filteredPokemon).length} results found</h4>}
      {Object.keys(filteredPokemon).length === 0 && <h3>No results found!</h3>}
      {(allPokemonFetched && !areFilteredPokemonDefault() && !reload) && <PokemonFlexContainer allPokemon={filteredPokemon} />}
      <SeeMoreButton />
    </div>
  )
}