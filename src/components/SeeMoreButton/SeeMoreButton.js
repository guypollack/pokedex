import React from "react";
import { selectLBound, selectUBound, setBounds, setReload, selectFilteredPokemon, setFilteredPokemon } from "../../features/pokemon/pokemonSlice";
import { useSelector, useDispatch } from "react-redux";

export function SeeMoreButton() {
  const dispatch = useDispatch();

  const filteredPokemon = useSelector(selectFilteredPokemon);

  const lBound = useSelector(selectLBound);
  const uBound = useSelector(selectUBound);

  function handleClick() {
    dispatch(setReload(false));
    dispatch(setFilteredPokemon(filteredPokemon));
    dispatch(setBounds({"lBound": lBound + 100, "uBound": uBound + 100}));
  }

  return <button onClick={handleClick}>See More</button>

}