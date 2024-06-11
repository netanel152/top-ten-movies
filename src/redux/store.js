import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './Features/MoviesSlice';

const store = configureStore({
  reducer: {
    movieActions: moviesReducer,
  },
});

export default store;
