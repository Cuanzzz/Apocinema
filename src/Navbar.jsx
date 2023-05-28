import React, { useState, useEffect } from "react";
import { Link, NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Logo from "./gambar/ApoCinema.png";
import Watched from "./Watched";
import Genre from "./Genre";
import About from "./About";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=f5c679a6106c3736f9db1caae426f31c&query=${searchTerm}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.results);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=f5c679a6106c3736f9db1caae426f31c&query=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const movieId = data.results[0].id;
          navigate(`/movie/${movieId}`);
        }
      });
  };

  const baseImageUrl = "https://image.tmdb.org/t/p/w500"; // URL base untuk poster film

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="search-form">
        <form
          className="d-flex"
          onSubmit={(event) => handleSearch(event, suggestions[0]?.id)}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Cari..."
            aria-label="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => navigate(`/movie/${suggestion.id}`)}
              >
                <img
                  src={`${baseImageUrl}${suggestion.poster_path}`}
                  alt={suggestion.title}
                  className="suggestion-poster"
                />
                {suggestion.title}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container-fluid">
        <div className="menu-logo-wrapper">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className="navbar-brand">
            <img
              src={Logo}
              alt="Logo UMN"
              className="d-inline-block align-text-top"
            />
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeClassName="active" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/watched"
                className="nav-link"
                activeClassName="active"
              >
                Most Watched
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/genre"
                className="nav-link"
                activeClassName="active"
              >
                Genre
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link"
                activeClassName="active"
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Routes>
        <Route path="/watched" element={<Watched />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </nav>
  );
};

export default Navbar;
