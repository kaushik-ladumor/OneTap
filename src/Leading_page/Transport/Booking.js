import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Booking.css";

mapboxgl.accessToken = "pk.eyJ1Ijoia2F1c2hpazA0IiwiYSI6ImNtNHp2bmN4bTE4dDYyanNleXY0bDFxYm0ifQ.76a6VrKOTmEviMRsZ9vlOA";

const baseFare = 10; // ₹10 per km

function Booking() {
  const mapContainer = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { pickupLocation, dropLocation } = location.state || {};
  const [distance, setDistance] = useState(null);
  const [prices, setPrices] = useState({
    bike: "₹ --",
    auto: "₹ --",
    carEconomy: "₹ --",
  });
  const [selectedService, setSelectedService] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); // Dynamic message for popup

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (!mapContainer.current || !pickupLocation || !dropLocation) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: pickupLocation.geometry.coordinates,
      zoom: 13,
    });

    mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right");

    new mapboxgl.Marker({ color: "#34c759" })
      .setLngLat(pickupLocation.geometry.coordinates)
      .addTo(mapInstance);
    new mapboxgl.Marker({ color: "#ff3b30" })
      .setLngLat(dropLocation.geometry.coordinates)
      .addTo(mapInstance);

    const bounds = new mapboxgl.LngLatBounds()
      .extend(pickupLocation.geometry.coordinates)
      .extend(dropLocation.geometry.coordinates);

    const getRoute = async () => {
      try {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLocation.geometry.coordinates[0]},${pickupLocation.geometry.coordinates[1]};${dropLocation.geometry.coordinates[0]},${dropLocation.geometry.coordinates[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
        const query = await fetch(url, { method: "GET" });
        if (!query.ok) throw new Error(`HTTP error! Status: ${query.status}`);
        const json = await query.json();
        const route = json.routes[0].geometry;

        mapInstance.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: route,
            },
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3b82f6",
            "line-width": 6,
            "line-opacity": 0.9,
          },
        });

        route.coordinates.forEach(coord => {
          bounds.extend(coord);
        });

        mapInstance.fitBounds(bounds, { padding: 60, duration: 1000 });

        const routeDistance = json.routes[0].distance / 1000;
        setDistance(routeDistance.toFixed(2));

        setPrices({
          bike: `₹ ${Math.round(routeDistance * baseFare * 0.8)} - ₹ ${Math.round(routeDistance * baseFare * 1.0)}`,
          auto: `₹ ${Math.round(routeDistance * baseFare * 1.1)} - ₹ ${Math.round(routeDistance * baseFare * 1.3)}`,
          carEconomy: `₹ ${Math.round(routeDistance * baseFare * 1.5)} - ₹ ${Math.round(routeDistance * baseFare * 1.8)}`,
        });

        if (routeDistance <= 15) {
          setAvailableServices(["bike", "auto", "carEconomy"]);
        } else if (routeDistance > 15 && routeDistance <= 50) {
          setAvailableServices(["auto", "carEconomy"]);
        } else if (routeDistance > 50 && routeDistance <= 100) {
          setAvailableServices(["carEconomy"]);
        } else {
          setAvailableServices([]);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
        setDistance("Error calculating distance");
        setPrices({ bike: "₹ --", auto: "₹ --", carEconomy: "₹ --" });
        setAvailableServices([]);
      }
    };

    getRoute();

    return () => mapInstance.remove();
  }, [pickupLocation, dropLocation]);

  const handleServiceSelect = (serviceId) => {
    const dist = distance ? parseFloat(distance) : 0;
    if (dist > 100) {
      setPopupMessage("Services are not available for distances greater than 100 km.");
      setShowPopup(true);
    } else if (serviceId === "bike" && dist > 15) {
      setPopupMessage("Bike service is not available for distances greater than 15 km.");
      setShowPopup(true);
    } else if (serviceId === "auto" && dist > 50) {
      setPopupMessage("Auto service is not available for distances greater than 50 km.");
      setShowPopup(true);
    } else if (serviceId === "carEconomy" && dist > 100) {
      setPopupMessage("Car Economy service is not available for distances greater than 100 km.");
      setShowPopup(true);
    } else if (availableServices.includes(serviceId)) {
      setSelectedService(serviceId);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  return (
    <div className="booking-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0 ride-details">
            <div className="location-info animate-slide-in">
              <div className="location-item pickup">
                <span className="dot green" />
                <span className="location-text">{pickupLocation?.place_name}</span>
              </div>
              <div className="location-item drop">
                <span className="dot red" />
                <span className="location-text">{dropLocation?.place_name}</span>
              </div>
              <p className="distance">
                Distance: {distance ? `${distance} km` : "Calculating..."}
              </p>
            </div>
            <div className="col p-0 map-wrapper">
              <div ref={mapContainer} className="map-container animate-fade-in" />
            </div>
            <h3 className="section-title animate-slide-in">Select Service</h3>
            <div className="service-list">
              {[
                { id: "bike", name: "Bike", price: prices.bike, icon: "🚲" },
                { id: "auto", name: "Auto", price: prices.auto, icon: "🛺" },
                { id: "carEconomy", name: "Car Economy", price: prices.carEconomy, icon: "🚗" },
              ].map((service, index) => (
                <div
                  key={service.id}
                  className={`service-option animate-slide-up ${selectedService === service.id ? "selected" : ""} ${
                    !availableServices.includes(service.id) ? "disabled" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleServiceSelect(service.id)}
                  data-bs-toggle={distance && parseFloat(distance) <= 100 && availableServices.includes(service.id) ? "modal" : ""}
                  data-bs-target={distance && parseFloat(distance) <= 100 && availableServices.includes(service.id) ? "#serviceModal" : ""}
                >
                  <div className="service-icon">{service.icon}</div>
                  <div className="service-details">
                    <p className="service-name">{service.name}</p>
                    <p className="service-price">{service.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className={`cta-button animate-pulse ${!selectedService || availableServices.length === 0 ? "disabled" : ""}`}
              disabled={!selectedService || availableServices.length === 0}
              onClick={() =>
                navigate("/payment", {
                  state: { pickupLocation, dropLocation, selectedService, price: prices[selectedService] },
                })
              }
            >
              Continue Booking
            </button>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      <div className="modal fade" id="serviceModal" tabIndex="-1" aria-labelledby="serviceModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="serviceModalLabel">Service Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedService && (
                <>
                  <p><strong>Service:</strong> {selectedService}</p>
                  <p><strong>Price:</strong> {prices[selectedService]}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup for Unavailable Service */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Service Not Available</h2>
            <p>{popupMessage}</p>
            <button className="cta-button" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;