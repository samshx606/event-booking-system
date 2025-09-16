import { useState, useEffect } from 'react';
import { getAllEvents } from '../../../APIs/EventAPI';
import Card from '../../../Components/Card/Card';
import './EventList.css';

function EventList() {
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
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="event-list-container">
      <h2>Upcoming Events</h2>
      
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id} type="event" data={event} />
          ))
        ) : (
          <p className="no-events">No events available at the moment.</p>
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={handlePrevPage} 
            disabled={page === 0}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="page-info">
            Page {page + 1} of {totalPages}
          </span>
          <button 
            onClick={handleNextPage} 
            disabled={page === totalPages - 1}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default EventList;
