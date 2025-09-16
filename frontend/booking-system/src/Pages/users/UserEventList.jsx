import React, { useState, useEffect } from "react";
import { getAllEvents } from "../../APIs/EventAPI";
import { createBooking } from "../../APIs/BookingAPI";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./UserEventList.css";

function UserEventList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getAllEvents(page);
        setEvents(response.content || []);
        setTotalPages(response.totalPages || 0);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page]);

  const handleBookNow = async (eventId) => {
    try {
      const bookingData = {
        eventId: eventId,
        quantity: 1,
      };
      await createBooking(bookingData);
      alert("Booking created successfully!");
      navigate(`/booking-success`, { state: { message: "Booking created successfully!" } });
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to create booking. Please try again.");
    }
  };

  if (!user || user.role !== "USER") {
    return <div>You must be logged in as a user to view events.</div>;
  }

  if (loading && events.length === 0)
    return <div className="user-loading">Loading events...</div>;
  if (error) return <div className="user-error">{error}</div>;

  return (
    <div className="user-event-list-container">
      <h1>Available Events</h1>
<Link to="/users/bookings" className="view-bookings-btn">
                      View Bookings
                    </Link>
      {events.length === 0 ? (
        <div className="no-events">No events available at the moment.</div>
      ) : (
        <div className="user-event-table-container">
          <table className="user-event-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{new Date(event.date).toLocaleString()}</td>
                  <td>{event.location}</td>
                  <td>{event.category}</td>
                  <td>${event.price.toFixed(2)}</td>
                  <td className="user-actions-cell">
                    <button
                      className="book-btn"
                      onClick={() => handleBookNow(event.id)}
                    >
                      Book Now
                    </button>

                    <button
                      className="view-btn-user"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      View Event
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="user-pagination">
              <button
                onClick={() => page > 0 && setPage(page - 1)}
                disabled={page === 0}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="page-info">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => page < totalPages - 1 && setPage(page + 1)}
                disabled={page === totalPages - 1}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserEventList;
