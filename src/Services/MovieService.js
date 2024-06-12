import axios from "axios";
const body = {
  take: 10,
  skip: 0,
  searchType: 2
};

export const getMoviesAPI = async (categoryValue) => {
  const response = await axios.post(process.env.REACT_APP_API_URL + 'all-movies', { ...body, categoryValue });
  console.log(response.data);
  return response.data;
};

export const addNewMovieAPI = async (movieData) => {
  const response = await axios.post(process.env.REACT_APP_API_URL + 'create-movie', movieData);
  console.log(response.data);
  return response.data;
};

export const updateMovieAPI = async (movieData) => {
  const response = await axios.put(process.env.REACT_APP_API_URL + 'update-movie', movieData);
  console.log(response.data);
  return response.data;
};