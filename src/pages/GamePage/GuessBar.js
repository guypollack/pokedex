import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm, setSearchTerm, selectFilteredNames } from "../../features/game/gameSlice";

export function GuessBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const filteredNames = useSelector(selectFilteredNames).slice(0,5);

  function handleChange(e) {
    dispatch(setSearchTerm(e.target.value));
  }

  return (
    <div>
      <label htmlFor="guess-bar">Guess</label>
      <input type="text" id="guess-bar" value={searchTerm} list="guess-bar-options" onChange={handleChange}></input>
      <datalist id="guess-bar-options">
        {filteredNames.map((name, index) => <option value={name} key={`filtered-name-option-${+index+1}`} />)}
      </datalist>
    </div>
  )
}