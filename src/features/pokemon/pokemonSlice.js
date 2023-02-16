import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findMainColor } from '../../util/findMainColor';
import { doesPokemonFitFilter } from './pokemonSliceHelperFunctions';

const initialState = {
  allPokemon: {},
  types: {},
  generations: {},
  heights: {},
  weights: {},
  filters: {"types": [], "generations": [], "heights": [], "weights": []},
  filterMessage: "",
  status: "",
  allPokemonFetched: false,
  dataFetched: false,
  displayCount: 100,
  inCategorySearchType: "and",
  betweenCategorySearchType: "and"
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
        "name": results[i].name,
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

    for (let i = start; i < end; i++) {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+i+"/");
      const json = await response.json();
      const pokemonTypes = json.types.map(t => t.type.name);
      if (pokemonTypes.length > 1) {
        types[i] = [pokemonTypes, pokemonTypes.slice(0,pokemonTypes.length).sort()];
      } else {
        types[i] = [pokemonTypes, pokemonTypes];
      }

      const generationBoundaries = {1: 151, 2: 251, 3: 386, 4: 493, 5: 649, 6: 721, 7: 809, 8: 905, 9: 1008}

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
    toggleBetweenCategorySearchType: (state) => {
      state.betweenCategorySearchType = state.betweenCategorySearchType === "and" ? "or" : "and";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemonAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPokemonAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log("CCCC");
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
      });
  },
});


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectStatus = (state) => state.pokemon.status;
export const selectAllPokemonFetched = (state) => state.pokemon.allPokemonFetched;
export const selectDataFetched = (state) => state.pokemon.dataFetched;
export const selectCount = (state) => state.counter.value;
export const selectAllPokemon = (state) => state.pokemon.allPokemon;
export const selectVisiblePokemon = (state) => Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([key, value]) => value.visible));
export const selectFilteredPokemon = (state) => {
  // console.log("B")
  // console.log("selectFilteredPokemon running");
  // console.log(visiblePokemonArray);
  // alert("Getting filtered pokemon");
  const filters = Object.entries(state.pokemon.filters);
  const filteredCategories = Object.keys(state.pokemon.filters).filter(category => state.pokemon.filters[category].length !== 0);
  // console.log(filteredCategories);
  if (!state.pokemon.dataFetched || filteredCategories.length === 0) {
    // console.log("A");
    // return Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([key, value]) => value.visible));
    return Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([key, value]) => key < 101));
  } else {  
    // console.log("C");
    // START OF OLD METHOD
    //
    //
    // const filteredPokemonArray = [];
    // const myArrayFunction = Array.prototype.every;

    // for (let i = 1; i < 1009; i++) {
    //     if (myArrayFunction.call(filters, ([filterName, filterValues]) => {
    //       return myArrayFunction.call(filterValues, (filterValue) => {
    //         return doesPokemonFitFilter(filterName, filterValue, i);
    //       })
    //     })) {
    //       filteredPokemonArray.push(i);
    //     }
    //   if (filteredPokemonArray.length === state.pokemon.displayCount) {
    //     break;
    //   }
    // }
    //
    //
    // END OF OLD METHOD

    // START OF NEW METHOD
    //
    //
    const filteredPokemonObj = {"types": [], "generations": [], "heights": [], "weights": []};
    
    for (let i = 1; i < 1009; i++) {
      for (let filterName of filteredCategories) {
        //
        // console.log(filterName);
        // console.log(state.pokemon.filters[filterName].length === 0);
        //
        if (state.pokemon.inCategorySearchType === "and") {
          //"AND" within categories
          if (state.pokemon.filters[filterName].every(filterValue => doesPokemonFitFilter(filterName, filterValue, i))) {
            filteredPokemonObj[filterName].push(i);
          }
        } else {
          //"OR" within categories
          if (state.pokemon.filters[filterName].some(filterValue => doesPokemonFitFilter(filterName, filterValue, i))) {
            filteredPokemonObj[filterName].push(i);
          }
        }
      }
    }
    // console.log("A");
    // console.log(filteredPokemonObj);

    // console.log("B");
    // console.log(Object.values(filteredPokemonObj).flat(1));

    let filteredPokemonArray2;
    if (state.pokemon.betweenCategorySearchType === "and") {
      //"AND" between categories
      filteredPokemonArray2 = Object.values(filteredPokemonObj).flat(1).filter((value, index, self) => self.indexOf(value) === index).filter(value => {
        return filteredCategories.every(category => filteredPokemonObj[category].includes(value));
      }).slice(0,state.pokemon.displayCount);
    } else {
      //"OR" between categories
      filteredPokemonArray2 = Object.values(filteredPokemonObj).flat(1).filter((value, index, self) => self.indexOf(value) === index);
    // 
    }
    // console.log("C");
    // console.log(filteredPokemonArray2);
    //
    //
    // END OF NEW METHOD

    const filteredPokemon = Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([key, value]) => filteredPokemonArray2.includes(+key))); //the + in +key is needed to convert string to number
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
export const selectBetweenCategorySearchType  = (state) => state.pokemon.betweenCategorySearchType;
export const { addFilter, removeFilter, clearFilters, setDisplayCount, toggleInCategorySearchType, toggleBetweenCategorySearchType } = pokemonSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default pokemonSlice.reducer;
