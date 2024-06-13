import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import { fetchAllMovies } from "../../store/features/MoviesSlice";
import MovieCard from "components/MovieCard";

const Movies = ({ selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.movieActions);

  useEffect(() => {
    dispatch(fetchAllMovies(selectedCategory));
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    return setSelectedCategory("");
  }, [setSelectedCategory]);

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
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <Typography variant="h5">
          There was an issue loading the movies. Please try again later.
        </Typography>
      </Box>
    );
  }
};

export default Movies;
