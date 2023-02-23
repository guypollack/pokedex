import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPokemonAsync, selectAllPokemonFetched, selectAllPokemon, selectPokemonPageDataFetched, setPokemonPageDataFetched, selectPokemonPageData, fetchPokemonDataByIndexAsync, fetchPokemonSpeciesByIndexAsync } from '../../features/pokemon/pokemonSlice.js';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { TypeBlock } from '../../components/TypeBlock/TypeBlock.js';
import "./PokemonPage.css";

export function PokemonPage() {
  const dispatch = useDispatch();
  const { number } = useParams();
  const allPokemonFetched = useSelector(selectAllPokemonFetched);
  const pokemonPageDataFetched = useSelector(selectPokemonPageDataFetched);
  const pokemonPageData = useSelector(selectPokemonPageData);
  // const {name, url, imageUrl} = useSelector(selectAllPokemon)[number];
  const { name, generation, types, height, weight } = pokemonPageData;
  const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + number + ".png";
  
  useEffect(() => {
    return () => {
      dispatch(setPokemonPageDataFetched(false));
    }
  },[])

  useEffect(() => {
    dispatch(fetchPokemonSpeciesByIndexAsync(number));
  },[])


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
      <div className="pokemon-page-flex-container">
        <img src={imageUrl}></img>
        <div className="pokemon-page-data-container">
          <h3>Number:</h3>
          <h3>{number}</h3>
          <h3>Generation:</h3>
          <h3>{generation}</h3>
          <h3>Type:</h3>
          <div className="pokemon-page-types-container">
            {types.map(type => <TypeBlock type={type}/>)}
          </div>
          <h3>Height:</h3>
          <h3>{height}m</h3>
          <h3>Weight:</h3>
          <h3>{weight}kg</h3>
          <h4 className="two-column-cell">Placeholder this is the placeholder alsdnks sjkndkjf dnf slner rmmnas wkwen w weewwe</h4>
        </div>
      </div>
    </div>
  )
}