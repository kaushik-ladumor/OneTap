import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickupLocation, dropLocation, selectedService, price } = location.state || {};
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Calculate fixed price
  const fixedPrice = price
    ? (() => {
        const priceRange = price.replace(/[^0-9 -]/g, "").trim();
        const [min, max] = priceRange
          .split("-")
          .map((val) => parseInt(val.trim(), 10));
        return !isNaN(min) && !isNaN(max)
          ? `₹${Math.round((min + max) / 2)}`
          : `₹--`;
      })()
    : "₹--";

  // Validate card details
  const validateCard = () => {
    const errors = {};
    if (cardDetails.cardNumber.length !== 19)
      errors.cardNumber = "Invalid card number";
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry))
      errors.expiry = "Invalid expiry (MM/YY)";
    if (cardDetails.cvv.length !== 3) errors.cvv = "Invalid CVV";
    if (!cardDetails.cardHolder.trim())
      errors.cardHolder = "Card holder name required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    }
    // Format expiry date
    else if (name === "expiry" && value.length === 2 && !value.includes("/")) {
      formattedValue = value + "/";
    }

    setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleBookRide = () => {
    if (selectedPaymentMethod === "Card" && !validateCard()) return;

    const receipt = {
      id: Date.now(),
      pickupLocation: pickupLocation?.place_name,
      dropLocation: dropLocation?.place_name,
      service: selectedService,
      price: fixedPrice,
      paymentMethod: selectedPaymentMethod,
      date: new Date().toLocaleString(),
      status: "booked",
    };

    const bookingHistory =
      JSON.parse(localStorage.getItem("bookingHistory")) || [];
    localStorage.setItem(
      "bookingHistory",
      JSON.stringify([...bookingHistory, receipt])
    );
    navigate("/receipt", { state: { receipt } });
  };

  // Check if booking is ready
  const canBookRide =
    selectedPaymentMethod &&
    (selectedPaymentMethod !== "Card" ||
      (cardDetails.cardNumber.length === 19 &&
        /^\d{2}\/\d{2}$/.test(cardDetails.expiry) &&
        cardDetails.cvv.length === 3 &&
        cardDetails.cardHolder.trim()));

  return (
    <div className="payment-page">
      <div className="payment-header">
        <div className="header-content">
          <h1>Complete Payment</h1>
          <p className="header-subtitle">Secure payment for your ride</p>
        </div>
      </div>

      <div className="payment-container">
        <div className="payment-content">
          {/* Booking Summary */}
          <div className="booking-summary">
            <h2>
              <span className="summary-icon">📋</span> Ride Summary
            </h2>
            <div className="summary-item">
              <span>Pickup:</span>
              <strong>{pickupLocation?.place_name || "Not specified"}</strong>
            </div>
            <div className="summary-item">
              <span>Drop:</span>
              <strong>{dropLocation?.place_name || "Not specified"}</strong>
            </div>
            <div className="summary-item">
              <span>Service:</span>
              <strong>{selectedService || "Not specified"}</strong>
            </div>
            <div className="summary-item price">
              <span>Amount to Pay:</span>
              <strong className="price-value">{fixedPrice}</strong>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <h2>
              <span className="payment-icon">💳</span> Choose Payment Method
            </h2>
            <div className="method-grid">
              {["GPay", "Paytm", "PhonePe", "Cash", "Card"].map((method) => (
                <div
                  key={method}
                  className={`method-option ${selectedPaymentMethod === method ? "selected" : ""}`}
                  onClick={() => handlePaymentMethodSelect(method)}
                >
                  <div className="method-icon">
                    {method === "Cash" ? (
                      <span className="cash-icon">💵</span>
                    ) : method === "Card" ? (
                      <span className="card-icon">💳</span>
                    ) : (
                      <img
                        src={
                          method === "GPay"
                            ? "https://lh3.googleusercontent.com/cL0-sGY6d5KaZFLOYuM_Q7-jjtBMa4kWFH63P_SkulwLOeJ0RlsPSIFreR6K6np2n_Q_JSiZbSYmwGteTPNQ6M07II1bo_S6HJ4yFkE=rw-s0"
                            : method === "Paytm"
                            ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png"
                            : "https://w7.pngwing.com/pngs/345/591/png-transparent-phonepe-hd-logo-thumbnail.png"
                        }
                        alt={method}
                      />
                    )}
                  </div>
                  <span className="method-name">
                    {method === "Card" ? "Credit/Debit Card" : method}
                  </span>
                  {selectedPaymentMethod === method && (
                    <span className="checkmark">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card Form */}
          {selectedPaymentMethod === "Card" && (
            <div className="card-form">
              <h3>
                <span className="card-form-icon">🔒</span> Enter Card Details
              </h3>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={formErrors.cardNumber ? "error-input" : ""}
                />
                {formErrors.cardNumber && (
                  <span className="error">{formErrors.cardNumber}</span>
                )}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleCardInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={formErrors.expiry ? "error-input" : ""}
                  />
                  {formErrors.expiry && (
                    <span className="error">{formErrors.expiry}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <div className="cvv-container">
                    <input
                      type="password"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      placeholder="123"
                      maxLength="3"
                      className={formErrors.cvv ? "error-input" : ""}
                    />
                    <span className="cvv-info">ⓘ</span>
                  </div>
                  {formErrors.cvv && (
                    <span className="error">{formErrors.cvv}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Card Holder Name</label>
                <input
                  type="text"
                  name="cardHolder"
                  value={cardDetails.cardHolder}
                  onChange={handleCardInputChange}
                  placeholder="John Doe"
                  className={formErrors.cardHolder ? "error-input" : ""}
                />
                {formErrors.cardHolder && (
                  <span className="error">{formErrors.cardHolder}</span>
                )}
              </div>
              <div className="security-info">
                <span className="lock-icon">🔒</span>
                <span>Your payment is secure and encrypted</span>
              </div>
            </div>
          )}
        </div>

        {/* Book Ride Button */}
        {canBookRide && (
          <div className="book-button-container">
            <button className="book-button" onClick={handleBookRide}>
              Pay {fixedPrice} & Confirm Ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;