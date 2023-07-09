import { fetchReviews } from "../../components/services/Service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const reviewsData = await fetchReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
}
