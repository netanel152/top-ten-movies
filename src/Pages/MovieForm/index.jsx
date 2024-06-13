import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createNewMovie,
  setSelectedCategory,
  updateMovie,
} from "../../store/features/MoviesSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { Title, CategoryDropDown } from "components";

const initialMovieState = {
  title: "",
  category: "",
  rate: 0,
};

const MovieForm = () => {
  const defaultMoviePic =
    "https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png";
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState(state || initialMovieState);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { value, name } }) => {
    setMovieData((prev) => ({
      ...prev,
      [name]: name === "rate" ? +value : value,
    }));
  };

  const clearFormData = useCallback(() => {
    setMovieData(initialMovieState);
    setSelectedCategory("");
    setErrors({});
  }, []);

  useEffect(() => {
    return clearFormData;
  }, [state, clearFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};

    if (movieData.title.trim().length < 2) {
      formErrors.title = "Title is too short";
    }

    if (!movieData.category.trim()) {
      formErrors.category = "Category is required";
    }

    if (movieData.rate <= 0 || movieData.rate > 10) {
      formErrors.rate = "Rating must be between 0 and 10";
    }

    if (!Object.keys(formErrors).length) {
      setErrors({});
      movieData.imagePath = defaultMoviePic;
      console.log("submit", movieData);

      state
        ? dispatch(updateMovie(movieData))
        : dispatch(createNewMovie(movieData));

      clearFormData();
      navigate("/");
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Container fixed>
      <form onSubmit={handleSubmit}>
        <Title text={state ? "Update Movie" : "Create New Movie"} />

        <Card>
          <CardHeader title="Movie Form" />

          <CardContent>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  id="title"
                  name="title"
                  label="Movie Name"
                  fullWidth
                  value={movieData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <FormControl fullWidth error={!!errors.category}>
                  <CategoryDropDown
                    category={movieData.category}
                    handleChange={handleChange}
                    isFormDropDown
                  />
                  {errors.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  id="rate"
                  name="rate"
                  label="Movie Rating"
                  fullWidth
                  value={movieData.rate}
                  onChange={handleChange}
                  type="number"
                  inputProps={{
                    step: 0.1,
                    min: 0,
                    max: 10,
                    inputMode: "decimal",
                  }}
                  error={!!errors.rate}
                  helperText={errors.rate}
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardActions>
            <Stack flexDirection="row" justifyContent="center" width={1}>
              <Box m={1}>
                <Button variant="outlined" type="submit">
                  Submit
                </Button>
              </Box>
              <Box m={1}>
                <Button variant="outlined" onClick={clearFormData}>
                  Clear
                </Button>
              </Box>
            </Stack>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};

export default MovieForm;
