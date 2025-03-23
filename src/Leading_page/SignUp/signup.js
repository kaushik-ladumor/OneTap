import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password } = signupInfo;

    if (!username || !email || !password) {
      return toast.error("Username, Email, and Password are required");
    }

    try {
      const url = "http://localhost:5000/auth/signup";
      console.log("Sending request to:", url, signupInfo); // Debugging

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      console.log(" Response received:", result); // Debugging

      if (response.ok) {
        toast.success("Signup Successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(result.message || "Signup failed, please try again.");
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      toast.error("Server error, please try again later.");
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Your Username"
            name="username"
            value={signupInfo.username}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={signupInfo.email}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={signupInfo.password}
            onChange={handleChange}
            required
          />
          <br />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;