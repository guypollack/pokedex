import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fontStyle: "normal",
  fontSwitches: 0,
  playStatus: "PAUSED"
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    toggleFontStyle: (state) => {
      state.fontStyle = state.fontStyle === "normal" ? "gameboy" : "normal";
      if (state.fontSwitches === 0) {
        state.playStatus = "PLAYING";
      }
      state.fontSwitches++;
    },
    togglePlayStatus: (state) => {
      state.playStatus = state.playStatus === "PAUSED" ? "PLAYING" : "PAUSED";
    }
  }
});

export const selectFontStyle = (state) => state.design.fontStyle;
export const selectPlayStatus = (state) => state.design.playStatus;
export const selectFontSwitches = (state) => state.design.fontSwitches;
export const { toggleFontStyle, togglePlayStatus } = designSlice.actions;

export default designSlice.reducer;