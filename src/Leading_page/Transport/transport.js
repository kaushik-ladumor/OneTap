import React, { useState } from "react";
import { FaMapMarkerAlt, FaFlagCheckered } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/transport.css"; // Ensure this path matches your project structure

function Transport() {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [pickupInput, setPickupInput] = useState("");
  const [dropInput, setDropInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const fetchSuggestions = async (query, type) => {
    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1Ijoia2F1c2hpazA0IiwiYSI6ImNtNHp2bmN4bTE4dDYyanNleXY0bDFxYm0ifQ.76a6VrKOTmEviMRsZ9vlOA&autocomplete=true&country=IN`
        );
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          type === "pickup"
            ? setPickupSuggestions(data.features)
            : setDropSuggestions(data.features);
        } else {
          type === "pickup" ? setPickupSuggestions([]) : setDropSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        type === "pickup" ? setPickupSuggestions([]) : setDropSuggestions([]);
      }
    } else {
      type === "pickup" ? setPickupSuggestions([]) : setDropSuggestions([]);
    }
  };

  const handleLocationSelect = (location, type) => {
    const locationName = location.place_name;
    if (type === "pickup") {
      setPickupLocation(location);
      setPickupInput(locationName);
      setPickupSuggestions([]);
    } else {
      setDropLocation(location);
      setDropInput(locationName);
      setDropSuggestions([]);
    }
  };

  const handleBookRide = () => {
    if (pickupLocation && dropLocation) {
      navigate("/booking", {
        state: {
          pickupLocation,
          dropLocation,
        },
      });
    } else {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="transport-page">
      <div className="transport-card">
        <h1 className="transport-title">Book Your Ride</h1>
        <form className="transport-form">
          <div className="input-container">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              placeholder="Enter Pickup Location"
              value={pickupInput}
              onChange={(e) => {
                setPickupInput(e.target.value);
                fetchSuggestions(e.target.value, "pickup");
              }}
            />
            {pickupSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {pickupSuggestions.map((s, i) => (
                  <li key={i} onClick={() => handleLocationSelect(s, "pickup")}>
                    {s.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="input-container">
            <FaFlagCheckered className="input-icon" />
            <input
              type="text"
              placeholder="Enter Drop Location"
              value={dropInput}
              onChange={(e) => {
                setDropInput(e.target.value);
                fetchSuggestions(e.target.value, "drop");
              }}
            />
            {dropSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {dropSuggestions.map((s, i) => (
                  <li key={i} onClick={() => handleLocationSelect(s, "drop")}>
                    {s.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="button" className="cta-button" onClick={handleBookRide}>
            Book Ride
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Please Select Both Locations</h2>
            <p>You need to select both Pickup and Drop locations to proceed.</p>
            <button className="cta-button" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="services-container">
        <h1>Our Services</h1>
        <div className="services">
          <div className="service">
            <span className="icon">🚲</span>
            <h2>Bike</h2>
            <p>Affordable and quick rides for short distances.</p>
          </div>
          <div className="service">
            <span className="icon">🛺</span>
            <h2>Auto</h2>
            <p>Comfortable and economical for city travel.</p>
          </div>
          <div className="service">
            <span className="icon">🚗</span>
            <h2>Car</h2>
            <p>Premium rides for longer and enjoyable journeys.</p>
          </div>
        </div>
      </div>

      <div className="quickride-container">
        <div className="section">
          <h2>Fast Rides, Great Prices</h2>
          <p>
            At QuickRide, we guarantee speedy pickups and the best rates for every journey.
          </p>
          <button className="cta-button">Book Now →</button>
        </div>
        <div className="section">
          <h2>Your Safety Matters</h2>
          <p>
            Your safety is our top priority. We ensure every ride is secure and comfortable.
          </p>
          <button className="cta-button">Learn More →</button>
        </div>
        <div className="section">
          <h2>Earn on Your Schedule</h2>
          <p>
            Become a QuickRide partner and enjoy flexible hours with high earnings potential.
          </p>
          <button className="cta-button">Join Us →</button>
        </div>
      </div>
    </div>
  );
}

export default Transport;