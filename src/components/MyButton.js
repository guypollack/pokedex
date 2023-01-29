import React from "react";
import { useNavigate } from "react-router";

export function MyButton({location, name}) {
  let navigate = useNavigate();
  function handleClick() {
    navigate(location);
  };
  return <button onClick={handleClick}>{name}</button>;
};