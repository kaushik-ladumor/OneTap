import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/Home.css";

function Home() {
    return (
        <div className="home-page">
            {/* Hero Section - Full Width with Overlay */}
            <section className="hero">
                <div className="hero-image">
                    <img 
                        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80" 
                        alt="People enjoying services" 
                    />
                    <div className="hero-overlay">
                        <div className="hero-content">
                            <h1>Your Gateway to Premium Services</h1>
                            <p>Discover the best your city has to offer</p>
                            <Link to="/#" className="cta-button">Explore Now</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services">
                <div className="section-header">
                    <h2>Our Featured Services</h2>
                    <p>Quality experiences at your fingertips</p>
                </div>

                <div className="cards-container">
                    {/* Food Delivery Card */}
                    <div className="service-card">
                        <div className="card-image">
                            <img 
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80" 
                                alt="Gourmet food" 
                            />
                        </div>
                        <div className="card-body">
                            <h3>Food Delivery</h3>
                            <p>Restaurant-quality meals delivered to your door</p>
                            <Link to="/food" className="card-link">
                                Order Food <span>→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Ride Booking Card */}
                    <div className="service-card">
                        <div className="card-image">
                            <img 
                                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" 
                                alt="Ride service" 
                            />
                        </div>
                        <div className="card-body">
                            <h3>Ride Booking</h3>
                            <p>Reliable transportation whenever you need it</p>
                            <Link to="/transport" className="card-link">
                                Book Ride <span>→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Entertainment Card */}
                    <div className="service-card">
                        <div className="card-image">
                            <img 
                                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" 
                                alt="Movie theater" 
                            />
                        </div>
                        <div className="card-body">
                            <h3>Entertainment</h3>
                            <p>Movies, events and unforgettable experiences</p>
                            <Link to="/movies" className="card-link">
                                Find Events <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* App Download Section */}
            <section className="app-section">
                <div className="app-content">
                    <h2>Get the App for Exclusive Features</h2>
                    <p>Download now to access special offers and premium features</p>
                    <div className="download-buttons">
                        <a href="#" className="download-btn">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
                        </a>
                        <a href="#" className="download-btn">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
                        </a>
                    </div>
                </div>
                <div className="app-image">
                    <img 
                        src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" 
                        alt="App interface" 
                    />
                </div>
            </section>
        </div>
    );
}

export default Home;