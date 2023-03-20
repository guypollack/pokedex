import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slider } from '../../components/Slider/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { selectFontStyle, toggleFontStyle, selectPlayStatus, togglePlayStatus } from '../../features/design/designSlice';
import "./PageControls.css";

export function PageControls() {
  const dispatch = useDispatch();

  const fontStyle = useSelector(selectFontStyle);
  const playStatus = useSelector(selectPlayStatus);

  function handleFontChange() {
    dispatch(toggleFontStyle());
    const body = document.getElementsByTagName('body')[0];
    if (!body.classList.contains("gameboy-mode")) {
      body.classList.add("gameboy-mode");
    } else {
      body.classList.remove("gameboy-mode");
    }
  }

  function handleClickPlayPause() {
    dispatch(togglePlayStatus());
  }

  return (
    <div className="page-controls">
      <Slider heading="" value1="Normal" value2="Gameboy Mode" checked={fontStyle === "gameboy"} onChange={handleFontChange} />
      {(fontStyle === "gameboy" && playStatus === "PAUSED") && <FontAwesomeIcon className="play-pause-button" icon={faPlay} onClick={handleClickPlayPause} />}
      {(fontStyle === "gameboy" && playStatus === "PLAYING") && <FontAwesomeIcon className="play-pause-button" icon={faPause} onClick={handleClickPlayPause} />}
    </div>
  )

}