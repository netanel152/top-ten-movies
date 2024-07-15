import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewMovie, updateMovie } from '../../store/features/MoviesSlice';
import { useLocation, useNavigate } from 'react-router-dom';
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
  Snackbar,
  Stack,
  TextField,
} from '@mui/material';
import { Title, CategoryDropDown } from 'components';
import MuiAlert from '@mui/material/Alert';


const initialMovieState = {
  title: '',
  category: '',
  rate: 0,
};

const MovieForm = () => {
  const defaultMoviePic =
    'https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png';
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success', 'error', 'warning', 'info'

  const [movieData, setMovieData] = useState(state || initialMovieState);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { value, name } }) => {
    setMovieData((prev) => ({
      ...prev,
      [name]: name === 'rate' ? +value : value,
    }));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  const clearFormData = useCallback(() => {
    setMovieData(initialMovieState);
    setErrors({});
  }, []);

  useEffect(() => {
    return clearFormData;
  }, [state, clearFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};

    if (movieData.title.trim().length < 2) {
      formErrors.title = 'Title is too short';
    }

    if (!movieData.category.trim()) {
      formErrors.category = 'Category is required';
    }

    if (movieData.rate <= 0 || movieData.rate > 10) {
      formErrors.rate = 'Rating must be between 0 and 10';
    }

    if (!Object.keys(formErrors).length) {
      try {
        movieData.imagePath = defaultMoviePic;
        const action = state ? updateMovie(movieData) : createNewMovie(movieData);
        await dispatch(action).unwrap();

        setSnackbarMessage(state === 'Create New Movie' ? 'Movie created successfully' : 'Movie updated successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        setTimeout(() => {
          navigate('/');
        }, 2250);

      }
      catch (error) {
        if (error.errorMessage === `Movie with title '${movieData.title}' already exists.`) {
          setErrors({ title: 'A movie with this name already exists' });
          setSnackbarMessage('A movie with this name already exists');
          setSnackbarSeverity('error');
        } else {
          setErrors({ api: 'An unexpected error occurred. Please try again.' });
          setSnackbarMessage('An unexpected error occurred. Please try again.');
          setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
      }
      setErrors(formErrors);
    }
  };


  return (
    <Container fixed>
      <form onSubmit={handleSubmit}>
        <Title text={state ? 'Update Movie' : 'Create New Movie'} />

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
                  {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
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
                    inputMode: 'decimal',
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

      <Box sx={{ position: 'relative', width: '100%', mt: 2 }}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2500}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ position: 'absolute', bottom: '-60px', width: '50%', maxWidth: '600px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: '100%', padding: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>

    </Container>
  );

};

export default MovieForm;
