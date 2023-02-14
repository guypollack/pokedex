import React from "react";
import { addFilter, removeFilter, selectFilteredPokemon, setFilteredPokemon } from "../../features/pokemon/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";
import "./FilterButton.css"

export function FilterButton({property, value}) {
  const dispatch = useDispatch();

  const filteredPokemon = useSelector(selectFilteredPokemon);

  function handleClick(e) {
    // alert("A");
    // alert(e.target.classList.contains("active"));
    dispatch(setFilteredPokemon(filteredPokemon));
    if (!e.target.classList.contains("active")) {
      dispatch(addFilter({property, value}));
      // dispatch(filterPokemonAsync());
      e.target.classList.add("active");
    } else {
      dispatch(removeFilter({property, value}));
      // dispatch(filterPokemonAsync());
      e.target.classList.remove("active");
    }
  }
  
  return <button className="filter-button"  onClick={handleClick}>{property}: {value}</button>
}