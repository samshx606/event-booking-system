import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents, deleteEvent } from '../../../APIs/EventAPI';
import './AdminEventList.css';

function AdminEventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getAllEvents(page, 10);
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
  }, [page, refreshTrigger]);

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

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        await deleteEvent(id);
        
        const updatedEvents = events.filter((e) => e.id !== id);
        setEvents(updatedEvents);
        
        if (updatedEvents.length === 0 && page > 0) {
          setPage(page - 1);
        } else {
          setRefreshTrigger(prev => prev + 1);
        }
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  if (loading && events.length === 0) {
    return <div className="admin-loading">Loading events...</div>;
  }

  if (error) {
    return <div className="admin-error">{error}</div>;
  }

  return (
    <div className="admin-event-list-container">
      <div className="admin-event-header">
        <h1>Events Management</h1>
        <Link to="/admin/events/create" className="create-event-btn">
          <i className="fas fa-plus"></i> Create New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="no-events">No events available. Click "Create New Event" to add an event.</div>
      ) : (
        <>
          <div className="admin-event-table-container">
            <table className="admin-event-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Creator</th>
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
                    <td>
                      <span className="event-creator">
                        {event.creator?.username || "Admin"}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <Link to={`/admin/events/edit/${event.id}`} className="edit-btn">
                        Edit
                      </Link>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </button>
                      <Link to={`/events/${event.id}`} className="view-btn">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-pagination">
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

export default AdminEventList;
