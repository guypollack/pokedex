import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm, setSearchTerm, setDisplayCount } from "../../features/pokemon/pokemonSlice";

export function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  function handleChange(e) {
    dispatch(setSearchTerm(e.target.value));
    dispatch(setDisplayCount(50));
  }

  return (
    <div>
      <h4>Search</h4>
      <input type="text" value={searchTerm} onChange={handleChange}></input>
    </div>
  )
}
