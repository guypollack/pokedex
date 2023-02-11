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
      <img id={id}  className="pokemon-card-image" src={`https://images.weserv.nl/?url=${imageUrl}&w=150&h=150`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
      <div className="pokemon-card-details">
        <p>{number}</p>
        <p>{name}</p>
      </div>
    </div>
  )
};