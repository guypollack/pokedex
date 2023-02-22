import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favourites: {"guest": []}
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      state.favourites[action.payload.username].push(action.payload.pokemon);
      state.favourites[action.payload.username].sort();
    },
    removeFromFavourites: (state, action) => {
      state.favourites[action.payload.username] = state.favourites[action.payload.username].filter(item => item !== action.payload.pokemon);
    },
    toggleFavourite: (state, action) => {
      if (!state.favourites[action.payload.username].includes(action.payload.pokemon)) {
        state.favourites[action.payload.username].push(action.payload.pokemon);
        state.favourites[action.payload.username].sort();
      } else {
        state.favourites[action.payload.username] = state.favourites[action.payload.username].filter(item => item !== action.payload.pokemon);
      }
    },
    addUserToFavourites: (state, action) => {
      state.favourites[action.payload] = [];
    },
    removeUserFromFavourites: (state, action) => {
      state.favourites = Object.fromEntries(Object.entries(state.favourites).filter(([username, favourites]) => username !== action.payload.username));
    },
    copyFavourites: (state, action) => {
      state.favourites[action.payload.user2] = state.favourites[action.payload.user1];
    }
  }
});

export const selectFavourites = (state) => state.favourites.favourites;
export const { addToFavourites, removeFromFavourites, toggleFavourite, addUserToFavourites, removeUserFromFavourites, copyFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;