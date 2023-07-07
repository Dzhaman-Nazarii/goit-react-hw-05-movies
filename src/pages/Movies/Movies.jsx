import { searchMovies } from 'components/services/Service';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Movies() {
  const [movieName, setMovieName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (movieName.trim() === '') {
      alert('Введіть назву для пошуку');
      return;
    }
    try {
      const results = await searchMovies(movieName);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    }
    setMovieName('');
  };

  const handleChange = ({target}) => {
    setMovieName(target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="movieName"
          value={movieName}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
        
      {searchResults.map((movie) => (
        <ul key={movie.id}>
          <li>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        </ul>
      ))}
      </>
  );
}

export default Movies;
