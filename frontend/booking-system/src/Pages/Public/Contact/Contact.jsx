import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact">
      <header className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Get in touch!</p>
      </header>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Message</label>
        <textarea
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
