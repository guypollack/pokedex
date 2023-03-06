import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: "",
  currentPokemon: {number: 0, name: "", imageUrl: ""},
  pokemonSuggestions: [],
  score: 0,
  round: 0
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCurrentPokemon: (state, action) => {
      state.currentPokemon = action.payload;
    }
  }
});

export const selectCurrentPokemon = (state) => state.game.currentPokemon;
export const { setCurrentPokemon } = gameSlice.actions;

export default gameSlice.reducer;