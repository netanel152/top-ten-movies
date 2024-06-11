import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMoviesAPI } from '../../Services/MovieService';

export const fetchAllMovies = createAsyncThunk('moviesSlice/fetchAllMovies', async () => {
  try {
    const data = await getMoviesAPI();
    if (data == null) {
      return null;
    }
    return data;
  } catch (error) {
    console.log("getMoviesAPI==>response error", error);
  }
});

const MoviesSlice = createSlice({
  name: 'movieActions',
  initialState: {
    moviesList: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setAllMoviesData: (state, action) => {
      state.moviesList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.moviesList = action.payload.data;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setAllMoviesData,
} = MoviesSlice.actions;

export default MoviesSlice.reducer;