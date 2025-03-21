import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light" // Changed to navbar-light
      style={{
        background: "#f8f9fa", // Light background color
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          OneTap
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/food"
                style={({ isActive }) => ({
                  fontSize: "1.1rem",
                  color: isActive ? "#6a11cb" : "#333", // Active link color
                  fontWeight: isActive ? "bold" : "normal", // Active link bold
                })}
              >
                Food
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/transport"
                style={({ isActive }) => ({
                  fontSize: "1.1rem",
                  color: isActive ? "#6a11cb" : "#333", // Active link color
                  fontWeight: isActive ? "bold" : "normal", // Active link bold
                })}
              >
                Transport
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/movies"
                style={({ isActive }) => ({
                  fontSize: "1.1rem",
                  color: isActive ? "#6a11cb" : "#333", // Active link color
                  fontWeight: isActive ? "bold" : "normal", // Active link bold
                })}
              >
                Movies
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: "1.1rem", color: "#333" }}
              >
                Account
              </NavLink>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
                style={{
                  background: "#ffffff", // White background for dropdown
                  border: "none",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                }}
              >
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/login"
                    style={({ isActive }) => ({
                      fontSize: "1rem",
                      color: isActive ? "#6a11cb" : "#333", // Active link color
                      fontWeight: isActive ? "bold" : "normal", // Active link bold
                    })}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/signup"
                    style={({ isActive }) => ({
                      fontSize: "1rem",
                      color: isActive ? "#6a11cb" : "#333", // Active link color
                      fontWeight: isActive ? "bold" : "normal", // Active link bold
                    })}
                  >
                    Signup
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;