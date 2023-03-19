import React, { useEffect } from 'react';
import { SeeMoreButton } from '../../components/SeeMoreButton/SeeMoreButton';
import { FiltersContainer } from '../../components/FiltersContainer/FiltersContainer';
import { Slider } from '../../components/Slider/Slider';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { LoadingIcon } from '../../components/LoadingIcon/LoadingIcon';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, fetchPokemonDataAsync, selectFilteredPokemon, selectFilters, selectAllPokemonFetched, selectDataFetched, selectIsLoading, setFilteredPokemonSnapshot, selectSearchTerm } from '../../features/pokemon/pokemonSlice';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer';
import { selectFontStyle, toggleFontStyle } from '../../features/design/designSlice';

export function HomePage() {
  // console.log("HomePage rendering");
  const dispatch = useDispatch();

  const allPokemonFetched = useSelector(selectAllPokemonFetched);
  const dataFetched = useSelector(selectDataFetched);
  const filters = useSelector(selectFilters);
  const filteredPokemon = useSelector(selectFilteredPokemon);
  const isLoading = useSelector(selectIsLoading);
  const searchTerm = useSelector(selectSearchTerm);
  const fontStyle = useSelector(selectFontStyle);

  // dispatch(fetchAllPokemonAsync());

  useEffect(() => {
    if (!allPokemonFetched) {
      // console.log("A");
      // console.log("dispatch(fetchAllPokemonAsync());");
      dispatch(fetchAllPokemonAsync());
      // dispatch(makeVisible({"start": lBound, "end": uBound}));
      // dispatch(fetchPokemonDataAsync());
    }
  },[allPokemonFetched])

  useEffect(() => {
    if (allPokemonFetched) {
      // alert("all pokemon fetched");
      // alert("B");
      // console.log("B");
      // dispatch(makeVisible({"start": lBound, "end": uBound}));
      // dispatch(filterPokemonAsync());
      // console.log(`dispatch(fetchPokemonDataAsync({"start": 1, "end": 1009}));`);
      if (!dataFetched) {
        dispatch(fetchPokemonDataAsync({"start": 1, "end": 1009}));
      }
    }
  },[allPokemonFetched])

  useEffect(() => {
    // dispatch(addFilter({"property": "types", "value": "water"}))
    // dispatch(addFilter({"property": "types", "value": "fire"}));
    // dispatch(addFilter({"property": "types", "value": "flying"}));
    return (() => {
      // alert("clearing all filters");
      // dispatch(clearFilters());
      // dispatch(clearFilterList());
      // dispatch(resetSearchTypes());
      // dispatch(setFilteredPokemonSnapshot(filteredPokemon));
    })
  },[])

  useEffect(() => {
    return (() => {
      dispatch(setFilteredPokemonSnapshot(filteredPokemon));
    })
  },[filters, searchTerm])

  function handleFontChange() {
    dispatch(toggleFontStyle());
    // document.body.style.fontFamily = "Press Start 2P";
    // console.log(document.body.style);
    const body = document.getElementsByTagName('body')[0];
    // body.style.fontFamily = "Press Start 2P";
    // body.style.fontFamily = "Press+Start+2P";
    if (!body.classList.contains("test")) {
      body.classList.add("test");
    } else {
      body.classList.remove("test");
    }
    
    // console.log(window.getComputedStyle(body).getPropertyValue("font-family"));
    
  }

  // useEffect(() => {
  //   // console.log(filteredPokemon);
  //   if (allPokemonFetched && dataFetched) {
  //     if (Object.keys(filteredPokemon).length < 50 && uBound < 1009) {
  //       console.log(`dispatch(setBounds({"lBound": ${lBound + 100}, "uBound": ${uBound + 100}}))`);
  //       dispatch(setBounds({"lBound": lBound + 100, "uBound": uBound + 100}));
  //     }
  //   }
  //   // console.log(filteredPokemon);
  // },[filteredPokemon])

  // function areFilteredPokemonDefault() {
  //   const noFiltersApplied = Object.values(filters).every(value => value.length === 0);
  //   const filteredPokemonEqualsVisiblePokemon = Object.keys(filteredPokemon).length === Object.keys(visiblePokemon).length && Object.entries(filteredPokemon).every(([key, value]) => visiblePokemon[key] === value);
  //   // alert(Object.keys(filteredPokemon).length);
  //   if (noFiltersApplied) {
  //     return false;
  //   } else {
  //     return filteredPokemonEqualsVisiblePokemon;
  //   }
  // }

  // const noFiltersApplied = Object.values(filters).every(value => value.length === 0);
  // const filteredPokemonEqualsVisiblePokemon = Object.keys(filteredPokemon).length === Object.keys(visiblePokemon).length && Object.entries(filteredPokemon).every(([key, value]) => visiblePokemon[key] === value);


  return (
    <div>
      <NavBar />
      <h1>Hello World!</h1>
      <h2>This is the home page</h2>
      <Slider heading="Font" value1="Normal" value2="Gameboy" checked={fontStyle === "gameboy"} onChange={handleFontChange} />
      {/* Slider({heading, type, value1, value2, checked}) { */}
      {/* <h3>lBound: {lBound.toString()}</h3> */}
      {/* <h3>uBound: {uBound.toString()}</h3> */}
      {/* <h3>isLoading: {isLoading.toString()}</h3> */}
      {/* <h3>areFiltersApplied: {areFiltersApplied.toString()}</h3> */}
      {/* <h3>numberOfFilters: {numberOfFilters}</h3> */}
      {/* <h3>filters: {Object.entries(filters).toString()}</h3> */}
      <FiltersContainer /> 
      {/* <FilterButton property="types" value="water" />
      <FilterButton property="types" value="fire" />
      <FilterButton property="types" value="flying" />
      <FilterButton property="generations" value="2" />
      <FilterButton property="generations" value="3" />
      <FilterButton property="weights" value="<50" />
      <FilterButton property="heights" value=">=6" /> */}
      
      {(!allPokemonFetched) && <h4>Data loading...</h4>}
      {isLoading && <LoadingIcon />}
      {/* {allPokemonFetched && <h4>Showing results for Pokémon numbers 1 to {uBound - 1}</h4>} */}
      {/* {allPokemonFetched && <h4>{Object.keys(filteredPokemon).length} results found</h4>} */}
      {dataFetched && Object.keys(filteredPokemon).length === 0 && <h3>No results found!</h3>}
      {allPokemonFetched && <PokemonFlexContainer allPokemon={filteredPokemon} />}
      <SeeMoreButton />
    </div>
  )
}