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
      <FilterCreator />
      <div className="filter-blocks-containers-flex">
        <FilterBlocksContainer category="type" filters={typeFilters} />
        <FilterBlocksContainer category="generation" filters={generationFilters} />
        <FilterBlocksContainer category="height" filters={heightFilters} />
        <FilterBlocksContainer category="weight" filters={weightFilters} />
      </div>
    </div>
  )
}