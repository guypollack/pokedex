import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doesPokemonFitFilter, correctName } from './pokemonSliceHelperFunctions';
import { heights, weights } from './additionalData';
import { nameFormatter } from '../../util/nameFormatter';
import { removeInvisibles } from '../../util/removeInvisibles';

const initialState = {
  allPokemon: {},
  types: {},
  generations: {},
  heights: {},
  weights: {},
  descriptions: {},
  filters: {"types": [], "generations": [], "heights": [], "weights": []},
  filterMessage: "",
  status: "",
  allPokemonFetched: false,
  dataFetched: false,
  displayCount: 100,
  inCategorySearchType: "and",
  betweenCategorySearchType: "and",
  searchTypes: {"inCategory": "and", "betweenCategory": "and"},
  inCategorySearchTypes: {"types": "and", "generations": "and", "heights": "and", "weights": "and"},
  filteredPokemonSnapshot: {},
  searchTerm: "",
  pokemonPageData: {},
  pokemonPageDataFetched: false,
  pokemonPageDescription: "",
  pokemonPageDescriptionFetched: false
};


export const fetchAllPokemonAsync = createAsyncThunk(
  'pokemon/fetchAllPokemonAsync',
  async () => {
    // alert("Fetch starting");
    // console.log("fetching all pokemon");
    const allPokemon = {};
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    const json = await response.json();
    const results = await json.results;

    for (let i = 0; i < 1008; i++) {
      const pokemonNumber = i+1;
      const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemonNumber + ".png";
      allPokemon[pokemonNumber] = {
        "name": correctName(nameFormatter(results[i].name)),
        "url": results[i].url,
        "imageUrl" : imageUrl,
        "visible": true
      };
    }
    // alert("Function complete");
    return allPokemon;
  }
);

export const fetchPokemonDataAsync = createAsyncThunk(
  'pokemon/fetchPokemonDataAsync',
  async ({start, end}) => {
    // alert("Fetching pokemon types");
    // console.log("fetching pokemon data");
    const types = {};
    const generations = {};
    const heights = {};
    const weights = {};

    const generationBoundaries = {1: 151, 2: 251, 3: 386, 4: 493, 5: 649, 6: 721, 7: 809, 8: 905, 9: 1008}

    for (let i = start; i < end; i++) {
      console.log(i);
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+i+"/");
      const json = await response.json();
      const pokemonTypes = json.types.map(t => t.type.name);
      if (pokemonTypes.length > 1) {
        types[i] = [pokemonTypes, pokemonTypes.slice(0,pokemonTypes.length).sort()];
      } else {
        types[i] = [pokemonTypes, pokemonTypes];
      }

      for (let [generation, boundary] of Object.entries(generationBoundaries)) {
        if (i <= boundary) {
          generations[i] = generation;
          break;
        }
      }
      
      heights[i] = json.height / 10;
      weights[i] = json.weight / 10;
    }
    return {types, generations, heights, weights};
  }
);

export const fetchPokemonPageDataByIndexAsync = createAsyncThunk(
  'pokemon/fetchPokemonPageDataByIndexAsync',
  async (index) => {
    // alert("Fetching pokemon types");
    // console.log("fetching pokemon data");
    let types;
    let generation;
    let height;
    let weight;

    const generationBoundaries = {1: 151, 2: 251, 3: 386, 4: 493, 5: 649, 6: 721, 7: 809, 8: 905, 9: 1008}

    const nameResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1&offset=" + (index - 1));
    const nameJson = await nameResponse.json();
    const name = correctName(nameFormatter(nameJson.results[0].name));

    const descriptionResponse = await fetch("https://pokeapi.co/api/v2/pokemon-species/"+index+"/");
    const descriptionJson = await descriptionResponse.json();
    let description;
    if (descriptionJson.flavor_text_entries.length > 0) {
      description = descriptionJson.flavor_text_entries.filter(entry => entry.language.name === "en")[0].flavor_text.replace("/\f/"," ").replace("/\n/","");
    } else {
      description = "";
    }

    const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+index+"/");
    const json = await response.json();
    const pokemonTypes = json.types.map(t => t.type.name);
    types = pokemonTypes;    

    for (let [gen, boundary] of Object.entries(generationBoundaries)) {
      if (index <= boundary) {
        generation = gen;
        break;
      }
    }
    
    height = json.height / 10;
    weight = json.weight / 10;

    return {index, name, types, generation, height, weight, description};
  }
);

export const fetchPokemonDescriptionByIndexAsync = createAsyncThunk(
  'pokemon/fetchPokemonDescriptionByIndexAsync',
  async (index) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/"+index+"/");
    const json = await response.json();
    let description;
    if (json.flavor_text_entries.length > 0) {
      description = removeInvisibles(json.flavor_text_entries.filter(entry => entry.language.name === "en")[0].flavor_text);
    } else {
      description = "";
    }
    return {index, description};
  }
);

export const fetchPokemonTypesAsync = createAsyncThunk(
  'pokemon/fetchPokemonTypesAsync',
  async () => {
    const types = {};
    for (let i = 1; i < 19; i++) {
      const response = await fetch("https://pokeapi.co/api/v2/type/" + i);
      const json = await response.json();
      // console.log(json);
      const name = json.name;
      // console.log(name);
      const numbers = json.pokemon.map(p => p.pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/",""));
      // console.log(numbers);
      types[name] = numbers;
    }
    // console.log(types);
    return types;
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setBounds: (state, action) => {
      // console.log("setting bounds");
      state.lBound = action.payload.lBound;
      state.uBound = action.payload.uBound <= 1009 ? action.payload.uBound : 1009;
    },
    makeVisible: (state, action) => {
      // console.log("updating visibilities");
      for (let i = action.payload.start; i < action.payload.end; i++) {
        state.allPokemon[i].visible = true;
      }
      // alert(state.allPokemon[1].visible)
    },
    addFilter: (state, action) => {
      // payload format {property: __, value: __}
      // console.log("adding filter");
      state.filters[action.payload.property].push(action.payload.value);
      // state.filters[action.payload.property].sort();
      state.filterMessage = "Adding filter...";
      
      // console.log(state.filters);
    },
    removeFilter: (state, action) => {
      // state.filters[action.payload.property] = state.filters[action.payload.property].filter(value => value !== action.payload.value);
      // alert("removing filter");
      let i = state.filters[action.payload.property].indexOf(action.payload.value);
      state.filters[action.payload.property] = state.filters[action.payload.property].slice(0,i).concat(state.filters[action.payload.property].slice(i+1));
      state.filterMessage = "Removing filter...";
    },
    clearFilters: (state) => {
      state.filters = {"types": [], "generations": [], "heights": [], "weights": []};
    },
    setFilteredPokemon: (state, action) => {
      // console.log("settingFilteredPokemon");
      state.filteredPokemon = action.payload;
    },
    setIsLoading: (state, action) => {
      // alert("C");
      state.isLoading = action.payload;
    },
    setPreviousCount: (state, action) => {
      // console.log("settingPreviousCount");
      state.previousCount = action.payload;
    },
    setDisplayCount: (state, action) => {
      // console.log("settingPreviousCount");
      state.displayCount = action.payload;
    },
    toggleInCategorySearchType: (state) => {
      state.inCategorySearchType = state.inCategorySearchType === "and" ? "or" : "and";
    },
    toggleSearchTypeByCategory: (state, action) => {
      state.inCategorySearchTypes[action.payload] = state.inCategorySearchTypes[action.payload] === "and" ? "or" : "and";
    },
    toggleBetweenCategorySearchType: (state) => {
      state.betweenCategorySearchType = state.betweenCategorySearchType === "and" ? "or" : "and";
    },
    toggleSearchType: (state, action) => {
      state.searchTypes[action.payload] = state.searchTypes[action.payload] === "and" ? "or" : "and";
    },
    resetSearchTypes: (state) => {
      state.searchTypes["inCategory"] = "and";
      state.searchTypes["betweenCategory"] = "and";
    },
    setFilteredPokemonSnapshot: (state, action) => {
      state.filteredPokemonSnapshot = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload.toString();
    },
    setPokemonPageDataFetched: (state, action) => {
      state.pokemonPageDataFetched = action.payload;
    },
    setPokemonPageDescriptionFetched: (state, action) => {
      state.pokemonPageDescriptionFetched = action.payload;
    },
    fetchGenerations: (state) => {
      const generationBoundaries = {1: 151, 2: 251, 3: 386, 4: 493, 5: 649, 6: 721, 7: 809, 8: 905, 9: 1008}
      const generationsObj = {}
      for (let i = 1; i < 1009; i++) {
        for (let [generation, boundary] of Object.entries(generationBoundaries)) {
          if (i <= boundary) {
            generationsObj[i] = generation;
            break;
          }
        }
      }
      state.generations = generationsObj;
    },
    fetchHeights: (state) => {
      state.heights = heights;
    },
    fetchWeights: (state) => {
      state.weights = weights;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemonAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPokemonAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allPokemon = action.payload;
        state.allPokemonFetched = true;
      })
      .addCase(fetchPokemonDataAsync.pending, (state) => {
        state.dataFetched = false;
      })
      .addCase(fetchPokemonDataAsync.fulfilled, (state, action) => {
        state.types = {...state.types, ...action.payload.types};
        state.generations = {...state.generations, ...action.payload.generations};
        state.heights = {...state.heights, ...action.payload.heights};
        state.weights = {...state.weights, ...action.payload.weights};
        state.dataFetched = true;
      })
      .addCase(fetchPokemonPageDataByIndexAsync.pending, (state) => {
        state.pokemonPageDataFetched = false;
      })
      .addCase(fetchPokemonPageDataByIndexAsync.fulfilled, (state, action) => {
        // state.pokemonPageData = Object.fromEntries([["name",action.payload.name],["types", action.payload.types],["generation", action.payload.generation],["height", action.payload.height],["weight", action.payload.weight]]);
        state.pokemonPageData[action.payload.index] = Object.fromEntries([["name",action.payload.name],["types", action.payload.types],["generation", action.payload.generation],["height", action.payload.height],["weight", action.payload.weight],["description", action.payload.description]]);
        state.pokemonPageDataFetched = true;
      })
      .addCase(fetchPokemonDescriptionByIndexAsync.pending, (state) => {
        state.pokemonPageDescriptionFetched = false;
      })
      .addCase(fetchPokemonDescriptionByIndexAsync.fulfilled, (state, action) => {
        // state.pokemonPageDescription = action.payload;
        state.descriptions[action.payload.index] = action.payload.description;
        state.pokemonPageDescriptionFetched = true;
      })
      .addCase(fetchPokemonTypesAsync.fulfilled, (state, action) => {
        state.types = action.payload;
      });
  },
});

export const selectStatus = (state) => state.pokemon.status;
export const selectAllPokemonFetched = (state) => state.pokemon.allPokemonFetched;
export const selectDataFetched = (state) => state.pokemon.dataFetched;
export const selectAllDataFetched = (state) => Object.keys(state.pokemon.types).length === 18 && Object.keys(state.pokemon.generations).length === 1008 && Object.keys(state.pokemon.heights).length === 1008 && Object.keys(state.pokemon.weights).length === 1008;
export const selectPokemonPageDataFetched = (state) => state.pokemon.pokemonPageDataFetched;
export const selectPokemonPageDescriptionFetched = (state) => state.pokemon.pokemonPageDescriptionFetched;
export const selectCount = (state) => state.counter.value;
export const selectAllPokemon = (state) => state.pokemon.allPokemon;
export const selectPokemonPageData = (state) => state.pokemon.pokemonPageData;
export const selectPokemonPageDescription = (state) => state.pokemon.pokemonPageDescription;
export const selectVisiblePokemon = (state) => Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([key, value]) => value.visible));
export const selectFilteredPokemon = (state) => {
  // console.log("B")
  // console.log("selectFilteredPokemon running");
  // console.log(visiblePokemonArray);
  // alert("Getting filtered pokemon");
  const filteredCategories = Object.keys(state.pokemon.filters).filter(category => state.pokemon.filters[category].length !== 0);
  // console.log(filteredCategories);

  if ((filteredCategories.length === 0 && state.pokemon.searchTerm === "")) {
  // if ((filteredCategories.length === 0 && state.pokemon.searchTerm === "") || !state.pokemon.dataFetched) {

    // console.log("A");
    // return Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([key, value]) => value.visible));
    return state.pokemon.allPokemon;
  } else if (filteredCategories.length === 0) {
    // console.log("B");
    return Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([key, value]) => value.name.toLowerCase().includes(state.pokemon.searchTerm.toLowerCase())));
  } else {  
    // console.log("C");
    //
    const filteredPokemonObj = {"types": [], "generations": [], "heights": [], "weights": []};

    const searchTermFilteredPokemonArray = Object.keys(state.pokemon.allPokemon).filter(key => state.pokemon.allPokemon[key].name.toLowerCase().includes(state.pokemon.searchTerm.toLowerCase()));

    for (let i of searchTermFilteredPokemonArray) {
      for (let filterName of filteredCategories) {
        //
        // console.log(filterName);
        // console.log(state.pokemon.filters[filterName].length === 0);
        //
        if (state.pokemon.inCategorySearchTypes[filterName] === "and") {
          //"AND" within categories
          if (state.pokemon.filters[filterName].every(filterValue => doesPokemonFitFilter(filterName, filterValue, i))) {
            // console.log(i);
            filteredPokemonObj[filterName].push(i);
          }
        } else {
          //"OR" within categories
          if (state.pokemon.filters[filterName].some(filterValue => doesPokemonFitFilter(filterName, filterValue, i))) {
            filteredPokemonObj[filterName].push(i);
          }
        }
      }
      // console.log(filteredPokemonObj);
    }
    // console.log("A");
    // console.log(filteredPokemonObj);

    // console.log("B");
    // console.log(Object.values(filteredPokemonObj).flat(1));

    let filteredPokemonArray2;
    if (state.pokemon.searchTypes["betweenCategory"] === "and") {
      //"AND" between categories
      filteredPokemonArray2 = Object.values(filteredPokemonObj).flat(1).filter((value, index, self) => self.indexOf(value) === index).filter(value => {
        return filteredCategories.every(category => filteredPokemonObj[category].includes(value));
      });
    } else {
      //"OR" between categories
      filteredPokemonArray2 = Object.values(filteredPokemonObj).flat(1).filter((value, index, self) => self.indexOf(value) === index);
    // 
    }
    // console.log("C");
    // console.log(filteredPokemonArray2);
    //
    //
    const filteredPokemon = Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([key, value]) => filteredPokemonArray2.includes(key))); // now removed the + in +key is needed to convert string to number
    // console.log(filteredPokemon);
    return filteredPokemon;
  }
}
export const selectFilters = (state) => state.pokemon.filters;
export const selectFilterMessage = (state) => state.pokemon.filterMessage;
export const selectLBound = (state) => state.pokemon.lBound;
export const selectUBound = (state) => state.pokemon.uBound;
export const selectIsLoading = (state) => state.pokemon.isLoading;
export const selectAreFiltersApplied = (state) => {
  return !Object.values(state.pokemon.filters).every(filterValue => filterValue.length === 0);
}
export const selectNumberOfFilters = (state) => {
  return (Object.values(state.pokemon.filters).reduce((total, current) => total + current.length, 0));
}
export const selectPreviousCount  = (state) => state.pokemon.previousCount;
export const selectDisplayCount  = (state) => state.pokemon.displayCount;
export const selectInCategorySearchType  = (state) => state.pokemon.inCategorySearchType;
export const selectInCategorySearchTypes  = (state) => state.pokemon.inCategorySearchTypes;
export const selectBetweenCategorySearchType  = (state) => state.pokemon.betweenCategorySearchType;
export const selectSearchTypes = (state) => state.pokemon.searchTypes;
export const selectSearchTerm = (state) => state.pokemon.searchTerm;
export const selectNames = (state) => Object.values(state.pokemon.allPokemon).map(data => data.name);
export const selectTypes = (state) => state.pokemon.types;
export const selectGenerations = (state) => state.pokemon.generations;
export const selectHeights = (state) => state.pokemon.heights;
export const selectWeights = (state) => state.pokemon.weights;
export const selectDescriptions = (state) => state.pokemon.descriptions;
export const { addFilter, removeFilter, clearFilters, setDisplayCount, toggleInCategorySearchType, toggleSearchTypeByCategory, toggleBetweenCategorySearchType, toggleSearchType, resetSearchTypes, setFilteredPokemonSnapshot, setSearchTerm, setPokemonPageDataFetched, setPokemonPageDescriptionFetched, fetchGenerations, fetchHeights, fetchWeights } = pokemonSlice.actions;

export default pokemonSlice.reducer;