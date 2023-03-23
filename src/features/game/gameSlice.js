import { createSlice } from '@reduxjs/toolkit';
import { nameFormatter } from '../../util/nameFormatter';

const initialState = {
  searchTerm: "",
  currentPokemon: {number: 0, name: "", imageUrl: ""},
  questionPokemon: [],
  allNames: [],
  score: 0,
  scores: ["","","","",""],
  round: 1,
  isAnswerValid: false,
  isMarkingInProgress: false,
  isGameFinished: false,
  onGamePage: false,
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
    setIsGameFinished: (state, action) => {
      state.isGameFinished = action.payload;
    },
    resetGame: (state) => {
      state.searchTerm = "";
      state.questionPokemon = [];
      state.score = 0;
      state.scores = ["","","","",""];
      state.round = 1;
      state.isAnswerValid = false;
      state.isGameFinished = false
    },
    setOnGamePage: (state, action) => {
      state.onGamePage = action.payload;
      if (action.payload) {
        state.gamePageVisits++;
      }
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
export const selectIsGameFinished = (state) => state.game.isGameFinished;
export const selectOnGamePage = (state) => state.game.onGamePage;
export const { setCurrentPokemon, addPokemonToQuestions , setSearchTerm, setAllNames, setIsMarkingInProgress, markAnswer, setIsGameFinished, resetGame, setOnGamePage } = gameSlice.actions;

export default gameSlice.reducer;