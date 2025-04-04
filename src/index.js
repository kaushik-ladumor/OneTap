import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Navbar from "./Leading_page/navbar";
import Footer from "./Leading_page/footer";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";

// Importing Pages
import Home from "./Leading_page/Home/home";
import Food from "./Leading_page/Food/food";
import FoodDetails from "./Leading_page/Food/FoodDetails";
import PaymentReceipt from "./Leading_page/Food/PaymentReceipt";

import Transport from "./Leading_page/Transport/transport";
import Booking from "./Leading_page/Transport/Booking";
import Payment from "./Leading_page/Transport/payment";
import Receipt from "./Leading_page/Transport/Receipt";
import BookingHistory from "./Leading_page/Transport/BookingHistory";

import Movies from "./Leading_page/Movies/movies";
import MovieDetails from "./Leading_page/Movies/MovieDetails";
import BookingDetails from "./Leading_page/Movies/BookingDetails";

import Login from "./Leading_page/Login/login";
import Signup from "./Leading_page/SignUp/signup";
import AboutUs from "./Leading_page/Company/aboutUs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Protected Routes - Require Login */}
          <Route path="/food" element={<ProtectedRoute element={<Food />} />} />
          <Route path="/food/:id" element={<ProtectedRoute element={<FoodDetails />} />} />
          <Route path="/payment-receipt/:id" element={<ProtectedRoute element={<PaymentReceipt />} />} />

          <Route path="/transport" element={<ProtectedRoute element={<Transport />} />} />
          <Route path="/booking" element={<ProtectedRoute element={<Booking />} />} />
          <Route path="/payment" element={<ProtectedRoute element={<Payment />} />} />
          <Route path="/receipt" element={<ProtectedRoute element={<Receipt />} />} />
          <Route path="/history" element={<ProtectedRoute element={<BookingHistory />} />} />

          <Route path="/movies" element={<ProtectedRoute element={<Movies />} />} />
          <Route path="/movies/:id" element={<ProtectedRoute element={<MovieDetails />} />} />
          <Route path="/booking/:id" element={<ProtectedRoute element={<BookingDetails />} />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/aboutUs" element={<AboutUs />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);