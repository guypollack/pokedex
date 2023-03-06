import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { nameFormatter } from '../../util/nameFormatter.js';
import { selectPokemonPageDataFetched, setPokemonPageDataFetched, selectPokemonPageData, fetchPokemonDataByIndexAsync, selectPokemonPageDescription, selectPokemonPageDescriptionFetched, setPokemonPageDescriptionFetched, fetchPokemonDescriptionByIndexAsync } from '../../features/pokemon/pokemonSlice.js';
import { selectCurrentUser } from '../../features/users/usersSlice.js';
import { selectFavourites } from "../../features/favourites/favouritesSlice";
import { NavBar } from '../../components/NavBar/NavBar.js';
import { ArrowContainer } from './ArrowContainer.js';
import { TypeBlock } from '../../components/TypeBlock/TypeBlock.js';
import { FavouriteButton } from "../../components/FavouriteButton/FavouriteButton.js";
import "./PokemonPage.css";

export function PokemonPage() {
  const dispatch = useDispatch();
  const { number } = useParams();
  const pokemonPageDataFetched = useSelector(selectPokemonPageDataFetched);
  const pokemonPageData = useSelector(selectPokemonPageData);
  const pokemonPageDescriptionFetched = useSelector(selectPokemonPageDescriptionFetched);
  const description = useSelector(selectPokemonPageDescription);
  const user = useSelector(selectCurrentUser);
  const favourites = useSelector(selectFavourites);
  const favourited = favourites[user].includes(number);
  const { name, generation, types, height, weight } = pokemonPageData;
  const formattedName = nameFormatter(name);
  const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + number + ".png";

  let favouriteButtonMessage;

  if (favourited) {
    favouriteButtonMessage = "Remove from favourites";
  } else if (user !== "guest") {
    favouriteButtonMessage = "Add to favourites"
  } else {
    favouriteButtonMessage = "Log in to add pokémon to favourites"
  }
  
  useEffect(() => {
    dispatch(setPokemonPageDataFetched(false));
    dispatch(setPokemonPageDescriptionFetched(false));
    return () => {
      dispatch(setPokemonPageDataFetched(false));
      dispatch(setPokemonPageDescriptionFetched(false));
    }
  },[number])

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

  useEffect(() => {
    if (!pokemonPageDescriptionFetched) {
      dispatch(fetchPokemonDescriptionByIndexAsync(number));
    }
  },[pokemonPageDescriptionFetched]);

  // consider deleting if statement because data is loading fast
  if (!pokemonPageDataFetched || !pokemonPageDescriptionFetched) {
    // alert("A");
    return (
    <div className="pokemon-page">
      <div className="pokemon-page-header">
        <NavBar />
        <h1>{formattedName}</h1>
      </div>
      <div className="pokemon-page-loading-container">
        <ArrowContainer side="left" number={number} />
        <ArrowContainer side="right" number={number} />
      </div>
    </div>
    )
  }

  return (
    <div className="pokemon-page">
      <div className="pokemon-page-header">
        <NavBar />
        <h1>{formattedName}</h1>
      </div>
      <div className="pokemon-page-content-container">
        <ArrowContainer side="left" number={number} />
        <div className="pokemon-page-grid-container">
          <div className="pokemon-page-image-container">
            <img src={imageUrl}></img>
          </div>
          <div className="pokemon-page-data-container">
            <h3>Number:</h3>
            <h3>{number}</h3>
            <h3>Generation:</h3>
            <h3>{generation}</h3>
            <h3>Type:</h3>
            <div className="pokemon-page-types-container">
              {types.map(type => <TypeBlock type={type} key={`type-block-${type}`}/>)}
            </div>
            <h3>Height:</h3>
            <h3>{height}m</h3>
            <h3>Weight:</h3>
            <h3>{weight}kg</h3>
            <h4 className="two-column-cell description">{description}</h4>
            <div className="two-column-cell favourite-button-container">
              <p>{favouriteButtonMessage}</p>
              <FavouriteButton number={number} />
            </div>
          </div>
        </div>
        <ArrowContainer side="right" number={number} />
      </div>
    </div>
  )
}