import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchDetails } from "../../components/services/Service";
import Reviews from "../../components/Reviews/Reviews";
import Cast from "../../components/Cast/Cast";

export default function MovieDetails() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

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

  const handleCastClick = () => {
    setShowCast(true);
    setShowReviews(false);
  };

  const handleReviewsClick = () => {
    setShowReviews(true);
    setShowCast(false);
  };

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
            <Link to={`${location.pathname}/cast`} onClick={handleCastClick}>
              Cast
            </Link>
          </li>
          <li>
            <Link to={`${location.pathname}/reviews`} onClick={handleReviewsClick}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      {showCast && <Cast />}
      {showReviews && <Reviews />}
      <Outlet />
    </>
  );
}