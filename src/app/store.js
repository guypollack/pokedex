import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import favouritesReducer from '../features/favourites/favouritesSlice';
import filtersReducer from '../features/filters/filtersSlice';
import usersReducer from '../features/users/usersSlice';
import gameSlice from '../features/game/gameSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemon: pokemonReducer,
    favourites: favouritesReducer,
    filters: filtersReducer,
    users: usersReducer,
    game: gameSlice
  },
});


// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import feedReducer from "../features/feed/feedSlice";
// import subredditsReducer from "../features/subreddits/subredditsSlice"

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     feed: feedReducer,
//     subreddits: subredditsReducer
//   },
// });
