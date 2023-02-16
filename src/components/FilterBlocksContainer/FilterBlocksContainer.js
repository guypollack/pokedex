import React from "react";

import { FilterBlock } from "../FilterBlock/FilterBlock";
import "./FilterBlocksContainer.css";

export function FilterBlocksContainer({filters}) {
  return (
    <div className="filter-blocks-container">
      {filters.map(([category, value], index) => <FilterBlock property={category} value={value} filterNumber={index} key={`${category}-filter-block-${index}`}/>)}
    </div>
  )
}