import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Wallet, Landmark, Smartphone } from "lucide-react";
import { Modal, Button } from "react-bootstrap";
import '../../styles/bookingDetail.css'

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cinema } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(["A3", "A7", "A12"]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false); // For error popups
  const [errorMessage, setErrorMessage] = useState(""); // To store error message

  useEffect(() => {
    if (!cinema) {
      navigate("/");
    }
  }, [cinema, navigate]);

  const handleSeatSelection = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleTicketBooking = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      setErrorMessage("Please select at least one seat.");
      setShowErrorPopup(true);
      return;
    }
    if (!paymentMethod) {
      setErrorMessage("Please select a payment method.");
      setShowErrorPopup(true);
      return;
    }

    const ticketPrice = 210;
    const totalPrice = selectedSeats.length * ticketPrice;
    const receiptDetails = {
      cinema: cinema.name,
      tickets: selectedSeats.length,
      seats: selectedSeats.join(", "),
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
    };
    setReceipt(receiptDetails);
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    setBookingSuccess(`Successfully booked ${selectedSeats.length} ticket(s) for ${cinema.name}! Confirm within 30 seconds.`);
    setTimer(30);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setBookingSuccess(false);
          setReceipt(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setSelectedSeats([]);
    setPaymentMethod("");
  };

  if (!cinema) return null;

  // Seat arrangement in rows (A1-A5, B1-B5, C1-C5, D1-D5)
  const seats = [
    ["A1", "A2", "A3", "A4", "A5"],
    ["B1", "B2", "B3", "B4", "B5"],
    ["C1", "C2", "C3", "C4", "C5"],
    ["D1", "D2", "D3", "D4", "D5"],
  ];

  return (
    <div className="booking-details-container">
      <div className="booking-details-card">
        {/* Cinema Details */}
        <div className="cinema-details">
          <h1>{cinema.name}</h1>
          <img src={cinema.image} alt={cinema.name} className="cinema-image" />
          <p>{cinema.location}</p>
        </div>

        {/* Seat Selection */}
        <div className="seat-selection">
          <h2>Select Seats</h2>
          <div className="screen-label">Screen This Way</div>
          <div className="seats-container">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                {row.map((seat) => (
                  <button
                    key={seat}
                    type="button"
                    onClick={() => handleSeatSelection(seat)}
                    disabled={bookedSeats.includes(seat)}
                    className={`seat-button ${
                      bookedSeats.includes(seat)
                        ? "booked"
                        : selectedSeats.includes(seat)
                        ? "selected"
                        : "available"
                    }`}
                  >
                    {seat}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="seat-legend">
            <div>
              <span className="legend-box available"></span> Available
            </div>
            <div>
              <span className="legend-box selected"></span> Selected
            </div>
            <div>
              <span className="legend-box booked"></span> Booked
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-method">
          <h2>Select Payment Method</h2>
          <div className="payment-options">
            {["Credit/Debit Card", "UPI", "Net Banking", "Wallet"].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`payment-button ${
                  paymentMethod === method ? "selected" : ""
                }`}
              >
                {method === "Credit/Debit Card" && <CreditCard size={24} />}
                {method === "UPI" && <Smartphone size={24} />}
                {method === "Net Banking" && <Landmark size={24} />}
                {method === "Wallet" && <Wallet size={24} />}
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Book Tickets Button */}
        <button
          type="submit"
          onClick={handleTicketBooking}
          className="book-tickets-button"
        >
          Book Tickets
        </button>

        {/* Booking Success Message */}
        {bookingSuccess && (
          <div className="booking-success">
            <p>{bookingSuccess} ({timer}s remaining)</p>
            {receipt && (
              <div className="receipt">
                <h3>Receipt</h3>
                <p>
                  <strong>Cinema:</strong> {receipt.cinema}
                </p>
                <p>
                  <strong>Tickets:</strong> {receipt.tickets}
                </p>
                <p>
                  <strong>Seats:</strong> {receipt.seats}
                </p>
                <p>
                  <strong>Total Price:</strong> ₹{receipt.totalPrice}
                </p>
                <p>
                  <strong>Payment Method:</strong> {receipt.paymentMethod}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Popup */}
      <Modal
        show={showErrorPopup}
        onHide={() => setShowErrorPopup(false)}
        centered
        className="error-popup"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#ff4444" }}>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "16px", color: "#333" }}>{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#ff4444",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => setShowErrorPopup(false)}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#cc0000")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff4444")
            }
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingDetails;