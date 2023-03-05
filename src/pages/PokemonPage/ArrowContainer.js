import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export function ArrowContainer({side, number}) {

  const navigate = useNavigate();

  let visibility;
  if (side === "left") {
    visibility = number > 1 ? "visible" : "hidden";
  } else {
    visibility = number < 1008 ? "visible" : "hidden";
  }

  function handleClick(e) {
    if (side === "right") {
      navigate("/pokemon/" + (+number+1));
    } else {
      navigate("/pokemon/" + (+number-1));
    }
  }

  return (
    <div className={`arrow-container ${side} ${visibility}`} onClick={handleClick}>
      {side === "left" && <FontAwesomeIcon className="left-arrow" icon={faArrowLeft} />}
      {side === "right" && <FontAwesomeIcon className="right-arrow" icon={faArrowRight} />}
    </div>
  )
}