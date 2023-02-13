import React from "react";
import { addFilter, removeFilter, filterPokemonAsync } from "../../features/pokemon/pokemonSlice";
import { useDispatch } from "react-redux";
import "./FilterButton.css"

export function FilterButton({property, value}) {
  const dispatch = useDispatch();

  function handleClick(e) {
    // alert(e.target.classList.contains("active"));
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