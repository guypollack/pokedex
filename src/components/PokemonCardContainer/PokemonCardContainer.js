import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { findMainColor } from "../../util/findMainColor";
import { addOutline, removeOutline } from "../../util/addRemoveOutline";
import { selectFavourites, addToFavourites, removeFromFavourites } from "../../features/favourites/favouritesSlice";
import { PokemonCard } from "../PokemonCard/PokemonCard";
// import "./PokemonCardContainer.css";

export function PokemonCardContainer({number, name, imageUrl}) {
  // console.log("A");
  // console.log(number);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const favourites = useSelector(selectFavourites);
  const favourited = favourites.includes(number);

  let imageClassName = "pokemon-card-image";
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
    navigate("/pokemon/"+name);
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
      favourited={favourited}
      onClickCard={handleClickCard}
      handleMouseOver={handleMouseOver}
      handleMouseOut={handleMouseOut}
    />
  )
};