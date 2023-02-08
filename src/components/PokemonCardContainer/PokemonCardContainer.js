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

  async function addOutlineColorToPokemon() {
    const color = await findMainColor(imageUrl);
    dispatch(setOutlineColor({"number": number, "color": color}));
  }

  useEffect(() => {
    // addOutlineColorToPokemon();
  },[])

  useEffect(() => { // use this logic to only add outline color data for visible elements
    if (name.includes("pidgey")) {
      // alert(document.getElementById(id).classList);
      const top = document.getElementById(id).getBoundingClientRect().top;
      // console.log((top >= 0) && (top <= window.innerHeight));
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
    <div key={number} className="pokemon-card-container" onClick={handleClick} >
      <img id={id}  className="pokemon-card-image" src={imageUrl} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
      <div className="pokemon-card-details">
        <p>{number}</p>
        <p>{name}</p>
      </div>
    </div>
  )
};