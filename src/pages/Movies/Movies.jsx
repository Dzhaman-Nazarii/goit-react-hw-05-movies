import { searchMovies} from 'components/services/Service';
import { useEffect, useState } from 'react';
import { Link, useLocation} from 'react-router-dom';

function Movies() {
  const [movieName, setMovieName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (movieName.trim() === '') {
      alert('Введіть назву для пошуку');
      return;
    }
    setMovieName('');
  };

  const handleChange = ({ target }) => {
    setMovieName(target.value);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (movieName.trim() === '') {
        setSearchResults([]);
        return;
      }
      try {
        const results = await searchMovies(movieName);
        setSearchResults(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [movieName]);

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
            <Link to={`/movies/${movie.id}`} state={location}>
              {movie.title}
            </Link>
          </li>
        </ul>
      ))}
    </>
  );
}

export default Movies;
