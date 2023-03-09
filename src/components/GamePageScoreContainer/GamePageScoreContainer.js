import React from "react";
import { GamePageScoreIcon } from "../GamePageScoreIcon/GamePageScoreIcon";
import { useSelector } from "react-redux";
import { selectQuestionPokemon } from "../../features/game/gameSlice";

export function GamePageScoreContainer() {

  const imageUrls = useSelector(selectQuestionPokemon).map(pokemon => pokemon["imageUrl"]);

  return (
    <div>
      {imageUrls.map(url => <GamePageScoreIcon imageUrl={url} />)}
    </div>
  )
}