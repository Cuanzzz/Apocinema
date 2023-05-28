import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=f5c679a6106c3736f9db1caae426f31c&language=en-US`
      );
      const movieData = await movieResponse.json();

      const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=f5c679a6106c3736f9db1caae426f31c&language=en-US`
      );
      const creditsData = await creditsResponse.json();
      const director = creditsData.crew.find(
        (member) => member.job === "Director"
      ).name;
      const cast = creditsData.cast.slice(0, 5).map((actor) => actor.name);

      setMovieDetails(movieData);
      setCast(cast);
      setDirector(director);
    };

    fetchData();
  }, [id]);

  if (!movieDetails) return null;

  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-12 col-md-4">
              <img
                src={`${baseImageUrl}${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="img-fluid movie-poster"
              />
            </div>
            <div className="col-12 col-md-8 movie-detail-text">
              <div
                className="movie-detail-top"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${baseImageUrl}${movieDetails.poster_path})`,
                }}
              >
                <div className="container">
                  <h1>{movieDetails.title}</h1>
                  <h2>Director</h2>
                  <p>{director}</p>
                </div>
              </div>
              <p>{movieDetails.overview}</p>
              <p>
                <b>Release Date:</b> {movieDetails.release_date}
              </p>
              <p>
                <b>Duration:</b> {movieDetails.runtime} minutes
              </p>
              <p>
                <b>Genre:</b>{" "}
                {movieDetails.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>
                <b>Rating:</b> {movieDetails.vote_average} / 10
              </p>
              <h2>Cast</h2>
              <ul>
                {cast.map((actor, i) => (
                  <li key={i}>{actor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;