import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-cards">
        <div className="admin-card">
          <h3>Events Management</h3>
          <p>Create, view, edit, and delete events in the system.</p>
          <div className="admin-card-actions">
            <Link to="/admin/events/create" className="admin-btn primary">Create New Event</Link>
            <Link to="/admin/events" className="admin-btn secondary">View All Events</Link>
          </div>
        </div>
        
        <div className="admin-card">
          <h3>User Management</h3>
          <p>Manage user accounts and view user activity.</p>
          <div className="admin-card-actions">
            <Link to="/admin/users" className="admin-btn secondary">View Users</Link>
          </div>
        </div>
        
        {/* <div className="admin-card">
          <h3>Booking Management</h3>
          <p>View and manage event bookings across the platform.</p>
          <div className="admin-card-actions">
            <Link to="/admins/bookings" className="admin-btn secondary">View Bookings</Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default AdminDashboard;
