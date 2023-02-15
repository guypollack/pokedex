import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory, selectValue, setSelectorValue } from "../../features/filters/filtersSlice";
import { allTypes, allGenerations } from "../../features/filters/filtersSliceHelperFunctions";

export function ValueSelector() {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const value = useSelector(selectValue);

  function handleChange(e) {
    dispatch(setSelectorValue({"selector": "value", "value": e.target.value}));
  }

  if (category === "Type") {
    return (
      <div>
        <label htmlFor="value-selector">Value</label>
        <select id="value-selector" value={value} onChange={handleChange}>
          <option></option>
          {allTypes.map(type => <option>{type}</option>)}
        </select>
      </div>
    )
  }

  if (category === "Generation") {
    return (
      <div>
        <label htmlFor="value-selector">Value</label>
        <select id="value-selector" value={value} onChange={handleChange}>
          <option></option>
          {allGenerations.map(generation => <option>{generation}</option>)}
        </select>
      </div>
    )
  }

  if (category === "Height") {
    // alert("A");
    // dispatch(setSelectorValue({"selector": "value", "value": document.getElementById("value-selector").value}));
    return (
      <div>
        <label htmlFor="value-selector">Value</label>
        <input type="range" min="0" max="10" step="0.1" value={value} class="slider" id="value-selector" onChange={handleChange}></input>
        <p>{value}m</p>
      </div>
    )
  }

  if (category === "Weight") {
    // alert("B");
    // dispatch(setSelectorValue({"selector": "value", "value": document.getElementById("value-selector").value}));
    return (
      <div>
        <label htmlFor="value-selector">Value</label>
        <input type="range" min="0" max="1000" step="1" value={value} class="slider" id="value-selector" onChange={handleChange}></input>
        <p>{value}kg</p>
      </div>
    )
  }

}