import React from "react";
import "./TypeBlock.css"

export function TypeBlock({type}) {


  function valueFormatter(val) {
    return val.slice(0,1).toUpperCase() + val.slice(1);
  }
  
  return (
    <div className={`type-block type ${type}`}>
      <p>{valueFormatter(type)}</p>
    </div>
  )
}