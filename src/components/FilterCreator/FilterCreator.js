import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory, selectOperator, selectValue, setCategory, setOperator, setValue, setSelectorValue } from "../../features/filters/filtersSlice";
import { CategorySelector } from "./CategorySelector";
import { OperatorSelector } from "./OperatorSelector";
import { ValueSelector } from "./ValueSelector";
import "./FilterCreator.css";

export function FilterCreator() {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const operator = useSelector(selectOperator);
  const value = useSelector(selectValue);

  const inputValid = (category === "Height" || category === "Weight") ? (category && operator && (value >= 0)) : (category && value);

  function handleChange(e) {
    // alert(e.target.id);
    const dropdown = e.target.id.slice(0,e.target.id.indexOf("-"));
    // alert(dropdown);
    // alert(e.target.id.indexOf("-"));
    dispatch(setSelectorValue({"selector": dropdown, "value": e.target.value}));
  }

  return (
    <div className="filter-creator">
      <h2>Filter Creator</h2>
      <CategorySelector />
      {(category === "Height" || category === "Weight") && <OperatorSelector />}
      {(category !== "") && <ValueSelector />}
      <button disabled={!inputValid}>Add Filter</button>
    </div>
  )
}