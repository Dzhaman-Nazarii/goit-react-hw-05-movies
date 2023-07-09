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
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=en-US`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetails = async id => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCast = async id => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    return response.data.cast;
  } catch (error) {
    console.log(error);
  }
};

export const fetchReviews = async id => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};