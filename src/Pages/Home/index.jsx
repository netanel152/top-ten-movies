import { Container } from "@mui/material";
import { Movies, Title } from "components";

const Home = () => {
  return (
    <Container fixed>
      <Title text={"Top 10 Movies Site"} />
      <Movies />
    </Container>
  );
};

export default Home;
