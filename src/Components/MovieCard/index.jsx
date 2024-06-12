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
import "./MovieCard.scss";
import { Close } from "@mui/icons-material";

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "4px",
    outline: 0,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const updateMovie = () => {
    navigate("/movie", { state: movie });
  };

  return (
    <>
      <Grid
        item
        key={movie.id}
        xs={12}
        sm={6}
        md={4}
        spacing={2}
        lg={3}
        container
      >
        <Card
          onClick={() => setIsModalOpen((prev) => !prev)}
          className="movie-card"
          data-after-content={movie.title}
        >
          <CardMedia
            component="img"
            height="500px"
            // image={movie?.picture}
            image={
              "https://img.yts.mx/assets/images/movies/hit_man_2023/medium-cover.jpg"
            }
            alt={movie?.title}
          />
        </Card>
      </Grid>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={style}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
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
            src="https://img.yts.mx/assets/images/movies/hit_man_2023/medium-cover.jpg"
          />

          <Typography variant="h6" component="h2">
            {movie?.title}
          </Typography>

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
