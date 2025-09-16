import { useState } from "react";
import { register } from "../../../APIs/AuthAPI";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    
    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return;
    }
    
    try {
      const { confirmPassword, ...userData } = form;
      await register(userData);
      setMessage("Registration successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <span className="field-description">Your given name</span>
        </div>
        
        <div className="input-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <span className="field-description">Your family name</span>
        </div>
        
        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <span className="field-description">Choose a unique username for login</span>
        </div>
        
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <span className="field-description">Your email address for communication</span>
        </div>
        
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span className="field-description">Create a secure password</span>
        </div>
        
        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <span className="field-description">Re-enter your password for confirmation</span>
        </div>
        
        <button type="submit">Register</button>
      </form>
      <p className={message.includes("successful") ? "success-message" : "error-message"}>{message}</p>
      <span className="span">
        Already have an account? <Link to="/login">Login</Link>
      </span>
    </div>
  );
}

export default Register;