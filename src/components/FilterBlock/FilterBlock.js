import React from "react";
import { removeFilter, setDisplayCount, selectNumberOfFilters } from "../../features/pokemon/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";
import "./FilterBlock.css"

export function FilterBlock({property, value}) {
  const dispatch = useDispatch();
  const numberOfFilters = useSelector(selectNumberOfFilters);
  let numberStart;

  if (property === "heights" || property === "weights") {
    numberStart = value[1] === "=" ? 2 : 1;
  }

  function handleClick(e) {
  dispatch(setDisplayCount(numberOfFilters > 1 ? 50 : 100));
  dispatch(removeFilter({property, value}));
  }

  function valueFormatter(val) {
    switch (property) {
      case "types":
        return val.slice(0,1).toUpperCase() + val.slice(1);
      case "heights":
        return val.slice(0, numberStart) + " " + val.slice(numberStart) + "m";
      case "weights":
        return val.slice(0, numberStart) + " " + val.slice(numberStart) + "kg";
      default:
        return val
    }
  }
  
  return <button className={`filter-block ${property} ${value}`} onClick={handleClick}>{property.slice(0,1).toUpperCase() + property.slice(1, property.length-1)}: {valueFormatter(value)}</button>
}