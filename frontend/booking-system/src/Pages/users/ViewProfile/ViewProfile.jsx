import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import { getMyProfile, deleteMyProfile } from '../../../APIs/UserAPI';
import './ViewProfile.css';

const ViewProfile = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (isLoggedIn) {
          setLoading(true);
          const profileData = await getMyProfile();
          setProfile(profileData);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="view-profile-container">
        <div className="profile-card">
          <h2>Access Denied</h2>
          <p>Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="view-profile-container">
        <div className="profile-card">
          <h2>Loading profile...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-profile-container">
        <div className="profile-card">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const handleDeleteAccount = async () => {
    try {
      setDeleteLoading(true);
      await deleteMyProfile();
      // Don't call the logout API since the user is already deleted
      // Just directly clear the frontend state
      logout(true); // Pass true to indicate this is after account deletion
      navigate('/');
    } catch (err) {
      console.error('Error deleting profile:', err);
      setError('Failed to delete profile. Please try again later.');
      setShowConfirmation(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="view-profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>My Profile</h1>
          <div className="profile-role-badge">{user?.role}</div>
        </div>
        
        <div className="profile-info">
          <div className="profile-info-item">
            <span className="profile-label">Username:</span>
            <span className="profile-value">{profile?.username || user?.username}</span>
          </div>
          
          {profile?.email && (
            <div className="profile-info-item">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{profile.email}</span>
            </div>
          )}
          
          {profile?.name && (
            <div className="profile-info-item">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{profile.name}</span>
            </div>
          )}
          
          {profile?.phone && (
            <div className="profile-info-item">
              <span className="profile-label">Phone:</span>
              <span className="profile-value">{profile.phone}</span>
            </div>
          )}
          
          <div className="profile-info-item">
            <span className="profile-label">User ID:</span>
            <span className="profile-value">{profile?.id || user?.id}</span>
          </div>
          
          {profile?.createdAt && (
            <div className="profile-info-item">
              <span className="profile-label">Member Since:</span>
              <span className="profile-value">
                {new Date(profile.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
        
        {profile?.bookings && profile.bookings.length > 0 && (
          <div className="profile-bookings">
            <h2>Recent Bookings</h2>
            <div className="bookings-list">
              {profile.bookings.slice(0, 3).map(booking => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-event">{booking.eventName}</div>
                  <div className="booking-date">
                    {new Date(booking.eventDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-bookings">View All Bookings</button>
          </div>
        )}
        
        <div className="profile-actions">
          <button 
            className="delete-account-btn" 
            onClick={() => setShowConfirmation(true)}
          >
            Delete My Account
          </button>
        </div>
        
        {showConfirmation && (
          <div className="confirmation-overlay">
            <div className="confirmation-dialog">
              <h3>Delete Account</h3>
              <p>Are you sure you want to delete your account? This action cannot be undone.</p>
              <p>All your data including bookings and personal information will be permanently removed.</p>
              
              <div className="confirmation-buttons">
                <button 
                  className="confirm-cancel-btn" 
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
                <button 
                  className="confirm-delete-btn" 
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Deleting...' : 'Yes, Delete My Account'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;