import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory, selectOperator, selectValue, setSelectorValue, addToFilterList } from "../../features/filters/filtersSlice";
import { Slider } from '../../components/Slider/Slider'; 
import { CategorySelector } from "./CategorySelector";
import { OperatorSelector } from "./OperatorSelector";
import { ValueSelector } from "./ValueSelector";
import  { SearchBar } from "../SearchBar/SearchBar"
import { addFilter, setDisplayCount, selectSearchTypes, toggleSearchType, selectNumberOfFilters } from "../../features/pokemon/pokemonSlice";
import "./FilterCreator.css";

export function FilterCreator() {
  const dispatch = useDispatch();
  
  const category = useSelector(selectCategory);
  const operator = useSelector(selectOperator);
  const value = useSelector(selectValue);
  const searchTypes = useSelector(selectSearchTypes);
  const inCategorySearchType = searchTypes["inCategory"];
  const betweenCategorySearchType = searchTypes["betweenCategory"];
  const numberOfFilters = useSelector(selectNumberOfFilters);
  
  const filterCreatorClassName = numberOfFilters === 0 ? "filter-creator" : "filter-creator filters-applied";

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
    <div className={filterCreatorClassName}>
      <h4>Search</h4>
      <SearchBar />
      <h4>Add Filter</h4>
      <div className="selectors-flex-container">
        <CategorySelector />
        {(category === "Height" || category === "Weight") && <OperatorSelector />}
        {(category !== "") && <ValueSelector />}
        <button className="add-filter-button" disabled={!inputValid} onClick={handleSubmit}>Add</button>
      </div>
      <div className="sliders-container">
        {/* <Slider heading="Within category search type" value1="ALL" value2="ANY" checked={inCategorySearchType === "or"} onChange={() => dispatch(toggleSearchType("inCategory"))} /> */}
        {/* <Slider heading="Between category search type" value1="ALL" value2="ANY" checked={betweenCategorySearchType === "or"} onChange={() => dispatch(toggleSearchType("betweenCategory"))} /> */}
      </div>
    </div>
  )
}