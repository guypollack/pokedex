import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fontStyle: "normal",
  playStatus: "PLAYING",
  gameboySoundPlayed: false
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    toggleFontStyle: (state) => {
      state.fontStyle = state.fontStyle === "normal" ? "gameboy" : "normal";
    },
    togglePlayStatus: (state) => {
      state.playStatus = state.playStatus === "PAUSED" ? "PLAYING" : "PAUSED";
    },
    setGameboySoundPlayed: (state, action) => {
      state.gameboySoundPlayed = action.payload;
    }
  }
});

export const selectFontStyle = (state) => state.design.fontStyle;
export const selectPlayStatus = (state) => state.design.playStatus;
export const selectGameboySoundPlayed = (state) => state.design.gameboySoundPlayed;
export const { toggleFontStyle, togglePlayStatus, setGameboySoundPlayed } = designSlice.actions;

export default designSlice.reducer;