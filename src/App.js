import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home, MovieForm } from 'pages'
import { Header, Footer } from 'components'
import "./App.scss";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/movie" element={<MovieForm />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;