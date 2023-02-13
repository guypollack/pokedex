import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findMainColor } from '../../util/findMainColor';

const initialState = {
  allPokemon: {},
  types: {},
  generations: {},
  heights: {},
  weights: {},
  filters: {"types": [], "generation": [], "height": [], "weight": []},
  status: "",
  allPokemonFetched: false,
  lBound: 1,
  uBound: 101
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAllPokemonAsync = createAsyncThunk(
  'pokemon/fetchAllPokemonAsync',
  async () => {
    // alert("Fetch starting");
    const allPokemon = {};
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    // The value we return becomes the `fulfilled` action payload
    // console.log("BBBB");
    const json = await response.json();
    // console.log(json);
    const results = await json.results;
    // console.log(results);

    for (let i = 0; i < 1008; i++) {
      const pokemonNumber = i+1; //results[i].url.slice(34,results[i].url.length-1);
      const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemonNumber + ".png";
      allPokemon[pokemonNumber] = {
        "name": results[i].name,
        "url": results[i].url,
        "imageUrl" : imageUrl,
        "outlineColor": {},
        "types": [],
        "unsortedTypes": [],
        "generation": "",
        "height": 0,
        "weight": 0,
        "visible": false
      };
    }

    // for (let pokemon of results) {
    //   const pokemonResponse = await fetch(pokemon.url);
    //   const pokemonJson = await pokemonResponse.json();
    //   console.log("XYZ");
    //   console.log(pokemonJson);
    // }


    // alert("Function complete");
    return allPokemon;
  }
);

export const fetchPokemonDataAsync = createAsyncThunk(
  'pokemon/fetchPokemonDataAsync',
  async ({start, end}) => {
    // alert("Fetching pokemon types");
    const types = {};
    const generations = {};
    const heights = {};
    const weights = {};

    for (let i = start; i < end; i++) {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+i+"/");
      const json = await response.json();
      // if (i === 1) {
      //   console.log(json);
      // }
      const pokemonTypes = json.types.map(t => t.type.name);
      if (pokemonTypes.length > 1) {
        types[i] = [pokemonTypes, pokemonTypes.slice(0,pokemonTypes.length).sort()];
      } else {
        types[i] = [pokemonTypes, pokemonTypes];
      }

      const generationBoundaries = {1: 151,
                                    2: 251,
                                    3: 386,
                                    4: 493,
                                    5: 649,
                                    6: 721,
                                    7: 809,
                                    8: 905,
                                    9: 1008}

      for (let [generation, boundary] of Object.entries(generationBoundaries)) {
        if (i <= boundary) {
          generations[i] = generation;
          break;
        }
      }

      // Method for finding generation below does not work - some pokemon do not pass test at all/give false positives
      // const generationList = Object.keys(json.sprites.versions);

      // for (let j = 0; j < generationList.length; j++) {
      //   let generationFound = false;
      //   if (i === 1008) {
      //     console.log(json.sprites.versions[generationList[j]]);
      //   }
      //   for (let version of Object.values(json.sprites.versions[generationList[j]])) {
          
      //     if (Object.values(version).some(variationUrl => variationUrl !== null)) {
      //       generations[i] = j+1;
      //       generationFound = true
      //       break;
      //     }
      //   }
      //   if (generationFound) break;
      // }
      
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
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    setOutlineColor: (state, action) => {
      // console.log("XXXXXYYYY");
      // console.log(action.payload);
      state.allPokemon[action.payload.number].outlineColor = action.payload.color;
    },
    setBounds: (state, action) => {
      state.lBound = action.payload.lBound;
      state.uBound = action.payload.uBound <= 1009 ? action.payload.uBound : 1009;
    },
    makeVisible: (state, action) => {
      for (let i = action.payload.start; i < action.payload.end; i++) {
        state.allPokemon[i].visible = true;
      }
      // alert(state.allPokemon[1].visible)
      // alert(state.allPokemon[1].visible)
    },
    addFilter: (state, action) => {
      // payload format {property: __, value: __}
      if (!(state.filters[action.payload.property].includes(action.payload.value))) {
        state.filters[action.payload.property].push(action.payload.value);
        state.filters[action.payload.property].sort();
      }
      
      // console.log(state.filters);
    },
    removeFilter: (state, action) => {
      state.filters[action.payload.property] = state.filters[action.payload.property].filter(value => value !== action.payload.value);
    }
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
      .addCase(fetchPokemonDataAsync.fulfilled, (state, action) => {
        state.types = {...state.types, ...action.payload.types};
        state.generations = {...state.generations, ...action.payload.generations};
        state.heights = {...state.heights, ...action.payload.heights};
        state.weights = {...state.weights, ...action.payload.weights};
        // for (let i = 1; i < 1009; i++) {
        //   state.allPokemon[i].unsortedTypes = action.payload.types[i][0];
        //   state.allPokemon[i].types = action.payload.types[i][1];
        //   state.allPokemon[i].generation = action.payload.generations[i];
        //   state.allPokemon[i].height = action.payload.heights[i];
        //   state.allPokemon[i].weight = action.payload.weights[i];
        // }
        // alert("Pokemon Types Loaded");
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectStatus = (state) => state.pokemon.status;
export const selectAllPokemonFetched = (state) => state.pokemon.allPokemonFetched;
export const selectCount = (state) => state.counter.value;
export const selectAllPokemon = (state) => state.pokemon.allPokemon;
export const selectVisiblePokemon = (state) => Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([key, value]) => value.visible));
export const selectFilteredPokemon = (state) => {
  // let visiblePokemonArray = Object.entries(state.pokemon.allPokemon).filter(([key, value]) => value.visible).map(([pokemonNumber, pokemonValue]) => pokemonNumber);
  let visiblePokemonArray = [];
  for (let i = 1; i < state.pokemon.uBound; i++) {
    visiblePokemonArray.push(i);
  }
  // console.log(visiblePokemonArray);
  const filters = Object.entries(state.pokemon.filters);
  if (!state.pokemon.weights[visiblePokemonArray[visiblePokemonArray.length - 1]]) {
    // console.log("A");
    return Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([key, value]) => value.visible));
  } else {
    // console.log("B");
    // console.log(filters);
    // console.log(state.pokemon.types[visiblePokemonArray[visiblePokemonArray.length - 1]]);
    // visiblePokemonArray.filter(pokemonNumber => {
    //   filters.forEach(([filterName, filterValues]) => {
    //     filterValues.forEach(value => {
    //       console.log(pokemonNumber, filterName, value);
    //       console.log(state.pokemon[filterName][pokemonNumber][1]);
    //       console.log(state.pokemon[filterName][pokemonNumber][1].includes(value));
    //     })
    //   })
    // })
  
    const filteredPokemonArray = visiblePokemonArray.filter(pokemonNumber => {
      return filters.every(([filterName, filterValues]) => {
        return filterValues.every(value => {
          // console.log(pokemonNumber, filterName, value);
          // console.log(state.pokemon[filterName][pokemonNumber][1]);
          // console.log(state.pokemon[filterName][pokemonNumber][1].includes(value));
          return state.pokemon[filterName][pokemonNumber][1].includes(value)
        })
      })
    })
    // console.log(filteredPokemonArray);
    const filteredPokemon = Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([key, value]) => filteredPokemonArray.includes(+key))); //the + in +key is needed to convert string to number
    // console.log(filteredPokemon);
    return filteredPokemon;
  }
}


// export const selectFilteredPokemon = (state) => {
//   return Object.fromEntries(Object.entries(state.pokemon.allPokemon).slice(0,10).filter(([pokemonNumber, pokemonValues]) => {
//       // console.log(pokemonValues);
//       // console.log(Object.entries(state.pokemon.filters).every(([filterKey, filterValue]) => pokemonValues[filterKey] === filterValue));
//       console.log(pokemonNumber);
//       for (let filterKey in state.pokemon.filters) {
//         console.log("A");
//         // console.log(filterKey);
//         // console.log(state.pokemon.filters);
//         console.log(state.pokemon.filters[filterKey]);
//         if (state.pokemon[filterKey][pokemonNumber]) {
//           console.log("B");
//           console.log(state.pokemon[filterKey][pokemonNumber][1]);
//           console.log("C");
//           console.log(state.pokemon.filters[filterKey].every(val => state.pokemon[filterKey][pokemonNumber][1].includes(val)));
//         }
//         // console.log("A");
//         // console.log(pokemonValues);
//         // console.log("B");
//         // console.log(filterKey);
//         // console.log("C");
//         // console.log(pokemonValues[filterKey]);
//         // console.log("D");
//         // console.log(state.pokemon.filters[filterKey]);
//         if (pokemonValues[filterKey] !== state.pokemon.filters[filterKey]) {
//           return false;
//         }
//         // if (!(pokemonValues[filterKey].includes(state.pokemon.filters[filterKey]))) {
//         //   return false;
//         // }
//       }
//       return true;
      
//       // return Object.entries(state.pokemon.filters).every(([filterKey, filterValue]) => pokemonValues[filterKey] === filterValue);
//     }))
//   }

// // export const selectFilteredPokemon = (state) => Object.fromEntries(Object.entries(state.pokemon.allPokemon).filter(([pokemonNumber, pokemonValue]) => {
// //                                             return state.pokemon.filters.every(([filterType, filterValue]) => state.pokemon[filterType][pokemonNumber].includes(filterValue))
// //                                           }));



export const selectFilters = (state) => state.pokemon.filters;
export const selectLBound = (state) => state.pokemon.lBound;
export const selectUBound = (state) => state.pokemon.uBound;
export const { setOutlineColor, addFilter, setBounds, makeVisible, removeFilter } = pokemonSlice.actions;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default pokemonSlice.reducer;
