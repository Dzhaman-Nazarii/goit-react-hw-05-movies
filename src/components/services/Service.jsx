import axios from 'axios';

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

export const searchMovies = async (searchQuery) => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          include_adult: 'false',
          language: 'en-US',
          page: '1',
          query: searchQuery,
          api_key: `${API_KEY}`,
        },
        headers: { accept: 'application/json' },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      params: {
        language: 'en-US',
      },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer 8ce6e3559b76c5181cc147c61e659efd',
      },
    };

    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};