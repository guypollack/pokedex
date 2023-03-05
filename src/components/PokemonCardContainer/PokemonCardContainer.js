import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { addOutline, removeOutline } from "../../util/addRemoveOutline";
import { PokemonCard } from "../PokemonCard/PokemonCard";
// import "./PokemonCardContainer.css";

export function PokemonCardContainer({number, name, imageUrl}) {
  // console.log("A");
  // console.log(number);

  const navigate = useNavigate();

  const id = `${name}-card-image`;

  useEffect(() => {
    // addOutlineColorToPokemon();
  },[])

  // useEffect(() => { // use this logic to only add outline color data for visible elements
  //   if (name.includes("pidgey")) {
  //     // alert(document.getElementById(id).classList);
  //     const top = document.getElementById(id).getBoundingClientRect().top;
  //     // console.log((top >= 0) && (top <= window.innerHeight));
  //   }
  // },[])

  function handleClickCard(e) {
    // alert("Card clicked");
    navigate("/pokemon/"+number);
  }

  function handleMouseOver() {
    // imageClassName = "pokemon-card-image-hovered";
    // alert(imageClassName);
    document.getElementById(id).classList.add("hovered");
    addOutline(id);
  }

  function handleMouseOut() {
    document.getElementById(id).classList.remove("hovered");
    removeOutline(id);
  }

  return (
    <PokemonCard 
      number={number}
      name={name}
      id={id}
      imageUrl={imageUrl}
      onClickCard={handleClickCard}
      handleMouseOver={handleMouseOver}
      handleMouseOut={handleMouseOut}
    />
  )
};