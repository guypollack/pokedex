import React, { useEffect } from 'react';
import { MyButton } from '../../components/MyButton';
import { FilterButton } from '../../components/FilterButton/FilterButton';
import { SeeMoreButton } from '../../components/SeeMoreButton/SeeMoreButton';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { LoadingIcon } from '../../components/LoadingIcon/LoadingIcon';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, fetchPokemonDataAsync, setBounds, setIsLoading, makeVisible, selectAllPokemon, selectVisiblePokemon, selectFilteredPokemon, selectFilters,selectStatus, selectAllPokemonFetched, selectDataFetched, selectLBound, selectUBound, selectIsLoading, selectAreFiltersApplied } from '../../features/pokemon/pokemonSlice';
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
  const isLoading = useSelector(selectIsLoading);
  const areFiltersApplied = useSelector(selectAreFiltersApplied);

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
    // console.log(filteredPokemon);
  },[filteredPokemon])

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


  return (
    <div>
      <NavBar />
      <h1>Hello World!</h1>
      <h2>This is the home page</h2>
      <h3>isLoading: {isLoading.toString()}</h3>
      <h3>areFiltersApplied: {areFiltersApplied.toString()}</h3>
      <FilterButton property="types" value="water" />
      <FilterButton property="types" value="fire" />
      <FilterButton property="types" value="flying" />
      <FilterButton property="generations" value="2" />
      <FilterButton property="generations" value="3" />
      
      {(!allPokemonFetched) && <h4>Data loading...</h4>}
      {isLoading && <LoadingIcon />}
      {allPokemonFetched && <h4>Showing results for Pokémon numbers 1 to {uBound - 1}</h4>}
      {/* {allPokemonFetched && <h4>{Object.keys(filteredPokemon).length} results found</h4>} */}
      {Object.keys(filteredPokemon).length === 0 && <h3>No results found!</h3>}
      {allPokemonFetched && <PokemonFlexContainer allPokemon={filteredPokemon} />}
      <SeeMoreButton />
    </div>
  )
}