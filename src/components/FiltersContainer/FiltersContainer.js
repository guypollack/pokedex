import React from "react";
import { useSelector } from "react-redux";

import { FilterCreator } from "../FilterCreator/FilterCreator";
import { FilterBlocksContainer } from "../FilterBlocksContainer/FilterBlocksContainer";
import { selectFilterList } from "../../features/filters/filtersSlice";
import "./FiltersContainer.css";


export function FiltersContainer() {

  const filterList  = useSelector(selectFilterList);
  const typeFilters = filterList.filter(([category, value]) => category === "Type");
  const generationFilters = filterList.filter(([category, value]) => category === "Generation");
  const heightFilters = filterList.filter(([category, value]) => category === "Height");
  const weightFilters = filterList.filter(([category, value]) => category === "Weight");


  return (
    <div className="filters-container">
      {/* <button onClick={() => dispatch(toggleInCategorySearchType())}>In category search type: {inCategorySearchType}</button> */}
      {/* <button onClick={() => dispatch(toggleBetweenCategorySearchType())}>Between category search type: {betweenCategorySearchType}</button> */}
      <FilterCreator />
      <div className="filter-blocks-containers-flex">
        {typeFilters.length > 0 && <FilterBlocksContainer category="type" filters={typeFilters} />}
        {generationFilters.length > 0 && <FilterBlocksContainer category="generation" filters={generationFilters} />}
        {heightFilters.length > 0 && <FilterBlocksContainer category="height" filters={heightFilters} />}
        {weightFilters.length > 0 && <FilterBlocksContainer category="weight" filters={weightFilters} />}
      </div>
    </div>
  )
}