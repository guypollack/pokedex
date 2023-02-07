import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { findMainColor } from "../../util/findMainColor";
import { addOutline, removeOutline } from "../../util/addRemoveOutline";
import { setOutlineColor } from "../../features/pokemon/pokemonSlice";
import "./PokemonCardContainer.css";

export function PokemonCardContainer({number, name, imageUrl}) {
  // console.log("A");
  // console.log(number);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let imageClassName = "pokemon-card-image";
  const id = `${name}-card-image`;

  useEffect(() => {
    if (name.includes("saur")) {
      findMainColor(imageUrl);
    }

  },[])



  function handleClick() {
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
    <div key={number} className="pokemon-card-container" onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
      <img id={id}  className="pokemon-card-image" src={imageUrl} />
      <div className="pokemon-card-details">
        <p>{number}</p>
        <p>{name}</p>
      </div>
    </div>
  )
};