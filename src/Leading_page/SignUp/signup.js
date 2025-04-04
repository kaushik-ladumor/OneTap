import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../AuthContext";
import zxcvbn from "zxcvbn";
import '../../styles/SignUp.css';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });

    if (name === "password") {
      setPasswordStrength(zxcvbn(value).score);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://deploy-mern-app-1-api.vercel.app/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Account created successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(result.message || "Signup failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-page-card">
        <h1 className="signup-page-title">Sign Up</h1>
        <form onSubmit={handleSignup} className="signup-page-form">
          <div className="signup-form-group">
            <input
              type="text"
              name="name"
              value={signupInfo.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="signup-form-input"
              required
            />
          </div>
          
          <div className="signup-form-group">
            <input
              type="email"
              name="email"
              value={signupInfo.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="signup-form-input"
              required
            />
          </div>
          
          <div className="signup-form-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={signupInfo.password}
              onChange={handleChange}
              placeholder="Password"
              className="signup-form-input"
              required
            />
            <button 
              type="button" 
              className="signup-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            
            {signupInfo.password && (
              <div className="signup-password-strength">
                <div className="signup-strength-bar">
                  <div className={`signup-strength-fill strength-${passwordStrength}`} />
                </div>
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="signup-page-btn"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
          
          <div className="signup-page-link">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </form>
      </div>
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Signup;