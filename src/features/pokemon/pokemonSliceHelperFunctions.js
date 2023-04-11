import { store } from "../../app/store";

export const doesPokemonFitFilter = (filterName, filterValue, pokemonNumber) => {
  if (filterName === "types") {
    return store.getState().pokemon[filterName][filterValue].includes(pokemonNumber);
  }

  if (filterName === "generations") {
    return store.getState().pokemon[filterName][pokemonNumber] === filterValue;
  }

  if (filterName === "weights") {
    return (eval(store.getState().pokemon[filterName][pokemonNumber] + filterValue));
  }

  if (filterName === "heights") {
    return (eval(store.getState().pokemon[filterName][pokemonNumber] + filterValue));
  }
}

export const correctName = name => {
  const wordsToRemove = [" Normal"," Ordinary"," Plant"," Altered"," Land"," Red Striped",
  " Standard"," Incarnate"," Aria"," Male"," Shield"," Average"," 50"," Baile",
  " Midday"," Solo"," Red Meteor"," Disguised"," Amped"," Ice"," Male"," Full Belly",
  " Single Strike"];

  if (name === "Ho Oh") {
    return "Ho-Oh";
  }

  for (const word of wordsToRemove) {
    if (name.includes(word)) {
      return name.replace(word,"");
    }
  }
  if (!name.includes(" ")) {
    return name;
  } else if (name.includes(" O")) {
    return name.replace(" O","-o");
  } else if (name.includes(" Chien")) {
    return name.replace(" ","-");
  } else if (name.includes(" Pao")) {
    return name.replace(" ","-");
  } else if (name.includes(" Lu")) {
    return name.replace(" ","-");
  } else if (name.includes(" Yu")) {
    return name.replace(" ","-");
  } else if (name === "Type Null") {
    return "Type: Null";
  } else {
    return name;
  }
}