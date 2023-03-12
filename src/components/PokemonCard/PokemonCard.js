import React from "react";
import { nameFormatter } from '../../util/nameFormatter.js';
import { FavouriteButton } from "../FavouriteButton/FavouriteButton";

import "./PokemonCard.css";

export function PokemonCard({number, name, id, imageUrl, index, onClickCard, onClickFavourite, handleMouseOver, handleMouseOut}) {
  return (
    <div key={number} className="pokemon-card" onClick={onClickCard}>
      <img id={id}  className="pokemon-card-image" src={`https://images.weserv.nl/?url=${imageUrl}&w=150&h=150`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
      <FavouriteButton onClick={onClickFavourite} number={number} index={index} />
      <div className="pokemon-card-details">
        <p>{number}</p>
        <p>{nameFormatter(name)}</p>
      </div>
    </div>
  )
};