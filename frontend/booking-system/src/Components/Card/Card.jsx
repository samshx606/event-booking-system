import { useNavigate } from 'react-router-dom';
import './Card.css';
import { createBooking } from '../../APIs/BookingAPI';
import { useAuth } from '../../Context/AuthContext';

function Card({ type, data  }) {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const handleBookNow = async (eventId) => {
    if (!isLoggedIn) {
      alert("Please login to book an event");
      navigate("/login");
      return;
    }
    
    try {
      const bookingData = {
        eventId: eventId,
        quantity: 1,
      };
      await createBooking(bookingData);
      navigate(`/booking-success`, { 
        state: { message: "Booking created successfully!" } 
      });
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to create booking. Please try again.");
    }
  };

  if (type === 'event') {
    return (
      <div className="card event-card" >
        {data.imageUrl && (
          <div className="card-image">
            <img src={data.imageUrl} alt={data.title} />
          </div>
        )}
        <div className="card-content">
          <h3 className="card-title">{data.title}</h3>
          <div className="card-info">
            <p className="card-description">{data.description?.substring(0, 100)}
              {data.description?.length > 100 ? '...' : ''}
            </p>
            <div className="card-details">
              <span className="card-location">
                <i className="fas fa-map-marker-alt"></i> {data.location}
              </span>
              <span className="card-date">
                <i className="far fa-calendar-alt"></i> {formatDate(data.date)}
              </span>
              <span className="card-price">
                <i className="fas fa-tag"></i> ${data.price}
              </span>
              <span className="card-category">
                <i className="fas fa-tag"></i> {data.category}
              </span>
            </div>
          </div>
          <div className="card-footer">
            <span className="card-creator">
              By: {data.creator?.username || "Admin"}
            </span>
            <div className="card-actions">
              {isLoggedIn && user?.role === "USER" && (
                <>
                  <button 
                    className="card-button book-now" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(data.id);
                    }}
                  >
                    Book Now
                  </button>
                  <button 
                    className="card-button view-event" 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/events/${data.id}`);
                    }}
                  >
                    View Event
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'booking') {
    return (
      <div className="card booking-card">
        {data.event?.imageUrl && (
          <div className="card-image">
            <img src={data.event.imageUrl} alt={data.event.title} />
          </div>
        )}
        <div className="card-content">
          <h3 className="card-title">{data.event?.title}</h3>
          <div className="card-info">
            <div className="card-details">
              <span className="card-booking-id">
                <i className="fas fa-ticket-alt"></i> Booking #{data.id}
              </span>
              <span className="card-booking-date">
                <i className="far fa-calendar-check"></i> Booked on: {formatDate(data.bookingDate)}
              </span>
              <span className="card-event-date">
                <i className="far fa-calendar-alt"></i> Event date: {formatDate(data.event?.date)}
              </span>
              <span className="card-booking-seats">
                <i className="fas fa-chair"></i> Seats: {data.numTickets}
              </span>
              <span className="card-total-price">
                <i className="fas fa-money-bill-wave"></i> Total: ${data.totalPrice}
              </span>
            </div>
          </div>
          <div className="card-footer">
            <span className={`card-status ${data.status?.toLowerCase()}`}>
              {data.status}
            </span>
            <button className="card-button">View Details</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Card;