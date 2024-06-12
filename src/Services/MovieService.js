import axios from "axios";
const body = {
  take: 10,
  skip: 0,
  searchType: 2
};
export const getMoviesAPI = async () => {
  const response = await axios.post(process.env.REACT_APP_API_URL + 'all-movies', body);
  console.log(response.data);
  return response.data;
};