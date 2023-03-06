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

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (document.querySelectorAll(".filtered-name-option").length > 0) {
        const topSuggestion = document.querySelectorAll(".filtered-name-option")[0].value;
        dispatch(setSearchTerm(topSuggestion));
      }
    }
  }

  return (
    <div>
      <label htmlFor="guess-bar">Guess</label>
      <input type="text" id="guess-bar" value={searchTerm} list="guess-bar-options" onChange={handleChange} onKeyDown={handleKeyDown}></input>
      <datalist id="guess-bar-options">
        {filteredNames.map((name, index) => <option value={name} className="filtered-name-option" key={`filtered-name-option-${+index+1}`} />)}
      </datalist>
    </div>
  )
}