import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMoviesAPI, addNewMovieAPI, updateMovieAPI } from '../../services/MovieService';

export const fetchAllMovies = createAsyncThunk('moviesSlice/fetchAllMovies', async (selectedCategory) => {
  console.log("fetchAllMovies ==> moviesSlice ==> selectedCategory", selectedCategory);
  try {
    const data = await getMoviesAPI(selectedCategory);
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.log("getMoviesAPI==>response error", error);
  }
});


export const createNewMovie = createAsyncThunk('moviesSlice/createNewMovie', async (movieData, thunkAPI) => {
  try {
    const response = addNewMovieAPI(movieData);
    thunkAPI.dispatch(fetchAllMovies(""));
    return response;
  } catch (error) {
    console.log("addNewMovieAPI==>response error", error);
  }
});

export const updateMovie = createAsyncThunk('moviesSlice/updateMovie', async (movieData, thunkAPI) => {
  try {
    const response = updateMovieAPI(movieData);
    thunkAPI.dispatch(fetchAllMovies(""));
    return response;
  } catch (error) {
    console.log("updateMovieAPI==>response error", error);
  }
});

const MoviesSlice = createSlice({
  name: 'movieActions',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
    selectedCategory: "",
  },
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.data;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory } = MoviesSlice.actions;

export default MoviesSlice.reducer;