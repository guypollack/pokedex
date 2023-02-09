import React from "react";
import { FavouriteButton } from "./FavouriteButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

import "./PokemonCard.css";

export function PokemonCard({number, name, id, imageUrl, favourited, onClickCard, onClickFavourite, handleMouseOver, handleMouseOut}) {
  return (
    <div key={number} className="pokemon-card" onClick={onClickCard}>
      <FavouriteButton favourited={favourited} onClick={onClickFavourite}/>
      <img id={id}  className="pokemon-card-image" src={imageUrl} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
      <div className="pokemon-card-details">
        <p>{number}</p>
        <p>{name}</p>
      </div>
    </div>
  )
};