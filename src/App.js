import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home, MovieForm } from 'pages'
import { Header, Footer } from 'components'
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Router>
        <Header />
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/movie" element={<MovieForm />}></Route>
          </Routes>
        </Box>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;