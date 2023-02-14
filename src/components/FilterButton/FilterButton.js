import React from "react";
import { addFilter, removeFilter, setBounds, selectFilteredPokemon, setFilteredPokemon, selectLBound, selectUBound, setPreviousCount } from "../../features/pokemon/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";
import "./FilterButton.css"

export function FilterButton({property, value}) {
  const dispatch = useDispatch();

  const filteredPokemon = useSelector(selectFilteredPokemon);
  // const lBound = useSelector(selectLBound);
  // const uBound = useSelector(selectUBound);

  function handleClick(e) {
    // alert("A");
    // alert(e.target.classList.contains("active"));
    dispatch(setFilteredPokemon(filteredPokemon));
    dispatch(setPreviousCount(0));
    if (!e.target.classList.contains("active")) {
      dispatch(addFilter({property, value}));
      // dispatch(filterPokemonAsync());
      e.target.classList.add("active");
    } else {
      dispatch(setBounds({"lBound": 1, "uBound": 101}));
      dispatch(removeFilter({property, value}));
      // dispatch(filterPokemonAsync());
      e.target.classList.remove("active");
    }
  }
  
  return <button className="filter-button"  onClick={handleClick}>{property}: {value}</button>
}