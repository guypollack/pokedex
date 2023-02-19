import React from "react";
import { useDispatch } from "react-redux"; 
import { toggleSearchType } from "../../features/pokemon/pokemonSlice";  
import "./Slider.css";

export function Slider({heading, type, value1, value2, checked}) {
  const dispatch = useDispatch();
  
  return (
    <div className="slider-flex-container">
      <h6>{heading}</h6>
      <div className="slider-container">
        <input type="checkbox" id={`${heading}-checkbox`} checked={checked} onChange={() => dispatch(toggleSearchType(type))}></input>
        <label htmlFor={`${heading}-checkbox`} className="slider-bar">
          <div className="slider-button"></div>
        </label>
        <div>
          <p className="slider-value">{value1}</p>
        </div>
        {/* <div className="slider-bar" onClick={handleClick}>
          <div className="slider-button"></div>
        </div> */}
        <div>
          <p className="slider-value">{value2}</p>
        </div>
      </div>
    </div>
    
  )
}