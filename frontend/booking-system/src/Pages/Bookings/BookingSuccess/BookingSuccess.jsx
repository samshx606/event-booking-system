import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingSuccess.css";

function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const message = location.state?.message || "Your booking was successful!";

  return (
    <div className="booking-success-container">
      <div className="booking-success-card">
        <h1>Success!</h1>
        <p>{message}</p>
        <button className="btn-primary" onClick={() => navigate("/events")}>
          Back to Events
        </button>
        <button className="btn-secondary" onClick={() => navigate("/users/bookings")}>
          View My Bookings
        </button>
      </div>
    </div>
  );
}

export default BookingSuccess;
