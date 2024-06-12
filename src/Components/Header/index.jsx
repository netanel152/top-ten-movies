import { useNavigate } from "react-router-dom";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Logo = styled(Typography)`
  cursor: pointer;
  overflow: visible;
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Logo variant="h6" mr={4} onClick={() => navigate("/")}>
            ABC
          </Logo>

          <Button color="inherit" onClick={() => navigate("/movie")}>
            Create
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
