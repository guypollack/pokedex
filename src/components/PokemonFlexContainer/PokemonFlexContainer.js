import React from "react";
import { useSelector } from "react-redux";
import { selectDisplayCount } from "../../features/pokemon/pokemonSlice";
import { PokemonCardContainer } from "../PokemonCardContainer/PokemonCardContainer";
import "./PokemonFlexContainer.css";

export function PokemonFlexContainer({allPokemon}) {
  const displayCount = useSelector(selectDisplayCount);
  return (
    <div className="pokemon-flex-container">
      {Object.keys(allPokemon).slice(0,displayCount).map((number, index) => <PokemonCardContainer key={number} number={number} name={allPokemon[number].name} imageUrl={allPokemon[number].imageUrl} index={index} />)}
    </div>
  )
};