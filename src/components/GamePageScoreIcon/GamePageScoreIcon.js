import React from "react";
import "./GamePageScoreIcon.css";

export function GamePageScoreIcon() {

  // 96 x 96 px
  return (
    <div className="game-page-score-icon">
      <div className="game-page-score-icon-placeholder"></div>
      <div className="game-page-score-icon-image-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/77.png"></img>
      </div>
    </div>
  )
}