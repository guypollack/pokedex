import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory, setSelectorValue } from "../../features/filters/filtersSlice";

export function CategorySelector() {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  function handleChange(e) {
    dispatch(setSelectorValue({"selector": "category", "value": e.target.value}));
    dispatch(setSelectorValue({"selector": "operator", "value": ""}));
    dispatch(setSelectorValue({"selector": "value", "value": ""}));
    if (e.target.value === "Height") {
      dispatch(setSelectorValue({"selector": "value", "value": 5}));
    }
    if (e.target.value === "Weight") {
      dispatch(setSelectorValue({"selector": "value", "value": 500}));
    }
  }

  return (
    <div className="selector">
      <label htmlFor="category-selector">Category</label>
      <select id="category-selector" value={category} onChange={handleChange}>
        <option></option>
        <option>Type</option>
        <option>Generation</option>
        <option>Height</option>
        <option>Weight</option>
      </select>
    </div>
  )
}