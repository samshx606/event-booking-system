import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      if (data.role === "USER") navigate("/");
      if (data.role === "ADMIN") navigate("/admin/dashboard");
    } catch {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <span className="span">New Here? <Link to="/register">Sign up</Link></span>
    </div>
  );
}

export default Login;
