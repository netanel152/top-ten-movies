import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress, Box } from "@mui/material";
import { fetchAllMovies } from "../../store/features/MoviesSlice";
import MovieCard from "components/MovieCard";

const Movies = () => {
  const dispatch = useDispatch();
  const { selectedCategory, movies, status, error } = useSelector(
    (state) => state.movieActions
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllMovies(selectedCategory));
    }
  }, [status, dispatch, selectedCategory]);

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "succeeded") {
    return (
      <Grid container justifyContent="center" alignItems="center" mb={8}>
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    );
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }
};

export default Movies;
