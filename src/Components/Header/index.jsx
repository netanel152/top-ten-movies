import { useNavigate } from "react-router-dom";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            mr={4}
            className="logo"
            onClick={() => navigate("/")}
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
