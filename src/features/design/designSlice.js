import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fontStyle: "normal",
  fontToggled: false,
  playStatus: "PAUSED"
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    toggleFontStyle: (state) => {
      state.fontStyle = state.fontStyle === "normal" ? "gameboy" : "normal";
      if (!state.fontToggled) {
        state.playStatus = "PLAYING";
      }
      state.fontToggled = true;
    },
    togglePlayStatus: (state) => {
      state.playStatus = state.playStatus === "PAUSED" ? "PLAYING" : "PAUSED";
    }
  }
});

export const selectFontStyle = (state) => state.design.fontStyle;
export const selectFontToggled = (state) => state.design.fontToggled;
export const selectPlayStatus = (state) => state.design.playStatus;
export const { toggleFontStyle, togglePlayStatus } = designSlice.actions;

export default designSlice.reducer;