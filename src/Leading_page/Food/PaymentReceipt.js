import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle, Clock, MapPin } from "lucide-react";
import "../../styles/PaymentReceipt.css";

const PaymentReceipt = () => {
  const location = useLocation();
  const { items = [], restaurant } = location.state || {};
  const orderId = `#${Math.floor(100000 + Math.random() * 900000)}`;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  if (!restaurant || items.length === 0) {
    return (
      <div className="payment-receipt-error">
        <h3 className="payment-receipt-error-title">No Order Found</h3>
        <Link to="/" className="payment-receipt-home-link">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="payment-receipt-container">
      <div className="payment-receipt-card">
        {/* Header */}
        <div className="payment-receipt-header">
          <CheckCircle size={32} color="#4CAF50" />
          <h1 className="payment-receipt-title">Order Confirmed</h1>
          <p className="payment-receipt-subtitle">Order ID: {orderId}</p>
        </div>

        <div className="payment-receipt-layout">
          {/* Left Column - Order Details */}
          <div className="payment-receipt-left">
            <div className="payment-receipt-restaurant">
              <h2 className="payment-receipt-name">{restaurant}</h2>
              <div className="payment-receipt-delivery">
                <div className="payment-receipt-info-row">
                  <Clock size={18} className="payment-receipt-icon" />
                  <span>30-45 mins • Delivery</span>
                </div>
                <div className="payment-receipt-info-row">
                  <MapPin size={18} className="payment-receipt-icon" />
                  <span>Home Address</span>
                </div>
              </div>
            </div>

            <div className="payment-receipt-items">
              <h3 className="payment-receipt-section-title">Your Order</h3>
              {items.map((item) => (
                <div key={item.id} className="payment-receipt-item">
                  <span className="payment-receipt-item-name">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="payment-receipt-item-price">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="payment-receipt-right">
            <h3 className="payment-receipt-section-title">Payment Summary</h3>
            <div className="payment-receipt-payment">
              <div className="payment-receipt-row">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="payment-receipt-row">
                <span>Delivery Fee</span>
                <span>₹30.00</span>
              </div>
              <div className="payment-receipt-row">
                <span>Taxes</span>
                <span>₹{(total * 0.05).toFixed(2)}</span>
              </div>
              <div className="payment-receipt-row payment-receipt-total">
                <span>Total</span>
                <span>₹{(parseFloat(total) + 30 + (total * 0.05)).toFixed(2)}</span>
              </div>
            </div>

            <div className="payment-receipt-address">
              <h3 className="payment-receipt-section-title">Deliver To</h3>
              <p className="payment-receipt-address-text">123 Main St, City</p>
              <p className="payment-receipt-address-text">Phone: +91 9876543210</p>
            </div>

            <Link to="/" className="payment-receipt-button">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;