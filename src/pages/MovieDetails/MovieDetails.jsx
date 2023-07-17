import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchDetails } from "../../components/services/Service";
import css from './MovieDetails.module.css'

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
      <div className={css.movie__container}>
        <Link to={backLinkLocationRef.current}>Go back</Link>
        <h1 className={css.movie__title}>{title} ({release_date.substring(0, 4)})</h1>
        <p className={css.descriptin__title}>Genres: {genres.map((genre) => genre.name).join(", ")}</p>
        <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt={title} className={css.movie__image} />
        <p className={css.movie__text}>Overview: {overview}</p>
        <p>User Score: {votePercentage}%</p>
      </div>
      <div>
        <h2 className={css.descriptin__title}>Additional information</h2>
        <ul>
          <li>
            <Link to="cast" className={css.aditional__title}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={css.aditional__title}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}