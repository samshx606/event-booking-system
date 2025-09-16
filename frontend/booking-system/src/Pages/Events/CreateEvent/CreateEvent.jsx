import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../../APIs/EventAPI";
import { useAuth } from "../../../Context/AuthContext";
import "./CreateEvent.css";

function CreateEvent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", description: "", location: "", date: "", price: "", imageUrl: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" ? parseFloat(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.role !== "ADMIN") {
      setMessage({ text: "Only admins can create events", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const formattedForm = { ...form, date: new Date(form.date).toISOString() };
      await createEvent(formattedForm);
      setMessage({ text: "Event created successfully!", type: "success" });
      setTimeout(() => navigate("/admin/events"), 2000);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Failed to create event.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-container">
      <h1>Create New Event</h1>
      
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the event"
            rows="5"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location*</label>
            <input
              type="text"
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Event location"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date & Time*</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Ticket Price ($)*</label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="CONCERT">Concert</option>
              <option value="FESTIVAL">Festival</option>
              <option value="CONFERENCE">Conference</option>
              <option value="WORKSHOP">Workshop</option>
              <option value="SPORTS">Sports</option>
              <option value="THEATER">Theater</option>
              <option value="EXHIBITION">Exhibition</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="http://example.com/image.jpg"
          />
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/admin/dashboard')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
    </div>
  );
}

export default CreateEvent;
