import React from "react";
import { removeFilter, setDisplayCount, selectNumberOfFilters, selectSearchTerm } from "../../features/pokemon/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFilterList } from "../../features/filters/filtersSlice";
import "./FilterBlock.css"

export function FilterBlock({property, value, filterNumber}) {
  const dispatch = useDispatch();
  const numberOfFilters = useSelector(selectNumberOfFilters);
  const searchTerm = useSelector(selectSearchTerm);
  let numberStart;

  if (property === "Height" || property === "Weight") {
    numberStart = value[1] === "=" ? 2 : 1;
  }

  function handleClick(e) {
    dispatch(setDisplayCount((numberOfFilters > 1 || searchTerm.length > 0) ? 50 : 100));
    dispatch(removeFilter({"property": property.toLowerCase() + "s", "value": value.toLowerCase()}));
    dispatch(removeFromFilterList([property, value.toString()]));
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

  function valueRounder(val) {
    const valWithoutOperator = val.replace(">","").replace("<","").replace("=","");
    switch (property) {
      case "Height":
        return Math.floor(+valWithoutOperator).toString();
      case "Weight":
        return (Math.floor(+valWithoutOperator / 100) * 100).toString();
      default:
        return val;
    }
  }
  
  return (
    <div className={`filter-block ${property.toLowerCase()}-${valueRounder(value).toLowerCase()}`} onClick={handleClick}>
      <p>{valueFormatter(value)}</p>
    </div>)
}