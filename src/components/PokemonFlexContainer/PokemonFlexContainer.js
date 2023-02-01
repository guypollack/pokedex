import React from "react";
import "./PokemonFlexContainer.css";
import { PokemonCardContainer } from "../PokemonCardContainer/PokemonCardContainer";

export function PokemonFlexContainer({allPokemon}) {
  return (
    <div className="pokemon-flex-container">
      {allPokemon.map(pokemon => <PokemonCardContainer number={pokemon.number}  name={pokemon.name} imageUrl={pokemon.imageUrl} />)}
    </div>
  )
  
};