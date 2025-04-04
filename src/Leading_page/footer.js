    import React from "react";
    import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";
    import '..//styles/Footer.css'

    const Footer = () => {
      return (
        <footer className="footer">
          <div className="footer-container">
            {/* Brand Column */}
            <div className="footer-brand">
              <h2 className="footer-logo">One<span>Tap</span></h2>
              <p className="footer-description">
                Your all-in-one lifestyle platform for food, transport, and entertainment.
              </p>
              <div className="social-links">
                <a href="https://www.facebook.com/profile.php?id=100087525163391"><Facebook size={18} /></a>
                <a href="https://x.com/kaushik_ahir04"><Twitter size={18} /></a>
                <a href="https://www.instagram.com/_arjun_kapuriya_/"><Instagram size={18} /></a>
              </div>
            </div>
    
            {/* Links Column 1 */}
            <div className="footer-column">
              <h3 className="footer-heading">Company</h3>
              <ul className="footer-links">
                <li><a href="/aboutUs">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </div>
    
            {/* Links Column 2 */}
            <div className="footer-column">
              <h3 className="footer-heading">Services</h3>
              <ul className="footer-links">
                <li><a href="food">Food Delivery</a></li>
                <li><a href="transport">Transport</a></li>
                <li><a href="movies">Movies</a></li>
              </ul>
            </div>
    
            {/* Contact Column */}
            <div className="footer-column">
              <h3 className="footer-heading">Contact</h3>
              <div className="footer-contact">
                <div className="contact-item">
                  <MapPin size={50} />
                  <span>Ahmedabad University Near Commerce Six Road Ahmedabad - 380009 </span>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <span>+91 98241 81791</span>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <span>kaushik.l@ahduni.edu.in</span>
                </div>
              </div>
            </div>
          </div>
    
          <div className="copyright">
            &copy; {new Date().getFullYear()} OneTap. All rights reserved.
          </div>
        </footer>
      );
    };
    
    export default Footer;