import axios from "axios";
import { api } from "../utils/apiURL";
const body = {
  take: 10,
  skip: 0,
  searchValue: "string",
  categoryValue: "string",
  searchType: 2
};
export const getMoviesAPI = async () => {
  const response = await axios.post(api + 'all-movies', body);
  console.log(response.data);
  return response.data;
};