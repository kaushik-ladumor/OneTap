import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Wallet, Landmark, Smartphone } from "lucide-react";
import { Modal, Button } from "react-bootstrap";
import "../../styles/bookingDetail.css";

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cinema, tier, ticketPrice } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(["A3", "A7", "A12"]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!cinema || !tier || !ticketPrice) navigate("/");
  }, [cinema, tier, ticketPrice, navigate]);

  const handleSeatSelection = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
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

    const totalPrice = selectedSeats.length * ticketPrice;
    const receiptDetails = {
      cinema: cinema.name,
      tier,
      tickets: selectedSeats.length,
      seats: selectedSeats.join(", "),
      totalPrice,
      paymentMethod,
    };
    setReceipt(receiptDetails);
    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    setBookingSuccess(`Booked ${selectedSeats.length} ${tier} ticket(s) for ${cinema.name}! Confirm in 30s.`);
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

  if (!cinema || !tier || !ticketPrice) return null;

  const seats = [
    ["A1", "A2", "A3", "A4", "A5"],
    ["B1", "B2", "B3", "B4", "B5"],
    ["C1", "C2", "C3", "C4", "C5"],
    ["D1", "D2", "D3", "D4", "D5"],
  ];

  return (
    <div className="booking-details-container">
      <div className="booking-info">
        <div className="cinema-info">
          <h1>{cinema.name} - {tier}</h1>
          <img src={cinema.image} alt={cinema.name} className="cinema-poster" />
          <p>{cinema.location}</p>
          <p><strong>Ticket Price:</strong> ₹{ticketPrice}</p>
        </div>

        <div className="booking-layout">
          <div className="seat-section">
            <h2>Select Your Seats</h2>
            <div className="screen-display">Screen</div>
            <div className="seat-grid">
              {seats.map((row, idx) => (
                <div key={idx} className="seat-row">
                  {row.map((seat) => (
                    <button
                      key={seat}
                      onClick={() => handleSeatSelection(seat)}
                      disabled={bookedSeats.includes(seat)}
                      className={`seat ${
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
              <span className="legend-item"><span className="legend-box available"></span> Available</span>
              <span className="legend-item"><span className="legend-box selected"></span> Selected</span>
              <span className="legend-item"><span className="legend-box booked"></span> Booked</span>
            </div>
          </div>

          <div className="payment-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              {["Credit/Debit Card", "UPI", "Net Banking", "Wallet"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`payment-btn ${paymentMethod === method ? "active" : ""}`}
                >
                  {method === "Credit/Debit Card" && <CreditCard size={20} />}
                  {method === "UPI" && <Smartphone size={20} />}
                  {method === "Net Banking" && <Landmark size={20} />}
                  {method === "Wallet" && <Wallet size={20} />}
                  {method}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={handleTicketBooking} className="book-now-btn">
          Book Now
        </button>

        {bookingSuccess && (
          <div className="success-notice">
            <p>{bookingSuccess} ({timer}s)</p>
            {receipt && (
              <div className="receipt-details">
                <h3>Receipt</h3>
                <p><strong style={{color: "#fff"}}>Cinema:</strong> {receipt.cinema}</p>
                <p><strong style={{color: "#fff"}}>Tier:</strong> {receipt.tier}</p>
                <p><strong style={{color: "#fff"}}>Tickets:</strong> {receipt.tickets}</p>
                <p><strong style={{color: "#fff"}}>Seats:</strong> {receipt.seats}</p>
                <p><strong style={{color: "#fff"}}>Total:</strong> ₹{receipt.totalPrice}</p>
                <p><strong style={{color: "#fff"}}>Payment:</strong> {receipt.paymentMethod}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        show={showErrorPopup}
        onHide={() => setShowErrorPopup(false)}
        centered
        className="error-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button className="modal-close-btn" onClick={() => setShowErrorPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingDetails;