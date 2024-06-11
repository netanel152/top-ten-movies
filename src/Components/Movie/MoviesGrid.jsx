import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { fetchAllMovies } from "../../redux/Features/MoviesSlice";
import "./MoviesGrid.scss";

const MoviesGrid = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movieActions?.moviesList);
  const status = useSelector((state) => state.movieActions?.status);
  const error = useSelector((state) => state.movieActions?.error);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllMovies());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = (
      <Grid container spacing={2} className="movies-grid">
        {movies?.map((movie) => (
          <Grid
            item
            key={movie.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="movie-item"
          >
            <Card className="movie-card">
              <CardMedia
                component="img"
                height="140"
                image={movie.picture}
                alt={movie.title}
                className="movie-image"
              />
              <CardContent className="movie-content">
                <Typography
                  variant="h5"
                  component="div"
                  className="movie-title"
                >
                  {movie.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="movie-category"
                >
                  {movie.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};

export default MoviesGrid;
