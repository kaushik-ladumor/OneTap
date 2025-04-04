import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Booking.css";

mapboxgl.accessToken = "pk.eyJ1Ijoia2F1c2hpazA0IiwiYSI6ImNtNHp2bmN4bTE4dDYyanNleXY0bDFxYm0ifQ.76a6VrKOTmEviMRsZ9vlOA";

const baseFare = 10;

const TIME_ESTIMATIONS = {
  bike: { baseTime: 3, minTime: 10, maxTime: 45 },
  auto: { baseTime: 2.5, minTime: 15, maxTime: 60 },
  carEconomy: { baseTime: 2, minTime: 20, maxTime: 90 }
};

function Booking() {
  const mapContainer = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { pickupLocation, dropLocation } = location.state || {};
  const [distance, setDistance] = useState(null);
  const [prices, setPrices] = useState({ bike: "₹ --", auto: "₹ --", carEconomy: "₹ --" });
  const [estimatedTimes, setEstimatedTimes] = useState({ bike: "-- min", auto: "-- min", carEconomy: "-- min" });
  const [selectedService, setSelectedService] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [map, setMap] = useState(null);

  const calculateTimeEstimate = (serviceId, distance) => {
    if (!distance) return "-- min";
    const { baseTime, minTime, maxTime } = TIME_ESTIMATIONS[serviceId];
    let estimatedTime = Math.round(distance * baseTime);
    estimatedTime = Math.max(minTime, estimatedTime);
    estimatedTime = Math.min(maxTime, estimatedTime);
    const variability = Math.round(estimatedTime * 0.2);
    const minEstimate = Math.max(minTime, estimatedTime - variability);
    const maxEstimate = Math.min(maxTime, estimatedTime + variability);
    return `${minEstimate}-${maxEstimate} min`;
  };

  useEffect(() => {
    if (!mapContainer.current || !pickupLocation || !dropLocation) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11", // Original map style
      center: pickupLocation.geometry.coordinates,
      zoom: 13,
    });

    mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right");
    setMap(mapInstance);

    const getRoute = async () => {
      try {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLocation.geometry.coordinates[0]},${pickupLocation.geometry.coordinates[1]};${dropLocation.geometry.coordinates[0]},${dropLocation.geometry.coordinates[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
        const query = await fetch(url, { method: "GET" });
        if (!query.ok) throw new Error(`HTTP error! Status: ${query.status}`);
        const json = await query.json();
        const route = json.routes[0].geometry;

        // Simple markers
        new mapboxgl.Marker({ color: '#34c759' })
          .setLngLat(pickupLocation.geometry.coordinates)
          .addTo(mapInstance);

        new mapboxgl.Marker({ color: '#ff3b30' })
          .setLngLat(dropLocation.geometry.coordinates)
          .addTo(mapInstance);

        // Blue route
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
            "line-color": "#4285F4",
            "line-width": 4,
            "line-opacity": 0.9,
          },
        });

        const bounds = new mapboxgl.LngLatBounds()
          .extend(pickupLocation.geometry.coordinates)
          .extend(dropLocation.geometry.coordinates);

        route.coordinates.forEach(coord => {
          bounds.extend(coord);
        });

        mapInstance.fitBounds(bounds, {
          padding: { top: 100, bottom: 100, left: 50, right: 50 },
          duration: 1000
        });

        const routeDistance = json.routes[0].distance / 1000;
        setDistance(routeDistance.toFixed(2));

        setPrices({
          bike: `₹ ${Math.round(routeDistance * baseFare * 0.8)} - ₹ ${Math.round(routeDistance * baseFare * 1.0)}`,
          auto: `₹ ${Math.round(routeDistance * baseFare * 1.1)} - ₹ ${Math.round(routeDistance * baseFare * 1.3)}`,
          carEconomy: `₹ ${Math.round(routeDistance * baseFare * 1.5)} - ₹ ${Math.round(routeDistance * baseFare * 1.8)}`,
        });

        setEstimatedTimes({
          bike: calculateTimeEstimate("bike", routeDistance),
          auto: calculateTimeEstimate("auto", routeDistance),
          carEconomy: calculateTimeEstimate("carEconomy", routeDistance)
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
        setEstimatedTimes({ bike: "-- min", auto: "-- min", carEconomy: "-- min" });
        setAvailableServices([]);
      }
    };

    getRoute();

    return () => mapInstance.remove();
  }, [pickupLocation, dropLocation]);

  const handleServiceSelect = (serviceId) => {
    const dist = distance ? parseFloat(distance) : 0;
    if (dist > 100) {
      setPopupMessage("Services are not available for distances greater than 100 km");
      setShowPopup(true);
    } else if (serviceId === "bike" && dist > 15) {
      setPopupMessage("Bike service is only available for distances up to 15 km");
      setShowPopup(true);
    } else if (serviceId === "auto" && dist > 50) {
      setPopupMessage("Auto service is only available for distances up to 50 km");
      setShowPopup(true);
    } else if (availableServices.includes(serviceId)) {
      setSelectedService(serviceId);
    }
  };

  const handleCallDriver = () => {
    setPopupMessage("Connecting you to the nearest available driver...");
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  const getServiceIcon = (serviceId) => {
    switch(serviceId) {
      case 'bike': return '🛵';
      case 'auto': return '🛺';
      case 'carEconomy': return '🚗';
      default: return '🚕';
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container-fluid">
        <div className="booking-row">
          <div className="booking-col-12 booking-p-0 booking-ride-details">
            <div className="booking-location-info booking-animate-slide-in">
              <div className="booking-location-item booking-pickup">
                <span className="booking-dot booking-green" />
                <span className="booking-location-text">{pickupLocation?.place_name}</span>
              </div>
              <div className="booking-location-item booking-drop">
                <span className="booking-dot booking-red" />
                <span className="booking-location-text">{dropLocation?.place_name}</span>
              </div>
              <p className="booking-distance">
                Distance: {distance ? `${distance} km` : "Calculating..."}
              </p>
            </div>
            <div className="booking-col booking-p-0 booking-map-wrapper">
              <div ref={mapContainer} className="booking-map-container booking-animate-fade-in" />
            </div>
            <h3 className="booking-section-title booking-animate-slide-in">Select Service</h3>
            <div className="booking-service-list">
              {["bike", "auto", "carEconomy"].map((service, index) => (
                <div
                  key={service}
                  className={`booking-service-option booking-animate-slide-up ${
                    selectedService === service ? "booking-selected" : ""
                  } ${
                    !availableServices.includes(service) ? "booking-disabled" : ""
                  }`}
                  data-service={service}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="booking-service-icon">
                    {getServiceIcon(service)}
                  </div>
                  <div className="booking-service-details">
                    <p className="booking-service-name">
                      {service === "bike" ? "Bike" : 
                       service === "auto" ? "Auto" : "Car Economy"}
                    </p>
                    <p className="booking-service-price">{prices[service]}</p>
                    <p className="booking-service-time">
                      {estimatedTimes[service]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="booking-main-btn-center">
              <button
                className={`booking-cta-button booking-animate-pulse ${
                  !selectedService || availableServices.length === 0 ? "booking-disabled" : ""
                }`}
                disabled={!selectedService || availableServices.length === 0}
                onClick={() => navigate("/payment", {
                  state: { 
                    pickupLocation, 
                    dropLocation, 
                    selectedService, 
                    price: prices[selectedService],
                    estimatedTime: estimatedTimes[selectedService]
                  },
                })}
              >
                Continue Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="booking-popup-overlay">
          <div className="booking-popup">
            <div className="booking-popup-header">
              <h2>Service Not Available</h2>
            </div>
            <div className="booking-popup-body">
              <p>{popupMessage}</p>
            </div>
            <div className="booking-popup-footer">
              <button className="booking-popup-button" onClick={closePopup}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;