import React from "react";
import { addFilter, removeFilter } from "../../features/pokemon/pokemonSlice";
import { useDispatch } from "react-redux";
import "./FilterButton.css"

export function FilterButton({property, value}) {
  const dispatch = useDispatch();

  function handleClick(e) {
    // alert(e.target.classList.contains("active"));
    if (!e.target.classList.contains("active")) {
      dispatch(addFilter({property, value}));
      e.target.classList.add("active");
    } else {
      dispatch(removeFilter({property, value}));
      e.target.classList.remove("active");
    }
  }
  
  return <button className="filter-button"  onClick={handleClick}>{property}: {value}</button>
}