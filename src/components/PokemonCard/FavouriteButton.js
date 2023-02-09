import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

import "./FavouriteButton.css";

export function FavouriteButton({favourited, onClick}) {
  if (!favourited) {
    return (
      <div className="favourite-button" onClick={onClick}>
        <FontAwesomeIcon className="outline-heart" icon={outlineHeart} />
        <FontAwesomeIcon className="solid-heart" icon={solidHeart} />
      </div>
    )
  } else {
    return (
      <div className="favourite-button" onClick={onClick}>
        <FontAwesomeIcon className="solid-heart favourited" icon={solidHeart} />
      </div>
    )
  }
  
};