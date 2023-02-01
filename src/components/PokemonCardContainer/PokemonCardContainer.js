import React from "react";
import "./PokemonCardContainer.css";
import { useNavigate } from "react-router";

export function PokemonCardContainer({number, name, imageUrl}) {
  // console.log("A");
  // console.log(number);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/pokemon/"+name);
  }
  return (
    <div key={number} className="pokemon-card-container" onClick={handleClick}>
      <img className="pokemon-card-image" src={imageUrl} />
      <div className="pokemon-card-details">
        <p>{number}</p>
        <p>{name}</p>
      </div>
    </div>
  )
};