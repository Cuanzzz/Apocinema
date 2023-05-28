import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Genre.css';

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [filterByYear, setFilterByYear] = useState(false); // Add this line

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=f5c679a6106c3736f9db1caae426f31c`)
      .then(response => response.json())
      .then(data => setGenres(data.genres))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedGenres.length > 0) {
      const genreIds = selectedGenres.map(genre => genre.id).join(',');
      let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=f5c679a6106c3736f9db1caae426f31c&with_genres=${genreIds}&page=${currentPage}`;
      if (filterByYear) { // Add this condition
        apiUrl += `&primary_release_year=${selectedYear}`;
      }
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          setMovies(data.results);
          setTotalPages(data.total_pages);
        })
        .catch(error => console.error(error));
    } else {
      setMovies([]);
    }
  }, [selectedGenres, currentPage, selectedYear, filterByYear]); // Add filterByYear to the dependency array

  const handleGenreSelection = (genre) => {
    if (selectedGenres.find(g => g.id === genre.id)) {
      setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
    setCurrentPage(1);
  }

  const handleYearSelection = (event) => {
    setSelectedYear(event.target.value);
    setCurrentPage(1);
  }

  const handleFilterByYear = (event) => {
    setFilterByYear(event.target.checked);
    setCurrentPage(1);
  }

  const allowedGenreIds = [27, 35, 16, 53, 14, 36, 28, 99, 10402, 10764, 10749, 10752, 878, 12];
  const filteredGenres = genres.filter(genre => allowedGenreIds.includes(genre.id));
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="genre-container">
      <div className="search-form">
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Cari..." aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>

      <h2>Select a Genre</h2>
      <div className="genre-box">
        {filteredGenres.map(genre => (
          <div
            key={genre.id}
            className={`genre-item ${selectedGenres.find(g => g.id === genre.id) ? 'genre-item-selected' : ''}`}
            onClick={() => handleGenreSelection(genre)}
          >
            {genre.name}
          </div>
        ))}
      </div>

      <div className="year-selection">
        <label htmlFor="year-select">Select Year:</label>
        <select id="year-select" value={selectedYear} onChange={handleYearSelection}>
          {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => i + 1900).map(year => (
            <option key={year} value={year.toString()}>{year}</option>
          ))}
        </select>
        <label htmlFor="filter-checkbox">
          Filter by Year:
          <input className="check" type="checkbox" id="filter-checkbox" checked={filterByYear} onChange={handleFilterByYear} />
        </label>
      </div>

      {selectedGenres.length > 0 && (
        <div className="selected-genre">
          <h3 className="selected-genre-title">Selected Genres: {selectedGenres.map(g => g.name).join(', ')}</h3>

          <div className="row">
            {movies.map(movie => (
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={movie.id}>
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                  <div className="card">
                    <img
                      src={`${baseImageUrl}${movie.poster_path}`}
                      className="card-img-top"
                      alt={movie.title}
                    />
                    <div className="card-body">
                      <p className="card-title">{movie.title}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="tombol">
            <button className="prev-button" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
            <button className="next-button" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Genre;
