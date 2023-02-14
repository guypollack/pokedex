import React from "react";
import { store } from "../../app/store"

export const doesPokemonFitFilter = (filterName, filterValue, pokemonNumber) => {

  if (filterName === "types") {
    return store.getState().pokemon[filterName][pokemonNumber][1].includes(filterValue);
  }

  if (filterName === "generations") {
    return store.getState().pokemon[filterName][pokemonNumber] === filterValue;
  }

  if (filterName === "weights") {
    return (eval(store.getState().pokemon[filterName][pokemonNumber] + filterValue));
  }

  if (filterName === "heights") {
    return (eval(store.getState().pokemon[filterName][pokemonNumber] + filterValue));
  }

}