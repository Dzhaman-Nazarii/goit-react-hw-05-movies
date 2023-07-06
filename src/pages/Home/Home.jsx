import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {fetchTrending} from '../../components/services/Service'

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetchTrendingData();
  }, []);

  const fetchTrendingData = async () => {
    try {
      const data = await fetchTrending();
      setTrendingMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Trending today</h1>
      {trendingMovies.map((movie) => (
        <ul key={movie.id}>
          <li>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Home;