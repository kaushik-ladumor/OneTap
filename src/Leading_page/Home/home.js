import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/Home.css"; // Import the CSS file

function Home() {
    return (
        <div className="home-container">
            <h2 className="home-title animate-slide-in">Explore Our Services</h2>
            
            <div className="services-grid">
                {/* Food Delivery */}
                <div className="service-card animate-slide-up">
                    <Link to="/food">
                        <img 
                            src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1470&auto=format&fit=crop" 
                            className="service-image" 
                            alt="Food Delivery" 
                        />
                    </Link>
                    <div className="service-content">
                        <h3 className="service-title">Food Delivery</h3>
                        <p className="service-description">
                            Order your favorite meals from top restaurants and enjoy fast, reliable delivery.
                        </p>
                    </div>
                </div>

                {/* Ride Booking */}
                <div className="service-card animate-slide-up">
                    <Link to="/transport">
                        <img 
                            src="https://img.freepik.com/premium-vector/delivery-service-app-smartphone-cargo-vans-truck_357257-62.jpg?ga=GA1.1.501001156.1728234445&semt=ais_hybrid" 
                            className="service-image" 
                            alt="Ride Booking" 
                        />
                    </Link>
                    <div className="service-content">
                        <h3 className="service-title">Ride Booking</h3>
                        <p className="service-description">
                            Book a ride quickly and affordably. Choose from a variety of transport options.
                        </p>
                    </div>
                </div>

                {/* Movie Tickets */}
                <div className="service-card animate-slide-up">
                    <Link to="/movies">
                        <img 
                            src="https://img.freepik.com/free-vector/online-movies-entertainment-banner_1419-2246.jpg" 
                            className="service-image" 
                            alt="Movie Tickets" 
                        />
                    </Link>
                    <div className="service-content">
                        <h3 className="service-title">Movie Tickets</h3>
                        <p className="service-description">
                            Book tickets for the latest movies, concerts, and events with ease.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;