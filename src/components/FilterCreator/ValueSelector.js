import React from "react";
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
      <div className="selector type">
        <label htmlFor="value-selector">Value</label>
        <select id="value-selector" value={value} onChange={handleChange}>
          <option></option>
          {allTypes.map(type => <option key={`value-selector-type-${type}`}>{type}</option>)}
        </select>
      </div>
    )
  }

  if (category === "Generation") {
    return (
      <div className="selector generation">
        <label htmlFor="value-selector">Value</label>
        <select id="value-selector" value={value} onChange={handleChange}>
          <option></option>
          {allGenerations.map(generation => <option key={`value-selector-generation-${generation}`}>{generation}</option>)}
        </select>
      </div>
    )
  }

  if (category === "Height") {
    // alert("A");
    // dispatch(setSelectorValue({"selector": "value", "value": document.getElementById("value-selector").value}));
    return (
      <div className="selector height">
        <p>{value}m</p>
        <input type="range" min="0" max="10" step="0.1" value={value} class="slider" id="value-selector" onChange={handleChange}></input>
      </div>
    )
  }

  if (category === "Weight") {
    // alert("B");
    // dispatch(setSelectorValue({"selector": "value", "value": document.getElementById("value-selector").value}));
    return (
      <div className="selector weight">
        <p>{value}kg</p>
        <input type="range" min="0" max="1000" step="1" value={value} class="slider" id="value-selector" onChange={handleChange}></input>
      </div>
    )
  }

}