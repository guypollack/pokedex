import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite, selectFavourites } from "../../features/favourites/favouritesSlice";
import { selectCurrentUser } from "../../features/users/usersSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart, faHeartCircleXmark as xmarkHeart } from "@fortawesome/free-solid-svg-icons";
import { selectFontStyle } from "../../features/design/designSlice";

import "./FavouriteButton.css";

export function FavouriteButton({number, index}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const favourites = useSelector(selectFavourites);
  const favourited = favourites[currentUser].includes(number);

  const fontStyle = useSelector(selectFontStyle);

  function handleChange(e) {
    dispatch(toggleFavourite({"username": currentUser, "pokemon": number}));
  }

  function handleClick(e) {
    e.stopPropagation();
  }

  function handleClickXmarkHeart(e) {
    e.stopPropagation();
    if (document.querySelectorAll(".xmark-tooltip").length > 0) return;
    if (document.querySelectorAll(".pokemon-card").length === 0) return; // to stop function execution on PokemonPage

    const tooltip = document.createElement("p");
    tooltip.classList.add("xmark-tooltip");
    const tooltipText = document.createTextNode("Log in to add Pokémon to your favourites");
    const currentCard = document.querySelectorAll(".pokemon-card")[+index];
    if (window.innerWidth - currentCard.getBoundingClientRect().right < 120) {
      tooltip.classList.add("narrow");
    }
    tooltip.appendChild(tooltipText);
    currentCard.appendChild(tooltip);
    setTimeout(() => {
      currentCard.removeChild(tooltip)
    },2000); 
  }

  if (currentUser !== "guest") {
    return (
      <div className="favourite-button">
        <input type="checkbox" id={`favourite-button-${number}`} checked={favourited} onClick={handleClick} onChange={handleChange}></input>
        <label className="heart-icon-container" htmlFor={`favourite-button-${number}`} onClick={handleClick} >
          <FontAwesomeIcon className="outline-heart" icon={outlineHeart} />
          <FontAwesomeIcon className="solid-heart" icon={solidHeart} />
          {fontStyle === "normal" && <FontAwesomeIcon className="animation-heart" icon={solidHeart} />}
          {fontStyle === "gameboy" && <FontAwesomeIcon className="gameboy-animation-heart" icon={solidHeart} />}
        </label>  
      </div>
    )
  } else {
    return (
      <div className="favourite-button">
        <FontAwesomeIcon className="xmark-heart" icon={xmarkHeart} onClick={handleClickXmarkHeart} />
      </div>
    )
  }
};