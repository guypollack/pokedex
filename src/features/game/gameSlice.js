import { createSlice } from '@reduxjs/toolkit';
import { nameFormatter } from '../../util/nameFormatter';

const initialState = {
  searchTerm: "",
  currentPokemon: {number: 0, name: "", imageUrl: ""},
  pokemonSuggestions: [],
  allNames: [],
  score: 0,
  round: 1
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCurrentPokemon: (state, action) => {
      state.currentPokemon = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setAllNames: (state, action) => {
      state.allNames = action.payload;
    },
    markAnswer: (state) => {
      if (!state.allNames.map(name => name.toLowerCase()).includes(state.searchTerm.toLowerCase().trim())) return;

      if (state.currentPokemon["name"].toLowerCase().trim() === state.searchTerm.toLowerCase().trim()) {
        state.score++;
      }

      if (state.round < 5) state.round++;

      state.searchTerm = "";
    }
  }
});

export const selectCurrentPokemon = (state) => state.game.currentPokemon;
export const selectSearchTerm = (state) => state.game.searchTerm;
export const selectFilteredNames = (state) => state.game.searchTerm !== "" ? state.game.allNames.filter(name => name.toLowerCase().includes(state.game.searchTerm.toLowerCase())) : [];
export const selectScore = (state) => state.game.score;
export const selectRound = (state) => state.game.round;
export const { setCurrentPokemon, setSearchTerm, setAllNames, markAnswer } = gameSlice.actions;

export default gameSlice.reducer;