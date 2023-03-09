import { createSlice } from '@reduxjs/toolkit';
import { nameFormatter } from '../../util/nameFormatter';

const initialState = {
  searchTerm: "",
  currentPokemon: {number: 0, name: "", imageUrl: ""},
  questionPokemon: [],
  pokemonSuggestions: [],
  allNames: [],
  score: 0,
  scores: ["","","","",""],
  round: 1,
  isAnswerValid: false,
  isMarkingInProgress: false
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCurrentPokemon: (state, action) => {
      state.currentPokemon = action.payload;
    },
    addPokemonToQuestions: (state, action) => {
      state.questionPokemon.push(action.payload);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.isAnswerValid = state.allNames.map(name => name.toLowerCase()).includes(state.searchTerm.toLowerCase().trim());
    },
    setAllNames: (state, action) => {
      state.allNames = action.payload;
    },
    markAnswer: (state, action) => {
      
      if (state.questionPokemon[state.round - 1]["name"].toLowerCase().trim() === state.searchTerm.toLowerCase().trim()) {
        state.score++;
        state.scores[action.payload] = 1;
      } else {
        state.scores[action.payload] = 0;
      }

      if (state.round < 5) state.round++;

      state.searchTerm = "";
      state.isAnswerValid = false;
    },
    setIsMarkingInProgress: (state, action) => {
      state.isMarkingInProgress = action.payload;
    },
    setPokemonSuggestions: (state, action) => {
      state.pokemonSuggestions = action.payload;
    }
  }
});

export const selectCurrentPokemon = (state) => state.game.currentPokemon;
export const selectQuestionPokemon = (state) => state.game.questionPokemon;
export const selectSearchTerm = (state) => state.game.searchTerm;
export const selectFilteredNames = (state) => state.game.searchTerm !== "" ? state.game.allNames.filter(name => name.toLowerCase().includes(state.game.searchTerm.toLowerCase())) : [];
export const selectScore = (state) => state.game.score;
export const selectScores = (state) => state.game.scores;
export const selectRound = (state) => state.game.round;
export const selectIsAnswerValid = (state) => state.game.isAnswerValid;
export const selectIsMarkingInProgress = (state) => state.game.isMarkingInProgress;
export const { setCurrentPokemon, addPokemonToQuestions , setSearchTerm, setAllNames, setIsMarkingInProgress, markAnswer, setPokemonSuggestions } = gameSlice.actions;

export default gameSlice.reducer;