import React from "react";
import { PokemonCardContainer } from "../PokemonCardContainer/PokemonCardContainer";
import "./PokemonFlexContainer.css";

export function PokemonFlexContainer({allPokemon}) {
  return (
    <div className="pokemon-flex-container">
      {Object.keys(allPokemon).map(number => <PokemonCardContainer key={number} number={number}  name={allPokemon[number].name} imageUrl={allPokemon[number].imageUrl} />)}
    </div>
  )
  
};