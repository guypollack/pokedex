import React from "react";
import { useDispatch } from "react-redux"; 
import { toggleSearchType } from "../../features/pokemon/pokemonSlice";  
import "./Slider.css";

export function Slider({heading, type, value1, value2, checked}) {
  const dispatch = useDispatch();

  function toggleButton(target) {
    if (target.classList.contains("toggled")) {
      target.classList.remove("toggled");
    } else {
      target.classList.add("toggled");
    }
    dispatch(toggleSearchType(type));
  }

  function handleClick(e) {
    if (e.target.classList.contains("slider-bar")) {
      toggleButton(e.target);
    } else if (e.target.classList.contains("slider-button")) {
      toggleButton(e.target.parentElement);
    }
  }
  
  return (
    <div className="slider-flex-container">
      <h6>{heading}</h6>
      <div className="slider-container">
        <div>
          <p>{value1}</p>
        </div>
        <input type="checkbox" id={`${heading}-checkbox`} checked={checked} onChange={() => dispatch(toggleSearchType(type))}></input>
        <label for={`${heading}-checkbox`} className="slider-bar">
          <div className="slider-button"></div>
        </label>
        {/* <div className="slider-bar" onClick={handleClick}>
          <div className="slider-button"></div>
        </div> */}
        <div>
          <p>{value2}</p>
        </div>
      </div>
    </div>
    
  )
}