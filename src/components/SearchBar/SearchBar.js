import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNumberOfFilters, selectSearchTerm, setSearchTerm, setDisplayCount } from "../../features/pokemon/pokemonSlice";
import "./SearchBar.css";

export function SearchBar() {
  const dispatch = useDispatch();
  const numberOfFilters = useSelector(selectNumberOfFilters);
  const searchTerm = useSelector(selectSearchTerm);

  function handleChange(e) {
    dispatch(setSearchTerm(e.target.value));
    // dispatch(setDisplayCount(50));
    // alert(numberOfFilters)
    // alert(e.target.value.length);
    // alert((numberOfFilters + e.target.value.length) > 1);
    dispatch(setDisplayCount((numberOfFilters + e.target.value.length) > 0 ? 50 : 100));
  }

  return (
    <div className="search-bar">
      <input type="text" value={searchTerm} onChange={handleChange}></input>
      {/* {!dataFetched && <h3>Fetching...</h3>} */}
    </div>
  )
}
