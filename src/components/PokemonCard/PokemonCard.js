import React, { useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

import "./PokemonCard.css";

export function PokemonCard({number, name, id, imageUrl, handleClickCard, handleClickFavourite, handleMouseOver, handleMouseOut}) {
  return (
    <div key={number} className="pokemon-card" onClick={handleClickCard}>
      <div className="favourite-button" onClick={handleClickFavourite}>
        <FontAwesomeIcon className="outline-heart" icon={outlineHeart} />
        <FontAwesomeIcon className="solid-heart" icon={solidHeart} />
      </div>
      <img id={id}  className="pokemon-card-image" src={imageUrl} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
      <div className="pokemon-card-details">
        <p>{number}</p>
        <p>{name}</p>
      </div>
    </div>
  )
};