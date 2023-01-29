import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  allPokemon: []
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
    const allPokemon = [];
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    // The value we return becomes the `fulfilled` action payload
    // console.log("BBBB");
    const json = await response.json();
    // console.log(json);
    const results = await json.results;
    // console.log(results);
    results.forEach(item => {
      const pokemonNumber = item.url.slice(34,item.url.length-1);
      // console.log(pokemonNumber);
      // console.log("https://pokeapi.co/api/v2/pokemon/".length);
      const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemonNumber + ".png";
      allPokemon.push(({
        "name": item.name,
        "url": item.url,
        "imageUrl" : imageUrl
      }))
    })

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
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default pokemonSlice.reducer;
