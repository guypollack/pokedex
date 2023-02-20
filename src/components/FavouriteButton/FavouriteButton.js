import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite, selectFavourites } from "../../features/favourites/favouritesSlice";
import { selectCurrentUser } from "../../features/users/usersSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

import "./FavouriteButton.css";

export function FavouriteButton({number}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const favourites = useSelector(selectFavourites);
  const favourited = favourites[currentUser].includes(number);  

  function handleChange(e) {
    dispatch(toggleFavourite({"username": currentUser, "pokemon": number}));
  }

  function handleClick(e) {
    e.stopPropagation();
  }

  return (
    <div className="favourite-button">
      <input type="checkbox" id={`favourite-button-${number}`} checked={favourited} onClick={handleClick} onChange={handleChange}></input>
      <label htmlFor={`favourite-button-${number}`} onClick={handleClick} >
        <FontAwesomeIcon className="outline-heart" icon={outlineHeart} />
        <FontAwesomeIcon className="solid-heart" icon={solidHeart} />
        <FontAwesomeIcon className="animation-heart" icon={solidHeart} />
      </label>  
    </div>
  )
};