import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './features/MoviesSlice';

const store = configureStore({
  reducer: {
    movieActions: moviesReducer,
  },
});

export default store;
