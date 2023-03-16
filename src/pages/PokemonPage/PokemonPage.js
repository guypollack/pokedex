import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { nameFormatter } from '../../util/nameFormatter.js';
import { selectPokemonPageDataFetched, setPokemonPageDataFetched, selectPokemonPageData, fetchPokemonPageDataByIndexAsync, selectPokemonPageDescription, selectPokemonPageDescriptionFetched, setPokemonPageDescriptionFetched, fetchPokemonDescriptionByIndexAsync, selectAllPokemonFetched, selectAllPokemon, fetchAllPokemonAsync, selectDescriptionsFetched, fetchPokemonDescriptionsAsync, selectDescriptions, selectTypes, selectGenerations, selectHeights, selectWeights, selectDataFetched, fetchPokemonDataAsync } from '../../features/pokemon/pokemonSlice.js';
import { selectCurrentUser } from '../../features/users/usersSlice.js';
import { selectFavourites } from "../../features/favourites/favouritesSlice";
import { NavBar } from '../../components/NavBar/NavBar.js';
import { ArrowContainer } from './ArrowContainer.js';
import { TypeBlock } from '../../components/TypeBlock/TypeBlock.js';
import { FavouriteButton } from "../../components/FavouriteButton/FavouriteButton.js";
import "./PokemonPage.css";

export function PokemonPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { number } = useParams();
  // const allPokemonFetched = useSelector(selectAllPokemonFetched);
  // const allPokemon = useSelector(selectAllPokemon);
  // const dataFetched = useSelector(selectDataFetched);
  // const descriptionsFetched = useSelector(selectDescriptionsFetched);
  // const pokemonPageDataFetched = useSelector(selectPokemonPageDataFetched);
  const pokemonPageData = useSelector(selectPokemonPageData);
  // const pokemonPageDescriptionFetched = useSelector(selectPokemonPageDescriptionFetched);
  // const description = useSelector(selectPokemonPageDescription);
  const user = useSelector(selectCurrentUser);
  const favourites = useSelector(selectFavourites);
  const favourited = favourites[user].includes(number);
  // const { generation, types, height, weight } = pokemonPageData;
  // const typesV2 = useSelector(selectTypes)[number];
  // const generationV2 = useSelector(selectGenerations)[number];
  // const heightV2 = useSelector(selectHeights)[number];
  // const weightV2 = useSelector(selectWeights)[number];
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
    dispatch(setPokemonPageDataFetched(!!pokemonPageData[number]));
    // dispatch(setPokemonPageDescriptionFetched(false));
    const startIndex = number <= 10 ? 1 : (+number - 10);
    const endIndex = number >= 999 ? 1009 : (+number + 11);
    for (let i = startIndex; i < endIndex; i++) {
      if (!pokemonPageData[i]) {
        dispatch(fetchPokemonPageDataByIndexAsync(i))
      }
    }
    // if (!descriptionsFetched) {
    //   // dispatch(fetchPokemonDescriptionsAsync());
    // }
    // if (!allPokemonFetched) {
    //   // dispatch(fetchAllPokemonAsync());
    // }
    // return () => {
    //   dispatch(setPokemonPageDataFetched(!!pokemonPageData[number]));
    // }
  },[number])

  if (!(number >= 1 && number <= 1008)) {
    return (
      <div className="pokemon-page">
        <div className="pokemon-page-header">
          <NavBar />
        </div>
        <div className="pokemon-not-found-section">
          <h1>Pokemon not found!</h1>
          <img id="pokemon-not-found-image" src="https://i.ytimg.com/vi/_UzGgIz52YU/maxresdefault.jpg" />
        </div>
      </div>
      
    )
  }

  // consider deleting if statement because data is loading fast
  if (!pokemonPageData[number]) {
    // console.log(number + "not yet loaded");
    // alert("A");
    return (
    <div className="pokemon-page">
      <div className="pokemon-page-header">
        <NavBar />
      </div>
      <div className="pokemon-page-loading-container">
        <ArrowContainer side="left" number={number} />
        <ArrowContainer side="right" number={number} />
      </div>
    </div>
    )
  }

  // if (allPokemonFetched && dataFetched && descriptionsFetched) {
  if (pokemonPageData[number]) {
    return (
      <div className="pokemon-page">
        <div className="pokemon-page-header">
          <NavBar />
          <h1>{pokemonPageData[number].name}</h1>
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
              <h3>{pokemonPageData[number].generation}</h3>
              <h3>Type:</h3>
              <div className="pokemon-page-types-container">
                {pokemonPageData[number].types.map(type => <TypeBlock type={type} key={`type-block-${type}`}/>)}
              </div>
              <h3>Height:</h3>
              <h3>{pokemonPageData[number].height}m</h3>
              <h3>Weight:</h3>
              <h3>{pokemonPageData[number].weight}kg</h3>
              <h4 className="two-column-cell description">{pokemonPageData[number].description}</h4>
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
}