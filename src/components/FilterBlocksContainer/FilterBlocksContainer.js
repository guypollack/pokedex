import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectInCategorySearchTypes, toggleSearchTypeByCategory } from "../../features/pokemon/pokemonSlice";
import { nameFormatter } from "../../util/nameFormatter";
import { Slider } from "../Slider/Slider";
import { FilterBlock } from "../FilterBlock/FilterBlock";
import "./FilterBlocksContainer.css";

export function FilterBlocksContainer({category, filters}) {
  const dispatch = useDispatch();
  const searchType = useSelector(selectInCategorySearchTypes)[category + "s"];

  return (
    <div className="filter-blocks-container">
      <h3>{nameFormatter(category)}</h3>
      <Slider heading={`${category} slider`} value1="ALL" value2="ANY" checked={searchType === "or"} onChange={() => dispatch(toggleSearchTypeByCategory(category + "s"))} />
      <div className="filter-blocks-flex-container">
        {filters.map(([cat, value], index) => <FilterBlock property={cat} value={value} filterNumber={index} key={`${cat}-filter-block-${index}`}/>)}
      </div>
    </div>
  )
}