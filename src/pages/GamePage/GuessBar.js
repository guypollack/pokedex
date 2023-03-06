import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm, setSearchTerm } from "../../features/game/gameSlice";

export function GuessBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  function handleChange(e) {
    dispatch(setSearchTerm(e.target.value));
  }

  return (
    <div>
      <label htmlFor="guess-bar">Guess</label>
      <input type="text" id="guess-bar" value={searchTerm} onChange={handleChange}></input>
    </div>
  )
}