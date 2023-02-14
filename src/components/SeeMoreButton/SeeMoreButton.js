import React from "react";
import { selectLBound, selectUBound, setBounds, selectFilteredPokemon, setFilteredPokemon, selectPreviousCount, setPreviousCount } from "../../features/pokemon/pokemonSlice";
import { useSelector, useDispatch } from "react-redux";

export function SeeMoreButton() {
  const dispatch = useDispatch();

  const filteredPokemon = useSelector(selectFilteredPokemon);

  const lBound = useSelector(selectLBound);
  const uBound = useSelector(selectUBound);

  function handleClick() {
    dispatch(setFilteredPokemon(filteredPokemon));
    dispatch(setPreviousCount(Object.keys(filteredPokemon).length));
    dispatch(setBounds({"lBound": lBound + 100, "uBound": uBound + 100}));
  }

  return <button onClick={handleClick}>See More</button>

}