import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

import "./RemoveFilterButton.css";

export function RemoveFilterButton() {
  return <FontAwesomeIcon className="remove-filter-button" icon={faCircleXmark} />
}