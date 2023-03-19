import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fontStyle: "normal"
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    toggleFontStyle: (state) => {
      state.fontStyle = state.fontStyle === "normal" ? "gameboy" : "normal";
    }
  }
});

export const selectFontStyle = (state) => state.design.fontStyle;
export const { toggleFontStyle } = designSlice.actions;

export default designSlice.reducer;