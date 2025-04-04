import React from 'react';
import { FaLinkedin, FaUtensils, FaCar, FaFilm } from 'react-icons/fa';
import '../../styles/AboutUs.css';

const AboutUs = () => {
    return (
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Redefining Modern Convenience
            </h1>
            <p className="hero-subtitle">Where innovation meets impeccable service</p>
          </div>
        </section>

        {/* Services Section */}
        <section className="about-services">
          <div className="section-header">
            <h2 className="section-title">Premium Services</h2>
            <p className="section-description">Curated experiences for discerning clients</p>
          </div>

          <div className="service-cards">
            {/* Food Service */}
            <div className="service-card">
              <div className="card-icon">
                <FaUtensils />
              </div>
              <h3>Gourmet Delivery</h3>
              <p>Restaurant-quality meals delivered with precision</p>
              <ul className="feature-list">
                <li>150+ premium restaurant partners</li>
                <li>Temperature-controlled packaging</li>
                <li>35-minute delivery guarantee</li>
              </ul>
            </div>

            {/* Transport Service */}
            <div className="service-card">
              <div className="card-icon">
                <FaCar />
              </div>
              <h3>Elite Transport</h3>
              <p>Premium mobility with executive service</p>
              <ul className="feature-list">
                <li>Luxury vehicle fleet</li>
                <li>Average 2.5 minute pickup time</li>
                <li>24/7 professional chauffeurs</li>
              </ul>
            </div>

            {/* Entertainment Service */}
            <div className="service-card">
              <div className="card-icon">
                <FaFilm />
              </div>
              <h3>Exclusive Events</h3>
              <p>Curated entertainment experiences</p>
              <ul className="feature-list">
                <li>VIP access to sold-out events</li>
                <li>Backstage meet & greet packages</li>
                <li>4K streaming platform</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-team">
          <div className="section-header">
            <h2 className="section-title">Executive Team</h2>
            <p className="section-description">The visionaries shaping your experience</p>
          </div>

          <div className="team-grid">
            {/* CEO */}
            <div className="team-member">
              <div className="member-image" style={{backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnCwNH4Ch0iV5GbcycFuso8r4igYeM96TK4Q&s')"}}></div>
              <div className="member-info">
                <h3>Meet Siddhapara</h3>
                <p className="member-title">Founder & CEO</p>
                <div className="social-link">
                  <a href="https://www.linkedin.com/in/meet-siddhapara-57b686289/"><FaLinkedin /></a>
                </div>
                <p className="member-bio">
                  Former tech executive with 15 years experience building customer-centric platforms.
                </p>
              </div>
            </div>

            {/* CTO */}
            <div className="team-member">
              <div className="member-image" style={{backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnCwNH4Ch0iV5GbcycFuso8r4igYeM96TK4Q&s')"}}></div>
              <div className="member-info">
                <h3>Harsh Ravrani</h3>
                <p className="member-title">Chief Technology Officer</p>
                <div className="social-link">
                  <a href="https://www.linkedin.com/in/harsh-ravrani-78b242251/"><FaLinkedin /></a>
                </div>
                <p className="member-bio">
                  AI and platform architecture specialist leading our engineering team.
                </p>
              </div>
            </div>

            {/* Operations */}
            <div className="team-member">
              <div className="member-image" style={{backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnCwNH4Ch0iV5GbcycFuso8r4igYeM96TK4Q&s')"}}></div>
              <div className="member-info">
                <h3>Kaushik Ladumor</h3>
                <p className="member-title">Head of Operations</p>
                <div className="social-link">
                  <a href="https://www.linkedin.com/in/kaushik-ladumor-3a7b18290/"><FaLinkedin /></a>
                </div>
                <p className="member-bio">
                  Logistics expert who built our nationwide partner network.
                </p>
              </div>
            </div>

            {/* CXO */}
            <div className="team-member">
              <div className="member-image" style={{backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnCwNH4Ch0iV5GbcycFuso8r4igYeM96TK4Q&s')"}}></div>
              <div className="member-info">
                <h3>Arjun Kapuriya</h3>
                <p className="member-title">Chief Experience Officer</p>
                <div className="social-link">
                  <a href="https://www.linkedin.com/in/arjun-kapuriya-27a8b5258/"><FaLinkedin /></a>
                </div>
                <p className="member-bio">
                  Customer experience innovator with background in behavioral psychology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="about-stats">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">250+</div>
              <div className="stat-label">Premium Partners</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">Cities</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Service</div>
            </div>
          </div>
        </section>
      </div>
    );
};

export default AboutUs;