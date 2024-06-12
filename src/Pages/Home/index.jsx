import { useState } from "react";
import { Box, Container } from "@mui/material";
import { CategoryDropDown, Movies, Title } from "components";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChangeCategory = ({ target: { value } }) => {
    setSelectedCategory(value);
  };

  return (
    <Container fixed>
      <Title text={"Top 10 Movies Site"} />

      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <CategoryDropDown
          category={selectedCategory}
          handleChange={handleChangeCategory}
        />
      </Box>

      <Movies selectedCategory={selectedCategory} />
    </Container>
  );
};

export default Home;
