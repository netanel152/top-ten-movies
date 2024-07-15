import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMoviesAPI, addNewMovieAPI, updateMovieAPI } from '../../services/MovieService';

export const fetchAllMovies = createAsyncThunk('moviesSlice/fetchAllMovies', async (selectedCategory) => {
  try {
    const data = await getMoviesAPI(selectedCategory);
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.log("response error: ", error.response.data.errorMessage);
    return error;
  }
});


export const createNewMovie = createAsyncThunk('moviesSlice/createNewMovie', async (movieData, thunkAPI) => {
  try {
    const response = await addNewMovieAPI(movieData);
    await thunkAPI.dispatch(fetchAllMovies(""));
    return response;
  } catch (error) {
    console.log("response error: ", error.response.data.errorMessage);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateMovie = createAsyncThunk('moviesSlice/updateMovie', async (movieData, thunkAPI) => {
  try {
    const response = await updateMovieAPI(movieData);
    await thunkAPI.dispatch(fetchAllMovies(""));
    return response;
  } catch (error) {
    console.log("response error: ", error.response.data.errorMessage);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const MoviesSlice = createSlice({
  name: 'movieActions',
  initialState: {
    movies: [],
    status: '',
    error: '',
    responseStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.data;
        state.responseStatus = action.payload.status;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.responseStatus = action.payload ? action.payload.status : null;
      })
      .addCase(createNewMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.responseStatus = action.payload.status;
      })
      .addCase(createNewMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.errorMessage : action.error.message;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.responseStatus = action.payload.status;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.errorMessage : action.error.message;
      });
  },
});

export default MoviesSlice.reducer;