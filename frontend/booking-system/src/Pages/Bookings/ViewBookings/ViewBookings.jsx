import React, { useState, useEffect } from "react";
import { getBookingsByUserId } from "../../../APIs/BookingAPI";
import { useAuth } from "../../../Context/AuthContext";
import "./ViewBookings.css";

function ViewBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const data = await getBookingsByUserId(user.id, page, 8);

        setBookings(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, page]);

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  if (!user) return <div>Please log in to view your bookings.</div>;
  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-bookings-container">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="no-bookings">You have no bookings yet.</div>
      ) : (
        <>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Location</th>
                <th>Seats</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.event?.title}</td>
                  <td>{new Date(booking.event?.date).toLocaleString()}</td>
                  <td>{booking.event?.location}</td>
                  <td>{booking.quantity}</td>
                  <td>${booking.event.price?.toFixed(2) * booking.quantity || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={handlePrevPage}
              disabled={page === 0}
              className="pagination-btn"
            >
              <i className="fas fa-chevron-left"></i> Previous
            </button>
            <span className="page-info">
              Page {page + 1} of {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages - 1 || totalPages === 0}
              className="pagination-btn"
            >
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewBookings;
