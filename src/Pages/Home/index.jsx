import "./Home.scss";
import { Typography } from "@mui/material";
import { Movies } from "components";

const Home = () => {
  return (
    <div className="home-container">
      <Typography variant="h3" my={3}>
        Top 10 Movies Site
      </Typography>

      <Movies />
    </div>
  );
};

export default Home;
