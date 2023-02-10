import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

import "./FavouriteButton.css";

export function FavouriteButton({favourited, onClick}) {
  return (
    <div className="favourite-button" onClick={onClick}>
      {!favourited && <FontAwesomeIcon className="outline-heart" icon={outlineHeart} />}
      <FontAwesomeIcon className={"solid-heart" + (favourited ? " favourited" : "")} icon={solidHeart} />
      <FontAwesomeIcon className={"solid-heart-animation"  + (favourited ? " favourited" : "")} icon={solidHeart} />
    </div>
  )
};