import axios from "axios";

export const getMoviesAPI = async (categoryValue) => {
  const response = await axios.post(process.env.REACT_APP_API_URL + 'all-movies',
    { take: 10, skip: 0, searchType: 2, categoryValue });
  return response.data;
};

export const addNewMovieAPI = async (movieData) => {
  const response = await axios.post(process.env.REACT_APP_API_URL + 'create-movie', movieData);
  return response.data;
};

export const updateMovieAPI = async (movieData) => {
  const response = await axios.put(process.env.REACT_APP_API_URL + 'update-movie', movieData);
  return response.data;
};