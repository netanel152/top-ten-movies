import { useLocation } from "react-router-dom";

const MovieForm = () => {
  const { state } = useLocation();
  console.log("asd", state);
  return <div>CreateMovie</div>;
};

export default MovieForm;
