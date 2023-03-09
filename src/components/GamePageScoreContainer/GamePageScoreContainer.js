import React from "react";
import { GamePageScoreIcon } from "../GamePageScoreIcon/GamePageScoreIcon";
import { useSelector } from "react-redux";
import { selectQuestionPokemon, selectScores } from "../../features/game/gameSlice";
import "./GamePageScoreContainer.css";

export function GamePageScoreContainer() {

  const imageUrls = useSelector(selectQuestionPokemon).map(pokemon => pokemon["imageUrl"]);
  const scores = useSelector(selectScores);

  return (
    <div className="game-page-score-container">
      {imageUrls.map((url, index) => <GamePageScoreIcon imageUrl={url} mark={scores[index]} />)}
    </div>
  )
}