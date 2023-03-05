import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function ArrowContainer({side, visibility}) {
  return (
    <div className={`arrow-container ${side} ${visibility}`}>
      {side === "left" && <FontAwesomeIcon className="left-arrow" icon={faArrowLeft} />}
      {side === "right" && <FontAwesomeIcon className="right-arrow" icon={faArrowRight} />}
    </div>
  )
}