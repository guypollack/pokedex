import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favourites: []
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      state.favourites.push(action.payload);
      state.favourites.sort();
    },
    removeFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter(item => item !== action.payload);
    },
    toggleFavourite: (state, action) => {
      if (!state.favourites.includes(action.payload)) {
        state.favourites.push(action.payload);
        state.favourites.sort();
      } else {
        state.favourites = state.favourites.filter(item => item !== action.payload);
      }
    }
  }
});

export const selectFavourites = (state) => state.favourites.favourites;
export const { addToFavourites, removeFromFavourites, toggleFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;