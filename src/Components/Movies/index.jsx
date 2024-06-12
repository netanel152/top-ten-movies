import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import { fetchAllMovies } from "../../redux/Features/MoviesSlice";
import MovieCard from "components/MovieCard";

const Movies = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movieActions);
  const { status } = useSelector((state) => state.movieActions);
  const { error } = useSelector((state) => state.movieActions);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllMovies(selectedCategory));
    }
  }, [status, dispatch, selectedCategory]);

  if (status === "loading") {
    return <CircularProgress />;
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
