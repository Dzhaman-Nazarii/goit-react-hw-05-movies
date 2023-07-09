import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCast } from "../../components/services/Service";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const castData = await fetchCast(movieId);
        setCast(castData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    

    <div>
      {cast.length > 0 ? (
        <ul>
          {cast.map(({ id, profile_path, name }) => (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                alt={name}
              />
              {name}
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have information about cast.</p>
      )}
    </div>
  );
}