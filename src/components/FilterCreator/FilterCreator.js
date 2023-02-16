import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory, selectOperator, selectValue, setSelectorValue, selectFilterList, addToFilterList } from "../../features/filters/filtersSlice";
import { CategorySelector } from "./CategorySelector";
import { OperatorSelector } from "./OperatorSelector";
import { ValueSelector } from "./ValueSelector";
import { addFilter, selectFilters, setDisplayCount } from "../../features/pokemon/pokemonSlice";
import "./FilterCreator.css";

export function FilterCreator() {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const operator = useSelector(selectOperator);
  const value = useSelector(selectValue);


  const inputValid = (category === "Height" || category === "Weight") ? (category && operator && (value >= 0)) : (category && value);

  function handleSubmit() {
    // alert("Button clicked");
    dispatch(setDisplayCount(50));
    dispatch(addToFilterList([category, operator + value]));
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
    </div>
  )
}