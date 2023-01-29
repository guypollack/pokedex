import React from "react";
import "./HomePageFlexContainer.css";
import { HomePagePokemonContainer } from "../HomePagePokemonContainer/HomePagePokemonContainer";

export function HomePageFlexContainer({allPokemon}) {
  return (
    <div className="home-page-flex-container">
      {allPokemon.map(pokemon => <HomePagePokemonContainer number={pokemon.number}  name={pokemon.name} imageUrl={pokemon.imageUrl} />)}
    </div>
  )
  
};