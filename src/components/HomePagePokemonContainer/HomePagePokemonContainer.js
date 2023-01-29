import React from "react";
import "./HomePagePokemonContainer.css";
import { useNavigate } from "react-router";

export function HomePagePokemonContainer({number, name, imageUrl}) {
  // console.log("A");
  // console.log(number);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/pokemon/"+name);
  }
  return (
    <div key={number} className="home-page-pokemon-container" onClick={handleClick}>
      <img className="home-page-pokemon-image" src={imageUrl} />
      <div className="home-page-pokemon-details">
        <p>{number}</p>
        <p>{name}</p>
      </div>
    </div>
  )
};