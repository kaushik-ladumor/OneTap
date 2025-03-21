import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./Leading_page/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Food from "./Leading_page/Food/food";
import Home from "./Leading_page/Home/home";
import Footer from "./Leading_page/footer";
import Transport from "./Leading_page/Transport/transport";
import Movies from "./Leading_page/Movies/movies";
import Login from "./Leading_page/Login/login";
import Signup from "./Leading_page/SignUp/signup";
import Booking from "./Leading_page/Transport/Booking"; // Import the Booking component
import Payment from "./Leading_page/Transport/payment";
import Receipt from "./Leading_page/Transport/Receipt";
import BookingHistory from "./Leading_page/Transport/BookingHistory";
import MovieDetails from "./Leading_page/Movies/MovieDetails";
import FoodDetails from "./Leading_page/Food/FoodDetails";
import PaymentReceipt from "./Leading_page/Food/PaymentReceipt";
import BookingDetails from "./Leading_page/Movies/BookingDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/food" element={<Food />} />
      <Route path="/transport" element={<Transport />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/booking" element={<Booking />} /> {/* Add the Booking route */}
      <Route path="/payment" element={<Payment />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/history" element={<BookingHistory />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/food/:id" element={<FoodDetails />} />
      <Route path="/payment-receipt/:id" element={<PaymentReceipt />} />
      <Route path="/booking/:id" element={<BookingDetails />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);