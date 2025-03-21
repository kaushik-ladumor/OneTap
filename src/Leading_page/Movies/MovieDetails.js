import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Star, Calendar, MapPin } from "lucide-react";
import { Modal, Button } from "react-bootstrap";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedLocation = queryParams.get("location");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([
    { id: 1, text: "Amazing movie! Highly recommended.", user: "John Doe", rating: 5 },
    { id: 2, text: "Great storyline and acting.", user: "Jane Smith", rating: 4 },
    { id: 3, text: "Loved the cinematography.", user: "Alice Johnson", rating: 4.5 },
  ]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [cinemas, setCinemas] = useState([]);
  const [showNoCinemasPopup, setShowNoCinemasPopup] = useState(false);
  const [showReviewErrorPopup, setShowReviewErrorPopup] = useState(false); // New state for review error popup

  const imdb_keys = [
    '4b447405', 'eb0c0475', '7776cbde', 'ff28f90b', '6c3a2d45',
    'b07b58c8', 'ad04b643', 'a95b5205', '777d9323', '2c2c3314',
    'b5cff164', '89a9f57d', '73a9858a', 'efbd8357'
  ];
  const API_KEY = imdb_keys[Math.floor(Math.random() * imdb_keys.length)];

  // Updated mock data for cinemas with exactly 5 cinemas per city
  const mockCinemas = [
    // Ahmedabad
    { id: 1, name: "Cinepolis: Ahmedabad", location: "Ahmedabad", image: "https://via.placeholder.com/200x150?text=Cinepolis" },
    { id: 2, name: "PVR: Acropolis Mall", location: "Ahmedabad", image: "https://via.placeholder.com/200x150?text=PVR" },
    { id: 3, name: "INOX: Gujarat Mall", location: "Ahmedabad", image: "https://via.placeholder.com/200x150?text=INOX" },
    { id: 4, name: "PVR: Himalaya Mall", location: "Ahmedabad", image: "https://via.placeholder.com/200x150?text=PVR+Himalaya" },
    { id: 5, name: "INOX: Shyamal Crossroad", location: "Ahmedabad", image: "https://via.placeholder.com/200x150?text=INOX+Shyamal" },
    // Delhi
    { id: 6, name: "PVR: Connaught Place", location: "Delhi", image: "https://via.placeholder.com/200x150?text=PVR+Delhi" },
    { id: 7, name: "INOX: Nehru Place", location: "Delhi", image: "https://via.placeholder.com/200x150?text=INOX+Delhi" },
    { id: 8, name: "Cinepolis: DLF Mall", location: "Delhi", image: "https://via.placeholder.com/200x150?text=Cinepolis+Delhi" },
    { id: 9, name: "PVR: Select Citywalk", location: "Delhi", image: "https://via.placeholder.com/200x150?text=PVR+Select" },
    { id: 10, name: "INOX: Janakpuri", location: "Delhi", image: "https://via.placeholder.com/200x150?text=INOX+Janakpuri" },
    // Mumbai
    { id: 11, name: "PVR: Phoenix Mills", location: "Mumbai", image: "https://via.placeholder.com/200x150?text=PVR+Mumbai" },
    { id: 12, name: "INOX: R-City Mall", location: "Mumbai", image: "https://via.placeholder.com/200x150?text=INOX+Mumbai" },
    { id: 13, name: "Cinepolis: Viviana Mall", location: "Mumbai", image: "https://via.placeholder.com/200x150?text=Cinepolis+Viviana" },
    { id: 14, name: "PVR: Oberoi Mall", location: "Mumbai", image: "https://via.placeholder.com/200x150?text=PVR+Oberoi" },
    { id: 15, name: "INOX: Metro Junction", location: "Mumbai", image: "https://via.placeholder.com/200x150?text=INOX+Metro" },
    // Bangalore
    { id: 16, name: "PVR: Orion Mall", location: "Bangalore", image: "https://via.placeholder.com/200x150?text=PVR+Bangalore" },
    { id: 17, name: "INOX: Forum Mall", location: "Bangalore", image: "https://via.placeholder.com/200x150?text=INOX+Bangalore" },
    { id: 18, name: "Cinepolis: Royal Meenakshi", location: "Bangalore", image: "https://via.placeholder.com/200x150?text=Cinepolis+Meenakshi" },
    { id: 19, name: "PVR: VR Bengaluru", location: "Bangalore", image: "https://via.placeholder.com/200x150?text=PVR+VR" },
    { id: 20, name: "INOX: Garuda Mall", location: "Bangalore", image: "https://via.placeholder.com/200x150?text=INOX+Garuda" },
    // Chennai
    { id: 21, name: "Cinepolis: Express Avenue", location: "Chennai", image: "https://via.placeholder.com/200x150?text=Cinepolis+Chennai" },
    { id: 22, name: "PVR: Ampa Skywalk", location: "Chennai", image: "https://via.placeholder.com/200x150?text=PVR+Chennai" },
    { id: 23, name: "INOX: Chennai Citi Centre", location: "Chennai", image: "https://via.placeholder.com/200x150?text=INOX+Chennai" },
    { id: 24, name: "PVR: VR Chennai", location: "Chennai", image: "https://via.placeholder.com/200x150?text=PVR+VR+Chennai" },
    { id: 25, name: "INOX: The Marina Mall", location: "Chennai", image: "https://via.placeholder.com/200x150?text=INOX+Marina" },
  ];

  useEffect(() => {
    if (!id) {
      setError("Invalid IMDb ID.");
      setLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found.");
        }
      } catch (error) {
        setError("An error occurred while fetching movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();

    // Filter cinemas based on selected location
    if (selectedLocation) {
      const filteredCinemas = mockCinemas.filter(cinema => 
        cinema.location.toLowerCase() === selectedLocation.toLowerCase()
      );
      setCinemas(filteredCinemas);
      if (filteredCinemas.length === 0) {
        setShowNoCinemasPopup(true);
      }
    } else {
      setCinemas(mockCinemas); // Show all cinemas if no location is selected
    }
  }, [id, API_KEY, selectedLocation]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() === "" || newRating === 0) {
      setShowReviewErrorPopup(true); // Show styled popup instead of alert
      return;
    }
    const newReviewObj = {
      id: reviews.length + 1,
      text: newReview,
      user: "Anonymous",
      rating: newRating,
    };
    setReviews([...reviews, newReviewObj]);
    setNewReview("");
    setNewRating(0);
  };

  if (loading) return <div style={{ color: '#ff4444', textAlign: 'center', fontSize: '20px' }}>Loading...</div>;
  if (error) return <div style={{ color: '#ff4444', textAlign: 'center', fontSize: '20px' }}>{error}</div>;
  if (!movie) return <div style={{ color: '#666', textAlign: 'center', fontSize: '20px' }}>Movie not found!</div>;

  const movieDetailsContainerStyle = {
    display: 'flex',
    flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
    alignItems: window.innerWidth <= 768 ? 'center' : 'flex-start',
    gap: '20px',
    marginBottom: '30px',
  };

  return (
    <div style={{ 
      backgroundColor: '#f9f9f9', 
      color: '#333', 
      padding: '20px', 
      minHeight: '100vh', 
      width: '100%', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      fontFamily: "'Arial', sans-serif" 
    }}>
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', 
        border: '2px solid #ff4444' 
      }}>
        {/* Display Selected Location */}
        {selectedLocation && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <MapPin size={24} color="#ff4444" />
            <h3 style={{ color: '#ff4444', margin: '0', fontSize: '20px' }}>{selectedLocation}</h3>
          </div>
        )}

        {/* Movie Poster and Details */}
        <div style={movieDetailsContainerStyle}>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Poster"}
            alt={movie.Title}
            style={{ 
              width: window.innerWidth <= 768 ? '100%' : '40%', 
              maxWidth: '450px',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '10px', 
              border: '2px solid #ff4444', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />

          <div style={{ 
            flex: 1, 
            textAlign: window.innerWidth <= 768 ? 'center' : 'left', 
            padding: window.innerWidth <= 768 ? '0' : '0 20px',
          }}>
            <h1 style={{ 
              fontSize: window.innerWidth <= 768 ? '28px' : '36px', 
              fontWeight: 'bold', 
              marginTop: window.innerWidth <= 768 ? '20px' : '0', 
              color: '#ff4444',
            }}>
              {movie.Title}
            </h1>
            <p style={{ 
              fontSize: window.innerWidth <= 768 ? '16px' : '18px', 
              color: '#666', 
              marginTop: '15px', 
              lineHeight: '1.6' 
            }}>
              {movie.Plot || "No plot available."}
            </p>
            <div style={{ 
              display: 'flex', 
              flexDirection: window.innerWidth <= 768 ? 'column' : 'row', 
              alignItems: window.innerWidth <= 768 ? 'center' : 'flex-start',
              gap: '15px', 
              marginTop: '20px' 
            }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#f9f9f9', 
                padding: '8px 14px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
              }}>
                <Star size={20} style={{ color: '#ff4444', marginRight: '6px' }} />
                <span style={{ fontSize: '16px', color: '#333' }}>{movie.imdbRating || "N/A"}</span>
              </span>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#f9f9f9', 
                padding: '8px 14px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
              }}>
                <Calendar size={20} style={{ color: '#666', marginRight: '6px' }} />
                <span style={{ fontSize: '16px', color: '#333' }}>{movie.Released || "N/A"}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Cinemas Section */}
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            marginBottom: '20px', 
            color: '#ff4444',
          }}>
            Cinemas in {selectedLocation || "All Locations"}
          </h2>
          {cinemas.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
            }}>
              {cinemas.map((cinema) => (
                <div
                  key={cinema.id}
                  onClick={() => navigate(`/booking/${cinema.id}`, { state: { cinema } })}
                  style={{
                    backgroundColor: '#fff',
                    padding: '15px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img
                    src={cinema.image}
                    alt={cinema.name}
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <h3 style={{ color: '#ff4444', marginTop: '10px', fontSize: '18px' }}>{cinema.name}</h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>{cinema.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#666', fontSize: '16px' }}>No cinemas available for this location.</p>
          )}
        </div>

        {/* User Reviews Section */}
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            marginBottom: '20px', 
            color: '#ff4444',
          }}>
            User Reviews
          </h2>
          <form onSubmit={handleReviewSubmit} style={{ marginBottom: '20px' }}>
            <textarea
              placeholder="Write your review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '8px',
                border: '2px solid #ff4444',
                backgroundColor: '#fff',
                fontSize: '16px',
                minHeight: '120px',
                color: '#333',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#cc0000'}
              onBlur={e => e.currentTarget.style.borderColor = '#ff4444'}
            />
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label style={{ fontSize: '16px', color: '#333', fontWeight: 'bold' }}>Rating:</label>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  style={{
                    color: newRating >= star ? '#ff4444' : '#ced4da',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onClick={() => setNewRating(star)}
                />
              ))}
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#ff4444',
                color: '#fff',
                padding: '12px 25px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                marginTop: '15px',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = '#cc0000';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = '#ff4444';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Submit Review
            </button>
          </form>
          {reviews.length > 0 ? (
            <div>
              {reviews.map((review) => (
                <div key={review.id} style={{ 
                  marginBottom: '20px', 
                  padding: '15px', 
                  backgroundColor: '#f9f9f9', 
                  borderRadius: '10px', 
                  border: '2px solid #ff4444', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                }}>
                  <p style={{ fontSize: '16px', color: '#333', lineHeight: '1.6' }}>{review.text}</p>
                  <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={20}
                        style={{ color: i < review.rating ? '#ff4444' : '#ced4da' }}
                      />
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>- {review.user}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#666', fontSize: '16px' }}>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>

      {/* No Cinemas Popup */}
      <Modal
        show={showNoCinemasPopup}
        onHide={() => setShowNoCinemasPopup(false)}
        centered
        className="no-cinemas-popup"
      >
        <Modal.Header closeButton>
          <Modal.Title>No Cinemas Available</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sorry, there are no cinemas available in {selectedLocation} for this movie.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowNoCinemasPopup(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Review Error Popup */}
      <Modal
        show={showReviewErrorPopup}
        onHide={() => setShowReviewErrorPopup(false)}
        centered
        className="review-error-popup"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#ff4444' }}>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: '16px', color: '#333' }}>
            Please enter a review and select a rating before submitting.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: '#ff4444',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease',
            }}
            onClick={() => setShowReviewErrorPopup(false)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#cc0000')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff4444')}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieDetails;