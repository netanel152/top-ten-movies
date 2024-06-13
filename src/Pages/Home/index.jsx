import { Box, Container } from "@mui/material";
import { CategoryDropDown, Movies, Title } from "components";

const Home = ({ selectedCategory, setSelectedCategory }) => {
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

      <Movies
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </Container>
  );
};

export default Home;
