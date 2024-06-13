import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  Typography,
  CardMedia,
  Modal,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import "./movieCard.scss";
import { Close } from "@mui/icons-material";

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultMoviePic = `${process.env.PUBLIC_URL}/images/default_movie_pic.png`;

  const navigate = useNavigate();

  const updateMovie = () => {
    navigate("/movie", { state: movie });
  };

  const handleError = (event) => {
    event.target.src = defaultMoviePic;
  };

  const moviePicture = movie?.imagePath || defaultMoviePic;

  return (
    <>
      <Grid key={movie.id} xs={12} sm={6} md={4} lg={3} item p={1}>
        <Card
          onClick={() => setIsModalOpen((prev) => !prev)}
          className="movie-card"
          data-after-content={movie.title}
        >
          <CardMedia
            component="img"
            height="100%"
            width="100%"
            image={moviePicture}
            onError={handleError}
            alt={movie?.title}
          />
        </Card>
      </Grid>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box className="modal-box">
          <Box className="modal-header">
            <IconButton
              aria-label="close"
              onClick={() => setIsModalOpen(false)}
            >
              <Close />
            </IconButton>
          </Box>

          <Box
            component="img"
            alt={`${movie?.title} Image`}
            src={moviePicture}
            onError={handleError}
            className="modal-image"
          />

          <Box className="modal-title">
            <Typography variant="h6" component="h2">
              {movie?.title}
            </Typography>
          </Box>

          <Typography sx={{ my: 1 }}>Category: {movie?.category}</Typography>

          <Typography sx={{ my: 1 }}>Rate: {`${movie?.rate} / 10`}</Typography>

          <Button variant="outlined" onClick={updateMovie}>
            Update
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MovieCard;
