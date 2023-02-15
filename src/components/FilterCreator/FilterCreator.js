import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory, selectOperator, selectValue, setCategory, setOperator, setValue, setSelectorValue } from "../../features/filters/filtersSlice";
import { CategorySelector } from "./CategorySelector";
import { OperatorSelector } from "./OperatorSelector";
import { ValueSelector } from "./ValueSelector";
import { addFilter, selectFilters } from "../../features/pokemon/pokemonSlice";
import { FilterBlock } from "../FilterBlock/FilterBlock";
import "./FilterCreator.css";

export function FilterCreator() {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const operator = useSelector(selectOperator);
  const value = useSelector(selectValue);
  const filters = useSelector(selectFilters);

  const inputValid = (category === "Height" || category === "Weight") ? (category && operator && (value >= 0)) : (category && value);

  function handleChange(e) {
    const selector = e.target.id.slice(0,e.target.id.indexOf("-"));
    dispatch(setSelectorValue({"selector": selector, "value": e.target.value}));
  }

  function handleSubmit() {
    // alert("Button clicked");
    dispatch(addFilter({"property": (category.toLowerCase() + "s"), "value": operator + value.toString().toLowerCase()}));
    dispatch(setSelectorValue({"selector": "category", "value": ""}));
    dispatch(setSelectorValue({"selector": "operator", "value": ""}));
    dispatch(setSelectorValue({"selector": "value", "value": ""}));
  }


  return (
    <div className="filter-creator">
      <h2>Filter Creator</h2>
      <div className="selectors-flex-container">
        <CategorySelector />
        {(category === "Height" || category === "Weight") && <OperatorSelector />}
        {(category !== "") && <ValueSelector />}
        <button disabled={!inputValid} onClick={handleSubmit}>Add Filter</button>
      </div>
      <div className="filter-blocks-flex-container">
        {Object.entries(filters).map(([key, vals]) => vals.map(val => <FilterBlock property={key} value={val} />))}
      </div>
    </div>
  )
}