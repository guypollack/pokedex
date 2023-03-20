import { store } from "../../app/store"

export const doesPokemonFitFilter = (filterName, filterValue, pokemonNumber) => {
  if (filterName === "types") {
    return store.getState().pokemon[filterName][pokemonNumber][1].includes(filterValue);
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
      // if (word === "Incarnate") {
      //   console.log("1");
      //   console.log(name);
      //   console.log(name.replace(word,""));
      // }
      return name.replace(word,"");
    }
  }
  if (!name.includes(" ")) {
    return name;
  } else if (name.includes(" O")) {
    // console.log(name);
    // console.log(name.replace(" O","-o"));
    return name.replace(" O","-o");
  } else if (name.includes(" Chien")) {
    // console.log(name);
    // console.log(name.replace(" ","-"));
    return name.replace(" ","-");
  } else if (name.includes(" Pao")) {
    // console.log(name);
    // console.log(name.replace(" ","-"));
    return name.replace(" ","-");
  } else if (name.includes(" Lu")) {
    // console.log(name);
    // console.log(name.replace(" ","-"));
    return name.replace(" ","-");
  } else if (name.includes(" Yu")) {
    // console.log(name);
    // console.log(name.replace(" ","-"));
    return name.replace(" ","-");
  } else if (name === "Type Null") {
    // console.log(name);
    return "Type: Null";
  } else {
    return name;
  }
}

//Type Null => Type: Null
//'Jangmo O', 'Hakamo O', 'Kommo O',
//'Wo Chien', 'Chien Pao', 'Ting Lu', 'Chi Yu', 