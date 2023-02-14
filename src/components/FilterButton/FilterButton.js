import React from "react";
import { addFilter, removeFilter, filterPokemonAsync, setIsFiltering, setReload } from "../../features/pokemon/pokemonSlice";
import { useDispatch } from "react-redux";
import "./FilterButton.css"

export function FilterButton({property, value}) {
  const dispatch = useDispatch();

  function handleClick(e) {
    // alert("A");
    // alert(e.target.classList.contains("active"));
    if (!e.target.classList.contains("active")) {
      dispatch(setIsFiltering(true));
      dispatch(setReload(true));
      dispatch(addFilter({property, value}));
      dispatch(setReload(false));
      // dispatch(filterPokemonAsync());
      e.target.classList.add("active");
    } else {
      dispatch(setIsFiltering(true));
      dispatch(setReload(true));
      dispatch(removeFilter({property, value}));
      dispatch(setReload(false));
      // dispatch(filterPokemonAsync());
      e.target.classList.remove("active");
    }
  }
  
  return <button className="filter-button"  onClick={handleClick}>{property}: {value}</button>
}