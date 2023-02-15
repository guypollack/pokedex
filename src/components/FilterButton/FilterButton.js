import React from "react";
import { addFilter, removeFilter, setDisplayCount, selectNumberOfFilters } from "../../features/pokemon/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";
import "./FilterButton.css"

export function FilterButton({property, value}) {
  const dispatch = useDispatch();
  const numberOfFilters = useSelector(selectNumberOfFilters);

  function handleClick(e) {
    if (!e.target.classList.contains("active")) {
      dispatch(setDisplayCount(50));
      dispatch(addFilter({property, value}));
      e.target.classList.add("active");
    } else {
      dispatch(setDisplayCount(numberOfFilters > 1 ? 50 : 100));
      dispatch(removeFilter({property, value}));
      e.target.classList.remove("active");
    }
  }
  
  return <button className="filter-button"  onClick={handleClick}>{property}: {value}</button>
}