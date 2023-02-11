import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findMainColor } from '../../util/findMainColor';

const initialState = {
  allPokemon: {},
  types: {},
  heights: {},
  weights: {},
  status: ""
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
      const pokemonNumber = results[i].url.slice(34,results[i].url.length-1);
      const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemonNumber + ".png";
      allPokemon[pokemonNumber] = {
        "name": results[i].name,
        "url": results[i].url,
        "imageUrl" : imageUrl,
        "outlineColor": {}
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
  async () => {
    // alert("Fetching pokemon types");
    const types = {};
    const generations = {};
    const heights = {};
    const weights = {};

    for (let i = 1; i < 1009; i++) {
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
      })
      .addCase(fetchPokemonDataAsync.fulfilled, (state, action) => {
        state.types = action.payload.types;
        state.generations = action.payload.generations;
        state.heights = action.payload.heights;
        state.weights = action.payload.weights;
        // alert("Pokemon Types Loaded");
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectStatus = (state) => state.pokemon.status;
export const selectCount = (state) => state.counter.value;
export const selectAllPokemon = (state) => state.pokemon.allPokemon;
export const { setOutlineColor } = pokemonSlice.actions;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default pokemonSlice.reducer;
