import React from "react";
import { FavouriteButton } from "../FavouriteButton/FavouriteButton";

import "./PokemonCard.css";

export function PokemonCard({number, name, id, imageUrl, onClickCard, onClickFavourite, handleMouseOver, handleMouseOut}) {
  return (
    <div key={number} className="pokemon-card" onClick={onClickCard}>
      <img id={id}  className="pokemon-card-image" src={`https://images.weserv.nl/?url=${imageUrl}&w=150&h=150`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
      <FavouriteButton onClick={onClickFavourite} number={number}/>
      <div className="pokemon-card-details">
        <p>{number}</p>
        <p>{name}</p>
      </div>
    </div>
  )
};