import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {fetchTrending} from '../../components/services/Service'

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const location = useLocation()

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
            <Link to={`/movies/${movie.id}`} state={{from: location}}>{movie.title}</Link>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Home;