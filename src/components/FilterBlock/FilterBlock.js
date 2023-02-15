import React from "react";
import { removeFilter, setDisplayCount, selectNumberOfFilters } from "../../features/pokemon/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFilterList } from "../../features/filters/filtersSlice";
import "./FilterBlock.css"

export function FilterBlock({property, value, filterNumber}) {
  const dispatch = useDispatch();
  const numberOfFilters = useSelector(selectNumberOfFilters);
  let numberStart;

  if (property === "heights" || property === "weights") {
    numberStart = value[1] === "=" ? 2 : 1;
  }

  function handleClick(e) {
    dispatch(setDisplayCount(numberOfFilters > 1 ? 50 : 100));
    dispatch(removeFilter({"property": property.toLowerCase() + "s", "value": value.toLowerCase()}));
    dispatch(removeFromFilterList(filterNumber));
  }

  function valueFormatter(val) {
    switch (property) {
      case "Type":
        return val.slice(0,1).toUpperCase() + val.slice(1);
      case "Height":
        return val.slice(0, numberStart) + " " + val.slice(numberStart) + "m";
      case "Weight":
        return val.slice(0, numberStart) + " " + val.slice(numberStart) + "kg";
      default:
        return val
    }
  }
  
  return <button className={`filter-block ${property} ${value}`} onClick={handleClick}>{property}: {valueFormatter(value)}</button>
}