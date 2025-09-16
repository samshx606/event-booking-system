import "./AboutUs.css";

function About() {
  return (
    <div className="about">
      <header className="about-hero">
        <h1>About Us</h1>
        <p>Learn more about EventBooking and our mission</p>
      </header>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          EventBooking is a platform designed to make booking events easy,
          secure, and hassle-free. From concerts and sports to theater and
          exhibitions, we connect people with the experiences they love.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to empower users by giving them access to a wide
          variety of events with a simple, smooth, and reliable booking system.
          We aim to bring people closer to entertainment, culture, and
          unforgettable experiences.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>🎟️ Seamless ticket booking experience</li>
          <li>🔒 Secure and reliable transactions</li>
          <li>🌍 Wide range of events across categories</li>
          <li>💬 Dedicated customer support</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
