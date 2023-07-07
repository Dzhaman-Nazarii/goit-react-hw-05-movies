import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDetails } from "../../components/services/Service";

function MovieDetails() {
  const { movieId } = useParams();
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

  const {
    title,
    release_date,
    genres,
    poster_path,
    overview,
    vote_average,
  } = movieDetails;

  const votePercentage = (vote_average * 10).toFixed(0);

  return (
    <div>
      <Link to="/movies">Go back</Link>
      <h1>{title} ({release_date.substring(0, 4)})</h1>
      <p>Genres
        {genres.map((genre) => genre.name).join(", ")}</p>
      <img
        src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
        alt={title}
      />
      <p>Overview: {overview}</p>
      <p>User Score: {votePercentage}%</p>
    </div>
  );
}

export default MovieDetails;
