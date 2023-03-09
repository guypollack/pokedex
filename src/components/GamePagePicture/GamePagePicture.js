import React from "react";
import "./GamePagePicture.css";

export function GamePagePicture({classNameVisibility, imageUrl, name}) {

  return (
    <div className={"game-page-picture" + classNameVisibility}>
      <img draggable="false" src={imageUrl}></img>
      <h4 className="game-page-name">{name}</h4>
    </div>
  )
}