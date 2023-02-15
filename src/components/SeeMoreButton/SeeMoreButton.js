import React from "react";
import { selectDisplayCount, setDisplayCount } from "../../features/pokemon/pokemonSlice";
import { useSelector, useDispatch } from "react-redux";

export function SeeMoreButton() {
  const dispatch = useDispatch();

  const displayCount = useSelector(selectDisplayCount);

  function handleClick() {
    dispatch(setDisplayCount(displayCount + 50));
  }

  return <button onClick={handleClick}>See More</button>

}