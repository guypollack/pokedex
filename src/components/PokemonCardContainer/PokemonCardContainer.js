import React from "react";
import "./PokemonCardContainer.css";
import { useNavigate } from "react-router";

export function PokemonCardContainer({number, name, imageUrl}) {
  // console.log("A");
  // console.log(number);

  let imageClassName = "pokemon-card-image";
  const id = `${name}-card-image`;

  const navigate = useNavigate();

  function handleClick() {
    navigate("/pokemon/"+name);
  }

  function handleMouseOver() {
    // imageClassName = "pokemon-card-image-hovered";
    // alert(imageClassName);
    document.getElementById(id).classList.add("hovered");

  }

  function handleMouseOut() {
    document.getElementById(id).classList.remove("hovered");
  }

  return (
    <div key={number} className="pokemon-card-container" onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
      <img id={id}  className="pokemon-card-image" src={imageUrl} />
      <div className="pokemon-card-details">
        <p>{number}</p>
        <p>{name}</p>
      </div>
    </div>
  )
};