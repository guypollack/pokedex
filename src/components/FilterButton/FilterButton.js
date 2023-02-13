import React from "react";
import { addFilter } from "../../features/pokemon/pokemonSlice";
import { useDispatch } from "react-redux";

export function FilterButton({property, value}) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(addFilter({property, value}));
  }
  
  return <button onClick={handleClick}>{property}: {value}</button>
}