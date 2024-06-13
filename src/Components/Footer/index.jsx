import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box backgroundColor="#1976d2">
      <Container fixed>
        <Typography py={1} sx={{ textAlign: "center" }}>
          ABC Movies LTD | Phone: 076-6654376 | www.abc-movies-ltd.com
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
