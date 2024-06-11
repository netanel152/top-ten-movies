import React from "react";
import "./Home.scss";
import MoviesGrid from "../../Components/Movie/MoviesGrid";
const Home = () => {
  return (
    <div className="home-container">
      <h1>Top 10 Movies Site</h1>
      <MoviesGrid />
    </div>
  );
};

export default Home;
