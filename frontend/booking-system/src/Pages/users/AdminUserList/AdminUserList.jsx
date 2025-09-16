import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../../APIs/UserAPI';
import { makeAdmin } from '../../../APIs/AdminAPI';
import { useAuth } from '../../../Context/AuthContext';
import './AdminUserList.css';

function AdminUserList() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers(page, 10);
        setUsers(response.content || []);
        setTotalPages(response.totalPages || 0);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(id);
        
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        
        if (updatedUsers.length === 0 && page > 0) {
          setPage(page - 1);
        } else {
          setRefreshTrigger(prev => prev + 1);
        }
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };
  
  const handlePromoteToAdmin = async (id) => {
    if (window.confirm('Are you sure you want to promote this user to admin? This will give them full access to all administrative features.')) {
      try {
        await makeAdmin(id);
        alert('User successfully promoted to admin!');
        setRefreshTrigger(prev => prev + 1);
      } catch (err) {
        console.error('Error promoting user:', err);
        alert('Failed to promote user to admin. Please try again.');
      }
    }
  };

  if (loading && users.length === 0) {
    return <div className="admin-loading">Loading users...</div>;
  }

  if (error) {
    return <div className="admin-error">{error}</div>;
  }

  return (
    <div className="admin-user-list-container">
      <div className="admin-user-header">
        <h1>User Management</h1>
      </div>

      {users.length === 0 ? (
        <div className="no-users">No users available.</div>
      ) : (
        <>
          <div className="admin-user-table-container">
            <table className="admin-user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.firstName || '-'}</td>
                    <td>{user.lastName || '-'}</td>
                    <td>
                      <span className={`user-role ${user.role?.toLowerCase()}`}>
                        {user.role || 'USER'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button 
                          className="delete-btn" 
                          onClick={() => handleDeleteUser(user.id)}
                          title={currentUser?.id === user.id ? "You cannot delete your own account" : "Delete User"}
                          disabled={currentUser?.id === user.id}
                          style={currentUser?.id === user.id ? { cursor: 'not-allowed', opacity: 0.5 } : {}}
                        >
                          Delete
                        </button>
                        
                        <button 
                          className="promote-btn" 
                          onClick={() => handlePromoteToAdmin(user.id)}
                          disabled={user.role === "ADMIN"}
                          title={user.role === "ADMIN" ? "User is already an admin" : "Promote to Admin"}
                          style={user.role === "ADMIN" ? { cursor: 'not-allowed', opacity: 0.5 } : {}}
                        >
                          Make Admin
                        </button>
                      </div>
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

export default AdminUserList;
