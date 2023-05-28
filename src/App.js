import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import "./App.css";
import './Genre.css';
import "./MovieDetail.css";
import './Watched.css';
import Navbar from "./Navbar";
import MovieDetail from "./MovieDetail";

function App() {
  const [movies, setMovies] = useState([]);
  const [rekomendasi, setRekomendasi] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [,setImageLoading] = useState(true);
  const [nowPlayingPage, setNowPlayingPage] = useState(1); // Tambahkan state untuk halaman now playing
  const [rekomendasiPage, setRekomendasiPage] = useState(1); // Tambahkan state untuk halaman rekomendasi
  const [upcomingPage, setUpcomingPage] = useState(1); // Tambahkan state untuk halaman upcoming

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=f5c679a6106c3736f9db1caae426f31c&language=en-US&page=${nowPlayingPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results.slice(0, 8));

        const firstMovieId = data.results[0].id;
        fetch(`https://api.themoviedb.org/3/movie/${firstMovieId}/recommendations?api_key=f5c679a6106c3736f9db1caae426f31c&language=en-US&page=${rekomendasiPage}`)
          .then((response) => response.json())
          .then((data) => setRekomendasi(data.results.slice(0, 8)));
      });

    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=f5c679a6106c3736f9db1caae426f31c&language=en-US&page=${upcomingPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUpcomingMovies(data.results.slice(0, 8));
      });
  }, [nowPlayingPage, rekomendasiPage, upcomingPage]); // Tambahkan state yang digunakan sebagai dependensi

  useEffect(() => {
    const timer = setInterval(() => {
      setImageLoading(true);
      setBannerIndex((prevBannerIndex) => (prevBannerIndex + 1) % movies.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [movies]);

  const nextSlide = () => {
    setBannerIndex((prevBannerIndex) => (prevBannerIndex + 1) % movies.length);
  };

  const prevSlide = () => {
    setBannerIndex((prevBannerIndex) => (prevBannerIndex === 0 ? movies.length - 1 : prevBannerIndex - 1));
  };

  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  const nextNowPlayingPage = () => {
    setNowPlayingPage((prevPage) => prevPage + 1);
  };

  const prevNowPlayingPage = () => {
    if (nowPlayingPage > 1) {
      setNowPlayingPage((prevPage) => prevPage - 1);
    }
  };

  const nextRekomendasiPage = () => {
    setRekomendasiPage((prevPage) => prevPage + 1);
  };

  const prevRekomendasiPage = () => {
    if (rekomendasiPage > 1) {
      setRekomendasiPage((prevPage) => prevPage - 1);
    }
  };

  const nextUpcomingPage = () => {
    setUpcomingPage((prevPage) => prevPage + 1);
  };

  const prevUpcomingPage = () => {
    if (upcomingPage > 1) {
      setUpcomingPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Router>
      <div className="container-fluid">
        <Navbar />

        <Routes>
          <Route path="/" element={
            <>
              {movies.length > 0 && (
                <div className="banner">
                  {movies.map((movie, i) => (
                    <img
                      key={i}
                      src={`${baseImageUrl}${movie.poster_path}`}
                      alt={movie.title}
                      className={i === bannerIndex ? '' : 'fade-out'}
                    />
                  ))}
                  <button className="banner-button prev" onClick={() => prevSlide()}>&lt;</button>
                  <button className="banner-button next" onClick={() => nextSlide()}>&gt;</button>
                  <h2 className="banner-title">{movies[bannerIndex].title}</h2>
                </div>
              )}

              <p id="now">Now Playing</p>

              <div className="row" id="center">
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
                          <p className="card-title">{movie.title}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="page-button-group">
                <button className="page-button prev" onClick={() => prevNowPlayingPage()}>Prev</button>
                <button className="page-button next" onClick={() => nextNowPlayingPage()}>Next</button>
              </div>

              <br></br>
              <br></br>

              <p id="reco">Recommended</p>

              <div className="row" id="center">
                {rekomendasi.map((movie) => (
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

              <div className="page-button-group">
                <button className="page-button prev" onClick={() => prevRekomendasiPage()}>Prev</button>
                <button className="page-button next" onClick={() => nextRekomendasiPage()}>Next</button>
              </div>

              <br></br>
              <br></br>

              <p id="reco">Upcoming</p>

              <div className="row" id="center">
                {upcomingMovies.map((movie) => (
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

              <div className="page-button-group">
                <button className="page-button prev" onClick={() => prevUpcomingPage()}>Prev</button>
                <button className="page-button next" onClick={() => nextUpcomingPage()}>Next</button>
              </div>
            </>
          }/>

          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
