import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllMovies } from "store/features/MoviesSlice";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import "./header.scss";

const Header = ({ setSelectedCategory }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackHome = () => {
    dispatch(fetchAllMovies(""));
    setSelectedCategory("");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            mr={4}
            className="logo"
            onClick={handleBackHome}
          >
            ABC
          </Typography>

          <Button color="inherit" onClick={() => navigate("/movie")}>
            Create
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
