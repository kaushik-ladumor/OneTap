import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/payment.css"; // Import the updated CSS file

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickupLocation, dropLocation, selectedService, price } = location.state || {};
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showBookRideButton, setShowBookRideButton] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
  });

  // Calculate fixed price from the price range (e.g., "₹ 54 - ₹ 63" -> "₹ 58")
  const fixedPrice = price
    ? (() => {
        // Remove the currency symbol and split the price range
        const priceRange = price.replace(/[^0-9 -]/g, "").trim();
        const [min, max] = priceRange.split("-").map((val) => parseInt(val.trim(), 10));

        // Calculate the average price
        if (!isNaN(min) && !isNaN(max)) {
          const average = Math.round((min + max) / 2);
          return `₹ ${average}`;
        } else {
          return `₹ --`;
        }
      })()
    : "₹ --";

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setShowBookRideButton(true);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
    if (selectedPaymentMethod === "Card") {
      setShowBookRideButton(
        cardDetails.cardNumber && cardDetails.expiry && cardDetails.cvv && cardDetails.cardHolder
      );
    }
  };

  const handleBookRide = () => {
    const receipt = {
      id: Date.now(),
      pickupLocation: pickupLocation?.place_name,
      dropLocation: dropLocation?.place_name,
      service: selectedService,
      price: fixedPrice, // Use fixed price in receipt
      paymentMethod: selectedPaymentMethod,
      date: new Date().toLocaleString(),
      status: "booked", // Initial status
    };

    const bookingHistory = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    bookingHistory.push(receipt);
    localStorage.setItem("bookingHistory", JSON.stringify(bookingHistory));

    navigate("/receipt", { state: { receipt } });
  };

  return (
    <div className="payment-page">
      <div className="payment-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0 payment-details">
              <h1 className="page-title animate-slide-in">Payment</h1>
              <div className="booking-details animate-slide-in">
                <h2>Booking Summary</h2>
                <div className="summary-item">
                  <span className="label">Pickup:</span>
                  <span className="value">{pickupLocation?.place_name}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Drop:</span>
                  <span className="value">{dropLocation?.place_name}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Service:</span>
                  <span className="value">{selectedService}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Price:</span>
                  <span className="value">{fixedPrice}</span>
                </div>
              </div>
              <div className="payment-options animate-slide-in">
                <h2>Payment Methods</h2>
                <div className="payment-methods">
                  <div
                    className={`payment-method animate-slide-up ${selectedPaymentMethod === "GPay" ? "selected" : ""}`}
                    onClick={() => handlePaymentMethodSelect("GPay")}
                  >
                    <img src="https://lh3.googleusercontent.com/cL0-sGY6d5KaZFLOYuM_Q7-jjtBMa4kWFH63P_SkulwLOeJ0RlsPSIFreR6K6np2n_Q_JSiZbSYmwGteTPNQ6M07II1bo_S6HJ4yFkE=rw-s0" alt="GPay" />
                    <span>GPay</span>
                  </div>
                  <div
                    className={`payment-method animate-slide-up ${selectedPaymentMethod === "Paytm" ? "selected" : ""}`}
                    onClick={() => handlePaymentMethodSelect("Paytm")}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" alt="Paytm" />
                    <span>Paytm</span>
                  </div>
                  <div
                    className={`payment-method animate-slide-up ${selectedPaymentMethod === "PhonePe" ? "selected" : ""}`}
                    onClick={() => handlePaymentMethodSelect("PhonePe")}
                  >
                    <img src="https://w7.pngwing.com/pngs/345/591/png-transparent-phonepe-hd-logo-thumbnail.png" alt="PhonePe" />
                    <span>PhonePe</span>
                  </div>
                  <div
                    className={`payment-method animate-slide-up ${selectedPaymentMethod === "Cash" ? "selected" : ""}`}
                    onClick={() => handlePaymentMethodSelect("Cash")}
                  >
                    <span className="cash-icon">💵</span>
                    <span>Cash</span>
                  </div>
                  <div
                    className={`payment-method animate-slide-up ${selectedPaymentMethod === "Card" ? "selected" : ""}`}
                    onClick={() => handlePaymentMethodSelect("Card")}
                  >
                    <span className="card-icon">💳</span>
                    <span>Credit/Debit Card</span>
                  </div>
                </div>
                {selectedPaymentMethod === "Card" && (
                  <div className="card-form animate-slide-in">
                    <h3>Card Details</h3>
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiry">Expiry Date</label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardInputChange}
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          maxLength="3"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="cardHolder">Card Holder Name</label>
                      <input
                        type="text"
                        id="cardHolder"
                        name="cardHolder"
                        value={cardDetails.cardHolder}
                        onChange={handleCardInputChange}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}
              </div>
              {showBookRideButton && (
                <button className="cta-button animate-pulse" onClick={handleBookRide}>
                  Book Ride
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;