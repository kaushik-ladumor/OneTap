import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaFlagCheckered,
  FaMotorcycle,
  FaCar,
  FaTaxi,
  FaBolt,
  FaShieldAlt,
  FaStar,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/transport.css";

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
    <div className="ride-booking-page">
      <div className="booking-hero">
        <div className="booking-card">
          <h1 className="booking-title">Book Your Ride Now</h1>
          <form className="booking-form">
            <div className="location-input-container">
              <FaMapMarkerAlt className="input-icon pickup-icon" />
              <input
                type="text"
                placeholder="Enter pickup location"
                value={pickupInput}
                onChange={(e) => {
                  setPickupInput(e.target.value);
                  fetchSuggestions(e.target.value, "pickup");
                }}
              />
              {pickupSuggestions.length > 0 && (
                <ul className="location-suggestions">
                  {pickupSuggestions.map((s, i) => (
                    <li
                      key={i}
                      onClick={() => handleLocationSelect(s, "pickup")}
                    >
                      {s.place_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="location-input-container">
              <FaFlagCheckered className="input-icon drop-icon" />
              <input
                type="text"
                placeholder="Enter drop location"
                value={dropInput}
                onChange={(e) => {
                  setDropInput(e.target.value);
                  fetchSuggestions(e.target.value, "drop");
                }}
              />
              {dropSuggestions.length > 0 && (
                <ul className="location-suggestions">
                  {dropSuggestions.map((s, i) => (
                    <li key={i} onClick={() => handleLocationSelect(s, "drop")}>
                      {s.place_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="button"
              className="primary-button"
              onClick={handleBookRide}
            >
              Find Rides
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="booking-popup-overlay">
          <div className="booking-popup">
            <h2>Location Required</h2>
            <p>Please select both pickup and drop locations to continue.</p>
            <button className="primary-button" onClick={closePopup}>
              Okay
            </button>
          </div>
        </div>
      )}

      <div className="services-section">
        <div className="section-header">
          <h2>Our Transportation Services</h2>
          <p>Choose the ride that fits your needs</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon bike">
              <span role="img" aria-label="bike" className="vehicle-icon">
                🚲
              </span>
            </div>
            <h3>Bike Taxi</h3>
            <p>Quick and affordable rides for short distances</p>
            <button className="secondary-button">Book Bike</button>
          </div>
          <div className="service-card">
            <div className="service-icon auto">
              <span
                role="img"
                aria-label="auto rickshaw"
                className="vehicle-icon"
              >
                🛺
              </span>
            </div>
            <h3>Auto Rickshaw</h3>
            <p>Comfortable three-wheeler for city commutes</p>
            <button className="secondary-button">Book Auto</button>
          </div>
          <div className="service-card">
            <div className="service-icon car">
              <span role="img" aria-label="car" className="vehicle-icon">
                🚗
              </span>
            </div>
            <h3>Car Ride</h3>
            <p>Premium comfort for longer journeys</p>
            <button className="secondary-button">Book Car</button>
          </div>
        </div>{" "}
      </div>

      <div className="features-section">
        <div className="section-header">
          <h2>Why Choose Us?</h2>
          <p>We make your rides better in every way</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaBolt />
            </div>
            <h3>Quick Pickups</h3>
            <p>Average arrival time under 5 minutes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaMoneyBillWave />
            </div>
            <h3>Best Prices</h3>
            <p>Competitive rates with no surge pricing</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Safe Rides</h3>
            <p>Verified drivers and safety features</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaStar />
            </div>
            <h3>Premium Service</h3>
            <p>Top-rated customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transport;
