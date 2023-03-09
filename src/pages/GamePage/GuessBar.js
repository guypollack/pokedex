import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm, setSearchTerm, selectFilteredNames, selectIsAnswerValid, markAnswer, selectIsMarkingInProgress, setIsMarkingInProgress, selectRound, setIsAnswerValid } from "../../features/game/gameSlice";

export function GuessBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const filteredNames = useSelector(selectFilteredNames).slice(0,5);
  const isAnswerValid = useSelector(selectIsAnswerValid);
  const isMarkingInProgress = useSelector(selectIsMarkingInProgress)
  const round = useSelector(selectRound);

  function handleChange(e) {
    dispatch(setSearchTerm(e.target.value));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === "Unidentified") { //e.key === "Unidentified" captures Enter presses and clicks inside datalist
      if (isAnswerValid) {
        handleSubmit(e);
        return;
      } else if (document.querySelectorAll(".filtered-name-option").length > 0) {
        const topSuggestion = document.querySelectorAll(".filtered-name-option")[0].value;
        dispatch(setSearchTerm(topSuggestion));
        handleSubmit(e);
      }
    }
  }

  function handleSubmit(e) {
    if (isMarkingInProgress) return;
    if (isAnswerValid || e.type === "keydown") {
      dispatch(setIsMarkingInProgress(true));
      document.querySelectorAll(".game-page-picture")[round - 1].classList.add("revealed");
      document.querySelectorAll(".game-page-name")[round - 1].classList.add("revealed");
      setTimeout(() => {
        // document.querySelector(".game-page-picture").classList.add("hidden");
        document.querySelectorAll(".game-page-picture")[round - 1].classList.remove("revealed");
        document.querySelectorAll(".game-page-name")[round - 1].classList.remove("revealed");
        // document.querySelector(".game-page-picture").classList.remove("hidden");
        dispatch(markAnswer(round - 1));
        dispatch(setIsMarkingInProgress(false));
      },3000);
      
      setTimeout(() => {
        document.querySelector("#guess-bar").focus();
      },3010);
    }
  }

  return (
    <div>
      <label htmlFor="guess-bar">Guess</label>
      <input type="text" id="guess-bar" value={searchTerm} list="guess-bar-options" disabled={isMarkingInProgress} onChange={handleChange} onKeyDown={handleKeyDown}></input>
      <datalist id="guess-bar-options" >
        {!isMarkingInProgress && filteredNames.map((name, index) => <option value={name} className="filtered-name-option" key={`filtered-name-option-${+index+1}`} />)}
      </datalist>
      <button onClick={handleSubmit}>Check</button>
    </div>
  )
}