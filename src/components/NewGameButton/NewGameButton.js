import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPokemon } from "../../features/pokemon/pokemonSlice";
import { addPokemonToQuestions, resetGame } from "../../features/game/gameSlice";
import { nameFormatter } from "../../util/nameFormatter";

export function NewGameButton() {
  const dispatch = useDispatch();
  const allPokemon = useSelector(selectAllPokemon);

  function handleReset() {

    dispatch(resetGame());

    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * 1009) + 1;
      const pokemonData = {"number": randomNumber, "name": nameFormatter(allPokemon[randomNumber]["name"]), "imageUrl": allPokemon[randomNumber]["imageUrl"]};
      dispatch(addPokemonToQuestions(pokemonData));
    }
  }

  return (
    <div className="new-game-button-container">
      <button onClick={handleReset}>New Game</button>
    </div>
  )
}