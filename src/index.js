import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import Navbar from "./Leading_page/navbar";
import Footer from "./Leading_page/footer";

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

// Render Application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food" element={<Food />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/payment-receipt/:id" element={<PaymentReceipt />} />

        <Route path="/transport" element={<Transport />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/history" element={<BookingHistory />} />

        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/booking/:id" element={<BookingDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
