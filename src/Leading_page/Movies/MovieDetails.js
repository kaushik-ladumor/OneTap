import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Star, Calendar, MapPin, User } from "lucide-react";
import { Modal, Button } from "react-bootstrap";
import { getRandomImdbKey } from "../../config";
import "../../styles/MovieDetails.css";

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
    { id: 1, text: "A cinematic masterpiece!", user: "John Doe", rating: 5 },
    { id: 2, text: "Captivating from start to finish.", user: "Jane Smith", rating: 4 },
    { id: 3, text: "Visually stunning!", user: "Alice Johnson", rating: 4.5 },
  ]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [cinemas, setCinemas] = useState([]);
  const [showNoCinemasPopup, setShowNoCinemasPopup] = useState(false);
  const [showReviewErrorPopup, setShowReviewErrorPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTierModal, setShowTierModal] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState(null);

  // Using API key from environment variables via config
  const API_KEY = getRandomImdbKey();

  const mockCinemas = [
    { id: 1, name: "Cinepolis: Ahmedabad", location: "Ahmedabad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScftfux7rQxwUP2DBz4KBaVNfrA9XV8KwVZw&s", rating: 4.5 },
    { id: 2, name: "PVR: Acropolis Mall", location: "Ahmedabad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyQfRmg8ZZsnTHji5iGTx8auKhyCf11DxAXQ&s", rating: 4.3 },
    { id: 3, name: "INOX: Gujarat Mall", location: "Ahmedabad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_lU0LgKU_NtPzW-y3Vx1wbKbw4j2ARAVAYQ&s", rating: 4.2 },
    { id: 4, name: "PVR: Himalaya Mall", location: "Ahmedabad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyn34cA_GFX0WlnsDqPgL3ri5xNGmN5zfEhA&s", rating: 4.0 },
    { id: 5, name: "PVR INOX: Shyamal Crossroad", location: "Ahmedabad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRNanJ3TvXbUX8_gutptSD5oBN0tG-yjfWiUHe3sLOiosbhSq3mQVRPB1Rj99ABQHrG8U&usqp=CAU", rating: 4.1 },
    { id: 6, name: "PVR PLAZA: Connaught Place", location: "Delhi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-z4RWe9lh1pYmEJHFpodS48rRRACHaYcnRgcILFSjnGEVisf0031BpIOvVpa5f2Tsrc&usqp=CAU", rating: 4.6 },
    { id: 7, name: "INOX: Nehru Place", location: "Delhi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjTje-9Tge0e660lWZktoukfwN3Hm4GPbpYa-zLQSSRwRinzK50eQoBXg0KUO48sj9yo&usqp=CAU", rating: 4.4 },
    { id: 8, name: "Cinepolis: DLF Mall", location: "Delhi", image: "https://www.dlfavenue.com/img/entertainment/Untitled-1.jpg", rating: 4.3 },
    { id: 9, name: "PVR: Select Citywalk", location: "Delhi", image: "https://i.ytimg.com/vi/KvUDXDhEVUY/sddefault.jpg", rating: 4.7 },
    { id: 10, name: "INOX: Janakpuri", location: "Delhi", image: "https://images.jdmagicbox.com/v2/delhi/41/011p101941/catalogue/inox-cinemas-janakpuri-district-centre-delhi-cinema-halls-y8ra0-250.jpg", rating: 4.2 },
    { id: 11, name: "PVR: Phoenix Mills", location: "Mumbai", image: "https://images.jdmagicbox.com/v2/comp/mumbai/q2/022pxx22.xx22.120407110941.w2q2/catalog/pvr-cinemas-phoenix-marketcity-mall-kurla-west-mumbai-multiplex-cinema-halls-9m33q-250.jpg", rating: 4.6 },
    { id: 12, name: "INOX: R-City Mall", location: "Mumbai", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/3b/e9/4a/img-20180303-100011-largejpg.jpg?w=1200&h=1200&s=1", rating: 4.3 },
    { id: 13, name: "Cinepolis: Viviana Mall", location: "Mumbai", image: "https://media-cdn.tripadvisor.com/media/photo-s/0f/77/66/02/viviana-mall-cinepolis.jpg", rating: 4.5 },
    { id: 14, name: "PVR: Oberoi Mall", location: "Mumbai", image: "https://fastly.4sqi.net/img/general/600x600/22366830_vnSjqvk9hxbFLBYvDWrrdgvdlyA-fNi2JZIQ9rtTXiY.jpg", rating: 4.4 },
    { id: 15, name: "INOX: Metro Junction", location: "Mumbai", image: "https://i.ytimg.com/vi/0B41fhSKvFg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBYIefEp1ZH7Enzen0oUfStETxuOg", rating: 4.2 },
    { id: 16, name: "PVR: Orion Mall", location: "Bangalore", image: "https://cdn2.advanceinfotech.org/bharatdirectory.in/1200x675/business/7017/pvr-orion-1-1730971268.webp", rating: 4.6 },
    { id: 17, name: "INOX: Forum Mall", location: "Bangalore", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdx-8Lc9OOf_cb-rhpzbY_7RIIpm75pRsZ3-tGBrll1j_-sJJ4OzAfW__odvnVpv9JzUo&usqp=CAU", rating: 4.3 },
    { id: 18, name: "Cinepolis: Royal Meenakshi", location: "Bangalore", image: "https://www.cityairnews.com/uploads/images/image_750x_5e60eefe9d082.jpg", rating: 4.4 },
    { id: 19, name: "PVR: VR Bengaluru", location: "Bangalore", image: "https://images.jdmagicbox.com/v2/comp/bangalore/m3/080pxx80.xx80.151228105412.p3m3/catalogue/pvr-cinemas-gold-vr-mall-mahadevapura-bangalore-cinema-halls-102mqy9.jpg", rating: 4.7 },
    { id: 20, name: "INOX: Garuda Mall", location: "Bangalore", image: "https://www.mappls.com/place/KA7ANE_1677070289605_0.png", rating: 4.3 },
    { id: 21, name: "Cinepolis: Express Avenue", location: "Chennai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQndzzYZctfgkSp6id70hX_QShFVOYDYO_OaZKtpA7yRxEOFmsV8D6Asc0ebbBmx_2f0dI&usqp=CAU", rating: 4.5 },
    { id: 22, name: "PVR: Ampa Skywalk", location: "Chennai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF0tsHQw7TjqluGQAQtyMv_dsQxuhqXFitnrmLjwnsI8qiRgOqzVtrwukRaoq1FOWZZyI&usqp=CAU", rating: 4.3 },
    { id: 23, name: "INOX: Chennai Citi Centre", location: "Chennai", image: "https://www.holidify.com/images/cmsuploads/compressed/inox-cinemas-interior-chennai_20180402100709.png", rating: 4.2 },
    { id: 24, name: "PVR: VR Chennai", location: "Chennai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDZ5m_EGR1AbTc6dUv48kr0D3h-yEsp-w5MMhTblT2gJChBKZg3NSyPubbnslA5GgKwUs&usqp=CAU", rating: 4.6 },
    { id: 25, name: "INOX: The Marina Mall", location: "Chennai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKD03qyOLf562f4GM5hzo-HTKS4kn2_rsca4b1IU1rh4To2j-0q8ERbc32PjriYE1_6Ms&usqp=CAU", rating: 4.3 },
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
          const formattedMovie = {
            ...data,
            imdbRating: data.imdbRating === "N/A" ? "Not Rated" : `${data.imdbRating}/10`,
            Ratings: data.Ratings || []
          };
          setMovie(formattedMovie);
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

    if (selectedLocation) {
      const filteredCinemas = mockCinemas.filter(cinema => 
        cinema.location.toLowerCase() === selectedLocation.toLowerCase()
      );
      setCinemas(filteredCinemas);
      if (filteredCinemas.length === 0) {
        setShowNoCinemasPopup(true);
      }
    } else {
      setCinemas(mockCinemas);
    }

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [id, API_KEY, selectedLocation]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() === "" || newRating === 0) {
      setShowReviewErrorPopup(true);
      return;
    }
    const newReviewObj = {
      id: reviews.length + 1,
      text: newReview,
      user: isLoggedIn ? "You" : "Anonymous",
      rating: newRating,
    };
    setReviews([...reviews, newReviewObj]);
    setNewReview("");
    setNewRating(0);
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleBookTicket = (cinema) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setSelectedCinema(cinema);
    setShowTierModal(true);
  };

  const handleTierSelect = (tier) => {
    const prices = {
      Standard: 200,
      Premium: 350,
      VIP: 500,
    };
    navigate(`/booking/${selectedCinema.id}`, {
      state: { 
        cinema: selectedCinema,
        movie: movie,
        tier,
        ticketPrice: prices[tier]
      }
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="not-found">Movie not found!</div>;

  return (
    <div className="movie-details-container">
      {/* Movie Info Section */}
      <div className="movie-info">
        {selectedLocation && (
          <div className="location-header">
            <MapPin size={24} className="map-icon" />
            <h3>{selectedLocation}</h3>
          </div>
        )}
        
        <div className="movie-details">
          <div className="movie-poster">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
              alt={movie.Title}
              className="poster-img"
            />
          </div>
          
          <div className="movie-text">
            <h1>{movie.Title}</h1>
            
            <div className="rating-release">
              <span className="rating">
                <Star size={20} className="star-icon" />
                {movie.imdbRating}
              </span>
              <span className="release">
                <Calendar size={20} className="calendar-icon" />
                {movie.Released || "TBD"}
              </span>
            </div>
            
            <div className="movie-meta">
              <p><strong>Genre:</strong> {movie.Genre || "N/A"}</p>
              <p><strong>Runtime:</strong> {movie.Runtime || "N/A"}</p>
              <p><strong>Director:</strong> {movie.Director || "N/A"}</p>
              <p><strong>Cast:</strong> {movie.Actors || "N/A"}</p>
            </div>
            
            <div className="movie-plot">
              <h3>Plot</h3>
              <p>{movie.Plot || "No plot available."}</p>
            </div>
            
            {movie.Ratings.length > 0 && (
              <div className="ratings">
                <h3>Ratings</h3>
                <ul>
                  {movie.Ratings.map((rating, index) => (
                    <li key={index}>
                      <strong>{rating.Source}:</strong> {rating.Value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cinemas Section - 5 cards per row */}
      <div className="cinemas-section">
        <h2>Cinemas in {selectedLocation || "All Locations"}</h2>
        
        <div className="cinemas-grid">
          {cinemas.slice(0, 5).map((cinema) => (
            <div key={cinema.id} className="cinema-card">
              <div className="card-image-container">
                <img src={cinema.image} alt={cinema.name} />
                <div className="rating-badge">
                  <Star size={14} fill="#f8c644" />
                  <span>{cinema.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="card-content">
                <h3>{cinema.name}</h3>
                <p className="location">{cinema.location}</p>
                <button 
                  className="book-now-btn"
                  onClick={() => handleBookTicket(cinema)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>User Reviews</h2>
        
        <form onSubmit={handleReviewSubmit} className="review-form">
          <textarea
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            disabled={!isLoggedIn}
          />
          
          <div className="rating-input">
            <label>Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={newRating >= star ? "star-filled" : "star-empty"}
                onClick={() => isLoggedIn && setNewRating(star)}
              />
            ))}
          </div>
          
          <button 
            type="submit" 
            disabled={!isLoggedIn}
          >
            {isLoggedIn ? "Submit Review" : "Login to Review"}
          </button>
        </form>
        
        {reviews.length > 0 ? (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < review.rating ? "star-filled" : "star-empty"}
                    />
                  ))}
                </div>
                <p className="review-text">{review.text}</p>
                <p className="review-user">- {review.user}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Modals */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
        className="login-modal"
      >
        <Modal.Body className="login-content">
          <User size={60} className="login-icon" />
          <h2>Please Log In</h2>
          <p>You need to login to book tickets or submit reviews.</p>
          <button onClick={handleLogin} className="login-btn">
            Log In
          </button>
        </Modal.Body>
      </Modal>

      <Modal
        show={showTierModal}
        onHide={() => setShowTierModal(false)}
        centered
        className="tier-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Ticket Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tier-options">
            <div 
              className="tier-card"
              onClick={() => handleTierSelect("Standard")}
            >
              <h3>Standard</h3>
              <p className="price">₹200</p>
              <p>Regular seating with standard view</p>
            </div>
            
            <div 
              className="tier-card"
              onClick={() => handleTierSelect("Premium")}
            >
              <h3>Premium</h3>
              <p className="price">₹350</p>
              <p>Comfortable seating with better view</p>
            </div>
            
            <div 
              className="tier-card"
              onClick={() => handleTierSelect("VIP")}
            >
              <h3>VIP</h3>
              <p className="price">₹500</p>
              <p>Premium seating with best view and amenities</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTierModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showNoCinemasPopup}
        onHide={() => setShowNoCinemasPopup(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>No Cinemas Available</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sorry, we couldn't find any cinemas showing this movie in {selectedLocation}.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowNoCinemasPopup(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showReviewErrorPopup}
        onHide={() => setShowReviewErrorPopup(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Review Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please provide both a review text and rating before submitting.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowReviewErrorPopup(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieDetails;