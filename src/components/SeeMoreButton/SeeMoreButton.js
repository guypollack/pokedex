import React from "react";
import { selectLBound, selectUBound, setBounds } from "../../features/pokemon/pokemonSlice";
import { useSelector, useDispatch } from "react-redux";

export function SeeMoreButton() {
  const dispatch = useDispatch();
  const lBound = useSelector(selectLBound);
  const uBound = useSelector(selectUBound);

  function handleClick() {
    dispatch(setBounds({"lBound": lBound + 100, "uBound": uBound + 100}));
  }

  return <button onClick={handleClick}>See More</button>

}