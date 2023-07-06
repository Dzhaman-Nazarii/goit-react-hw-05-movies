import axios from "axios";

const API_KEY = "8ce6e3559b76c5181cc147c61e659efd";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrending = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDetails = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/movie_id?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};