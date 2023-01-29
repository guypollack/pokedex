import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import pokemonReducer from '../features/pokemon/pokemonSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemon: pokemonReducer
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
