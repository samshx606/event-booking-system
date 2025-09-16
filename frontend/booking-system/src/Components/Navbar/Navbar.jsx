import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="nav-logo"><Link to="/">EventBooking</Link></div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {(!isLoggedIn || user?.role !== "ADMIN") && (
          <li><Link to="/events">Events</Link></li>
        )}
        
        {isLoggedIn && user?.role === "ADMIN" && (
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
        )}
        
        {isLoggedIn && user?.role !== "ADMIN" && (
          <>
            <li><Link to="/profile">View Profile</Link></li>
            <li><Link to="/users/bookings">My Bookings</Link></li>
          </>
        )}
        <li><Link to="/about">About</Link></li>
      </ul>
      <div className="nav-btns">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="navbar-btn">Logout</button>
        ) : (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
