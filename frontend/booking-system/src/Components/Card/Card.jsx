import { useNavigate } from 'react-router-dom';
import './Card.css';

function Card({ type, data  }) {
  const navigate = useNavigate();

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to handle event card click
  const handleEventClick = () => {
    navigate(`/events/${data.id}`);
  };

  // Function to handle booking card click
  const handleBookingClick = () => {
    navigate(`/bookings/${data.id}`);
  };

  // Render Event Card
  if (type === 'event') {
    return (
      <div className="card event-card" onClick={handleEventClick}>
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
          </div>
        </div>
      </div>
    );
  }

  // Render Booking Card
  if (type === 'booking') {
    return (
      <div className="card booking-card" onClick={handleBookingClick}>
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