import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { FiUser, FiLogOut, FiLogIn, FiUserPlus, FiChevronDown, FiMenu } from "react-icons/fi";
import '../styles/Navbar.css'

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    logout();
    navigate("/");
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      
      // Close mobile menu when clicking outside
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-toggle')) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="app-navbar">
      <div className="navbar-container">
        {/* Logo on the left with proper spacing */}
        <NavLink className="navbar-brand" to="/">
          <span className="brand-logo">OneTap</span>
        </NavLink>
        
        {/* Mobile menu toggle button */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Right-aligned navigation with perfect spacing */}
        <div className="navbar-right-section">
          <div className={`main-nav-links ${mobileMenuOpen ? 'show' : ''}`} ref={mobileMenuRef}>
            {["Food", "Transport", "Movies"].map((item) => (
              <NavLink 
                key={item} 
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </NavLink>
            ))}
            
            {/* Account options in mobile menu */}
            <div className="mobile-account-section">
              {isAuthenticated ? (
                <>
                  <div className="mobile-user-profile">
                    <span className="user-avatar mobile">
                      {username.charAt(0).toUpperCase()}
                    </span>
                    <span className="username">{username}</span>
                  </div>
                  <button className="mobile-dropdown-item logout-btn" onClick={handleLogout}>
                    <FiLogOut className="icon" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink 
                    className="mobile-dropdown-item" 
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiLogIn className="icon" />
                    <span>Login</span>
                  </NavLink>
                  <NavLink 
                    className="mobile-dropdown-item signup-btn" 
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiUserPlus className="icon" />
                    <span>Sign Up</span>
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Account dropdown with clean spacing */}
          <div className="account-section" ref={dropdownRef}>
            <button 
              className="account-toggle-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {isAuthenticated ? (
                <div className="user-profile">
                  <span className="user-avatar">
                    {username.charAt(0).toUpperCase()}
                  </span>
                  <span className="username">{username}</span>
                  <FiChevronDown className={`dropdown-icon ${showDropdown ? 'rotate' : ''}`} />
                </div>
              ) : (
                <div className="auth-options">
                  <FiUser className="user-icon" />
                  <span>Account</span>
                  <FiChevronDown className={`dropdown-icon ${showDropdown ? 'rotate' : ''}`} />
                </div>
              )}
            </button>

            {/* Dropdown menu with perfect alignment */}
            {showDropdown && (
              <div className="account-dropdown-menu">
                {isAuthenticated ? (
                  <>
                    <div className="user-profile-card">
                      <span className="user-avatar large">
                        {username.charAt(0).toUpperCase()}
                      </span>
                      <div className="user-details">
                        <span className="user-name">{username}</span>
                        <span className="user-email">user@example.com</span>
                      </div>
                    </div>
                    <button className="dropdown-item logout-btn" onClick={handleLogout}>
                      <FiLogOut className="icon" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink 
                      className="dropdown-item login-item" 
                      to="/login"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiLogIn className="icon" />
                      <span>Login</span>
                    </NavLink>
                    <NavLink 
                      className="dropdown-item signup-btn" 
                      to="/signup"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiUserPlus className="icon" />
                      <span>Sign Up</span>
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;