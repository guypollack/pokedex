import React from "react";

import { FilterBlock } from "../FilterBlock/FilterBlock";
import "./FilterBlocksContainer.css";

export function FilterBlocksContainer({category, filters}) {
  return (
    <div className="filter-blocks-container">
      <h3>{category}</h3>
      <div className="filter-blocks-flex-container">
        {filters.map(([cat, value], index) => <FilterBlock property={cat} value={value} filterNumber={index} key={`${cat}-filter-block-${index}`}/>)}
      </div>
    </div>
  )
}