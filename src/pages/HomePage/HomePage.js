import React, { useEffect } from 'react';
import { SeeMoreButton } from '../../components/SeeMoreButton/SeeMoreButton';
import { FiltersContainer } from '../../components/FiltersContainer/FiltersContainer';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchAllPokemonAsync, fetchPokemonDataAsync, fetchPokemonTypesAsync, selectFilteredPokemon, selectFilters, selectAllPokemonFetched, selectDataFetched, selectIsLoading, setFilteredPokemonSnapshot, selectSearchTerm, selectDisplayCount, setDisplayCount, fetchGenerations, selectHeights, selectWeights, fetchHeights, fetchWeights, selectAllDataFetched } from '../../features/pokemon/pokemonSlice';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer';
import "./HomePage.css";

export function HomePage() {
  // console.log("HomePage rendering");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allPokemonFetched = useSelector(selectAllPokemonFetched);
  const dataFetched = useSelector(selectDataFetched);
  const allDataFetched = useSelector(selectAllDataFetched);
  const filters = useSelector(selectFilters);
  const filteredPokemon = useSelector(selectFilteredPokemon);
  const isLoading = useSelector(selectIsLoading);
  const searchTerm = useSelector(selectSearchTerm);
  const displayCount = useSelector(selectDisplayCount);
  const heights = useSelector(selectHeights);
  const weights = useSelector(selectWeights);

  function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      if (displayCount < Object.keys(filteredPokemon).length) {
        dispatch(setDisplayCount(displayCount + 50));
      }
    }
  }

  // dispatch(fetchAllPokemonAsync());

  useEffect(() => {
    navigate("/");
  },[])

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
      if (!allDataFetched) {
        dispatch(fetchPokemonTypesAsync());
        dispatch(fetchGenerations());
        dispatch(fetchHeights());
        dispatch(fetchWeights());
        // dispatch(fetchPokemonDataAsync({"start": 1, "end": 1009}));
      }
    }
  },[allPokemonFetched])

  useEffect(() => {
    window.addEventListener("scroll",handleScroll);
    return (() => {
      window.removeEventListener("scroll",handleScroll);
    })
  })

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
      <div className="home-page">
        <h1>Pokédex Project</h1>
        <h3>By Guy Pollack</h3>
        <h6>&#169; 2023 Guy Pollack</h6>
        <h6>Pokémon and Pokémon character names are trademarks of Nintendo</h6>
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
        
        {/* {(!dataFetched) && <h4>Data loading...</h4>} */}
        {/* {(!dataFetched) && <LoadingIcon />} */}
        {/* {isLoading && <LoadingIcon />} */}
        {/* {allPokemonFetched && <h4>Showing results for Pokémon numbers 1 to {uBound - 1}</h4>} */}
        {/* {allPokemonFetched && <h4>{Object.keys(filteredPokemon).length} results found</h4>} */}
        {allDataFetched && Object.keys(filteredPokemon).length === 0 && <h3>No results found!</h3>}
        {allPokemonFetched && <PokemonFlexContainer allPokemon={filteredPokemon} />}
      </div>
    </div>
  )
}