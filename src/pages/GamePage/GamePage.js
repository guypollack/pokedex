import React, { useEffect } from 'react';
import { FiltersContainer } from '../../components/FiltersContainer/FiltersContainer';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, fetchPokemonDataAsync, selectAllPokemon, selectFilteredPokemon, selectFilters, selectAllPokemonFetched, selectDataFetched, selectIsLoading, setFilteredPokemonSnapshot, selectSearchTerm } from '../../features/pokemon/pokemonSlice';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer';
import "./GamePage.css";

export function GamePage() {
  // console.log("HomePage rendering");
  const dispatch = useDispatch();

  const allPokemonFetched = useSelector(selectAllPokemonFetched);
  const dataFetched = useSelector(selectDataFetched);
  const allPokemon = useSelector(selectAllPokemon);
  const filters = useSelector(selectFilters);
  const filteredPokemon = useSelector(selectFilteredPokemon);
  const isLoading = useSelector(selectIsLoading);
  const searchTerm = useSelector(selectSearchTerm);
  const randomNumber = Math.floor(Math.random() * 1009) + 1;
  const currentPokemon = allPokemon[randomNumber];

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
    return (() => {
      dispatch(setFilteredPokemonSnapshot(filteredPokemon));
    })
  },[filters, searchTerm])


  if (!allPokemonFetched) return;


  return (
    <div>
      <NavBar />
      <h1>Hello World!</h1>
      <h2>This is the game page</h2>
      <h3>Number: {randomNumber}</h3>
      <img className="game-page-picture" src={currentPokemon["imageUrl"]}></img>
      {/* <FiltersContainer />  */}
      {/* {dataFetched && Object.keys(filteredPokemon).length === 0 && <h3>No results found!</h3>} */}
    </div>
  )
}