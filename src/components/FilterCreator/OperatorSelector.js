import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectOperator, setSelectorValue } from "../../features/filters/filtersSlice";

export function OperatorSelector() {
  const dispatch = useDispatch();
  const operator = useSelector(selectOperator);

  function handleChange(e) {
    dispatch(setSelectorValue({"selector": "operator", "value": e.target.value}));
  }

  return (
    <div className="selector">
      <label htmlFor="operator-selector">Operator</label>
      <select id="operator-selector" value={operator} onChange={handleChange}>
        <option></option>
        <option>{">"}</option>
        <option>{">="}</option>
        <option>{"<"}</option>
        <option>{"<="}</option>
      </select>
    </div>
  )
}