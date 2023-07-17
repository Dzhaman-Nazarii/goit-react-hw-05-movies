import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchDetails } from "../../components/services/Service";

export default function MovieDetails() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await fetchDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, release_date, genres, poster_path, overview, vote_average } = movieDetails;
  const votePercentage = (vote_average * 10).toFixed(0);

  return (
    <>
      <div>
        <Link to={backLinkLocationRef.current}>Go back</Link>
        <h1>{title} ({release_date.substring(0, 4)})</h1>
        <p>Genres: {genres.map((genre) => genre.name).join(", ")}</p>
        <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt={title} />
        <p>Overview: {overview}</p>
        <p>User Score: {votePercentage}%</p>
      </div>
      <div>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast">
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews">
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}