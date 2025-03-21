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
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

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
      console.error("Error searching movies:", error);
      setError("An error occurred while fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  const renderMovieCards = (movieList) => {
    return movieList.map((movie) => (
      <div
        key={movie.imdbID}
        className="movie-card"
        onClick={() => navigate(`/movies/${movie.imdbID}?location=${selectedLocation}`)}
      >
        <div className="movie-card-inner">
          <div className="movie-poster">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-overlay">🎬 Watch Now</div>
          </div>
          <h6 className="movie-title">{movie.Title}</h6>
          <p className="movie-year">{movie.Year}</p>
          <div className="movie-details">
            <span>
              <Star size={16} className="star-icon" />
              {movie.imdbRating || "N/A"}
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
          <Modal.Title>Choose Your Location</Modal.Title>
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

      {/* Display Selected Location */}
      {!showLocationModal && selectedLocation && (
        <div className="selected-location">
          <MapPin size={24} className="map-icon" />
          <h3>{selectedLocation}</h3>
        </div>
      )}

      {/* Rest of the Page */}
      {!showLocationModal && (
        <>
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </form>

          {/* Loading State */}
          {loading && <p className="loading">Loading...</p>}

          {/* Error Message */}
          {error && <p className="error">{error}</p>}

          {/* Display Movies by Category */}
          {Object.keys(categories).map((category) => (
            <div key={category} className="movie-section">
              <h2>
                {category === "trending"
                  ? "Trending Movies"
                  : `${category.charAt(0).toUpperCase() + category.slice(1)} Movies`}
              </h2>
              <div className="movie-grid">
                {renderMovieCards(categories[category])}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Search Results Popup */}
      {showSearchPopup && (
        <Modal
          show={showSearchPopup}
          onHide={() => setShowSearchPopup(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Search Results</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="movie-grid">{renderMovieCards(movies)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowSearchPopup(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Empty Search Popup */}
      <Modal
        show={showEmptySearchPopup}
        onHide={() => setShowEmptySearchPopup(false)}
        centered
        className="empty-search-popup"
      >
        <Modal.Header closeButton>
          <Modal.Title>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please enter a movie title to search.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowEmptySearchPopup(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Movies;