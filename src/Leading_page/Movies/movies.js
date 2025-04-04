import React, { useState, useEffect } from "react";
import { Star, Calendar, Search, MapPin } from "lucide-react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/movie.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState({
    trending: [],
    latest: [],
    hollywood: [],
    gujarati: [],
  });
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showEmptySearchPopup, setShowEmptySearchPopup] = useState(false);
  const navigate = useNavigate();

  const API_KEY = "91779228";

  const mainCities = [
    { name: "Ahmedabad", icon: "📍" },
    { name: "Mumbai", icon: "🏙️" },
    { name: "Delhi", icon: "🗼" },
    { name: "Bangalore", icon: "🌆" },
    { name: "Chennai", icon: "🏖️" },
  ];

  useEffect(() => {
    const fetchCategoryMovies = async (category, query) => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`
        );
        const data = await response.json();
        if (data.Response === "True") {
          const moviesWithPosters = data.Search.filter(
            (movie) => movie.Poster !== "N/A"
          ).slice(0, 5);
          setCategories((prev) => ({ ...prev, [category]: moviesWithPosters }));
        }
      } catch (error) {
        console.error(`Error fetching ${category} movies:`, error);
      }
    };

    fetchCategoryMovies("trending", "action");
    fetchCategoryMovies("latest", "2023");
    fetchCategoryMovies("hollywood", "marvel");
    fetchCategoryMovies("gujarati", "gujarati");
  }, [API_KEY]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationModal(false);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setShowEmptySearchPopup(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.Response === "True") {
        const moviesWithPosters = data.Search.filter(
          (movie) => movie.Poster !== "N/A"
        );
        setMovies(moviesWithPosters);
        setShowSearchPopup(true);
      } else {
        setError(data.Error || "No movies found.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderMovieCards = (movieList, isSearchResult = false) => {
    return movieList.map((movie) => (
      <div
        key={movie.imdbID}
        className={`movie-card ${isSearchResult ? "search-result-card" : ""}`}
        onClick={() => navigate(`/movies/${movie.imdbID}?location=${selectedLocation}`)}
      >
        <div className="movie-poster">
          <img src={movie.Poster} alt={movie.Title} />
          <div className="movie-overlay">
            <span>Book Now</span>
          </div>
        </div>
        <div className="movie-card-inner">
          <h6 className="movie-title">{movie.Title}</h6>
          <p className="movie-year">{movie.Year}</p>
          <div className="movie-details">
            <span>
              <Star size={16} className="star-icon" />
              {movie.imdbRating || "TBD"}
            </span>
            <span>
              <Calendar size={16} className="calendar-icon" />
              {movie.Year}
            </span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="movies-container">
      {/* Location Modal */}
      <Modal
        show={showLocationModal}
        onHide={() => setShowLocationModal(false)}
        centered
        className="location-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Your City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="location-buttons">
            {mainCities.map((city) => (
              <Button
                key={city.name}
                onClick={() => handleLocationSelect(city.name)}
                className="location-button"
              >
                {city.icon} {city.name}
              </Button>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      {/* Selected Location */}
      {!showLocationModal && selectedLocation && (
        <div className="selected-location">
          <MapPin size={24} className="map-icon" />
          <h3>{selectedLocation}</h3>
        </div>
      )}

      {/* Main Content */}
      {!showLocationModal && (
        <>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Search for Movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </form>

          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}

          {Object.keys(categories).map((category) => (
            <div key={category} className="movie-section">
              <h2>
                {category === "trending"
                  ? "Trending Now"
                  : `${category.charAt(0).toUpperCase() + category.slice(1)} Movies`}
              </h2>
              <div className="movie-grid">
                {renderMovieCards(categories[category])}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Search Results Modal */}
      <Modal
        show={showSearchPopup}
        onHide={() => setShowSearchPopup(false)}
        centered
        className="search-results-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="search-results-grid">
            {renderMovieCards(movies, true)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowSearchPopup(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Empty Search Modal */}
      <Modal
        show={showEmptySearchPopup}
        onHide={() => setShowEmptySearchPopup(false)}
        centered
        className="empty-search-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enter a movie name to search.</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowEmptySearchPopup(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Movies;