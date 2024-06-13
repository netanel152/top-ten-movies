import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../store/features/MoviesSlice";
import { Box, Container } from "@mui/material";
import { CategoryDropDown, Movies, Title } from "components";

const Home = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.movieActions.selectedCategory
  );

  const handleChangeCategory = ({ target: { value } }) => {
    dispatch(setSelectedCategory(value));
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

      <Movies />
    </Container>
  );
};

export default Home;
