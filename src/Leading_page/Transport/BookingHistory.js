import React from "react";

function BookingHistory() {
  const bookingHistory = JSON.parse(localStorage.getItem("bookingHistory")) || [];

  const handleCancelTicket = (id) => {
    // Confirm cancellation with the user
    const isConfirmed = window.confirm("Are you sure you want to cancel this ticket?");
    if (!isConfirmed) return;

    // Update the status of the booking to "cancelled"
    const updatedHistory = bookingHistory.map((booking) =>
      booking.id === id ? { ...booking, status: "cancelled" } : booking
    );

    // Save the updated history to localStorage
    localStorage.setItem("bookingHistory", JSON.stringify(updatedHistory));

    // Refresh the page to reflect changes
    window.location.reload();
  };

  return (
    <div className="booking-history-page">
      <h1>Booking History</h1>
      {bookingHistory.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookingHistory.map((booking) => (
            <div key={booking.id} className="booking-item">
              <p>
                <strong>Booking ID:</strong> {booking.id}
              </p>
              <p>
                <strong>Pickup:</strong> {booking.pickupLocation}
              </p>
              <p>
                <strong>Drop:</strong> {booking.dropLocation}
              </p>
              <p>
                <strong>Service:</strong> {booking.service}
              </p>
              <p>
                <strong>Price:</strong> {booking.price}
              </p>
              <p>
                <strong>Payment Method:</strong> {booking.paymentMethod}
              </p>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${booking.status}`}>{booking.status}</span>
              </p>
              {booking.status === "booked" && (
                <button
                  className="cancel-button"
                  onClick={() => handleCancelTicket(booking.id)}
                >
                  Cancel Ticket
                </button>
              )}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingHistory;