import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Title } from "components";

const initialMovieState = {
  title: "",
  category: "",
  rate: 0,
};

const MovieForm = () => {
  const { state } = useLocation();

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
    setErrors({});
  }, []);

  useEffect(() => {
    return clearFormData;
  }, [state, clearFormData]);

  const handleSubmit = (e) => {
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

      console.log("submit", movieData);
      // Add logic to submit the form data
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
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    id="category"
                    name="category"
                    labelId="category"
                    label="Category"
                    value={movieData.category}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Action"}>Action</MenuItem>
                    <MenuItem value={"Science Fiction"}>
                      Science Fiction
                    </MenuItem>
                    <MenuItem value={"Animation"}>Animation</MenuItem>
                    <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                    <MenuItem value={"Adventure"}>Adventure</MenuItem>
                  </Select>
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
