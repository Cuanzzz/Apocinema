import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './Watched.css';
import MovieDetail from './MovieDetail';
import './Navbar.css';

const Watched = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=f5c679a6106c3736f9db1caae426f31c&page=${currentPage}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, [currentPage]);

  const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="watched-container">
      <h2>Most Watched</h2>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3" key={movie.id}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
              <div className="card">
                <img
                  src={`${baseImageUrl}${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className="prev-button" onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button className="next-button" onClick={handleNextPage}>
          Next
        </button>
      </div>

      <Routes>
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
};

export default Watched;
