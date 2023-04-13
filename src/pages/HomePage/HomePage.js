import React, { useEffect } from 'react';
import { FiltersContainer } from '../../components/FiltersContainer/FiltersContainer';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchAllPokemonAsync, fetchPokemonTypesAsync, selectFilteredPokemon, selectFilters, selectAllPokemonFetched, setFilteredPokemonSnapshot, selectSearchTerm, selectDisplayCount, setDisplayCount, fetchGenerations, fetchHeights, fetchWeights, selectAllDataFetched } from '../../features/pokemon/pokemonSlice';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer';
import "./HomePage.css";

export function HomePage() {
  // console.log("HomePage rendering");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allPokemonFetched = useSelector(selectAllPokemonFetched);
  const allDataFetched = useSelector(selectAllDataFetched);
  const filters = useSelector(selectFilters);
  const filteredPokemon = useSelector(selectFilteredPokemon);
  const searchTerm = useSelector(selectSearchTerm);
  const displayCount = useSelector(selectDisplayCount);

  function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      if (displayCount < Object.keys(filteredPokemon).length) {
        dispatch(setDisplayCount(displayCount + 50));
      }
    }
  }

  useEffect(() => {
    navigate("/");
  },[])

  useEffect(() => {
    if (!allPokemonFetched) {
      dispatch(fetchAllPokemonAsync());
    }
  },[allPokemonFetched])

  useEffect(() => {
    if (allPokemonFetched) {
      if (!allDataFetched) {
        dispatch(fetchPokemonTypesAsync());
        dispatch(fetchGenerations());
        dispatch(fetchHeights());
        dispatch(fetchWeights());
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
    return (() => {
      dispatch(setFilteredPokemonSnapshot(filteredPokemon));
    })
  },[filters, searchTerm])

  return (
    <div>
      <NavBar />
      <div className="home-page">
        <h1>Guy's Pokédex Project</h1>
        {/* <h3>By Guy Pollack</h3> */}
        <h6>&#169; 2023 Guy Pollack</h6>
        <h6>Pokémon and Pokémon character names are trademarks of Nintendo</h6>
        <FiltersContainer /> 
        {allDataFetched && Object.keys(filteredPokemon).length === 0 && <h3>No results found!</h3>}
        {allPokemonFetched && <PokemonFlexContainer allPokemon={filteredPokemon} />}
      </div>
    </div>
  )
}