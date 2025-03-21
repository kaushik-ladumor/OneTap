import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-4 w-100" style={{ backgroundColor: "#f8f9fa", color: "#333" }}>
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold">OneTap – A Lifestyle Hub</h4>
            <p>Your go-to platform for food, travel, and entertainment.</p>
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
              <MapPin size={18} />
              <span>123 Lifestyle Street, City, Country</span>
            </div>
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mt-2">
              <Phone size={18} />
              <span>+123 456 7890</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-dark">Home</a></li>
              <li><a href="#" className="text-decoration-none text-dark">About Us</a></li>
              <li><a href="#" className="text-decoration-none text-dark">Services</a></li>
              <li><a href="#" className="text-decoration-none text-dark">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-dark"><Facebook size={24} /></a>
              <a href="#" className="text-dark"><Twitter size={24} /></a>
              <a href="#" className="text-dark"><Instagram size={24} /></a>
              <a href="#" className="text-dark"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4">
          <hr />
          <p className="mb-0">&copy; {new Date().getFullYear()} OneTap. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


