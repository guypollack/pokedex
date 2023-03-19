import React from "react";
import { useSelector } from "react-redux";
import { nameFormatter } from '../../util/nameFormatter.js';
import { FavouriteButton } from "../FavouriteButton/FavouriteButton";
import { selectFontStyle } from "../../features/design/designSlice.js";
import "./PokemonCard.css";

export function PokemonCard({number, name, id, imageUrl, index, onClickCard, onClickFavourite, handleMouseOver, handleMouseOut}) {
  const fontStyle = useSelector(selectFontStyle);
  const imageSource = fontStyle === "normal" ? `https://images.weserv.nl/?url=${imageUrl}&w=150&h=150` : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + number +".png";
  return (
    <div key={number} className="pokemon-card" onClick={onClickCard}>
      <img id={id}  className="pokemon-card-image" src={imageSource} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
      <FavouriteButton onClick={onClickFavourite} number={number} index={index} />
      <div className="pokemon-card-details">
        <p>{number}</p>
        <p>{name}</p>
      </div>
    </div>
  )
};