import React from "react";
import "./LoadingIcon.css";

export function LoadingIcon() {
  return (
    <div className="loading-icon-container">
      <img className="loading-icon" src={require('../..//resources/images/pokeball_black.png')} />
    </div>
  )
}