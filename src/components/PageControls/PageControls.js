import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slider } from '../../components/Slider/Slider';
import { selectFontStyle, toggleFontStyle } from '../../features/design/designSlice';
import "./PageControls.css";

export function PageControls() {
  const dispatch = useDispatch();

  const fontStyle = useSelector(selectFontStyle);

  function handleFontChange() {
    dispatch(toggleFontStyle());
    const body = document.getElementsByTagName('body')[0];
    if (!body.classList.contains("gameboy-mode")) {
      body.classList.add("gameboy-mode");
    } else {
      body.classList.remove("gameboy-mode");
    }
  }

  return (
    <div className="page-controls">
      <Slider heading="" value1="Normal" value2="Gameboy Mode" checked={fontStyle === "gameboy"} onChange={handleFontChange} />
    </div>
  )

}