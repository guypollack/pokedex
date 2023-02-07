import React from "react";
import "./PokemonFlexContainer.css";
import { PokemonCardContainer } from "../PokemonCardContainer/PokemonCardContainer";

export function PokemonFlexContainer({allPokemon}) {
  return (
    <div className="pokemon-flex-container">
      {Object.keys(allPokemon).map(number => <PokemonCardContainer number={number}  name={allPokemon[number].name} imageUrl={allPokemon[number].imageUrl} />)}
    </div>
  )
  
};