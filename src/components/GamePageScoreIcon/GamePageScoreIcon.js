import React from "react";
import "./GamePageScoreIcon.css";

export function GamePageScoreIcon({imageUrl}) {

  return (
    <div className="game-page-score-icon">
      <div className="game-page-score-icon-placeholder"></div>
      <div className="game-page-score-icon-image-container">
        <img src={`https://images.weserv.nl/?url=${imageUrl}&w=80&h=80`}></img>
      </div>
    </div>
  )
}