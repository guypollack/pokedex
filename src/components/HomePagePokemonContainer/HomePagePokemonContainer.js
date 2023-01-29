import React from "react";
import "./HomePagePokemonContainer.css";

export function HomePagePokemonContainer({number, name, imageUrl}) {
  // console.log("A");
  // console.log(number);
  return (
    <div key={number} className="home-page-pokemon-container">
      <img className="home-page-pokemon-image" src={imageUrl} />
      <p>{number}</p>
      <p>{name}</p>
    </div>
  )
};