import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fontStyle: "normal",
  nonGameFontSwitches: 0,
  playStatus: "PLAYING"
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    toggleFontStyle: (state) => {
      state.fontStyle = state.fontStyle === "normal" ? "gameboy" : "normal";
      // if (state.fontSwitches === 0) {
      //   state.playStatus = "PLAYING";
      // }
    },
    togglePlayStatus: (state) => {
      state.playStatus = state.playStatus === "PAUSED" ? "PLAYING" : "PAUSED";
    },
    incrementNonGameFontSwitches: (state) => {
      state.nonGameFontSwitches++;
    }
  }
});

export const selectFontStyle = (state) => state.design.fontStyle;
export const selectPlayStatus = (state) => state.design.playStatus;
export const selectNonGameFontSwitches = (state) => state.design.nonGameFontSwitches;
export const { toggleFontStyle, togglePlayStatus, incrementNonGameFontSwitches } = designSlice.actions;

export default designSlice.reducer;