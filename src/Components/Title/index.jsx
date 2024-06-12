import { Typography } from "@mui/material";

const Title = ({ text }) => {
  return (
    <Typography variant="h3" my={3} align="center">
      {text}
    </Typography>
  );
};

export default Title;
