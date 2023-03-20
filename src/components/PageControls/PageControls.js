import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slider } from '../../components/Slider/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
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
      {(fontStyle === "gameboy" && playStatus === "PAUSED") && <FontAwesomeIcon className="play-button" icon={faVolumeMute} onClick={handleClickPlayPause} />}
      {(fontStyle === "gameboy" && playStatus === "PLAYING") && <FontAwesomeIcon className="pause-button" icon={faVolumeHigh} onClick={handleClickPlayPause} />}
    </div>
  )

}