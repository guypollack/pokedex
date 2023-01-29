import React from "react";
import "./HomePagePokemonContainer.css";

export function HomePagePokemonContainer({name, imageUrl}) {
  return (
    <div className="home-page-pokemon-container">
      <img className="home-page-pokemon-image" src={imageUrl} />
      <p key={name}>{name}</p>
    </div>
  )
};